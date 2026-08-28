/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.0 — LÕI ỨNG DỤNG
   Trạng thái · phân quyền · cổng vào · khung · định tuyến
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function(){
var G = window.G, U = G.U, h = U.h, ic = U.ic;
var KEY = 'gita365.v7';

/* ─────────── Trạng thái ─────────── */
G.S = {
  role:null, acc:null, roleObj:null,
  view:'ban-do', open:['g1'], rtab:'labon', rightOpen:true, leftOpen:false,
  checks:{}, vision:{}, journal:{}, test:{}, famId:'F-001', kbShown:60
};
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify({
    role:G.S.role, u:G.S.acc && G.S.acc.u, view:G.S.view, open:G.S.open, rtab:G.S.rtab,
    checks:G.S.checks, vision:G.S.vision, journal:G.S.journal, test:G.S.test,
    rightOpen:G.S.rightOpen, mood:G.S.mood
  })); }catch(e){}
}
function load(){
  try{
    var d = JSON.parse(localStorage.getItem(KEY) || 'null'); if(!d) return null;
    G.S.view = d.view || G.S.view; G.S.open = d.open || G.S.open; G.S.rtab = d.rtab || G.S.rtab;
    G.S.checks = d.checks || {}; G.S.vision = d.vision || {}; G.S.journal = d.journal || {};
    G.S.test = d.test || {};
    G.S.mood = d.mood || null;
    if(d.rightOpen !== undefined) G.S.rightOpen = d.rightOpen;
    return d;
  }catch(e){ return null; }
}

/* ─────────── Tiện ích hệ thống ─────────── */
G.roleById = function(id){
  var r = G.ROLES.filter(function(x){return x.id===id;})[0];
  return r || G.ROLES[12];
};
G.gname = function(g){ var e=G.NAV_EN[g.id]; return (G.LANG==='en'&&e)?e.t:g.t; };
G.gsub  = function(g){ var e=G.NAV_EN[g.id]; return (G.LANG==='en'&&e)?e.s:g.s; };
G.gess  = function(g){ var e=G.NAV_EN[g.id]; return (G.LANG==='en'&&e)?e.e:g.essence; };
G.iname = function(it){ var e=G.ITEM_EN[it.v]; return (G.LANG==='en'&&e)?e[0]:it.t; };
G.ihint = function(it){ var e=G.ITEM_EN[it.v]; return (G.LANG==='en'&&e)?e[1]:it.h; };
G.tname = function(t){ var e=G.TIER_EN[t.code]; return (G.LANG==='en'&&e)?e.name:t.name; };
G.tq    = function(t){ var e=G.TIER_EN[t.code]; return (G.LANG==='en'&&e)?e.q:t.q; };
G.tfeel = function(t){ var e=G.TIER_EN[t.code]; return (G.LANG==='en'&&e)?e.feel:t.feel; };
G.setLang = function(k){
  G.LANG = k;
  try{ localStorage.setItem('gita365.lang', k); }catch(e){}
  if(G.S.acc) shell(); else gate();
  U.toast(k==='en'?'Interface switched to English.':'Đã chuyển về tiếng Việt.','ok');
};

G.tierOf = function(id){
  return G.TIERS.filter(function(t){return t.id===Number(id);})[0] || G.TIERS[0];
};
G.bandColor = function(b){
  return ({XANH:'#10B981', VANG:'#F59E0B', CAM:'#FF7A45', DO:'#F87171'})[b] || '#94A3B8';
};
G.can = function(perm){
  if(!G.S.roleObj) return false;
  var need = G.PERM[perm];
  return need !== undefined && G.S.roleObj.lv <= need;
};
G.myPortal = function(){ return G.S.roleObj ? G.S.roleObj.portal : 'ph'; };
var NHA_TRONG = {id:'—',nha:'Chưa mở hồ sơ',hv:'—',lop:'—',ph:'—',tier:1,ngay:0,
  coach:'—',nhac:0,tuchu:0,vai:0,band:'VANG',kyTich:'Cần cấp phép để mở hồ sơ gia đình'};
G.myFamily = function(){
  var ds = G.FAMILIES;
  if(!ds || !ds.length) return NHA_TRONG;
  var p = G.myPortal();
  if(p==='ph' || p==='hs') return ds[0];
  if(p==='coach') return ds[2] || ds[0];
  return ds.filter(function(f){return f.id===G.S.famId;})[0] || ds[0];
};
G.searchBox = function(ph, key){
  return '<div class="row" style="gap:10px"><div style="flex:1;position:relative">'+
    '<span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--ink-4)">'+ic('search','w-4 h-4')+'</span>'+
    '<input data-search="'+h(key)+'" placeholder="'+h(ph)+'" '+
    'style="width:100%;background:rgba(255,255,255,.045);border:1px solid var(--line);border-radius:99px;'+
    'padding:12px 20px 12px 44px;font-size:13.5px;outline:none"></div></div>';
};
G.famTable = function(list){
  return U.tbl(['Gia đình','Tầng','Ngày','Nhắc/tuần','Tự chủ','Vai','Băng','Coach'],
    list.map(function(f){
      var t = G.tierOf(f.tier);
      return ['<b>'+h(f.nha)+'</b><div class="tiny muted">'+h(f.hv)+' · '+h(f.lop)+'</div>',
        U.chip(t.code, t.c), '<span class="mono">'+f.ngay+'</span>',
        '<span class="mono">'+f.nhac+'</span>',
        '<div style="min-width:88px">'+U.bar(f.tuchu,'#10B981')+'<span class="tiny mono muted">'+f.tuchu+'%</span></div>',
        '<span class="mono">'+f.vai+'/9</span>',
        '<span class="chip" style="color:'+G.bandColor(f.band)+';border-color:'+G.bandColor(f.band)+'55">'+h(f.band)+'</span>',
        '<span class="sm">'+h(f.coach)+'</span>'];
    }));
};

/* ═══════════════ CỔNG VÀO ═══════════════ */
function gate(){
  var pick = G.ACCOUNTS[12];
  var o = '<div id="gate">'+
   '<div class="gate-top"><div class="brand"><span class="mark">GITA</span>'+
   '<div><div class="nm">GITA 365</div><div class="sub">'+h(G.L('brandSub'))+'</div></div></div>'+
   '<span class="grow"></span>'+
   G.LANGS.map(function(l){
     return '<button class="chip'+(l.k===G.LANG?' on':'')+'" data-lang="'+h(l.k)+'">'+h(l.flag)+'</button>';
   }).join('')+
   '<span class="chip">v'+h(G.META.version)+'</span>'+
   '<span class="chip deskonly">Hotline '+h(G.META.hotline)+'</span></div>'+

   '<div class="gate-body"><div class="hero">'+
    '<div class="kicker">'+ic('spark','w-4 h-4')+h(G.L('heroKicker'))+'</div>'+
    '<h1>'+h(G.L('heroH1a'))+' <em>'+h(G.L('heroH1b'))+'</em><br>'+h(G.L('heroH1c'))+
      ' <span class="grad-text">'+h(G.L('heroH1d'))+'</span></h1>'+
    '<p class="lead">'+U.nl(G.L('heroLead'))+'</p>'+
    '<div class="row wrap" style="gap:10px">'+
      '<button class="btn pri" data-act="scroll-login">'+ic('arrow')+h(G.L('heroBtn1'))+'</button>'+
      '<button class="btn ghost" data-act="show-accounts">'+ic('users')+h(G.L('heroBtn2'))+'</button></div>'+
    '<div class="prf">'+
      '<div><b class="grad-text">'+G.META.soKichBan.toLocaleString('vi-VN')+'</b><span>'+h(G.L('prf1'))+'</span></div>'+
      '<div><b class="grad-text">'+G.META.soPhacDo+'</b><span>'+h(G.L('prf2'))+'</span></div>'+
      '<div><b class="grad-text">'+G.META.soMoThuc+'</b><span>'+h(G.L('prf3'))+'</span></div>'+
      '<div><b class="grad-text">9</b><span>'+h(G.L('prf4'))+'</span></div>'+
    '</div></div>'+

    '<div class="gate-card" id="loginCard">'+
     '<h3>'+h(G.L('loginTitle'))+'</h3>'+
     '<p class="hint">'+h(G.L('loginHint'))+'</p>'+
     '<div class="rolelist">' + G.ACCOUNTS.map(function(a){
       var r = G.roleById(a.role);
       return '<button class="rl'+(a.role===pick.role?' on':'')+'" data-login="'+h(a.u)+'">'+
         '<span class="av" style="background:linear-gradient(135deg,'+r.c+',#FF7A45)">'+h(a.role)+'</span>'+
         '<span class="tx"><b>'+h(r.n)+'</b><span>'+h(a.ten)+' · '+h(a.nha)+'</span></span>'+
         '<span class="lv">LV'+r.lv+'</span></button>';
     }).join('') + '</div>'+
     '<div class="mt2" style="padding-top:16px;border-top:1px solid var(--line)">'+
       '<div class="tiny up muted mb">'+h(G.L('orLogin'))+'</div>'+
       '<input id="inU" placeholder="name@gita365.vn" autocomplete="username" '+
       'style="width:100%;background:rgba(255,255,255,.05);border:1px solid var(--line);border-radius:13px;padding:11px 15px;font-size:13.5px;outline:none;margin-bottom:8px">'+
       '<input id="inP" type="password" placeholder="'+h(G.L('pw'))+'" autocomplete="current-password" '+
       'style="width:100%;background:rgba(255,255,255,.05);border:1px solid var(--line);border-radius:13px;padding:11px 15px;font-size:13.5px;outline:none">'+
       '<button class="btn pri blk mt" data-act="do-login">'+ic('arrow')+h(G.L('login'))+'</button>'+
       '<p class="tiny muted mt center">'+h(G.L('auditorsNote'))+'</p>'+
     '</div></div></div></div>';
  document.getElementById('app').innerHTML = o;
}

