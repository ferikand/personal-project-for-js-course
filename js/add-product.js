// add product

const productForm = document.getElementById("productForm")
if (productForm)
  productForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const application = [].concat(document.getElementById("applications").value)
    const productName = document.getElementById("productName").value
    const price = document.getElementById("price").value
    const imgSrc = document.getElementById("imgSrc").value
    const imgAlt = productName
    const id = document.getElementById("id").value
    const text = document.getElementById("productInfo").value
    const productInfo = `<p>${text}</p>`

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
  productDeleteForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const idDelete = document.getElementById("idDelete").value

    fetch(`http://localhost:3000/delete-product/${idDelete}`, {
      method: "DELETE",
    })
  })
