const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;
const app = express();
// middleware for parsing JSON
app.use(express.json());
// mongodb connection
const MONGO_URL = "mongodb://localhost:27017/mynewdb";
// Connecting to MongoDB
mongoose
 .connect(MONGO_URL)
 .then(() => console.log("MongoDB connected"))
 .catch((err) => console.log("MongoDB connection error", err));
 // define user schema and model
const productSchema = new mongoose.Schema({
 _id: Number,
 name: String,
 price: Number,
 quantity: Number,
});
const Product = mongoose.model("Product", productSchema);
// API routes
// 1. create a Product (POST)
app.post("/products", async (req, res) => {
 try {
 const product = new Product({
 _id: req.body._id,
 name: req.body.name,
 price: req.body.price,
 quantity: req.body.quantity,
 });
 await product.save();
 res.status(201).json(product);
 } catch (err) {
 res.status(400).json({ error: err.message });
 }
});
// 2. *GET All Products* (GET)
app.get("/products", async (req, res) => {
 try {
 const products = await Product.find();
 res.json(products);
 } catch (err) {
 res.status(500).json({ error: err.message });
 }
});
// 2. *GET Single Product by ID* (GET)
app.get("/products/:id", async (req, res) => {
 try {
 const product = await Product.findById(req.params.id);
 if (!product) return res.status(404).json({ error: "product not found" });
 res.json(product);
 } catch (err) {
 res.status(500).json({ error: err.message });
 }
});
// 2. *Update Product by ID* (GET)
app.put("/products/:id", async (req, res) => {
 try {
 const product = await Product.findByIdAndUpdate(
 req.params.id,
 {
 name: req.body.name,
 price: req.body.price,
 quantity: req.params.quantity,
 },
 { new: true }
 );
 if (!product) return res.status(404).json({ error: "product not found" });
 res.json(product);
 } catch (err) {
 res.status(500).json({ error: err.message });
 }
});
// 5. *Delete Product by ID* (DELETE)
app.delete("/products/:id", async (req, res) => {
 try {
 const product = await Product.findByIdAndDelete(req.params.id);
 if (!product) return res.status(404).json({ error: "product not found" });
 res.json({ message: "user deleted successfully" });
 } catch (err) {
 res.status(500).json({ error: err.message });
 }
});
// Start the Express server
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));