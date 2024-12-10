const setBlockHeights = () => {
  const images = document.querySelectorAll(".bl-box img");
  const upperBlock = document.querySelector(".upper");
  const lowerBlock = document.querySelector(".lower");

  if (images.length >= 4) {
    const imgHeight = images[0].clientHeight; // Предполагаем, что высота одинаковая
    const halfHeight = imgHeight / 2;

    // Установить высоты
    upperBlock.style.height = `${halfHeight}px`;
    lowerBlock.style.height = `${halfHeight}px`;
  }
};

// Устанавливаем высоты при загрузке
setBlockHeights();

// Устанавливаем высоты при изменении размера окна
window.addEventListener("resize", setBlockHeights);
