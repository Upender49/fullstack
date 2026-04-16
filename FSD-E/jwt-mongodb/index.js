const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const PORT = 3000;
const SECRET_KEY = "mysecretkey";

// =======================
// 🔹 CONNECT TO MONGODB
// =======================
mongoose.connect("mongodb://127.0.0.1:27017/jwtDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// =======================
// 🔹 USER MODEL
// =======================
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// =======================
// 🔹 REGISTER ROUTE
// =======================
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({ message: "User registered successfully" });
});

// =======================
// 🔹 LOGIN ROUTE
// =======================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: "Wrong password" });
  }

  // generate token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

// =======================
// 🔹 MIDDLEWARE
// =======================
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

// =======================
// 🔹 PROTECTED ROUTE
// =======================
app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
});

// =======================
// 🔹 SERVER
// =======================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});