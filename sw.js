const CACHE='party-night-v2-2-pro-platform-20260912b';
const ASSETS=['./','./index.html','./styles.css','./data.js','./content-v2.js','./content-v23.js','./content-hardening-v25.js','./content-hardening-fix-v25.js','./content-v26.js','./pro-content-v27.js','./app.js','./v21.js','./polish-v22-runtime.js','./polish-v22-runtime-core.js','./trivia-v24.js','./trivia-pro-v27.js','./games-v26.js','./games-pro-v27.js','./platform-pro-v27.js','./pro-fixes-v27.js','./world-v26.css','./pro-v27.css','./manifest.webmanifest','./icon.svg','./apple-touch-icon.png','./favicon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin){e.respondWith(fetch(e.request).catch(()=>new Response('',{status:503})));return}
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
