import {
  getSelectedObjOfElement,
  selectedElementId,
  price_container,
} from "./product.js"

const deductQty = document.querySelector(".qty_deduct")
const addQty = document.querySelector(".qty_add")
const qtyMain = document.querySelector(".qty_main")
const wholePageModal = document.querySelector(".whole_page-modal")
const smallModal = document.querySelector(".modal-small")
const modalCart = document.querySelector(".modal-cart")
const closeBtn = document.querySelector(".btn-close")
const totalQuantityOfChoosenProducts = document.querySelector(
  "#total-quantity-choosen"
)

// Ініціалізація кількості
if (qtyMain) qtyMain.textContent = 0

let quantity = 0

// Оновлення ціни
const updatePrice = (quantity) => {
  getSelectedObjOfElement(selectedElementId).then((obj) => {
    if (quantity > 0) {
      price_container.innerHTML = `<p>Ціна ${(obj.price * quantity).toFixed(
        2
      )} грн</p>`
      totalQuantityOfChoosenProducts.innerText = quantity
    } else {
      price_container.innerHTML = `<p>Ціна ${parseInt(obj.price).toFixed(
        2
      )} грн</p>`
    }
  })
}

// Приховати модальні вікна
const hideModals = () => {
  wholePageModal.classList.add("hidden")
  smallModal.classList.add("hidden")
  modalCart.classList.add("hidden")
}

// Зменшення кількості
const handleDeductQty = (e) => {
  e.preventDefault()
  if (quantity > 0) {
    quantity -= 1
    qtyMain.textContent = quantity
    updatePrice(quantity)

    if (quantity <= 0) hideModals()
  }
}

// Збільшення кількості
const handleAddQty = (e) => {
  e.preventDefault()
  if (quantity >= 0 && quantity < 10) {
    quantity += 1
    qtyMain.textContent = quantity
    updatePrice(quantity)

    if (quantity > 0 && getComputedStyle(modalCart).display !== "block") {
      wholePageModal.classList.remove("hidden")
      wholePageModal.style.left = "90vw"
      smallModal.classList.remove("hidden")
    }
  }
}

// Перехід з маленького вікна до кошика
const handleSmallModalClick = (e) => {
  e.preventDefault()
  smallModal.classList.add("hidden")
  wholePageModal.style.left = "50vw"
  modalCart.classList.remove("hidden")
}

// Закриття кошика
const handleCloseCart = (e) => {
  e.preventDefault()
  modalCart.classList.add("hidden")
  smallModal.classList.remove("hidden")
  wholePageModal.style.left = "90vw"
}

// Додавання обробників подій
if (deductQty) deductQty.addEventListener("click", handleDeductQty)
if (addQty) addQty.addEventListener("click", handleAddQty)
if (smallModal) smallModal.addEventListener("click", handleSmallModalClick)
if (closeBtn) closeBtn.addEventListener("click", handleCloseCart)
