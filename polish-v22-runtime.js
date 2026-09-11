(()=>{
  const installNewNightFix=()=>{
    window.newNight=function(){
      if(!confirm('نبدأ سهرة جديدة؟ سيتم تصفير السهرة الحالية والرجوع للرئيسية.'))return;
      try{closeTimer()}catch{}
      state.session=defaultSession();
      try{triviaState={a:0,b:0,current:null,bid:3,revealed:false}}catch{}
      try{fakeState={};syncState={};scaleState={};tabooState={};drawState={};bowlState={};bombState={}}catch{}
      const hide=id=>document.getElementById(id)?.classList.add('hidden');
      const show=id=>document.getElementById(id)?.classList.remove('hidden');
      show('triviaSetup');hide('triviaPlay');hide('triviaFinishV24');
      document.querySelector('#triviaPlay .panel.center')?.classList.remove('hidden');
      ['fakePass','fakeDebate','fakeVote','fakeReveal','syncTurn','syncResults','scaleLeader','scaleGuess','scaleReveal','tabooPlay','drawPass','drawTask','drawReveal','bowlPlay','bowlEnd','bombPlay','bombResult','playerPass','playerCard'].forEach(hide);
      ['taScore','tbScore','tabAScore','tabBScore','bowlAScore','bowlBScore'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent='0'});
      const round=document.getElementById('triviaRoundLabel');if(round)round.textContent='جولة';
      document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));
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
  const loadTriviaUpgrade=async()=>{
    try{
      await loadScript('content-hardening-v25.js?v=20260912-hardening1','data-party-hardening-v25');
      await loadScript('content-hardening-fix-v25.js?v=20260912-hardening2','data-party-hardening-fix-v25');
      await loadScript('trivia-v24.js?v=20260912-matchbuilder1','data-party-trivia-v24');
    }catch(e){console.error('Trivia upgrade failed to load',e)}
  };
  const core=document.createElement('script');
  core.src='polish-v22-runtime-core.js?v=20260912-hotfix1';
  core.onload=()=>{installNewNightFix();loadTriviaUpgrade()};
  core.onerror=()=>{console.error('V2.2 core failed to load');installNewNightFix();loadTriviaUpgrade()};
  document.head.appendChild(core);
})();
