(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const targets = [...document.querySelectorAll('.intro, .compass, .section-top, .card, .next > div, .contact-heading, .contact-list, .closing')];
  let observer;
  const showAll = () => {
    observer?.disconnect();
    targets.forEach(el => el.classList.remove('scroll-pending'));
  };
  try {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('scroll-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    targets.forEach(el => {
      // Keep anything above the current scroll position visible on anchor loads.
      if (el.getBoundingClientRect().bottom <= 0) return;
      el.classList.add('scroll-reveal', 'scroll-pending');
      observer.observe(el);
    });
    preference.addEventListener('change', event => { if (event.matches) showAll(); });
    window.addEventListener('beforeprint', showAll);
  } catch {
    showAll();
  }
})();

