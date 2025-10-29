import { selectedElementId } from "./product.js"
import { showAlert } from "./alert.js"
import { renderProductList } from "./cart.js"
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
const cart = JSON.parse(localStorage.getItem("cart")) || {}
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
  Object.values(cart).reduce((sum, qty) => sum + qty, 0)
}

// Оновлення загальної кількості товарів
const updateTotalQuantity = () => {
  const totalQuantity = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  if (domElements.totalQuantityOfChoosenProducts) {
    domElements.totalQuantityOfChoosenProducts.innerText = totalQuantity
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
  if (quantity > 0) quantity -= 1

  updateCartInStorage()
  updateTotalQuantity()
  updateQuantityUI()
  renderProductList(cart)

  showAlert("Товар видалено з кошика", false)
}

// Збільшення кількості товару
const handleAddQty = (e) => {
  e.preventDefault()
  if (quantity >= 0 && quantity < 10) quantity += 1

  updateCartInStorage()
  updateTotalQuantity()
  updateQuantityUI()
  renderProductList(cart)

  showAlert("Товар додано до кошика", true)

  if (
    quantity > 0 &&
    getComputedStyle(domElements.modalCart).display !== "block"
  ) {
    domElements.wholePageModal.classList.remove("hidden")
    domElements.smallModal.classList.remove("hidden")
  }
}

// Перехід з маленького модального вікна до кошика
const handleSmallModalClick = (e) => {
  e.preventDefault()
  domElements.modalCart.classList.remove("hidden")
  renderProductList(cart)
}

// Закриття кошика
const handleCloseCart = (e) => {
  e.preventDefault()
  domElements.modalCart.classList.add("hidden")
  domElements.smallModal.classList.remove("hidden")
}

// Зменшення кількості товару в кошику
const handleDeductQtyInCart = (e) => {
  const id = e.target.dataset.id
  if (cart[id] > 0) cart[id] -= 1
  if (cart[id] === 0) delete cart[id]
  quantity = cart[id] ?? 0

  localStorage.setItem("cart", JSON.stringify(cart))

  if (id === selectedElementId && document.querySelector(".qty_main"))
    document.querySelector(".qty_main").textContent = cart[id] ?? 0

  if (id === selectedElementId && domElements.qtyMain)
    domElements.qtyMain.textContent = cart[id] > 0 ? cart[id] : 0

  if (document.querySelector("#total-quantity-choosen"))
    document.querySelector("#total-quantity-choosen").textContent =
      Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  renderProductList(cart)
}

// Видалення товару з кошика
const handleRemoveQtyInCart = (e) => {
  e.preventDefault()
  const id = e.target.dataset.id
  delete cart[id]
  quantity = cart[id] ?? 0

  localStorage.setItem("cart", JSON.stringify(cart))

  if (id === selectedElementId && document.querySelector(".qty_main"))
    document.querySelector(".qty_main").textContent = cart[id] ?? 0

  if (id === selectedElementId && domElements.qtyMain)
    domElements.qtyMain.textContent = cart[id] > 0 ? cart[id] : 0

  if (document.querySelector("#total-quantity-choosen"))
    document.querySelector("#total-quantity-choosen").textContent =
      Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  renderProductList(cart)
}

// Збільшення кількості товару в кошику
const handleAddQtyInCart = (e) => {
  e.preventDefault()
  const id = e.target.dataset.id
  if (cart[id] >= 0 && cart[id] < 10) cart[id] += 1
  quantity = cart[id] ?? 0

  localStorage.setItem("cart", JSON.stringify(cart))

  if (id === selectedElementId && document.querySelector(".qty_main"))
    document.querySelector(".qty_main").textContent = cart[id] ?? 0

  if (id === selectedElementId && domElements.qtyMain)
    domElements.qtyMain.textContent = cart[id] > 0 ? cart[id] : 0

  if (document.querySelector("#total-quantity-choosen"))
    document.querySelector("#total-quantity-choosen").textContent =
      Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  renderProductList(cart)
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

  // Делегування подій для кнопок в корзині
  const cartProductListContainer = document.querySelector(
    ".cart-product-list-container"
  )
  if (cartProductListContainer)
    cartProductListContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("deduct-product_cart")) {
        handleDeductQtyInCart(e)
      } else if (e.target.classList.contains("remove-product_cart")) {
        handleRemoveQtyInCart(e)
      } else if (e.target.classList.contains("add-product_cart")) {
        handleAddQtyInCart(e)
      }
    })
}

// Ініціалізація програми
const initializeApp = () => {
  initializeQuantity()
  initializeVisibility() // Додаємо перевірку видимості при завантаженні сторінки
  initializeEventListeners()
}

initializeApp()
export { cart, handleSmallModalClick, updateTotalQuantity }
