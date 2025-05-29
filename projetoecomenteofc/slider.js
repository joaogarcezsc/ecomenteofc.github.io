/**
 * Ecomente - Script do Slider de Produtos
 * Versão: 1.0
 */

document.addEventListener("DOMContentLoaded", function () {
  // Configuração do slider
  const slider = document.getElementById("productSlider");
  const sliderDots = document.getElementById("sliderDots");
  const prevButton = document.getElementById("sliderPrev");
  const nextButton = document.getElementById("sliderNext");

  if (!slider || !sliderDots || !prevButton || !nextButton) return;

  // Obter todos os cards de produtos
  const productCards = slider.querySelectorAll(".product-card");
  const totalCards = productCards.length;

  // Configurações
  let currentIndex = 0;
  const cardsToShow =
    window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;
  let totalSlides = Math.ceil(totalCards / cardsToShow);

  // Inicializar slider
  function initSlider() {
    // Criar pontos de navegação
    sliderDots.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("slider-dot");
      if (i === 0) dot.classList.add("active");
      dot.dataset.index = i;
      dot.addEventListener("click", function () {
        goToSlide(parseInt(this.dataset.index));
      });
      sliderDots.appendChild(dot);
    }

    // Configurar visibilidade inicial
    updateSlider();
  }

  // Atualizar slider
  function updateSlider() {
    // Atualizar posição dos cards
    productCards.forEach((card, index) => {
      const startIndex = currentIndex * cardsToShow;
      const endIndex = startIndex + cardsToShow - 1;

      if (index >= startIndex && index <= endIndex) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });

    // Atualizar pontos de navegação
    const dots = sliderDots.querySelectorAll(".slider-dot");
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // Atualizar estado dos botões
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalSlides - 1;

    // Estilo visual para botões desabilitados
    if (prevButton.disabled) {
      prevButton.style.opacity = "0.5";
      prevButton.style.cursor = "not-allowed";
    } else {
      prevButton.style.opacity = "1";
      prevButton.style.cursor = "pointer";
    }

    if (nextButton.disabled) {
      nextButton.style.opacity = "0.5";
      nextButton.style.cursor = "not-allowed";
    } else {
      nextButton.style.opacity = "1";
      nextButton.style.cursor = "pointer";
    }
  }

  // Ir para slide específico
  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  // Ir para próximo slide
  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateSlider();
    }
  }

  // Ir para slide anterior
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  // Event listeners para botões
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  // Atualizar slider ao redimensionar a janela
  window.addEventListener("resize", function () {
    const newCardsToShow =
      window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;

    if (newCardsToShow !== cardsToShow) {
      // Recalcular com base no novo número de cards visíveis
      cardsToShow = newCardsToShow;
      totalSlides = Math.ceil(totalCards / cardsToShow);
      currentIndex = 0; // Resetar para o início

      // Reinicializar slider
      initSlider();
    }
  });

  // Inicializar o slider
  initSlider();

  // Adicionar navegação por toque para dispositivos móveis
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe

    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe para esquerda (próximo)
      nextSlide();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe para direita (anterior)
      prevSlide();
    }
  }
});
