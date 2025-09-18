const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 80;
const hostname = process.env.HOST_NAME || "localhost";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/test", (req, res) => {
  res.json({ test: "test api" });
});

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
