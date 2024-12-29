import mongoose from "mongoose";

const EvaluationProgressSchema = new mongoose.Schema(
    {
        evaluatorId: {
            type: mongoose.Schema.ObjectId,
            ref: "Evaluator",
            required: true,
        },  
        rollNo: {
            type: Number,
            required: true,
        },
        prompt: {
            type: String,
            required: false,
            default: "",
        },
        status: {
            type: String,
            required: true,
            default: "pending",
            enum: ["pending", "success", "error"],
        },
        finished: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const EvaluationProgress = mongoose.model("EvaluationProgress", EvaluationProgressSchema);

export default EvaluationProgress;