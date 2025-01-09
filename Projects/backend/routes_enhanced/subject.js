import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { classId, sectionId, subjectName, description } = req.body;

    const newSubject = new Subject({
      classId,
      sectionId,
      subjectName,
      description,
    });

    await newSubject.save();

    res.status(201).json({ message: 'Subject created successfully', subject: newSubject });
  } catch (error) {
    console.error('Create Subject Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    console.error('Get Subjects Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;