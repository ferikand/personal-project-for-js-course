export function initLoginForm(supabaseClient) {
  const loginForm = document.querySelector("#loginForm")

  if (!loginForm) return

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
  })
}
