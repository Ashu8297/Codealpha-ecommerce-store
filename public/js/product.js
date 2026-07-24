// product.js -> Product detail page ka logic

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

let currentProduct = null;

async function loadProduct() {
  const container = document.getElementById("product-container");
  const res = await fetch(`/api/products/${productId}`);

  if (!res.ok) {
    container.innerHTML = `<p class="empty-msg">Product nahi mila.</p>`;
    return;
  }

  currentProduct = await res.json();
  const p = currentProduct;

  container.innerHTML = `
    <div class="product-detail">
      <img src="${p.image}" alt="${p.name}" />
      <div class="details">
        <span class="category-tag">${p.category}</span>
        <h1>${p.name}</h1>
        <div class="price">₹${p.price}</div>
        <p class="desc">${p.description}</p>
        <p class="stock-info">${p.stock > 0 ? `In Stock (${p.stock} available)` : "Out of Stock"}</p>

        <div class="qty-selector">
          <button id="qty-minus">-</button>
          <input type="number" id="qty-input" value="1" min="1" max="${p.stock}" />
          <button id="qty-plus">+</button>
        </div>

        <button class="btn" id="add-to-cart-btn" ${p.stock === 0 ? "disabled" : ""}>
          Add to Cart
        </button>
      </div>
    </div>
  `;

  document.getElementById("qty-minus").addEventListener("click", () => {
    const input = document.getElementById("qty-input");
    if (Number(input.value) > 1) input.value = Number(input.value) - 1;
  });

  document.getElementById("qty-plus").addEventListener("click", () => {
    const input = document.getElementById("qty-input");
    if (Number(input.value) < p.stock) input.value = Number(input.value) + 1;
  });

  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    const qty = Number(document.getElementById("qty-input").value);
    addToCart(currentProduct, qty);
    alert(`${qty} x ${currentProduct.name} cart me add ho gaya!`);
  });
}

loadProduct();
