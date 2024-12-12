
async function getData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()
    console.table(data)
  
    return data
  }
  catch (error) {
    console.error("Fetch error:" , error)
  }
}

export { getData }
