const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// ✅ الاتصال بقاعدة البيانات مباشرةً داخل server.js
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ Database Connection Error:", err);
    process.exit(1);
  });

// ✅ ميدل وير
app.use(cors());
app.use(express.json());

// ✅ استيراد المسارات
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");

// ✅ ربط المسارات
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
