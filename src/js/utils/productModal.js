import { getProducts } from "../services/apiService.js";
import { getById } from "../cartFunctions.js";
import { filterSelectEl, showItemsCount, displayProducts } from "../app.js";

async function productModal(productId) {
  let modalData = await getProducts();
  let item = modalData.find(
    (product) => product.id === parseInt(productId)
  );

  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modal", "modal-product");
  modalWindow.innerHTML = `
    <article class="modal-inner" data-id="${item.id}">
      <div class="modal-header">
        <h2 class="modal-title"></h2>
        <button class="cta-inverted close-modal"> To Shop <img src="./src/images/icons/arrow-left-drk.svg" width="24" height="24" alt="Back"></button>
      </div>
      <div class="modal-container">
        <figure><img class="product-img" src="${item.image}" alt="${item.title}" width="150" height="175" /></figure>
        <div class="modal-content">
          <label class="badge close-modal" data-cat="${item.category}">${item.category}</label>
          <h3 class="modal-content-title">${item.title}</h3>
          <p>${item.description}</p>
          <p class="product-price">$${item.price}</p>
          <div class="product-footer">
            <div class="quantity-selector">
              <button class="btn minus">-</button>
              <input type="number" class="quantity" value="1" min="1">
              <button class="btn plus">+</button>
            </div>
            <p class="product-rating">
              <img src="./src/images/rating-star.svg" width="17" height="17" alt="Star rating">
              ${item.rating.rate}
              <span>${item.rating.count} ratings</span>
            </p>
          </div>
          <button class="cta add-to-cart-btn" data-id="${item.id}">
            <img src="./src/images/icons/shopping-bag-add-lgt.svg" width="24" height="24" alt="Chevron down"> Add to cart
          </button>
        </div>
      </div>
    </article>
  `;

  // Select Category
  modalWindow
    .querySelectorAll(".close-modal")
    .forEach(item => item.addEventListener("click", (e) => {
      modalWindow.remove();
      document.body.classList.remove("modal-open");

      if (e.target.nodeName === "LABEL") {
        filterSelectEl.value = e.target.dataset.cat;
        displayProducts();
      }
    }));

  // Add to Cart
  modalWindow
    .querySelector(".add-to-cart-btn")
    .addEventListener("click", (e) => {
      const catchId = parseInt(e.target.getAttribute("data-id"));
      getById(modalData, catchId);
      showItemsCount();
    });

  document.body.appendChild(modalWindow);
  document.body.classList.add("modal-open");
}

export { productModal };
