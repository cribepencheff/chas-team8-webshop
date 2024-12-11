// Select the input and button elements
const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search");

// Fetch data from the API
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => {
    // Define the search function
    function searchItems(array, searchTerm, searchKey) {
      // Convert the search term to lowercase for case-insensitive search
      const lowerCaseTerm = searchTerm.toLowerCase();
      
      // Filter the array for objects that match the search term
      return array.filter(item =>
        item[searchKey]?.toString().toLowerCase().includes(lowerCaseTerm)
      );
    }

    //  the search button
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value; // Get the user input
      const searchKey = "title"; // key is "title"

      if (searchTerm.trim() === "") {
        console.log("Please enter a search term.");
        return;
      }

      const results = searchItems(json, searchTerm, searchKey); // Perform the search
      console.log("Search Results:", results); // Display results in the console
    });
  })
  .catch(error => console.error("Error fetching products:", error));



  fetch('https://fakestoreapi.com/products')
  .then(res=>res.json())
  .then(json=>console.log(json))






/*
 --------- WISH LIST AND CART ITEM COUNT ------------------------
// Function to update the item count
function updateCartItemCount(count) {
  const itemCountElement = document.querySelector('.item-count');
  if (count > 0) {
    itemCountElement.textContent = count;
    itemCountElement.style.display = 'flex'; 
  } else {
    itemCountElement.style.display = 'none'; 
  }
}


//updateCartItemCount(5);
//updateCartItemCount(0); 

function updateWishItemCount(count) {
  const itemCountElement = document.querySelector('.wish-count');
  if (count > 0) {
    itemCountElement.textContent = count;
    itemCountElement.style.display = 'flex'; 
  } else {
    itemCountElement.style.display = 'none'; 
  }
}


//updateWishItemCount(5);
//updateWishItemCount(3); 
*/