// server.js
// -----------------------------------------------------------
// "Ashutosh" E-commerce Store - Main server file
// Yahan se poora backend start hota hai
// -----------------------------------------------------------
const express = require("express");
const session = require("express-session");
const path = require("path");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middlewares ----
app.use(express.json()); // JSON body data padhne ke liye
app.use(express.static(path.join(__dirname, "public"))); // frontend files serve karo

// Session setup (login ke liye) - user ka login state cookie me store hota hai
app.use(
  session({
    secret: "ashutosh-ecommerce-secret-key", // real project me isse .env me rakhna chahiye
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 din tak login yaad rahega
  })
);

// ---- API Routes ----
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// ---- Server start ----
app.listen(PORT, () => {
  console.log(`✅ Ashutosh E-commerce server chal raha hai: http://localhost:${PORT}`);
});
