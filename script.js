const progress=document.querySelector('.scrollbar');
window.addEventListener('scroll',()=>{const d=document.documentElement;progress.style.width=(d.scrollTop/(d.scrollHeight-d.clientHeight)*100)+'%';});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.reveal,.section,.numbers').forEach(x=>{x.classList.add('reveal');io.observe(x)});

document.querySelectorAll('.product-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.product-tabs button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.product').forEach(card=>{
      card.style.display=(f==='all'||card.dataset.cat===f)?'block':'none';
    });
  });
});

const lb=document.querySelector('.lightbox'), lbImg=lb.querySelector('img');
const imgs=[...document.querySelectorAll('.gallery-item img')];
let current=0;
function show(i){current=(i+imgs.length)%imgs.length;lbImg.src=imgs[current].src;lbImg.alt=imgs[current].alt;lb.classList.add('open');lb.setAttribute('aria-hidden','false');}
imgs.forEach((img,i)=>img.parentElement.addEventListener('click',()=>show(i)));
lb.querySelector('.close').onclick=()=>{lb.classList.remove('open');lb.setAttribute('aria-hidden','true')};
lb.querySelector('.prev').onclick=()=>show(current-1);
lb.querySelector('.next').onclick=()=>show(current+1);
lb.addEventListener('click',e=>{if(e.target===lb)lb.querySelector('.close').click()});
document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.querySelector('.close').click();if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1)});

// Background agriculture video + original ambient music.
// The video remains muted so it can autoplay reliably; the button controls the music track.
const video=document.getElementById('agroVideo');
const music=document.getElementById('agroMusic');
const soundBtn=document.getElementById('videoSound');
if(video){
  const tryPlay=()=>video.play().catch(()=>{});
  tryPlay();
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) tryPlay(); });
}
if(music && soundBtn){
  let soundOn=false;
  soundBtn.addEventListener('click', async()=>{
    soundOn=!soundOn;
    if(soundOn){
      try{ music.volume=0.38; await music.play(); }catch(e){}
    }else{
      music.pause();
      music.currentTime=0;
    }
    soundBtn.textContent=soundOn?'🔊 Music On':'🔇 Music Off';
    soundBtn.setAttribute('aria-pressed',String(soundOn));
    soundBtn.setAttribute('aria-label',soundOn?'Turn background music off':'Turn background music on');
  });
}
