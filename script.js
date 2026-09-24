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
// Mobile-safe: muted inline autoplay, MP4 first for Safari/iPhone, and a tap-to-play fallback.
const video=document.getElementById('agroVideo');
const music=document.getElementById('agroMusic');
const soundBtn=document.getElementById('videoSound');
const playBtn=document.getElementById('videoPlay');

if(video){
  video.muted=true;
  video.defaultMuted=true;
  video.setAttribute('muted','');
  video.setAttribute('playsinline','');
  video.setAttribute('webkit-playsinline','');

  const hidePlay=()=>{ if(playBtn) playBtn.classList.remove('show'); };
  const showPlay=()=>{ if(playBtn) playBtn.classList.add('show'); };
  const tryPlay=()=>{
    video.muted=true;
    const promise=video.play();
    if(promise && typeof promise.then==='function') promise.then(hidePlay).catch(showPlay);
  };

  video.addEventListener('playing',hidePlay);
  video.addEventListener('canplay',tryPlay);
  video.addEventListener('error',showPlay);
  if(playBtn) playBtn.addEventListener('click',tryPlay);

  // Some mobile browsers require a user gesture before playback.
  const gesture=()=>{ if(video.paused) tryPlay(); };
  window.addEventListener('pointerdown',gesture,{once:true,passive:true});
  window.addEventListener('touchstart',gesture,{once:true,passive:true});
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden && video.paused) tryPlay(); });

  tryPlay();
  setTimeout(()=>{ if(video.paused) showPlay(); },1800);
}

if(music && soundBtn){
  soundBtn.addEventListener('click',async()=>{
    const soundOn=soundBtn.getAttribute('aria-pressed')==='true';
    if(soundOn){
      music.pause();
      music.currentTime=0;
      soundBtn.textContent='🔇 Music Off';
      soundBtn.setAttribute('aria-pressed','false');
      soundBtn.setAttribute('aria-label','Turn background music on');
    }else{
      try{
        music.volume=0.38;
        await music.play();
        soundBtn.textContent='🔊 Music On';
        soundBtn.setAttribute('aria-pressed','true');
        soundBtn.setAttribute('aria-label','Turn background music off');
      }catch(e){}
    }
  });
}
