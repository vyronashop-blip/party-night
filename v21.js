'use strict';
const v21Style=document.createElement('link');v21Style.rel='stylesheet';v21Style.href='v21.css';document.head.appendChild(v21Style);

const PARTY_PRESETS={
  football:{name:'سهرة كروية',emoji:'⚽',desc:'كرة قدم من البداية للنهاية',games:['trivia','player','fake','taboo','bomb'],trivia:['football-general','ucl','world-cup','barca','madrid','premier','football-expert'],players:['modern','legends','barca','madrid','premier','ucl'],target:30,diff:'all'},
  experts:{name:'ليلة المحنكين',emoji:'🧠',desc:'أسئلة أصعب وتحديات تفكير',games:['trivia','player','fake','scale','sync','bomb'],trivia:['football-expert','ucl','world-cup','barca','madrid'],players:['legends','ucl','barca','madrid'],target:30,diff:'all'},
  family:{name:'سهرة عائلية',emoji:'👨‍👩‍👧‍👦',desc:'منوعات ودين وجغرافيا وعلوم',games:['trivia','sync','scale','taboo','draw','bowl','bomb'],trivia:['religion','general','geography','science','movies'],players:['modern','legends'],target:20,diff:'all'},
  quick:{name:'سهرة سريعة',emoji:'⚡',desc:'ألعاب سريعة لنحو 45–60 دقيقة',games:['player','sync','taboo','bomb'],trivia:['general','football-general'],players:['modern','legends'],target:15,diff:'all'},
  chaos:{name:'خلطة مجانين',emoji:'🎲',desc:'كل الألعاب وكل أنواع المحتوى',games:GAME_DEFS.map(g=>g.id),trivia:null,players:null,target:30,diff:'all'}
};

state.settings.preset=state.settings.preset||'custom';
state.settings.mixPool=Array.isArray(state.settings.mixPool)?state.settings.mixPool:null;
if(!('championship' in state.session))state.session.championship=null;

function currentPresetV21(){return PARTY_PRESETS[state.settings.preset]||null}
function renderPresetStatusV21(){const el=$('presetStatus');if(!el)return;const p=currentPresetV21();el.innerHTML=p?`<span>${p.emoji}</span><div><b>${p.name}</b><small>${p.desc}</small></div><button class="ghost small" onclick="showPresets()">تغيير</button>`:`<span>🎚️</span><div><b>وضع مخصص</b><small>كل الألعاب متاحة بدون فلتر جاهز.</small></div><button class="ghost small" onclick="showPresets()">اختيار</button>`}
function applyPackSelectionV21(container,ids){const btns=$$(`#${container} .packBtn`);if(!ids){btns.forEach(b=>b.classList.add('selected'));return}btns.forEach(b=>b.classList.toggle('selected',ids.includes(b.dataset.pack)))}

window.showPresets=function(){
  $('presetBody').innerHTML=`<p class="muted">اختيار الوضع يضبط الألعاب التي تدخل في الاختيار العشوائي، ويجهز باكات تحدّي 30 ومين اللاعب تلقائيًا.</p><div class="presetGrid">${Object.entries(PARTY_PRESETS).map(([id,p])=>`<button class="presetCard ${state.settings.preset===id?'activePreset':''}" onclick="applyPreset('${id}')"><span>${p.emoji}</span><div><b>${p.name}</b><small>${p.desc}</small></div></button>`).join('')}<button class="presetCard ${state.settings.preset==='custom'?'activePreset':''}" onclick="applyPreset('custom')"><span>🎚️</span><div><b>مخصص</b><small>بدون فلترة جاهزة.</small></div></button></div>`;
  $('presetModal').classList.add('open');
};
window.applyPreset=function(id){
  const p=PARTY_PRESETS[id];
  state.settings.preset=p?id:'custom';
  state.settings.mixPool=p?[...p.games]:null;
  if(p){
    applyPackSelectionV21('triviaPacks',p.trivia);
    applyPackSelectionV21('playerPacks',p.players);
    if($('triviaTarget'))$('triviaTarget').value=String(p.target);
    if($('triviaDifficulty'))$('triviaDifficulty').value=p.diff||'all';
  }
  persist();renderPresetStatusV21();closeModal('presetModal');toast(p?`${p.emoji} تم تفعيل ${p.name}`:'🎚️ وضع مخصص');
};

window.quickMix=function(){
  let pool=state.settings.mixPool?.length?GAME_DEFS.filter(g=>state.settings.mixPool.includes(g.id)):GAME_DEFS;
  const playable=pool.filter(g=>state.names.length>=parseInt(g.players));
  const g=pick(playable.length?playable:pool);
  if(!g)return;
  toast(`🎲 ${g.name}`);setTimeout(()=>showScreen(g.id),350);
};

