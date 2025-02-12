const express = require("express");
const Product = require("../models/Product");

const router = express.Router();
const validCategories = ["HTML & CSS", "React-js", "Next-js", "Node-js", "JavaScript"];

// إرجاع جميع المنتجات
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// إضافة منتج جديد
router.post("/", async (req, res) => {
  try {
    const { name, description, image, githubLink, projectLink, category } = req.body;

    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "التصنيف غير صالح" });
    }

    const newProduct = new Product({ name, description, image, githubLink, projectLink, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// تحديث منتج
router.put("/:id", async (req, res) => {
  try {
    const { category } = req.body;
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "التصنيف غير صالح" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// حذف منتج
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "تم حذف المنتج بنجاح" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
