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

const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseDB = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const SUPABASE_PUBLIC_KEY = process.env.SUPABASE_ANON_KEY
const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY)

const protectRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization
  // console.log("Authorization Header:", authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Авторизація необхідна. Токен не надано." })
  }

  const token = authHeader.split(" ")[1]

  const { data, error } = await supabaseDB.auth.getUser(token)

  if (error || !data.user) {
    return res.status(401).json({ error: "Недійсний або прострочений токен" })
  }

  req.user = data.user
  next()
}

// Get all products
app.get("/products", async (req, res) => {
  try {
    const { data, error } = await supabaseAuth.from("products").select("*")
    // .order("created_at", { ascending: false })
    if (error) throw error
    res.json(data)
  } catch (err) {
    // console.error(err)
    res.status(500).json({ error: err.message || "Server error" })
  }
})

// Add product
app.post("/add-product", protectRoute, async (req, res) => {
  try {
    const newProduct = req.body
    // console.log("Incoming product data:", newProduct)
    const { data, error } = await supabaseDB
      .from("products")
      .insert([newProduct])
      .select()
    if (error) {
      // console.error("Supabase ERROR:", error)
      throw error
    }
    // console.log("Supabase Success data:", data)
    res.status(201).json({ message: "Product added successfully", data })
  } catch (err) {
    // console.error(err)
    res.status(500).json({ error: err.message || "Server error" })
  }
})

// Delete product by id
app.delete("/delete-product/:id", protectRoute, async (req, res) => {
  try {
    const productId = req.params.id
    const { data, error } = await supabaseDB
      .from("products")
      .delete()
      .eq("id", productId)
      .select()
    if (error) throw error
    if (!data || data.length === 0)
      return res.status(404).json({ message: "Product not found" })
    res.json({ message: "Product deleted successfully", data })
  } catch (err) {
    // console.error(err)
    res.status(500).json({ error: err.message || "Server error" })
  }
})

// Update product by id
app.put("/update-product/:id", protectRoute, async (req, res) => {
  try {
    const productId = req.params.id
    const updatedProduct = req.body
    if (
      updatedProduct.application &&
      Array.isArray(updatedProduct.application)
    ) {
      updatedProduct.application = `{${updatedProduct.application.join(",")}}`
    }
    const { data, error } = await supabaseDB
      .from("products")
      .update(updatedProduct)
      .eq("id", productId)
      .select()
    if (error) throw error
    if (!data || data.length === 0)
      return res.status(404).json({ message: "Product not found" })
    res.json({ message: "Product updated successfully", data })
  } catch (err) {
    // console.error(err)
    res.status(500).json({ error: err.message || "Server error" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
