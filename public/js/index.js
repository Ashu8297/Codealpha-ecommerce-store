// index.js -> Home page ka logic: products load karke grid me dikhana

async function loadProducts() {
  const grid = document.getElementById("product-grid");
  const res = await fetch("/api/products");
  const products = await res.json();

  grid.innerHTML = products
    .map(
      (p) => `
    <div class="product-card">
      <a href="/product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.name}" />
      </a>
      <div class="info">
        <span class="category-tag">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="price">₹${p.price}</div>
        <a href="/product.html?id=${p.id}" class="btn btn-block">View Product</a>
      </div>
    </div>
  `
    )
    .join("");
}

loadProducts();
