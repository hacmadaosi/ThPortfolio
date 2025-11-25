import express from "express";
const router = express.Router();
import { getAllProjectMembers } from "../controllers/controllerConfig.js";

router.get("/", getAllProjectMembers);
export default router;
