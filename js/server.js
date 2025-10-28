require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env")
  process.exit(1)
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Get all products
app.get("/products", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message || "Server error" })
  }
})

// Add product
app.post("/add-product", async (req, res) => {
  try {
    const newProduct = req.body
    const { data, error } = await supabase
      .from("products")
      .insert([newProduct])
      .select()
    if (error) throw error
    res.status(201).json({ message: "Product added successfully", data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message || "Server error" })
  }
})

// Delete product by id (UUID)
app.delete("/delete-product/:id", async (req, res) => {
  try {
    const productId = req.params.id
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId)
      .select()
    if (error) throw error
    if (!data || data.length === 0)
      return res.status(404).json({ message: "Product not found" })
    res.json({ message: "Product deleted successfully", data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message || "Server error" })
  }
})

// Update product by id
app.put("/update-product/:id", async (req, res) => {
  try {
    const productId = req.params.id
    const updatedProduct = req.body
    if (
      updatedProduct.application &&
      Array.isArray(updatedProduct.application)
    ) {
      updatedProduct.application = `{${updatedProduct.application.join(",")}}`
    }
    const { data, error } = await supabase
      .from("products")
      .update(updatedProduct)
      .eq("id", productId)
      .select()
    if (error) throw error
    if (!data || data.length === 0)
      return res.status(404).json({ message: "Product not found" })
    res.json({ message: "Product updated successfully", data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message || "Server error" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
