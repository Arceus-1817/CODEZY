import { askAI } from "../controllers/aiController.js";
import express from "express";

const router = express.Router();
router.post("/ask", askAI);

export default router;