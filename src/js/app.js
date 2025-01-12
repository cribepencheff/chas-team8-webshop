import { getProducts } from "./services/apiService.js";
import { productModal } from "./utils/productModal.js";
import { getById, cartItemCountLS, cartItemQuantityLS } from "./cartFunctions.js";

const loaderEl = document.getElementById("loader");
const filterSelectEl = document.getElementById("filter-select");
const sortSelectEl = document.getElementById("sort-select");
const categoryTitleEl = document.querySelectorAll(".page-title");
const itemsContainerEl = document.getElementById("items-container");
const cartCountEl = document.getElementById("item-count");
let getCartLS = JSON.parse(localStorage.getItem("cartList"));

let showItemsCount = () => {
  // count the items in cart and show the count on the cart
  cartCountEl.innerHTML = cartItemCountLS();
  cartCountEl.textContent > 0
    ? cartCountEl.classList.remove("hide")
    : cartCountEl.classList.add("hide");
};

let fetchedProducts = null;
let unsortedProducts = null;

const loadProducts = async () => {
  loaderEl.classList.remove("hide");
  itemsContainerEl.classList.add("hide");

  try {
    fetchedProducts =
      JSON.parse(localStorage.getItem("fetchedItems")) || await getProducts();
    localStorage.setItem("fetchedItems", JSON.stringify(fetchedProducts));
    unsortedProducts = Array.from(fetchedProducts);
    displayProducts(fetchedProducts);
    showItemsCount();
  } catch (error) {
    console.log(error);
    itemsContainerEl.innerHTML = `<p>Failed loading products. Try Agin later.</p>`;
    loaderEl.classList.add("hide");
    itemsContainerEl.classList.remove("hide");
  }
};

const displayProducts = () => {
  const products =
    sortSelectEl.value === "none" ? unsortedProducts : fetchedProducts;
  let compare;

  switch (sortSelectEl.value) {
    case "ascending":
      compare = (a, b) => a.price - b.price;
      break;
    case "descending":
      compare = (a, b) => b.price - a.price;
      break;
    case "none":
    default:
      compare = null;
  }

  categoryTitleEl.forEach((title) => {
    title.innerHTML = filterSelectEl.options[filterSelectEl.selectedIndex].text;
  });

  const productsList = products
    .sort(compare || ((a, b) => 0))
    .filter((product) => filterSelectEl.value !== "all"
      ? product.category === filterSelectEl.value
      : product
    )
    .map(item => (
        `<article data-id="${item.id}" data-stock="5" class="product ${cartItemQuantityLS(item.id) === 5 && 'max-reached'}">
          <figure class="show-modal">
            <img class="product-img" src="${item.image}" alt="${
          item.title
        }" width="150" height="175" />
          </figure>

          <div class="product-content">
            <h3 class="product-content-title truncate show-modal">${item.title}</h3>
            <p class="product-content-descrition truncate">${
              item.description
            }</p>
            <div class="product-content-footer">
              <button class="cta-inverted icon-only">
                <img src="./src/images/icons/shopping-bag-add-drk.svg" width="24" height="24" alt="Add to cart">
              </button>

              <div class="product-details">
                <p class="product-price">$${item.price.toFixed(2)}</p>
                <p class="product-rating">
                  <img src="./src/images/rating-star.svg" width="17" height="17" alt="Star rating">
                  ${item.rating.rate}
                </p>
              </div>
            </div>
          </div>
        </article>`
    ))
    .join("");

  itemsContainerEl.innerHTML = productsList;
  itemsContainerEl.classList.remove("hide");
  loaderEl.classList.add("hide");

  const productArticle = itemsContainerEl.querySelectorAll(".show-modal");
  productArticle.forEach((product) => {
    product.addEventListener("click", () => {
      productModal(fetchedProducts, product.closest(".product").dataset.id);
    });
  });

  const productsButtons = itemsContainerEl.querySelectorAll("button");

  productsButtons.forEach((button) => {
    button.addEventListener("click", (e) => {

      const productEl = e.target.closest(".product");
      const productId = parseInt(productEl.dataset.id);
      const productStock = parseInt(productEl.dataset.stock);

      // Add to cart
      getById(fetchedProducts, productId, productStock);
      showItemsCount();

      // Get updated localstorage
      getCartLS = JSON.parse(localStorage.getItem("cartList"));
      const itemInCart = getCartLS.find(item => item.id === productId);

      // Disable product if out of stock
      if (itemInCart.quantity >= productStock) {
        productEl.classList.add('max-reached');
      }
    });
  });
};

loadProducts();
filterSelectEl.addEventListener("change", displayProducts);
sortSelectEl.addEventListener("change", displayProducts);

export { filterSelectEl, cartCountEl, displayProducts, showItemsCount };
