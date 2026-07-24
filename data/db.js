// data/db.js
// -----------------------------------------------------------
// Yeh ek chhota sa helper hai jo data/db.json file ko
// "database" ki tarah use karta hai.
// Beginners ke liye real database (MySQL/MongoDB) install karne
// ki jhanjhat nahi — JSON file hi hamara data store hai.
// -----------------------------------------------------------
const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "db.json");

// Poora data file se padhna
function readDB() {
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(raw);
}

// Poora data file me wapas likhna
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { readDB, writeDB };
