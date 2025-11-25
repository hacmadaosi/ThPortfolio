import express from "express";
const router = express.Router();
import { UserLogin, CreateAccount , GetAllUsers, UpdateUser, DeleteUser, } from "../controllers/controllerUser.js";

router.post("/signin", UserLogin);
router.post("/signup", CreateAccount);
router.get("/", GetAllUsers);
router.put("/:id", UpdateUser);
router.delete("/:id", DeleteUser);
//router.post("/upload-avatar/:id", UploadAvatar);
export default router;
