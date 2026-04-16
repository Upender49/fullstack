const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/crudDB")
  .then(() => console.log("MongoDB Connected"));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

const User = mongoose.model("User", UserSchema);

// CREATE
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// READ
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running on 3000"));