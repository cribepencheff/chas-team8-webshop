import { cartItemCountLS } from "./cartFunctions.js";

const cartCountEl = document.getElementById("item-count");
const itemListEl = document.getElementById("cart-item-list");
const emptyCartEl = document.getElementById("empty-cart");
const cartContainerEl = document.getElementById("cart-container");
let getCartItems = JSON.parse(localStorage.getItem("cartList"));

if (cartItemCountLS() > 0) {
  cartCountEl.innerHTML = `(${cartItemCountLS()} items)`;
  cartContainerEl.classList.remove("hide");
  emptyCartEl.classList.add("hide");
} else {
  cartContainerEl.classList.add("hide");
  emptyCartEl.classList.remove("hide");
}

getCartItems.length > 0 && (
  itemListEl.innerHTML = getCartItems.map(item => (
    `<li class="cart-item" id=${item.id}>
      <figure class="product-img">
        <img src="${item.image}" alt="${item.title}" width="150" height="175" />
      </figure>

      <div class="product-content">
        <p class="product-title truncate-1">${item.title}</p>
        <p class="product-description truncate-1">${item.description}</p>

        <div class="product-footer">
          <div class="itemCountWrapper">
            <button class="itemCountBtn"> - </button>
            <span class="itemCountCounter"></span>
            <button class="itemCountBtn"> + </button>
          </div>
          <p class="itemPrice">$ ${item.price} </p>
        </div>
      </div>

      <button class="cta-inverted icon-only" id="removeItemBtn">
        <img src="../src/images/icons/trash-drk.svg" width="24" height="24" alt="Close">
      </button>
    </li>`
  )).join(" ")
)
