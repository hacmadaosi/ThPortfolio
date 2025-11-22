import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

import userRoute from "./src/routes/user.js";
app.use("/api/users", userRoute);

import templatesRoute from "./src/routes/templates.js";
app.use("/api/templates", templatesRoute);

app.listen(PORT, () => {
  console.log(`Server đang lắng nghe trên cổng ${PORT}`);
});