window.renderHomeStats=function(){
  $('homePlayers').textContent=state.names.length;
  $('homeRounds').textContent=state.session.rounds;
  $('homeGames').textContent=Object.values(state.session.games).filter(x=>x>0).length;
  renderPresetStatusV21();
};

window.renderGameGrid=function(){
  $('gameGrid').innerHTML=GAME_DEFS.map(g=>`<article class="gameCard"><div class="emoji">${g.emoji}</div><h3>${g.name}</h3><p>${g.desc}</p><div class="gameMeta"><span>👥 ${g.players}</span><span>⏱ ${g.time}</span></div><div class="cardButtons"><button class="play" onclick="showScreen('${g.id}')">ابدأ</button><button class="info" onclick="help('${g.id}')">؟ شرح</button></div></article>`).join('');
  const count=PARTY_CONTENT.trivia.length+PARTY_CONTENT.players.length+PARTY_CONTENT.fake.length+PARTY_CONTENT.sync.length+PARTY_CONTENT.scale.length+PARTY_CONTENT.taboo.length+PARTY_CONTENT.draw.length+PARTY_CONTENT.bomb.length+(PARTY_CONTENT.bowlWords?.length||0);
  $('contentCount').textContent=`${count}+ بطاقة ومهمة`;
};

function nightAwardsV21(scores,games){
  const out=[];
  if(scores.length)out.push(`<div class="awardCard"><span>👑</span><div><b>ملك السهرة</b><small>${scores[0][0]} • ${scores[0][1]} نقطة</small></div></div>`);
  if(games.length)out.push(`<div class="awardCard"><span>🎮</span><div><b>اللعبة المفضلة</b><small>${GAME_DEFS.find(x=>x.id===games[0][0])?.name||games[0][0]} • ${games[0][1]} جولة</small></div></div>`);
  const strikes=Object.entries(state.session.strikes).sort((a,b)=>b[1]-a[1]);
  if(strikes.length)out.push(`<div class="awardCard"><span>💥</span><div><b>صديق القنبلة</b><small>${strikes[0][0]} • ${strikes[0][1]} ضربات</small></div></div>`);
  return out.join('');
}
window.showSession=function(){
  const scores=Object.entries(state.session.scores).sort((a,b)=>b[1]-a[1]);
  const games=Object.entries(state.session.games).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]);
  const mins=Math.max(1,Math.round((Date.now()-state.session.startedAt)/60000));
  const awards=nightAwardsV21(scores,games);
  $('sessionBody').innerHTML=`<div class="statGrid"><div class="statBox"><b>${state.session.rounds}</b>جولات</div><div class="statBox"><b>${games.length}</b>ألعاب</div><div class="statBox"><b>${mins}</b>دقيقة</div></div>${awards?`<h3>✨ جوائز السهرة</h3><div class="awardGrid">${awards}</div>`:''}<h3>🏅 الترتيب الفردي</h3><div class="leaderboard">${scores.length?scores.map(([n,s],i)=>`<div><span>${i===0?'🥇':i===1?'🥈':i===2?'🥉':''} ${n}</span><b>${s}</b></div>`).join(''):'<div class="muted">لسا ما في نقاط فردية.</div>'}</div><h3>🎮 الأكثر لعبًا</h3><div class="leaderboard">${games.length?games.map(([g,c])=>`<div><span>${GAME_DEFS.find(x=>x.id===g)?.name||g}</span><b>${c}</b></div>`).join(''):'<div class="muted">ابدأوا أول لعبة 😄</div>'}</div><div class="actions"><button class="gold" onclick="closeModal('sessionModal');showChampionship()">🏆 بطولة السهرة</button><button class="danger" onclick="newNight();closeModal('sessionModal')">سهرة جديدة</button></div>`;
  $('sessionModal').classList.add('open');
};

