(()=>{
'use strict';
const CM=window.PN_CONTENT_MODE,V=window.PARTY_V26_CONTENT;if(CM&&V&&!CM._v31Hardened){const base=CM.apply.bind(CM);CM.apply=function(theme='all'){base(theme);if(theme==='nofootball'){
 const football=/كرة|لاعب|هدف|دوري|كأس|مونديال|برشلونة|ريال|ليفربول|أرسنال|مانشستر|ميلان|إنتر|بايرن|ميسي|رونالدو|نيمار|زيدان|ملعب|منتخب|أبطال/i;
 V.fiveSec=V.fiveSec.filter(x=>x[0]!=='football');
 V.emoji=V.emoji.filter(x=>x[0]!=='football');
 V.majority=V.majority.filter(x=>!football.test(x.join(' ')));
 V.order=V.order.filter(x=>!football.test([x.q,...(x.items||[])].join(' ')));
 V.estimate=V.estimate.filter(x=>!football.test(x[0]));
 V.memory=V.memory.filter(x=>!football.test(x[0]));
 setTimeout(()=>{const f=document.getElementById('fivePack');if(f)f.value='general';const e=document.getElementById('emojiPack');if(e)e.value='general';try{document.querySelectorAll('#triviaPacks .packBtn').forEach(b=>{const id=b.dataset.pack||'';b.classList.toggle('selected',!/football|ucl|world-cup|madrid|premier|barca/.test(id))})}catch{}},0)
 }return theme};CM._v31Hardened=true}
function ensureGuests(n){if(state.names.length)return;const count=Math.max(2,Math.min(10,Number(n||localStorage.getItem('pn.guestCount')||4)));state.names=Array.from({length:count},(_,i)=>`لاعب ${i+1}`);try{persist();renderNames?.()}catch{};toast(`👥 جهزت ${count} لاعبين مؤقتين`)}
const instant=window.instantPartyV30;window.instantPartyV30=function(){ensureGuests();return instant?.()};
window.PN_ENSURE_GUESTS_V31=ensureGuests;
})();