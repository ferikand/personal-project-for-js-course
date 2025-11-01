import { handleSmallModalClick } from "./add-to-cart.js"
export function showAlert(message, success = true) {
  const alertContainer = document.querySelector(".alert-container")
  // alertContainer.innerHTML = `<div class="alert ${
  //   success ? "alert-success" : "alert-danger"
  // } alert-dismissible fade show" role="alert">
  //         <strong>${message}</strong>
  //         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  //    </div>`

  // const bsAlert = new bootstrap.Alert(alertContainer.querySelector(".alert"))
  // setTimeout(() => bsAlert.close(), 3000)
  alertContainer.innerHTML = `<div class=" alert ${
    success ? "custom-alert-success " : "custom-alert-danger  "
  }">
          <span class="custom-alert-message ">${message}</span>
          <span class="custom-alert-close-btn  btn-close"></span>
      </div>`

  const closeBtn = alertContainer.querySelector(".btn-close")
  closeBtn.addEventListener("click", () => {
    alertContainer.innerHTML = ""
  })

  const timer = setTimeout(() => {
    alertContainer.innerHTML = ""
  }, 3000)

  alertContainer.addEventListener("click", handleSmallModalClick)

  return () => clearTimeout(timer)
}
