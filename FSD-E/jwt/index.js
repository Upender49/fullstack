const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const PORT = 3000;
const SECRET_KEY = "mysecretkey"; // use env variable in real apps

// Dummy user
const USER = {
  id: 1,
  username: "admin",
  password: "1234",
};

// =======================
// 🔹 LOGIN ROUTE
// =======================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // basic validation
  if (!username || !password) {
    return res.status(400).json({ error: "Enter username & password" });
  }

  // check credentials
  if (username === USER.username && password === USER.password) {
    const token = jwt.sign(
      { id: USER.id, username: USER.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      token,
    });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

// =======================
// 🔹 MIDDLEWARE (VERIFY TOKEN)
// =======================
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token required" });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

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