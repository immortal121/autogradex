import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { assignmentId, scriptFile } = req.body;

    const newAnswerScript = new AnswerScript({
      assignmentId,
      studentId: req.user.userId,
      scriptFile,
    });

    await newAnswerScript.save();

    res.status(201).json({ message: 'Answer Script submitted successfully', answerScript: newAnswerScript });
  } catch (error) {
    console.error('Submit Answer Script Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:answerScriptId', auth, async (req, res) => {
  try {
    const answerScript = await AnswerScript.findById(req.params.answerScriptId);
    if (!answerScript) {
      return res.status(404).json({ message: 'Answer Script not found' });
    }

    res.status(200).json(answerScript);
  } catch (error) {
    console.error('Get Answer Script Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;