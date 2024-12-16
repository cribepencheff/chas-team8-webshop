import { getProducts } from "./services/apiService.js";

let modalData = await getProducts();
console.log(modalData);




function productModal() {
  const modalWindow = document.querySelector("#items-container");
  modalWindow.addEventListener("click", (event) => {
    const clickedProduct = event.target.closest(".product");
    if (!clickedProduct) return;
    
  

  });
}

export { productModal };
