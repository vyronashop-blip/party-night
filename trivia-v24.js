(()=>{
  'use strict';

  const MODE_DEFS={
    direct:{label:'❓ مباشر',short:'مباشر',source:'direct',desc:'سؤال عادي • 1 نقطة'},
    clues:{label:'🧩 من أنا؟',short:'من أنا؟',source:'clues',desc:'كل تلميح يقلل النقاط'},
    list:{label:'📣 عدّد/مزايدة',short:'عدّد',source:'list',desc:'زايدوا على عدد الإجابات'},
    speed:{label:'⚡ سرعة',short:'سرعة',source:'direct',desc:'12 ثانية • نقطتان قبل الوقت'},
    mcq:{label:'🔘 اختيارات',short:'اختيارات',source:'direct',desc:'4 خيارات من نفس المحتوى'},
    steal:{label:'🎯 سرقة',short:'سرقة',source:'direct',desc:'الفريق الثاني يسرق بنقطتين'},
    double:{label:'🔥 دبل',short:'دبل',source:'direct',desc:'إجابة صحيحة = نقطتان'}
  };

  const css=document.createElement('style');
  css.textContent=`
    .triviaBuilder{margin-top:14px;padding:14px;border:1px solid rgba(255,255,255,.11);border-radius:18px;background:rgba(4,14,45,.34)}
    .triviaBuilderGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
    .triviaBuilderGrid label{display:flex;flex-direction:column;gap:7px;font-size:.82rem;color:#aebce8}
    .triviaBuilderGrid select{width:100%}
    .modeCards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:10px}
    .modeCard{border:1px solid rgba(116,148,235,.38);border-radius:15px;padding:11px;background:rgba(8,27,79,.52);color:#fff;text-align:right;min-height:70px}
    .modeCard b{display:block;font-size:.98rem}.modeCard small{display:block;color:#98a9d6;margin-top:4px;line-height:1.35}
    .modeCard.selected{border-color:#f0c45c;background:linear-gradient(135deg,rgba(40,91,219,.55),rgba(169,16,60,.45));box-shadow:0 0 0 1px rgba(240,196,92,.2) inset}
    .distributionPreview{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}.distributionPreview span{padding:7px 9px;border-radius:999px;background:rgba(255,255,255,.07);font-size:.78rem;color:#cbd5f4}.distributionPreview span strong{color:#f5cf6c}
    .triviaProgressWrap{margin:4px 0 12px}.triviaProgressMeta{display:flex;justify-content:space-between;gap:8px;color:#aebce8;font-size:.8rem;margin-bottom:7px}.triviaProgress{height:7px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden}.triviaProgress>i{display:block;height:100%;width:0;background:linear-gradient(90deg,#2e69ff,#b20f42,#efc75e);transition:width .25s ease}
    .triviaSpecial{margin:12px 0;padding:11px;border-radius:14px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.08)}
    .triviaSpecial strong{color:#f2ce72}.triviaModeTimer{font-size:1.55rem;font-weight:900;color:#f2ce72;margin:8px 0}.triviaModeTimer.expired{color:#ff607d}
    .mcqGrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.mcqChoice{padding:12px 9px;border-radius:13px;border:1px solid rgba(124,150,230,.35);background:rgba(9,28,81,.62);color:#fff}.mcqChoice.selected{outline:2px solid #f2ce72}.mcqChoice.correct{background:rgba(27,132,83,.42);border-color:#54d394}.mcqChoice.wrong{background:rgba(167,31,68,.42);border-color:#ff6887}
    .triviaTools{display:flex;gap:8px;flex-wrap:wrap;margin-top:9px}.triviaTools button{font-size:.83rem;padding:9px 12px}
    .triviaFinish{margin-top:14px;text-align:center}.triviaFinish .finishCup{font-size:4rem}.triviaFinish .finishScore{display:flex;justify-content:center;gap:14px;margin:14px 0}.triviaFinish .finishScore div{min-width:110px;padding:13px;border-radius:16px;background:rgba(255,255,255,.06)}.triviaFinish .finishScore b{display:block;font-size:2rem;color:#f2ce72}
    @media(max-width:520px){.triviaBuilderGrid,.modeCards,.mcqGrid{grid-template-columns:1fr 1fr}.modeCard{padding:9px;min-height:66px}.modeCard small{font-size:.72rem}}
  `;
  document.head.appendChild(css);

  const qAnswer=q=>Array.isArray(q?.a)?q.a.join(' • '):String(q?.a??'');
  const scoreName=t=>$(t==='a'?'teamA':'teamB')?.value||`الفريق ${t.toUpperCase()}`;
  const scoreEl=t=>$(t==='a'?'taScore':'tbScore');
  const otherTeam=t=>t==='a'?'b':'a';

  function installBuilder(){
    const modes=$('triviaModes');
    if(!modes)return;
    modes.className='modeCards';
    modes.innerHTML=Object.entries(MODE_DEFS).map(([id,m])=>`<button type="button" class="modeCard ${['direct','clues','list'].includes(id)?'selected':''}" data-mode="${id}" onclick="toggleTriviaModeV24(this)"><b>${m.label}</b><small>${m.desc}</small></button>`).join('');

    const host=modes.closest('.panel');
    if(host&&!$('triviaBuilderV24')){
      const box=document.createElement('div');
      box.id='triviaBuilderV24';box.className='triviaBuilder';
      box.innerHTML=`<div class="sectionHead"><div><h3>⚙️ إعداد المباراة</h3><div class="tiny">الجولات المختارة تتوزع بالتساوي قدر الإمكان.</div></div></div>
        <div class="triviaBuilderGrid">
          <label>عدد الأسئلة<select id="triviaQuestionCount" onchange="updateTriviaDistributionV24()"><option value="10">10 • سريعة</option><option value="12">12</option><option value="15">15</option><option value="20" selected>20 • عادية</option><option value="24">24</option><option value="30">30 • طويلة</option><option value="40">40 • سهرة كاملة</option><option value="0">حتى يصل فريق لهدف النقاط</option></select></label>
          <label>وقت السؤال<select id="triviaRoundTime"><option value="0" selected>بدون مؤقت</option><option value="15">15 ثانية</option><option value="20">20 ثانية</option><option value="30">30 ثانية</option><option value="45">45 ثانية</option></select></label>
        </div>
        <div id="triviaDistributionV24" class="distributionPreview"></div><div class="tiny" style="margin-top:9px">إذا اخترت عدد أسئلة محدد، يفوز صاحب أعلى نقاط بعد آخر سؤال. خيار «حتى يصل فريق» يستخدم هدف النقاط الموجود فوق.</div>`;
      const start=host.querySelector('button[onclick="startTrivia()"]');
      host.insertBefore(box,start);
    }
    updateDistribution();
  }

  window.toggleTriviaModeV24=function(btn){btn.classList.toggle('selected');updateDistribution()};
  function selectedModes(){return $$('#triviaModes .modeCard.selected').map(x=>x.dataset.mode)}
  function balancedSchedule(modes,total){
    if(!total)return [];
    const out=[];
    while(out.length<total){
      let cycle=shuffle(modes);
      if(out.length&&cycle.length>1&&cycle[0]===out[out.length-1]){const i=cycle.findIndex(x=>x!==out[out.length-1]);if(i>0)[cycle[0],cycle[i]]=[cycle[i],cycle[0]]}
      out.push(...cycle.slice(0,total-out.length));
    }
    return out;
  }
  function distributionFor(modes,total){const d=Object.fromEntries(modes.map(m=>[m,0]));if(!total)return d;balancedSchedule(modes,total).forEach(m=>d[m]++);return d}
  function updateDistribution(){
    const el=$('triviaDistributionV24');if(!el)return;
    const modes=selectedModes();const total=+$('triviaQuestionCount')?.value||0;
    if(!modes.length){el.innerHTML='<span>اختار نوع جولة واحد على الأقل</span>';return}
    if(!total){el.innerHTML=`<span>♾️ تدوير متوازن بين <strong>${modes.length}</strong> أنواع حتى الوصول لهدف النقاط</span>`;return}
    const d=distributionFor(modes,total);
    el.innerHTML=Object.entries(d).map(([m,n])=>`<span>${MODE_DEFS[m].short}: <strong>${n}</strong></span>`).join('')+`<span>المجموع: <strong>${total}</strong></span>`;
  }
  window.updateTriviaDistributionV24=updateDistribution;

  function ensurePlayExtras(){
    const play=$('triviaPlay');if(!play)return;
    const panel=play.querySelector('.panel.center');
    if(panel&&!$('triviaProgressWrapV24')){
      const p=document.createElement('div');p.id='triviaProgressWrapV24';p.className='triviaProgressWrap';
      p.innerHTML='<div class="triviaProgressMeta"><span id="triviaProgressText">جاهزين؟</span><span id="triviaProgressMode"></span></div><div class="triviaProgress"><i id="triviaProgressBar"></i></div>';
      panel.prepend(p);
      const special=document.createElement('div');special.id='triviaSpecialV24';special.className='triviaSpecial hidden';$('triviaQ').after(special);
      const tools=document.createElement('div');tools.className='triviaTools';tools.innerHTML='<button class="ghost" onclick="replaceTriviaQuestionV24()">🔄 بدّل بدون احتساب</button><button class="ghost" onclick="undoTriviaAwardV24()">↶ تراجع نقطة</button>';panel.appendChild(tools);
    }
    if(!$('triviaFinishV24')){const f=document.createElement('div');f.id='triviaFinishV24';f.className='panel triviaFinish hidden';play.appendChild(f)}
  }

  function compatiblePool(mode){const def=MODE_DEFS[mode];return PARTY_CONTENT.trivia.filter(q=>triviaState.packs.includes(q.pack)&&q.type===def.source&&(triviaState.diff==='all'||q.difficulty===triviaState.diff)&&(mode!=='mcq'||!Array.isArray(q.a)))}
  function pickForMode(mode){
    const pool=compatiblePool(mode);if(!pool.length)return null;
    const globalUsed=new Set(state.session.used?.trivia||[]);
    let candidates=pool.filter(q=>!triviaState.matchUsed.has(q.id)&&!globalUsed.has(q.id));
    if(!candidates.length)candidates=pool.filter(q=>!triviaState.matchUsed.has(q.id));
    if(!candidates.length)candidates=pool;
    const q=pick(candidates);triviaState.matchUsed.add(q.id);sessionUse('trivia',q.id);return q;
  }
  function nextMode(){
    if(triviaState.limit)return triviaState.schedule[triviaState.round]||triviaState.modes[triviaState.round%triviaState.modes.length];
    if(!triviaState.cycle?.length)triviaState.cycle=shuffle(triviaState.modes);
    return triviaState.cycle.shift();
  }
  function labelDifficulty(d){return {easy:'سهل',medium:'متوسط',hard:'صعب',expert:'محنكين'}[d]||d}
  function setProgress(mode){
    const fixed=triviaState.limit>0;
    $('triviaRoundLabel').textContent=fixed?`سؤال ${triviaState.round}/${triviaState.limit}`:`جولة ${triviaState.round}`;
    $('triviaProgressText').textContent=fixed?`السؤال ${triviaState.round} من ${triviaState.limit}`:`الجولة ${triviaState.round} • حتى ${triviaState.target} نقطة`;
    $('triviaProgressMode').textContent=MODE_DEFS[mode]?.label||mode;
    $('triviaProgressBar').style.width=fixed?`${Math.min(100,triviaState.round/triviaState.limit*100)}%`:`${Math.min(100,Math.max(triviaState.a,triviaState.b)/triviaState.target*100)}%`;
  }
  function genericTimer(seconds){
    const sp=$('triviaSpecialV24');sp.classList.remove('hidden');sp.insertAdjacentHTML('beforeend',`<div style="margin-top:8px">⏱️ وقت السؤال</div><div id="triviaModeTimerV24" class="triviaModeTimer">${seconds}</div>`);
    countdown($('triviaModeTimerV24'),seconds,()=>{const e=$('triviaModeTimerV24');if(e){e.textContent='انتهى';e.classList.add('expired')}toast('⏱ انتهى الوقت')});
  }
  function renderSpecial(mode,q){
    closeTimer();triviaState.hintsUsed=0;triviaState.speedExpired=false;triviaState.selectedChoice=null;
    const sp=$('triviaSpecialV24');sp.classList.add('hidden');sp.innerHTML='';$('triviaHints').innerHTML='';$('triviaBidBox').classList.toggle('hidden',mode!=='list');if(mode==='list')$('triviaBid').textContent=triviaState.bid;
    if(mode==='clues'){
      (q.hints||[]).forEach((h,i)=>{const b=document.createElement('button');b.className='ghost wide';b.textContent=`كشف التلميح ${i+1}`;b.onclick=()=>{triviaState.hintsUsed++;b.outerHTML=`<div class="hint">${i+1}. ${h}</div>`};$('triviaHints').appendChild(b)});
    }else if(mode==='mcq'){
      const correct=qAnswer(q);let pool=PARTY_CONTENT.trivia.filter(x=>x.type==='direct'&&!Array.isArray(x.a)&&x.id!==q.id&&x.pack===q.pack&&x.difficulty===q.difficulty);
      if(pool.length<3)pool=PARTY_CONTENT.trivia.filter(x=>x.type==='direct'&&!Array.isArray(x.a)&&x.id!==q.id&&x.pack===q.pack);
      if(pool.length<3)pool=PARTY_CONTENT.trivia.filter(x=>x.type==='direct'&&!Array.isArray(x.a)&&x.id!==q.id&&triviaState.packs.includes(x.pack));
      let wrong=shuffle([...new Set(pool.map(qAnswer).filter(a=>a&&a!==correct))]).slice(0,3);while(wrong.length<3)wrong.push(['لا شيء مما سبق','جميع ما سبق','غير معروف'][wrong.length]);
      const choices=shuffle([correct,...wrong]);$('triviaHints').innerHTML=`<div class="mcqGrid">${choices.map(c=>`<button class="mcqChoice" data-value="${String(c).replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" onclick="selectTriviaChoiceV24(this)">${c}</button>`).join('')}</div>`;
    }else if(mode==='speed'){
      sp.classList.remove('hidden');sp.innerHTML='<div>⚡ بونص السرعة: جاوبوا قبل انتهاء الوقت لتحصلوا على <strong>نقطتين</strong></div><div id="triviaModeTimerV24" class="triviaModeTimer">12</div>';
      countdown($('triviaModeTimerV24'),12,()=>{triviaState.speedExpired=true;const e=$('triviaModeTimerV24');if(e){e.textContent='انتهى البونص';e.classList.add('expired')}toast('⚡ انتهى بونص السرعة — الإجابة الصحيحة بنقطة')});
    }else if(mode==='steal'){
      triviaState.starter=triviaState.round%2?'a':'b';sp.classList.remove('hidden');sp.innerHTML=`🎯 يبدأ <strong>${scoreName(triviaState.starter)}</strong>. إذا أخطأ، ${scoreName(otherTeam(triviaState.starter))} يقدر يسرق السؤال مقابل <strong>نقطتين</strong>.`;
    }else if(mode==='double'){
      sp.classList.remove('hidden');sp.innerHTML='🔥 جولة دبل: الإجابة الصحيحة تساوي <strong>نقطتين</strong>.';
    }
    const normalTime=+$('triviaRoundTime')?.value||0;if(normalTime&&mode!=='speed')genericTimer(normalTime);
  }
  window.selectTriviaChoiceV24=function(btn){$$('.mcqChoice').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');triviaState.selectedChoice=btn.dataset.value;buzz()};

  function loadQuestion(mode,{replace=false}={}){
    let q=pickForMode(mode);
    if(!q){const fallback=triviaState.modes.find(m=>compatiblePool(m).length);if(!fallback){toast('ما في أسئلة كافية لهالفلتر — وسّع الاختيارات');return false}mode=fallback;q=pickForMode(mode)}
    triviaState.mode=mode;triviaState.current=q;triviaState.revealed=false;triviaState.bid=q.min||3;if(!replace)triviaState.round++;
    setProgress(mode);$('triviaPack').textContent=PARTY_CONTENT.triviaPacks.find(p=>p.id===q.pack)?.name||q.pack;$('triviaDiff').textContent=labelDifficulty(q.difficulty);$('triviaMode').textContent=MODE_DEFS[mode]?.short||mode;$('triviaQ').textContent=q.q;$('triviaA').classList.add('hidden');$('triviaA').innerHTML=qAnswer(q);renderSpecial(mode,q);if(!replace)record('trivia',{pack:q.pack,type:mode,source:q.type});return true;
  }

  window.startTrivia=function(){
    const packs=selectedPacks('triviaPacks');if(!packs.length){toast('اختار باك واحد على الأقل');return}
    const modes=selectedModes();if(!modes.length){toast('اختار نوع جولة واحد على الأقل');return}
    const limit=+$('triviaQuestionCount')?.value||0;
    const invalid=modes.filter(m=>!PARTY_CONTENT.trivia.some(q=>packs.includes(q.pack)&&q.type===MODE_DEFS[m].source&&($('triviaDifficulty').value==='all'||q.difficulty===$('triviaDifficulty').value)&&(m!=='mcq'||!Array.isArray(q.a))));
    if(invalid.length){toast(`ما في محتوى كافي لـ: ${invalid.map(m=>MODE_DEFS[m].short).join('، ')} — وسّع الباكات أو الصعوبة`);return}
    triviaState={a:0,b:0,current:null,bid:3,revealed:false,packs,modes,diff:$('triviaDifficulty').value,target:+$('triviaTarget').value,round:0,limit,schedule:balancedSchedule(modes,limit),cycle:[],matchUsed:new Set(),lastAward:null,modeCounts:{},hintsUsed:0,speedExpired:false};
    $('taName').textContent=$('teamA').value;$('tbName').textContent=$('teamB').value;$('taScore').textContent=0;$('tbScore').textContent=0;$('triviaSetup').classList.add('hidden');$('triviaPlay').classList.remove('hidden');ensurePlayExtras();$('triviaFinishV24').classList.add('hidden');$('triviaPlay').querySelector('.panel.center')?.classList.remove('hidden');window.nextTrivia();
  };
  window.nextTrivia=function(){if(triviaState.limit&&triviaState.current&&triviaState.round>=triviaState.limit){finishTriviaV24();return}const mode=nextMode();if(mode)loadQuestion(mode)};
  window.replaceTriviaQuestionV24=function(){if(!triviaState.current)return;loadQuestion(triviaState.mode,{replace:true});toast('🔄 تبدّل السؤال بدون احتساب')};
  window.changeBid=function(n){triviaState.bid=clamp(triviaState.bid+n,1,20);$('triviaBid').textContent=triviaState.bid};
  window.toggleTriviaAnswer=function(){
    const hidden=$('triviaA').classList.contains('hidden');$('triviaA').classList.toggle('hidden');triviaState.revealed=hidden;
    if(hidden){closeTimer();if(triviaState.mode==='mcq'){$$('.mcqChoice').forEach(b=>{if(norm(b.dataset.value)===norm(qAnswer(triviaState.current)))b.classList.add('correct');else if(b.classList.contains('selected'))b.classList.add('wrong')})}beep()}
  };
  function pointsFor(team){switch(triviaState.mode){case 'list':return Math.max(1,Math.ceil(triviaState.bid/3));case 'clues':return Math.max(1,4-(triviaState.hintsUsed||0));case 'speed':return triviaState.speedExpired?1:2;case 'steal':return team===triviaState.starter?1:2;case 'double':return 2;default:return 1}}
  window.awardTrivia=function(team){
    if(!triviaState.current)return;closeTimer();const pts=pointsFor(team);triviaState[team]+=pts;scoreEl(team).textContent=triviaState[team];const teamName=scoreName(team);addScore(teamName,pts);triviaState.lastAward={team,pts,name:teamName};triviaState.modeCounts[triviaState.mode]=(triviaState.modeCounts[triviaState.mode]||0)+1;beep(800);buzz();toast(`+${pts} لـ ${teamName}`);
    if(!triviaState.limit&&triviaState[team]>=triviaState.target){setTimeout(finishTriviaV24,180);return}if(triviaState.limit&&triviaState.round>=triviaState.limit){setTimeout(finishTriviaV24,180);return}setTimeout(()=>window.nextTrivia(),180);
  };
  window.undoTriviaAwardV24=function(){const x=triviaState.lastAward;if(!x){toast('ما في نقطة أخيرة للتراجع');return}triviaState[x.team]=Math.max(0,triviaState[x.team]-x.pts);scoreEl(x.team).textContent=triviaState[x.team];if(state.session.scores[x.name]!=null){state.session.scores[x.name]=Math.max(0,state.session.scores[x.name]-x.pts);persist()}triviaState.lastAward=null;toast('↶ تم التراجع عن آخر نقطة')};

  window.finishTriviaV24=function(){
    closeTimer();ensurePlayExtras();const a=triviaState.a,b=triviaState.b;const an=scoreName('a'),bn=scoreName('b');const winner=a===b?null:(a>b?an:bn);const counts=triviaState.limit?distributionFor(triviaState.modes,triviaState.limit):triviaState.modeCounts;$('triviaPlay').querySelector('.panel.center')?.classList.add('hidden');const f=$('triviaFinishV24');f.classList.remove('hidden');
    f.innerHTML=`<div class="finishCup">${winner?'🏆':'🤝'}</div><h2>${winner?`${winner} فاز بالمباراة!`:'تعادل!'}</h2><div class="finishScore"><div>${an}<b>${a}</b></div><div>${bn}<b>${b}</b></div></div><div class="distributionPreview">${Object.entries(counts||{}).filter(([,n])=>n).map(([m,n])=>`<span>${MODE_DEFS[m]?.short||m}: <strong>${n}</strong></span>`).join('')}</div><div class="actions wrap">${winner?'':`<button class="gold" onclick="startTriviaTiebreakV24()">⚡ سؤال فاصل</button>`}<button class="primary" onclick="startTrivia()">🔁 إعادة بنفس الإعدادات</button><button class="gold" onclick="editTriviaMatchV24()">⚙️ تعديل المباراة</button><button class="ghost" onclick="home()">الرئيسية</button></div>`;if(winner){beep(920,.18);buzz([70,50,100])}
  };
  window.startTriviaTiebreakV24=function(){closeTimer();$('triviaFinishV24').classList.add('hidden');$('triviaPlay').querySelector('.panel.center')?.classList.remove('hidden');const mode=pick(triviaState.modes);triviaState.limit=triviaState.round+1;triviaState.schedule[triviaState.round]=mode;window.nextTrivia()};
  window.editTriviaMatchV24=function(){closeTimer();$('triviaPlay').classList.add('hidden');$('triviaSetup').classList.remove('hidden');$('triviaFinishV24')?.classList.add('hidden');$('triviaPlay')?.querySelector('.panel.center')?.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'})};

  try{HELP.trivia.steps=['اختار الباكات والصعوبة وعدد الأسئلة.','اختار أي مزيج من الجولات: مباشر، من أنا، مزايدة، سرعة، اختيارات، سرقة أو دبل.','اللعبة توزّع عدد الأسئلة بالتساوي قدر الإمكان بين الجولات المختارة.','الحكم يمنح النقاط، ويقدر يبدّل سؤال بدون احتسابه أو يتراجع عن آخر نقطة.'];HELP.trivia.tip='20 سؤال مع 4 أنواع جولات = 5 أسئلة لكل نوع بالضبط.'}catch{}
  installBuilder();ensurePlayExtras();window.addEventListener('pageshow',()=>{installBuilder();ensurePlayExtras();updateDistribution()});
})();