window.showChampionship=function(){
  const c=state.session.championship;
  if(!c||!c.active){
    $('champBody').innerHTML=`<div class="champIntro"><div class="trophyBig">🏆</div><h3>حوّل السهرة إلى بطولة</h3><p class="muted">اللعبة تختار سلسلة ألعاب مختلفة. بعد كل لعبة اختار الفائز من أسماء السهرة؛ الفائز يأخذ 3 نقاط بطولة.</p></div><div class="row championshipChoices"><button class="primary" onclick="startChampionship(3)">3 ألعاب</button><button class="gold" onclick="startChampionship(5)">5 ألعاب</button><button class="primary" onclick="startChampionship(7)">7 ألعاب</button></div>`;
  }else renderChampionshipBodyV21();
  $('champModal').classList.add('open');
};
window.startChampionship=function(count){
  if(!requirePlayers(2))return;
  let pool=state.settings.mixPool?.length?GAME_DEFS.filter(g=>state.settings.mixPool.includes(g.id)):GAME_DEFS;
  pool=pool.filter(g=>state.names.length>=parseInt(g.players));
  const games=shuffle(pool).slice(0,Math.min(count,pool.length)).map(g=>g.id);
  state.session.championship={active:true,games,index:0,scores:{},history:[],startedAt:Date.now(),complete:false};
  persist();renderChampionshipBodyV21();
};
function renderChampionshipBodyV21(){
  const c=state.session.championship;if(!c)return;
  const ranking=Object.entries(c.scores||{}).sort((a,b)=>b[1]-a[1]);
  if(c.complete||c.index>=c.games.length){
    c.complete=true;persist();
    $('champBody').innerHTML=`<div class="champIntro"><div class="trophyBig">🏆</div><h2>${ranking[0]?`البطل: ${ranking[0][0]} 🎉`:'انتهت البطولة'}</h2><p class="muted">${c.games.length} ألعاب مكتملة</p></div><div class="leaderboard">${ranking.map(([n,s],i)=>`<div><span>${i<3?['🥇','🥈','🥉'][i]:''} ${n}</span><b>${s}</b></div>`).join('')||'<div class="muted">لا توجد نقاط.</div>'}</div><div class="actions"><button class="primary" onclick="resetChampionship()">بطولة جديدة</button></div>`;
    return;
  }
  const current=c.games[c.index];const game=GAME_DEFS.find(g=>g.id===current);
  $('champBody').innerHTML=`<div class="champProgress"><b>اللعبة ${c.index+1} من ${c.games.length}</b><span>${Math.round(c.index/c.games.length*100)}%</span></div><div class="champTrack">${c.games.map((id,i)=>{const g=GAME_DEFS.find(x=>x.id===id);return `<div class="champStep ${i<c.index?'done':i===c.index?'current':''}"><span>${g.emoji}</span><small>${g.name}</small></div>`}).join('')}</div><div class="currentChampGame"><span>${game.emoji}</span><div><b>${game.name}</b><small>${game.desc}</small></div></div><button class="primary wide" onclick="launchChampGame()">ابدأ ${game.name}</button><h3>بعد انتهاء اللعبة، مين فاز؟</h3><div class="winnerGrid">${state.names.map((n,i)=>`<button onclick="champAwardByIndex(${i})">🏅 ${n}</button>`).join('')}</div><button class="ghost wide" onclick="champSkip()">تعادل / تخطي بدون نقاط</button><h3>ترتيب البطولة</h3><div class="leaderboard">${ranking.map(([n,s],i)=>`<div><span>${i<3?['🥇','🥈','🥉'][i]:''} ${n}</span><b>${s}</b></div>`).join('')||'<div class="muted">لسا ما في نقاط.</div>'}</div>`;
}
window.launchChampGame=function(){const c=state.session.championship;if(!c||c.complete)return;closeModal('champModal');showScreen(c.games[c.index])};
window.champAwardByIndex=function(i){const name=state.names[i];if(name)window.champAward(name)};
window.champAward=function(name){
  const c=state.session.championship;if(!c||c.complete)return;
  c.scores[name]=(c.scores[name]||0)+3;c.history.push({game:c.games[c.index],winner:name,t:Date.now()});
  addScore(name,3);c.index++;if(c.index>=c.games.length)c.complete=true;persist();beep(880,.12);buzz();renderChampionshipBodyV21();
};
window.champSkip=function(){const c=state.session.championship;if(!c||c.complete)return;c.history.push({game:c.games[c.index],winner:null,t:Date.now()});c.index++;if(c.index>=c.games.length)c.complete=true;persist();renderChampionshipBodyV21()};
window.resetChampionship=function(){state.session.championship=null;persist();window.showChampionship()};

window.showAbout=function(){
  $('aboutBody').innerHTML=`<div class="creatorHero"><div class="creatorMark">YN</div><div><div class="eyebrow">CREATOR</div><h2>يزن عبد الحليم</h2><p>لعبة <b>ليلة التحدي</b> من صنع وتطوير يزن عبد الحليم.</p></div></div><div class="aboutFacts"><div><b>9</b><span>ألعاب جماعية</span></div><div><b>2–10</b><span>لاعبين</span></div><div><b>Offline</b><span>بعد أول تحميل</span></div></div><p class="muted center">مصممة لسهرات الأصحاب والعائلة من هاتف واحد.</p>`;
  $('aboutModal').classList.add('open');
};

renderGameGrid();
renderHomeStats();
