// File: script.js

// ===== Sample Product Data =====
const products = [];
for (let i = 1; i <= 50; i++) {
  products.push({
    id: i,
    name: `T-Shirt ${i}`,
    price: (10 + (i % 20)).toFixed(2),
    image: `products images/tshirt${i}.jpg`
  });
}

// ===== DOM Elements =====
const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const searchBox = document.getElementById("searchBox");
const authForm = document.getElementById("authForm");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = [];

// ===== Render Products =====
function renderProducts(filter = "") {
  productList.innerHTML = "";
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );
  filtered.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// ===== Add to Cart =====
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    updateCart();
  }
}

// ===== Update Cart Display =====
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += parseFloat(item.price);
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);
}

// ===== Remove from Cart =====
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// ===== Search Functionality =====
searchBox.addEventListener("input", e => {
  renderProducts(e.target.value);
});

// ===== Handle Auth Submit =====
authForm.addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username.length >= 3 && password.length >= 3) {
    localStorage.setItem("user", JSON.stringify({ username }));
    alert(`Welcome, ${username}!`);
  } else {
    alert("Enter valid username and password (min 3 chars).");
  }
});

// ===== Checkout Button =====
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Proceeding to checkout... (Simulated)");
  cart = [];
  updateCart();
});

// ===== Auto-Login if Found =====
function loadUser() {
  const userData = localStorage.getItem("user");
  if (userData) {
    const { username } = JSON.parse(userData);
    alert(`Logged in as ${username}`);
  }
}

// ===== Page Init =====
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  loadUser();
});
