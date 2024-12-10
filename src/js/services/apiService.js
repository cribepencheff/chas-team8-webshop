let category = document.getElementById("cat")
let val = category.value
category.value
console.log(val)

async function getData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()
    console.table(data)
    data.map(items => (
      console.log(items)
    ))
  }
  catch (error) {
    console.error("Fetch error:" , error)
  }
}

export { getData }
