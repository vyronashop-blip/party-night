(()=>{
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content='#071b4a';
  if(!document.getElementById('v22ThemeLink')){const l=document.createElement('link');l.id='v22ThemeLink';l.rel='stylesheet';l.href='theme-v22.css';document.head.appendChild(l)}
  const headLeft=document.querySelector('.topbar>div:first-child');
  if(headLeft)headLeft.innerHTML=`<div class="brandLockup"><div class="miniCrest" aria-hidden="true"><span>YN</span></div><div><div class="brand">ليلة التحدي <span class="version">V2.2</span></div><div class="brandSub">MATCH NIGHT • PARTY HUB</div></div></div><div class="muted" id="sessionSubtitle">جهاز واحد • 2–10 لاعبين • تعمل بدون إنترنت</div>`;
  const hero=document.querySelector('#home .hero');
  if(hero){hero.classList.add('matchHero');hero.innerHTML=`<div class="matchHeroCopy"><div class="eyebrow">BLAUGRANA-INSPIRED MATCH NIGHT</div><h1>السهرة إلها ملعبها.</h1><p class="muted">9 ألعاب، بطولة كاملة، باكات ضخمة، ونظام نقاط من تلفون واحد — بروح كروية زرقاء وحمراء.</p><div class="heroActions"><button class="gold" onclick="showChampionship()">🏆 ابدأ بطولة</button><button class="ghost" onclick="showPresets()">🎛️ اختار السهرة</button></div></div><div class="heroScoreboard"><div class="heroScoreTitle">MATCH CENTER</div><div class="heroStats"><div><b id="homePlayers">0</b><span>لاعب</span></div><div><b id="homeRounds">0</b><span>جولة</span></div><div><b id="homeGames">0</b><span>ألعاب</span></div></div><div class="heroStripe"></div></div>`}
  const ps=document.getElementById('presetStatus');if(ps&&!document.getElementById('championshipBanner')){const b=document.createElement('div');b.id='championshipBanner';b.className='championshipBanner hidden';ps.after(b)}
  const title=document.querySelector('#home .sectionTitle');if(title){title.innerHTML=`<div><div class="eyebrow">GAME LIBRARY</div><h2>اختاروا التحدي</h2></div><span id="contentCount" class="pill"></span>`;if(!document.getElementById('gameFilters')){const f=document.createElement('div');f.id='gameFilters';f.className='gameFilters';title.after(f)}}
  if(!document.querySelector('.bottomDock')){const n=document.createElement('nav');n.className='bottomDock';n.innerHTML=`<button onclick="home()"><span>⌂</span><small>الرئيسية</small></button><button onclick="showChampionship()"><span>🏆</span><small>البطولة</small></button><button class="dockMain" onclick="quickMix()"><span>🎲</span><small>عشوائي</small></button><button onclick="showSession()"><span>📊</span><small>الترتيب</small></button><button onclick="showSettings()"><span>⚙️</span><small>الإعدادات</small></button>`;document.querySelector('.app')?.appendChild(n)}
})();
try{initTriviaSetup();initPlayerPacks();if(currentPresetV21()){applyPackSelectionV21('triviaPacks',currentPresetV21().trivia);applyPackSelectionV21('playerPacks',currentPresetV21().players)}}catch(e){console.warn('pack refresh',e)}

