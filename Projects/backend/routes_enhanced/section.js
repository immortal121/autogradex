import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { classId, sectionName, description } = req.body;

    const newSection = new Section({
      classId,
      sectionName,
      description,
    });

    await newSection.save();

    res.status(201).json({ message: 'Section created successfully', section: newSection });
  } catch (error) {
    console.error('Create Section Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const sections = await Section.find();
    res.status(200).json(sections);
  } catch (error) {
    console.error('Get Sections Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;