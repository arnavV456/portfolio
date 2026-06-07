/* ── PROJECT FILTER ──────────────────────────────────────────── */
(function () {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // update active state
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // show / hide cards
      cards.forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
        } else {
          const tags = (card.dataset.tags || '').split(' ');
          card.style.display = tags.includes(filter) ? '' : 'none';
        }
      });
    });
  });
})();

/* ── SCROLL FADE-IN ──────────────────────────────────────────── */
(function () {
  const targets = document.querySelectorAll(
    '.project-card, .skill-group, .fact, .contact-link'
  );

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s`;
    io.observe(el);
  });
})();
