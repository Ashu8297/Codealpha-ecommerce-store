// orders.js -> My Orders page ka logic

async function loadOrders() {
  const listBox = document.getElementById("orders-list");

  const user = await getCurrentUser();
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  const res = await fetch("/api/orders");
  const orders = await res.json();

  if (orders.length === 0) {
    listBox.innerHTML = `<p class="empty-msg">Abhi tak koi order nahi kiya. <a href="/index.html" class="btn" style="margin-top:10px;display:inline-block;">Shopping Karo</a></p>`;
    return;
  }

  listBox.innerHTML = orders
    .map(
      (order) => `
    <div class="order-card">
      <div class="order-head">
        <div><strong>Order #${order.id}</strong> — ${new Date(order.createdAt).toLocaleString()}</div>
        <span class="status-badge">${order.status}</span>
      </div>
      ${order.items
        .map(
          (item) => `
        <div class="order-item-row">
          <span>${item.name} x ${item.quantity}</span>
          <span>₹${item.price * item.quantity}</span>
        </div>
      `
        )
        .join("")}
      <p style="margin-top:10px;"><strong>Delivery Address:</strong> ${order.address}</p>
      <p style="margin-top:6px; font-size:17px;"><strong>Total: ₹${order.totalAmount}</strong></p>
    </div>
  `
    )
    .join("");
}

loadOrders();
