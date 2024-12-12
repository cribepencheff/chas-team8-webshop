
let getCartItems = JSON.parse(localStorage.getItem("cartList"))
let listContainer = document.querySelector(".ul")


    listContainer.innerHTML = getCartItems.map(items => (
        `<li class="CartItem" id=${items.id}>
                            <img class="itemImage" src="${items.image}" width="100px" height="100px" alt="">
                            <div class="itemTitleWrapper">
                                <span class="itemTitle">${items.title}</span>
                                <p class="itemDescription">${items.description}</p>
                            </div>
                            <div class="itemCountWrapper">
                                <button class="itemCountBtn"> - </button>
                                <span class="itemCountCounter"></span>
                                <button class="itemCountBtn"> + </button>
                            </div>
                            <h3 class="itemPrice">$ ${items.price} </h3>
                            <img id="removeItemBtn" src="../src/images/icons/icons8-trash-128.png"/>
                        </li>`
    )).join(" ")

