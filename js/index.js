function init() {
  import(
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
  )
  import("./home-solutions.js")
  import("./why-atmor.js")
  import("./heaters-applications.js")
  import("./product.js")
  import("./login-form.js")
  import("./add-product.js")
  import("./add-to-cart.js")
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length
let loadedPartialsCount = 0

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++
  if (loadedPartialsCount === totalPartials) init()
})
