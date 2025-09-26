const express = require("express");
const cors = require("cors");
const firebaseModule = require("./firebase-module");
require("dotenv").config();
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Xin chào");
});

app.get("/firebase-api", (req, res) => {
  res.json(firebaseModule.firebaseConfig);
});

app.post("/user/add", async (req, res) => {
  const { userName, password, email } = req.body;
  if (!userName || !password || !email) {
    return res.status(400).json({
      error: "Thông tin cung cấp không đầy đủ",
    });
  }
  try {
    const result = await firebaseModule.createNewUser(
      userName,
      password,
      email
    );
    return res.status(200).json({ result: "Thêm thành công" });
  } catch (ex) {
    return res.status(500).json({
      error: ex.message,
    });
  }
});
app.get("/getAllProjectMembers", async (req, res) => {
  try {
    const result = await firebaseModule.getAllProjectMembers();
    console.log(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});
app.listen(port, () => {
  console.log(`Server đang lắng nghe trên cổng ${port}`);
});
