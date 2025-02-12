const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  githubLink: { type: String, required: true },
  projectLink: { type: String, required: true },
  category: {
    type: String,
    enum: ["HTML & CSS", "React-js", "Next-js", "Node-js", "JavaScript"],
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);