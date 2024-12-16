import { getProducts } from "../services/apiService.js";
import { getById } from "../cartFunctions.js";
async function productModal(productId) {
  let modalData = await getProducts();
  let productObject = modalData.find(
    (product) => product.id === parseInt(productId)
  );

  const modalWindow = document.createElement("div");
  modalWindow.classList.add("product-modal");
  modalWindow.innerHTML = `
  <article class="modal-article" data-id="${productObject.id}">
  <button class="close-modal">X</button>
          <img class="product-img" src="${productObject.image}" alt="${productObject.title}" width="150" height="175" />
          <h3 class="truncate">${productObject.title}</h3>
          <p class="truncate">${productObject.description}</p>
          <button class="add-to-cart-btn" data-id="${productObject.id}">Add to cart</button>
          
          <div class="product-links">
            <p>Price: $${productObject.price}</p>
            <p>Rating: ★ ${productObject.rating.rate}</p>
          </div>
        </article>
  `;
  modalWindow.querySelector(".close-modal").addEventListener("click", () => {
    modalWindow.remove();
  });
  modalWindow
    .querySelector(".add-to-cart-btn")
    .addEventListener("click", (event) => {
      const catchId = parseInt(event.target.getAttribute("data-id"));
      getById(modalData, catchId);
    });

  document.body.appendChild(modalWindow);
  console.log(modalWindow);
}

export { productModal };
