import { getProducts } from "./services/apiService.js";

const filterSelectEl = document.getElementById("filter-select");
const sortSelectEl = document.getElementById("sort-select");
const itemsContainerEl = document.getElementById("items-container");
const loaderEl = document.getElementById("loader");

async function displayProducts() {
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

  loaderEl.classList.remove("hide");
  itemsContainerEl.classList.add("hide");

  const products = await getProducts();
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
          <img class="product-img" src="${item.image}" alt="${item.title}" width="150" height="175" />
          <h3 class="truncate">${item.title}</h3>
          <p class="truncate">${item.description}</p>
          <button data-id="${item.id}">Add to cart</button>

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

  const productsButtons = itemsContainerEl.querySelectorAll("button");
  productsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Catch Product ID
      console.log(button.dataset.id);
    })
  });
}

displayProducts();
filterSelectEl.addEventListener("change", displayProducts);
sortSelectEl.addEventListener("change", displayProducts);
