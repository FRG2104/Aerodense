// ===== Reveal + escalonado al entrar al viewport =====
(function(){
  var els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('in')}); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold:0.14, rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){ io.observe(e); });
})();

// ===== Barra de progreso de scroll =====
(function(){
  var bar = document.querySelector('.scroll-progress'); if(!bar) return;
  var t=false;
  function upd(){ var h=document.documentElement, max=h.scrollHeight-h.clientHeight;
    bar.style.width=((max>0?(h.scrollTop||document.body.scrollTop)/max:0)*100).toFixed(2)+'%'; t=false; }
  window.addEventListener('scroll',function(){ if(!t){ requestAnimationFrame(upd); t=true; } },{passive:true}); upd();
})();