G.accountsModal = function(){
  var rows = G.ACCOUNTS.map(function(a){
    var r = G.roleById(a.role);
    return [U.chip(r.n, r.c)+'<div class="tiny muted mt">'+h(a.ten)+'</div>',
      '<span class="mono sm">'+h(a.u)+'</span>',
      '<span class="mono sm" style="color:var(--gold)">'+h(a.p)+'</span>',
      '<button class="btn sm" data-login="'+h(a.u)+'">Vào</button>'];
  });
  var rows2 = G.AUDITORS.map(function(a){
    return [U.chip(a.ten,'#FB7185'), '<span class="mono sm">'+h(a.u)+'</span>',
      '<span class="mono sm" style="color:var(--gold)">'+h(a.p)+'</span>',
      '<button class="btn sm" data-login="'+h(a.u)+'">Vào</button>'];
  });
  U.modal('<h2 style="font-size:21px;font-weight:800;margin-bottom:6px">Tài khoản trải nghiệm</h2>'+
    '<p class="sm muted mb">Mười lăm vị trí trong hệ thống, cộng bốn chuyên gia phản biện. '+
    'Đây là lớp đăng nhập demo chạy trong trình duyệt để kiểm tra giao diện và phạm vi của từng vai — '+
    'không phải hệ thống xác thực thật.</p>'+
    U.tbl(['Vị trí','Tài khoản','Mật khẩu',''], rows)+
    U.sec('BỐN CHUYÊN GIA PHẢN BIỆN','Đăng nhập để chấm hệ thống từ góc nhìn của họ')+
    U.tbl(['Vai kiểm thử','Tài khoản','Mật khẩu',''], rows2));
};

function doLogin(u, p){
  var all = G.ACCOUNTS.concat(G.AUDITORS);
  var a = all.filter(function(x){return x.u.toLowerCase()===String(u||'').trim().toLowerCase();})[0];
  if(!a){ U.toast('Không tìm thấy tài khoản này.','err'); return; }
  if(p !== undefined && p !== null && String(p).length && a.p !== p){
    U.toast('Mật khẩu chưa đúng.','err'); return;
  }
  G.S.acc = a; G.S.role = a.role; G.S.roleObj = G.roleById(a.role);
  var portal = G.PORTALS[G.S.roleObj.portal];
  G.S.view = (portal && portal.home) || 'ban-do';
  G.S.open = [groupOf(G.S.view) || 'g1'];
  save();
  manCho('Đang mở kho theo phạm vi được cấp phép…');
  G.napKho().then(function(){
    shell();
    U.toast('Chào ' + a.ten + ' · ' + G.S.roleObj.n +
      (G.KHO.cheDoMau ? ' · chế độ mẫu' : ' · đã mở ' + G.KHO.daNap.length + ' gói'), 'ok');
  });
}
G.doLogin = doLogin;

function manCho(loi){
  document.getElementById('app').innerHTML =
    '<div style="min-height:100vh;display:grid;place-items:center;text-align:center;padding:30px">'+
    '<div><div style="width:64px;height:64px;border-radius:20px;margin:0 auto 18px;display:grid;place-items:center;'+
    'background:linear-gradient(135deg,var(--gold),var(--ember));color:#1A1006;font-weight:900">GITA</div>'+
    '<b style="font-size:16px;display:block;margin-bottom:6px">'+h(loi)+'</b>'+
    '<p class="sm muted">Nội dung chuyên môn được mã hoá — chỉ mở đúng phần vai này được cấp.</p>'+
    '<div style="width:220px;margin:16px auto 0">'+U.bar(100,'#F5B942')+'</div></div></div>';
}

/* ═══════════════ KHUNG ỨNG DỤNG ═══════════════ */
function groupOf(v){
  for(var i=0;i<G.NAV.length;i++)
    for(var j=0;j<G.NAV[i].items.length;j++)
      if(G.NAV[i].items[j].v===v) return G.NAV[i].id;
  return null;
}
function visible(it){ return !it.perm || G.can(it.perm); }

function leftNav(){
  return '<div class="scroll"><div class="nav-eyebrow">'+h(G.L('fiveGroups'))+'</div>' +
    G.NAV.map(function(g){
      var items = g.items.filter(visible);
      var open = G.S.open.indexOf(g.id)>=0;
      return '<div class="grp'+(open?' open':'')+'">'+
        '<button class="grp-h" data-grp="'+h(g.id)+'">'+
          '<span class="ic" style="background:'+g.c+'1f;color:'+g.c+';border-color:'+g.c+'3a">'+ic(g.ic)+'</span>'+
          '<span class="tx"><b>'+h(G.gname(g))+'</b><span>'+h(G.gsub(g))+'</span></span>'+
          '<span class="no">'+h(g.no)+'</span>'+ic('chev','cv')+'</button>'+
        '<div class="grp-b">'+
          '<p class="tiny muted" style="padding:2px 10px 9px;line-height:1.5">'+h(G.gess(g))+'</p>'+
          g.items.map(function(it){
            var ok = visible(it), on = it.v===G.S.view;
            return '<button class="nav-i'+(on?' on':'')+(ok?'':' lock')+'" data-v="'+h(it.v)+'"'+(ok?'':' disabled')+'>'+
              ic(ok?it.ic:'lock')+'<span class="lb">'+h(G.iname(it))+'</span>'+
              (it.star?'<span style="color:var(--gold)">'+ic('star','w-3 h-3')+'</span>':'')+'</button>';
          }).join('')+
        '</div></div>';
    }).join('') + '</div>'+
    '<div class="foot"><button class="nav-i" data-v="toi">'+ic('home')+'<span class="lb">'+h(G.L('myAccount'))+'</span></button>'+
    '<button class="nav-i" data-act="logout">'+ic('out')+'<span class="lb">'+h(G.L('logout'))+'</span></button></div>';
}

