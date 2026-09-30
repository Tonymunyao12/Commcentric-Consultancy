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

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -8% 0px'
  });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 80, 220)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
    closeMenuAndFocus();
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();