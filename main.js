/* Mobile nav toggle */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();

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

/* Lightbox for project gallery images (only runs on project pages) */
(function () {
  const lb = document.querySelector('.lightbox');
  if (!lb) return;
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('.project-gallery img, .project-cover img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lb.classList.add('open');
    });
  });
  lb.addEventListener('click', () => lb.classList.remove('open'));
})();

/* Project cover — lazy-load interactive 3D view on demand */
(function () {
  const covers = document.querySelectorAll('.project-cover--toggle');
  if (!covers.length) return;

  let modelViewerReady = null;
  function loadModelViewer() {
    if (!modelViewerReady) {
      modelViewerReady = import('../assets/vendor/model-viewer.min.js');
    }
    return modelViewerReady;
  }

  const LABEL_3D = '<span class="project-3d-toggle-icon">⟳</span> View in 3D';
  const LABEL_PHOTO = '<span class="project-3d-toggle-icon">⟳</span> View photo';

  covers.forEach(cover => {
    const btn = cover.querySelector('.project-3d-toggle');
    const img = cover.querySelector('img');
    if (!btn || !img) return;

    let mv = null;
    let hint = null;
    let showing3D = false;

    btn.addEventListener('click', async () => {
      if (!mv) {
        btn.disabled = true;
        btn.textContent = 'Loading…';
        await loadModelViewer();

        mv = document.createElement('model-viewer');
        mv.setAttribute('src', cover.dataset.modelSrc);
        mv.setAttribute('alt', cover.dataset.modelAlt || '');
        mv.setAttribute('camera-controls', '');
        mv.setAttribute('disable-pan', '');
        mv.setAttribute('auto-rotate', '');
        mv.setAttribute('auto-rotate-delay', '0');
        mv.setAttribute('rotation-per-second', '16deg');
        mv.setAttribute('shadow-intensity', '0.9');
        mv.setAttribute('shadow-softness', '0.8');
        mv.setAttribute('exposure', '1.1');
        mv.setAttribute('camera-orbit', '35deg 58deg auto');
        mv.setAttribute('field-of-view', '30deg');
        mv.setAttribute('min-camera-orbit', 'auto 20deg auto');
        mv.setAttribute('max-camera-orbit', 'auto 85deg auto');
        mv.setAttribute('interaction-prompt', 'none');
        img.after(mv);

        hint = document.createElement('p');
        hint.className = 'project-cover-hint';
        hint.textContent = 'Drag to rotate · scroll to zoom';
        cover.after(hint);

        btn.disabled = false;
      }

      showing3D = !showing3D;
      img.style.display = showing3D ? 'none' : '';
      mv.style.display = showing3D ? '' : 'none';
      hint.style.display = showing3D ? '' : 'none';
      btn.innerHTML = showing3D ? LABEL_PHOTO : LABEL_3D;
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
