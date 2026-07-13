const navToggle = document.querySelector('.nav-toggle');
const topNav = document.querySelector('.top-nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section-screen, .hero-section');
const root = document.documentElement;
let lastScrollTop = 0;

navToggle?.addEventListener('click', () => {
  const isOpen = topNav?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    topNav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const updateActiveLink = () => {
  const scrollPosition = window.scrollY + 140;

  let activeId = null;
  sections.forEach((section) => {
    const id = section.getAttribute('id');
    if (!id) {
      return;
    }

    const offsetTop = section.offsetTop;
    const offsetHeight = section.offsetHeight;
    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
      activeId = id;
    }
  });

  if (activeId) {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  }
};

const updateScrollTheme = () => {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;
  const scrollRatio = Math.min(currentScroll / 400, 1);
  const hueShift = 12 * scrollRatio;
  const saturation = 92 + scrollRatio * 6;
  const lightness = 96 - scrollRatio * 8;

  root.style.setProperty('--bg', `hsl(${20 + hueShift} 70% ${lightness}%)`);
  root.style.setProperty('--surface', `hsl(${20 + hueShift} 100% ${97 - scrollRatio * 4}%)`);
  root.style.setProperty('--surface-strong', `hsla(${20 + hueShift} ${saturation}% 98% / 0.93)`);
  root.style.setProperty('--nav-bg', `hsla(${20 + hueShift} 100% 96% / 0.8)`);
  root.style.setProperty('--nav-border', `hsla(${20 + hueShift} 20% 25% / 0.16)`);

  const scrollingDown = currentScroll > lastScrollTop && currentScroll > 80;
  const scrollingUp = currentScroll < lastScrollTop;

  document.body.classList.toggle('scrolled', scrollingDown);
  document.body.classList.toggle('scrolled-up', scrollingUp || currentScroll <= 80);

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
};

window.addEventListener('scroll', () => {
  updateActiveLink();
  updateScrollTheme();
});
window.addEventListener('load', () => {
  updateActiveLink();
  updateScrollTheme();
});

