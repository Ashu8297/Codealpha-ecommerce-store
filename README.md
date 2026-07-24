# Ashutosh - Simple E-commerce Store

Ek easy-to-understand e-commerce website, jisme yeh sab features hain:

- ✅ Product listing (Home page)
- ✅ Product details page
- ✅ Shopping cart (browser me localStorage se save hota hai)
- ✅ Order processing (checkout karke order place karna)
- ✅ User registration / login (password hashed hoke database me save hota hai)
- ✅ Database (JSON file: `data/db.json` — products, users, orders sab yahin store hote hain)

**Tech Stack:** HTML, CSS, JavaScript (frontend) + Node.js / Express.js (backend)

---

## 📁 Project Structure

```
ashutosh-ecommerce/
├── server.js              # Main server file
├── package.json
├── data/
│   ├── db.json             # Hamara "database" (JSON file)
│   └── db.js                # DB read/write helper
├── middleware/
│   └── auth.js              # Login check karne wala middleware
├── routes/
│   ├── products.js          # Product API
│   ├── auth.js               # Register/Login/Logout API
│   └── orders.js             # Order create/list API
└── public/                  # Frontend files
    ├── index.html            # Home page (product listing)
    ├── product.html           # Product details
    ├── cart.html               # Shopping cart
    ├── login.html
    ├── register.html
    ├── orders.html             # My orders
    ├── css/style.css
    └── js/
        ├── common.js           # Navbar + cart helpers (localStorage)
        ├── index.js
        ├── product.js
        ├── cart.js
        ├── auth.js
        └── orders.js
```

---

## 🚀 Kaise Chalayein (Setup Steps)

### 1. Node.js install karein
Agar system me Node.js nahi hai, to [nodejs.org](https://nodejs.org) se install kar lein (v18 ya usse upar).

### 2. Project folder me jaayein
```bash
cd ashutosh-ecommerce
```

### 3. Dependencies install karein
```bash
npm install
```
Isse `express`, `express-session`, aur `bcryptjs` install ho jaayenge.

### 4. Server start karein
```bash
npm start
```

### 5. Browser me open karein
```
http://localhost:3000
```

Bas! Aapki Ashutosh e-commerce site chalu ho gayi. 🎉

---

## 🧠 Yeh Kaise Kaam Karta Hai (Easy Explanation)

1. **Products** `data/db.json` file me pehle se daale hue hain. Home page load hote hi frontend `/api/products` API call karke unhe fetch karta hai aur grid me dikhata hai.

2. **Cart** — jab aap "Add to Cart" click karte hain, to product browser ke `localStorage` me save ho jaata hai (isliye page refresh karne par bhi cart yaad rehta hai).

3. **Register/Login** — password ko `bcryptjs` se hash karke save kiya jaata hai (real password kabhi save nahi hota). Login karne par ek session banta hai jo cookie ke through track hota hai.

4. **Order Processing** — checkout par cart items backend ko bheje jaate hain, backend stock check karta hai, total amount calculate karta hai, aur order ko `data/db.json` me save kar deta hai. Product ka stock bhi automatically kam ho jaata hai.

5. **My Orders** — login user apne saare purane orders yahan dekh sakta hai.

---

## ✏️ Customize Kaise Karein

- **Naye products add karne ke liye:** `data/db.json` file khol kar `products` array me naya item add kar dein.
- **Store ka naam/color badalna:** `public/css/style.css` me colors (`#1a2744`, `#ffb703`) badal dein, aur `public/index.html` / `common.js` me "Ashutosh" naam jahan bhi likha hai wahan apna naam daal dein.
- **Real database chahiye** (MySQL/MongoDB) to `data/db.js` file ko replace karke ORM/driver use kar sakte hain — baaki routes ka code same rahega.

---

## 📝 Note

Yeh project seekhne/demo ke liye simple rakha gaya hai (JSON file database, single secret key). Production me deploy karne se pehle:
- `.env` file me secrets rakhein
- Real database use karein (PostgreSQL/MongoDB)
- HTTPS aur secure cookies enable karein
