const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const path = require("path")
const cors = require("cors")

const app = express()
const PORT = 3000

app.use(cors())

app.use(bodyParser.json())

const productsFilePath = path.join(__dirname, "../products.json")

app.get("/products", (req, res) => {
  fs.readFile(productsFilePath, "utf8", (err, data) =>
    res.json(JSON.parse(data))
  )
})

app.post("/add-product", (req, res) => {
  const newProduct = req.body

  fs.readFile(productsFilePath, "utf8", (err, data) => {
    const products = JSON.parse(data)

    products.push(newProduct)

    fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) =>
      res.status(201).send("Product added successfully")
    )
  })
})

app.delete("/delete-product/:id", (req, res) => {
  const productId = req.params.id

  fs.readFile(productsFilePath, "utf8", (err, data) => {
    let products = JSON.parse(data)

    if (!products.some((product) => product.id === productId)) {
      console.error("Продукт не знайдено:", productId)
      return res.status(404).send("Product not found")
    }

    const updatedProducts = products.filter(
      (product) => product.id !== productId
    )

    if (products.length === updatedProducts.length) {
      return res.status(404).send("Product not found")
    }

    fs.writeFile(
      productsFilePath,
      JSON.stringify(updatedProducts, null, 2),
      (err) => {
        if (err) {
          return res.status(500).send("Error writing to products file")
        }
        res.status(200).send("Product deleted successfully")
      }
    )
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
