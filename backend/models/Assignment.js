import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Teacher's ID
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },

  questionPaper: [{ type: String }], // URLs of uploaded question paper PDFs
  keyAnswerScript: [{ type: String }], // URLs of uploaded key answer scripts
  MaxMarks:{type:Number,required:true},
  assignmentStructure: [
    {
      sectionName: String, // Section I, Section II, etc.
      questions: [
        {
          questionNo: String,
          marks: Number, // Maximum marks for the question
          isOptional: { type: Boolean, default: false }, // Indicates if the question is optional
          description: String, // Question details
        },
      ],
    },
  ],

  students: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      isAbsent: { type: Boolean, default: false }, // Absent status
      answerScript: [{ type: String }], // URLs to submitted scripts
      evaluationStatus: {
        type: String,
        enum: ['Pending', 'Evaluated', 'Absent'],
        default: 'Pending'
      },
      uploaded: { type: Boolean, default: false },
      evaluatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Evaluator's ID
      marksScored: { type: Number }, // Total marks 
      marksBreakdown: [
        {
          page: { type: String }, // URL of the specific page
          labels: [
            { 
              sectionName: { type: String }, // Label name (e.g., "1 mark", "3 marks")
              questionNo: { type: String }, // Label name (e.g., "1 mark", "3 marks")
              labelName: { type: String }, // Label name (e.g., "1 mark", "3 marks")
              marksGiven: { type: Number }, // Marks assigned for this label
              x: { type: Number }, // X-coordinate for the label
              y: { type: Number }, // Y-coordinate for the label
            },
          ],
          comments:[{
            sectionName: { type: String }, // Label name (e.g., "1 mark", "3 marks")
            questionNo: { type: String }, // Label name (e.g., "1 mark", "3 marks")  
            comment:{type:String},
          }]
        },
      ],
      comment: { type: String }, // Overall evaluation comments for the student
    },
  ],
  status: {
    type: String,
    enum: ['Pending Upload', 'Evaluation Not Started', 'Evaluation In Progress', 'Completed'],
    default: 'Pending Upload'
  },
  evaluationProgress: { type: Number, min: 0, max: 100, default: 0 }, // Overall evaluation progress percentage

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Assignment', assignmentSchema);
 

