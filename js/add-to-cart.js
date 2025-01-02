import {
  getSelectedObjOfElement,
  selectedElementId,
  price_container,
} from "./product.js"

const deductQty = document.querySelector(".qty_deduct")
const addQty = document.querySelector(".qty_add")
const qtyMain = document.querySelector(".qty_main")
let quantity
qtyMain.textContent = 0

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
})
addQty.addEventListener("click", (e) => {
  e.preventDefault()
  if (parseInt(qtyMain.textContent) >= 0 && parseInt(qtyMain.textContent) < 10)
    qtyMain.textContent = parseInt(qtyMain.textContent) + 1
  quantity = qtyMain.textContent
  getSelectedObjOfElement(selectedElementId).then((obj) => {
    if (parseInt(quantity))
      price_container.innerHTML = `<p>Ціна ${(obj.price * quantity).toFixed(
        2
      )} грн</p>`
  })
})
