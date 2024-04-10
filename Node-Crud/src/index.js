//* Import NPM and Module
import express from "express";
import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

const app = express();

app.use(express.json());

//* Output to Web Page
app.get("/", (req, res) => {
  res.send("Hello Admin");
});

//* Create API
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//* Read API
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    send.status(500).json({ message: error.message });
  }
});

//* Read by Single API
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//* Update API
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }
    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//* Delete API
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//* Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://danangsmkn26:yb1LaQ59EO6Y1rQC@nodeapi.cjbmert.mongodb.net/?retryWrites=true&w=majority&appName=NodeAPI"
  )
  .then(() => {
    console.log("Connected to Databases");
    app.listen(3000, () => {
      console.log("Server Running");
    });
  })
  .catch(() => {
    console.log("Connected failed");
  });
