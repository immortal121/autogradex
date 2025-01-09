import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        }, organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
        },
        type: {
            type: Number,
            enum: [0, 1, 2, 3], // 0: super_admin, 1: admin,2: teacher, 3: student
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

export default User;