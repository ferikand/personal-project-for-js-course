// add product

export const setupProductForms = (client) => {
  const productForm = document.getElementById("productForm")

  if (productForm)
    productForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const {
        data: { session },
      } = await client.auth.getSession()
      const accessToken = session?.access_token

      if (!accessToken) {
        alert("Будь ласка, увійдіть у систему для іиконання цієї операції.")
        return
      }

      const applicationInput = document.getElementById("applications").value
      const application = applicationInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
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
          Authorization: `Bearer ${accessToken}`,
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
          // console.error("Error:", error)
          alert("Error adding product")
        })
    })

  // delete product

  const productDeleteForm = document.getElementById("productDeleteForm")
  if (productDeleteForm)
    productDeleteForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const {
        data: { session },
      } = await client.auth.getSession()
      const accessToken = session?.access_token

      if (!accessToken) {
        alert("Будь ласка, увійдіть у систему для іиконання цієї операції.")
        return
      }

      const idDelete = document.getElementById("idDelete").value

      fetch(`http://localhost:3000/delete-product/${idDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => {
        alert("Product deleted successfully!")
        document.getElementById("productDeleteForm").reset()
      })
    })

  // change product

  const productChangeForm = document.getElementById("productChangeForm")
  if (productChangeForm)
    productChangeForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const {
        data: { session },
      } = await client.auth.getSession()
      const accessToken = session?.access_token

      if (!accessToken) {
        alert("Будь ласка, увійдіть у систему для іиконання цієї операції.")
        return
      }

      const applicationsChange =
        document.getElementById("applicationsChange").value
      const productNameChange =
        document.getElementById("productNameChange").value
      const priceChange = document.getElementById("priceChange").value
      const imgSrcChange = document.getElementById("imgSrcChange").value
      const productInfoChange =
        document.getElementById("productInfoChange").value
      const idChange = document.getElementById("idChange").value
      // console.log(idChange)

      const updatedProduct = {}
      if (applicationsChange)
        updatedProduct.application = applicationsChange
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
      if (productNameChange) updatedProduct.productName = productNameChange
      if (priceChange) updatedProduct.price = priceChange
      if (imgSrcChange) updatedProduct.imgSrc = imgSrcChange
      if (productInfoChange) updatedProduct.productInfo = productInfoChange

      fetch(`http://localhost:3000/update-product/${idChange}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedProduct),
      }).then((response) => {
        if (response.ok) {
          alert("Продукт успішно оновлено")
          document.getElementById("productChangeForm").reset()
        } else if (response.status === 404) {
          alert("Продукт не знайдено!")
        }
      })
    })
}
