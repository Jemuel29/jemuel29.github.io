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

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;
  document.body.classList.toggle('scrolled', currentScroll > 80 && currentScroll > lastScrollTop);
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
