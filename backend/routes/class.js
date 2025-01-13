import joi from "joi";
import express from "express";
import Class from "../models/Class.js";
import Section from "../models/Section.js";
import Subject from "../models/Subject.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();


//section

router.get("/sections", validate, async (req, res) => {
    return res.send((await Section.find({ organization: req.user.organization })).reverse());
});


router.post("/createSection", validate, async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const sectionExists = await Section.findOne({ name: data.name });

        if (sectionExists) {
            return res.status(400).send("Already Section Exists");
        }


        const newSection = new Section({
            name: data.name,
            description: data.description,
            organization: req.user.organization,
            createdBy: req.user._id,
        });

        await newSection.save();

        return res.send(newSection);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});


router.post("/deleteSection", validate, async (req, res) => {
    const schema = joi.object({
        sectionId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const sectionExists = await Section.findOne({ _id: data.sectionId });

        if (!sectionExists) {
            return res.status(400).send("No Section Exists to Delete");
        }

        await Section.findByIdAndDelete(data.sectionId);


        return res.send("section deleted successfully");
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/updateSection", validate, async (req, res) => {
    const schema = joi.object({
        sectionId: joi.string().required(),
        name: joi.string().required(),
        description: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const _section = await Section.findById(data.sectionId);

        _section.name = data.name;
        _section.description = data.description;

        await _section.save();

        return res.send(_section);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});



// subjects
router.get("/subjects", validate, async (req, res) => {
    return res.send((await Subject.find({ organization: req.user.organization })).reverse());
});


router.post("/createSubject", validate, async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const subjectExists = await Subject.findOne({ name: data.name });

        if (subjectExists) {
            return res.status(400).send("Already Subject Exists");
        }


        const newSubject = new Subject({
            name: data.name,
            description: data.description,
            organization: req.user.organization,
            createdBy: req.user._id,
        });

        await newSubject.save();

        return res.send(newSubject);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});


router.post("/deleteSubject", validate, async (req, res) => {
    const schema = joi.object({
        subjectId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const subjectExists = await Subject.findOne({ _id: data.subjectId });
        if (!subjectExists) {
            return res.status(400).send("No Subject Exists to Delete");
        }

        await Subject.findByIdAndDelete(data.subjectId);


        return res.send("Subject deleted successfully");
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/updateSubject", validate, async (req, res) => {
    const schema = joi.object({
        subjectId: joi.string().required(),
        name: joi.string().required(),
        description: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const _subject = await Subject.findById(data.subjectId);

        _subject.name = data.name;
        _subject.description = data.description;

        await _subject.save();

        return res.send(_subject);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});


// class
router.get("/", validate, async (req, res) => {
    const classes = await Class.find({ organization: req.user.organization })
        .populate('subjects') // Populate subjects field with Subject documents
        .populate('sections') // Populate sections field with Section documents
        .exec();
    const formattedClasses = classes.map(c => ({
        _id: c._id,
        name: c.name,
        subjects: c.subjects.map(s => s.name).join(', '),
        sections: c.sections.map(s => s.name).join(', '),
        sectionDocs: c.sections,
        subjectDocs: c.subjects,
        studentCount: c.students ? c.students.length : 0, // Check if students array exists 
    }));


    res.send(formattedClasses);
});
router.get("/filtered", validate, async (req, res) => {
    const filteredClasses = await Class.find({
        _id: { $in: req.user.teaching.map(assignment => assignment.class) }, // Filter by class IDs from teaching assignments
      })
      .populate('subjects') // Populate subjects field with Subject documents
      .populate('sections') // Populate sections field with Section documents
      .exec();
  
      // Format the filtered classes
      const formattedClasses = filteredClasses.map(c => ({
        _id: c._id,
        name: c.name,
        subjects: c.subjects.map(s => s.name).join(', '),
        sections: c.sections.map(s => s.name).join(', '),
        sectionDocs: c.sections,
        subjectDocs: c.subjects,
        studentCount: c.students ? c.students.length : 0, // Check if students array exists
      }));

    res.send(formattedClasses);
});
router.post("/createClass", validate, async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        subjects: joi.array().items(joi.string().required()).required(),
        sections: joi.array().items(joi.string().required()).required(),
        students: joi.array().items(joi.string().required()).optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const classExists = await Class.findOne({ name: data.name });

        if (classExists) {
            return res.status(400).send("Class Already Exists");
        }

        const newClass = new Class({
            name: data.name,
            subjects: data.subjects,
            sections: data.sections || [],
            students: data.students || [],
            organization: req.user.organization,
            createdBy: req.user._id,
        });

        await newClass.save();

        return res.status(201).send(newClass); // Send 201 Created status
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error creating class");
    }
});
router.post("/updateClass", validate, async (req, res) => {
    const schema = joi.object({
        name: joi.string().optional(),
        subjects: joi.array().items(joi.string().required()).optional(),
        sections: joi.array().items(joi.string().required()).optional(),
        students: joi.array().items(joi.string().required()).optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const classId = req.params.classId;

        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            {
                $set: {
                    name: data.name || undefined,
                    subjects: data.subjects || undefined,
                    sections: data.sections || undefined,
                    students: data.students || undefined
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedClass) {
            return res.status(404).send("Class not found");
        }

        return res.send(updatedClass);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error updating class");
    }
});

router.delete("/deleteClass", validate, async (req, res) => {
    const schema = joi.object({
        classId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const classId = data.classId;

        const deletedClass = await Class.findByIdAndDelete(classId);

        if (!deletedClass) {
            return res.status(404).send("Class not found");
        }

        return res.send("Class deleted successfully");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error deleting class");
    }
});

//
// router.post("/createClass", validate, async (req, res) => {
//     const schema = joi.object({
//         name: joi.string().required(),
//         section: joi.string().required(),
//         subject: joi.string().required(),
//     });

//     try {
//         const data = await schema.validateAsync(req.body);

//         const newClass = new Class({
//             name: data.name,
//             section: data.section,
//             subject: data.subject,
//             students: [],
//             createdBy: req.user._id,
//         });

//         await newClass.save();

//         return res.send(newClass);
//     }
//     catch (err) {
//         return res.status(500).send(err);
//     }
// });

// router.post("/createSubject", validate, async (req, res) => {
//     const schema = joi.object({
//         name: joi.string().required(),
//         section: joi.string().required(),
//         subject: joi.string().required(),
//     });

//     try {
//         const data = await schema.validateAsync(req.body);

//         const newClass = new Class({
//             name: data.name,
//             section: data.section,
//             subject: data.subject,
//             students: [],
//             createdBy: req.user._id,
//         });

//         await newClass.save();

//         return res.send(newClass);
//     }
//     catch (err) {
//         return res.status(500).send(err);
//     }
// });

// router.post("/add-student", validate, async (req, res) => {
//     const schema = joi.object({
//         classId: joi.string().required(),
//         name: joi.string().required(),
//         rollNo: joi.number().required(),
//     });

//     try {
//         const data = await schema.validateAsync(req.body);

//         const studentExists = await Class.findOne({ _id: data.classId, "students.rollNo": data.rollNo });

//         if (studentExists) {
//             return res.status(400).send("Student with this roll no already exists");
//         }

//         const _class = await Class.findById(data.classId);

//         if (_class.createdBy.toString() != req.user._id.toString()) {
//             return res.status(400).send("You are not authorized to update this class");
//         }

//         _class.students.push({ name: data.name, rollNo: data.rollNo });

//         await _class.save();

//         return res.send(_class);
//     }
//     catch (err) {
//         return res.status(500).send(err);
//     }
// });

// router.post("/import-students", validate, async (req, res) => {
//     try {
//         const data = req.body;
//         const _class = await Class.findById(data.classId);

//         if (_class.createdBy.toString() != req.user._id.toString()) {
//             return res.status(400).send("You are not authorized to update this class");
//         }

//         if (!req.files || !req.files.students) {
//             return res.status(400).send("No file uploaded");
//         }

//         const students = req.files.students.data.toString().split("\n");

//         for (let i = 0; i < students.length; i++) {
//             const student = students[i].split(",");
//             if (student.length != 2) {
//                 continue;
//             }

//             if (isNaN(parseInt(student[0]))) {
//                 continue;
//             }

//             const rollNo = parseInt(student[0]);
//             const name = student[1];

//             const studentExists = await Class.findOne({ _id: data.classId, "students.rollNo": rollNo });

//             if (studentExists) {
//                 _class.students = _class.students.filter(student => student.rollNo != rollNo);
//             }

//             _class.students.push({ name: name, rollNo: rollNo });
//         }

//         await _class.save();

//         return res.send(_class);
//     }
//     catch (err) {
//         return res.status(500).send(err);
//     }
// });
// router.post("/delete", validate, async (req, res) => {
//     const schema = joi.object({
//         classId: joi.string().required(),
//     });

//     try {
//         const data = await schema.validateAsync(req.body);

//         const _class = await Class.findById(data.classId);

//         if (_class.createdBy.toString() != req.user._id.toString()) {
//             return res.status(400).send("You are not authorized to delete this class");
//         }

//         await Class.findByIdAndDelete(data.classId);

//         return res.send("Class deleted successfully");
//     }
//     catch (err) {
//         return res.status(500).send(err);
//     }
// });

// router.post("/update", validate, async (req, res) => {
//     const schema = joi.object({
//         classId: joi.string().required(),
//         name: joi.string().required(),
//         section: joi.string().required(),
//         subject: joi.string().required(),
//     });

//     try {
//         const data = await schema.validateAsync(req.body);

//         const _class = await Class.findById(data.classId);

//         if (_class.createdBy.toString() != req.user._id.toString()) {
//             return res.status(400).send("You are not authorized to update this class");
//         }

//         _class.name = data.name;
//         _class.section = data.section;
//         _class.subject = data.subject;

//         await _class.save();

//         return res.send(_class);
//     }
//     catch (err) {
//         return res.status(500).send(err);
//     }
// });

// router.post("/students", validate, async (req, res) => {
//     const schema = joi.object({
//         classId: joi.string().required(),
//     });

//     try {
//         const data = await schema.validateAsync(req.body);

//         const _class = await Class.findById(data.classId);

//         if (_class.createdBy.toString() != req.user._id.toString()) {
//             return res.status(400).send("You are not authorized to update this class");
//         }

//         var students = _class.students;
//         //sort students by roll no
//         students.sort((a, b) => a.rollNo - b.rollNo);

//         return res.send(students);
//     }
//     catch (err) {
//         return res.status(500).send(err);
//     }
// })

// router.post("/students/delete", validate, async (req, res) => {
//     const schema = joi.object({
//         classId: joi.string().required(),
//         rollNo: joi.number().required(),
//     });

//     try {
//         const data = await schema.validateAsync(req.body);

//         const _class = await Class.findById(data.classId);

//         if (_class.createdBy.toString() != req.user._id.toString()) {
//             return res.status(400).send("You are not authorized to update this class");
//         }

//         _class.students = _class.students.filter(student => student.rollNo != data.rollNo);

//         await _class.save();

//         return res.send(_class);
//     }
//     catch (err) {
//         return res.status(500).send(err);
//     }
// });

// router.post("/students/update", validate, async (req, res) => {
//     const schema = joi.object({
//         classId: joi.string().required(),
//         rollNo: joi.number().required(),
//         name: joi.string().required(),
//     });

//     try {
//         const data = await schema.validateAsync(req.body);

//         const _class = await Class.findById(data.classId);

//         if (_class.createdBy.toString() != req.user._id.toString()) {
//             return res.status(400).send("You are not authorized to update this class");
//         }

//         _class.students = _class.students.map(student => {
//             if (student.rollNo == data.rollNo) {
//                 student.name = data.name;
//             }
//             return student;
//         });

//         await _class.save();

//         return res.send(_class);
//     }
//     catch (err) {
//         return res.status(500).send(err);
//     }
// });


export default router;