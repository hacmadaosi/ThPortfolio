const express = require("express");
const PORT = process.env.PORT || 80;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/test", (req, res) => {
  res.json({ test: "test api" });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
