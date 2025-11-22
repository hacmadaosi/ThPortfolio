import express from "express";
const router = express.Router();
import { GetAllTemplates } from "../controllers/controllerTemplates.js";

router.get("/", GetAllTemplates);
export default router;
