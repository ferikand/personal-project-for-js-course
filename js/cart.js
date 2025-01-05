import { getSelectedObjOfElement } from "./product.js"

const cartProductListContainer = document.querySelector(
  ".cart-product-list-container"
)

const renderProductList = function (cart) {
  cartProductListContainer.innerHTML = ""
  let total = 0
  Object.keys(cart).forEach((id) => {
    getSelectedObjOfElement(id).then((obj) => {
      total += parseInt(obj.price).toFixed(2) * cart[id]
      cartProductListContainer.innerHTML += `
    <div class="cart-product">
        <div class="cart-product-img-container container container-fluid">
            <img src="${obj.imgSrc}" alt="${
        obj.productName
      }" class="cart-product-img img img-fluid">
        </div>
        <div class="cart-product-info container container-fluid">
            <div class="cart-product-info-name container container fluid>
                <h6 class="cart-product-name">${obj.productName.replaceAll(
                  "_",
                  " "
                )}</h6>
            </div>
            <div class="cart-product-info-quantity container container-fluid">
                <p class="cart-product-quantity">Кількість: ${cart[id]} (${
        cart[id]
      } * ${parseInt(obj.price).toFixed(2)})</p>
            </div>
            <div class="cart-product-info-price container container-fluid">
                <p class="cart-product-price">Сума: ${(
                  parseInt(obj.price) * cart[id]
                ).toFixed(2)}  грн</p>
            </div>
        </div>
        <div class='product-quantity-modificators'>            
            <button data-id="${id}" class='btn btn-light btn-sm deduct-product_cart'>-</button>
            <button data-id="${id}" class='btn btn-light btn-sm remove-product_cart'>x</button>
            <button data-id="${id}" class='btn btn-light btn-sm add-product_cart'>+</button>
        </div>
    </div>
    `
      document.querySelector(".total-container").innerHTML = `
    <p class="total">Загальна сума: ${total.toFixed(2)} грн</p>
    `
    })
  })
}
export { renderProductList }
