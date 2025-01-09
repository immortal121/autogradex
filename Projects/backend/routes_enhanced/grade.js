import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.put('/:answerScriptId/grade', auth, async (req, res) => {
  try {
    const { answerScriptId, marksObtained } = req.body;

    const answerScript = await AnswerScript.findById(answerScriptId);
    if (!answerScript) {
      return res.status(404).json({ message: 'Answer Script not found' });
    }

    answerScript.marksObtained = marksObtained;
    answerScript.evaluationStatus = 'Graded';
    answerScript.evaluatorId = req.user.userId; // Assuming teacher is grading

    await answerScript.save();

    res.status(200).json({ message: 'Answer Script graded successfully' });
  } catch (error) {
    console.error('Grading Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;