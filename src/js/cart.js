import { getProducts } from "./services/apiService.js";
import { removeItem, cartItemCountLS, cartItemQuantityLS } from "./cartFunctions.js";
import { notificationBar } from "./utils/notificationBar.js";

const cartCountEl = document.getElementById("item-count");
const listContainer = document.getElementById("cart-item-list");
const emptyCartEl = document.getElementById("empty-cart");
const cartItemCount = document.getElementById("cart-container");
let fetchedProducts = null;
let totalPrice = document.querySelector(".cart_totalAmount");
let cartLS = JSON.parse(localStorage.getItem("cartList"));

// Fetch items if no items in Local storage
fetchedProducts = JSON.parse(localStorage.getItem("fetchedItems")) || await getProducts();
localStorage.setItem("fetchedItems", JSON.stringify(fetchedProducts));

const getCartItems = (cartLS, fetchedProducts) => {
  const fetchedProductIds = fetchedProducts.map(p => p.id);
  return cartLS
    .filter(item => fetchedProductIds.includes(item.id))
    .map(item => {
      const product = fetchedProducts.find(product => product.id === item.id);
      return { ...product, quantity: item.quantity };
    });
};

const cartItems = getCartItems(cartLS, fetchedProducts);

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

const showCartItems = (data) => {
  listContainer.innerHTML = data
    .map(
      (item) =>
        `<li class="cart-item" data-id=${item.id} data-price="${item.price}">
          <figure class="product-img">
            <img src="${item.image}" alt="${item.title}" width="150" height="175" />
          </figure>

          <div class="product-content">
            <p class="product-title truncate-1">${item.title}</p>
            <p class="product-description truncate-1">${item.description}</p>

            <div class="product-footer">
              <div class="item-quantity-selector" data-min="1" data-max="5">
                <button class="cta-inverted icon-only subtract" ${cartItemQuantityLS(item.id) <= 1 && "disabled"}>
                  <img src="./src/images/icons/minus-drk.svg" width="24" height="24" alt="Decrease">
                </button>
                <input class="item-quantity" type="number" value="${cartItemQuantityLS(item.id)}" step="1" min="1" max="5" disabled>
                <button class="cta-inverted icon-only add" ${cartItemQuantityLS(item.id) >= 5 && "disabled"}>
                  <img src="./src/images/icons/plus-drk.svg" width="24" height="24" alt="Increase">
                </button>
              </div>

              <p class="itemPrice">$${calculateItemTotal(item.price, cartItemQuantityLS(item.id)).toFixed(2)}</p>
            </div>
          </div>

          <button class="cta-inverted icon-only delete-item">
            <img src="../src/images/icons/trash-drk.svg" width="24" height="24" alt="Close">
          </button>
        </li>`
      )
    .join(" ");
};

// Calculate total for each item
const calculateItemTotal = (itemPrice, Quantity) => {
  return itemPrice * Quantity;
}

// Update Cart item quantity
listContainer.addEventListener("click", (e) => {
  if (e.target.className.includes("subtract") || e.target.className.includes("add")) {
    const itemEl = e.target.closest(".cart-item");
    const itemQtyEl = itemEl.querySelector(".item-quantity-selector");
    const itemPriceEl = itemEl.querySelector(".itemPrice");
    const itemPrice = Number(itemEl.dataset.price);
    const itemElId = parseInt(itemEl.dataset.id);
    const itemInCart = cartLS.find(item => item.id === itemElId);

    if (e.target.className.includes("subtract")) {
      itemQtyEl.querySelector(".item-quantity").value --;
      itemQtyEl.querySelector(".add").disabled = false;

      if (itemQtyEl.querySelector(".item-quantity").value < 2) {
        e.target.disabled = true;
      }
    }

    if (e.target.className.includes("add")) {
      itemQtyEl.querySelector(".item-quantity").value ++;
      itemQtyEl.querySelector(".subtract").disabled = false;

      if (itemQtyEl.querySelector(".item-quantity").value > 4) {
        e.target.disabled = true;
      }
    }

    // Set quantity
    itemInCart.quantity = parseInt(itemQtyEl.querySelector(".item-quantity").value);
    itemPriceEl.textContent = `$${calculateItemTotal(itemPrice, itemQtyEl.querySelector(".item-quantity").value).toFixed(2)}`;
    calculateItemTotal()

    // Save to localstorage & Update cart
    localStorage.setItem("cartList", JSON.stringify(cartLS));

    cartItemCountLS();
    updateCartStatus();
    total();
  }
});

const total = () => {
  totalPrice.textContent =
    "$" + cartItems.reduce((acc, item) => {
      return acc + calculateItemTotal(item.price, cartItemQuantityLS(item.id))
    }, 0).toFixed(2);
};

total();

const setupDeleteButtons = () => {
  const deleteBtn = listContainer.querySelectorAll(".delete-item");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.closest(".cart-item").dataset.id);
      removeItem(itemId);

      cartLS = JSON.parse(localStorage.getItem("cartList")) || [];
      const updatedCart = getCartItems(cartLS, fetchedProducts);
      showCartItems(updatedCart);
      setupDeleteButtons();
      updateCartStatus();
      total();

      notificationBar(`<img src="./src/images/icons/check-drk.svg" width="24" height="24" alt="Close">Item removed!`);
    });
  });
};


showCartItems(cartItems);
setupDeleteButtons();
updateCartStatus();
