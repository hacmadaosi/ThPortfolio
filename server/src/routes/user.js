import express from "express";
const router = express.Router();
import { UserLogin, CreateAccount } from "../controllers/controllerUser.js";

router.post("/signin", UserLogin);
router.post("/signup", CreateAccount);
export default router;
