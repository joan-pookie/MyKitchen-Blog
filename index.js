const form = document.getElementById("itemForm");
const container = document.getElementById("itemsContainer");

// Load from localStorage or start with empty list
let items = JSON.parse(localStorage.getItem("kitchenItems")) || [];

// Save to localStorage
function saveItems() {
  localStorage.setItem("kitchenItems", JSON.stringify(items));
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;
  const expiry = document.getElementById("expiry").value;
  const category = document.getElementById("category").value;

  const newItem = {
    id: Date.now(),
    name,
    quantity,
    expiry,
    category
  };

  items.push(newItem);
  saveItems();
  form.reset();
  displayItems();
});

// Get expiry color
function getExpiryClass(expiryDate) {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const daysLeft = (expiry - now) / (1000 * 60 * 60 * 24);

  if (daysLeft < 0) return "red";
  if (daysLeft <= 3) return "orange";
  return "green";
}

// Display items vertically
function displayItems() {
  container.innerHTML = "";
  items.forEach(item => {
    const color = getExpiryClass(item.expiry);
    const div = document.createElement("div");
    div.className = `item-card ${color}`;
    div.innerHTML = `
      <strong>${item.name}</strong>
      <p>Quantity: ${item.quantity}</p>
      <p>Expiry: ${item.expiry}</p>
      <p>Category: ${item.category}</p>
    `;
    container.appendChild(div);
  });
}

displayItems();
