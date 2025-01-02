const deductQty = document.querySelector(".qty_deduct")
const addQty = document.querySelector(".qty_add")
const qtyMain = document.querySelector(".qty_main")

qtyMain.textContent = 0

deductQty.addEventListener("click", (e) => {
  e.preventDefault()
  if (parseInt(qtyMain.textContent) > 0)
    qtyMain.textContent = parseInt(qtyMain.textContent) - 1
})
addQty.addEventListener("click", (e) => {
  e.preventDefault()
  if (parseInt(qtyMain.textContent) >= 0 && parseInt(qtyMain.textContent) < 10)
    qtyMain.textContent = parseInt(qtyMain.textContent) + 1
})
