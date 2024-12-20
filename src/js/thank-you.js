const resetBtnsEl = document.querySelectorAll(".reset-cart");

resetBtnsEl.forEach( (btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("cartList");
    location.href = "../index.html";
  })
})