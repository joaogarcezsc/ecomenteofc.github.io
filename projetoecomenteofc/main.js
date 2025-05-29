/**
 * Ecomente - Script Principal
 * Versão: 1.0
 */

// Gerenciamento de Cookies
document.addEventListener("DOMContentLoaded", function () {
  // Verificar se o usuário já aceitou os cookies
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");
  const cookieAlert = document.getElementById("cookieAlert");

  if (!cookiesAccepted && cookieAlert) {
    cookieAlert.style.display = "flex";

    // Botão para aceitar cookies
    const acceptButton = document.getElementById("acceptCookies");
    if (acceptButton) {
      acceptButton.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        cookieAlert.style.display = "none";
      });
    }
  } else if (cookieAlert) {
    cookieAlert.style.display = "none";
  }

  // Menu Mobile
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      mainNav.classList.toggle("active");
    });
  }

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (menuToggle && menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("active");
        mainNav.classList.remove("active");
      }
    });
  });

  // Animação de scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Validação de formulário de contato
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validação básica
      let valid = true;
      const requiredFields = contactForm.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      });

      // Validação de email
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          valid = false;
          emailField.classList.add("error");
        }
      }

      if (valid) {
        // Simulação de envio (em produção, substituir por envio real)
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        contactForm.reset();
      } else {
        alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      }
    });
  }

  // Validação de formulário de newsletter
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameField = newsletterForm.querySelector('input[type="text"]');
      const emailField = newsletterForm.querySelector('input[type="email"]');

      if (!nameField.value.trim() || !emailField.value.trim()) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailField.value)) {
        alert("Por favor, insira um email válido.");
        return;
      }

      // Simulação de inscrição (em produção, substituir por envio real)
      alert("Inscrição realizada com sucesso!");
      newsletterForm.reset();
    });
  }

  // Efeito de scroll para elementos
  const scrollElements = document.querySelectorAll(".scroll-reveal");

  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) *
        (percentageScroll / 100)
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 90)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });

  // Inicializar animações para elementos já visíveis
  handleScrollAnimation();
});