var RTABS = [
  {k:'labon',  l:'tabLaban'}, {k:'giatri', l:'tabGiatri'}, {k:'vanhoa', l:'tabVanhoa'},
  {k:'nhip',   l:'tabNhip'},  {k:'congdong',l:'tabCongdong'}
];
function rightPanel(){
  var C = G.cul(), o = '';
  o += '<div class="rt">' + RTABS.map(function(t){
    return '<button data-rt="'+t.k+'" class="'+(G.S.rtab===t.k?'on':'')+'">'+h(G.L(t.l))+'</button>';
  }).join('') + '</div><div class="scroll">';
  if(G.LANG!=='vi' && G.L('langNote'))
    o += '<div class="card pad-sm mb" style="border-color:rgba(56,189,248,.3)">'+
      '<p class="tiny" style="line-height:1.6;color:var(--ink-2)">'+h(G.L('langNote'))+'</p></div>';

  if(G.S.rtab==='labon'){
    o += '<div class="rblock"><h4>'+h(G.L('vision'))+'</h4>'+
      '<p class="serif" style="font-size:15.5px;line-height:1.6;color:var(--gold-2)">'+h(C.tamNhin.big)+'</p>'+
      '<p class="tiny muted mt">'+h(C.tamNhin.sub)+'</p></div>'+
      '<div class="rblock"><h4>'+h(G.L('mission'))+'</h4>'+
      '<p class="sm" style="line-height:1.65;color:var(--ink-2)">'+h(C.suMenh.big)+'</p>'+
      '<p class="tiny muted mt">'+h(C.suMenh.sub)+'</p></div>'+
      '<div class="rblock"><h4>'+h(G.L('compassAct'))+'</h4>'+
      C.kimChiNam.map(function(k){
        return '<div class="rule"><span class="n">'+h(k.n)+'</span><div class="tx"><b>'+h(k.t)+'</b><p>'+h(k.d)+'</p></div></div>';
      }).join('') + '</div>';
  }
  else if(G.S.rtab==='giatri'){
    o += '<div class="rblock"><h4>'+h(G.L('coreValues'))+'</h4>'+
      C.giaTri.map(function(v){
        return '<div class="val"><div class="hd"><span class="k" style="background:'+v.c+'26;color:'+v.c+'">'+h(v.k)+'</span>'+
          '<b>'+h(v.t)+'</b></div><p>'+h(v.d)+'</p>'+
          '<div class="do">'+ic('check','w-3 h-3')+'<span>'+h(v.nen)+'</span></div>'+
          '<div class="dont">'+ic('x','w-3 h-3')+'<span>'+h(v.khong)+'</span></div></div>';
      }).join('') + '</div>';
  }
  else if(G.S.rtab==='vanhoa'){
    o += '<div class="rblock"><h4>'+h(G.L('houseRules'))+'</h4>'+
      C.noiQuy.map(function(r,i){
        return '<div class="rule"><span class="n">'+(i+1)+'</span><div class="tx"><b>'+h(r.t)+'</b><p>'+h(r.d)+'</p></div></div>';
      }).join('') + '</div>'+
      '<div class="rblock"><h4>'+h(G.L('fourBeats'))+'</h4>'+
      C.bonNhip.map(function(b,i){
        return '<div class="rule"><span class="n">'+(i+1)+'</span><div class="tx"><b>'+h(b.t)+'</b><p>'+h(b.d)+'</p></div></div>';
      }).join('') + '</div>'+
      (G.VANHANH ? '<div class="rblock"><h4>'+h(G.L('sixLines'))+'</h4>'+
      (G.VANHANH.ranhGioi.muc||[]).map(function(m,i){
        return '<div class="rule"><span class="n" style="background:rgba(248,113,113,.16);color:var(--bad)">✕</span>'+
          '<div class="tx"><b>'+h(m.khong)+'</b></div></div>';
      }).join('') +
      '<button class="btn ghost sm blk mt" data-v="ranh-gioi">'+h(G.L('openFull'))+' '+ic('arrow')+'</button></div>' : '');
  }
  else if(G.S.rtab==='nhip'){
    o += '<div class="creed"><p>'+h(C.slogan)+'</p><cite>'+h(C.sloganSub)+'</cite></div>'+
      '<div class="rblock"><h4>'+h(G.L('rhythm'))+'</h4>'+
      C.nhip.map(function(n){
        return '<div class="val" style="border-color:'+n.c+'2e"><div class="hd">'+
          '<span class="k" style="background:'+n.c+'26;color:'+n.c+'">'+h(n.k)+'</span></div>'+
          '<p style="color:var(--ink-2)">'+h(n.t)+'</p></div>';
      }).join('') + '</div>'+
      '<div class="rblock"><h4>'+h(G.L('creeds'))+'</h4>'+
      C.camNiem.map(function(c){
        return '<div class="creed"><p style="font-size:14.5px">'+h(c.t)+'</p><cite>'+h(c.by)+'</cite></div>';
      }).join('') + '</div>';
  }
  else {
    o += '<div class="rblock"><h4>'+h(G.L('forCommunity'))+'</h4>'+
      C.choCongDong.map(function(x,i){
        return '<div class="rule"><span class="n">'+(i+1)+'</span><div class="tx"><b>'+h(x.n)+'</b><p>'+h(x.d)+'</p></div></div>';
      }).join('') + '</div>'+
      '<div class="rblock"><h4>'+h(G.L('fiveTiers'))+'</h4>'+
      G.TIERS.map(function(t){
        return '<div class="val" style="border-color:'+t.c+'2e"><div class="hd">'+
          '<span class="k" style="background:'+t.c+'26;color:'+t.c+'">'+t.code+'</span><b>'+h(G.tname(t))+'</b></div>'+
          '<p>'+h(G.tq(t))+'</p></div>';
      }).join('') + '</div>';
  }
  return o + '</div>';
}

function topBar(){
  var r = G.S.roleObj, a = G.S.acc;
  return '<div class="brand"><button class="tbtn mobonly" data-act="toggle-left" aria-label="Menu">'+ic('menu')+'</button>'+
    '<button class="brand" data-v="'+h((G.PORTALS[r.portal]||{}).home||'ban-do')+'" style="gap:11px">'+
    '<span class="mark">GITA</span><div class="deskonly" style="text-align:left">'+
    '<div class="nm">GITA 365</div><div class="sub">'+h(G.L('brandSub'))+'</div></div></button></div>'+
    '<button id="search" data-act="cmd">'+ic('search')+'<span>'+h(G.L('search'))+'</span><kbd>Ctrl K</kbd></button>'+
    '<span class="grow"></span>'+
    '<span class="chip deskonly" style="color:'+r.c+';border-color:'+r.c+'55">'+ic('shield','w-3 h-3')+h(r.short)+' · LV'+r.lv+'</span>'+
    '<button class="tbtn" data-act="lang" aria-label="Language" style="font-size:11px;font-weight:800;letter-spacing:.04em">'+
      h(G.LANG.toUpperCase())+'</button>'+
    (G.INSTALL ? '<button class="tbtn" data-act="install" aria-label="Cài đặt ứng dụng" style="color:var(--gold);border-color:rgba(245,185,66,.45)">'+ic('plus')+'</button>' : '')+
    '<button class="tbtn" data-act="toggle-right" aria-label="'+h(G.L('compass'))+'">'+ic('compass')+'</button>'+
    '<button class="who" data-v="toi">'+
      '<div class="tx deskonly"><b>'+h(a.ten)+'</b><span>'+h(a.nha)+'</span></div>'+
      '<span class="av" style="background:linear-gradient(135deg,'+r.c+',#FF7A45)">'+
      h(a.ten.split(' ').slice(-1)[0].slice(0,2).toUpperCase())+'</span></button>';
}

function shell(){
  document.getElementById('app').innerHTML =
    '<div id="top">'+topBar()+'</div>'+
    '<div id="scrim"></div>'+
    '<aside id="left">'+leftNav()+'</aside>'+
    '<div class="shell'+(G.S.rightOpen?'':' no-right')+'" id="shell">'+
      '<main id="main"></main>'+
    '</div>'+
    '<aside id="right" class="'+(G.S.rightOpen?'open':'')+'">'+rightPanel()+'</aside>';
  render();
}

/* Chốt quyền tập trung — mọi màn hình đều đi qua đây, kể cả khi vào thẳng
   bằng trạng thái đã lưu hoặc bằng liên kết. Nav chỉ ẩn nút; đây mới là cổng. */
G.navItem = function(v){
  var it = null;
  G.NAV.forEach(function(g){ g.items.forEach(function(x){ if(x.v===v) it = x; }); });
  return it;
};
G.allowed = function(v){
  var it = G.navItem(v);
  return !it || !it.perm || G.can(it.perm);
};

function dangMoKho(goi){
  return U.ph({eyebrow:'ĐANG MỞ KHO', ic:'vault', t:'Đang mở gói nội dung của tầng',
    lead:'Gói này nặng hơn phần nền nên được mở ở nền sau khi đăng nhập. Xong là màn hình tự hiện ra, không phải bấm gì thêm.'}) +
    '<div class="card center" style="padding:36px">' + U.bar(60,'var(--gold)') +
    '<p class="sm muted mt">Đang mở <b class="mono">' + U.h(goi) + '</b> · ' +
    U.h(String((G.KHO.daNap||[]).length)) + ' gói đã mở xong</p></div>';
}

