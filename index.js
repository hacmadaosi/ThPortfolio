const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 80;
const hostname = process.env.HOST_NAME || "localhost";

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

app.get("/test", (req, res) => {
  res.json({ test: "test api" });
});

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
