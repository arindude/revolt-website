document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  const dropdownToggle = document.querySelector('[data-dropdown-toggle]');
  const dropdownMenu = document.querySelector('[data-dropdown-menu]');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      if (dropdownMenu) {
        dropdownMenu.classList.remove('open');
        if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (dropdownMenu) {
          dropdownMenu.classList.remove('open');
          if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.setAttribute('aria-expanded', 'false');

    dropdownToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      dropdownMenu.classList.toggle('open');
      dropdownToggle.setAttribute('aria-expanded', dropdownMenu.classList.contains('open'));
    });

    document.addEventListener('click', (event) => {
      if (!dropdownMenu.contains(event.target) && event.target !== dropdownToggle) {
        dropdownMenu.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const fadeSections = document.querySelectorAll('.fade-section');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      threshold: 0.2,
    });

    fadeSections.forEach((section) => observer.observe(section));
  } else {
    fadeSections.forEach((section) => section.classList.add('is-visible'));
  }
});
