import {
  getSelectedObjOfElement,
  selectedElementId,
  price_container,
} from "./product.js"

const deductQty = document.querySelector(".qty_deduct")
const addQty = document.querySelector(".qty_add")
const qtyMain = document.querySelector(".qty_main")
let quantity

const wholePageModal = document.querySelector(".whole_page-modal")
const smallModal = document.querySelector(".modal-small")
const modalCart = document.querySelector(".modal-cart")

if (qtyMain) qtyMain.textContent = 0

if (deductQty)
  deductQty.addEventListener("click", (e) => {
    e.preventDefault()
    if (parseInt(qtyMain.textContent) > 0)
      qtyMain.textContent = parseInt(qtyMain.textContent) - 1
    quantity = qtyMain.textContent
    getSelectedObjOfElement(selectedElementId).then((obj) => {
      if (parseInt(quantity))
        price_container.innerHTML = `<p>Ціна ${(obj.price * quantity).toFixed(
          2
        )} грн</p>`
    })
    if (parseInt(quantity) <= 0) {
      wholePageModal.classList.add("hidden")
      smallModal.classList.add("hidden")
      modalCart.classList.add("hidden")
    }
  })
if (addQty)
  addQty.addEventListener("click", (e) => {
    e.preventDefault()
    if (
      parseInt(qtyMain.textContent) >= 0 &&
      parseInt(qtyMain.textContent) < 10
    )
      qtyMain.textContent = parseInt(qtyMain.textContent) + 1
    quantity = qtyMain.textContent
    getSelectedObjOfElement(selectedElementId).then((obj) => {
      if (parseInt(quantity))
        price_container.innerHTML = `<p>Ціна ${(obj.price * quantity).toFixed(
          2
        )} грн</p>`
    })
    if (
      parseInt(quantity) > 0 &&
      getComputedStyle(modalCart).display != "block"
    ) {
      wholePageModal.classList.remove("hidden")
      wholePageModal.style.left = "90vw"
      smallModal.classList.remove("hidden")
    }
  })
if (smallModal)
  smallModal.addEventListener("click", (e) => {
    e.preventDefault()
    smallModal.classList.add("hidden")
    wholePageModal.style.left = "50vw"
    modalCart.classList.remove("hidden")
  })
