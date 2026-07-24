// cart.js -> Cart page ka logic: items dikhana, remove karna, checkout karna

function renderCart() {
  const cart = getCart();
  const itemsBox = document.getElementById("cart-items");
  const summaryBox = document.getElementById("cart-summary-box");

  if (cart.length === 0) {
    itemsBox.innerHTML = `<p class="empty-msg">Aapka cart khali hai. <a href="/index.html" class="btn" style="margin-top:10px;display:inline-block;">Shopping Karo</a></p>`;
    summaryBox.innerHTML = "";
    return;
  }

  itemsBox.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="info">
        <h3>${item.name}</h3>
        <div class="price">₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}</div>
      </div>
      <button class="remove-btn" data-id="${item.productId}">Remove</button>
    </div>
  `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  summaryBox.innerHTML = `
    <div class="cart-summary">
      <div class="total">Total: ₹${total}</div>
      <div class="form-group">
        <label for="address">Delivery Address</label>
        <textarea id="address" rows="3" placeholder="Apna pura address likhein..."></textarea>
      </div>
      <button class="btn btn-block" id="checkout-btn">Checkout / Place Order</button>
      <p class="form-message" id="checkout-msg"></p>
    </div>
  `;

  // Remove button clicks
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.dataset.id));
      renderCart();
    });
  });

  document.getElementById("checkout-btn").addEventListener("click", handleCheckout);
}

async function handleCheckout() {
  const msg = document.getElementById("checkout-msg");
  const address = document.getElementById("address").value.trim();

  if (!address) {
    msg.textContent = "Delivery address dalna zaroori hai.";
    msg.className = "form-message error-msg";
    return;
  }

  // Pehle check karo user login hai ya nahi
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = "/login.html?redirect=cart";
    return;
  }

  const cart = getCart();
  const items = cart.map((item) => ({ productId: item.productId, quantity: item.quantity }));

  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, address }),
  });

  const data = await res.json();

  if (!res.ok) {
    msg.textContent = data.error || "Order place nahi ho paya.";
    msg.className = "form-message error-msg";
    return;
  }

  clearCart();
  window.location.href = "/orders.html";
}

renderCart();
