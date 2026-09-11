(()=>{
'use strict';
const CK='pn.challenge.counts.v27';
const PK='pn.pro.v27';
const day=()=>new Date().toISOString().slice(0,10);
function weekKey(){const d=new Date(),onejan=new Date(d.getFullYear(),0,1);return `${d.getFullYear()}-${Math.ceil((((d-onejan)/86400000)+onejan.getDay()+1)/7)}`}
function counts(){try{return JSON.parse(localStorage.getItem(CK)||'{}')}catch{return {}}}
function savePro(){try{localStorage.setItem(PK,JSON.stringify(window.PN_PRO||{}))}catch{}}
window.claimSeasonV27=function(kind){
  const c=counts();
  const key=kind==='daily'?`daily:${day()}`:`weekly:${weekKey()}`;
  const p=window.PN_PRO;if(!p)return;
  p.claimed??={};if(p.claimed[key]){toast('تم استلام الجائزة من قبل');return}
  let ready=false,reward=0;
  if(kind==='daily'){
    const d=c.day?.key===day()?c.day:null;ready=(d?.rounds||0)>=5;reward=40;
  }else{
    const w=c.week?.key===weekKey()?c.week:null;ready=Object.keys(w?.games||{}).length>=7;reward=120;
  }
  if(!ready){toast('لسا ما اكتمل التحدي');return}
  p.claimed[key]=1;p.seasonXP=(p.seasonXP||0)+reward;savePro();
  try{beep?.(980,.14);buzz?.([50,35,90])}catch{}
  toast(`✨ +${reward} XP موسمي`);
  document.getElementById('seasonCardV27')?.dispatchEvent(new Event('pn-refresh'));
};

// Tiny local diagnostics: keeps only recent error fingerprints on the device.
function logErr(kind,msg,src,line){try{let a=JSON.parse(localStorage.getItem('pn.errors.v27')||'[]');a.push({kind,msg:String(msg||'').slice(0,220),src:String(src||'').split('/').pop(),line:line||0,at:Date.now()});localStorage.setItem('pn.errors.v27',JSON.stringify(a.slice(-20)))}catch{}}
window.addEventListener('error',e=>logErr('error',e.message,e.filename,e.lineno));
window.addEventListener('unhandledrejection',e=>logErr('promise',e.reason?.message||e.reason||'Unhandled rejection','',0));

// If an external optional feature fails, core party play must remain usable.
window.addEventListener('offline',()=>{try{document.getElementById('remoteHostV27')?.classList.remove('open')}catch{}});
})();