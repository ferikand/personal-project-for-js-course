import { handleSmallModalClick } from "./add-to-cart.js"

export function showAlert(message, success = true) {
  const alertContainer = document.querySelector(".alert-container")

  alertContainer.innerHTML = `<div class="alert ${
    success ? "custom-alert-success" : "custom-alert-danger"
  }">
          <span class="custom-alert-message">${message}</span>
          <span class="custom-alert-close-btn btn-close"></span>
      </div>`

  const closeAlertBtn = alertContainer.querySelector(".custom-alert-close-btn")
  closeAlertBtn.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    alertContainer.innerHTML = ""
  })

  const timer = setTimeout(() => {
    alertContainer.innerHTML = ""
  }, 3000)

  alertContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("custom-alert-close-btn")) {
      handleSmallModalClick(e)
    }
  })

  return () => clearTimeout(timer)
}
