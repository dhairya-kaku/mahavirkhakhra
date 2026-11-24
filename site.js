(() => {
  const config = window.MAHAVIR_CONFIG || {};
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const toast = document.querySelector(".toast");
  const notify = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2600);
  };
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });
    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }),
    );
  }
  const revealItems = document.querySelectorAll(".reveal");
  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add("visible"));
  document
    .querySelectorAll("[data-year]")
    .forEach((node) => (node.textContent = new Date().getFullYear()));
  document.querySelectorAll("[data-business-phone]").forEach((node) => {
    if (config.phone) {
      node.textContent = config.phone;
      node.href = `tel:${config.phone.replace(/[^+\d]/g, "")}`;
    } else {
      node.textContent = "916352005019";
      node.removeAttribute("href");
    }
  });
  document
    .querySelectorAll("[data-business-address]")
    .forEach(
      (node) => (node.textContent = config.address || "Add business address"),
    );
  document
    .querySelectorAll("[data-city]")
    .forEach((node) => (node.textContent = config.city || "Your-city"));
  document.querySelectorAll("[data-instagram-link]").forEach((node) => {
    if (config.instagramUrl) {
      node.href = config.instagramUrl;
      node.target = "_blank";
      node.rel = "noopener noreferrer";
      node.textContent = "Visit our Instagram ↗";
    } else {
      node.textContent = "See your instagram profile.";
      node.removeAttribute("href");
    }
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.preventDefault();
      if (!config.whatsappNumber) {
        notify("Add the shop WhatsApp number in site-config.js first.");
        return;
      }
      const message =
        node.dataset.message ||
        "Hello Mahavir Khakhra Gruh Udhyog, I would like to know more about your khakhra.";
      window.open(
        `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener",
      );
    });
  });
  const form = document.querySelector("#enquiry-form");
  if (form)
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!config.whatsappNumber) {
        notify(
          "Add the shop WhatsApp number in site-config.js to receive enquiries.",
        );
        return;
      }
      const data = new FormData(form);
      const message = `Hello Mahavir Khakhra Gruh Udhyog,\n\nName: ${data.get("name")}\nPhone: ${data.get("phone") || "Not provided"}\nEnquiry: ${data.get("message")}`;
      window.open(
        `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener",
      );
    });
  let installPrompt;
  const installButton = document.querySelector(".install-prompt");
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    if (installButton) installButton.classList.add("show");
  });
  if (installButton)
    installButton.addEventListener("click", async () => {
      if (!installPrompt) {
        notify(
          "Use your browser menu and choose Install app or Add to Home screen.",
        );
        return;
      }
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      installButton.classList.remove("show");
    });
  // Register as soon as the page script runs so PWABuilder and mobile browsers
  // can detect the worker during their initial page visit.
  if ("serviceWorker" in navigator && window.isSecureContext) {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => registration.update())
      .catch((error) => {
        console.error("Mahavir app service worker registration failed:", error);
      });
  }
})();
