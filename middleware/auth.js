// middleware/auth.js
// -----------------------------------------------------------
// Yeh function check karta hai ki user login hai ya nahi.
// Agar login session me userId maujood hai to aage jaane do (next()),
// warna 401 (Unauthorized) error bhej do.
// -----------------------------------------------------------
function requireLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next(); // user login hai, aage badho
  }
  return res.status(401).json({ error: "Please login first." });
}

module.exports = { requireLogin };
