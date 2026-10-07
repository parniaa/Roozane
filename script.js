/* Roozane site interactions */
(function () {
  // sticky nav glass
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // hero phone parallax tilt (desktop, fine pointer only)
  const wrap = document.getElementById('phoneWrap');
  if (wrap && window.matchMedia('(pointer: fine)').matches) {
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (ev) => {
      const r = hero.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      wrap.style.transform =
        `rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(0)`;
    });
    hero.addEventListener('mouseleave', () => {
      wrap.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
    wrap.style.transition = 'transform .35s ease-out';
  }

  // subtle parallax on orbs
  const orbs = document.querySelectorAll('.orb');
  if (orbs.length && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      orbs.forEach((o, i) => {
        o.style.translate = `0 ${y * (0.04 + i * 0.02)}px`;
      });
    }, { passive: true });
  }
})();
