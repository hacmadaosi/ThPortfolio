const express = require("express");
const cors = require("cors");
const fireBase_Service = require("./firebase_config.js");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/firebase-api", (req, res) => {
  res.json({
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
  });
});

app.post("/add-user", async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).json({ message: "Thiếu tên hoặc email" });
  }
  try {
    const newUser = await fireBase_Service.registerUser(userName, password);
    // Trả về phản hồi
    res
      .status(200)
      .json({ message: "Dữ liệu đã nhận thành công", data: req.body });
  } catch (err) {
    console.error("Lỗi khi tạo user:", err);
  }
});

app.get("/test", (req, res) => {
  res.json({ test: "test api" });
});

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