'use strict';
const INTERNAL_BUILD='2.3';
const GAME_PRESENTATION={
  trivia:{cat:'football',label:'معرفة • فرق',a:'#2e69ff',b:'#b20f42',glow:'rgba(46,105,255,.22)',featured:true},
  player:{cat:'football',label:'كرة قدم',a:'#315dff',b:'#9a1748',glow:'rgba(177,17,64,.20)',featured:true},
  fake:{cat:'social',label:'خداع • نقاش',a:'#8546e8',b:'#b31e50',glow:'rgba(133,70,232,.18)'},
  sync:{cat:'social',label:'اجتماعي',a:'#596cff',b:'#8b2da9',glow:'rgba(89,108,255,.17)'},
  scale:{cat:'mind',label:'تفكير',a:'#2777e8',b:'#6a31be',glow:'rgba(39,119,232,.18)'},
  taboo:{cat:'teams',label:'فرق • سرعة',a:'#c32a4d',b:'#e18a31',glow:'rgba(220,72,72,.18)'},
  draw:{cat:'social',label:'إبداع • ضحك',a:'#2e83d9',b:'#b22975',glow:'rgba(178,41,117,.16)'},
  bowl:{cat:'teams',label:'فرق • ثلاث جولات',a:'#1f6cba',b:'#c73747',glow:'rgba(31,108,186,.18)'},
  bomb:{cat:'quick',label:'سرعة • ضغط',a:'#b60e36',b:'#e1a028',glow:'rgba(182,14,54,.20)'}
};
const FILTERS=[['all','الكل'],['football','⚽ كرة قدم'],['social','🎉 جماعي'],['teams','🤝 فرق'],['mind','🧠 تفكير'],['quick','⚡ سريع']];
let activeGameFilter='all';
function renderFiltersV22(){const el=$('gameFilters');if(!el)return;el.innerHTML=FILTERS.map(([id,n])=>`<button class="filterChip ${activeGameFilter===id?'active':''}" onclick="setGameFilterV22('${id}')">${n}</button>`).join('')}
window.setGameFilterV22=function(id){activeGameFilter=id;renderFiltersV22();renderGameGridV22()};
function renderGameGridV22(){
  const pool=GAME_DEFS.filter(g=>activeGameFilter==='all'||GAME_PRESENTATION[g.id]?.cat===activeGameFilter||(activeGameFilter==='quick'&&['player','bomb'].includes(g.id)));
  $('gameGrid').innerHTML=pool.map(g=>{const x=GAME_PRESENTATION[g.id]||{};return `<article class="gameCard ${x.featured&&activeGameFilter==='all'?'featured':''}" style="--cardA:${x.a};--cardB:${x.b};--cardGlow:${x.glow}" data-cat="${x.cat||'all'}"><div class="emoji">${g.emoji}</div><div class="gameCopy"><span class="gameCategory">${x.label||'Party Game'}</span><h3>${g.name}</h3><p>${g.desc}</p><div class="gameMeta"><span>👥 ${g.players}</span><span>⏱ ${g.time}</span></div></div><div class="cardButtons"><button class="play" onclick="showScreen('${g.id}')">ابدأ اللعب</button><button class="info" onclick="help('${g.id}')">طريقة اللعب</button></div></article>`}).join('');
  const count=PARTY_CONTENT.trivia.length+PARTY_CONTENT.players.length+PARTY_CONTENT.fake.length+PARTY_CONTENT.sync.length+PARTY_CONTENT.scale.length+PARTY_CONTENT.taboo.length+PARTY_CONTENT.draw.length+PARTY_CONTENT.bomb.length+(PARTY_CONTENT.bowlWords?.length||0);
  $('contentCount').textContent=`${count}+ بطاقة`;
}
function renderChampBannerV22(){const el=$('championshipBanner');if(!el)return;const c=state.session.championship;if(!c||!c.active||c.complete){el.classList.add('hidden');return}const game=GAME_DEFS.find(g=>g.id===c.games[c.index]);el.classList.remove('hidden');el.innerHTML=`<span>🏆</span><div><b>بطولة السهرة شغالة</b><small>المحطة ${c.index+1}/${c.games.length} • ${game?.name||'اللعبة التالية'}</small></div><button class="gold small" onclick="showChampionship()">متابعة</button>`}
const oldRenderHomeStatsV22=window.renderHomeStats;
window.renderHomeStats=function(){oldRenderHomeStatsV22?.();renderChampBannerV22()};
setInterval(renderChampBannerV22,1500);
function celebrateV22(){for(let i=0;i<42;i++){const d=document.createElement('i');d.className='confettiPiece';d.style.left=`${Math.random()*100}vw`;d.style.background=['#2f6cff','#a80c35','#f4c96b','#fff'][i%4];d.style.setProperty('--x',`${(Math.random()-.5)*220}px`);d.style.animationDelay=`${Math.random()*.35}s`;document.body.appendChild(d);setTimeout(()=>d.remove(),2400)}}
const oldChampAwardV22=window.champAward;
if(oldChampAwardV22)window.champAward=function(name){oldChampAwardV22(name);if(state.session.championship?.complete){celebrateV22();toast(`🏆 ${name} بطل السهرة!`)}}
['football','experts'].forEach(k=>{const p=PARTY_PRESETS[k];if(!p)return;['barca-pep','barca-history','barca-expert','football-2000s'].forEach(id=>{if(!p.trivia.includes(id))p.trivia.push(id)})});
if(PARTY_PRESETS.football?.players&&!PARTY_PRESETS.football.players.includes('barca-legends'))PARTY_PRESETS.football.players.push('barca-legends');
if(PARTY_PRESETS.experts?.players&&!PARTY_PRESETS.experts.players.includes('barca-legends'))PARTY_PRESETS.experts.players.push('barca-legends');
PARTY_PRESETS.cule={name:'ليلة كروية زرقاء وحمراء',emoji:'🔵🔴',desc:'برشلونة + دوري الأبطال + محنكين',games:['trivia','player','fake','taboo','bomb'],trivia:['barca','barca-pep','barca-history','barca-expert','ucl','football-expert'],players:['barca','barca-legends','legends','ucl'],target:30,diff:'all'};
renderFiltersV22();renderGameGridV22();renderChampBannerV22();renderHomeStats();
