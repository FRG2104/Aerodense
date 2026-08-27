// ===== Campo de partículas solar (p5.js) =====
(function(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var holder = document.getElementById('heroFx'); if(!holder) return;
  var PALETTE = ['#ffb000','#ff8a00','#ffd966','#fff3c4'];
  var parts = [];
  var mx=0.5, my=0.5, tmx=0.5, tmy=0.5;
  var sketch = function(p){
    p.setup = function(){
      var c = p.createCanvas(holder.clientWidth, holder.clientHeight);
      c.parent(holder);
      p.pixelDensity(Math.min(2, window.devicePixelRatio||1));
      p.noStroke();
      var n = Math.max(28, Math.min(70, Math.floor(p.width/22)));
      for(var i=0;i<n;i++){ parts.push(spawn(p,true)); }
    };
    function spawn(p, init){
      return {
        x: p.random(p.width),
        y: init ? p.random(p.height) : p.height + p.random(20,120),
        r: p.random(0.8,3.2),
        sp: p.random(0.25,0.9),
        drift: p.random(-0.35,0.35),
        a: p.random(20,90),
        col: PALETTE[Math.floor(p.random(PALETTE.length))]
      };
    }
    p.draw = function(){
      p.clear();
      mx += (tmx-mx)*0.05; my += (tmy-my)*0.25;
      var ox = (mx-0.5)*40, oy=(my-0.5)*26;
      p.blendMode(p.ADD);
      for(var i=0;i<parts.length;i++){
        var q=parts[i];
        q.y -= q.sp; q.x += q.drift + (mx-0.5)*0.6;
        if(q.y < -10){ parts[i]=spawn(p,false); q=parts[i]; }
        if(q.x < -10) q.x = p.width+10; if(q.x > p.width+10) q.x=-10;
        var tw = 0.6 + 0.4*Math.sin((p.frameCount*0.03)+(i));
        // halo suave
        p.noStroke(); p.fill(255, 200, 90, q.a*0.10);
        p.circle(q.x+ox, q.y+oy, q.r*7*tw);
        // núcleo brillante
        p.fill(q.col);
        p.circle(q.x+ox, q.y+oy, q.r*2*tw);
      }
      p.blendMode(p.BLEND);
    };
    p.windowResized = function(){ p.resizeCanvas(holder.clientWidth, holder.clientHeight); };
  };
  // parallax de cursor
  window.addEventListener('mousemove', function(e){
    tmx = e.clientX/window.innerWidth; tmy = e.clientY/window.innerHeight;
  }, {passive:true});
  try { new p5(sketch); } catch(err){ /* si p5 no carga, el hero queda con la foto */ }
})();
