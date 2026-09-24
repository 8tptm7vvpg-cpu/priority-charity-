/* Navigation, once-only scroll reveals and counters, subtle parallax, gallery lightbox. */
(() => {
 'use strict';
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const toggle = document.querySelector('.menu-toggle');
 const nav = document.querySelector('.site-nav');
 const closeMenu=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu';};
 toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close':'Menu';});
 nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
 if ('IntersectionObserver' in window) {
  if(!reduced) document.documentElement.classList.add('motion-enabled');
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   entry.target.classList.add('in-view');
   if(entry.target.hasAttribute('data-count')&&!reduced){
    const target=Number(entry.target.dataset.count),prefix=entry.target.dataset.prefix||'',start=performance.now();
    const animate=now=>{const progress=Math.min((now-start)/1600,1),value=Math.round(target*(1-Math.pow(1-progress,3)));entry.target.textContent=prefix+value.toLocaleString('en-US');if(progress<1)requestAnimationFrame(animate);};
    requestAnimationFrame(animate);
   }
   observer.unobserve(entry.target);
  }),{threshold:.12});
  document.querySelectorAll('.reveal,[data-count]').forEach(el=>observer.observe(el));
 }
 const progress=document.querySelector('.progress'),parallax=[...document.querySelectorAll('[data-parallax]')];let pending=false;
 function paint(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;if(!reduced)parallax.forEach(el=>{const rect=el.parentElement.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight){const distance=Math.max(-65,Math.min(65,-rect.top*.16));el.style.transform=`translate3d(0,${distance}px,0)`;}});pending=false;}
 addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(paint);}},{passive:true});addEventListener('resize',paint);paint();
 const dialog=document.querySelector('#lightbox'),full=dialog.querySelector('img'),caption=dialog.querySelector('p');
 let photos=[],current=0;
 const showPhoto=()=>{const item=photos[current];full.src=item.dataset.full;full.alt=item.querySelector('img').alt;caption.textContent=`${full.alt} · ${current+1} of ${photos.length}`;};
 document.querySelectorAll('.gallery-button').forEach(button=>button.addEventListener('click',()=>{photos=[...button.closest('.gallery-grid').querySelectorAll('.gallery-button')];current=photos.indexOf(button);showPhoto();dialog.showModal();document.body.classList.add('locked');}));
 dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('locked'));
 dialog.querySelector('[data-prev]').addEventListener('click',()=>{current=(current-1+photos.length)%photos.length;showPhoto();});dialog.querySelector('[data-next]').addEventListener('click',()=>{current=(current+1)%photos.length;showPhoto();});
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){current=(current+1)%photos.length;showPhoto();}if(e.key==='ArrowLeft'){current=(current-1+photos.length)%photos.length;showPhoto();}});
})();
