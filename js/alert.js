import { handleSmallModalClick } from "./add-to-cart.js"
import { Alert, Toast } from "bootstrap"

export function showAlert(message, success = true) {
  const alertContainer = document.querySelector(".alert-container")
  alertContainer.innerHTML = `<div class="alert ${
    success ? "alert-success" : "alert-danger"
  } alert-dismissible fade show" role="alert">
          <strong>${message}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>`

  const alertEl = alertContainer.querySelector(".alert")
  // const bsAlert = new Alert(alertEl)
  const toast = new Toast(alertEl, { autohide: true, delay: 3000 })
  toast.show()

  // setTimeout(() => {
  //   if (alertEl && alertEl.classList.contains("show")) {
  //     bsAlert.close()
  //   }
  // }, 3000)

  alertContainer.removeEventListener("click", handleSmallModalClick)
  alertContainer.addEventListener("click", handleSmallModalClick)
}
