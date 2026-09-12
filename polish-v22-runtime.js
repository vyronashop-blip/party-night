(()=>{
  const installNewNightFix=()=>{
    window.newNight=function(){
      if(!confirm('نبدأ سهرة جديدة؟ سيتم تصفير السهرة الحالية والرجوع للرئيسية.'))return;
      try{window.PartyProBeforeNewNight?.()}catch{}
      try{closeTimer()}catch{}
      state.session=defaultSession();
      try{triviaState={a:0,b:0,current:null,bid:3,revealed:false}}catch{}
      try{if(window.triviaProState){triviaProState.active=false;triviaProState.a=0;triviaProState.b=0;triviaProState.round=0}}catch{}
      try{fakeState={};syncState={};scaleState={};tabooState={};drawState={};bowlState={};bombState={}}catch{}
      const hide=id=>document.getElementById(id)?.classList.add('hidden');
      const show=id=>document.getElementById(id)?.classList.remove('hidden');
      show('triviaSetup');hide('triviaPlay');hide('triviaFinishV24');
      document.querySelector('#triviaPlay .panel.center')?.classList.remove('hidden');
      ['fakePass','fakeDebate','fakeVote','fakeReveal','syncTurn','syncResults','scaleLeader','scaleGuess','scaleReveal','tabooPlay','drawPass','drawTask','drawReveal','bowlPlay','bowlEnd','bombPlay','bombResult','playerPass','playerCard','fiveStage','majorityStage','orderStage','emojiStage','estimateStage','memoryStage','whisperStage','courtStage','pitchStage','forbiddenStage','missionStage','chainStage','whoStage','convStage','bidStage','splitStage','riskStage','trapStage','memStage'].forEach(hide);
      ['taScore','tbScore','tabAScore','tabBScore','bowlAScore','bowlBScore'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent='0'});
      const round=document.getElementById('triviaRoundLabel');if(round)round.textContent='جولة';
      document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));
      try{window.PN_CONTENT_MODE?.apply('all')}catch{}
      try{persist()}catch{}
      try{home()}catch{try{showScreen('home')}catch{}}
      try{renderNames()}catch{}
      try{renderChampBannerV22()}catch{}
      try{renderHomeStats()}catch{}
      toast('✨ بدأت سهرة جديدة من الصفر!');
    };
  };
  const loadScript=(src,attr)=>new Promise((resolve,reject)=>{
    if(document.querySelector(`script[${attr}]`)){resolve();return}
    const s=document.createElement('script');s.src=src;s.setAttribute(attr,'1');s.onload=resolve;s.onerror=reject;document.head.appendChild(s)
  });
  const loadStyle=(href,id)=>{if(document.getElementById(id))return;const l=document.createElement('link');l.id=id;l.rel='stylesheet';l.href=href;document.head.appendChild(l)};
  const loadUpgrades=async()=>{
    try{
      await loadScript('content-hardening-v25.js?v=20260912-hardening1','data-party-hardening-v25');
      await loadScript('content-hardening-fix-v25.js?v=20260912-hardening2','data-party-hardening-fix-v25');
      await loadScript('trivia-v24.js?v=20260912-matchbuilder1','data-party-trivia-v24');
      await loadScript('content-v26.js?v=20260912-world1','data-party-content-v26');
      await loadScript('games-v26.js?v=20260912-world1','data-party-games-v26');
      await loadScript('pro-content-v27.js?v=20260912-pro6','data-party-pro-content-v27');
      await loadScript('trivia-pro-v27.js?v=20260912-pro6','data-party-pro-trivia-v27');
      await loadScript('platform-pro-v27.js?v=20260912-pro6','data-party-pro-platform-v27');
      await loadScript('games-pro-v27.js?v=20260912-pro6','data-party-pro-games-v27');
      await loadScript('pro-fixes-v27.js?v=20260912-pro6','data-party-pro-fixes-v27');
      await loadScript('pro-hotfix-v27.js?v=20260912-pro6','data-party-pro-hotfix-v27');
      await loadScript('gift-v28.js?v=20260912-gift2','data-party-gift-v28');
      await loadScript('final-polish-v28.js?v=20260912-gift2','data-party-final-polish-v28');
      loadStyle('mega-v29.css?v=20260912-mega2','megaV29Style');
      await loadScript('mega-bridge-v29.js?v=20260912-mega2','data-party-mega-bridge-v29');
      await loadScript('mega-content-v29.js?v=20260912-mega2','data-party-mega-v29');
      loadStyle('party-os-v30.css?v=20260912-partyos3','partyOSV30Style');
      await loadScript('party-os-v30.js?v=20260912-partyos3','data-party-os-v30');
      await loadScript('party-os-hotfix-v30.js?v=20260912-partyos3','data-party-os-hotfix-v30');
      loadStyle('party-personalize-v30.css?v=20260912-partyos3','partyPersonalizeV30Style');
      await loadScript('party-personalize-v30.js?v=20260912-partyos3','data-party-personalize-v30');
      await loadScript('platform-foundation-v31.js?v=20260912-foundation2','data-party-foundation-v31');
      await loadScript('content-modes-v31.js?v=20260912-foundation2','data-party-content-modes-v31');
      await loadScript('duel-content-v31.js?v=20260912-duel2','data-party-duel-content-v31');
      loadStyle('duel-v31.css?v=20260912-duel2','duelV31Style');
      await loadScript('duel-games-v31.js?v=20260912-duel2','data-party-duel-games-v31');
      await loadScript('party-director-v31.js?v=20260912-director2','data-party-director-v31');
      await loadScript('foundation-hotfix-v31.js?v=20260912-foundation2','data-party-foundation-hotfix-v31');
      loadStyle('duel-hub-v31.css?v=20260912-duel2','duelHubV31Style');
      await loadScript('duel-hub-v31.js?v=20260912-duel2','data-party-duel-hub-v31');
      await loadScript('remote-v27.js?v=20260912-remote2','data-party-remote-v27');
    }catch(e){console.error('Party Night upgrade failed to load',e)}
  };
  const core=document.createElement('script');
  core.src='polish-v22-runtime-core.js?v=20260912-hotfix1';
  core.onload=async()=>{installNewNightFix();await loadUpgrades()};
  core.onerror=async()=>{console.error('V2.2 core failed to load');installNewNightFix();await loadUpgrades()};
  document.head.appendChild(core);
})();