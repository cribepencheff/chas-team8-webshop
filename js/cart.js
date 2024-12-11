if (!localStorage.getItem("cartList")) { 
    localStorage.setItem("cartList", JSON.stringify([]))
}
let cartCount = document.querySelector(".count") 
let productContainer = document.getElementById("posts") // change element when add to official code
let globalData = null

// -------------------------------------------------------------------------------------------------- 

async function getData() {
    try {
        const response = await fetch("https://fakestoreapi.com/products")
        const data = await response.json()
        globalData = data
        console.log(globalData);
        showItems(data)
     }
    catch (error) {
       console.error("Fetch error:" , error)
     }
}

getData()
// -------------------------------------------------------------------------------------------------- 
// -------------------------------------------------------------------------------------------------- 

const showItems = (passData) => {  
    productContainer.innerHTML = passData.map(items => (` 
        <article class="post" id=${items.id} >
        <img src="${items.image}" alt="product" height="100px" width = "100px" >
        <h2>${items.title}</h2>
        <p>${items.description}</p>
        <p>${items.category}</p>
        <p>${items.price}</p>
        <button onclick = getById(${items.id})>Add to cart</button>
        </article>
        `)). join(" ")
    }
// -------------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------------     

console.log(globalData);

let cartItemCountLS = () => {
    const getLSitems = JSON.parse(localStorage.getItem("cartList"))
    console.log( getLSitems.length);

 }

const getById = (id) => { 
    if (!globalData) {  // checks if the globaldata variable is populated or not
        console.error("data not loaded yet") 
        return null
    }

    const items = globalData.find((item) => item.id === id) //if globaldata is populated then find the item with matching id
    if (!items) {                                           // compares the id from the clicked item with and looks for the same one trought globaldata
        console.warn(`item with id:${id} is not found `);
        return null
    }
    const getCartLS = JSON.parse(localStorage.getItem("cartList"))
          getCartLS.push(items)
          localStorage.setItem("cartList", JSON.stringify(getCartLS))
    
          for (let i = 0; i < getCartLS.length; i++) {
            cartItemCountLS()
            cartCount.innerHTML = i + 1;
         }
    console.log("found item", items);
    console.log("item is added to cart");
    return items
    }

    // getData().then(() => {  // when the function has fetched all the data, it continues with .then and calls the getById function
    //     const item = getById();
    //     console.log("Retrieved item:", item);

// });

       

    

document.addEventListener("DOMContentLoaded", () => { 

})


