/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.0 — ĐA NGÔN NGỮ / MULTILINGUAL
   Tiếng Việt là ngôn ngữ gốc của tri thức. Tiếng Anh phủ toàn bộ
   giao diện, la bàn văn hoá, năm tầng và bản đồ điểm chạm.
   Thêm ngôn ngữ mới: chép khối 'en' và dịch — không phải sửa mã.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

G.LANGS = [
  {k:'vi', n:'Tiếng Việt', flag:'VI', done:100},
  {k:'en', n:'English',    flag:'EN', done:100}
];
G.LANG = 'vi';

/* Lấy trường theo ngôn ngữ: tx(o,'t') → o.t_en khi đang EN, ngược lại o.t */
G.tx = function(o, f){
  if(!o) return '';
  if(G.LANG !== 'vi' && o[f+'_'+G.LANG] !== undefined) return o[f+'_'+G.LANG];
  return o[f];
};
G.L = function(k){
  var d = G.UI[G.LANG] || G.UI.vi;
  return (d[k] !== undefined) ? d[k] : (G.UI.vi[k] !== undefined ? G.UI.vi[k] : k);
};

/* ══════════ CHUỖI GIAO DIỆN ══════════ */
G.UI = {
  vi:{
    brandSub:'Gia Đình Thịnh Vượng',
    search:'Tìm kịch bản, mô thức, phác đồ, màn hình…',
    fiveGroups:'NĂM NHÓM CHÍNH',
    myAccount:'Tài khoản của tôi',
    logout:'Đổi vai / Đăng xuất',
    compass:'La bàn văn hoá',
    heroKicker:'Hệ Sinh Thái Gia Đình Thịnh Vượng',
    heroH1a:'Bảy ngày đầu, mình', heroH1b:'chưa sửa gì cả.', heroH1c:'Mình chỉ', heroH1d:'nhìn cho đúng.',
    heroLead:'Anh chị không cần tin điều gì hôm nay. Chỉ cần nhìn thử tấm bản đồ này một lần — và tự thấy nhà mình đang đứng ở khoang nào.\n\nGITA 365 không hứa con sẽ ngoan hơn sau một tháng. GITA 365 làm một việc: sau 365 ngày, nhà mình vận hành được mà không cần ai canh.',
    heroBtn1:'Bước vào bản đồ', heroBtn2:'Xem 15 tài khoản trải nghiệm',
    prf1:'KỊCH BẢN CHUYÊN MÔN', prf2:'PHÁC ĐỒ × 5 TẦNG', prf3:'MÔ THỨC GỐC', prf4:'VAI GIỮ TRONG NHÀ',
    loginTitle:'Bước vào bằng vai của mình',
    loginHint:'Chọn một vị trí để xem hệ thống đúng như vị trí đó nhìn thấy. Đổi vai bất cứ lúc nào.',
    orLogin:'HOẶC ĐĂNG NHẬP BẰNG TÀI KHOẢN',
    login:'Đăng nhập', pw:'mật khẩu',
    auditorsNote:'Bốn chuyên gia phản biện cũng có tài khoản riêng — xem trong danh sách.',
    tabLaban:'LA BÀN', tabGiatri:'GIÁ TRỊ', tabVanhoa:'VĂN HOÁ', tabNhip:'NHỊP', tabCongdong:'CỘNG ĐỒNG',
    vision:'TẦM NHÌN', mission:'SỨ MỆNH', compassAct:'KIM CHỈ NAM HÀNH ĐỘNG',
    coreValues:'BẢY GIÁ TRỊ CỐT LÕI', houseRules:'NỘI QUY HỆ SINH THÁI',
    fourBeats:'BỐN NHỊP TRONG CUỘC TRÒ CHUYỆN KHÓ', sixLines:'SÁU RANH GIỚI',
    rhythm:'NHỊP SỐNG CỦA HỆ SINH THÁI', creeds:'CÂU GIỮ LỬA',
    forCommunity:'GIÁ TRỊ MANG LẠI CHO CỘNG ĐỒNG', fiveTiers:'NĂM TẦNG MỘT LIẾC',
    openFull:'Mở đầy đủ', langNote:'',
    lock:'Vai hiện tại chưa mở mục này.'
  },
  en:{
    brandSub:'Family Prosperity Ecosystem',
    search:'Search sessions, models, protocols, screens…',
    fiveGroups:'FIVE CORE GROUPS',
    myAccount:'My account',
    logout:'Switch role / Sign out',
    compass:'Culture compass',
    heroKicker:'The Family Prosperity Ecosystem',
    heroH1a:'For the first seven days, we', heroH1b:'fix nothing.', heroH1c:'We only', heroH1d:'learn to see clearly.',
    heroLead:'You do not have to believe anything today. Just look at this map once — and see for yourself which chamber your family is standing in.\n\nGITA 365 does not promise a better-behaved child in a month. GITA 365 does one thing: after 365 days, your household runs without anyone standing guard.',
    heroBtn1:'Enter the map', heroBtn2:'See 15 trial accounts',
    prf1:'PROFESSIONAL SESSIONS', prf2:'PROTOCOLS × 5 TIERS', prf3:'ORIGINAL MODELS', prf4:'ROLES HELD AT HOME',
    loginTitle:'Enter through your own role',
    loginHint:'Pick a position to see the system exactly as that position sees it. Switch any time.',
    orLogin:'OR SIGN IN WITH AN ACCOUNT',
    login:'Sign in', pw:'password',
    auditorsNote:'The four adversarial reviewers have their own accounts — see the list.',
    tabLaban:'COMPASS', tabGiatri:'VALUES', tabVanhoa:'CULTURE', tabNhip:'RHYTHM', tabCongdong:'COMMUNITY',
    vision:'VISION', mission:'MISSION', compassAct:'GUIDING PRINCIPLES',
    coreValues:'SEVEN CORE VALUES', houseRules:'ECOSYSTEM HOUSE RULES',
    fourBeats:'FOUR BEATS FOR A HARD CONVERSATION', sixLines:'SIX BOUNDARIES',
    rhythm:'THE RHYTHM OF THE ECOSYSTEM', creeds:'LINES THAT KEEP THE FIRE',
    forCommunity:'WHAT THIS GIVES THE COMMUNITY', fiveTiers:'FIVE TIERS AT A GLANCE',
    openFull:'Open in full',
    langNote:'Interface, culture compass, the five tiers and the emotional-touchpoint map are fully localised. The professional library — 1,000 sessions, 220 protocols, 42 training models — remains in Vietnamese, its source language; localisation is scheduled per country launch.',
    lock:'Your current role has not unlocked this section.'
  }
};

