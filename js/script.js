const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector(".nav-panel");
const revealItems = document.querySelectorAll(".section-reveal");
const stickyHeader = document.querySelector(".site-header");

const scrollToTarget = (target) => {
  const headerOffset = stickyHeader ? stickyHeader.offsetHeight + 24 : 120;
  const elementTop = target.getBoundingClientRect().top + window.scrollY;
  const scrollTarget =
    target.id === "top" ? 0 : Math.max(elementTop - headerOffset, 0);

  window.scrollTo({
    top: scrollTarget,
    behavior: "smooth",
  });
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    event.preventDefault();
    scrollToTarget(target);

    if (navPanel && navToggle) {
      navPanel.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
  });
});

const productCards = document.querySelectorAll(
  ".product-card, .feature-card, .review-card, .instagram-grid img, .contact-card, .map-card",
);

if (navToggle && navPanel) {
  navToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

if (productCards.length > 0) {
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -5% 0px",
    },
  );

  productCards.forEach((card) => {
    card.classList.add("section-reveal");
    cardObserver.observe(card);
  });
}

// Lead Form Handler
const leadForm = document.getElementById("leadForm");
if (leadForm) {
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !phone) {
      alert("Please fill in all fields");
      return;
    }

    // Format phone for WhatsApp link
    const whatsappNumber = phone.replace(/\D/g, "");
    const whatsappMessage = `Hi! I'm ${name}. I'd like to know more about getting a website for my business.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Reset form
    leadForm.reset();

    // Show success message
    const submitBtn = leadForm.querySelector("button");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "✓ Great! Opening WhatsApp...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 3000);
  });
}
