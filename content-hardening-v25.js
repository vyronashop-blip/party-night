(()=>{
  'use strict';
  const pc=PARTY_CONTENT;
  if(!pc?.trivia)return;

  // 1) Legacy/basic bank is intentionally "easy" only. The old build guessed
  // difficulty from question length, which let obvious questions leak into medium.
  pc.trivia.forEach(q=>{
    if(String(q.id||'').startsWith('legacy-')){q.difficulty='easy';q.quality='basic'}
  });

  // 2) Reclassify a few cards that were too generous for "medium".
  const setDiff=(ids,d)=>ids.forEach(id=>{const q=pc.trivia.find(x=>x.id===id);if(q)q.difficulty=d});
  setDiff(['barca-03','barca-04','ucl-04','wc-03','pl-03','pl-04','rm-03','bpep-04','bhis-04','gen23-02','gen23-03','y2k-03'],'easy');

  // 3) Add a tougher, stable football bank. All facts are historical/evergreen.
  const add=(id,pack,difficulty,type,q,a,extra={})=>{
    if(!pc.trivia.some(x=>x.id===id))pc.trivia.push({id,pack,difficulty,type,q,a,quality:'curated',...extra});
  };

  // Barcelona — medium/hard/expert
  add('hq-bar-01','barca','medium','direct','من صنع هدفي برشلونة في نهائي دوري الأبطال 2006 أمام أرسنال بعد دخوله بديلًا؟','هنريك لارسون');
  add('hq-bar-02','barca','hard','direct','أي لاعب بدأ نهائي دوري الأبطال 2009 كقلب دفاع بجانب جيرارد بيكيه رغم أن مركزه الأساسي كان وسطًا؟','يايا توريه');
  add('hq-bar-03','barca','hard','direct','من لعب ظهيرًا أيسر لبرشلونة في نهائي دوري الأبطال 2009؟','سيلفينيو');
  add('hq-bar-04','barca','medium','direct','من سجل هدف برشلونة الأول في نهائي دوري الأبطال 2015 أمام يوفنتوس؟','إيفان راكيتيتش');
  add('hq-bar-05','barca','hard','direct','من صنع هدف راكيتيتش في نهائي دوري الأبطال 2015؟','أندريس إنييستا');
  add('hq-bar-06','barca','medium','direct','من سجل هدف يوفنتوس الوحيد في نهائي دوري الأبطال 2015 أمام برشلونة؟','ألفارو موراتا');
  add('hq-bar-07','barca','hard','direct','من سجل هدف التأهل المتأخر لبرشلونة أمام تشيلسي في إياب نصف نهائي دوري الأبطال 2009؟','أندريس إنييستا');
  add('hq-bar-08','barca','expert','direct','أي ظهيرين كانا موقوفين عن برشلونة في نهائي دوري الأبطال 2009؟','داني ألفيش وإريك أبيدال');
  add('hq-bar-09','barca','hard','clues','من أنا؟ شاركت أساسيًا في نهائي ويمبلي 2011 كقلب دفاع رغم أنني لعبت كثيرًا كلاعب وسط دفاعي.','خافيير ماسكيرانو',{hints:['أرجنتيني','لعبت سابقًا لليفربول','بدأت نهائي 2011 بجانب بيكيه']});
  add('hq-bar-10','barca','expert','list','اذكر لاعبي خط الدفاع الأربعة الذين بدأوا نهائي دوري الأبطال 2011 مع برشلونة.',['داني ألفيش','جيرارد بيكيه','خافيير ماسكيرانو','إريك أبيدال'],{min:4});
  add('hq-bar-11','barca-pep','hard','direct','من سجل هدفي برشلونة في الفوز 2-0 على ريال مدريد في ذهاب نصف نهائي دوري الأبطال 2011؟','ليونيل ميسي');
  add('hq-bar-12','barca-pep','expert','direct','من كان الظهير الأيسر الأساسي لبرشلونة في نهائي دوري الأبطال 2011 بعد عودته من جراحة في الكبد؟','إريك أبيدال');
  add('hq-bar-13','barca-history','hard','direct','من سجل هدف أرسنال في نهائي دوري الأبطال 2006 قبل عودة برشلونة؟','سول كامبل');
  add('hq-bar-14','barca-history','expert','list','اذكر البدلاء الثلاثة الذين أشركهم فرانك ريكارد مع برشلونة في نهائي دوري الأبطال 2006.',['أندريس إنييستا','هنريك لارسون','جوليانو بيليتي'],{min:3});
  add('hq-bar-15','barca-expert','expert','direct','من كان المدافع البرازيلي الذي سجل هدف الفوز في نهائي دوري الأبطال 2006 لبرشلونة؟','جوليانو بيليتي');

  // Champions League
  add('hq-ucl-01','ucl','medium','direct','من سجل هدفي مانشستر يونايتد في الوقت بدل الضائع بنهائي دوري الأبطال 1999؟','تيدي شيرينغهام وأولي غونار سولشاير');
  add('hq-ucl-02','ucl','hard','direct','من سجل الهدف الأول لبورتو في نهائي دوري الأبطال 2004 أمام موناكو؟','كارلوس ألبرتو');
  add('hq-ucl-03','ucl','hard','direct','أي حارس تصدى لركلة نيكولا أنيلكا الحاسمة في نهائي دوري الأبطال 2008؟','إدوين فان دير سار');
  add('hq-ucl-04','ucl','medium','direct','من سجل هدفي إنتر في نهائي دوري الأبطال 2010 أمام بايرن ميونخ؟','دييغو ميليتو');
  add('hq-ucl-05','ucl','hard','direct','من سجل هدف التعادل ثم ركلة الترجيح الحاسمة لتشيلسي في نهائي دوري الأبطال 2012؟','ديدييه دروغبا');
  add('hq-ucl-06','ucl','hard','direct','من سجل هدف ليفربول الوحيد في نهائي دوري الأبطال 2018؟','ساديو ماني');
  add('hq-ucl-07','ucl','medium','direct','من سجل هدف نهائي دوري الأبطال 2020 الوحيد بين بايرن ميونخ وباريس سان جيرمان؟','كينغسلي كومان');
  add('hq-ucl-08','ucl','medium','direct','من سجل هدف نهائي دوري الأبطال 2021 الوحيد لتشيلسي أمام مانشستر سيتي؟','كاي هافرتز');
  add('hq-ucl-09','ucl','hard','direct','من سجل هدف ريال مدريد الوحيد في نهائي دوري الأبطال 2022 أمام ليفربول؟','فينيسيوس جونيور');
  add('hq-ucl-10','ucl','hard','list','اذكر هدافي نهائي دوري الأبطال 2024 بين ريال مدريد وبوروسيا دورتموند.',['داني كارفاخال','فينيسيوس جونيور'],{min:2});
  add('hq-ucl-11','ucl','expert','clues','من أنا؟ فزت بدوري الأبطال مع أياكس وريال مدريد وميلان، وأنا لاعب وسط هولندي.','كلارنس سيدورف',{hints:['هولندي','فزت مع ثلاثة أندية مختلفة','لعبت سنوات طويلة في ميلان']});
  add('hq-ucl-12','ucl','expert','list','اذكر هدافي نهائي دوري الأبطال 2015 كاملين.',['إيفان راكيتيتش','ألفارو موراتا','لويس سواريز','نيمار'],{min:4});

  // World Cup
  add('hq-wc-01','world-cup','hard','direct','من صنع هدف ماريو غوتزه الحاسم في نهائي كأس العالم 2014؟','أندري شورله');
  add('hq-wc-02','world-cup','hard','direct','من سجل هدف إيطاليا في الوقت الأصلي بنهائي كأس العالم 2006؟','ماركو ماتيراتزي');
  add('hq-wc-03','world-cup','hard','list','اذكر هدافي فرنسا في نهائي كأس العالم 1998 أمام البرازيل.',['زين الدين زيدان','إيمانويل بيتي'],{min:2});
  add('hq-wc-04','world-cup','medium','direct','من سجل هدفي البرازيل في نهائي كأس العالم 2002 أمام ألمانيا؟','رونالدو نازاريو');
  add('hq-wc-05','world-cup','expert','direct','من سجل أسرع هدف في تاريخ كأس العالم، بعد نحو 11 ثانية في نسخة 2002؟','هاكان شوكور');
  add('hq-wc-06','world-cup','hard','direct','من كان صاحب الهاتريك في نهائي كأس العالم 1966 قبل أن يكرر مبابي الإنجاز في 2022؟','جيف هيرست');
  add('hq-wc-07','world-cup','hard','list','اذكر هدافي الأرجنتين في الوقت الأصلي والإضافي بنهائي كأس العالم 2022.',['ليونيل ميسي','أنخيل دي ماريا'],{min:2});
  add('hq-wc-08','world-cup','expert','direct','أي لاعب أضاع الركلة الإيطالية الأخيرة الشهيرة في نهائي كأس العالم 1994؟','روبرتو باجيو');

  // Football experts / Premier / Madrid
  add('hq-fx-01','football-expert','hard','direct','من هو الحارس الوحيد الذي فاز بالكرة الذهبية للرجال؟','ليف ياشين');
  add('hq-fx-02','football-expert','expert','direct','في أي عام فاز ليف ياشين بالكرة الذهبية؟','1963');
  add('hq-fx-03','football-expert','hard','direct','أي نادٍ إنجليزي حقق الثلاثية التاريخية الدوري والكأس ودوري الأبطال عام 1999؟','مانشستر يونايتد');
  add('hq-fx-04','football-expert','expert','direct','من اللاعب الوحيد الذي فاز بدوري الأبطال مع ثلاثة أندية مختلفة: أياكس وريال مدريد وميلان؟','كلارنس سيدورف');
  add('hq-pl-01','premier','hard','direct','كم نقطة جمع مانشستر سيتي في موسم الدوري الإنجليزي 2017-18 عندما أصبح أول فريق يصل إلى 100 نقطة؟','100');
  add('hq-pl-02','premier','hard','direct','أمام أي فريق سجل سيرخيو أغويرو هدف 93:20 الذي حسم لقب الدوري الإنجليزي 2012؟','كوينز بارك رينجرز');
  add('hq-pl-03','premier','expert','direct','كم تعادل حقق أرسنال في موسم اللاهزيمة 2003-04؟','12');
  add('hq-rm-01','madrid','hard','direct','من سجل هدف ريال مدريد الوحيد في نهائي دوري الأبطال 1998 أمام يوفنتوس؟','بيدجا مياتوفيتش');
  add('hq-rm-02','madrid','expert','direct','من سجل هدف ريال مدريد الثالث في نهائي دوري الأبطال 2014 بعد تقدم راموس بالهدف الثاني؟','مارسيلو');

  // Non-football medium/hard so mixed nights also feel like a challenge.
  add('hq-gen-01','general','medium','direct','ما العنصر الكيميائي الذي يحمل العدد الذري 79؟','الذهب');
  add('hq-gen-02','general','hard','direct','ما اسم أعمق خندق محيطي معروف على الأرض؟','خندق ماريانا');
  add('hq-geo-01','geography','medium','direct','ما الدولة الوحيدة التي يمر بها كل من خط الاستواء وخط غرينتش؟','لا توجد دولة؛ يتقاطعان في خليج غينيا');
  add('hq-geo-02','geography','hard','direct','ما عاصمة كازاخستان الحالية؟','أستانا');
  add('hq-sci-01','science','medium','direct','ما الرمز الكيميائي لعنصر التنغستن؟','W');
  add('hq-sci-02','science','hard','direct','أي كوكب يملك أقصر يوم في المجموعة الشمسية تقريبًا؟','المشتري');

  // Preset difficulty defaults — no more accidental "all" for football nights.
  try{
    if(PARTY_PRESETS?.football)PARTY_PRESETS.football.diff='medium';
    if(PARTY_PRESETS?.experts)PARTY_PRESETS.experts.diff='expert';
    if(PARTY_PRESETS?.quick)PARTY_PRESETS.quick.diff='medium';
    if(PARTY_PRESETS?.cule)PARTY_PRESETS.cule.diff='hard';
  }catch{}

  // Default selector now starts at medium. Easy/basic content remains available deliberately.
  const tuneDifficulty=()=>{
    const s=document.getElementById('triviaDifficulty');if(!s)return;
    const old=s.value;
    s.innerHTML='<option value="medium">متوسط • بدون البديهيات</option><option value="hard">صعب</option><option value="expert">محنكين 🔥</option><option value="easy">سهل / عائلي</option><option value="all">كل المستويات</option>';
    const preset=(typeof currentPresetV21==='function'&&currentPresetV21())||null;
    if(preset?.diff&&['easy','medium','hard','expert','all'].includes(preset.diff))s.value=preset.diff;
    else if(['medium','hard','expert','easy'].includes(old))s.value=old;
    else s.value='medium';
    if(!document.getElementById('difficultyNoteV25')){
      const note=document.createElement('div');note.id='difficultyNoteV25';note.className='tiny';note.style.marginTop='6px';note.textContent='💡 المستوى المتوسط وما فوق لا يسحب أسئلة البنك البديهي القديم.';s.parentElement?.appendChild(note)
    }
  };
  tuneDifficulty();
  window.addEventListener('pageshow',tuneDifficulty);
})();
