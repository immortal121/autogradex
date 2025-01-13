import joi from "joi";
import bcrypt from "bcrypt";
import express from "express";
import Class from "../models/Class.js";
import Section from "../models/Section.js";
import User from "../models/User.js";
import Subject from "../models/Subject.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/createTeacher", validate, async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(), // Enforce password complexity
        teaching: joi.array().items(
            joi.object({
                class: joi.string().required(),
                section: joi.string().required(),
                subject: joi.string().required(),
            })
        ),
    });

    try {
        const { name, email, password, teaching } = await schema.validateAsync(req.body);

        // Check if user with email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email already exists");
        }

        // Create new user (assuming role is teacher by default)
        const newUser = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10), // Hash password before saving
            organization: req.user.organization, // Assuming organization comes from logged-in user
            role: 2, // Assuming role 1 represents teacher (adjust based on your schema)
            teaching, // Add the teaching assignments directly
        });
        await newUser.save();

        res.send({ message: "Teacher created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating teacher");
    }
});

router.post("/deleteTeacher", validate, async (req, res) => {
    const schema = joi.object({
        id: joi.string().required(),
    });

    try {
        const { id } = await schema.validateAsync(req.body);


        const userExists = await User.findOne({ _id: id });

        if (!userExists) {
            return res.status(400).send("No User to Delete");
        }

        await User.findByIdAndDelete(id);


        return res.send("teacher deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleteing student");
    }
});

// Get all teachers
router.get("/", validate, async (req, res) => {
    try {
        const teachers = await User.find({ organization: req.user.organization, role: 2 })
            .populate('teaching.class') // Populate class field within each teaching object
            .populate('teaching.section') // Populate section field within each teaching object
            .populate('teaching.subject') // Populate subject field within each teaching object
            .exec();
            const formattedTeachers = teachers.flatMap((teacher) => 
                teacher.teaching.map((assignment) => ({
                  _id: teacher._id,
                  name: teacher.name,
                  email: teacher.email,
                  class: assignment.class ? assignment.class.name : "",
                  section: assignment.section ? assignment.section.name : "",
                  subject: assignment.subject ? assignment.subject.name : "",
                }))
              );

        res.send(formattedTeachers);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching teachers");
    }
});

export default router;