function render(){
  var main = document.getElementById('main');
  if(!G.VIEWS[G.S.view]) G.S.view = 'ban-do';
  if(!G.allowed(G.S.view)){
    var it = G.navItem(G.S.view);
    main.innerHTML = '<div class="view">' + U.ph({eyebrow:'NGOÀI PHẠM VI CỦA VAI', ic:'lock',
      t:(it?it.t:'Mục này'), lead:'Vai đang dùng không có quyền mở mục này.'}) +
      U.lockCard('Mục này cần quyền ' + U.h(it && it.perm) + '. Đăng nhập bằng vai có cấp đủ để mở — danh sách tài khoản thử nằm ở màn hình Cổng vào và ở mục Quản trị con người.') + '</div>';
    var l0 = document.getElementById('left'); if(l0) l0.innerHTML = leftNav();
    save(); return;
  }
  var goiCan = G.goiCanCho(G.S.view);
  if(!G.coGoi(goiCan)){
    /* Gói đang mở ở nền: nói thật là đang mở, không nói là chưa được cấp phép. */
    var dang = G.KHO.dangNap && G.KHO.dangNap.indexOf(goiCan) >= 0;
    main.innerHTML = '<div class="view">' + (dang ? dangMoKho(goiCan) : G.canCapPhep(goiCan)) + '</div>';
    var lK = document.getElementById('left'); if(lK) lK.innerHTML = leftNav();
    save(); return;
  }
  /* Màn hình nào cũng phải dựng được. Thiếu nội dung đã cấp phép thì hiện
     màn xin cấp phép, không bao giờ để trắng trang hoặc vỡ ứng dụng. */
  var fn = G.VIEWS[G.S.view], noiDung;
  try {
    noiDung = fn();
    if(!noiDung || String(noiDung).length < 40) throw new Error('Màn hình chưa có nội dung');
  } catch(e) {
    console.warn('[GITA] ' + G.S.view + ': ' + e.message);
    noiDung = G.canCapPhep(goiCan || 'nen');
  }
  main.innerHTML = '<div class="view">' + noiDung + '</div>';
  if(G.watermark) G.watermark();
  if(G.dem) G.dem();
  try{ if(history.replaceState) history.replaceState(null,'','#'+G.S.view); }catch(e){}
  window.scrollTo(0,0);
  var left = document.getElementById('left');
  if(left) left.innerHTML = leftNav();
  save();
}
G.render = render;
G.save   = save;

G.go = function(v){
  if(!G.VIEWS[v]) return;
  if(!G.allowed(v)){ U.toast(G.L('lock'),'err'); return; }
  if(G.isCanh && G.isCanh(v) && G.throttled && G.throttled()) return;
  G.S.view = v;
  var g = groupOf(v);
  if(g && G.S.open.indexOf(g)<0) G.S.open = [g];
  U.closeModal();
  closeMobile();
  render();
};
function closeMobile(){
  var l = document.getElementById('left'), s = document.getElementById('scrim');
  if(l) l.classList.remove('open'); if(s) s.classList.remove('on');
}

/* ═══════════════ TRỢ LÝ GITA ═══════════════ */
G.ask = function(q){
  q = String(q||'').trim();
  var out = document.getElementById('aiOut'); if(!out) return;
  if(!q){ out.innerHTML=''; return; }
  var key = q.toLowerCase();
  var hits = [];
  (G.MOTHUC||[]).forEach(function(m){
    if((m.title+' '+(m.keywords||[]).join(' ')).toLowerCase().indexOf(key.split(' ')[0])>=0)
      hits.push({t:m.title, s:String(m.summary||'').slice(0,220), src:'Mô thức '+m.id, c:'#F5B942', go:'mo-thuc'});
  });
  G.BAIHOC.forEach(function(b){
    if((b.ten+' '+(b.nguyenLy||'')).toLowerCase().indexOf(key.split(' ')[0])>=0)
      hits.push({t:b.ten, s:String(b.nguyenLy||'').slice(0,220), src:'Bài học '+b.id, c:'#10B981', go:'tu-duy'});
  });
  (G.PHACDO||[]).forEach(function(p){
    if((p.ten||'').toLowerCase().indexOf(key.split(' ')[0])>=0)
      hits.push({t:p.ten, s:(p.giaiPhap||p.nguyenNhan||''), src:'Phác đồ '+p.ma, c:'#3B82F6', go:'phac-do'});
  });
  (G.KICHBAN||[]).forEach(function(k){
    if((k.ten||'').toLowerCase().indexOf(key.split(' ')[0])>=0 && hits.length<40)
      hits.push({t:k.ten, s:String(k.mo||k.muc||'').slice(0,220), src:'Kịch bản '+k.ma+' · '+k.tang, c:'#8B5CF6', go:'kich-ban'});
  });
  var f = G.myFamily(), t = G.tierOf(f.tier);
  var head = '<div class="card mb" style="border-color:rgba(245,185,66,.3)">'+
    '<div class="row mb"><span style="color:var(--gold)">'+ic('spark','w-4 h-4')+'</span>'+
    '<b>Trả lời trong phạm vi '+h(t.code+' · '+G.tname(t))+'</b></div>'+
    '<p class="sm dim" style="line-height:1.7">'+h(t.note)+' '+
    'Với câu hỏi của anh chị, hệ thống tìm thấy '+hits.length+' tư liệu liên quan trong kho. '+
    'Chỗ nào kho chưa xác nhận, trợ lý nói rõ là chưa chắc chắn thay vì đoán.</p></div>';

  /* Đọc miền G–I–T–A của câu hỏi và chuyển tới người phù hợp nhất */
  var mienTu = {
    I:['cãi','giận','chán','không muốn','bỏ cuộc','tự ti','sợ','buồn','niềm tin','động lực','khát khao'],
    T:['cách','phương pháp','kỹ năng','học thế nào','không biết làm','hệ thống','kế hoạch','lịch'],
    A:['điện thoại','bạn bè','môi trường','thói quen','nhắc','không gian','game','mạng xã hội'],
    G:['mục tiêu','muốn gì','định hướng','tương lai','ước mơ','kỳ tích']
  };
  var mien = 'G', diem = 0;
  Object.keys(mienTu).forEach(function(k){
    var n = 0; mienTu[k].forEach(function(w){ if(key.indexOf(w)>=0) n++; });
    if(n > diem){ diem = n; mien = k; }
  });
  var gapTu = ['cãi','xung đột','bỏ học','bỏ nhà','tuyệt vọng','không chịu nổi','đánh nhau','trầm cảm'];
  var gap = gapTu.some(function(w){ return key.indexOf(w)>=0; });
  var ung = (G.KPI||[]).filter(function(k2){
    return k2.manh.indexOf(mien)>=0 && k2.tang.indexOf(t.code)>=0 && k2.tai < k2.tran;
  });
  if(!ung.length) ung = (G.KPI||[]).filter(function(k2){ return k2.manh.indexOf(mien)>=0 && k2.tai<k2.tran; });
  if(!ung.length) ung = (G.KPI||[]).slice(0,1);
  var best = ung.sort(function(a,b){ return (b.hailong+b.gonut-b.phanHoi) - (a.hailong+a.gonut-a.phanHoi); })[0];
  var mm = G.GITA.filter(function(x){return x.k===mien;})[0] || G.GITA[0];

  if(best){
    head += '<div class="card mb" style="border-color:'+best.c+'40;background:'+best.c+'0d">'+
      '<div class="row wrap" style="gap:8px;margin-bottom:9px">'+
      '<span style="color:'+best.c+'">'+ic('users','w-4 h-4')+'</span>'+
      '<b>'+(gap?'Câu này vượt phạm vi trợ lý — đã chuyển tới người thật ngay':'Đã báo cho người đồng hành phù hợp nhất')+'</b>'+
      U.chip('Miền '+mien+' · '+mm.short, mm.c)+
      (gap?U.chip('Độ gấp cao','#F87171'):'')+'</div>'+
      '<div class="row wrap" style="gap:14px">'+
      '<div class="grow" style="min-width:180px"><b class="sm" style="display:block">'+h(best.ten)+'</b>'+
      '<span class="tiny muted">'+h(best.vai)+' · '+h(best.note)+'</span></div>'+
      '<div style="display:flex;gap:16px">'+
      '<div class="center"><b class="mono" style="color:'+best.c+'">'+best.phanHoi+"'</b><div class=\"tiny muted\">PHẢN HỒI</div></div>"+
      '<div class="center"><b class="mono" style="color:'+best.c+'">'+best.hailong+'</b><div class="tiny muted">HÀI LÒNG</div></div>'+
      '<div class="center"><b class="mono" style="color:'+best.c+'">'+best.tai+'/'+best.tran+'</b><div class="tiny muted">TẢI</div></div>'+
      '</div></div>'+
      (gap?'<p class="sm mt2" style="color:var(--bad);line-height:1.6">Trợ lý không trả lời câu này. Việc đang leo thang cần người thật ngồi cùng — coach sẽ liên hệ trong hôm nay.</p>':'')+
      '</div>';
  }
  if(gap){ out.innerHTML = head; return; }
  if(!hits.length){
    out.innerHTML = head + U.empty('Chưa tìm thấy tư liệu khớp',
      'Thử một từ khoá ngắn hơn — ví dụ "thói quen", "điện thoại", "họp gia đình", "trao quyền".');
    return;
  }
  out.innerHTML = head + hits.slice(0,8).map(function(x){
    return '<div class="card pad-sm mb" style="border-color:'+x.c+'26">'+
      '<div class="row" style="gap:8px;margin-bottom:6px">'+U.chip(x.src,x.c)+'</div>'+
      '<b class="sm" style="display:block;margin-bottom:6px">'+h(x.t)+'</b>'+
      '<p class="sm muted" style="line-height:1.6">'+h(x.s)+'…</p>'+
      '<button class="btn ghost sm mt" data-go="'+h(x.go)+'">Mở kệ tư liệu '+ic('arrow')+'</button></div>';
  }).join('');
};

