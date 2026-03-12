document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Mobile navigation
  // =========================
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavClose = document.getElementById("mobileNavClose");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");

  if (burgerBtn && mobileNav) {
    function openMobileNav() {
      mobileNav.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeMobileNav() {
      mobileNav.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    burgerBtn.addEventListener("click", openMobileNav);
    mobileNavClose.addEventListener("click", closeMobileNav);
    mobileNavOverlay.addEventListener("click", closeMobileNav);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileNav();
    });
  }

  // =========================
  // Telegram settings
  // =========================
  const BOT_TOKEN = "8787699576:AAEVCimKagfm6wOcXa6iTgJtd2Jgl-eJPKE";
  const CHAT_ID = "7095691707";

  // =========================
  // Modal elements
  // =========================
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modalClose");
  const modalOverlay = document.getElementById("modalOverlay");

  const openModalButtons = document.querySelectorAll(
    ".hero__btn, .scooter__card-btn, .btn__call",
  );

  // =========================
  // Open modal
  // =========================
  if (modal && modalClose && modalOverlay) {
    openModalButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }

    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  // =========================
  // Telegram form submit
  // =========================
  const form = document.getElementById("telegramForm");
  const phoneInput = document.getElementById("phone");

  if (!form || !phoneInput) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const phone = phoneInput.value.trim();

    if (!phone) {
      alert("Введите номер телефона");
      return;
    }

    const message = [
      "🔥 Новая заявка с сайта KUGOO",
      "",
      `📞 Телефон: ${phone}`,
      `🌐 Страница: ${window.location.href}`,
      `🕒 Время: ${new Date().toLocaleString("ru-RU")}`,
    ].join("\n");

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        },
      );

      const data = await response.json();

      if (data.ok) {
        alert("Заявка отправлена!");
        form.reset();

        if (modal) {
          modal.classList.remove("active");
          document.body.style.overflow = "";
        }
      } else {
        console.error("Telegram API error:", data);
        alert("Ошибка отправки. Проверь BOT_TOKEN и CHAT_ID.");
      }
    } catch (error) {
      console.error("Request error:", error);
      alert("Ошибка отправки. Проверь интернет или настройки.");
    }
  });
});
