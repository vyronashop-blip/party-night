(()=>{
'use strict';
if(typeof GAME_DEFS==='undefined')return;
const BASE={
 trivia:{min:2,max:10,minutes:[20,90],formats:['duel','group','team'],devices:['shared','multi','online'],tags:['knowledge','football','general'],content:['trivia'],pace:'medium',personal:false},
 player:{min:2,max:10,minutes:[5,20],formats:['duel','group'],devices:['shared','multi','online'],tags:['football','guessing'],content:['player'],pace:'medium',personal:false},
 fake:{min:3,max:10,minutes:[10,30],formats:['group'],devices:['shared','multi','online'],tags:['social','bluff'],content:['fake'],pace:'medium',personal:true},
 sync:{min:3,max:10,minutes:[10,25],formats:['group'],devices:['shared','multi','online'],tags:['social','word'],content:['prompt'],pace:'medium',personal:false},
 scale:{min:3,max:10,minutes:[10,25],formats:['group','team'],devices:['shared','multi','online'],tags:['mind','social'],content:['scale'],pace:'medium',personal:false},
 taboo:{min:4,max:10,minutes:[15,40],formats:['team'],devices:['shared','multi','online'],tags:['word','team'],content:['taboo'],pace:'fast',personal:false},
 draw:{min:3,max:10,minutes:[15,35],formats:['group'],devices:['shared','multi','online'],tags:['creative','drawing'],content:['draw'],pace:'medium',personal:false},
 bowl:{min:4,max:10,minutes:[25,50],formats:['team'],devices:['shared'],tags:['word','team'],content:['bowl'],pace:'fast',personal:false},
 bomb:{min:3,max:10,minutes:[10,25],formats:['group'],devices:['shared','multi'],tags:['quick','word'],content:['category'],pace:'fast',personal:false},
 five:{min:2,max:10,minutes:[10,25],formats:['duel','group'],devices:['shared','multi','online'],tags:['quick','word','football'],content:['challenge'],pace:'fast',personal:false},
 majority:{min:3,max:10,minutes:[10,25],formats:['group'],devices:['shared','multi','online'],tags:['social','vote'],content:['vote'],pace:'medium',personal:true},
 order:{min:2,max:10,minutes:[10,25],formats:['duel','group'],devices:['shared','multi','online'],tags:['mind','knowledge','football'],content:['order'],pace:'medium',personal:false},
 emoji:{min:2,max:10,minutes:[8,20],formats:['duel','group'],devices:['shared','multi','online'],tags:['quick','guessing','football'],content:['emoji'],pace:'fast',personal:false},
 estimate:{min:2,max:10,minutes:[10,25],formats:['duel','group'],devices:['shared','multi','online'],tags:['mind','numbers','football'],content:['estimate'],pace:'medium',personal:false},
 memory:{min:2,max:10,minutes:[10,20],formats:['duel','group'],devices:['shared','multi','online'],tags:['mind','memory'],content:['memory'],pace:'medium',personal:false},
 whisper:{min:3,max:10,minutes:[10,25],formats:['group'],devices:['shared'],tags:['social','word'],content:['phrase'],pace:'medium',personal:false},
 court:{min:3,max:10,minutes:[15,30],formats:['group'],devices:['shared','multi','online'],tags:['social','vote'],content:['scenario'],pace:'medium',personal:true},
 pitch:{min:3,max:10,minutes:[10,25],formats:['group'],devices:['shared','multi','online'],tags:['creative','social'],content:['pitch'],pace:'medium',personal:false},
 forbidden:{min:3,max:10,minutes:[20,90],formats:['group'],devices:['shared','multi'],tags:['social','meta'],content:['rule'],pace:'ambient',personal:true},
 mission:{min:3,max:10,minutes:[20,90],formats:['group'],devices:['shared','multi'],tags:['social','meta','hidden'],content:['mission'],pace:'ambient',personal:true},
 chain:{min:2,max:10,minutes:[10,25],formats:['duel','group'],devices:['shared','multi','online'],tags:['quick','word','football'],content:['category'],pace:'fast',personal:false},
 whoSaid:{min:3,max:10,minutes:[15,30],formats:['group'],devices:['shared','multi','online'],tags:['social','guessing'],content:['prompt'],pace:'medium',personal:true},
 converge:{min:2,max:10,minutes:[10,25],formats:['duel','group'],devices:['shared','multi','online'],tags:['mind','word'],content:['anchor'],pace:'medium',personal:false}
};
const registry=new Map();
function normalize(id,m={}){const g=GAME_DEFS.find(x=>x.id===id)||{};const p=String(g.players||'2–10').match(/\d+/g)||[];return {id,min:m.min??Number(p[0]||2),max:m.max??Number(p[1]||p[0]||10),minutes:m.minutes||[8,25],formats:m.formats||['group'],devices:m.devices||['shared'],tags:m.tags||[],content:m.content||[],pace:m.pace||'medium',personal:!!m.personal,family:m.family!==false,onlineReady:m.devices?.includes('online')||false,multiReady:m.devices?.includes('multi')||false,...m}}
Object.entries(BASE).forEach(([id,m])=>registry.set(id,normalize(id,m)));
const CAPS=window.PN_CAPS={version:31,register(id,m){registry.set(id,normalize(id,m));return registry.get(id)},get:id=>registry.get(id)||normalize(id,{}),all:()=>GAME_DEFS.map(g=>registry.get(g.id)||normalize(g.id,{})),supports(id,q={}){const c=CAPS.get(id);if(q.players&&(q.players<c.min||q.players>c.max))return false;if(q.format&&!c.formats.includes(q.format))return false;if(q.device&&!c.devices.includes(q.device))return false;if(q.tag&&!c.tags.includes(q.tag))return false;if(q.family&&c.family===false)return false;if(q.noPersonal&&c.personal)return false;return true},list(q={}){return GAME_DEFS.filter(g=>CAPS.supports(g.id,q))},estimate(id,players){const c=CAPS.get(id),mid=Math.round((c.minutes[0]+c.minutes[1])/2);return Math.max(c.minutes[0],Math.min(c.minutes[1],mid+(Number(players||4)-4)))}};
GAME_DEFS.forEach(g=>{g.capabilities=CAPS.get(g.id)});

const types={trivia:'سؤال وجواب',player:'هوية/شخص',order:'ترتيب',estimate:'رقم/تقدير',emoji:'شفرة',taboo:'كلمة وممنوعات',category:'فئة مفتوحة',prompt:'موقف/عبارة',memory:'ذاكرة',scenario:'سيناريو',mission:'مهمة سرية',rule:'قاعدة ممتدة',draft:'اختيار/درافت',signal:'معلومتان مرتبطتان',auction:'مزايدة',sequence:'تسلسل'};
const pools=new Map();
const CR=window.PN_CONTENT_REGISTRY={version:31,types,registerType:(id,label)=>types[id]=label,registerPool(id,meta={}){pools.set(id,{id,items:[],tags:[],source:'builtin',license:'first-party',quality:'curated',...meta});return pools.get(id)},add(id,item){const p=pools.get(id)||CR.registerPool(id);p.items.push(item);return item},get:id=>pools.get(id),all:()=>[...pools.values()],find(q={}){return [...pools.values()].filter(p=>(!q.type||p.type===q.type)&&(!q.tag||p.tags?.includes(q.tag))&&(!q.source||p.source===q.source))},stats(){return [...pools.values()].map(p=>({id:p.id,type:p.type,count:p.items?.length||0,tags:p.tags||[]}))}};
try{CR.registerPool('trivia-main',{type:'trivia',tags:['general','knowledge'],items:PARTY_CONTENT?.trivia||[],source:'builtin',license:'first-party+structured'});CR.registerPool('players-main',{type:'player',tags:['football'],items:PARTY_CONTENT?.players||[]})}catch{}

const dbName='party-night-v31';let dbp=null;
function openDB(){if(!('indexedDB'in window))return Promise.resolve(null);if(dbp)return dbp;dbp=new Promise((resolve,reject)=>{const r=indexedDB.open(dbName,1);r.onupgradeneeded=()=>{const db=r.result;if(!db.objectStoreNames.contains('kv'))db.createObjectStore('kv')};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});return dbp}
window.PN_STORE={async get(key,fallback=null){try{const db=await openDB();if(!db){const v=localStorage.getItem('pn31:'+key);return v==null?fallback:JSON.parse(v)}return await new Promise((res,rej)=>{const tx=db.transaction('kv','readonly'),r=tx.objectStore('kv').get(key);r.onsuccess=()=>res(r.result??fallback);r.onerror=()=>rej(r.error)})}catch{return fallback}},async set(key,value){try{const db=await openDB();if(!db){localStorage.setItem('pn31:'+key,JSON.stringify(value));return value}await new Promise((res,rej)=>{const tx=db.transaction('kv','readwrite');tx.objectStore('kv').put(value,key);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error)});return value}catch{return value}},async del(key){try{const db=await openDB();if(!db){localStorage.removeItem('pn31:'+key);return}await new Promise((res,rej)=>{const tx=db.transaction('kv','readwrite');tx.objectStore('kv').delete(key);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error)})}catch{}}};

window.PN_PLATFORM={version:31,kind:'web',isNative:false,async share(data){if(navigator.share)return navigator.share(data);if(data?.url&&navigator.clipboard)return navigator.clipboard.writeText(data.url)},haptic(ms=30){try{if(navigator.vibrate)navigator.vibrate(ms)}catch{}},online:()=>navigator.onLine,features:{pwa:true,indexedDB:'indexedDB'in window,webrtc:'RTCPeerConnection'in window,websocket:'WebSocket'in window,share:'share'in navigator}};
})();