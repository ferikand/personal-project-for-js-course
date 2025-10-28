const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const loginForm = document.querySelector("#loginForm")

if (loginForm)
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: username,
      password: password,
    })

    if (error) {
      console.error("Помилка входу:", error.message)
      alert(`Помилка входу: ${error.message}`)
      return
    }

    if (data.user) {
      window.location.href = "add_product.html"
    }

    fetch("../api/users.json")
      .then((response) => response.json())
      .then((users) => {
        const admin = users.find(
          (user) => user.login === username && user.password === password
        )
        if (admin) {
          window.location.href = "add_product.html"
        }
      })
  })
