// routes/products.js
// -----------------------------------------------------------
// Product listing aur product detail ke liye API routes
// -----------------------------------------------------------
const express = require("express");
const router = express.Router();
const { readDB } = require("../data/db");

// GET /api/products  -> sabhi products ki list
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.products);
});

// GET /api/products/:id  -> ek specific product ki detail
router.get("/:id", (req, res) => {
  const db = readDB();
  const product = db.products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

module.exports = router;
