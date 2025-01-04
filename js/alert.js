export function showAlert(message, success = true) {
  const alertContainer = document.querySelector(".alert-container")
  alertContainer.innerHTML = `<div class="alert ${
    success ? "alert-success" : "alert-danger"
  } alert-dismissible fade show" role="alert">
          <strong>${message}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>`

  const bsAlert = new bootstrap.Alert(alertContainer.querySelector(".alert"))
  setTimeout(() => bsAlert.close(), 2000)
}
