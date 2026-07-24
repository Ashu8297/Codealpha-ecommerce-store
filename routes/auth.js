// routes/auth.js
// -----------------------------------------------------------
// User registration, login, logout ke liye routes
// Password ko bcrypt se hash karke store karte hain (plain text nahi)
// -----------------------------------------------------------
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { readDB, writeDB } = require("../data/db");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email aur password sab zaroori hain." });
  }

  const db = readDB();

  // Check karo email already registered to nahi
  const existingUser = db.users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Is email se pehle se account bana hua hai." });
  }

  // Password ko hash karo (security ke liye plain text kabhi save nahi karte)
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: db.nextUserId,
    name,
    email,
    password: hashedPassword,
  };

  db.users.push(newUser);
  db.nextUserId += 1;
  writeDB(db);

  // Register hote hi seedha login bhi kar do
  req.session.userId = newUser.id;

  res.json({ message: "Registration successful!", user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const db = readDB();
  const user = db.users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ error: "Email ya password galat hai." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Email ya password galat hai." });
  }

  req.session.userId = user.id;
  res.json({ message: "Login successful!", user: { id: user.id, name: user.name, email: user.email } });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out." });
  });
});

// GET /api/auth/me  -> abhi kaun login hai, check karne ke liye
router.get("/me", (req, res) => {
  if (!req.session.userId) {
    return res.json({ user: null });
  }
  const db = readDB();
  const user = db.users.find((u) => u.id === req.session.userId);
  if (!user) return res.json({ user: null });

  res.json({ user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
