(function(){
  var d=document,b=d.body,hdr=d.querySelector('.hdr'),burger=d.getElementById('burger'),nav=d.getElementById('nav');
  function zamknij(){b.classList.remove('menu-otw');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Otwórz menu');}
  burger.addEventListener('click',function(){var o=b.classList.toggle('menu-otw');burger.setAttribute('aria-expanded',o?'true':'false');burger.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');});
  nav.addEventListener('click',function(e){if(e.target.closest('a'))zamknij();});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'){zamknij();zamknijLb();}});
  var cienOn=false;
  addEventListener('scroll',function(){var c=scrollY>8;if(c!==cienOn){cienOn=c;hdr.classList.toggle('cien',c);}},{passive:true});
  // aktywna pozycja menu
  var linki=[].slice.call(nav.querySelectorAll('a[href^="#"]:not(.tel-m)'));
  var sek=linki.map(function(a){return d.querySelector(a.getAttribute('href')==='#gora'?'#hero':a.getAttribute('href'));});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){var i=sek.indexOf(x.target);linki.forEach(function(a,j){a.classList.toggle('akt',j===i);});}});},{rootMargin:'-45% 0px -50% 0px'});
    sek.forEach(function(s){s&&io.observe(s);});
    var mob=d.getElementById('mob'),btnHero=d.querySelector('.hero .btn');
    new IntersectionObserver(function(en){mob.classList.toggle('widac',!en[0].isIntersecting&&en[0].boundingClientRect.top<0);}).observe(btnHero);
  }
  // formularz pokazowy
  d.getElementById('form').addEventListener('submit',function(e){e.preventDefault();d.getElementById('wyslano').style.display='block';});
  // lightbox
  var lb=d.getElementById('lb'),lbImg=lb.querySelector('img'),lbCap=lb.querySelector('figcaption'),ostatni=null;
  function otworz(el){ostatni=el;var mini=el.querySelector('img');lbImg.src=mini.currentSrc||mini.src;lbImg.alt=mini.alt;lbCap.textContent=el.getAttribute('data-opis');lb.classList.add('otw');lb.setAttribute('aria-hidden','false');lb.querySelector('button').focus();
    var duzy=el.getAttribute('data-lb');setTimeout(function(){var i=new Image();i.onload=function(){if(lb.classList.contains('otw'))lbImg.src=duzy;};i.src=duzy;},180);}
  function zamknijLb(){if(!lb.classList.contains('otw'))return;lb.classList.remove('otw');lb.setAttribute('aria-hidden','true');if(ostatni)ostatni.focus();}
  [].forEach.call(d.querySelectorAll('[data-lb]'),function(el){el.addEventListener('click',function(){otworz(el);});el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();otworz(el);}});});
  lb.addEventListener('click',function(e){if(e.target!==lbImg)zamknijLb();});
})();
