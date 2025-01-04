import {
  getSelectedObjOfElement,
  selectedElementId,
  price_container,
} from "./product.js"
import { showAlert } from "./alert.js"
import { productList } from "./cart.js"
// DOM-елементи
const domElements = {
  deductQty: document.querySelector(".qty_deduct"),
  addQty: document.querySelector(".qty_add"),
  qtyMain: document.querySelector(".qty_main"),
  wholePageModal: document.querySelector(".whole_page-modal"),
  smallModal: document.querySelector(".modal-small"),
  modalCart: document.querySelector(".modal-cart"),
  closeBtn: document.querySelector(".btn-close"),
  totalQuantityOfChoosenProducts: document.querySelector(
    "#total-quantity-choosen"
  ),
}

// Локальна корзина
let cart = JSON.parse(localStorage.getItem("cart")) || {}
let quantity = cart[selectedElementId] ?? 0

// Ініціалізація кількості в інтерфейсі
const initializeQuantity = () => {
  if (domElements.qtyMain) domElements.qtyMain.textContent = quantity
  updateTotalQuantity()
  if (domElements.totalQuantityOfChoosenProducts) {
    domElements.wholePageModal.classList.remove("hidden")
    domElements.smallModal.classList.remove("hidden")
  }
}

const initializeVisibility = () => {
  const totalQuantity = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  if (totalQuantity === 0) {
    domElements.smallModal.classList.add("hidden") // Ховаємо маленьку корзину
    domElements.wholePageModal.classList.add("hidden") // Ховаємо фонову модалку
  }
}

// Оновлення загальної кількості товарів
const updateTotalQuantity = () => {
  const totalQuantity = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  if (domElements.totalQuantityOfChoosenProducts) {
    domElements.totalQuantityOfChoosenProducts.innerText = totalQuantity
  }

  // Якщо корзина порожня, приховуємо маленьку корзину
  if (totalQuantity === 0) {
    domElements.smallModal.classList.add("hidden")
    domElements.wholePageModal.classList.add("hidden")
  }
}

// Оновлення локального збереження корзини
const updateCartInStorage = () => {
  if (quantity === 0) {
    delete cart[selectedElementId] // Видалення товару
  } else {
    cart[selectedElementId] = quantity
  }
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Оновлення кількості на інтерфейсі
const updateQuantityUI = () => {
  if (domElements.qtyMain) {
    domElements.qtyMain.textContent = quantity > 0 ? quantity : 0
  }
}

// Зменшення кількості товару
const handleDeductQty = (e) => {
  e.preventDefault()
  if (quantity > 0) {
    quantity -= 1
    showAlert("Товар видалено з кошика", false)
  }

  updateCartInStorage()
  updateTotalQuantity()
  updateQuantityUI()
  productList(cart)
}

// Збільшення кількості товару
const handleAddQty = (e) => {
  e.preventDefault()
  if (quantity >= 0 && quantity < 10) {
    quantity += 1

    updateCartInStorage()
    updateTotalQuantity()
    updateQuantityUI()
    productList(cart)

    showAlert("Товар додано до кошика", true)

    if (
      quantity > 0 &&
      getComputedStyle(domElements.modalCart).display !== "block"
    ) {
      domElements.wholePageModal.classList.remove("hidden")
      domElements.wholePageModal.style.top = "70vh"
      domElements.wholePageModal.style.left = "125vw"
      domElements.smallModal.classList.remove("hidden")
    }
  }
}

// Перехід з маленького модального вікна до кошика
const handleSmallModalClick = (e) => {
  e.preventDefault()
  domElements.smallModal.classList.add("hidden")
  domElements.wholePageModal.style.top = "50vh"
  domElements.wholePageModal.style.left = "50vw"
  domElements.modalCart.classList.remove("hidden")
  productList(cart)
}

// Закриття кошика
const handleCloseCart = (e) => {
  e.preventDefault()
  domElements.modalCart.classList.add("hidden")
  domElements.smallModal.classList.remove("hidden")
  domElements.wholePageModal.style.top = "70vh"
  domElements.wholePageModal.style.left = "125vw"
}

// Ініціалізація подій
const initializeEventListeners = () => {
  if (domElements.deductQty)
    domElements.deductQty.addEventListener("click", handleDeductQty)
  if (domElements.addQty)
    domElements.addQty.addEventListener("click", handleAddQty)
  if (domElements.smallModal)
    domElements.smallModal.addEventListener("click", handleSmallModalClick)
  if (domElements.closeBtn)
    domElements.closeBtn.addEventListener("click", handleCloseCart)
}

// Ініціалізація програми
const initializeApp = () => {
  initializeQuantity()
  initializeVisibility() // Додаємо перевірку видимості при завантаженні сторінки
  initializeEventListeners()
}

initializeApp()
export { cart }
