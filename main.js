/* Project filter */
(function () {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cards.forEach(card => {
        const tags = (card.dataset.tags || '').split(' ');
        card.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
      });
    });
  });
})();

/* Scroll reveal */
(function () {
  const els = document.querySelectorAll('.project-card, .skill-group, .contact-card, .stat');
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });
  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = `opacity 0.45s ease ${i * 0.035}s, transform 0.45s ease ${i * 0.035}s`;
    io.observe(el);
  });
})();
