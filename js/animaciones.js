// ===== GSAP: parallax de galería + subrayado + chips + entrada de botones =====
(function(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Parallax suave de la galería al hacer scroll
  var figs = gsap.utils.toArray('.gal figure');
  figs.forEach(function(f, i){
    var depth = (i % 2 === 0) ? -26 : 26; // contramovimiento
    gsap.fromTo(f, { y: depth }, {
      y: -depth, ease: 'none',
      scrollTrigger: { trigger: '.gal', start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    });
  });

  // Subrayado que se dibuja al entrar cada sección
  gsap.utils.toArray('.h-line').forEach(function(line){
    var sec = line.closest('section');
    gsap.to(line, {
      scaleX: 1, transformOrigin: line.classList.contains('center') ? 'center' : 'left center',
      duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sec, start: 'top 78%' }
    });
  });

  // Chips de "Por qué Aerodense" entran escalonados desde el centro
  gsap.from('.cert .chip', {
    opacity: 0, scale: 0.85, y: 18, duration: 0.5, ease: 'back.out(1.5)',
    stagger: { each: 0.09, from: 'center' },
    scrollTrigger: { trigger: '.cert .grid', start: 'top 82%' }
  });

  // Botones del cierre: entrada por clase CSS (no escribe transform en el .btn, deja el magnético libre)
  var finalBtns = gsap.utils.toArray('.final .row .btn');
  if(finalBtns.length){
    ScrollTrigger.create({
      trigger: '.final .row', start: 'top 85%', once: true,
      onEnter: function(){ finalBtns.forEach(function(b){ b.classList.add('in-final'); }); }
    });
  }
})();

// ===== Parallax del fondo del hero al hacer scroll =====
(function(){
  var bg = document.querySelector('.hero .bg'); if(!bg) return;
  var hero = document.querySelector('.hero'); if(!hero) return;
  var ticking=false;
  function upd(){
    var y = window.scrollY || document.documentElement.scrollTop;
    var h = hero.offsetHeight;
    if(y < h){ bg.style.transform = 'scale(1.04) translateY('+(y*0.18)+'px)'; }
    ticking=true;
  }
  window.addEventListener('scroll',function(){ if(ticking){return;} requestAnimationFrame(function(){upd();ticking=false;}); },{passive:true});
})();
