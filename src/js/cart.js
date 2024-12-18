import { removeItem ,cartItemCountLS} from "./cartFunctions.js"

let getCartItems = JSON.parse(localStorage.getItem("cartList"))
let listContainer = document.querySelector(".ul")
let totalPrice = document.querySelector(".cart_totalAmount")
let cartItemCount = document.querySelector("#itemCounter")
let itemAmount = document.querySelector(".itemCountCounter")
let counter = 0



// itemAmount.innerHTML = counter
const showCartItems = (data) => { 
    cartItemCount.innerHTML = cartItemCountLS()
    listContainer.innerHTML = data.map(items => (
        `<li class="CartItem" id=${items.id}>
        <img class="itemImage" src="${items.image}" width="100px" height="100px" alt="">
        <div class="itemTitleWrapper">
        <span class="itemTitle">${items.title}</span>
        <p class="itemDescription">${items.description}</p>
        </div>
        <div class="itemCountWrapper">
        <button class="itemCountBtn" id="countMinus"> - </button>
        <span class="itemCountCounter"></span>
        <button class="itemCountBtn" id="countPlus"> + </button>
        </div>
        <h3 class="itemPrice">$ ${items.price} </h3>
        <img id="removeItemBtn" data-id=${items.id} src="../src/images/icons/icons8-trash-128.png" role="button"/>
        </li>`
    )).join(" ")
}
showCartItems(getCartItems) 

const deleteBtn = listContainer.querySelectorAll("img");
 deleteBtn.forEach((img) => { 
    img.addEventListener("click", (event) => { 
        const itemId = parseInt(event.target.dataset.id)
        removeItem(itemId)
        let newCartList = JSON.parse(localStorage.getItem("cartList"))
        showCartItems(newCartList)
    })
 })


// const addBtn = listContainer.querySelectorAll("#countPlus");
//  addBtn.forEach((btn) => { 
//     btn.addEventListener("click", () => { 

//         console.log("clicked");
//     })
//  })



// -------------------------------------------------------------- 

//  TO FIX 
//  - items are not dissapearing when runing the removeitem, only removes from LS
//  - add and substract item function 
  