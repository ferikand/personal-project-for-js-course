// add product

const productForm = document.getElementById("productForm")
if (productForm)
  productForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const application = [].concat(document.getElementById("applications").value)
    const productName = document.getElementById("productName").value
    const price = document.getElementById("price").value
    const imgSrc = document.getElementById("imgSrc").value
    const imgAlt = productName
    const id = document.getElementById("id").value
    const text = document.getElementById("productInfo").value
    const productInfo = `\n ${text}`

    const newProduct = {
      application,
      productName,
      price,
      imgSrc,
      imgAlt,
      id,
      productInfo,
    }

    fetch("http://localhost:3000/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (response.ok) {
          alert("Product added successfully!")
          document.getElementById("productForm").reset()
        } else {
          alert("Error adding product")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("Error adding product")
      })
  })

// delete product

const productDeleteForm = document.getElementById("productDeleteForm")
if (productDeleteForm)
  productDeleteForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const idDelete = document.getElementById("idDelete").value

    fetch(`http://localhost:3000/delete-product/${idDelete}`, {
      method: "DELETE",
    }).then((response) => {
      alert("Product deleted successfully!")
      document.getElementById("productDeleteForm").reset()
    })
  })

// change product

const productChangeForm = document.getElementById("productChangeForm")
if (productChangeForm)
  productChangeForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const applicationsChange =
      document.getElementById("applicationsChange").value
    const productNameChange = document.getElementById("productNameChange").value
    const priceChange = document.getElementById("priceChange").value
    const imgSrcChange = document.getElementById("imgSrcChange").value
    const productInfoChange = document.getElementById("productInfoChange").value
    const idChange = document.getElementById("idChange").value
    console.log(idChange)

    const updatedProduct = {}
    if (applicationsChange) updatedProduct.application = applicationsChange
    if (productNameChange) updatedProduct.productName = productNameChange
    if (priceChange) updatedProduct.price = priceChange
    if (imgSrcChange) updatedProduct.imgSrc = imgSrcChange
    if (productInfoChange) updatedProduct.productInfo = productInfoChange

    fetch(`http://localhost:3000/update-product/${idChange}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    }).then((response) => {
      if (response.ok) {
        alert("Продукт успішно оновлено")
        document.getElementById("updateForm").reset()
      } else if (response.status === 404) {
        alert("Продукт не знайдено!")
      }
    })
  })
