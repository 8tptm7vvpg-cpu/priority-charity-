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
/* Version 2: temporary forms never transmit or persist user-entered information. */
(() => {
 'use strict';
 document.querySelectorAll('[data-form]').forEach(trigger => {
  trigger.addEventListener('click', () => {
   const modal=document.getElementById(`${trigger.dataset.form}-dialog`);
   if(!modal)return;
   modal.querySelector('form').reset();
   const packages=modal.querySelector('#sponsorship-package');
   if(packages)packages.value=trigger.dataset.package||'';
   modal.showModal();modal.scrollTop=0;document.body.classList.add('locked');
  });
 });
 document.querySelectorAll('.form-dialog:not(.policy-dialog)').forEach(modal => {
  const form=modal.querySelector('form');
  form.addEventListener('submit',event=>event.preventDefault());
  modal.querySelectorAll('[data-form-close]').forEach(button=>button.addEventListener('click',()=>modal.close()));
  modal.addEventListener('click',event=>{
   const box=modal.getBoundingClientRect();
   if(event.target===modal&&(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom))modal.close();
  });
  modal.addEventListener('close',()=>{form.reset();if(!document.querySelector('dialog[open]'))document.body.classList.remove('locked');});
 });
})();
/* Privacy dialogs and cookie UI demonstration: no cookies or storage are written. */
(() => {
 'use strict';
 document.querySelectorAll('[data-policy]').forEach(trigger=>trigger.addEventListener('click',()=>{
  const modal=document.getElementById(`${trigger.dataset.policy}-dialog`);
  modal.showModal();modal.scrollTop=0;document.body.classList.add('locked');
 }));
 document.querySelectorAll('.policy-dialog').forEach(modal=>{
  modal.querySelectorAll('[data-policy-close]').forEach(button=>button.addEventListener('click',()=>modal.close()));
  modal.addEventListener('click',event=>{const box=modal.getBoundingClientRect();if(event.target===modal&&(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom))modal.close();});
  modal.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('locked');});
 });
 document.getElementById('cookie-preference-form').addEventListener('submit',event=>event.preventDefault());
 const toggle=document.getElementById('cookie-toggle'),status=document.getElementById('cookie-status');
 toggle.addEventListener('click',()=>{
  const enabled=toggle.getAttribute('aria-checked')!=='true';
  toggle.setAttribute('aria-checked',String(enabled));
  status.textContent=enabled?'You are currently opted into cookies':'You have opted out of advertising cookies';
 });
})();
