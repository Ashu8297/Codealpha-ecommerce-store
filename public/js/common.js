// common.js
// -----------------------------------------------------------
// Yeh file har page par load hoti hai.
// Isme hai: navbar banane ka code, cart (localStorage) helper
// functions, aur login-check karne ka function.
// -----------------------------------------------------------

// ---------- CART HELPERS (localStorage me cart save hota hai) ----------
// Cart format: [{ productId, name, price, image, quantity }, ...]

function getCart() {
  const cart = localStorage.getItem("ashutosh_cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem("ashutosh_cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product, quantity) {
  const cart = getCart();
  const existing = cart.find((item) => item.productId === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.productId !== productId);
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem("ashutosh_cart");
  updateCartCount();
}

function cartTotalItems() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = cartTotalItems();
}

// ---------- AUTH HELPER ----------
async function getCurrentUser() {
  const res = await fetch("/api/auth/me");
  const data = await res.json();
  return data.user; // null agar login nahi hai
}

// ---------- NAVBAR ----------
async function renderNavbar() {
  const navContainer = document.getElementById("navbar");
  if (!navContainer) return;

  const user = await getCurrentUser();

  navContainer.innerHTML = `
    <div class="navbar">
      <a href="/index.html" class="logo">Ashutosh<span>.com</span></a>
      <div class="nav-links">
        <a href="/index.html">Home</a>
        <a href="/cart.html">Cart <span class="cart-count" id="cart-count">0</span></a>
        ${
          user
            ? `<a href="/orders.html">My Orders</a>
               <span>Hi, ${user.name.split(" ")[0]}</span>
               <button id="logout-btn">Logout</button>`
            : `<a href="/login.html">Login</a>
               <a href="/register.html">Register</a>`
        }
      </div>
    </div>
  `;

  updateCartCount();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", renderNavbar);
