import { removeItem, cartItemCountLS } from "./cartFunctions.js";

const cartCountEl = document.getElementById("item-count");
const listContainer = document.getElementById("cart-item-list");
const emptyCartEl = document.getElementById("empty-cart");
const cartItemCount = document.getElementById("cart-container");
let totalPrice = document.querySelector(".cart_totalAmount");
let itemAmount = document.querySelector(".itemCountCounter");
let getCartItems = JSON.parse(localStorage.getItem("cartList"));
let counter = 0;

const updateCartStatus = () => {
  cartCountEl.innerHTML = `(${cartItemCountLS()} items)`;
  if (cartItemCountLS() > 0) {
    cartItemCount.classList.remove("hide");
    emptyCartEl.classList.add("hide");
    cartCountEl.classList.remove("hide");
  } else {
    cartItemCount.classList.add("hide");
    emptyCartEl.classList.remove("hide");
    cartCountEl.classList.add("hide");
  }
};

// itemAmount.innerHTML = counter
const showCartItems = (data) => {
  listContainer.innerHTML = data
    .map(
      (item) =>
        `<li class="cart-item" id=${item.id}>
      <figure class="product-img">
        <img src="${item.image}" alt="${item.title}" width="150" height="175" />
      </figure>

      <div class="product-content">
        <p class="product-title truncate-1">${item.title}</p>
        <p class="product-description truncate-1">${item.description}</p>

        <div class="product-footer">
          <p class="itemPrice">$ ${item.price} </p>
        </div>
      </div>

      <button class="cta-inverted icon-only" data-id=${item.id}>
        <img src="../src/images/icons/trash-drk.svg" width="24" height="24" alt="Close">
      </button>
    </li>`
    )
    .join(" ");
};

const total = () => {
  totalPrice.textContent =
    "$" + getCartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
};
total();

const setupDeleteButtons = () => {
  const deleteBtn = listContainer.querySelectorAll("button");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const itemId = parseInt(event.target.dataset.id);
      console.log(itemId);
      removeItem(itemId);
      getCartItems = JSON.parse(localStorage.getItem("cartList")) || [];
      showCartItems(getCartItems);
      setupDeleteButtons();
      updateCartStatus();
      total();
      gtag('event', `deleted item `, {
        'event_category': 'Cart Events',
        'event_label': 'Item is added to cart',
        'value': 1,
        // 'debug_mode': true,
      });
    });
  });
};

// Initiering
showCartItems(getCartItems);
setupDeleteButtons();
updateCartStatus();

// const addBtn = listContainer.querySelectorAll("#countPlus");
//  addBtn.forEach((btn) => {
//     btn.addEventListener("click", () => {

//         console.log("clicked");
//     })
//  })

// --------------------------------------------------------------

//  TO FIX
//  - items are not dissapearing when runing the removeitem, only removes from LS
//  - add and substract item function