/* ══════════ NĂM NHÓM & 42 MỤC ══════════ */
G.NAV_EN = {
  g1:{t:'THE PROSPERITY MAP', s:'Where does our family stand, and what will it become?',
      e:'Where everything starts: see clearly before changing anything.'},
  g2:{t:'THE FIVE-TIER JOURNEY', s:'In what order, so nothing collapses?',
      e:'Seven days to see · 21 days to understand · 90 days to build · 365 days to hand over.'},
  g3:{t:'THE TREASURE VAULT', s:'Which playbook fits this exact situation?',
      e:'1,000 sessions · 220 protocols · 42 models · the full source books — unlocked as you progress.'},
  g4:{t:'THE JOLT & THE RHYTHM', s:'What do we do today so this house changes?',
      e:'Habits, rituals, roles held, and jolts big enough to lift the whole family.'},
  g5:{t:'ECOSYSTEM & OPERATIONS', s:'Who is around us, and how is the system running?',
      e:'A constellation of remarkable families, the guiding team, and the ecosystem control room.'}
};
G.ITEM_EN = {
  'ban-do':['The Family Prosperity Map','5 chambers · 9 roles · 8 baseline duties'],
  'chan-dung-nha':['Portrait of our household','Who each person really is'],
  'dinh-vi':['Where we stand today','An honest scoreboard, not a feeling'],
  'tam-nhin':['Vision 5 – 20 years','Everyone writes; nobody writes for anyone else'],
  'chuyen-hoa':['From pain to longing','Seven shifts that make a different family'],
  'hanh-trinh-con':['Our child’s journey','From "so many problems" to the family’s pride'],
  'diem-cham':['Emotional touchpoint map','Nine moments that decide whether they stay'],
  'lo-trinh':['The path T1 → T5','Five stages, one question each'],
  'gita-map':['The G – I – T – A map','Four domains to read the real cause'],
  'chu-ky':['21 / 90-day cycles','PDCA and the acceptance gate of each stage'],
  'nhiem-vu':['Missions & the 365 journal','Today’s work, written down'],
  'chan-dung-tc':['Ten portraits of success','What the people ahead actually look like'],
  'cong-nghiem-thu':['Acceptance gates','Pass on evidence, never on words'],
  'kho':['The treasure vault','Everything you already have'],
  'phac-do':['220 protocols × 5 tiers','Every problem has a route'],
  'kich-ban':['1,000 professional sessions','Consulting and coaching, all five tiers'],
  'mo-thuc':['42 training models','The founder’s original toolkit'],
  'tu-duy':['A new way of thinking','14 lessons that change the air at home'],
  'sach':['Source books & academy archive','11 chapters · 515 passages · searchable'],
  'ngon-tu':['Language that leads','Six beats · sentences you can use tonight'],
  'thuong-hieu':['GITA 365 brand identity','Mark, colour, type, voice, usage'],
  'tro-ly':['The GITA assistant','Ask anything, answers cite their source'],
  'chin-vai':['Nine roles held at home','Who holds what, and who is left out'],
  'thoi-quen':['Habits & family rituals','Four rituals that hold the year'],
  'cu-hich':['The big jolt','Campaigns that create a leap, not a step'],
  'bang-so':['The family scoreboard','Seven output indicators of the model'],
  'phan-thuong':['Points · Levels · Gifts','Recognition for work actually done'],
  'vinh-danh':['Honour & the year’s feat','Good news at home must be told'],
  'ranh-gioi':['Six boundaries','Things that are never done here'],
  've-tinh':['My constellation','The remarkable people around us'],
  'dai-su':['GITA 365 ambassadors','4 levels · 20 missions · 13 safety rules'],
  'hoa-hong':['Ambassador economics','Four levels · commission capped at 10%'],
  'su-kien':['Events & campfires','Where the whole ecosystem meets'],
  'coach-deck':['The coach’s cockpit','Which family to touch first today'],
  'tuvan-deck':['The opening chamber','Who is searching, and the next step'],
  'nguoi-dan-dat':['The guide’s own journey','Grow, contribute, be recognised'],
  'doi-ngu':['The guiding team','Who keeps the fire for which families'],
  'dieu-hanh':['Control room','Whole-ecosystem health'],
  'nguoi-dung':['People & permissions','Accounts, roles, access levels'],
  'kiem-duyet':['Vault moderation','Professional standard before publishing'],
  'tang-truong':['Finance & growth','Cash that can carry the mission'],
  'hai-long':['Satisfaction & feedback','Target 90% · hear what they really say'],
  'tai-lieu-khach':['Documents families send in','Read their creativity, upgrade their path'],
  'kiem-thu':['The four-expert test lab','Demanding · Informed · Engineer · Wordsmith'],
  'chuan-1000':['The 1000-point standard','Ten groups, detail by detail'],
  'ra-soat':['System audit','Security, code, data integrity, brand'],
  'nhat-ky-ht':['System audit log','Every action leaves a trace'],
  'bat-dau':['Start here','Your first five steps, in order'],
  'wow':['The WOW chain','Seven moments they will not forget'],
  'kien-truc-100':['The hundred-year architecture','100 value layers · 5 eras · +3–5% a year'],
  'chuan-nhat':['Operating standard','Kaizen · Monozukuri · Omotenashi · Shokunin'],
  'ai-dieu-phoi':['AI orchestration','Tier limits · KPI routing · capability review'],
  'an-toan-du-lieu':['The data shield','Anti-copy · anti-impersonation'],
  'hoc-tu-lon':['Learning from the giants','TikTok · Google · Toyota · Apple…'],
  'chi-phi':['Cost architecture','Under 500k VND a month · heavy work on-device'],
  'tang-quyen':['Access tiers','15 roles × 21 permissions'],
  'vong-doi-tk':['Account lifecycle','KPI · lock · reinstate · reset'],
  'hang-tai-lieu':['Document ranking 1–100','KPI and rank unlock better material'],
  'dau-mat':['Hidden document marks','Five layers · trace any leak'],
  'dong-chay':['Information flows','The seven flows that feed the ecosystem'],
  'tinh-huong':['250 field situations','Key code · 7-day challenge · KPI'],
  'kho-qua':['1,000 gift documents','Stuck somewhere? Open exactly that one'],
  'ket-noi':['Ecosystem links','Sync · Facebook · Telegram'],
  'bando-tuvan':['Customer operating map','Seven stages · learn it in four weeks'],
  'ma-tran':['220-problem matrix × 5 tiers','11 groups · 8 deep columns per tier'],
  'referral':['Referral trigger sheet','5 portraits · 12 signals · PAIN GOAL GAP'],
  'chan-dung-kh':['Six customer portraits','Read the family right, send the right path'],
  'do-luong-kh':['Customer measurement system','7 metrics · 6 cadences · improvement loop'],
  'hang-vip':['VIP & VVIP tiers','4 tiers · service standards · AI care'],
  'cay-tien':['Money tree — VIP care','4 moves · money-tree score · 12 cadences'],
  'nhan-su-tt':['Loyal staff profile','5 levels · 7 metrics · 5 rules'],
  'bo-test':['Five-tier assessment set','25 sets · 750 questions · four customer bands'],
  'kpi-100':['Ten milestones to the finish','10 milestones · 100 measurable criteria'],
  'bando-coach':['Coaching map','Six beats a session · six ways to sharpen it'],
  'van-ban':['Standard documents','22 templates across five kinds of work'],
  'tai-chinh-qt':['Financial governance','6 principles · 5 ledgers · 6 controls'],
  'thanh-tra':['Inspection & alerts','6 cycles · 10 time-bound alerts'],
  'ra-soat-kh':['The twelve-face review','Never miss what a family needs'],
  'xuat-du-lieu':['Data export','PDF records · CSV lists · permissions'],
  'quy-trinh-tc':['Financial processes','Payment · refund · performance pay'],
  'dong-hanh':['Your companion','The advisor who always listens']
};

