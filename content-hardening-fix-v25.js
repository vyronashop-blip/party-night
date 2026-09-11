(()=>{
  'use strict';
  const pc=PARTY_CONTENT;if(!pc?.trivia)return;
  const find=id=>pc.trivia.find(x=>x.id===id);
  const rm=find('hq-rm-02');if(rm)rm.q='من سجل الهدف الثالث لريال مدريد في نهائي دوري الأبطال 2014 أمام أتلتيكو مدريد؟';
  const geo=find('hq-geo-01');if(geo){geo.q='في أي مسطح مائي يتقاطع خط الاستواء مع خط غرينتش؟';geo.a='خليج غينيا'}
  const add=(id,pack,difficulty,type,q,a,extra={})=>{if(!pc.trivia.some(x=>x.id===id))pc.trivia.push({id,pack,difficulty,type,q,a,quality:'curated',...extra})};
  // Medium list/clue coverage so the default level works with varied round types.
  add('hq-med-list-barca','barca','medium','list','اذكر هدافي برشلونة الثلاثة في نهائي دوري الأبطال 2015.',['إيفان راكيتيتش','لويس سواريز','نيمار'],{min:3});
  add('hq-med-list-ucl','ucl','medium','list','اذكر ثلاثة لاعبين سجلوا في نهائي دوري الأبطال 2011.',['بيدرو','واين روني','ليونيل ميسي','دافيد فيا'],{min:3});
  add('hq-med-list-wc','world-cup','medium','list','اذكر أبطال كأس العالم في نسخ 2006 و2010 و2014 و2018.',['إيطاليا','إسبانيا','ألمانيا','فرنسا'],{min:4});
  add('hq-med-list-rm','madrid','medium','list','اذكر ثلاثة من هدافي ريال مدريد في نهائي دوري الأبطال 2014.',['سيرخيو راموس','غاريث بيل','مارسيلو','كريستيانو رونالدو'],{min:3});
  add('hq-med-list-pl','premier','medium','list','اذكر ثلاثة أندية فازت بالدوري الإنجليزي الممتاز قبل عام 2010.',['مانشستر يونايتد','أرسنال','تشيلسي','بلاكبيرن روفرز'],{min:3});
  add('hq-med-clue-barca','barca','medium','clues','من أنا؟ مهاجم كاميروني سجل هدف التعادل لبرشلونة في نهائي دوري الأبطال 2006.','صامويل إيتو',{hints:['لعبت كمهاجم','فزت بدوري الأبطال مع برشلونة','سجلت أمام أرسنال في باريس']});
})();
