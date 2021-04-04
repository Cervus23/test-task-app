const products = [
  { id: "1", name: "GREEN MUNG BEAS", price: 100, qty: 1 },
  { id: "2", name: "LAIRD GREEN LENTILS", price: 100, qty: 1 },
  { id: "3", name: "FAVA BEAN", price: 100, qty: 1 },
];

const summary = { subtotal: 0, shipping: 0, tax: 0, total: 0 };

const sumOfProducts = (elements) => {
  summary.subtotal = 0;
  summary.tax = 10;

  if (elements[0] === null) {
    summary.subtotal = 0;
    summary.shipping = 0;
    summary.tax = 0;
    summary.total = 0;
  } else {
    elements.forEach(
      (element) => (summary.subtotal += element.price * element.qty)
    );
    summary.total = summary.subtotal + summary.tax;
  }
};

const addElementToCart = (element) => {
  const productCart = document.querySelector(".product-table");

  const product = document.createElement("div");

  const itemInfo = document.createElement("div");
  const itemImage = document.createElement("div");
  const itemImageText = document.createElement("span");
  const removeBtn = document.createElement("button");
  const itemName = document.createElement("span");

  const tablePrice = document.createElement("div");

  const tableQty = document.createElement("input");

  const tableSubtotal = document.createElement("div");

  tableQty.value = element.qty;
  tableQty.setAttribute("type", "number");

  itemImageText.innerHTML = "IMAGE 115 x 115";
  itemName.innerHTML = element.name;
  tablePrice.innerHTML = element.price;
  tableSubtotal.innerHTML = element.price * element.qty;

  product.appendChild(itemInfo);
  product.appendChild(tablePrice);
  product.appendChild(tableQty);
  product.appendChild(tableSubtotal);

  itemInfo.appendChild(itemImage);
  itemInfo.appendChild(itemName);

  itemImage.appendChild(itemImageText);
  itemImage.appendChild(removeBtn);

  product.classList.add("item-container");

  itemInfo.classList.add("item-info");
  itemImage.classList.add("item-image");
  itemImageText.classList.add("item-image-text");
  removeBtn.classList.add("remove-btn");
  itemName.classList.add("table-text", "item-name");

  tablePrice.classList.add("table-text", "table-price");

  tableQty.classList.add("table-text", "table-qty");

  tableSubtotal.classList.add("table-text", "table-subtotal");

  product.id = element.id;
  removeBtn.id = element.id;
  tableQty.id = element.id;
  tableSubtotal.id = element.id;

  productCart.appendChild(product);
};

const displaySummary = () => {
  const subtotal = document.getElementById("subtotal");
  const shipping = document.getElementById("shipping");
  const tax = document.getElementById("tax");
  const total = document.getElementById("total");

  subtotal.innerHTML = `: $${summary.subtotal}`;
  shipping.innerHTML = `: $${summary.shipping}`;
  tax.innerHTML = `: $${summary.tax}`;
  total.innerHTML = `: $${summary.total}`;
};

sumOfProducts(products);
displaySummary();

products.forEach((product) => addElementToCart(product));

const cart = document.querySelector(".product-table");

const removeButtons = document.querySelectorAll(".remove-btn");
const qtyInputs = document.querySelectorAll(".table-qty");

const removeProduct = (button) => {
  const id = button.getAttribute("id");
  const productToRemove = document.getElementById(id);

  const updatedProducts = products.filter((product) => product.id !== id);

  products.forEach((product, idx) => {
    if (updatedProducts.length > 0) {
      if (product.id !== updatedProducts[idx].id) {
        products.splice(idx, 1);
      }
    } else products[0] = null;
  });
  cart.removeChild(productToRemove);
  sumOfProducts(products);

  displaySummary();
};

const onQtyChangeHandler = (input) => {
  const id = input.getAttribute("id");
  const productToUpdate = document.getElementById(id);
  const subtotal = productToUpdate.querySelector(".table-subtotal");

  if (input.value === "" || input.value < 0) input.value = 0;

  products[id].qty = input.value;
  subtotal.innerHTML = input.value * products[id].price;
  sumOfProducts(products);
  displaySummary();
};

qtyInputs.forEach((input) =>
  input.addEventListener("change", (event) => {
    event.preventDefault();
    onQtyChangeHandler(input);
  })
);

removeButtons.forEach((button) =>
  button.addEventListener("click", function (event) {
    event.preventDefault();
    removeProduct(button);
  })
);
