import Joi from "joi";
import express from "express";
import Assignment from "../models/Assignment.js";
import { validate } from "../middlewares/validate.js";
import { AzureOpenAI } from 'openai';
import User from "../models/User.js";
import {MarkAnalysisPromptNew} from "../utils/utils.js";

const router = express.Router();

// Validation schema for assignment
const assignmentSchema = Joi.object({
  name: Joi.string().required(),
  subject: Joi.string().required(),
  class: Joi.string().required(),
  section: Joi.string().required(),
  questionPaper: Joi.array().items(Joi.string().uri()).required(),
  keyAnswerScript: Joi.array().items(Joi.string().uri()).required(),
  assignmentStructure: Joi.array().items(
    Joi.object({
      sectionName: Joi.string().required(),
      questions: Joi.array().items(
        Joi.object({
          questionNo: Joi.string().required(),
          marks: Joi.number().required(),
          description: Joi.string().allow(null, ''),
        })
      ),
    })
  ).required()
});


// Route to create a new assignment
router.post("/create", validate, async (req, res) => {
  try {
    const validatedData = await assignmentSchema.validateAsync(req.body);

    const students = req.body.class ? await User.find({ class: req.body.class }) : [];
    // console.log(students[0]);
    // const updatedValidatedData = {
    //   ...validatedData,
    //   createdBy: req.user._id,
    //   students: students,

    // }

    // Prepare the students data to be added to the assignment
    const studentsData = students.map(student => ({
      studentId: student._id,  // Reference to User model (Student)
      isAbsent: false,         // Default attendance status
      answerScript: [],        // Empty array for answer scripts initially
      evaluationStatus: 'Pending',  // Default evaluation status
      evaluatedBy: null,       // Evaluator ID will be set later
      marksScored: null,       // Marks will be assigned later
      marksBreakdown: [], 
      uploaded:false,     // Marks breakdown can be filled during evaluation
      comments: '',            // Initial empty comments field
    }));

    // Prepare the updated assignment data with students array
    const updatedValidatedData = {
      ...req.body,             // Assuming req.body has the assignment details
      createdBy: req.user._id, // The user creating the assignment
      students: studentsData,  // Add the populated students array
    };

    const assignment = new Assignment(updatedValidatedData);
    await assignment.save();

    return res.status(201).send({ message: "Assignment created successfully", assignment });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
});

// Route to edit an existing assignment
router.post("/edit", validate, async (req, res) => {
  const editSchema = assignmentSchema.keys({
    id: Joi.string().required(),
  });

  try {
    const { id, ...assignmentData } = await editSchema.validateAsync(req.body);

    const updatedAssignment = await Assignment.findByIdAndUpdate(id, assignmentData, {
      new: true,
    });

    if (!updatedAssignment) {
      return res.status(404).send({ error: "Assignment not found" });
    }

    return res.send({ message: "Assignment updated successfully", updatedAssignment });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
});

// delete assignment
router.post("/delete", validate, async (req, res) => {
  const deleteSchema = Joi.object({
    id: Joi.string().required(),
  });

  try {
    const { id } = await deleteSchema.validateAsync(req.body);

    const deletedAssignment = await Assignment.findByIdAndDelete(id);

    if (!deletedAssignment) {
      return res.status(404).send({ error: "Assignment not found" });
    }

    return res.send({ message: "Assignment deleted successfully", deletedAssignment });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
});

// Route to get assignments (single or all)
// router.get("/", validate, async (req, res) => {
//   const { id } = req.query;

//   try {
//     if (id) {
//       const assignment = await Assignment.findById(id);

//       if (!assignment) {
//         return res.status(404).send({ error: "Assignment not found" });
//       }

//       return res.send({ assignment });
//     } else {
//       const assignments = await Assignment.find({ createdBy: req.user.organization });
//       return res.send({ assignments });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Error fetching assignments" });
//   }
// });
router.get("/filtered", validate, async (req, res) => {
  try {
    // Fetch assignments for the user
    const assignments = await Assignment.find({ createdBy: req.user._id })
      .populate('subject')  // Populate related subject field
      .populate('class')    // Populate related class field
      .populate('section')
      .exec();

    // Check if no assignments are found
    if (!assignments || assignments.length === 0) {
      return res.status(404).send({ error: "Assignments not found" });
    }
    // Create a list of "normalized" data
    const normalizedData = assignments.map(assignment => ({
      id: assignment._id.toString(),  // Flatten ObjectId to string
      name: assignment.name,
      subject: assignment.subject ? assignment.subject.name : 'N/A',
      class: assignment.class ? assignment.class.name : 'N/A',
      section: assignment.section ? assignment.section.name : 'N/A',
      totalStudents: assignment.class ? assignment.class.students.length : 0,
      progress: assignment.evaluationProgress || 0,  // Default value if no progress
      createdAt: assignment.createdAt ? assignment.createdAt.toISOString() : 'N/A',  // Example of formatting date
    }));
    // If you need "no data" for missing values:
    const noData = assignments.length === 0 ? [] : normalizedData;

    // Send the response
    return res.send(noData);

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error fetching assignments" });
  }
});
router.get("/getAssignment", validate, async (req, res) => {
  try {
    // Fetch the assignment based on the given ID
    const assignment = await Assignment.findById(req.query.id)
      .populate('subject')  // Populate the related subject
      .populate('class')    // Populate the related class
      .populate('section')  // Populate the related section
      .populate({
        path: 'students.studentId',  // Populate the 'studentId' field in students array
        select: 'name email rollNo'  // Specify the fields you want to populate from the User model
      })
      .exec();

    // Check if the assignment exists
    if (!assignment) {
      return res.status(404).send({ error: "Assignment not found" });
    }

    // Normalize the assignment data to send in the response
    const normalizedData = {
      id: assignment._id.toString(),
      name: assignment.name || "Untitled Assignment",
      subject: assignment.subject ? assignment.subject.name : "N/A",
      class: assignment.class ? assignment.class.name : "N/A",
      section: assignment.section ? assignment.section.name : "N/A",
      status: assignment.status || "N/A",
      progress: assignment.evaluationProgress || 0,
      createdAt: assignment.createdAt ? assignment.createdAt.toISOString() : "N/A",
      questionPaper: assignment.questionPaper || [],
      keyAnswerScript: assignment.keyAnswerScript || [],
      students: assignment.students.map(student => ({
        id: student.studentId._id.toString(),
        name: student.studentId.name || "Unknown",
        email: student.studentId.email || "N/A",
        isAbsent: student.isAbsent || false,
        uploaded: student.uploaded || false,
        answerScript: student.answerScript || [],
        evaluationStatus: student.evaluationStatus || "Pending",
        evaluatedBy: student.evaluatedBy || null,
        marksScored: student.marksScored || null,
        marksBreakdown: student.marksBreakdown || [],
        comments: student.comments || "",
      })),
    };

    // Send the response with the normalized data
    return res.status(200).send(normalizedData);

  } catch (err) {
    console.error("Error fetching assignment:", err);
    res.status(500).send({ error: "Error fetching assignment details" });
  }
});

router.post("/updateAssignmentStudents", validate, async (req, res) => {
  try {
    const { id, students } = req.body;

    // Validate the input
    if (!id || !students || !Array.isArray(students)) {
      return res.status(400).send({ error: "Invalid request payload" });
    }

    // Find the assignment by ID
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).send({ error: "Assignment not found" });
    }

    // Update student records in the database
    for (const student of students) {
      const updatedAssignment = await Assignment.updateOne(
        {
          _id: id, // Replace with the assignment's ID
          "students.studentId": student.id, // Match the specific student by their ID
        },
        {
          $set: {
            "students.$.isAbsent": student.isAbsent, // Update the isAbsent field
            "students.$.answerScript": student.answerScript, // Update the answerScript field
            "students.$.uploaded": student.uploaded, // Update the uploaded field
          },
        }
      );
    }

    // Check if all students are either absent or have uploaded the answer scripts
    const allStudentsUploadedOrAbsent = assignment.students.every(
      (student) => student.isAbsent || student.uploaded
    );

    if (allStudentsUploadedOrAbsent) {
      // If all students have uploaded or are absent, set the status to "Evaluation Not Started"
      assignment.status = "Evaluation Not Started";
      await assignment.save(); // Save the status update
    }

    // Respond with success
    res.send("Students updated successfully");

  } catch (err) {
    console.error("Error updating assignment students:", err);
    res.status(500).send({ error: "Failed to update assignment students" });
  }
});



//  evaluation 

const endpoint = process.env.AZURE_OPENAI_ENDPOINT
const apiKey = process.env.AZURE_OPENAI_API_KEY
const apiVersion = "2024-08-01-preview"
const openai = new AzureOpenAI({ endpoint,apiKey,apiVersion});



const evaluateAndGradeAssignment = async (assignmentId, req) => {
  try {
    // Fetch the assignment and populate students
    const assignment = await Assignment.findById(assignmentId).populate('students.studentId');
    if (!assignment) {
      throw new Error("Assignment not found");
    }

    const { questionPaper, keyAnswerScript, assignmentStructure, students } = assignment;

    // Ensure there are students to evaluate
    if (!students || students.length === 0) {
      throw new Error("No students to evaluate");
    }

    // Iterate over each student's submission
    for (const student of students) {
      // Skip absent students or already evaluated submissions
      if (student.isAbsent || student.evaluationStatus === 'Evaluated') {
        continue;
      }

      const prompt = [];

      // Add Question Paper, Key Answer Script, Assignment Structure, and Answer Scripts to the prompt
      prompt.push({ type: "text", text: MarkAnalysisPromptNew });
      prompt.push({ type: "text", text: "Question Paper(s):" });
      for (const question of questionPaper) {
        
        prompt.push({ type: "image_url", image_url: { url: question } });
      }

      prompt.push({ type: "text", text: "Key Answer Script(s):" });
      for (const keyAnswer of keyAnswerScript) {
        
        prompt.push({ type: "image_url", image_url: { url: keyAnswer } });
      }

      prompt.push({ type: "text", text: "Assignment Structure:" });
      prompt.push({ type: "text", text: JSON.stringify(assignmentStructure, null, 2) });

      prompt.push({ type: "text", text: "Student Answer Script(s):" });
      for (const answer of student.answerScript) {
        console.log(answer);
        prompt.push({ type: "image_url", image_url: { url: answer } });
      }

      // Prepare messages for OpenAI
      const messages = [
        { role: "system", content:MarkAnalysisPromptNew},
        { role: "user", content: prompt}
      ];

      // Call OpenAI API
      const result = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Specify the AI model (e.g., "gpt-4")
        messages: messages,
        max_tokens: 5000, // Set token limit as necessary
      });

      console.log(result.choices[0].message.content);
      let evaluationResponse = result.choices[0]?.message?.content;

      // Parse the JSON response from OpenAI (sanitize and parse the response)
      evaluationResponse = evaluationResponse?.replace(/```json\n|\n```/g, "");
      const evaluationData = JSON.parse(evaluationResponse);

      // Update student's evaluation details
      student.evaluationStatus = 'Evaluated';
      student.marksScored = evaluationData.totalMarks; // Assuming OpenAI provides totalMarks in response
      student.marksBreakdown = evaluationData.marksBreakdown; // Example: [{ questionNo: '1', marksGiven: 5 }]
      student.comments = evaluationData.comments;

      // Optionally track who evaluated the student
      student.evaluatedBy = null; // Assuming evaluator's ID is in `req.user._id`
      
      // Save student's updated data
      await student.save();
    }

    // Update evaluation progress and status
    const evaluatedCount = students.filter(s => s.evaluationStatus === 'Evaluated').length;
    assignment.evaluationProgress = Math.round((evaluatedCount / students.length) * 100);

    // If all students are evaluated, mark assignment as completed
    if (evaluatedCount === students.length) {
      assignment.status = 'Completed';
    } else {
      assignment.status = 'Evaluation In Progress';
    }

    // Save the assignment after updating
    await assignment.save();

    return { success: true, message: "Evaluation completed successfully", assignment };

  } catch (error) {
    console.error("Error during evaluation:", error);
    throw new Error("Evaluation failed: " + error.message);
  }
};

router.post("/EvaluateWithAI/", validate, async (req, res) => {
  try {
    const { assignmentId } = req.body;

    const result = await evaluateAndGradeAssignment(assignmentId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

export default router;
