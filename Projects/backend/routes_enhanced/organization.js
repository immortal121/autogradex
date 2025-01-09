import express from "express";
import Organization from "../models/Organization.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();


router.get('/organizations', async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve organizations' });
    }
});

export default router;