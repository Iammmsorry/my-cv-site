document.getElementById('year').textContent = new Date().getFullYear();

// External logos are decorative: keep the CV clean if a source is unavailable.
document.querySelectorAll('.org-logo img').forEach(image => {
  const hideUnavailableLogo = () => image.parentElement.classList.add('is-unavailable');
  image.addEventListener('error', hideUnavailableLogo, { once: true });
  if (image.complete && image.naturalWidth === 0) hideUnavailableLogo();
});

const navigationLinks = [...document.querySelectorAll('nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        navigationLinks.forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }
  }, { rootMargin: '-10% 0px -65% 0px' });
  document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
}
