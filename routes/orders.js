// routes/orders.js
// -----------------------------------------------------------
// Order processing: Cart checkout karke order create karna,
// aur user apne purane orders dekh sake
// -----------------------------------------------------------
const express = require("express");
const router = express.Router();
const { readDB, writeDB } = require("../data/db");
const { requireLogin } = require("../middleware/auth");

// POST /api/orders  -> naya order banao (login zaroori hai)
router.post("/", requireLogin, (req, res) => {
  const { items, address } = req.body;
  // items = [{ productId, quantity }, ...]

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Cart khali hai." });
  }
  if (!address) {
    return res.status(400).json({ error: "Delivery address zaroori hai." });
  }

  const db = readDB();
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = db.products.find((p) => p.id === item.productId);
    if (!product) continue;

    if (product.stock < item.quantity) {
      return res.status(400).json({ error: `${product.name} ka stock kam hai.` });
    }

    totalAmount += product.price * item.quantity;
    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });

    // Stock kam karo (order processing)
    product.stock -= item.quantity;
  }

  const newOrder = {
    id: db.nextOrderId,
    userId: req.session.userId,
    items: orderItems,
    totalAmount,
    address,
    status: "Placed",
    createdAt: new Date().toISOString(),
  };

  db.orders.push(newOrder);
  db.nextOrderId += 1;
  writeDB(db);

  res.json({ message: "Order placed successfully!", order: newOrder });
});

// GET /api/orders  -> login user ke sabhi orders
router.get("/", requireLogin, (req, res) => {
  const db = readDB();
  const myOrders = db.orders.filter((o) => o.userId === req.session.userId);
  // Sabse naya order sabse upar dikhe
  myOrders.reverse();
  res.json(myOrders);
});

module.exports = router;
