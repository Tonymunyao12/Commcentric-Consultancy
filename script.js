const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navClose = document.querySelector('.nav-close');
const navBackdrop = document.querySelector('.nav-backdrop');

const setMenuOpen = (isOpen) => {
  siteNav.classList.toggle('is-open', isOpen);
  navBackdrop.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
};

menuToggle.addEventListener('click', () => {
  const isOpen = !siteNav.classList.contains('is-open');
  setMenuOpen(isOpen);
  if (isOpen) siteNav.querySelector('a').focus();
});

const closeMenuAndFocus = () => {
  setMenuOpen(false);
  menuToggle.focus();
};

navClose.addEventListener('click', closeMenuAndFocus);
navBackdrop.addEventListener('click', closeMenuAndFocus);

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
    closeMenuAndFocus();
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();