/* ═══════════════ XUẤT DỮ LIỆU ═══════════════ */
function taiVe(ten, noi, kieu){
  try{
    var b = new Blob(['\ufeff' + noi], {type: kieu + ';charset=utf-8'});
    var u = URL.createObjectURL(b), a = document.createElement('a');
    a.href = u; a.download = ten; document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(u); a.remove(); }, 1500);
    return true;
  }catch(e){ return false; }
}
function csv(cot, dong){
  var q = function(v){ v = String(v===undefined||v===null?'':v); 
    return /[",\n;]/.test(v) ? '"' + v.replace(/"/g,'""') + '"' : v; };
  return [cot.map(q).join(';')].concat(dong.map(function(r){ return r.map(q).join(';'); })).join('\r\n');
}
function dauBan(){
  var d = new Date(), p = function(x){ return String(x).padStart(2,'0'); };
  return 'GITA-' + (G.S.role||'--') + '-' + d.getFullYear() + p(d.getMonth()+1) + p(d.getDate()) +
         '-' + p(d.getHours()) + p(d.getMinutes());
}
G.xuat = function(ma){
  var l = (G.XUAT.loai||[]).filter(function(x){return x.ma===ma;})[0];
  if(!l){ return; }
  if(!G.can(l.quyen)){ U.toast('Vai này chưa được Admin cấp quyền xuất loại dữ liệu đó.','err'); return; }
  var d = dauBan(), ok = false;

  if(ma==='X1'){                       /* Hồ sơ gia đình · PDF */
    U.toast('Đang mở hộp in — chọn "Lưu thành PDF" để xuất hồ sơ.','ok');
    setTimeout(function(){ window.print(); }, 400);
    ok = true;
  }
  else if(ma==='X2'){                  /* Danh sách khách hàng · CSV */
    var fs = G.FAMILIES || [];
    if(fs.length > 50) G.secLog && G.secLog('Xuất danh sách lớn', fs.length + ' dòng — cần lý do theo luật xuất số 3', 'Cảnh báo');
    ok = taiVe(d + '-danh-sach-khach-hang.csv', csv(
      ['Mã nhà','Học viên','Lớp','Người lớn','Tầng','Ngày','Coach','Nhắc/tuần','Tự chủ %','Vai giữ','Băng','Kỳ tích'],
      fs.map(function(f){ return [f.id,f.hv,f.lop,f.ph,'T'+f.tier,f.ngay,f.coach,f.nhac,f.tuchu,f.vai+'/9',f.band,f.kyTich]; })
    ), 'text/csv');
  }
  else if(ma==='X3'){                  /* Bảng số một gia đình · CSV */
    var f2 = G.myFamily();
    ok = taiVe(d + '-bang-so-' + U.slug(f2.nha) + '.csv', csv(
      ['Chỉ số','Giá trị','Chuẩn'],
      [['Mức tự chủ', f2.tuchu + '%', 'trên 80% cuối chặng 4'],
       ['Số lần nhắc mỗi tuần', f2.nhac, 'giảm rõ so với mốc đầu năm'],
       ['Vai có người giữ', f2.vai + '/9', 'đủ chín vai'],
       ['Ngày đồng hành', f2.ngay, 'theo tầng ' + f2.tier],
       ['Băng sức khoẻ', f2.band, 'XANH'],
       ['Kỳ tích năm', f2.kyTich, 'có bằng chứng']]
    ), 'text/csv');
  }
  else if(ma==='X4'){                  /* Đội ngũ và KPI · CSV */
    ok = taiVe(d + '-doi-ngu-kpi.csv', csv(
      ['Tài khoản','Họ tên','Vai','KPI %','Ngày mở','Chưa đăng nhập','Trạng thái'],
      (G.TAIKHOAN_KPI||[]).map(function(x){ return [x.u,x.ten,x.vai,x.kpi,x.ngay,x.hd,x.trang]; })
    ), 'text/csv');
  }
  else if(ma==='X5'){                  /* Nhật ký cấp phát · CSV */
    ok = taiVe(d + '-nhat-ky-cap-phat.csv', csv(
      ['Mã bản','Tài liệu','Người nhận','Lúc cấp'],
      ((G.DAU_MAT&&G.DAU_MAT.mau)||[]).map(function(m){ return [m.ma,m.tl,m.ai,m.luc]; })
    ), 'text/csv');
  }

  if(ok){
    U.toast('Đã xuất ' + l.ten + '. Bản này mang mã ' + d + ' và đã ghi vào nhật ký.','ok');
    if(G.secLog) G.secLog('Xuất dữ liệu', l.ten + ' · mã bản ' + d, 'Ghi nhận');
  } else if(ma!=='X1'){
    U.toast('Trình duyệt chặn tải tệp. Thử lại trên bản máy tính hoặc bản web.','err');
  }
};

/* ═══════════════ NÓI VÀO MICRO ═══════════════ */
G.mic = function(){
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var btn = document.getElementById('micBtn'), inp = document.getElementById('aiQ');
  if(!SR){
    U.toast('Trình duyệt này chưa hỗ trợ nhận giọng nói. Anh chị gõ câu hỏi giúp em ạ.','err');
    if(inp) inp.focus();
    return;
  }
  if(G.REC){ try{ G.REC.stop(); }catch(e){} G.REC = null; return; }
  var r = new SR();
  r.lang = (G.LANG==='en') ? 'en-US' : 'vi-VN';
  r.interimResults = true;
  r.continuous = false;
  G.REC = r;
  if(btn){ btn.style.color = '#F87171'; btn.style.borderColor = 'rgba(248,113,113,.6)'; }
  U.toast(G.LANG==='en' ? 'Listening… speak now.' : 'Đang nghe… anh chị nói ạ.','ok');
  r.onresult = function(e){
    var txt = '';
    for(var i=0;i<e.results.length;i++) txt += e.results[i][0].transcript;
    if(inp) inp.value = txt;
    if(e.results[e.results.length-1].isFinal){ G.ask(txt); }
  };
  r.onerror = function(ev){
    U.toast(ev && ev.error==='not-allowed'
      ? 'Trình duyệt chưa cho phép dùng micro. Bật quyền micro rồi thử lại.'
      : 'Chưa nghe rõ. Anh chị thử lại hoặc gõ câu hỏi ạ.','err');
  };
  r.onend = function(){
    G.REC = null;
    var b = document.getElementById('micBtn');
    if(b){ b.style.color = ''; b.style.borderColor = ''; }
  };
  try{ r.start(); }catch(e){ U.toast('Không mở được micro trên trình duyệt này.','err'); }
};

/* ═══════════════ HỘP LỆNH ═══════════════ */
function cmdItems(){
  var out = [];
  G.NAV.forEach(function(g){
    g.items.filter(visible).forEach(function(it){
      out.push({t:G.iname(it), s:G.gname(g)+' · '+G.ihint(it), ic:it.ic, go:it.v});
    });
  });
  return out;
}
function openCmd(){
  var c = document.getElementById('cmd');
  c.classList.add('on');
  var i = c.querySelector('input'); i.value=''; i.focus();
  cmdRender('');
}
function cmdRender(q){
  q = String(q||'').toLowerCase().trim();
  var res = document.getElementById('cmdRes');
  var items = cmdItems().filter(function(x){ return !q || (x.t+' '+x.s).toLowerCase().indexOf(q)>=0; });
  var extra = [];
  if(q.length>1){
    (G.MOTHUC||[]).forEach(function(m){ if(extra.length<5 && m.title.toLowerCase().indexOf(q)>=0)
      extra.push({t:m.title, s:'Mô thức '+m.id, ic:'brain', mt:m.id}); });
    (G.KICHBAN||[]).forEach(function(k){ if(extra.length<10 && String(k.ten||'').toLowerCase().indexOf(q)>=0)
      extra.push({t:k.ten, s:'Kịch bản '+k.ma+' · '+k.tang, ic:'ritual', kb:k.ma}); });
  }
  res.innerHTML = (items.length?'<div class="gh">MÀN HÌNH</div>':'') +
    items.slice(0,8).map(function(x,i){
      return '<button data-go="'+h(x.go)+'" class="'+(i===0?'sel':'')+'">'+ic(x.ic)+
        '<span class="tx"><b>'+h(x.t)+'</b><span>'+h(x.s)+'</span></span></button>';
    }).join('') +
    (extra.length?'<div class="gh">TRONG KHO BÁU VẬT</div>':'') +
    extra.map(function(x){
      return '<button '+(x.mt?'data-mt="'+h(x.mt)+'"':'data-kb="'+h(x.kb)+'"')+'>'+ic(x.ic)+
        '<span class="tx"><b>'+h(x.t)+'</b><span>'+h(x.s)+'</span></span></button>';
    }).join('') +
    (!items.length && !extra.length ? '<div class="gh">Không tìm thấy</div>' : '');
}

/* ═══════════════ SỰ KIỆN ═══════════════ */
function on(sel, fn){
  document.addEventListener('click', function(e){
    var el = e.target.closest && e.target.closest(sel);
    if(el) { e.preventDefault(); fn(el, e); }
  });
}
on('[data-login]', function(el){ doLogin(el.getAttribute('data-login')); });
on('[data-lang]', function(el){ G.setLang(el.getAttribute('data-lang')); });
on('[data-v]', function(el){ G.go(el.getAttribute('data-v')); });
on('[data-go]', function(el){ document.getElementById('cmd').classList.remove('on'); G.go(el.getAttribute('data-go')); });
on('[data-grp]', function(el){
  var id = el.getAttribute('data-grp'), i = G.S.open.indexOf(id);
  if(i>=0) G.S.open.splice(i,1); else G.S.open.push(id);
  document.getElementById('left').innerHTML = leftNav(); save();
});
on('[data-rt]', function(el){
  G.S.rtab = el.getAttribute('data-rt');
  document.getElementById('right').innerHTML = rightPanel(); save();
});
on('[data-switch]', function(el){
  var id = el.getAttribute('data-switch');
  var a = G.ACCOUNTS.filter(function(x){return x.role===id;})[0];
  if(a) doLogin(a.u); else U.toast('Vai này chưa có tài khoản mẫu.','err');
});
on('[data-check]', function(el){
  var k = el.getAttribute('data-check');
  G.S.checks[k] = !G.S.checks[k]; save(); render();
  if(G.S.checks[k]) U.toast('Ghi nhận. Một việc nhỏ làm được hôm nay hơn mười việc định làm.','ok');
});
on('[data-vb]', function(el){ G.vanBanModal(el.getAttribute('data-vb')); });
on('[data-vbn]', function(el){
  var n = el.getAttribute('data-vbn');
  var d = document.querySelectorAll('#main .view .up');
  for(var i=0;i<d.length;i++) if(d[i].textContent.indexOf(n)===0){ d[i].scrollIntoView({behavior:'smooth',block:'start'}); break; }
});
on('[data-th]', function(el){ G.tinhHuongModal(el.getAttribute('data-th')); });
on('[data-thf]', function(el){
  var f = el.getAttribute('data-thf');
  document.querySelectorAll('[data-thf]').forEach(function(b){ b.classList.toggle('on', b===el); });
  document.querySelectorAll('#thList [data-f]').forEach(function(c){
    c.style.display = (f==='ALL' || c.getAttribute('data-f').indexOf(f)>=0) ? '' : 'none'; });
});
on('[data-qf]', function(el){
  var f = el.getAttribute('data-qf');
  document.querySelectorAll('[data-qf]').forEach(function(b){ b.classList.toggle('on', b===el); });
  document.querySelectorAll('#qtList [data-f]').forEach(function(c){
    c.style.display = (f==='ALL' || c.getAttribute('data-f').indexOf(f)>=0) ? '' : 'none'; });
});
on('[data-mood]', function(el){ G.S.mood = el.getAttribute('data-mood'); save(); render(); });
on('[data-kh]', function(el){ G.khoangModal(el.getAttribute('data-kh')); });
on('[data-vai]', function(el){ G.vaiModal(el.getAttribute('data-vai')); });
on('[data-pd]', function(el){ G.phacDoModal(el.getAttribute('data-pd')); });
on('[data-kb]', function(el){ document.getElementById('cmd').classList.remove('on'); G.kichBanModal(el.getAttribute('data-kb')); });
on('[data-mt]', function(el){ document.getElementById('cmd').classList.remove('on'); G.moThucModal(el.getAttribute('data-mt')); });
on('[data-bh]', function(el){ G.baiHocModal(el.getAttribute('data-bh')); });
on('[data-cdopen]', function(el){ G.chanDungModal(el.getAttribute('data-cdopen')); });
on('[data-aiq]', function(el){
  var i = document.getElementById('aiQ'); if(i) i.value = el.getAttribute('data-aiq');
  G.ask(el.getAttribute('data-aiq'));
});
on('[data-sat]', function(el){
  var f = G.FAMILIES.filter(function(x){return x.id===el.getAttribute('data-sat');})[0]; if(!f) return;
  var t = G.tierOf(f.tier);
  U.modal('<div class="row wrap" style="gap:7px;margin-bottom:9px">'+U.chip(t.code+' · '+t.name,t.c)+
    U.chip('Ngày '+f.ngay)+U.chip('Băng '+f.band, G.bandColor(f.band))+'</div>'+
    '<h2 style="font-size:22px;font-weight:800;margin-bottom:6px">'+h(f.nha)+'</h2>'+
    '<p class="sm muted mb">'+h(f.hv)+' · '+h(f.lop)+' · Coach '+h(f.coach)+'</p>'+
    '<div class="grid g2" style="gap:10px">'+
    U.stat({k:'MỨC TỰ CHỦ',v:f.tuchu+'%',d:'',c:'#10B981'})+
    U.stat({k:'VAI CÓ NGƯỜI GIỮ',v:f.vai+'/9',d:'',c:'#8B5CF6'})+'</div>'+
    '<div class="card pad-sm mt"><div class="tiny up muted mb">KỲ TÍCH ĐANG CHẠY</div>'+
    '<p class="sm">'+h(f.kyTich)+'</p></div>');
});
on('[data-dscap]', function(el){
  var c = ((G.DAISU && G.DAISU.capDo)||[])[Number(el.getAttribute('data-dscap'))]; if(!c) return;
  U.modal('<h2 style="font-size:20px;font-weight:800;margin-bottom:12px">'+h(c.ten)+'</h2>'+
    '<div class="card pad-sm mb"><div class="tiny up muted mb">ĐIỀU KIỆN</div><p class="sm" style="line-height:1.7">'+h(c.dieuKien)+'</p></div>'+
    (c.quyenLoi?'<div class="up mb" style="color:var(--gold)">QUYỀN LỢI</div>'+U.list(c.quyenLoi):''));
});
on('[data-cd]', function(el){
  var f = el.getAttribute('data-cd');
  document.querySelectorAll('[data-cd]').forEach(function(b){ b.classList.toggle('on', b===el); });
  document.querySelectorAll('#cdGrid [data-cdi]').forEach(function(c){
    c.style.display = (f==='ALL' || c.getAttribute('data-cdi').indexOf(f)>=0) ? '' : 'none';
  });
});
on('[data-kbf]', function(el){
  var f = el.getAttribute('data-kbf');
  document.querySelectorAll('[data-kbf]').forEach(function(b){ b.classList.toggle('on', b===el); });
  document.querySelectorAll('#kbList [data-f]').forEach(function(c){
    c.style.display = (f==='ALL' || c.getAttribute('data-f').indexOf(f)>=0) ? '' : 'none';
  });
});
on('[data-act]', function(el){
  var a = el.getAttribute('data-act');
  if(a==='do-login') doLogin(document.getElementById('inU').value, document.getElementById('inP').value);
  else if(a==='show-accounts') G.accountsModal();
  else if(a==='scroll-login'){ var c=document.getElementById('loginCard'); if(c) c.scrollIntoView({behavior:'smooth',block:'center'}); }
  else if(a==='logout'){ G.S.acc=null; G.S.role=null; G.S.roleObj=null; save(); gate(); }
  else if(a==='toggle-right'){
    G.S.rightOpen = !G.S.rightOpen;
    document.getElementById('shell').classList.toggle('no-right', !G.S.rightOpen);
    document.getElementById('right').classList.toggle('open', G.S.rightOpen); save();
  }
  else if(a==='toggle-left'){
    document.getElementById('left').classList.toggle('open');
    document.getElementById('scrim').classList.toggle('on');
  }
  else if(a==='cmd') openCmd();
  else if(a==='consent'){ if(G.xinDongY) G.xinDongY(); }
  else if(a==='install') G.install();
  else if(a==='lang'){
    var i = 0; G.LANGS.forEach(function(x,n){ if(x.k===G.LANG) i=n; });
    G.setLang(G.LANGS[(i+1)%G.LANGS.length].k);
  }
  else if(a==='save-vision'){
    document.querySelectorAll('[data-vision]').forEach(function(t){ G.S.vision[t.getAttribute('data-vision')] = t.value; });
    save(); U.toast('Đã lưu bảng tầm nhìn của nhà mình.','ok'); render();
  }
  else if(a==='save-journal'){
    document.querySelectorAll('[data-journal]').forEach(function(t){ G.S.journal[t.getAttribute('data-journal')] = t.value; });
    save(); U.toast('Đã ghi nhật ký tối nay. Bảy tối là có một mô thức.','ok');
  }
  else if(a==='ai-ask') G.ask(document.getElementById('aiQ').value);
  else if(a==='mic') G.mic();
  else if(a==='kb-more'){
    var list = document.getElementById('kbList');
    var kb = G.KICHBAN||[];
    var n = G.S.kbShown; G.S.kbShown = Math.min(kb.length, n+60);
    list.insertAdjacentHTML('beforeend', kb.slice(n, G.S.kbShown).map(G.kbCard).join(''));
    document.getElementById('kbCount').textContent = G.S.kbShown;
  }
  else if(a==='quet-dau'){
    var van = (document.getElementById('quetVan')||{}).value || '';
    var kq = document.getElementById('quetKQ'); if(!kq) return;
    /* Lớp 1: mã hiện · Lớp 2: ký tự rộng bằng không · Lớp 3: vân ngắt dòng */
    var hien = van.match(/GITA[·\u00b7\.\-\s]*[0-9A-F]{4}[·\u00b7\.\-\s]*R\d{2}[·\u00b7\.\-\s]*\d{6}(?:[·\u00b7\.\-\s]*[A-Z0-9]{2})?/i);
    var an = (van.match(/[\u200B\u200C\u200D\uFEFF]/g)||[]).length;
    var van3 = van.split('\n').filter(function(x){return x.trim();}).length;
    var tim = hien ? G.DAU_MAT.mau.filter(function(m){
      return m.ma.replace(/[^0-9A-Za-z]/g,'').toLowerCase()
        .indexOf(hien[0].replace(/[^0-9A-Za-z]/g,'').toLowerCase().slice(4,8)) >= 0; })[0] : null;
    if(!van.trim()){ kq.innerHTML = ''; return; }
    kq.innerHTML = '<div class="card pad-sm" style="border-color:'+(hien||an?'rgba(245,185,66,.4)':'rgba(148,163,184,.3)')+'">'+
      '<div class="up mb" style="color:'+(hien||an?'var(--gold)':'var(--ink-4)')+'">KẾT QUẢ QUÉT</div>'+
      '<div class="stack">'+
      '<div class="sm">Lớp 1 · mã hiện: '+(hien?'<b style="color:var(--gold)">'+U.h(hien[0])+'</b>':'<span class="muted">không thấy</span>')+'</div>'+
      '<div class="sm">Lớp 2 · ký tự ẩn: '+(an?'<b style="color:var(--gold)">'+an+' dấu</b>':'<span class="muted">không thấy</span>')+'</div>'+
      '<div class="sm">Lớp 3 · vân ngắt dòng: <b>'+van3+' dòng</b> — đối chiếu với sơ đồ đã cấp</div>'+
      '</div>'+
      (tim ? '<div class="mt2" style="padding:12px 14px;border-radius:12px;background:rgba(248,113,113,.08);border-left:2px solid var(--bad)">'+
        '<span class="tiny up" style="color:var(--bad)">TRUY ĐƯỢC NGUỒN</span>'+
        '<p class="sm mt"><b>'+U.h(tim.ai)+'</b> · '+U.h(tim.tl)+' · cấp lúc '+U.h(tim.luc)+'</p></div>'
        : (hien||an ? '<p class="sm muted mt">Có dấu nhưng chưa khớp bản nào trong danh sách mẫu. Tra tiếp trong nhật ký cấp phát của máy chủ.</p>'
                    : '<p class="sm muted mt">Đoạn này không mang dấu của GITA 365 — có thể do gõ lại tay, hoặc không phải tài liệu của hệ thống.</p>'))+
      '</div>';
    if(G.secLog) G.secLog('Quét mật mã kín', (hien?'Thấy mã '+hien[0]:'Không thấy mã hiện')+' · '+an+' ký tự ẩn', 'Ghi nhận');
  }
  else if(a==='mo-chuc-nang' || a==='dong-chuc-nang'){
    var vai = el.getAttribute('data-vai'), r = G.roleById(vai);
    if(r.lv <= G.S.roleObj.lv){ U.toast('Luật L4: chỉ mở hoặc đóng được chức năng của vai cấp thấp hơn.','err'); return; }
    U.toast((a==='mo-chuc-nang'?'Đã mở':'Đã đóng')+' chức năng cho '+r.n+'. Thao tác đã ghi vào nhật ký không xoá được.','ok');
    if(G.secLog) G.secLog('Cấp quyền', (a==='mo-chuc-nang'?'Mở':'Đóng')+' chức năng cho vai '+vai, 'Ghi nhận');
  }
  else if(a==='xet-mo') U.toast('Đã chuyển vào hàng chờ xem xét. Trả lời trong ba ngày làm việc theo luật L2.','ok');
  else if(a==='duyet-mo') U.toast('Đã mở lại tài khoản. Hệ thống sẽ rà lại KPI sau 30 ngày.','ok');
  else if(a==='hoan-mo') U.toast('Đã hoãn và gửi yêu cầu bổ sung dữ liệu cho người xin mở.','ok');
  else if(a==='dat-lai') U.toast('Đã thu hồi khoá giải mã và gỡ vai. Dữ liệu gia đình giữ nguyên, không xoá.','ok');
  else if(a==='th-more'){
    var ds = G.TINHHUONG||[], l = document.getElementById('thList');
    var n = G.S.thShown||48; G.S.thShown = Math.min(ds.length, n+48);
    l.insertAdjacentHTML('beforeend', ds.slice(n, G.S.thShown).map(G.thCard).join(''));
    document.getElementById('thCount').textContent = G.S.thShown;
  }
  else if(a==='qt-more'){
    var qs = G.QUA1000||[], lq = document.getElementById('qtList');
    var m = G.S.qtShown||60; G.S.qtShown = Math.min(qs.length, m+60);
    lq.insertAdjacentHTML('beforeend', qs.slice(m, G.S.qtShown).map(G.qtCard).join(''));
    document.getElementById('qtCount').textContent = G.S.qtShown;
  }
  else if(a==='xuat') G.xuat(el.getAttribute('data-ma'));
  else if(a==='in-vanban'){ window.print(); }
  else if(a==='chep-vanban'){
    var m = document.getElementById('vbMau');
    if(m && navigator.clipboard) navigator.clipboard.writeText(m.textContent)
      .then(function(){ U.toast('Đã sao chép mẫu. Bản dán ra ngoài vẫn mang mật mã kín theo người xuất.','ok'); })
      .catch(function(){ U.toast('Trình duyệt chưa cho phép sao chép.','err'); });
  }
  else if(a==='mo-fb'){
    var fb = (G.LIENKET&&G.LIENKET.facebook)||'';
    if(!fb){ U.toast('Chưa đặt đường dẫn group. Sửa ở G.LIENKET.facebook.','err'); return; }
    if(G.secLog) G.secLog('Mở group Facebook', 'Kèm mã giới thiệu của tài khoản đang đăng nhập', 'Ghi nhận');
    window.open(fb, '_blank', 'noopener');
  }
  else if(a==='mo-tg'){
    var tg = (G.LIENKET&&G.LIENKET.telegram)||'';
    if(!tg){ U.toast('Chưa đặt đường dẫn Telegram.','err'); return; }
    window.open(tg, '_blank', 'noopener');
  }
  else if(a==='kiem-ban-moi'){
    U.toast('Đang kiểm bản mới…','ok');
    fetch('manifest.webmanifest', {cache:'no-store'})
      .then(function(){ U.toast('Đang dùng bản mới nhất · v'+G.META.version+'. Kho đã cấp phép nằm sẵn trong máy.','ok'); })
      .catch(function(){ U.toast('Chưa có mạng. Ứng dụng vẫn chạy đủ bằng dữ liệu trong máy.','err'); });
  }
  else if(a==='doi-qua') U.toast('Đã ghi nhận. Quà sẽ được gửi sau khi coach xác nhận bằng chứng của mốc này.','ok');
  else if(a==='join-cuhich') U.toast('Đã ghi nhận. Coach sẽ mở cú hích này cùng nhà mình ở buổi gần nhất.','ok');
  else if(a==='join-event') U.toast('Đã giữ chỗ. Thư xác nhận sẽ tới hộp thư của anh chị.','ok');
  else if(a==='upload') U.toast('Nối với kho Drive của hệ thống GITA 365 để bật tính năng gửi tệp.','err');
});
document.addEventListener('input', function(e){
  var s = e.target.getAttribute && e.target.getAttribute('data-search');
  if(s){
    var q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('[data-s]').forEach(function(c){
      c.style.display = (!q || c.getAttribute('data-s').indexOf(q)>=0) ? '' : 'none';
    });
  }
  if(e.target.id==='cmdIn') cmdRender(e.target.value);
});
document.addEventListener('keydown', function(e){
  if((e.ctrlKey||e.metaKey) && e.key && e.key.toLowerCase()==='k'){ e.preventDefault(); if(G.S.acc) openCmd(); }
  if(e.key==='Escape'){ U.closeModal(); document.getElementById('cmd').classList.remove('on'); closeMobile(); }
  if(e.key==='Enter' && e.target.id==='inP') doLogin(document.getElementById('inU').value, e.target.value);
  if(e.key==='Enter' && e.target.id==='aiQ') G.ask(e.target.value);
  if(e.key==='Enter' && e.target.id==='cmdIn'){
    var b = document.querySelector('#cmdRes button'); if(b) b.click();
  }
});
document.addEventListener('click', function(e){
  if(e.target.id==='scrim') closeMobile();
  if(e.target.classList && e.target.classList.contains('bd')){
    U.closeModal(); document.getElementById('cmd').classList.remove('on');
  }
});

/* ═══════════════ HẠT SÁNG ═══════════════ */
function sparks(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for(var i=0;i<14;i++){
    var s = document.createElement('i');
    s.className = 'spark';
    s.style.left = (Math.random()*100)+'vw';
    s.style.top = (100+Math.random()*20)+'vh';
    s.style.animationDuration = (12+Math.random()*16)+'s';
    s.style.animationDelay = (Math.random()*18)+'s';
    s.style.opacity = 0;
    if(i%3===0) s.style.background = '#8B5CF6', s.style.boxShadow = '0 0 12px 2px rgba(139,92,246,.8)';
    if(i%4===0) s.style.background = '#10B981', s.style.boxShadow = '0 0 12px 2px rgba(16,185,129,.8)';
    document.body.appendChild(s);
  }
}

/* ═══════════════ PHẠM VI CẤP PHÉP THEO MÀN HÌNH ═══════════════
   Màn hình nào cần gói nội dung nào. Không có gói thì hiện màn hình
   xin cấp phép, không hiện nội dung. */
var GOI_NGHE = ['kho','phac-do','kich-ban','mo-thuc','sach','ngon-tu','tro-ly','diem-cham',
  'tuvan-deck','hai-long','tai-lieu-khach','kiem-thu','chuan-1000','ai-dieu-phoi',
  'an-toan-du-lieu','hoc-tu-lon','tang-quyen','vong-doi-tk','hang-tai-lieu','dau-mat','dong-chay',
  'tinh-huong','bando-tuvan','bando-coach','van-ban','tai-chinh-qt','thanh-tra',
  'ra-soat-kh','xuat-du-lieu','quy-trinh-tc',
  'referral','chan-dung-kh','do-luong-kh','hang-vip','cay-tien','nhan-su-tt'];
var GOI_MO = ['toi','bat-dau'];
/* Bộ test nhận diện nằm trong gói theo tầng: khách hàng đã được cấp phép
   tầng nào thì làm được bài của tầng đó, không cần quyền nghề. */
var GOI_RIENG = { 'bo-test':'tang1' };
G.goiCanCho = function(v){
  if(GOI_MO.indexOf(v) >= 0) return null;
  if(GOI_RIENG[v]) return GOI_RIENG[v];
  return GOI_NGHE.indexOf(v) >= 0 ? 'nghe' : 'nen';
};
G.coGoi = function(g){ return !g || G.KHO.daNap.indexOf(g) >= 0; };

/* ═══════════════ CÀI ĐẶT ỨNG DỤNG (PWA) ═══════════════ */
window.addEventListener('beforeinstallprompt', function(e){
  e.preventDefault(); G.INSTALL = e;
  if(G.S.acc){ var t = document.getElementById('top'); if(t) t.innerHTML = topBar(); }
});
window.addEventListener('appinstalled', function(){
  G.INSTALL = null;
  U.toast('Đã cài GITA 365 vào máy. Mở được cả khi không có mạng.','ok');
});
G.install = function(){
  if(!G.INSTALL){
    U.modal('<h2 style="font-size:20px;font-weight:800;margin-bottom:10px">Cài GITA 365 vào máy</h2>'+
      '<p class="sm dim mb" style="line-height:1.7">Cài xong, GITA 365 chạy như một ứng dụng thật: có biểu tượng riêng, mở toàn màn hình, '+
      'và dùng được cả khi không có mạng vì toàn bộ kho tri thức đã nằm trong máy.</p>'+
      '<div class="grid g3" style="gap:12px">'+
      [['Android · Chrome','Mở trình đơn ⋮ → <b>Thêm vào màn hình chính</b> → Cài đặt.'],
       ['iPhone · iPad · Safari','Bấm nút Chia sẻ → <b>Thêm vào MH chính</b> → Thêm.'],
       ['Máy tính · Chrome, Edge','Bấm biểu tượng cài đặt ở thanh địa chỉ, hoặc trình đơn → <b>Cài đặt GITA 365</b>.']
      ].map(function(x){ return '<div class="card pad-sm"><b class="sm" style="display:block;margin-bottom:6px">'+U.h(x[0])+'</b>'+
        '<p class="tiny muted" style="line-height:1.6">'+x[1]+'</p></div>'; }).join('')+'</div>'+
      '<p class="tiny muted mt2">Bản web luôn dùng được ngay mà không cần cài — cùng một tài khoản, cùng một dữ liệu.</p>');
    return;
  }
  G.INSTALL.prompt();
  G.INSTALL.userChoice.then(function(r){
    if(r && r.outcome==='accepted') U.toast('Đang cài GITA 365 vào máy…','ok');
    G.INSTALL = null;
  });
};

window.addEventListener('hashchange', function(){
  var v = location.hash.replace('#','');
  if(v && G.VIEWS[v] && G.S.acc && v!==G.S.view) G.go(v);
});

/* ═══════════════ KHỞI ĐỘNG ═══════════════ */
G.boot = function(){
  sparks();
  try{ var lg = localStorage.getItem('gita365.lang'); if(lg && G.UI[lg]) G.LANG = lg; }catch(e){}
  /* Trên màn hình hẹp, thanh phải mở dạng ngăn kéo — đóng sẵn để không che nội dung */
  if(window.innerWidth < 1180) G.S.rightOpen = false;
  var d = load();
  if(d && d.u){
    var a = G.ACCOUNTS.concat(G.AUDITORS).filter(function(x){return x.u===d.u;})[0];
    if(a){
      G.S.acc=a; G.S.role=a.role; G.S.roleObj=G.roleById(a.role);
      var hv = location.hash.replace('#','');
      if(hv && G.VIEWS[hv]) G.S.view = hv;
      manCho('Đang mở kho theo phạm vi được cấp phép…');
      G.napKho().then(function(){ shell(); });
      return;
    }
  }
  gate();
};
})();
