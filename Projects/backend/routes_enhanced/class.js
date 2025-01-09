import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { organizationId, className, description } = req.body;

    const newClass = new Class({
      organizationId,
      className,
      description,
    });

    await newClass.save();

    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (error) {
    console.error('Create Class Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error('Get Classes Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


export default router;