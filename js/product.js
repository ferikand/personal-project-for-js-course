const selectedElementId = localStorage.getItem("selectedElement");
const productBigImg = document.querySelector(".productBigImg");
const productName = document.querySelector(".productInfoText h2");
const productInfoText = document.querySelector(".productInfoText p");

getSelectedObjOfElement(selectedElementId)
  .then((obj) => {
    productBigImg.setAttribute("src", obj.imgSrc);
    productName.textContent = obj.productName.replaceAll("_", " ");
    productInfoText.innerHTML = obj.productInfo;
  })
  .catch((error) => console.log(error.message));

function getSelectedObjOfElement(id) {
  return fetch("../product.json")
    .then((response) => response.json())
    .then((data) => data.find((el) => el.id === id))
    .catch((error) => console.error(error.message));
}
