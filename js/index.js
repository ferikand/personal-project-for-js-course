function init() {
  import(
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
  );
  import("./home-solutions.js");
  import("./why-atmor.js");
  import("./heaters-applications.js");
  import("./product.js");
  // import("./alert.js");
  // import("./product-list.js");
  // import("./product-service.js");
  import("./login-form.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