/* ══════════ NĂM TẦNG ══════════ */
G.TIER_EN = {
  T1:{name:'RECOGNISE', q:'What is actually going on?',
      feel:'The first time the whole family looks at one truth without arguing.'},
  T2:{name:'DECODE', q:'Why does it keep happening?', feel:'Blame stops. Mechanism begins.'},
  T3:{name:'BUILD', q:'What must we do, and how?',
      feel:'This house has a system that runs — one we built ourselves.'},
  T4:{name:'TRANSFORM', q:'How does change become capability?',
      feel:'The steering of learning is now in the child’s hands.'},
  T5:{name:'BREAK THROUGH', q:'How far can this family go?',
      feel:'A household that runs without anyone standing guard.'}
};

/* ══════════ LA BÀN VĂN HOÁ — BẢN TIẾNG ANH ══════════ */
G.CULTURE_EN = {
  slogan:'A household that runs — without anyone standing guard.',
  sloganSub:'GITA 365 · The Family Prosperity Ecosystem',
  tamNhin:{big:'By 2030, one million Vietnamese grow up inside a household that runs itself — where the child steers their own life and the adults are still growing too.',
    sub:'Not a million better-behaved children. A million different families.'},
  suMenh:{big:'Give every family a map, a rhythm and a companion — so that after 365 days the household runs without anyone standing guard.',
    sub:'We bring the frame and hold the standard. The family assembles its own part.'},
  kimChiNam:[
    {n:'01',t:'See clearly before fixing',d:'The first seven days cure nothing. Without data, every solution is a well-meant guess.'},
    {n:'02',t:'Intervene at the right layer',d:'Nagging about waking early works on Behaviour. If the knot sits in Belief, no amount of nagging moves it.'},
    {n:'03',t:'Change the lens, not the volume',d:'If three rounds of data did not land, a fourth will not either. Let them stand somewhere else and look.'},
    {n:'04',t:'Never assemble it for them',d:'A family only stays with a path it helped build. Doing it for them takes away the thing that carries them through the year.'},
    {n:'05',t:'Anchor only on real evidence',d:'Every acknowledgement starts from something that happened, not from encouragement. An anchor on fiction breaks at the first stumble.'},
    {n:'06',t:'The adults change first',d:'The parents’ own change must be presentable at the year-end family conference. Without it, the child’s stage stands on sand.'}
  ],
  giaTri:[
    {k:'TRUTH',c:'#3B82F6',t:'Honest with the data',d:'Speak in numbers with a date, a time, a count. An off day is a data point, never a verdict.',nen:'Record even the worst night.',khong:'Prettify a report so it reads well.'},
    {k:'CARE',c:'#FB7185',t:'Unconditional respect',d:'No labels, no rankings, no comparing one child to another. Each person is measured only against their own last stage.',nen:'Listen seven, advise three.',khong:'Use data to prove someone wrong.'},
    {k:'STANDARD',c:'#F5B942',t:'Hold the professional standard',d:'Every session has a script, a protocol, an acceptance gate. Improvisation is a risk borne by someone else’s family.',nen:'Open the right script for the right tier.',khong:'Improvise off-standard because it feels familiar.'},
    {k:'ENDURANCE',c:'#10B981',t:'Rhythm over intensity',d:'21 days makes a level, 90 days makes a stage. A week of blazing then nothing builds no capability.',nen:'Keep the appointment even when it is short.',khong:'Cram a month into one session.'},
    {k:'CLARITY',c:'#8B5CF6',t:'Transparent to the end',d:'Who holds which role, who can see which data, where the money goes — said plainly up front and written down.',nen:'Say the inconvenient part first.',khong:'Let a family guess about rights and costs.'},
    {k:'HANDOVER',c:'#06B6D4',t:'Authority with responsibility',d:'Every right handed over comes with a matching responsibility. Support decreases — but never to zero.',nen:'Let the child decide what the child can carry.',khong:'Drop all support and call it independence.'},
    {k:'PROSPERITY',c:'#FF7A45',t:'Prosperity means everyone grows',d:'The goal is not one child’s achievement. It is a family system in which every member is still growing.',nen:'Measure the adults’ change too.',khong:'Use the child’s grades as the family’s measure.'}
  ],
  noiQuy:[
    {t:'On time is respect',d:'Show up on the rhythm you committed to. If you cannot, say so beforehand — never go silent.'},
    {t:'Listen before advising',d:'Keep the seven-listen three-advise ratio in every session and every comment in the group.'},
    {t:'Speak with evidence',d:'Share results with data attached. Do not infer causation before the data supports it.'},
    {t:'Label no one',d:'Describe behaviour and context. Never describe a person with an adjective.'},
    {t:'Never rank families',d:'A household’s numbers are compared only with that household’s previous stage.'},
    {t:'What is said here stays here',d:'Everything heard in a shared session stays in that session.'},
    {t:'Tell the part where you stumbled',d:'Sharing only successes makes a newcomer feel abnormal.'},
    {t:'No selling inside learning spaces',d:'No products, services or investment offers inside the companion space.'},
    {t:'Never use technique to push',d:'Reading someone’s state is to understand and support — never to push them into a purchase.'},
    {t:'Correct mistakes in the open',d:'If you posted or said something wrong, correct it where you said it. Never quietly delete.'}
  ],
  bonNhip:[
    {t:'LISTEN',d:'Hear the sentence out. No interrupting, no composing your reply while they speak.'},
    {t:'ACKNOWLEDGE',d:'Name one thing they did or tried, before saying anything else.'},
    {t:'CLARIFY',d:'Ask to understand, not to trap. One open question, then wait three full seconds.'},
    {t:'GUIDE',d:'Offer one small step doable today, plus how they will know they did it.'}
  ],
  choCongDong:[
    {n:'A map instead of scattered advice',d:'Families stop stitching fragments from a hundred contradictory sources.'},
    {n:'One shared language at home',d:'The whole household speaks in chambers, roles, stages, gates, evidence.'},
    {n:'Data instead of argument',d:'Dinner stops being a courtroom. With a scoreboard, nobody has to guess.'},
    {n:'A generation that can steer',d:'Authority over learning sits with the learner by the end of stage four.'},
    {n:'Somewhere for adults to grow',d:'Parents are not treated as the guilty party, but as people learning a difficult craft.'},
    {n:'A community safe enough for the truth',d:'Where telling your stumble is not judged, and telling your win is not envied.'}
  ],
  nhip:[
    {k:'EVERY DAY',t:'One check-in, three lines of journal',c:'#3B82F6'},
    {k:'EVERY WEEK',t:'One full-house sitting: LISTEN – ACKNOWLEDGE – CLARIFY – GUIDE',c:'#8B5CF6'},
    {k:'EVERY 21 DAYS',t:'One learning level · review the lever in use',c:'#06B6D4'},
    {k:'EVERY 90 DAYS',t:'One stage · one acceptance gate backed by evidence',c:'#10B981'},
    {k:'EVERY 365 DAYS',t:'Family conference · the year’s feat · a new vision board',c:'#F59E0B'}
  ],
  camNiem:[
    {t:'We compare our house to no one. Only to our house yesterday.',by:'Boundary 1'},
    {t:'In the first seven days we fix nothing. We only learn to see.',by:'Tier 1 · Recognise'},
    {t:'A child does not need one more manager. They need a companion who knows the way.',by:'Guiding principle 04'},
    {t:'Any task that cannot be traced back to the 5–20 year vision gets dropped.',by:'Baseline · Direction'},
    {t:'Shut every door and the child cannot grow.',by:'Role 01 · The gatekeeper'},
    {t:'Acknowledgement without evidence is just a pleasant remark.',by:'Baseline · Honour'},
    {t:'A family excludes no one. Someone not yet holding their role needs support, not replacement.',by:'Boundary 3'}
  ]
};
G.cul = function(){ return G.LANG==='en' ? G.CULTURE_EN : G.CULTURE; };
