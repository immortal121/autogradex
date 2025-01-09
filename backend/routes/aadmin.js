import joi from "joi";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import User from '../models/User.js'; 
import { validate } from "../middlewares/validate.js";
import { logoBase64 } from "../utils/utils.js";
import dotenv from "dotenv";

import Organization from "../models/Organization.js";

dotenv.config();

const router = express.Router();

router.get("/", validate, (req, res) => {
    res.send("Admin");
});

router.post("/signup", async (req, res) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
        organizationName: joi.string().min(3).required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        // Check if email already exists
        if (await User.findOne({ email: data.email })) {
          return res.status(400).send("Email already exists");
        }
    
        // Create or retrieve Organization based on organizationName
        let organization;
        const existingOrganization = await Organization.findOne({ name: data.organizationName });

        if (existingOrganization) {
          organization = existingOrganization;
        } else {
          organization = new Organization({ name: data.organizationName });
          await organization.save();
        }
    
        const hashedPassword = await bcrypt.hash(data.password, 10);
    
        const users = await User.find();
        const newUser = new User({
          name: data.name,
          email: data.email,
          password: hashedPassword,
          role: 1, // Super admin if first user
          organization: organization._id, // Link user to the organization
        });
    
        const savedUser = await newUser.save();


        return res.send(savedUser);
    } catch (err) {
        return res.status(500).send(err);
    }
});


export default router;