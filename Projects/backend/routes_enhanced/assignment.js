import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { subjectId, title, description, dueDate, totalMarks, questionStructure } = req.body;

    const newAssignment = new Assignment({
      subjectId,
      teacherId: req.user.userId, // Assuming teacher is creating the assignment
      title,
      description,
      dueDate,
      totalMarks,
      questionStructure,
    });

    await newAssignment.save();

    res.status(201).json({ message: 'Assignment created successfully', assignment: newAssignment });
  } catch (error) {
    console.error('Create Assignment Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/bySubject/:subjectId', auth, async (req, res) => {
  try {
    const assignments = await Assignment.find({ subjectId: req.params.subjectId, teacherId: req.user.userId  });
    res.status(200).json(assignments);
  } catch (error) {
    console.error('Get Assignments Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;