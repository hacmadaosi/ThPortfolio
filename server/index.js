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
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(400).json({
      result: "Thông tin cung cấp không đầy đủ",
    });
  }
  try {
    const result = await firebaseModule.createNewUser(email, password);
    if (result.state) {
      return res
        .status(200)
        .json({ state: true, result: "Tài khoản đã được tạo thành công!" });
    }
  } catch (e) {
    return res.status(500).json({ state: false, result: e.message });
  }
});

app.get("/login", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Không có token" });
  }
  try {
    const result = await firebaseModule.LoginAccount(authHeader.split(" ")[1]);
    if (result.state) {
      return res.status(200).json({ state: true, result: result.result });
    } else {
      return res.status(401).json({ state: false, result: result.result });
    }
  } catch (ex) {
    return res.status(500).json({
      error: ex.message,
    });
  }
});

app.get("/getAllProjectMembers", async (req, res) => {
  try {
    const result = await firebaseModule.getAllProjectMembers();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});
app.listen(port, () => {
  console.log(`Server đang lắng nghe trên cổng ${port}`);
});
