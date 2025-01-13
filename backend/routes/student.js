import joi from "joi";
import bcrypt from "bcrypt";
import express from "express";
import Class from "../models/Class.js";
import Section from "../models/Section.js";
import User from "../models/User.js";
import Subject from "../models/Subject.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();


//
router.get("/", validate, async (req, res) => {
  try {
    const students = await User.find({ organization: req.user.organization, role: 3 })
      .populate('class') // Populate class field with Class document
      .populate('section') // Populate section field with Section document
      .exec();

    const formattedStudents = students.map((student) => ({
      _id: student._id,
      name: student.name,
      email: student.email,
      class: student.class ? student.class.name : "", // Handle case where class might be null
      section: student.section ? student.section.name : "", // Handle case where section might be null
    }));
    res.send(formattedStudents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching students");
  }
});

router.post("/createStudent", validate, async (req, res) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(), // Enforce password complexity
    classId: joi.string().required(), // ID of the class the student enrolls in
    sectionId: joi.string().required(), // ID of the section the student enrolls in

  });

  try {
    const { name, email, password, classId, sectionId } = await schema.validateAsync(req.body);

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    // Create new user (assuming role is student by default)
    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10), // Hash password before saving
      organization: req.user.organization, // Assuming organization comes from logged-in user
      role: 3, // Assuming role 3 represents student (adjust based on your schema)
    });
    await newUser.save();

    // Add class reference to the user (assuming a 'class' field exists in the User model)
    newUser.class = classId;
    newUser.section = sectionId;
    await newUser.save(); // Update the user document with the class reference

    const theClass = await Class.findById(classId);

    if (!theClass) {
      return res.status(400).send("Class not found");
    }

    // Add student ID to the class's 'students' array
    theClass.students.push(newUser._id);
    await theClass.save();

    res.send({ message: "Student created and enrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating student");
  }
});

router.post("/deleteStudent", validate, async (req, res) => {
  const schema = joi.object({
    id: joi.string().required(),
  });

  try {
    const { id } = await schema.validateAsync(req.body);


    const userExists = await User.findOne({ _id: id });

    if (!userExists) {
      return res.status(400).send("No User Exists to Delete");
    }

    await User.findByIdAndDelete(id);


    return res.send("student deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleteing student");
  }
});
export default router;