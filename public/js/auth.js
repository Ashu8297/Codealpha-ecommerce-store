// auth.js -> Login aur Register dono forms yahi file handle karti hai

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

// ---------- LOGIN ----------
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("msg");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.error;
      msg.className = "form-message error-msg";
      return;
    }

    msg.textContent = "Login successful! Redirecting...";
    msg.className = "form-message success-msg";

    // Agar cart page se aaye the to wapas cart pe bhejo, warna home pe
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    setTimeout(() => {
      window.location.href = redirect === "cart" ? "/cart.html" : "/index.html";
    }, 800);
  });
}

// ---------- REGISTER ----------
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("msg");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.error;
      msg.className = "form-message error-msg";
      return;
    }

    msg.textContent = "Account ban gaya! Redirecting...";
    msg.className = "form-message success-msg";

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 800);
  });
}
