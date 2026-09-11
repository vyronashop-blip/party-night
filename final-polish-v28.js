(()=>{
'use strict';
function refreshIdentity(){
  const total=GAME_DEFS.length;
  const hero=document.querySelector('.matchHeroCopy p');
  if(hero)hero.textContent=`${total} لعبة، Challenge 30 PRO، بطولة ومخرج سهرة ذكي، Profiles ومواسم، Game Master، TV وRemote Room — من تلفون واحد أو عدة أجهزة.`;
  const count=document.getElementById('contentCount');if(count)count.textContent=`${total} لعبة • 1000+ بطاقة ومهمة`;
  const smart=document.querySelector('#v26Hub .v26SmartHero p');if(smart)smart.textContent='حدد وقتكم والمود، ونبني سهرة متوازنة من مكتبة كبيرة من الألعاب بدون تكرار نفس الجو وراء بعض.';
}
window.showAbout=function(){
  const total=GAME_DEFS.length;
  document.getElementById('aboutBody').innerHTML=`<div class="creatorHero"><div class="creatorMark">YN</div><div><div class="eyebrow">CREATOR & DEVELOPER</div><h2>يزن عبد الحليم</h2><p>لعبة <b>ليلة التحدي</b> من صنع وتطوير يزن عبد الحليم.</p></div></div><div class="aboutFacts"><div><b>${total}</b><span>لعبة جماعية</span></div><div><b>2–10+</b><span>لاعبين</span></div><div><b>Offline</b><span>اللعب الأساسي</span></div></div><div class="panel" style="margin-top:12px"><b>🌍 Party Platform</b><p class="muted">Challenge 30 PRO • Smart Director • Championship • Profiles & XP • Seasons • Custom Packs • Game Master • TV Mode • Remote Room Beta • Stats & Recap.</p></div><p class="muted center">الهوية البصرية مستوحاة من أجواء ليالي كرة القدم الزرقاء والحمراء، بدون استخدام شعارات أندية رسمية.</p>`;
  document.getElementById('aboutModal').classList.add('open');
};
// Make the new games feel native in filtering and discovery.
try{
  if(typeof FILTERS!=='undefined'&&!FILTERS.some(x=>x[0]==='meta'))FILTERS.push(['meta','🎭 ممتدة']);
}catch{}
refreshIdentity();setTimeout(refreshIdentity,650);window.addEventListener('pageshow',()=>setTimeout(refreshIdentity,120));
})();