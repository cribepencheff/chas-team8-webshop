import { getProducts } from "./services/apiService.js";
import { productModal } from "./utils/modal.js";
import { getById, cartItemCountLS } from "./cartFunctions.js";

const filterSelectEl = document.getElementById("filter-select");
const sortSelectEl = document.getElementById("sort-select");
const itemsContainerEl = document.getElementById("items-container");
const loaderEl = document.getElementById("loader");
let cartCount = document.querySelector("#item-count");

let showItemsCount = () => {
  // count the items in cart and show the count on the cart
  cartCount.innerHTML = cartItemCountLS();
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
          <img class="product-img show-modal" data-id="${item.id}" src="${item.image}" alt="${item.title}" width="150" height="175" />
          <h3 class="truncate show-modal" data-id="${item.id}">${item.title}</h3>
          <p class="truncate">${item.description}</p>
          <button data-id="${item.id}" >Add to cart</button>

          <div class="product-links">
            <p>Price: $${item.price}</p>
            <p>Rating: ★ ${item.rating.rate}</p>
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
      // Catch Product ID
      productModal(product.dataset.id);
      // console.log(product.dataset.id);
    });
  });

  const productsButtons = itemsContainerEl.querySelectorAll("button");
  productsButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const product = parseInt(event.target.getAttribute("data-id"));
      // Catch Product ID
      console.log(button.dataset.id);
      getById(fetchedProducts, product);
    });
  });
};

loadProducts();
filterSelectEl.addEventListener("change", displayProducts);
sortSelectEl.addEventListener("change", displayProducts);
