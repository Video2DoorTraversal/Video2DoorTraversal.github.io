(() => {
  const topbar = document.querySelector("[data-topbar]");
  const backToTop = document.querySelector("[data-back-to-top]");
  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");

  const updateChrome = () => {
    const scrolled = window.scrollY > 32;
    topbar?.classList.toggle("is-scrolled", scrolled);
    backToTop?.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.7);
  };

  updateChrome();
  window.addEventListener("scroll", updateChrome, { passive: true });

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        menuButton.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      }
    });
  }

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const sectionLinks = Array.from(document.querySelectorAll("[data-section-link]"));
  const sections = Array.from(document.querySelectorAll("[data-observe-section]"));
  if ("IntersectionObserver" in window && sectionLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        sectionLinks.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.sectionLink === visible.target.id);
        });
      },
      { rootMargin: "-28% 0px -54%", threshold: [0, 0.15, 0.35] }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const copyButton = document.querySelector("[data-copy-button]");
  const bibtex = document.querySelector("#bibtex-code");
  copyButton?.addEventListener("click", async () => {
    if (!bibtex) return;
    const original = copyButton.textContent;
    try {
      await navigator.clipboard.writeText(bibtex.textContent.trim());
      copyButton.textContent = "Copied";
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(bibtex);
      selection.removeAllRanges();
      selection.addRange(range);
      copyButton.textContent = "Selected";
    }
    window.setTimeout(() => {
      copyButton.textContent = original;
    }, 1800);
  });
})();
