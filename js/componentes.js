// ===== Spotlight solar en tarjetas de servicio (sigue al cursor) =====
(function(){
  if(window.matchMedia && (!window.matchMedia('(hover: hover)').matches)) return;
  var cards = document.querySelectorAll('.svc-item');
  cards.forEach(function(c){
    c.addEventListener('mousemove', function(e){
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', ((e.clientX - r.left)/r.width*100)+'%');
      c.style.setProperty('--my', ((e.clientY - r.top)/r.height*100)+'%');
    });
  });
})();

// ===== Botones magnéticos (capa interior, no pelea con la entrada GSAP) =====
(function(){
  if(window.matchMedia && (!window.matchMedia('(hover: hover)').matches)) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Envolver el contenido en una capa interna para que el magnetismo no pise el transform de entrada
  document.querySelectorAll('.btn, .fab').forEach(function(b){
    if(b.querySelector('.btn-mag')) return;
    var span = document.createElement('span');
    span.className = 'btn-mag';
    while(b.firstChild) span.appendChild(b.firstChild);
    b.appendChild(span);
  });
  document.querySelectorAll('.btn, .fab').forEach(function(b){
    var inner = b.querySelector('.btn-mag') || b;
    b.addEventListener('mousemove', function(e){
      var r = b.getBoundingClientRect();
      var mx = e.clientX - (r.left + r.width/2);
      var my = e.clientY - (r.top + r.height/2);
      inner.style.transform = 'translate('+(mx*0.18)+'px,'+(my*0.28)+'px)';
    });
    b.addEventListener('mouseleave', function(){ inner.style.transform = ''; });
  });
})();

// ===== Tilt 3D en tarjetas de servicio =====
(function(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(window.matchMedia && !window.matchMedia('(hover: hover)').matches) return;
  var cards = document.querySelectorAll('.svc-item');
  cards.forEach(function(c){
    c.addEventListener('mousemove', function(e){
      var r = c.getBoundingClientRect();
      var px = (e.clientX - r.left)/r.width - .5;
      var py = (e.clientY - r.top)/r.height - .5;
      c.style.transform = 'translateY(-3px) rotateX('+(-py*6)+'deg) rotateY('+(px*8)+'deg)';
    });
    c.addEventListener('mouseleave', function(){ c.style.transform=''; });
  });
})();
