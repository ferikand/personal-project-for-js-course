async function init() {
  const { createClient } = await import(
    "https://esm.sh/@supabase/supabase-js@2"
  )

  const SUPABASE_URL = "https://eponwrasrozhccpnpgdk.supabase.co"
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwb253cmFzcm96aGNjcG5wZ2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjUwNjgsImV4cCI6MjA3NzI0MTA2OH0.eJZFEvikePJSbrouuK2etLo6u5RRV1gHaXfijhJFWtM"

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)
  const accessToken = params.get("access_token")
  const refreshToken = params.get("refresh_token")
  const type = params.get("type")

  if (type === "invite" && accessToken) {
    console.log("👋 Запрошення активовано, токен:", accessToken)
    localStorage.setItem("supabaseAccessToken", accessToken)
    window.location.href = "/add-product.html"
  }

  const [
    homeSolutions,
    heatersApplications,
    product,
    loginFormModule,
    addToCart,
    cart,
  ] = await Promise.all([
    import("./home-solutions.js"),
    import("./heaters-applications.js"),
    import("./product.js"),
    import("./login-form.js"),
    import("./add-to-cart.js"),
    import("./cart.js"),
  ])

  loginFormModule?.initLoginForm?.(supabaseClient)

  const addProductModule = await import("./add-product.js")
  addProductModule.setupProductForms(supabaseClient)

  return { supabaseClient }
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length
let loadedPartialsCount = 0

document.body.addEventListener("htmx:afterOnLoad", async () => {
  loadedPartialsCount++
  if (loadedPartialsCount === totalPartials) {
    const { supabaseClient } = await init()
    const addProductModule = await import("./add-product.js")
    addProductModule.setupProductForms(supabaseClient)
  }
})
