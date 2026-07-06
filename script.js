const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = Array.from(document.querySelectorAll(".nav-menu a"));
const revealItems = document.querySelectorAll(".reveal");
const backToTop = document.querySelector("#back-to-top");
const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMenu(open) {
    menuToggle.classList.toggle("is-open", open);
    navMenu.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

menuToggle.addEventListener("click", () => {
    setMenu(!navMenu.classList.contains("is-open"));
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenu(false);
    }
});

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            }
        });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach((section) => navObserver.observe(section));
}

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 700);
}, { passive: true });

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});

const bannerDismiss = document.querySelector(".site-banner-dismiss");

if (bannerDismiss) {
    bannerDismiss.addEventListener("click", () => {
        bannerDismiss.closest(".site-banner")?.remove();
    });
}
