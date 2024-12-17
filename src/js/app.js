import { getProducts } from "./services/apiService.js";
import { productModal } from "./utils/productModal.js";
import { getById, cartItemCountLS } from "./cartFunctions.js";

const filterSelectEl = document.getElementById("filter-select");
const sortSelectEl = document.getElementById("sort-select");
const itemsContainerEl = document.getElementById("items-container");
const loaderEl = document.getElementById("loader");
let cartCountEl = document.getElementById("item-count");

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
    fetchedProducts = await getProducts();
    unsortedProducts = Array.from(fetchedProducts);
    displayProducts(fetchedProducts);
    showItemsCount();
  } catch (error) {
    console.log(error);
    itemsContainerEl.innerHTML = `<p>Failed loading products. <br> Try Agin later.</p>`;
    loaderEl.classList.add("hide");
    itemsContainerEl.classList.remove("hide");
  }
};

const displayProducts = () => {
  const products = sortSelectEl.value === "none" ? unsortedProducts : fetchedProducts;
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

  const productsList = products
    .sort(compare || ((a, b) => 0))
    .filter((product) =>
      filterSelectEl.value !== "all"
        ? product.category === filterSelectEl.value
        : product
    )
    .map(
      (item) =>
        `<article class="product">
          <figure class="show-modal" data-id="${item.id}">
            <img class="product-img" src="${item.image}" alt="${item.title}" width="150" height="175" />
          </figure>

          <div class="product-content">
            <h3 class="product-content-title truncate show-modal" data-id="${item.id}">${item.title}</h3>
            <p class="product-content-descrition truncate">${item.description}</p>
            <div class="product-content-footer">
              <button data-id="${item.id}" class="cta-inverted icon-only">
                <img src="./src/images/icons/shopping-bag-add-drk.svg" width="24" height="24" alt="Add to cart">
              </button>
              <p class="product-price">$${item.price}</p>
              <p class="product-rating">
                <img src="./src/images/rating-star.svg" width="17" height="17" alt="Star rating">
                ${item.rating.rate}
              </p>
            </div>
          </div>
        </article>`
    )
    .join("");

  itemsContainerEl.innerHTML = productsList;
  itemsContainerEl.classList.remove("hide");
  loaderEl.classList.add("hide");

  const productArticle = itemsContainerEl.querySelectorAll(".show-modal");
  productArticle.forEach((product) => {
    product.addEventListener("click", () => {
      productModal(product.dataset.id);
    });
  });

  const productsButtons = itemsContainerEl.querySelectorAll("button");
  productsButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      // console.log("Item ID: ", productId)
      getById(fetchedProducts, productId);
      showItemsCount();
    });
  });
};

loadProducts();
filterSelectEl.addEventListener("change", displayProducts);
sortSelectEl.addEventListener("change", displayProducts);

export { filterSelectEl, displayProducts, showItemsCount }
