import {
  getSelectedObjOfElement,
  selectedElementId,
  price_container,
} from "./product.js"

// DOM-елементи
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

// Локальна корзина
let cart = JSON.parse(localStorage.getItem("cart")) || {}
let quantity = 0 // Ініціалізація кількості

// Ініціалізація кількості в інтерфейсі
if (qtyMain) qtyMain.textContent = quantity

// Оновлення ціни та кількості в інтерфейсі
const updatePrice = async (quantity) => {
  const obj = await getSelectedObjOfElement(selectedElementId)
  if (quantity > 0) {
    totalQuantityOfChoosenProducts.innerText = Object.values(cart).reduce(
      (sum, qty) => sum + qty
    )
    price_container.innerHTML = `<p>Ціна ${parseInt(obj.price).toFixed(
      2
    )} грн</p>`
  }
}

// Оновлення локального збереження корзини
const updateCartInStorage = () => {
  cart[selectedElementId] = quantity
  if (quantity === 0) delete cart[selectedElementId] // Видалення товару, якщо кількість 0
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Приховати всі модальні вікна
const hideModals = () => {
  wholePageModal.classList.add("hidden")
  smallModal.classList.add("hidden")
  modalCart.classList.add("hidden")
}

// Зменшення кількості товару
const handleDeductQty = (e) => {
  e.preventDefault()
  if (quantity > 0) {
    quantity -= 1
    qtyMain.textContent = quantity
    updatePrice(quantity)
    updateCartInStorage()

    if (quantity <= 0) hideModals()
  }
}

// Збільшення кількості товару
const handleAddQty = (e) => {
  e.preventDefault()
  if (quantity >= 0 && quantity < 10) {
    quantity += 1
    qtyMain.textContent = quantity
    updatePrice(quantity)
    updateCartInStorage()

    if (quantity > 0 && getComputedStyle(modalCart).display !== "block") {
      wholePageModal.classList.remove("hidden")
      wholePageModal.style.left = "90vw"
      smallModal.classList.remove("hidden")
    }
  }
}

// Перехід з маленького модального вікна до кошика
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
