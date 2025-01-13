import { notificationBar } from "./utils/notificationBar.js";

if (!localStorage.getItem("cartList")) {
  localStorage.setItem("cartList", JSON.stringify([]))
}

export let cartItemCountLS = () => {
  const cartLS = JSON.parse(localStorage.getItem("cartList"))
  if (cartLS.length === null || 0) {
    return 0
  }

  return cartLS.reduce((cartTotal, item) => cartTotal + item.quantity, 0);
}

export let cartItemQuantityLS = (itemId) => {
  let getCartLS = JSON.parse(localStorage.getItem("cartList"));
  const cartProductsLS = getCartLS.filter(product => product.id);
  return cartProductsLS.find(item => item.id === itemId)
    ? parseInt(cartProductsLS.find(item => item.id === itemId).quantity)
    : ""
}

// Get the clicked item by id
export const getById = (data, id, stock) => {
  const cartLS = JSON.parse(localStorage.getItem("cartList"));
  const itemInCart = cartLS.find(item => item.id === id);

  if (!data) {  // checks if the globaldata variable is populated or not
    console.error("data not loaded yet")
    return null
  }

  // Add to Cart
  if (itemInCart && itemInCart.quantity < stock) {
    itemInCart.quantity += 1;
    notificationBar(`<img src="./src/images/icons/check-drk.svg" width="24" height="24" alt="Close">Successfully added to cart!`);
  } else if (!itemInCart) {
    cartLS.push({ id, quantity: 1 });
    notificationBar(`<img src="./src/images/icons/check-drk.svg" width="24" height="24" alt="Close">Successfully added to cart!`);
  }

  gtag('event', 't8_add_to_cart', {
    'event_category': 'Cart Events',
    'event_label': 'Adds item to cart',
    'product_id': id
  });

  // Save to localstorage & Update cart
  localStorage.setItem("cartList", JSON.stringify(cartLS));
  cartItemCountLS();
}

// delete from cart function
export const removeItem = (id) => {
  const getCartLS = JSON.parse(localStorage.getItem("cartList"));
  const newCart = getCartLS.filter(removedItem => removedItem.id !== id);
  localStorage.setItem("cartList", JSON.stringify(newCart));
}


