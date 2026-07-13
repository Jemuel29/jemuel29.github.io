const navToggle = document.querySelector('.nav-toggle');
const topNav = document.querySelector('.top-nav');
const navLinks = document.querySelectorAll('.nav-links a');

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

const sections = document.querySelectorAll('.section-screen, .hero-card');
const updateActiveLink = () => {
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const id = section.getAttribute('id');
    if (!id) {
      return;
    }

    const offsetTop = section.offsetTop;
    const offsetHeight = section.offsetHeight;
    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
};

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;
  const scrollingDown = currentScroll > lastScrollTop && currentScroll > 80;
  const scrollingUp = currentScroll < lastScrollTop;

  document.body.classList.toggle('scrolled', scrollingDown);
  document.body.classList.toggle('scrolled-up', scrollingUp || currentScroll <= 80);

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
