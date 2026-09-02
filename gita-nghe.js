/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÃ CỦA GÓI NGHỀ · 16 TỆP

   TỆP NÀY DỰNG RA, KHÔNG PHẢI MÃ NGUỒN. Sửa trong src/ rồi chạy:
   node tools/gop-src.js

   Tệp này KHÔNG nằm trong index.html và KHÔNG nằm trong danh sách
   đệm ngoại tuyến. Nó chỉ được nạp sau khi đăng nhập, và chỉ khi
   giấy phép có gói nghề — cùng lúc với gói kho nghề, cùng một điều
   kiện. Máy của gia đình không bao giờ hỏi tới nó.
   ═══════════════════════════════════════════════════════════════ */

/* ═════════ src/views6.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.1 — HỆ QUẢN TRỊ
   Tầng quyền · vòng đời tài khoản · xếp hạng tài liệu ·
   mật mã kín · dòng chảy thông tin
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};
(function(){
var U = G.U, h = U.h, ic = U.ic;

/* ═══════════════ TẦNG QUYỀN TRUY CẬP ═══════════════ */
G.VIEWS['tang-quyen'] = function(){
  if(!G.can('sys_manage_user')) return U.lockCard();
  var perms = Object.keys(G.PERM);
  var o = U.ph({eyebrow:'NHÓM 05 · QUẢN TRỊ', ic:'lock', grad:1, t:'Tầng quyền truy cập',
    lead:'Mười lăm vai, hai mươi mốt quyền, một nguồn sự thật duy nhất. Cấp bậc càng nhỏ càng nhiều quyền — và không ai mở được quyền cho chính mình.'});

  var toi = G.S.roleObj;
  o += '<div class="card glow mb"><div class="row wrap" style="gap:16px;align-items:center">'+
    '<span style="width:46px;height:46px;border-radius:14px;display:grid;place-items:center;font-weight:900;'+
    'background:'+toi.c+'22;color:'+toi.c+';flex:none">'+h(toi.id)+'</span>'+
    '<div class="grow" style="min-width:230px"><b style="font-size:16px;display:block">'+h(toi.n)+' · cấp '+toi.lv+'</b>'+
    '<p class="sm muted mt">Anh chị mở hoặc đóng được chức năng của <b style="color:var(--ink)">'+
    G.ROLES.filter(function(r){return r.lv>toi.lv;}).length+' vai cấp thấp hơn</b>. '+
    'Không mở được cho vai ngang cấp hay cao hơn — đây là luật L4, chốt chặn chống lạm quyền từ bên trong.</p></div></div></div>';

  o += U.sec('MA TRẬN QUYỀN · 15 VAI × 21 QUYỀN','Ô sáng là được dùng. Máy chủ luôn kiểm lại trước khi ghi, client chỉ ẩn hiện nút.');
  o += '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Quyền</th><th>Cấp tối đa</th>'+
    G.ROLES.map(function(r){ return '<th style="text-align:center;font-size:9px;color:'+r.c+'">'+h(r.id)+'</th>'; }).join('')+
    '</tr></thead><tbody>' + perms.map(function(p){
      var lv = G.PERM[p];
      return '<tr><td><span class="mono sm">'+h(p)+'</span></td>'+
        '<td><span class="mono">'+lv+'</span></td>'+
        G.ROLES.map(function(r){
          var ok = r.lv <= lv;
          return '<td style="text-align:center;padding:6px">'+
            (ok ? '<span style="display:inline-block;width:9px;height:9px;border-radius:3px;background:'+r.c+';box-shadow:0 0 8px '+r.c+'99"></span>'
                : '<span style="display:inline-block;width:9px;height:9px;border-radius:3px;background:var(--phu-3)"></span>')+'</td>';
        }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';

  o += U.sec('MỞ VÀ ĐÓNG CHỨC NĂNG THEO TÀI KHOẢN','Chỉ hiện những vai thấp hơn cấp của anh chị');
  o += '<div class="grid g3">' + G.ROLES.filter(function(r){return r.lv > toi.lv;}).map(function(r){
    var so = Object.keys(G.PERM).filter(function(p){ return r.lv <= G.PERM[p]; }).length;
    return '<div class="card pad-sm" style="border-color:'+r.c+'26">'+
      '<div class="row" style="gap:9px;margin-bottom:7px">'+
      '<span style="width:30px;height:30px;border-radius:9px;display:grid;place-items:center;font-weight:900;font-size:10.5px;background:'+r.c+'22;color:'+r.c+'">'+h(r.id)+'</span>'+
      '<div class="grow" style="min-width:0"><b class="sm" style="display:block">'+h(r.n)+'</b>'+
      '<span class="tiny muted">cấp '+r.lv+' · '+so+' quyền</span></div></div>'+
      '<div class="row" style="gap:6px"><button class="btn ghost sm grow" data-act="mo-chuc-nang" data-vai="'+h(r.id)+'">Mở</button>'+
      '<button class="btn ghost sm grow" data-act="dong-chuc-nang" data-vai="'+h(r.id)+'">Đóng</button></div></div>';
  }).join('') + '</div>';

  o += '<div class="card mt2" style="border-color:rgba(248,113,113,.3)">'+
    '<div class="row mb"><span style="color:var(--bad)">'+ic('shield','w-4 h-4')+'</span><b>Luật L4 — quyền chỉ mở xuống</b></div>'+
    '<p class="sm muted">'+h(G.LUAT_TK[3].luat)+' '+h(G.LUAT_TK[3].canhBao)+'</p></div>';
  return o;
};

/* ═══════════════ VÒNG ĐỜI TÀI KHOẢN THEO KPI ═══════════════ */
G.VIEWS['vong-doi-tk'] = function(){
  if(!G.can('sys_manage_user')) return U.lockCard();
  var ds = G.TAIKHOAN_KPI;
  var khoa = ds.filter(function(x){return x.trang.indexOf('Đã khoá')===0;}).length;
  var sap  = ds.filter(function(x){return x.trang.indexOf('Sắp khoá')===0;}).length;
  var reset= ds.filter(function(x){return x.trang.indexOf('Chờ đặt lại')===0;}).length;
  var o = U.ph({eyebrow:'NHÓM 05 · QUẢN TRỊ', ic:'pulse', grad:1, t:'Vòng đời tài khoản',
    lead:'Tài khoản mở ra là một cánh cửa vào kho tri thức. Cửa không ai đi qua thì phải đóng — không phải để phạt, mà để hỏi xem chuyện gì đang xảy ra.'});

  o += '<div class="grid g4 mb">'+
    U.stat({k:'ĐANG HOẠT ĐỘNG', v:ds.filter(function(x){return x.trang==='Hoạt động';}).length, d:'KPI đạt chuẩn', c:'#0B7350'})+
    U.stat({k:'SẮP KHOÁ', v:sap, d:'KPI dưới 30% · gần mốc 90 ngày', c:'#BE0E16'})+
    U.stat({k:'ĐÃ KHOÁ', v:khoa, d:'theo luật L1', c:'#BE0E16'})+
    U.stat({k:'CHỜ ĐẶT LẠI', v:reset, d:'không hoạt động trên 180 ngày · L3', c:'#5140B4'})+
  '</div>';

  o += U.sec('NĂM LUẬT VÒNG ĐỜI','Ba luật chạy tự động, hai luật cần người xem xét');
  o += '<div class="grid g2">' + G.LUAT_TK.map(function(l){
    return '<div class="card" style="border-color:'+l.c+'2a">'+
      '<div class="row wrap" style="gap:8px;margin-bottom:8px">'+U.chip(l.ma,l.c)+
      U.chip(l.tuDong?'Tự động':'Cần người xem xét', l.tuDong?'#0B7350':'#BE0E16')+'</div>'+
      '<b style="font-size:14.5px;display:block;margin-bottom:8px;color:'+l.c+'">'+h(l.ten)+'</b>'+
      '<p class="sm dim" style="line-height:1.6;margin-bottom:10px">'+h(l.luat)+'</p>'+
      '<div style="padding:11px 13px;border-radius:12px;background:'+l.c+'0d;border-left:2px solid '+l.c+'">'+
      '<span class="tiny up" style="color:'+l.c+'">VÌ SAO</span><p class="sm mt">'+h(l.viSao)+'</p></div>'+
      '<div class="sm mt" style="color:var(--warn);display:flex;gap:8px"><span style="flex:none;margin-top:3px">⚠</span>'+
      '<span>'+h(l.canhBao)+'</span></div></div>';
  }).join('') + '</div>';

  o += U.sec('BẢNG TÀI KHOẢN','KPI hoạt động · ngày mở · số ngày chưa đăng nhập');
  o += U.tbl(['Tài khoản','Vai','KPI','Ngày mở','Chưa vào','Trạng thái','Việc'],
    ds.slice().sort(function(a,b){return a.kpi-b.kpi;}).map(function(x){
      var r = G.roleById(x.vai);
      var c = x.kpi>=70?'#0B7350':(x.kpi>=30?'#BE0E16':'#BE0E16');
      var kh = x.trang.indexOf('Đã khoá')===0, rs = x.trang.indexOf('Chờ')===0, sp = x.trang.indexOf('Sắp')===0;
      return ['<b class="sm">'+h(x.ten)+'</b><div class="tiny muted mono">'+h(x.u)+'</div>',
        U.chip(r.short, r.c),
        '<div style="min-width:92px">'+U.bar(x.kpi,c)+'<span class="tiny mono" style="color:'+c+'">'+x.kpi+'%</span></div>',
        '<span class="mono sm">'+x.ngay+'</span>',
        '<span class="mono sm"'+(x.hd>150?' style="color:var(--bad)"':(x.hd>30?' style="color:var(--warn)"':''))+'>'+x.hd+'</span>',
        '<span class="chip" style="color:'+(kh?'var(--bad)':(rs?'#A78BFA':(sp?'var(--warn)':'var(--ok)')))+
          ';border-color:currentColor">'+h(x.trang)+'</span>',
        kh ? '<button class="btn ghost sm" data-act="xet-mo" data-u="'+h(x.u)+'">Xét mở</button>'
           : (rs ? '<button class="btn ghost sm" data-act="dat-lai" data-u="'+h(x.u)+'">Đặt lại</button>'
                 : '<span class="tiny muted">—</span>')];
    }));

  o += U.sec('YÊU CẦU MỞ LẠI','Xem xét trong ba ngày làm việc · lần thứ ba trong năm phải do Giám đốc duyệt');
  o += G.YEUCAU_MO.map(function(y){
    var ba = y.lan >= 3;
    return '<div class="card mb" style="border-color:'+(ba?'rgba(248,113,113,.3)':'var(--gita-mo-3)')+'">'+
      '<div class="row wrap" style="gap:9px;margin-bottom:9px">'+
      '<b>'+h(y.ten)+'</b><span class="mono tiny muted">'+h(y.u)+'</span>'+
      U.chip('Lần '+y.lan, ba?'#BE0E16':'var(--gita)')+
      '<span class="tiny muted mono">'+h(y.ngay)+'</span></div>'+
      '<p class="serif" style="font-size:15px;font-style:italic;line-height:1.6;color:var(--ink)">"'+h(y.ly)+'"</p>'+
      '<div class="mt2" style="padding:11px 13px;border-radius:12px;background:var(--phu-2)">'+
      '<span class="tiny up muted">ĐỀ XUẤT CỦA HỆ THỐNG</span><p class="sm mt">'+h(y.dx)+'</p></div>'+
      '<div class="row mt2" style="gap:8px">'+
      '<button class="btn pri sm" data-act="duyet-mo" data-u="'+h(y.u)+'">Đồng ý mở</button>'+
      '<button class="btn ghost sm" data-act="hoan-mo" data-u="'+h(y.u)+'">Hoãn · xin thêm dữ liệu</button>'+
      (ba?'<span class="chip" style="color:var(--bad);border-color:rgba(248,113,113,.4)">Cần Giám đốc duyệt</span>':'')+
      '</div></div>';
  }).join('');
  return o;
};

/* ═══════════════ XẾP HẠNG TÀI LIỆU 1–100 ═══════════════ */
G.VIEWS['hang-tai-lieu'] = function(){
  if(!G.can('pro_consult')) return U.lockCard();
  var H = G.HANG_TL, toi = G.S.roleObj;
  var kpiToi = 88;   /* thay bằng KPI thật của tài khoản khi nối máy chủ */
  var o = U.ph({eyebrow:'NHÓM 05 · QUẢN TRỊ', ic:'crown', grad:1, t:'Xếp hạng tài liệu',
    lead:H.cot});

  o += '<div class="card glow mb"><div class="row wrap" style="gap:24px;align-items:center">'+
    U.ring(kpiToi, 'var(--gita)', 'KPI CỦA TÔI')+
    '<div class="grow" style="min-width:250px">'+
    '<div class="up muted">VAI VÀ CẤP ĐANG GIỮ</div>'+
    '<b style="font-size:18px;display:block;margin:3px 0 6px;color:'+toi.c+'">'+h(toi.n)+' · cấp '+toi.lv+'</b>'+
    '<p class="sm dim">Với cấp '+toi.lv+' và KPI '+kpiToi+'%, anh chị đang mở được <b style="color:var(--gold-ink)">'+
    H.bac.filter(function(b){return toi.lv<=b.lv && kpiToi>=b.kpi;}).length+' / '+H.bac.length+' bậc tài liệu</b>. '+
    'Lên bậc nghề hoặc nâng KPI là mở thêm — không có đường tắt nào khác.</p></div></div></div>';

  o += U.sec('SÁU BẬC TÀI LIỆU','Điểm càng cao, điều kiện nhận càng chặt');
  o += H.bac.map(function(b){
    var mo = toi.lv <= b.lv && kpiToi >= b.kpi;
    return '<div class="card mb '+(mo?'':'')+'" style="border-color:'+b.c+(mo?'55':'1a')+';'+(mo?'':'opacity:.72')+'">'+
      '<div class="row wrap" style="gap:11px;margin-bottom:10px">'+
      '<span class="pill" style="background:'+b.c+'22;color:'+b.c+'">'+b.tu+' – '+b.den+' ĐIỂM</span>'+
      '<b style="font-size:16px;color:'+b.c+'">'+h(b.ten)+'</b>'+
      '<span class="grow"></span>'+
      (mo ? '<span class="chip on">'+ic('check','w-3 h-3')+' đang mở</span>'
          : '<span class="chip">'+ic('lock','w-3 h-3')+' chưa đủ điều kiện</span>')+'</div>'+
      '<p class="sm dim" style="line-height:1.6;margin-bottom:11px">'+h(b.mo)+'</p>'+
      '<div class="grid g2" style="gap:12px;margin-bottom:11px">'+
        '<div style="padding:11px 13px;border-radius:12px;background:var(--phu-2)">'+
        '<span class="tiny up muted">ĐIỀU KIỆN CẤP BẬC</span>'+
        '<p class="sm mt">Cấp '+b.lv+' trở lên'+(toi.lv<=b.lv?' <span style="color:var(--ok)">✓ đạt</span>':' <span style="color:var(--bad)">✕ chưa đạt</span>')+'</p></div>'+
        '<div style="padding:11px 13px;border-radius:12px;background:var(--phu-2)">'+
        '<span class="tiny up muted">ĐIỀU KIỆN KPI</span>'+
        '<p class="sm mt">Từ '+b.kpi+'% trở lên'+(kpiToi>=b.kpi?' <span style="color:var(--ok)">✓ đạt</span>':' <span style="color:var(--bad)">✕ chưa đạt</span>')+'</p></div>'+
      '</div>'+
      '<div class="row wrap" style="gap:5px">'+b.vd.map(function(x){return U.chip(x, mo?b.c:null);}).join('')+'</div></div>';
  }).join('');

  o += U.sec('MƯỜI TÀI LIỆU TIÊU BIỂU','Sắp theo điểm — cùng một vai, người cấp cao hơn nhận tài liệu hay hơn');
  o += U.tbl(['Mã','Tài liệu','Điểm','Bậc','Cấp cần','KPI cần','Với anh chị'],
    H.vd.map(function(t){
      var b = H.bac.filter(function(x){return t.diem>=x.tu && t.diem<=x.den;})[0] || H.bac[0];
      var mo = toi.lv <= t.lv && kpiToi >= t.kpi;
      return ['<span class="mono sm">'+h(t.ma)+'</span>',
        '<span class="sm">'+h(t.ten)+'</span>',
        '<b class="mono" style="color:'+b.c+'">'+t.diem+'</b>',
        U.chip(t.hang, b.c),
        '<span class="mono sm">'+t.lv+'</span>',
        '<span class="mono sm">'+t.kpi+'%</span>',
        mo?'<span class="chip on">đang mở</span>':'<span class="chip">'+ic('lock','w-3 h-3')+'</span>'];
    }));

  o += '<div class="card mt2" style="border-color:var(--gita-vien-1)">'+
    '<div class="row mb"><span style="color:var(--gold-ink)">'+ic('shield','w-4 h-4')+'</span><b>Luật L5 — thăng cấp mới mở tài liệu tương ứng</b></div>'+
    '<p class="sm muted">'+h(G.LUAT_TK[4].viSao)+' '+h(G.LUAT_TK[4].canhBao)+'</p></div>';
  return o;
};

/* ═══════════════ MẬT MÃ KÍN ═══════════════ */
G.VIEWS['dau-mat'] = function(){
  if(!G.can('pro_approve')) return U.lockCard();
  var D = G.DAU_MAT;
  var o = U.ph({eyebrow:'NHÓM 05 · QUẢN TRỊ', ic:'shield', grad:1, t:'Mật mã kín trên tài liệu',
    lead:D.cot});

  o += '<div class="card mb" style="border-color:var(--gita-vien-1)">'+
    '<div class="row"><span style="color:var(--gold-ink)">'+ic('lock','w-4 h-4')+'</span><b>Cấu trúc mã</b></div>'+
    '<p class="mono mt" style="font-size:15px;color:var(--gold-2);letter-spacing:.04em">'+h(D.cauTruc)+'</p></div>';

  o += U.sec('NĂM LỚP MÃ','Xoá được lớp này vẫn còn lớp kia — muốn xoá sạch phải gõ lại toàn bộ tài liệu');
  o += '<div class="grid g2">' + D.lop.map(function(l,i){
    return '<div class="card pad-sm" style="border-color:'+l.c+'26">'+
      '<div class="row" style="gap:9px;margin-bottom:6px">'+
      '<span class="pill" style="background:'+l.c+'22;color:'+l.c+'">LỚP '+(i+1)+'</span>'+
      '<b class="sm">'+h(l.t)+'</b></div>'+
      '<p class="tiny muted" style="line-height:1.6">'+h(l.d)+'</p></div>';
  }).join('') + '</div>';

  o += U.sec('QUÉT MỘT ĐOẠN VĂN','Dán đoạn nghi ngờ vào đây — hệ thống dò cả ba lớp mã và trả về tài khoản đã nhận bản đó');
  o += '<div class="card">'+
    '<textarea id="quetVan" rows="5" placeholder="Dán đoạn văn bản nghi ngờ bị rò ra ngoài…" '+
    'style="width:100%;background:var(--phu-2);border:1px solid var(--line);border-radius:12px;'+
    'padding:12px;font-size:13px;line-height:1.6;resize:vertical;outline:none"></textarea>'+
    '<button class="btn pri mt" data-act="quet-dau">'+ic('search')+'Quét mật mã kín</button>'+
    '<div id="quetKQ" class="mt2"></div>'+
    '<p class="tiny muted mt">'+h(D.quet)+'</p></div>';

  o += U.sec('BẢN ĐÃ CẤP GẦN ĐÂY','Mỗi bản một mã riêng, truy được về đúng người và đúng giờ');
  o += U.tbl(['Mã bản','Tài liệu','Người nhận','Lúc cấp'], D.mau.map(function(m){
    return ['<span class="mono sm" style="color:var(--gold-ink)">'+h(m.ma)+'</span>',
      '<span class="sm">'+h(m.tl)+'</span>','<span class="sm">'+h(m.ai)+'</span>',
      '<span class="mono tiny muted">'+h(m.luc)+'</span>'];
  }));
  return o;
};

/* ═══════════════ DÒNG CHẢY THÔNG TIN ═══════════════ */
G.VIEWS['dong-chay'] = function(){
  if(!G.can('pro_report')) return U.lockCard();
  var Q = G.QUYTRINH;
  var o = U.ph({eyebrow:'NHÓM 05 · QUẢN TRỊ', ic:'orbit', grad:1, t:'Dòng chảy thông tin',
    lead:Q.cot});

  o += Q.dong.map(function(d){
    return '<div class="card lift mb" style="border-color:'+d.c+'2e">'+
      '<div class="row wrap" style="gap:11px;margin-bottom:12px">'+
      '<span style="width:36px;height:36px;border-radius:12px;display:grid;place-items:center;font-weight:900;'+
      'background:'+d.c+'22;color:'+d.c+'">'+d.no+'</span>'+
      '<b style="font-size:16px;color:'+d.c+'">'+h(d.ten)+'</b></div>'+
      '<div class="row wrap" style="gap:10px;align-items:center;margin-bottom:12px">'+
        '<div style="flex:1;min-width:150px;padding:11px 13px;border-radius:12px;background:var(--phu-2)">'+
        '<span class="tiny up muted">TỪ</span><p class="sm mt">'+h(d.tu)+'</p></div>'+
        '<span style="color:'+d.c+'">'+ic('arrow','w-4 h-4')+'</span>'+
        '<div style="flex:1.4;min-width:180px"><div class="row wrap" style="gap:5px">'+
        d.qua.map(function(x){return U.chip(x,d.c);}).join('')+'</div></div>'+
        '<span style="color:'+d.c+'">'+ic('arrow','w-4 h-4')+'</span>'+
        '<div style="flex:1;min-width:150px;padding:11px 13px;border-radius:12px;background:'+d.c+'12">'+
        '<span class="tiny up" style="color:'+d.c+'">ĐẾN</span><p class="sm mt">'+h(d.den)+'</p></div>'+
      '</div>'+
      '<div class="grid g2" style="gap:12px">'+
        '<div><span class="tiny up muted">ĐO BẰNG GÌ</span><p class="sm mt" style="line-height:1.55">'+h(d.do)+'</p></div>'+
        '<div style="padding:11px 13px;border-radius:12px;background:rgba(248,113,113,.06);border:1px solid rgba(248,113,113,.2)">'+
        '<span class="tiny up" style="color:var(--bad)">TẮC KHI NÀO</span>'+
        '<p class="sm mt" style="line-height:1.55">'+h(d.tac)+'</p></div>'+
      '</div></div>';
  }).join('');

  o += U.sec('VÒNG QUẢN TRỊ','Ai nhìn gì, theo nhịp nào — ban lãnh đạo không phải đọc từng màn hình');
  o += U.tbl(['Nhịp','Việc rà soát','Người chịu trách nhiệm'], Q.vongQuanTri.map(function(v){
    return ['<b class="sm">'+h(v.ky)+'</b>','<span class="sm">'+h(v.viec)+'</span>',
      '<span class="chip">'+h(v.ai)+'</span>'];
  }));
  return o;
};
})();

})();

/* ═════════ src/views8.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.2 — BỘ TEST NHẬN DIỆN 5 TẦNG · KPI 10 ĐIỂM VỀ ĐÍCH
   25 bộ · 750 câu · mỗi câu 4 lựa chọn quy ước điểm cho 4 nhóm
   khách hàng. Chấm xong là ra nhóm, ra cảnh báo, ra lộ trình và
   ra đúng bộ tài liệu cần gửi.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};
(function(){
var U = G.U, h = U.h, ic = U.ic;

/* ─────────── Tiện ích chấm bài ─────────── */
function boTest(ma){ return (G.TEST750||[]).filter(function(b){return b.ma===ma;})[0]; }

/* Điểm miền = trung bình mức đã chọn của các câu thuộc miền, quy về thang 100
   theo (trung bình − 1) ÷ 3 × 100. Điểm bài = trung bình điểm các miền. */
G.chamTest = function(b, dap){
  var mien = {}, tong = 0, dem = 0;
  b.mien.forEach(function(m){
    var cs = b.cau.filter(function(c){ return c.mien===m && dap[c.id]; });
    if(!cs.length){ mien[m] = null; return; }
    var tb = cs.reduce(function(a,c){ return a + U.num(dap[c.id]); },0) / cs.length;
    var d = Math.round((tb - 1) / 3 * 100);
    mien[m] = U.clamp(d,0,100); tong += mien[m]; dem++;
  });
  var diem = dem ? Math.round(tong/dem) : 0;
  var nhom = b.nhom.filter(function(n){ return diem >= n.min && diem <= n.max; })[0] || b.nhom[0];
  return { mien:mien, diem:diem, nhom:nhom, canhBao: canhBao(b, mien) };
};

/* Cảnh báo viết dưới dạng domain('tên miền') < 33 [AND domain('...') >= 58].
   Chỉ đọc đúng dạng đó, không eval bất cứ thứ gì. */
function canhBao(b, mien){
  var ra = [];
  (b.canhBao||[]).forEach(function(cb){
    var ve = String(cb['if']||'').split(/\s+(?:AND|and)\s+/);
    var dung = ve.length > 0;
    ve.forEach(function(v){
      var m = v.match(/domain\('([^']+)'\)\s*(<|>=|<=|>)\s*(\d+)/);
      if(!m){ dung = false; return; }
      var d = mien[m[1]];
      if(d === null || d === undefined){ dung = false; return; }
      var n = U.num(m[3]), op = m[2];
      var ok = op==='<' ? d<n : op==='<=' ? d<=n : op==='>' ? d>n : d>=n;
      if(!ok) dung = false;
    });
    if(dung) ra.push(cb);
  });
  return ra;
}

/* Miền yếu nhất trước — đó là nơi cần chạm đầu tiên. */
function mienYeu(kq){
  return Object.keys(kq.mien)
    .filter(function(m){ return kq.mien[m] !== null && kq.mien[m] < 58; })
    .sort(function(a,b){ return kq.mien[a] - kq.mien[b]; });
}

/* Gợi ý tài liệu: chọn theo độ trùng từ khoá giữa tên miền yếu và tên tài liệu.
   Không đoán bừa — không trùng từ nào thì không gợi ý. */
var BO_TU = ['và','của','trong','khi','cho','với','các','những','một','có','là','ra','về',
  'mức','độ','khả','năng','cách','sự','thì','đã','được','theo','từ','đến','sau','trước','hơn'];
function tu(s){
  return String(s||'').toLowerCase().replace(/[^a-zà-ỹ\s]/gi,' ').split(/\s+/)
    .filter(function(t){ return t.length>2 && BO_TU.indexOf(t)<0; });
}
function hop(a, b){
  var A = tu(a), B = tu(b), n = 0;
  A.forEach(function(t){ if(B.indexOf(t)>=0) n++; });
  return n;
}
function goiTaiLieu(b, yeu){
  var kho = (G.QUA1000||[]).filter(function(q){ return q.tang===b.tang; });
  if(!kho.length || !yeu.length) return [];
  var ds = kho.map(function(q){
    var d = 0;
    yeu.forEach(function(m,i){ d += hop(m, q.ten+' '+q.nhom+' '+q.nv) * (yeu.length-i); });
    return { q:q, d:d };
  }).filter(function(x){ return x.d > 0; });
  ds.sort(function(x,y){ return y.d - x.d; });
  return G.dsHet(ds,8).map(function(x){ return x.q; });
}
function goiPhacDo(yeu){
  var kho = G.PHACDO || [];
  if(!kho.length || !yeu.length) return [];
  var ds = kho.map(function(p){
    var d = 0;
    yeu.forEach(function(m,i){ d += hop(m, p.ten+' '+(p.nhomTen||'')) * (yeu.length-i); });
    return { p:p, d:d };
  }).filter(function(x){ return x.d > 0; });
  ds.sort(function(x,y){ return y.d - x.d; });
  return G.dsHet(ds,5).map(function(x){ return x.p; });
}

function tierColor(t){
  var x = (G.TIERS||[]).filter(function(y){return y.code===t;})[0];
  /* Cột màu trong G.TIERS tên là c, không phải color. Đọc sai tên thì
     hàm trả undefined và mọi màu tầng biến mất — nhánh dự phòng bên
     dưới không bao giờ chạy vì x vẫn tồn tại. */
  return x ? x.c : 'var(--gita)';
}

/* ═══════════════════ BỘ TEST NHẬN DIỆN ═══════════════════ */
G.VIEWS['bo-test'] = function(){
  var T = G.TEST750 || [];
  if(!T.length) return U.empty('Chưa mở được bộ test',
    'Bộ test nằm trong gói nội dung theo tầng. Đăng nhập bằng tài khoản đã được cấp phép tầng để làm bài.');
  var dang = G.S.testDang && boTest(G.S.testDang);
  if(dang){
    var kq = G.S.test[dang.ma];
    return (kq && kq.xong) ? manKetQua(dang, kq) : manLamBai(dang);
  }
  return manThuVien(T);
};

/* ─────────── Thư viện 25 bộ ─────────── */
function manThuVien(T){
  var tangs = [];
  T.forEach(function(b){ if(tangs.indexOf(b.tang)<0) tangs.push(b.tang); });
  tangs.sort();
  var soCau = T.reduce(function(a,b){ return a + b.cau.length; },0);
  var xong = Object.keys(G.S.test||{}).filter(function(k){ return G.S.test[k] && G.S.test[k].xong; }).length;
  /* Bản xem thử mở cả năm bài của tầng một nhưng mỗi bài rút còn sáu
     câu. Nói thẳng con số ấy ngay đầu màn: người xem thử phải biết mình
     đang cầm bản rút, và người đã đăng nhập phải biết mình cầm bản đủ. */
  var rut = T.filter(function(b){ return b.mau && b.soCauThat > b.cau.length; });
  var soCauThat = T.reduce(function(a,b){ return a + (b.soCauThat || b.cau.length); },0);

  var o = U.ph({eyebrow:'NHÓM 02 · NHẬN DIỆN', ic:'target', grad:1, t:'Bộ test nhận diện năm tầng',
    lead:'Năm nhóm bài cho mỗi tầng. Mỗi câu có bốn lựa chọn, mỗi lựa chọn ứng với một mức và một nhóm khách hàng. '+
    'Bài này không xếp loại ai — nó chỉ nói cho cả nhà biết mình đang đứng ở đâu, để gửi đúng lộ trình và đúng tài liệu.'});

  if(rut.length)
    o += '<div class="card mb" style="border-color:var(--alert);background:rgba(251,146,60,.06)">'+
      '<div class="row" style="gap:10px;align-items:flex-start">'+
      '<span style="color:var(--alert);flex:none">'+ic('shield','w-4 h-4')+'</span>'+
      '<div style="flex:1"><b class="sm">Bản xem thử — '+rut.length+' bài, mỗi bài rút còn '+
      rut[0].cau.length+' trong '+rut[0].soCauThat+' câu</b>'+
      '<p class="tiny mt" style="line-height:1.7;color:var(--ink-2)">'+
      'Sáu câu này trải đủ '+rut[0].mien.length+' miền đo nên chấm thử vẫn ra nhóm và ra cảnh báo, '+
      'nhưng điểm đo trên sáu câu KHÔNG dùng để kết luận về một gia đình thật. '+
      'Đăng nhập bằng tài khoản đã được cấp phép tầng là mở đủ '+soCauThat+' câu của '+T.length+' bài, '+
      'và kết quả mới được ghi vào hồ sơ nhà mình.</p></div></div></div>';

  o += '<div class="grid g4 mb">'+
    U.stat({k:'Bộ bài',   v:String(T.length),   d:'năm nhóm mỗi tầng', c:'#185AB4'})+
    U.stat({k:'Câu hỏi',  v:String(soCau),      d:rut.length ? 'bản rút · đủ là '+soCauThat+' câu' : 'mỗi câu bốn lựa chọn', c:'#5140B4'})+
    U.stat({k:'Lựa chọn', v:String(soCau*4),    d:'đã quy ước mức điểm', c:'#0B6675'})+
    U.stat({k:'Đã làm',   v:String(xong),       d:'bài trong máy này', c:'#0B7350'})+
    '</div>';

  /* Quy ước bốn nhóm — lấy đúng từ bộ dữ liệu, không viết lại. */
  var mau = T[0];
  o += U.sec('BỐN NHÓM KHÁCH HÀNG', 'Mỗi lựa chọn là một mức từ 1 đến 4. Điểm bài quy về thang 100 rồi rơi vào một trong bốn nhóm.');
  o += '<div class="grid g4">' + mau.nhom.map(function(n){
    return '<div class="card pad-sm" style="border-color:'+n.color+'33">'+
      '<div class="row mb" style="gap:8px">'+U.dot(n.color)+'<b class="sm" style="color:'+n.color+'">'+h(n.label)+'</b></div>'+
      '<div class="tiny muted mb">'+n.min+'–'+n.max+' điểm · mức '+n.level+'</div>'+
      '<p class="tiny dim" style="line-height:1.6">'+h(n.meaning)+'</p></div>';
  }).join('') + '</div>';

  o += '<div class="card mt2" style="border-color:var(--gita-vien-1)">'+
    '<div class="row mb"><span style="color:var(--gold-ink)">'+ic('shield','w-4 h-4')+'</span><b>Ranh giới của bộ test</b></div>'+
    '<p class="sm dim" style="line-height:1.75">'+h(mau.gioiHan)+'</p></div>';

  o += U.sec('CHỌN BÀI', 'Bấm vào một bài để làm. Kết quả lưu trong máy này và gửi được cho người đồng hành.');
  o += '<div class="row wrap mb" style="gap:8px">'+
    '<button class="btn ghost sm on" data-tf="ALL">Tất cả</button>'+
    tangs.map(function(t){
      return '<button class="btn ghost sm" data-tf="'+h(t)+'" style="border-color:'+tierColor(t)+'55;color:'+tierColor(t)+'">'+h(t)+'</button>';
    }).join('') + '</div>';

  o += '<div class="grid g2" id="tsList">' + T.map(function(b){
    var c = tierColor(b.tang), r = G.S.test[b.ma];
    return '<button class="card lift" data-test="'+h(b.ma)+'" data-f="'+h(b.tang)+'" style="text-align:left;border-color:'+c+'22">'+
      '<div class="row wrap" style="gap:7px;margin-bottom:8px">'+U.chip(b.tang,c)+U.chip('Bài '+b.bo)+
      '<span class="tiny muted">'+b.cau.length+(b.mau && b.soCauThat > b.cau.length ? '/'+b.soCauThat : '')+
        ' câu · '+b.phut+' phút · '+h(b.ai)+'</span>'+
      (b.mau && b.soCauThat > b.cau.length ? U.chip('bản rút','#FB923C') : '')+
      (r && r.xong ? '<span class="chip" style="color:'+r.nhom.color+';border-color:'+r.nhom.color+'40;background:'+r.nhom.color+'1a">'+h(r.nhom.code)+' · '+r.diem+'</span>' : '')+
      '</div>'+
      '<b class="sm" style="display:block;line-height:1.4;margin-bottom:6px;color:'+c+'">'+h(b.ten)+'</b>'+
      '<p class="tiny muted" style="line-height:1.6">'+h(b.muc)+'</p>'+
      '<div class="tiny mt" style="color:var(--ink-4)">'+ic('map','w-3 h-3')+' '+b.mien.length+' miền · '+h(b.tuoi)+'</div></button>';
  }).join('') + '</div>';

  o += '<p class="tiny muted center mt2">Mỗi bản in ra đều mang mật mã kín theo người nhận · '+
    h(G.META && G.META.name || 'GITA 365')+'</p>';
  return o;
}

/* ─────────── Làm bài ─────────── */
function manLamBai(b){
  var c = tierColor(b.tang);
  var st = G.S.test[b.ma] || (G.S.test[b.ma] = { dap:{}, xong:false });
  var da = Object.keys(st.dap).length, tong = b.cau.length;

  var o = '<div class="row wrap mb" style="gap:8px">'+
    '<button class="btn ghost sm" data-tthoat="1">'+ic('arrow')+'Quay lại danh sách bài</button>'+
    U.chip(b.tang,c)+U.chip('Bài '+b.bo)+'</div>';

  o += U.ph({eyebrow:'ĐANG LÀM BÀI', ic:'target', t:b.tieuDe, lead:b.muc});

  o += '<div class="card" style="border-color:'+c+'33">'+
    '<div class="row" style="justify-content:space-between;margin-bottom:8px">'+
    '<b class="sm">Đã trả lời '+da+' / '+tong+' câu</b>'+
    '<span class="tiny muted">'+b.phut+' phút · trả lời theo bảy ngày gần nhất</span></div>'+
    U.bar(Math.round(da/tong*100), c)+'</div>';

  o += '<div class="card mt" style="border-color:var(--gita-mo-3)">'+
    '<p class="sm dim" style="line-height:1.75">Chọn câu <b>đúng với thực tế</b>, không chọn câu nghe hay hơn. '+
    'Bài này không chấm điểm người — nó chỉ định vị điểm xuất phát. Chọn sai thì lộ trình gửi về cũng sai.</p></div>';

  b.mien.forEach(function(m, mi){
    var cs = b.cau.filter(function(x){ return x.mien===m; });
    o += U.sec('MIỀN '+(mi+1)+' · '+m, cs.length+' câu');
    o += cs.map(function(q){
      var chon = st.dap[q.id];
      return '<div class="card mb" style="border-color:'+(chon?c+'44':'var(--line)')+'">'+
        '<p class="sm" style="line-height:1.7;margin-bottom:11px"><b>'+h(q.hoi)+'</b></p>'+
        '<div style="display:flex;flex-direction:column;gap:7px">'+
        q.chon.map(function(x){
          var on = chon === x.muc;
          return '<button class="card pad-sm lift" data-tq="'+h(b.ma)+'|'+h(q.id)+'|'+x.muc+'" '+
            'style="text-align:left;border-color:'+(on?c:'var(--line)')+';background:'+(on?c+'14':'transparent')+'">'+
            '<div class="row" style="gap:9px;align-items:flex-start">'+
            '<span class="chip" style="flex:none;color:'+(on?c:'var(--ink-4)')+';border-color:'+(on?c+'55':'var(--line)')+'">'+x.muc+'</span>'+
            '<span class="tiny" style="line-height:1.6;color:var(--ink-2)">'+h(x.t)+'</span></div></button>';
        }).join('')+'</div></div>';
    }).join('');
  });

  o += '<div class="card mt2 center" style="border-color:'+c+'44">'+
    (da<tong ? '<p class="sm muted mb">Còn '+(tong-da)+' câu chưa trả lời. Trả lời đủ mới ra được nhóm đúng.</p>' : '')+
    '<button class="btn pri'+(da<tong?' off':'')+'" data-txong="'+h(b.ma)+'">'+ic('check')+'Xem kết quả và lộ trình</button>'+
    '<button class="btn ghost sm mt" data-txoa="'+h(b.ma)+'">Xoá hết câu trả lời của bài này</button></div>';
  return o;
}

/* ─────────── Kết quả ─────────── */
function manKetQua(b, kq){
  var c = tierColor(b.tang), n = kq.nhom;
  var yeu = mienYeu(kq);
  var tl  = goiTaiLieu(b, yeu);
  var pd  = goiPhacDo(yeu);

  var o = '<div class="row wrap mb" style="gap:8px">'+
    '<button class="btn ghost sm" data-tthoat="1">'+ic('arrow')+'Quay lại danh sách bài</button>'+
    U.chip(b.tang,c)+U.chip('Bài '+b.bo)+
    '<span class="tiny muted">Làm lúc '+h(kq.luc||'')+'</span></div>';

  o += U.ph({eyebrow:'KẾT QUẢ · '+b.tang+' · BÀI '+b.bo, ic:'crown', grad:1, t:b.ten,
    lead:b.ra});

  /* Điểm chấm trên bản rút phải tự khai là điểm trên bản rút. Một con
     số ba chữ số nằm trong vòng tròn màu trông y hệt nhau dù đằng sau
     là sáu câu hay ba mươi câu — nên chỗ nói ra sự khác biệt ấy phải
     nằm ngay trên con số, không nằm dưới chân trang. */
  if(b.mau && b.soCauThat > b.cau.length)
    o += '<div class="card mb" style="border-color:var(--alert);background:rgba(251,146,60,.06)">'+
      '<p class="tiny" style="line-height:1.7;color:var(--ink-2)"><b>Điểm này chấm trên '+
      b.cau.length+' câu, bài đủ có '+b.soCauThat+' câu.</b> Đủ để thấy cách chấm và cách phân nhóm, '+
      'không đủ để kết luận về một gia đình thật — sáu câu thì mỗi miền chỉ có một câu, '+
      'trả lời lệch một câu là miền đó lệch cả miền. Kết quả này không ghi vào hồ sơ.</p></div>';

  o += '<div class="card" style="border-color:'+n.color+'44;background:'+n.color+'0d">'+
    '<div class="row wrap" style="gap:20px;align-items:center">'+
    U.ring(kq.diem, n.color, 'trên 100')+
    '<div class="grow" style="min-width:240px">'+
    '<div class="row mb" style="gap:8px">'+U.dot(n.color)+'<b style="color:'+n.color+';font-size:17px">'+h(n.label)+'</b></div>'+
    '<p class="sm dim" style="line-height:1.75;margin-bottom:10px">'+h(n.meaning)+'</p>'+
    '<div class="card pad-sm" style="border-color:'+n.color+'33">'+
    '<div class="tiny up mb" style="color:'+n.color+'">VIỆC LÀM NGAY</div>'+
    '<p class="sm">'+h(n.action)+'</p></div></div></div></div>';

  o += U.sec('ĐIỂM TỪNG MIỀN', 'Nhìn miền thấp nhất trước. Đó là nơi chạm đầu tiên, không phải chỗ để trách nhau.');
  o += '<div class="card">' + b.mien.map(function(m){
    var d = kq.mien[m];
    var mc = d===null ? 'var(--ink-4)' : d<33 ? '#dc2626' : d<58 ? '#BE0E16' : d<83 ? '#d97706' : '#0B7350';
    return '<div style="margin-bottom:13px">'+
      '<div class="row" style="justify-content:space-between;margin-bottom:5px">'+
      '<span class="sm">'+h(m)+'</span>'+
      '<b class="sm" style="color:'+mc+'">'+(d===null?'—':d)+'</b></div>'+
      U.bar(d===null?0:d, mc)+'</div>';
  }).join('') + '</div>';

  if(kq.canhBao && kq.canhBao.length){
    o += U.sec('CẢNH BÁO ĐÃ BẬT', 'Những mẫu này chỉ bật khi số liệu thật rơi vào ngưỡng — không bật vu vơ.');
    o += kq.canhBao.map(function(cb){
      var sc = cb.severity==='high' ? '#dc2626' : cb.severity==='medium' ? '#BE0E16' : '#d97706';
      return '<div class="card mb" style="border-color:'+sc+'44;background:'+sc+'0a">'+
        '<div class="row mb" style="gap:8px"><span style="color:'+sc+'">'+ic('pulse','w-4 h-4')+'</span>'+
        U.chip(cb.severity==='high'?'ƯU TIÊN CAO':cb.severity==='medium'?'CẦN THEO DÕI':'GHI NHẬN', sc)+'</div>'+
        '<p class="sm dim" style="line-height:1.75">'+h(cb.then)+'</p></div>';
    }).join('');
  }

  if(yeu.length){
    o += U.sec('THỨ TỰ CHẠM', 'Làm từ trên xuống. Một việc một lúc — đó là cách duy nhất giữ được.');
    o += '<div class="card">'+U.list(yeu.map(function(m,i){
      return (i+1)+'. '+m+' — đang ở '+kq.mien[m]+'/100';
    }), c)+'</div>';
  } else {
    o += '<div class="card mt2" style="border-color:#0B735044">'+
      '<div class="row mb"><span style="color:#0B7350">'+ic('check','w-4 h-4')+'</span><b>Không miền nào dưới ngưỡng</b></div>'+
      '<p class="sm dim">Giữ nguyên nhịp hiện tại làm nền và chuyển trọng tâm sang độ khó của nhiệm vụ.</p></div>';
  }

  if(pd.length){
    o += U.sec('PHÁC ĐỒ NÊN MỞ TRƯỚC', 'Chọn theo miền yếu nhất, không chọn theo cảm tính.');
    o += '<div class="grid g2">'+pd.map(function(p){
      return '<button class="card lift" data-v="phac-do" style="text-align:left;border-color:'+c+'22">'+
        '<div class="row wrap mb" style="gap:7px">'+U.chip(p.ma,c)+'<span class="tiny muted">'+h(p.nhomTen||p.nhom||'')+'</span></div>'+
        '<b class="sm" style="display:block;line-height:1.45">'+h(p.ten)+'</b></button>';
    }).join('')+'</div>';
  }

  if(tl.length){
    o += U.sec('TÀI LIỆU GỬI VỀ CHO GIA ĐÌNH', tl.length+' tài liệu trong kho quà, đúng tầng '+b.tang+' và đúng miền đang yếu.');
    o += '<div class="grid g2">'+tl.map(function(q){
      return '<div class="card pad-sm" style="border-color:'+c+'22">'+
        '<div class="row wrap mb" style="gap:7px">'+U.chip(q.ma,c)+U.chip(q.dang)+
        '<span class="tiny muted">'+q.trang+' trang · '+q.diem+' điểm</span></div>'+
        '<b class="sm" style="display:block;line-height:1.45;margin-bottom:5px">'+h(q.ten)+'</b>'+
        '<p class="tiny muted">'+h(q.nv)+'</p></div>';
    }).join('')+'</div>';
    o += '<p class="tiny muted mt">Mở đầy đủ kho quà ở mục <b>Kho quà tặng</b>. Quyền gửi tài liệu ra ngoài do Admin chỉ định.</p>';
  }

  o += '<div class="card mt2" style="border-color:rgba(251,146,60,.35);background:rgba(251,146,60,.06)">'+
    '<div class="tiny up mb" style="color:var(--alert)">RANH GIỚI</div>'+
    '<p class="sm" style="line-height:1.75">'+h(b.gioiHan)+'</p></div>';

  o += '<div class="row wrap mt2" style="gap:8px">'+
    '<button class="btn pri sm" data-tin="'+h(b.ma)+'">'+ic('out')+'In hoặc lưu PDF kết quả</button>'+
    '<button class="btn ghost sm" data-tlam="'+h(b.ma)+'">Làm lại bài này</button>'+
    '<button class="btn ghost sm" data-v="kpi-100">Xem mười điểm về đích</button></div>';
  return o;
}

/* ═══════════════════ KPI 10 ĐIỂM · 100 TIÊU CHÍ ═══════════════════ */
G.VIEWS['kpi-100'] = function(){
  var K = G.KPI100;
  if(!K) return U.empty('Chưa mở được bộ KPI', 'Bộ KPI nằm trong gói nền. Đăng nhập lại để nạp.');
  var S = G.S.checks;
  /* Ở bản chưa nối máy chủ cấp phép, gói mẫu chỉ mở tiêu chí của điểm mốc
     đầu; chín mốc còn lại về dưới dạng "[Tiêu chí mở khi được cấp phép]".
     Trước v9.2 màn này vẫn vẽ chín mươi dòng ấy thành nút bấm được — nên
     một phụ huynh mở ra thấy 5.118 ký tự mà 90% là chỗ trống giả làm việc
     phải làm, và tích vào thì tích được một ô rỗng.

     Nay đếm và vẽ chỉ trên tiêu chí THẬT. Mốc chưa mở hiện đúng một dòng
     nói vì sao chưa mở, không giả vờ có mười việc chờ tích. Mẫu số cũng
     đổi theo: "8/10" chỉ đúng khi có mười tiêu chí thật để đạt. */
  function laTrong(t){ return /^\s*\[.*\]\s*$/.test(String(t||'')); }
  var dat = 0, qua = 0, mocMo = 0;
  var soDat = K.diem.map(function(d){
    var that = d.tc.filter(function(t){ return !laTrong(t); });
    var n = d.tc.filter(function(t,i){ return !laTrong(t) && S['kpi-'+d.no+'-'+i]; }).length;
    dat += n;
    if(that.length){ mocMo++; if(n >= Math.ceil(that.length*0.8)) qua++; }
    return n;
  });
  var tongThat = K.diem.reduce(function(a,d){
    return a + d.tc.filter(function(t){ return !laTrong(t); }).length; }, 0);
  var conKhoa = 10 - mocMo;

  var o = U.ph({eyebrow:'NHÓM 02 · VỀ ĐÍCH', ic:'crown', grad:1, t:'Mười điểm về đích · một trăm tiêu chí',
    lead:K.cot});

  o += '<div class="grid g4 mb">'+
    U.stat({k:'Điểm mốc đã mở', v:qua+'/'+mocMo, d:conKhoa?conKhoa+' mốc mở dần theo tầng':'qua khi đạt 8/10 tiêu chí', c:'#185AB4'})+
    U.stat({k:'Tiêu chí đã đạt', v:dat+'/'+tongThat, d:tongThat<100?'trên tổng 100 của cả năm tầng':'về đích tối thiểu 80', c:'#0B7350'})+
    U.stat({k:'Còn lại',         v:String(tongThat-dat), d:'tiêu chí đang mở mà chưa tích', c:'#5140B4'})+
    U.stat({k:'Tình trạng',      v:qua>=10?'VỀ ĐÍCH':'ĐANG ĐI', d:qua>=10?'đủ mười điểm mốc':'còn '+(10-qua)+' điểm mốc', c:qua>=10?'#0B7350':'#0B6675'})+
    '</div>';
  if(conKhoa)
    o += '<div class="card mb" style="border-color:var(--gita-vien-1)">'+
      '<p class="tiny" style="line-height:1.75;color:var(--ink-2)"><b>'+conKhoa+' điểm mốc chưa mở trên bản này.</b> '+
      'Mười điểm mốc trải suốt năm tầng — mốc của tầng sau mở khi nhà mình qua tầng trước, '+
      'nên bảng dưới chỉ bày việc anh chị làm được HÔM NAY. Đây không phải chỗ hỏng: '+
      'bày sẵn chín mươi việc của ba năm tới là cách chắc chắn để một nhà bỏ cuộc trong tuần đầu.</p></div>';

  o += '<div class="card mb"><div class="row" style="justify-content:space-between;margin-bottom:7px">'+
    '<b class="sm">Đường về đích</b><span class="tiny muted">'+dat+'/100 tiêu chí</span></div>'+
    U.bar(dat, qua>=10?'#0B7350':'var(--gita)')+
    '<p class="tiny muted mt">'+h(K.cham)+'</p></div>';

  o += U.sec('MƯỜI ĐIỂM MỐC', 'Bấm vào từng tiêu chí để tích. Trạng thái lưu trong máy này.');
  o += K.diem.map(function(d, di){
    var that = d.tc.filter(function(t){ return !laTrong(t); });
    var n = soDat[di], ok = that.length && n >= Math.ceil(that.length*0.8);
    if(!that.length)
      return '<div class="card mb" style="border-color:var(--line)">'+
        '<div class="row wrap" style="gap:8px;align-items:center">'+
        '<span style="color:var(--ink-4);flex:none">'+ic('lock','w-4 h-4')+'</span>'+
        U.chip('ĐIỂM '+d.no)+U.chip(d.tang)+
        '<b class="sm" style="color:var(--ink-3)">'+h(d.ten)+'</b></div>'+
        '<p class="tiny muted mt" style="line-height:1.7">'+h(d.mo)+' — mười tiêu chí của mốc này mở khi nhà mình vào tầng '+h(d.tang)+'.</p></div>';
    return '<div class="card mb" style="border-color:'+d.c+(ok?'66':'22')+';'+(ok?'background:'+d.c+'0a':'')+'">'+
      '<div class="row wrap" style="gap:10px;justify-content:space-between;margin-bottom:9px">'+
      '<div class="row wrap" style="gap:8px">'+
      U.chip('ĐIỂM '+d.no, d.c)+U.chip(d.tang)+
      '<b style="color:'+d.c+';font-size:15px">'+h(d.ten)+'</b></div>'+
      '<span class="chip" style="color:'+(ok?'#0B7350':'var(--ink-4)')+';border-color:'+(ok?'#0B735055':'var(--line)')+'">'+
      (ok?'ĐÃ QUA':'')+' '+n+'/'+that.length+'</span></div>'+
      '<p class="sm dim" style="line-height:1.7;margin-bottom:10px">'+h(d.mo)+'</p>'+
      U.bar(Math.round(n/that.length*100), ok?'#0B7350':d.c)+
      '<div style="display:flex;flex-direction:column;gap:6px;margin-top:11px">'+
      d.tc.map(function(t,i){
        if(laTrong(t)) return '';
        var k = 'kpi-'+d.no+'-'+i, on = !!S[k];
        return '<button class="card pad-sm lift" data-check="'+h(k)+'" style="text-align:left;'+
          'border-color:'+(on?d.c+'55':'var(--line)')+';background:'+(on?d.c+'12':'transparent')+'">'+
          '<div class="row" style="gap:9px;align-items:flex-start">'+
          '<span style="flex:none;color:'+(on?d.c:'var(--ink-4)')+'">'+ic(on?'check':'dot','w-4 h-4')+'</span>'+
          '<span class="tiny" style="line-height:1.6;color:var(--ink-2)">'+h(t)+'</span></div></button>';
      }).join('')+'</div></div>';
  }).join('');

  o += U.sec('LUẬT CHẤM', 'Năm luật này không thương lượng.');
  o += '<div class="card">'+U.list(K.luat, 'var(--gita)')+'</div>';

  o += '<div class="row wrap mt2" style="gap:8px">'+
    '<button class="btn ghost sm" data-v="bo-test">'+ic('target')+'Làm bộ test nhận diện</button>'+
    '<button class="btn ghost sm" data-kpiin="1">'+ic('out')+'In bảng KPI</button></div>';
  return o;
};

/* ═══════════════════ SỰ KIỆN ═══════════════════ */
function on(sel, fn){
  document.addEventListener('click', function(e){
    var el = e.target.closest && e.target.closest(sel);
    if(el){ e.preventDefault(); fn(el, e); }
  });
}
function lai(){ if(G.render) G.render(); }

on('[data-tf]', function(el){
  var f = el.getAttribute('data-tf');
  document.querySelectorAll('[data-tf]').forEach(function(b){ b.classList.toggle('on', b===el); });
  document.querySelectorAll('#tsList [data-f]').forEach(function(c){
    c.style.display = (f==='ALL' || c.getAttribute('data-f')===f) ? '' : 'none'; });
});
on('[data-test]', function(el){ G.S.testDang = el.getAttribute('data-test'); lai(); });
on('[data-tthoat]', function(){ G.S.testDang = null; lai(); });
on('[data-tq]', function(el){
  var p = el.getAttribute('data-tq').split('|');
  var st = G.S.test[p[0]] || (G.S.test[p[0]] = { dap:{}, xong:false });
  st.dap[p[1]] = U.num(p[2]);
  if(G.save) G.save();
  /* Đánh dấu để bài làm đi lên máy chủ. Thiếu dòng này thì con làm bài trên
     máy tính, mở điện thoại lại thấy trống. */
  if(G.danhDau) G.danhDau('test', p[0]);
  /* Cập nhật tại chỗ để không cuộn về đầu trang khi đang làm bài */
  var b = boTest(p[0]);
  if(b){
    var c = tierColor(b.tang);
    el.parentNode.parentNode.querySelectorAll('[data-tq]').forEach(function(x){
      var on = x === el;
      x.style.borderColor = on ? c : 'var(--line)';
      x.style.background = on ? c+'14' : 'transparent';
      var ch = x.querySelector('.chip');
      if(ch){ ch.style.color = on ? c : 'var(--ink-4)'; ch.style.borderColor = on ? c+'55' : 'var(--line)'; }
    });
    var da = Object.keys(st.dap).length, tong = b.cau.length;
    var bar = document.querySelector('.view .card .bar i');
    if(bar) bar.style.width = Math.round(da/tong*100)+'%';
    var nut = document.querySelector('[data-txong]');
    if(nut && da>=tong) nut.classList.remove('off');
  }
});
on('[data-txong]', function(el){
  var ma = el.getAttribute('data-txong'), b = boTest(ma);
  var st = G.S.test[ma];
  if(!b || !st) return;
  if(Object.keys(st.dap).length < b.cau.length){
    U.toast('Còn câu chưa trả lời. Trả lời đủ mới ra được nhóm đúng.','err'); return;
  }
  var kq = G.chamTest(b, st.dap);
  st.diem = kq.diem; st.mien = kq.mien; st.nhom = kq.nhom; st.canhBao = kq.canhBao;
  st.xong = true; st.luc = new Date().toLocaleString('vi-VN');
  if(G.save) G.save();
  if(G.danhDau) G.danhDau('test', b.ma);
  if(G.secLog) G.secLog('Chấm bài test', b.ma+' · '+kq.diem+'/100 · nhóm '+kq.nhom.code, 'Ghi nhận');
  lai();
});
on('[data-tlam]', function(el){
  var ma = el.getAttribute('data-tlam');
  G.S.test[ma] = { dap:{}, xong:false };
  if(G.danhDau) G.danhDau('test', ma);
  if(G.save) G.save();
  lai();
});
on('[data-txoa]', function(el){
  var ma = el.getAttribute('data-txoa');
  G.S.test[ma] = { dap:{}, xong:false };
  if(G.save) G.save();
  U.toast('Đã xoá câu trả lời của bài này.','ok');
  lai();
});
on('[data-tin]', function(){ G.inTrang('Kết quả bộ test'); });
on('[data-kpiin]', function(){ G.inTrang('Bảng KPI về đích'); });
})();

})();

/* ═════════ src/views9.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.3 — MA TRẬN 5 TẦNG · CHÂN DUNG KHÁCH HÀNG ·
   PHIẾU REFERRAL · HỆ ĐO LƯỜNG · PHÂN HẠNG VIP & VVIP ·
   CÂY TIỀN · TỆP NHÂN SỰ TRUNG THÀNH
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};
(function(){
var U = G.U, h = U.h, ic = U.ic;

function tc(t){ var x=(G.TIERS||[]).filter(function(y){return y.code===t;})[0]; return x ? x.c : 'var(--gita)'; }
function coTang(t){ return !!(G['MATRAN_'+t] && G['MATRAN_'+t].length); }
function lay(t, ma){ var a=G['MATRAN_'+t]||[]; for(var i=0;i<a.length;i++) if(a[i].ma===ma) return a[i]; return null; }

/* ═══════════════ MA TRẬN 220 VẤN ĐỀ × 5 TẦNG ═══════════════ */
G.VIEWS['ma-tran'] = function(){
  var M = G.MATRAN;
  if(!M) return U.empty('Chưa mở được ma trận', 'Ma trận nằm trong gói nền. Đăng nhập lại để nạp.');
  var co = ['T1','T2','T3','T4','T5'].filter(coTang);

  var o = U.ph({eyebrow:'NHÓM 03 · KHO BÁU VẬT', ic:'map', grad:1, t:'Ma trận 220 vấn đề × 5 tầng',
    lead:'Mười một nhóm, hai mươi vấn đề mỗi nhóm. Mỗi vấn đề có nguyên nhân cốt lõi, key giải pháp, và lộ trình riêng cho từng tầng — kèm việc của học viên, phụ huynh, tư vấn và Coach, mục tiêu phải đạt và hồ sơ phải nộp.'});

  o += '<div class="grid g4 mb">'+
    U.stat({k:'Nhóm vấn đề', v:String(M.nhom.length), d:'13.1 đến 13.11', c:'#0B6675'})+
    U.stat({k:'Vấn đề',      v:String(M.vande.length), d:'20 vấn đề mỗi nhóm', c:'#185AB4'})+
    U.stat({k:'Tầng đã mở',  v:co.length+'/5', d:co.length<5?'gói tầng còn lại đang mở ở nền':'đủ năm tầng', c:'#0B7350'})+
    U.stat({k:'Ô nội dung',  v:String(M.vande.length*co.length*8), d:'8 cột sâu mỗi tầng', c:'#5140B4'})+
    '</div>';

  o += '<div class="row wrap mb" style="gap:8px">'+
    '<button class="btn ghost sm on" data-mtn="ALL">Tất cả nhóm</button>'+
    M.nhom.map(function(n){
      return '<button class="btn ghost sm" data-mtn="'+h(n.ma)+'">'+h(n.ten)+'</button>';
    }).join('')+'</div>';

  o += '<div class="grid g2" id="mtList">' + M.vande.map(function(v){
    return '<button class="card lift" data-mtv="'+h(v.ma)+'" data-f="'+h(v.nhom)+'" style="text-align:left">'+
      '<div class="row wrap mb" style="gap:7px">'+U.chip(v.ma,'#0B6675')+
      '<span class="tiny muted">'+h(v.nhomTen)+'</span></div>'+
      '<b class="sm" style="display:block;line-height:1.45;margin-bottom:6px">'+h(v.ten)+'</b>'+
      '<p class="tiny muted" style="line-height:1.55">'+h(v.nguyen)+'</p></button>';
  }).join('') + '</div>';
  return o;
};

G.maTranModal = function(ma){
  var M = G.MATRAN; if(!M) return;
  var v = M.vande.filter(function(x){return x.ma===ma;})[0]; if(!v) return;
  var co = ['T1','T2','T3','T4','T5'].filter(coTang);

  var html = '<div class="row wrap" style="gap:7px;margin-bottom:9px">'+U.chip(v.ma,'#0B6675')+U.chip(v.nhomTen)+'</div>'+
    '<h2 style="font-size:21px;font-weight:800;margin-bottom:12px">'+h(v.ten)+'</h2>'+
    '<div class="grid g2" style="gap:10px;margin-bottom:14px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">NGUYÊN NHÂN CỐT LÕI</div><p class="sm">'+h(v.nguyen)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">KEY GIẢI PHÁP THÁO GỠ</div><p class="sm">'+h(v.key)+'</p></div>'+
    '</div>'+
    '<div class="card pad-sm mb"><div class="tiny up muted mb">ĐIỂM ĐÁNH GIÁ</div><p class="tiny dim" style="line-height:1.6">'+h(v.cham)+'</p></div>';

  if(!co.length){
    html += U.empty('Chưa mở gói tầng nào','Phần sâu của từng tầng nằm trong gói theo tầng, đang được mở ở nền.');
  } else {
    html += '<div class="row wrap mb" style="gap:7px">'+ co.map(function(t,i){
      return '<button class="btn ghost sm'+(i===0?' on':'')+'" data-mtt="'+h(t)+'" style="border-color:'+tc(t)+'55;color:'+tc(t)+'">'+h(t)+'</button>';
    }).join('') +'</div>';
    html += co.map(function(t,i){
      var d = lay(t, ma) || {};
      var K = [['Lộ trình '+t, d.lo],['Hoạt động của học sinh', d.hs],['Hoạt động của phụ huynh', d.ph],
               ['Hoạt động của tư vấn', d.tv],['Hoạt động của Coach', d.coach],
               ['Mục tiêu đạt được', d.dich],['Hồ sơ đầu ra', d.hoSo],['Quy trình tạo động lực', d.quyTrinh]];
      return '<div data-mtp="'+h(t)+'" style="display:'+(i===0?'block':'none')+'">'+
        K.filter(function(k){return k[1];}).map(function(k){
          return '<div class="card mb" style="border-color:'+tc(t)+'22">'+
            '<div class="tiny up mb" style="color:'+tc(t)+'">'+h(k[0])+'</div>'+
            '<p class="sm dim" style="line-height:1.75;white-space:pre-wrap">'+h(k[1])+'</p></div>';
        }).join('') + '</div>';
    }).join('');
  }
  html += '<button class="btn ghost sm mt" data-mtin="1">'+ic('out')+'In hoặc lưu PDF phác đồ này</button>';
  U.modal(html);
};

/* ═══════════════ PHIẾU CHỈ DẪN REFERRAL ═══════════════ */
G.VIEWS['referral'] = function(){
  /* Kho tra cứu của nghề, không phải công cụ thao tác với gia đình.
     Bảng PERM đã nói rõ: nghe_chung mở cho R01–R12 — "toàn bộ kho nghề".
     Khoá ở pro_coach hoặc pro_consult thì Chuyên gia đánh giá, Chuyên gia
     tư vấn và Phân tích dữ liệu thấy mục này trong trình đơn mà bấm vào
     chỉ nhận được một thẻ khoá — đúng loại mục chết anh Quang đã bảo dẹp.
     Quyền THAO TÁC (buồng lái Coach, cổng nghiệm thu, xuất dữ liệu) vẫn
     giữ nguyên ở pro_coach và pro_approve. */
  if(!G.can('nghe_chung')) return U.lockCard();
  var R = G.REFERRAL;
  if(!R) return U.empty('Chưa mở được phiếu referral','Phần này nằm trong kho nghề.');

  var o = U.ph({eyebrow:'NHÓM 04 · MỞ CỬA', ic:'share', grad:1, t:'Phiếu chỉ dẫn referral',
    lead:R.cot});

  o += '<div class="card mb" style="border-color:var(--gita-vien-1)">'+
    '<div class="grid g2" style="gap:12px">'+
    '<div><div class="tiny up muted mb">NGƯỜI TRÌNH BÀY</div><p class="sm"><b>'+h(R.nguoi)+'</b> · '+h(R.donVi)+'</p></div>'+
    '<div><div class="tiny up muted mb">ĐỐI TƯỢNG TRỌNG TÂM</div><p class="sm">'+h(R.doiTuong)+'</p></div>'+
    '</div><p class="tiny muted mt">'+h(R.linhVuc)+'</p>'+
    '<div class="center mt2"><b style="font-size:17px;color:var(--gold-ink);letter-spacing:.02em">'+h(R.thongDiep)+'</b></div></div>';

  o += '<div class="grid g4 mb">'+R.bonBuoc.map(function(b,i){
    return '<div class="card pad-sm center"><div class="tiny muted mb">BƯỚC '+(i+1)+'</div><b class="sm">'+h(b)+'</b></div>';
  }).join('')+'</div>';

  o += U.sec('BỐN TRỤ CỘT G – I – T – A','Bốn miền để đọc đúng nguyên nhân, không đọc theo triệu chứng.');
  o += '<div class="grid g4">'+R.truCot.map(function(t){
    return '<div class="card pad-sm" style="border-color:'+t.c+'33">'+
      '<div class="row mb" style="gap:8px">'+U.dot(t.c)+'<b class="sm" style="color:'+t.c+'">'+h(t.ten)+'</b></div>'+
      '<p class="tiny dim" style="line-height:1.6">'+h(t.mo)+'</p></div>';
  }).join('')+'</div>';

  o += U.sec('1 · KHÁCH HÀNG TIỀM NĂNG HÀNG TUẦN','Năm chân dung GITA đặc biệt mong được kết nối.');
  o += R.tiemNang.map(function(x){
    return '<div class="card mb" style="border-color:'+tc(x.tang)+'22">'+
      '<div class="row wrap mb" style="gap:7px">'+U.chip(String(x.no),'var(--gita)')+U.chip(x.tang,tc(x.tang))+U.chip(x.nhom)+
      '<b class="sm">'+h(x.ten)+'</b></div>'+
      '<p class="sm dim" style="line-height:1.7;margin-bottom:8px">'+h(x.mo)+'</p>'+
      '<div class="tiny" style="color:var(--ink-4)">'+ic('arrow','w-3 h-3')+' '+h(x.vao)+'</div></div>';
  }).join('');

  o += U.sec('2 · REFERRAL MƠ ƯỚC','Những kết nối chiến lược mở ra nhiều cơ hội hợp tác.');
  o += '<div class="grid g2">'+R.moUoc.map(function(x){
    return '<div class="card pad-sm"><div class="row wrap mb" style="gap:7px">'+U.chip(String(x.no),'#5140B4')+
      '<b class="sm">'+h(x.ten)+'</b></div>'+
      '<p class="tiny dim" style="line-height:1.6">'+h(x.mo)+'</p></div>';
  }).join('')+'</div>';
  o += '<div class="card mt" style="border-color:var(--gita-vien-2);background:var(--gita-mo-1)">'+
    '<div class="row mb" style="gap:8px"><span style="color:var(--gold-ink)">'+ic('star','w-4 h-4')+'</span>'+
    '<b style="color:var(--gold-ink)">REFERRAL MƠ ƯỚC SỐ 1</b></div>'+
    '<p class="sm dim" style="line-height:1.75">'+h(R.moUocSo1)+'</p></div>';

  o += U.sec('3 · REFERRAL KHÔNG PHÙ HỢP','Nói rõ từ đầu để không làm mất thời gian của ai.');
  o += '<div class="card" style="border-color:rgba(248,113,113,.3)">'+U.list(R.khongPhuHop,'#BE0E16')+'</div>';

  o += U.sec('4 · DẤU HIỆU NHẬN BIẾT','Nghe phụ huynh nói một trong những câu này thì nghĩ ngay đến GITA.');
  o += '<div class="grid g2">'+R.dauHieu.map(function(d,i){
    return '<div class="card pad-sm"><div class="row" style="gap:9px;align-items:flex-start">'+
      '<span class="chip" style="flex:none">'+(i+1)+'</span>'+
      '<span class="sm" style="line-height:1.6;font-style:italic">'+h('“'+d+'”')+'</span></div></div>';
  }).join('')+'</div>';

  o += U.sec('5 · BA CÂU HỎI XÁC ĐỊNH REFERRAL','Đủ PAIN + GOAL + GAP mới là một referral chất lượng.');
  o += R.baCauHoi.map(function(q){
    var c = q.bat==='PAIN'?'#BE0E16':q.bat==='GOAL'?'var(--gita)':'#0B6675';
    return '<div class="card mb" style="border-color:'+c+'33">'+
      '<div class="row wrap mb" style="gap:8px">'+U.chip(q.bat,c)+'</div>'+
      '<p class="sm" style="line-height:1.7;margin-bottom:6px"><b>'+h('“'+q.hoi+'”')+'</b></p>'+
      '<p class="tiny muted">'+h(q.y)+'</p></div>';
  }).join('');
  o += '<div class="card" style="border-color:var(--gita-vien-1)"><p class="sm dim" style="line-height:1.75">'+h(R.quyUoc)+'</p></div>';

  o += U.sec('6 · BA CÁCH MỞ LỜI','Dùng nguyên văn được. Sửa cho hợp giọng mình cũng được.');
  o += R.gioiThieu.map(function(g){
    return '<div class="card mb"><div class="tiny up mb" style="color:var(--gold-ink)">'+h(g.cach)+'</div>'+
      U.quote(g.loi)+'</div>';
  }).join('');

  o += U.sec('7 · HỆ SINH THÁI ĐỒNG HÀNH','Tám chặng, đi theo thứ tự.');
  o += '<div class="grid g4">'+R.heSinhThai.map(function(x,i){
    return '<div class="card pad-sm center"><div class="tiny muted mb">'+(i+1)+'</div><b class="tiny">'+h(x)+'</b></div>';
  }).join('')+'</div>';
  return o;
};

/* ═══════════════ CHÂN DUNG TỆP KHÁCH HÀNG ═══════════════ */
G.VIEWS['chan-dung-kh'] = function(){
  /* Kho tra cứu của nghề, không phải công cụ thao tác với gia đình.
     Bảng PERM đã nói rõ: nghe_chung mở cho R01–R12 — "toàn bộ kho nghề".
     Khoá ở pro_coach hoặc pro_consult thì Chuyên gia đánh giá, Chuyên gia
     tư vấn và Phân tích dữ liệu thấy mục này trong trình đơn mà bấm vào
     chỉ nhận được một thẻ khoá — đúng loại mục chết anh Quang đã bảo dẹp.
     Quyền THAO TÁC (buồng lái Coach, cổng nghiệm thu, xuất dữ liệu) vẫn
     giữ nguyên ở pro_coach và pro_approve. */
  if(!G.can('nghe_chung')) return U.lockCard();
  var C = G.CHANDUNG_KH;
  if(!C) return U.empty('Chưa mở được chân dung khách hàng','Phần này nằm trong kho nghề.');

  var o = U.ph({eyebrow:'NHÓM 04 · MỞ CỬA', ic:'users', grad:1, t:'Sáu chân dung tệp khách hàng',
    lead:'Không phải nhà nào cũng giống nhau. Đọc đúng chân dung là gửi đúng lộ trình, đúng tài liệu và đúng người đồng hành ngay từ buổi đầu.'});

  o += C.map(function(x){
    return '<div class="card mb" style="border-color:'+x.c+'2a">'+
      '<div class="row wrap" style="gap:8px;justify-content:space-between;margin-bottom:10px">'+
      '<div class="row wrap" style="gap:8px">'+U.chip(x.ma,x.c)+U.chip(x.tang,tc(x.tang))+
      '<b style="color:'+x.c+';font-size:16px">'+h(x.ten)+'</b></div>'+
      '<span class="tiny muted">'+h(x.tyLe)+'</span></div>'+
      '<div class="grid g3" style="gap:10px;margin-bottom:11px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">PAIN — NỖI ĐAU</div><p class="tiny">'+h(x.dau)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">GOAL — ĐÍCH</div><p class="tiny">'+h(x.dich)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">GAP — KHOẢNG TRỐNG</div><p class="tiny">'+h(x.trong)+'</p></div>'+
      '</div>'+
      '<div class="tiny up mb" style="color:'+x.c+'">DẤU HIỆU NHẬN RA</div>'+U.list(x.dauHieu,x.c)+
      '<div class="card pad-sm mt" style="border-color:'+x.c+'33"><div class="tiny up mb" style="color:'+x.c+'">CÂU MỞ LỜI</div>'+
      '<p class="sm" style="font-style:italic;line-height:1.7">'+h('“'+x.moLoi+'”')+'</p></div>'+
      '<div class="grid g2 mt" style="gap:10px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">KHẢ NĂNG LÊN VIP</div><p class="tiny">'+h(x.vip)+'</p></div>'+
      '<div class="card pad-sm" style="border-color:rgba(251,146,60,.35)"><div class="tiny up mb" style="color:var(--alert)">CẢNH BÁO</div><p class="tiny">'+h(x.canhBao)+'</p></div>'+
      '</div></div>';
  }).join('');
  return o;
};

/* ═══════════════ HỆ ĐO LƯỜNG KHÁCH HÀNG ═══════════════ */
G.VIEWS['do-luong-kh'] = function(){
  if(!G.can('pro_consult')) return U.lockCard();
  var D = G.DOLUONG_KH;
  if(!D) return U.empty('Chưa mở được hệ đo lường','Phần này nằm trong kho nghề.');

  var o = U.ph({eyebrow:'NHÓM 05 · QUẢN TRỊ', ic:'pulse', grad:1, t:'Hệ đo lường khách hàng',
    lead:D.cot});

  o += U.sec('BẢY CHỈ SỐ','Mỗi chỉ số có cách tính, ngưỡng cảnh báo và lý do tồn tại.');
  o += D.chiSo.map(function(m){
    return '<div class="card mb" style="border-color:'+m.c+'2a">'+
      '<div class="row wrap mb" style="gap:8px">'+U.chip(m.ma,m.c)+
      '<b style="color:'+m.c+'">'+h(m.ten)+'</b><span class="tiny muted">đơn vị: '+h(m.dv)+'</span></div>'+
      '<div class="grid g3" style="gap:10px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">CÁCH TÍNH</div><p class="tiny">'+h(m.cach)+'</p></div>'+
      '<div class="card pad-sm" style="border-color:rgba(251,146,60,.3)"><div class="tiny up mb" style="color:var(--alert)">NGƯỠNG</div><p class="tiny">'+h(m.nguong)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">ĐỂ LÀM GÌ</div><p class="tiny">'+h(m.dung)+'</p></div>'+
      '</div></div>';
  }).join('');

  o += U.sec('CHU KỲ ĐO','Đo lúc nào, ai đọc, làm gì sau khi đọc.');
  o += U.tbl(['Khi nào','Việc phải làm'], D.chuKy.map(function(k){
    return ['<b class="sm">'+h(k.khi)+'</b>', '<span class="tiny">'+h(k.viec)+'</span>'];
  }));

  o += U.sec('VÒNG CẢI TIẾN','Cập nhật để hợp với khách hàng tiềm năng của kỳ sau.');
  o += '<div class="card">'+U.list(D.caiTien,'#0B7350')+'</div>';
  return o;
};

/* ═══════════════ PHÂN HẠNG VIP & VVIP ═══════════════ */
G.VIEWS['hang-vip'] = function(){
  if(!G.can('pro_consult')) return U.lockCard();
  var P = G.PHANHANG, V = G.CHUAN_VIP;
  if(!P) return U.empty('Chưa mở được phân hạng','Phần này nằm trong kho nghề.');

  var o = U.ph({eyebrow:'NHÓM 05 · QUẢN TRỊ', ic:'crown', grad:1, t:'Phân hạng khách hàng · VIP và VVIP',
    lead:P.cot});

  o += '<div class="grid g4 mb">'+P.hang.map(function(x){
    return '<div class="card pad-sm center" style="border-color:'+x.c+'44">'+
      '<div style="color:'+x.c+';margin-bottom:6px">'+ic(x.tt>=3?'crown':'shield','w-5 h-5')+'</div>'+
      '<b style="color:'+x.c+'">'+h(x.ten)+'</b>'+
      '<p class="tiny muted mt">'+h(x.sla)+'</p></div>';
  }).join('')+'</div>';

  o += P.hang.map(function(x){
    return '<div class="card mb" style="border-color:'+x.c+'33'+(x.tt>=3?';background:'+x.c+'0a':'')+'">'+
      '<div class="row wrap mb" style="gap:8px">'+U.chip(x.ma,x.c)+
      '<b style="color:'+x.c+';font-size:17px">'+h(x.ten)+'</b></div>'+
      '<div class="tiny up mb" style="color:'+x.c+'">ĐIỀU KIỆN VÀO</div>'+U.list(x.vao,x.c)+
      '<div class="grid g2 mt" style="gap:10px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">TÀI LIỆU ĐƯỢC MỞ</div><p class="tiny">'+h(x.taiLieu)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">AI PHỤC VỤ</div><p class="tiny">'+h(x.nguoi)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">THỜI HẠN TRẢ LỜI</div><p class="tiny">'+h(x.sla)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">ĐIỂM CHẠM TỐI THIỂU</div><p class="tiny">'+h(x.cham)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">TRỢ LÝ AI LÀM GÌ</div><p class="tiny">'+h(x.ai)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">QUÀ VÀ QUYỀN THÊM</div><p class="tiny">'+h(x.qua)+'</p></div>'+
      '</div></div>';
  }).join('');

  o += U.sec('LUẬT GIỮ HẠNG','Lên bằng dữ liệu, xuống cũng bằng dữ liệu.');
  o += '<div class="card">'+U.list(P.giuHang,'var(--gita)')+'</div>';

  if(V){
    o += U.sec('CHUẨN NGƯỜI PHỤC VỤ VIP', V.cot);
    o += '<div class="grid g2">'+
      '<div class="card"><div class="up mb" style="color:#0B6675">TƯ VẤN VIP</div>'+U.list(V.tuVan,'#0B6675')+'</div>'+
      '<div class="card"><div class="up mb" style="color:var(--gita)">COACH VIP</div>'+U.list(V.coach,'var(--gita)')+'</div>'+
      '</div>';

    o += U.sec('QUY TRÌNH PHÂN CÔNG','Sáu bước, không bỏ bước nào.');
    o += V.phanCong.map(function(b){
      return '<div class="card mb"><div class="row" style="gap:11px;align-items:flex-start">'+
        '<span class="chip" style="flex:none;color:var(--gold-ink);border-color:var(--gita-vien-2)">'+b.buoc+'</span>'+
        '<div><b class="sm" style="display:block;margin-bottom:4px">'+h(b.ten)+'</b>'+
        '<p class="tiny dim" style="line-height:1.65">'+h(b.mo)+'</p></div></div></div>';
    }).join('');

    o += U.sec('TRỢ LÝ AI CHĂM SÓC VIP','Bảy việc trợ lý làm tự động, trong đúng giới hạn được cấp.');
    o += '<div class="grid g2">'+V.aiVip.map(function(a){
      return '<div class="card pad-sm" style="border-color:var(--gita-mo-3)">'+
        '<div class="row mb" style="gap:8px"><span style="color:var(--gold-ink)">'+ic('spark','w-4 h-4')+'</span>'+
        '<b class="sm">'+h(a.ten)+'</b></div>'+
        '<p class="tiny dim" style="line-height:1.65">'+h(a.mo)+'</p></div>';
    }).join('')+'</div>';
  }
  return o;
};

/* ═══════════════ CÂY TIỀN — CHĂM SÓC VIP & VVIP ═══════════════ */
G.VIEWS['cay-tien'] = function(){
  if(!G.can('pro_consult')) return U.lockCard();
  var C = G.CAYTIEN;
  if(!C) return U.empty('Chưa mở được hệ chăm sóc','Phần này nằm trong kho nghề.');

  var o = U.ph({eyebrow:'NHÓM 05 · QUẢN TRỊ', ic:'seed', grad:1, t:'Cây tiền — hệ chăm sóc VIP và VVIP',
    lead:C.nguon.luan});

  o += '<div class="card mb" style="border-color:var(--gita-vien-1)">'+
    '<div class="row mb" style="gap:8px"><span style="color:var(--gold-ink)">'+ic('book','w-4 h-4')+'</span>'+
    '<b>Nguồn luận điểm</b></div>'+
    '<p class="sm dim" style="line-height:1.75"><b>'+h(C.nguon.ten)+'</b> — '+h(C.nguon.tacGia)+
    ' · '+h(C.nguon.tuSach)+'</p>'+
    '<p class="sm mt"><b>'+h(C.nguon.bonViec)+'</b></p>'+
    '<div class="mt">'+U.list(C.nguon.chuong,'#5140B4')+'</div>'+
    '<p class="tiny muted mt" style="line-height:1.65">'+h(C.nguon.ghiChu)+'</p></div>';

  o += U.sec('BỐN VIỆC, ĐỌC THEO GITA','Sách nói cho doanh nghiệp. GITA đọc lại cho một hệ đồng hành gia đình.');
  o += C.bonViec.map(function(b){
    return '<div class="card mb" style="border-color:'+b.c+'2a">'+
      '<div class="row wrap mb" style="gap:9px">'+U.chip(String(b.no),b.c)+
      '<b style="color:'+b.c+';font-size:16px">'+h(b.ten)+'</b>'+
      '<span class="tiny muted" style="font-style:italic">'+h(b.sach)+'</span></div>'+
      '<p class="sm dim" style="line-height:1.75;margin-bottom:10px">'+h(b.gita)+'</p>'+
      U.list(b.lam,b.c)+'</div>';
  }).join('');

  o += U.sec('ĐIỂM CÂY TIỀN', C.diemCay.cot);
  o += U.tbl(['Mã','Yếu tố','Trọng số','Cách tính'], C.diemCay.yeuTo.map(function(y){
    return [U.chip(y.ma,'var(--gita)'), '<b class="sm">'+h(y.ten)+'</b>',
            '<b class="sm" style="color:var(--gold-ink)">'+y.trong+'%</b>', '<span class="tiny">'+h(y.cach)+'</span>'];
  }));
  o += '<div class="grid g4 mt">'+C.diemCay.doc.map(function(d){
    return '<div class="card pad-sm" style="border-color:'+d.c+'44">'+
      '<div class="row mb" style="gap:8px">'+U.dot(d.c)+'<b class="sm" style="color:'+d.c+'">'+h(d.ten)+'</b></div>'+
      '<div class="tiny muted mb">'+d.tu+'–'+d.den+' điểm</div>'+
      '<p class="tiny dim" style="line-height:1.6">'+h(d.y)+'</p></div>';
  }).join('')+'</div>';
  o += '<div class="card mt" style="border-color:rgba(248,113,113,.28)">'+
    '<div class="tiny up mb" style="color:#BE0E16">RANH GIỚI CỦA ĐIỂM SỐ NÀY</div>'+
    U.list(C.diemCay.luat,'#BE0E16')+'</div>';

  o += U.sec('PHÉP Ô LƯỚI', C.oLuoi.cot);
  o += '<div class="card"><div class="grid g2 mb" style="gap:10px">'+
    '<div class="card pad-sm"><div class="tiny up muted mb">TRỤC DỌC</div><p class="sm">'+h(C.oLuoi.truc1)+'</p></div>'+
    '<div class="card pad-sm"><div class="tiny up muted mb">TRỤC NGANG</div><p class="sm">'+h(C.oLuoi.truc2)+'</p></div>'+
    '</div>'+U.list(C.oLuoi.luat,'#0B6675')+'</div>';

  o += U.sec('THẺ PHỤC VỤ','Sách chia thẻ bạc – vàng – bạch kim. GITA đọc thành bốn hạng.');
  o += '<div class="grid g4">'+C.theDoi.map(function(t){
    return '<div class="card pad-sm" style="border-color:'+t.c+'44">'+
      '<div class="tiny muted mb">'+h(t.sach)+'</div>'+
      '<b class="sm" style="color:'+t.c+'">'+h(t.gita)+'</b></div>';
  }).join('')+'</div>';

  o += U.sec('MƯỜI HAI NHỊP CHĂM SÓC','Cột VIP là chuẩn tối thiểu. Cột VVIP là phần cộng thêm, không thay thế.');
  o += U.tbl(['Nhịp','VIP','VVIP'], C.nhipChamSoc.map(function(n){
    return ['<b class="sm">'+h(n.nhip)+'</b>',
            '<span class="tiny">'+h(n.vip)+'</span>',
            '<span class="tiny" style="color:var(--gita-do)">'+h(n.vvip)+'</span>'];
  }));

  o += U.sec('BỐN NẤC QUAN HỆ','Từ mua bán tới liên minh chiến lược.');
  o += '<div class="grid g4">'+C.bonNac.map(function(n){
    return '<div class="card pad-sm" style="border-color:'+n.c+'44">'+
      '<div class="row mb" style="gap:8px">'+U.chip('NẤC '+n.nac,n.c)+'</div>'+
      '<b class="sm" style="display:block;color:'+n.c+';margin-bottom:6px">'+h(n.ten)+'</b>'+
      '<p class="tiny dim" style="line-height:1.6;margin-bottom:8px">'+h(n.mo)+'</p>'+
      '<div class="tiny muted mb"><b>Dấu hiệu:</b> '+h(n.dau)+'</div>'+
      '<div class="tiny" style="color:'+n.c+'"><b>Lên nấc:</b> '+h(n.len)+'</div></div>';
  }).join('')+'</div>';

  o += U.sec('NHÂN BẢN DỊCH VỤ', C.nhanBan.cot);
  o += '<div class="card">'+U.list(C.nhanBan.viec,'#0B7350')+'</div>';

  o += U.sec('GIÁ TRỊ TRỌN ĐỜI CỦA MỘT GIA ĐÌNH', C.vongDoi.cot);
  o += '<div class="card"><div class="card pad-sm mb" style="border-color:var(--gita-vien-1)">'+
    '<p class="sm" style="line-height:1.75"><b>'+h(C.vongDoi.congThuc)+'</b></p></div>'+
    U.list(C.vongDoi.y,'var(--gita)')+'</div>';
  return o;
};

/* ═══════════════ TỆP NHÂN SỰ TRUNG THÀNH ═══════════════ */
G.VIEWS['nhan-su-tt'] = function(){
  if(!G.can('pro_consult')) return U.lockCard();
  var N = G.NHANSU_TT;
  if(!N) return U.empty('Chưa mở được tệp nhân sự','Phần này nằm trong kho nghề.');

  var o = U.ph({eyebrow:'NHÓM 05 · QUẢN TRỊ', ic:'users', grad:1, t:'Tệp nhân sự trung thành',
    lead:N.cot});

  o += N.bac.map(function(b){
    return '<div class="card mb" style="border-color:'+b.c+'2a">'+
      '<div class="row wrap mb" style="gap:8px">'+U.chip('BẬC '+b.no,b.c)+U.chip(b.thang)+
      '<b style="color:'+b.c+';font-size:16px">'+h(b.ten)+'</b></div>'+
      '<div class="grid g3" style="gap:10px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">DẤU HIỆU</div><p class="tiny">'+h(b.dau)+'</p></div>'+
      '<div class="card pad-sm" style="border-color:'+b.c+'33"><div class="tiny up mb" style="color:'+b.c+'">GIỮ BẰNG GÌ</div><p class="tiny">'+h(b.giu)+'</p></div>'+
      '<div class="card pad-sm" style="border-color:rgba(248,113,113,.28)"><div class="tiny up mb" style="color:#BE0E16">MẤT VÌ GÌ</div><p class="tiny">'+h(b.roi)+'</p></div>'+
      '</div></div>';
  }).join('');

  o += U.sec('BẢY CHỈ SỐ ĐO ĐỘ TRUNG THÀNH','Không xếp hạng người bằng doanh số đơn thuần.');
  o += U.tbl(['Mã','Chỉ số','Cách tính'], N.doTrungThanh.map(function(x){
    return [U.chip(x.ma,'#0B7350'), '<b class="sm">'+h(x.ten)+'</b>', '<span class="tiny">'+h(x.cach)+'</span>'];
  }));

  o += U.sec('NĂM LUẬT','Không thương lượng.');
  o += '<div class="card">'+U.list(N.luat,'var(--gita)')+'</div>';
  return o;
};

/* ═══════════════ SỰ KIỆN ═══════════════ */
function on(sel, fn){
  document.addEventListener('click', function(e){
    var el = e.target.closest && e.target.closest(sel);
    if(el){ e.preventDefault(); fn(el, e); }
  });
}
on('[data-mtn]', function(el){
  var f = el.getAttribute('data-mtn');
  document.querySelectorAll('[data-mtn]').forEach(function(b){ b.classList.toggle('on', b===el); });
  document.querySelectorAll('#mtList [data-f]').forEach(function(c){
    c.style.display = (f==='ALL' || c.getAttribute('data-f')===f) ? '' : 'none'; });
});
on('[data-mtv]', function(el){ G.maTranModal(el.getAttribute('data-mtv')); });
on('[data-mtt]', function(el){
  var t = el.getAttribute('data-mtt');
  document.querySelectorAll('[data-mtt]').forEach(function(b){ b.classList.toggle('on', b===el); });
  document.querySelectorAll('[data-mtp]').forEach(function(p){
    p.style.display = p.getAttribute('data-mtp')===t ? 'block' : 'none'; });
});
on('[data-mtin]', function(){ G.inTrang('Phác đồ ma trận'); });
})();

})();

/* ═════════ src/views10.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.4 — XƯƠNG SỐNG PHƯƠNG PHÁP · CHUẨN HỒ SƠ VIP ·
   CHIẾN LƯỢC CHUYỂN ĐỔI · TRỢ LÝ CHĂM SÓC · SINH TRẮC VÂN TAY
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};
(function(){
var U = G.U, h = U.h, ic = U.ic;
function tc(t){ var x=(G.TIERS||[]).filter(function(y){return y.code===t;})[0]; return x ? x.c : 'var(--gita)'; }

/* ═══════════════ XƯƠNG SỐNG PHƯƠNG PHÁP ═══════════════ */
G.VIEWS['phuong-phap'] = function(){
  /* Kho nghề, không phải công cụ Coach: Tư vấn phải đọc được xương sống
     phương pháp thì mới nói đúng với gia đình ở buổi mở cửa. Trước đây khoá
     ở pro_coach nên Tư vấn thấy mục này trong trình đơn mà bấm vào chỉ ra
     một thẻ khoá — một mục chết. */
  if(!G.can('nghe_chung')) return U.lockCard();
  var X = G.XUONG_SONG, P = G.PHUONGPHAP, S = G.SACH_THAMKHAO, V = G.NGUON_VAITRO;
  if(!X) return U.empty('Chưa mở được phần phương pháp','Phần này nằm trong kho nghề.');

  var o = U.ph({eyebrow:'NHÓM 03 · KHO BÁU VẬT', ic:'brain', grad:1, t:'Xương sống phương pháp',
    lead:X.tuyenBo});

  o += '<div class="grid g2 mb">'+X.tru.map(function(t){
    return '<div class="card" style="border-color:'+t.c+'44;background:'+t.c+'0a">'+
      '<div class="row wrap mb" style="gap:8px">'+U.chip(t.ma,t.c)+
      '<b style="color:'+t.c+';font-size:16px">'+h(t.ten)+'</b></div>'+
      '<div class="tiny up mb" style="color:'+t.c+'">GỐC</div>'+
      '<p class="sm" style="margin-bottom:9px"><b>'+h(t.goc)+'</b></p>'+
      '<p class="sm dim" style="line-height:1.7;margin-bottom:10px">'+h(t.mo)+'</p>'+
      '<div class="row wrap" style="gap:5px">'+t.quan.map(function(m){
        return '<span class="chip" style="font-size:10.5px;color:'+t.c+';border-color:'+t.c+'33">'+h(m)+'</span>';
      }).join('')+'</div></div>';
  }).join('')+'</div>';

  if(V){
    o += U.sec('PHÂN VAI CÁC NGUỒN','Ba loại nguồn, ba vai khác nhau. Lẫn vai là hỏng hệ thống.');
    o += V.map(function(x){
      return '<div class="card mb" style="border-color:'+x.c+'33">'+
        '<div class="row wrap mb" style="gap:8px">'+U.chip(x.ma,x.c)+
        '<b style="color:'+x.c+'">'+h(x.ten)+'</b></div>'+
        '<p class="tiny muted mb">'+h(x.gom)+'</p>'+
        '<p class="sm" style="line-height:1.7;margin-bottom:8px"><b>'+h(x.vai)+'</b></p>'+
        '<div class="grid g2" style="gap:10px">'+
        '<div class="card pad-sm"><div class="tiny up muted mb">DÙNG ĐỂ</div><p class="tiny">'+h(x.dung)+'</p></div>'+
        '<div class="card pad-sm" style="border-color:rgba(248,113,113,.28)"><div class="tiny up mb" style="color:#BE0E16">KHÔNG DÙNG</div><p class="tiny">'+h(x.khong)+'</p></div>'+
        '</div></div>';
    }).join('');
  }

  o += U.sec('SÁU NHỊP LẬP TRÌNH NGÔN NGỮ','Khung ngôn từ đi xuyên mọi cuộc trò chuyện của GITA. Đảo thứ tự là mất người.');
  o += '<div class="grid g3">'+X.sauNhip.map(function(n,i){
    return '<div class="card pad-sm" style="border-color:rgba(139,92,246,.28)">'+
      '<div class="row wrap mb" style="gap:7px">'+U.chip(n.ma,'#5140B4')+
      '<span class="tiny muted">'+h(n.tam)+'</span></div>'+
      '<b class="sm" style="display:block;margin-bottom:6px">'+h(n.ten)+'</b>'+
      '<p class="tiny dim" style="line-height:1.6">'+h(n.ky)+'</p></div>';
  }).join('')+'</div>';

  o += U.sec('LUẬT NGÔN NGỮ','Áp cho cả người và cho trợ lý.');
  o += '<div class="card">'+U.list(X.luatNgonNgu,'#5140B4')+'</div>';

  if(P){
    o += U.sec('GÁN PHƯƠNG PHÁP THEO NHÓM × TẦNG', P.cot);
    o += '<div class="card mb" style="border-color:var(--gita-vien-1)"><p class="sm dim" style="line-height:1.7">'+h(P.xuongSong||'')+'</p></div>';
    o += P.nhom.map(function(n){
      return '<div class="card mb" style="border-color:'+n.c+'2a">'+
        '<div class="row wrap mb" style="gap:8px">'+U.chip(n.ma,n.c)+
        '<b style="color:'+n.c+';font-size:15px">'+h(n.ten)+'</b></div>'+
        '<p class="tiny muted mb">'+h(n.doc)+'</p>'+
        '<div class="card pad-sm mb" style="border-color:'+n.c+'33"><div class="tiny up mb" style="color:'+n.c+'">NGUYÊN TẮC</div>'+
        '<p class="sm">'+h(n.nguyenTac)+'</p></div>'+
        U.tbl(['Tầng','Mô thức GITA','Nhịp','Việc','Đo bằng'], n.tang.map(function(t){
          return ['<b class="sm" style="color:'+tc(t.t)+'">'+h(t.t)+'</b>',
                  '<span class="tiny" style="color:var(--gold-ink)"><b>'+h(t.mt||'')+'</b></span>',
                  '<span class="tiny" style="color:#5140B4">'+h(t.nhip||'')+'</span>',
                  '<span class="tiny">'+h(t.viec)+'</span>',
                  '<span class="tiny muted">'+h(t.do)+'</span>'];
        }))+'</div>';
    }).join('');
    o += '<div class="card mt" style="border-color:rgba(251,146,60,.3)">'+
      '<div class="tiny up mb" style="color:var(--alert)">LUẬT GÁN</div>'+U.list(P.luat,'var(--alert)')+'</div>';
  }

  if(S){
    o += U.sec('SÁCH THAM KHẢO BỔ TRỢ','Không phải phương pháp của GITA. Là tài nguyên để Tư vấn và Coach biên soạn tài liệu mới cho khách hàng.');
    o += S.map(function(b){
      return '<div class="card mb" style="border-color:'+b.c+'22">'+
        '<div class="row wrap mb" style="gap:8px">'+U.chip(b.vaiTro||'THAM KHẢO', b.c)+
        '<b style="color:'+b.c+'">'+h(b.ten)+'</b>'+
        '<span class="tiny muted">'+h(b.tacGia)+'</span></div>'+
        (b.boTroCho ? '<p class="tiny mb" style="color:var(--gold-ink)">Bổ trợ cho: '+h(b.boTroCho)+'</p>' : '')+
        '<p class="sm dim" style="line-height:1.7;margin-bottom:9px">'+h(b.khung)+'</p>'+
        '<div class="grid g2" style="gap:10px">'+
        '<div><div class="tiny up mb" style="color:'+b.c+'">NỘI DUNG LẤY ĐƯỢC</div>'+
        U.list(b.muc.map(function(m){return m.no+'. '+m.t+' — '+m.y;}), b.c)+'</div>'+
        '<div><div class="tiny up mb" style="color:#0B7350">BIÊN SOẠN RA ĐƯỢC</div>'+
        U.list(b.bienSoan||[], '#0B7350')+'</div></div>'+
        (b.themVao ? '<p class="tiny muted mt" style="line-height:1.6">'+h(b.themVao)+'</p>' : '')+
        '<div class="card pad-sm mt" style="border-color:var(--gita-mo-3)">'+
        '<div class="tiny up mb" style="color:var(--gold-ink)">GITA DÙNG THẾ NÀO</div>'+
        '<p class="tiny">'+h(b.gitaDung)+'</p></div></div>';
    }).join('');
    o += '<div class="card mt2" style="border-color:rgba(248,113,113,.3)">'+
      '<div class="tiny up mb" style="color:#BE0E16">LUẬT DÙNG SÁCH THAM KHẢO</div>'+
      U.list(X.luatThamKhao,'#BE0E16')+'</div>';
  }
  return o;
};

/* ═══════════════ CHUẨN HỒ SƠ VIP & VVIP ═══════════════ */
G.VIEWS['hoso-vip'] = function(){
  if(!G.can('pro_consult')) return U.lockCard();
  var H = G.HOSO_VIP;
  if(!H) return U.empty('Chưa mở được chuẩn hồ sơ','Phần này nằm trong kho nghề.');

  var o = U.ph({eyebrow:'NHÓM 05 · QUẢN TRỊ', ic:'book', grad:1, t:'Chuẩn hồ sơ VIP và VVIP',
    lead:H.cot});

  o += '<div class="card mb" style="border-color:rgba(248,113,113,.35);background:rgba(248,113,113,.05)">'+
    '<div class="row mb" style="gap:8px"><span style="color:#BE0E16">'+ic('shield','w-4 h-4')+'</span>'+
    '<b style="color:#BE0E16">'+h(H.ranhGioi.tieu)+'</b></div>'+
    U.tbl(['KHÔNG ghi vào hồ sơ','Vì sao'], H.ranhGioi.khongGhi.map(function(x){
      return ['<b class="sm">'+h(x.muc)+'</b>','<span class="tiny">'+h(x.vi)+'</span>'];
    }))+
    '<div class="mt">'+U.list(H.ranhGioi.luat,'#BE0E16')+'</div></div>';

  o += U.sec('BẢY PHẦN CỦA HỒ SƠ','Đối chiếu với mẫu hồ sơ khách hàng lớn trong sách Cây Tiền, đã lọc lại cho ngành giáo dục.');
  o += H.phan.map(function(p){
    return '<div class="card mb" style="border-color:'+p.c+'2a">'+
      '<div class="row wrap mb" style="gap:8px">'+U.chip('PHẦN '+p.no,p.c)+
      '<b style="color:'+p.c+';font-size:15px">'+h(p.ten)+'</b>'+
      '<span class="tiny muted">'+h(p.sach)+'</span></div>'+
      U.tbl(['Trường','','Ghi gì'], p.truong.map(function(t){
        return ['<b class="sm">'+h(t.t)+'</b>',
                t.bb ? '<span class="chip" style="color:'+p.c+';border-color:'+p.c+'44">bắt buộc</span>' : '<span class="tiny muted">tuỳ</span>',
                '<span class="tiny">'+h(t.mo)+'</span>'];
      }))+'</div>';
  }).join('');

  o += U.sec('MỨC ĐẦY HỒ SƠ THEO HẠNG','Hạng càng cao thì hồ sơ càng phải đầy — và càng sớm.');
  o += U.tbl(['Hạng','Cần có','Mức đầy','Hạn'], H.mucDay.map(function(m){
    return ['<b class="sm" style="color:'+m.c+'">'+h(m.hang)+'</b>',
            '<span class="tiny">'+h(m.can)+'</span>',
            '<b class="tiny">'+h(m.do)+'</b>',
            '<span class="tiny muted">'+h(m.khi)+'</span>'];
  }));

  o += U.sec('BA MƯƠI GIÂY','Sách nói mọi thông tin của một khách hàng phải tra ra được trong ba mươi giây. Đây là sáu câu phải trả lời được.');
  o += '<div class="card" style="border-color:var(--gita-vien-1)">'+
    U.list(H.baMuoiGiay.map(function(c,i){return (i+1)+'. '+c;}),'var(--gita)')+
    '<p class="sm dim mt" style="line-height:1.7">'+h(H.luatBaMuoiGiay)+'</p></div>';
  return o;
};

/* ═══════════════ CHIẾN LƯỢC CHUYỂN ĐỔI ═══════════════ */
G.VIEWS['chuyen-doi'] = function(){
  /* Kho tra cứu của nghề, không phải công cụ thao tác với gia đình.
     Bảng PERM đã nói rõ: nghe_chung mở cho R01–R12 — "toàn bộ kho nghề".
     Khoá ở pro_coach hoặc pro_consult thì Chuyên gia đánh giá, Chuyên gia
     tư vấn và Phân tích dữ liệu thấy mục này trong trình đơn mà bấm vào
     chỉ nhận được một thẻ khoá — đúng loại mục chết anh Quang đã bảo dẹp.
     Quyền THAO TÁC (buồng lái Coach, cổng nghiệm thu, xuất dữ liệu) vẫn
     giữ nguyên ở pro_coach và pro_approve. */
  if(!G.can('nghe_chung')) return U.lockCard();
  var C = G.CHUYENDOI;
  if(!C) return U.empty('Chưa mở được chiến lược chuyển đổi','Phần này nằm trong kho nghề.');

  var o = U.ph({eyebrow:'NHÓM 04 · MỞ CỬA', ic:'compass', grad:1, t:'Chín cổng chuyển đổi',
    lead:C.cot});

  o += '<div class="card mb" style="border-color:var(--gita-vien-1)">'+
    '<div class="tiny up mb" style="color:var(--gold-ink)">LUẬT CHUNG</div>'+U.list(C.luatChung,'var(--gita)')+'</div>';

  o += C.cong.map(function(x){
    return '<div class="card mb" style="border-color:'+x.c+'2a">'+
      '<div class="row wrap" style="gap:8px;justify-content:space-between;margin-bottom:10px">'+
      '<div class="row wrap" style="gap:8px">'+U.chip(x.ma,x.c)+
      '<b style="color:'+x.c+';font-size:15px">'+h(x.ten)+'</b></div>'+
      '<span class="tiny" style="color:'+x.c+'">'+h(x.ty)+'</span></div>'+
      U.ba(x.tu, x.den, 'TỪ', 'ĐẾN')+
      '<div class="grid g2 mt" style="gap:10px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">TÍN HIỆU MỞ CỔNG</div><p class="tiny">'+h(x.tinHieu)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">AI LÀM</div><p class="tiny">'+h(x.ai)+'</p></div>'+
      '</div>'+
      '<div class="card pad-sm mt" style="border-color:'+x.c+'33"><div class="tiny up mb" style="color:'+x.c+'">ĐƯA RA CÁI GÌ</div>'+
      '<p class="sm">'+h(x.dua)+'</p></div>'+
      '<div class="tiny up mt mb" style="color:'+x.c+'">VIỆC PHẢI LÀM</div>'+U.list(x.lam,x.c)+
      '<div class="card pad-sm mt" style="border-color:rgba(248,113,113,.3)">'+
      '<div class="tiny up mb" style="color:#BE0E16">CẤM</div><p class="tiny">'+h(x.cam)+'</p></div></div>';
  }).join('');

  o += U.sec('BA VÒNG GIỮ CHÂN','Sách nói sự vô tâm mới đuổi khách đi, không phải chuẩn thấp.');
  o += '<div class="grid g3">'+C.giuChan.map(function(g){
    return '<div class="card pad-sm" style="border-color:'+g.c+'44">'+
      '<div class="row wrap mb" style="gap:7px">'+U.chip(g.muc,g.c)+
      '<span class="tiny muted">trong '+h(g.trong)+'</span></div>'+
      '<div class="tiny up mb" style="color:'+g.c+'">DẤU HIỆU</div>'+
      '<p class="tiny dim mb" style="line-height:1.6">'+h(g.dau)+'</p>'+
      '<div class="tiny up mb" style="color:'+g.c+'">LÀM GÌ</div>'+
      '<p class="tiny dim" style="line-height:1.6;margin-bottom:7px">'+h(g.lam)+'</p>'+
      '<div class="tiny" style="color:var(--ink-4)">'+ic('users','w-3 h-3')+' '+h(g.ai)+'</div></div>';
  }).join('')+'</div>';

  o += U.sec('ĐO CHUYỂN ĐỔI','Cổng nào tụt thì sửa cổng đó, không trách người.');
  o += U.tbl(['Mã','Chỉ số','Cách tính','Dùng để'], C.doChuyenDoi.map(function(d){
    return [U.chip(d.ma,'#0B6675'),'<b class="sm">'+h(d.ten)+'</b>',
            '<span class="tiny">'+h(d.cach)+'</span>','<span class="tiny muted">'+h(d.dung)+'</span>'];
  }));
  return o;
};

/* ═══════════════ TRỢ LÝ CHĂM SÓC TỰ ĐỘNG ═══════════════ */
G.VIEWS['ai-cham'] = function(){
  /* Chính sách và số liệu tổng hợp, không phải hồ sơ của một nhà cụ thể.
     Phân tích dữ liệu (R12) phải đọc được thì mới phân tích được — mà bảng
     PERM vốn đã xếp R12 trong nghe_chung. Khoá ở pro_consult chỉ tạo ra một
     mục chết trong trình đơn của họ. */
  if(!G.can('nghe_chung')) return U.lockCard();
  var A = G.AICHAM;
  if(!A) return U.empty('Chưa mở được đặc tả trợ lý','Phần này nằm trong kho nghề.');

  var o = U.ph({eyebrow:'NHÓM 05 · QUẢN TRỊ', ic:'spark', grad:1, t:'Trợ lý chăm sóc tự động',
    lead:A.cot});

  o += '<div class="grid g3 mb">'+A.nguyenTac.map(function(n){
    return '<div class="card pad-sm" style="border-color:var(--gita-mo-3)">'+
      '<div class="row mb" style="gap:8px">'+U.chip(String(n.no),'var(--gita)')+
      '<b class="sm">'+h(n.t)+'</b></div>'+
      '<p class="tiny dim" style="line-height:1.6">'+h(n.y)+'</p></div>';
  }).join('')+'</div>';

  o += U.sec('MƯỜI SÁU LUẬT CHẠY NỀN','Mỗi luật đọc được bằng máy: điều kiện → việc làm → cho ai → hạn nào.');
  o += U.tbl(['Mã','Luật','Khi nào bật','Làm gì','Cho ai · hạn','Hạng'], A.luat.map(function(l){
    return [U.chip(l.ma,l.c),'<b class="sm" style="color:'+l.c+'">'+h(l.ten)+'</b>',
            '<span class="tiny mono">'+h(l.khi)+'</span>',
            '<span class="tiny">'+h(l.lam)+'</span>',
            '<span class="tiny muted">'+h(l.cho)+'<br>'+h(l.han)+'</span>',
            '<span class="tiny">'+h(l.hang)+'</span>'];
  }));

  o += '<div class="grid g2 mt2">'+
    '<div class="card" style="border-color:rgba(16,185,129,.3)"><div class="up mb" style="color:#0B7350">TRỢ LÝ ĐƯỢC LÀM</div>'+
    U.list(A.duocLam,'#0B7350')+'</div>'+
    '<div class="card" style="border-color:rgba(248,113,113,.3)"><div class="up mb" style="color:#BE0E16">TUYỆT ĐỐI KHÔNG</div>'+
    U.list(A.khongDuocLam,'#BE0E16')+'</div></div>';

  o += U.sec('VÌ SAO CHẠY ĐƯỢC TRONG 500.000Đ/THÁNG', A.chiPhi.cot);
  o += U.tbl(['Loại việc','Chạy ở đâu','Chi phí'], A.chiPhi.tach.map(function(t){
    return ['<b class="sm">'+h(t.loai)+'</b>','<span class="tiny">'+h(t.chay)+'</span>',
            '<b class="tiny" style="color:#0B7350">'+h(t.gia)+'</b>'];
  }));
  o += '<div class="card mt" style="border-color:var(--gita-vien-1)"><p class="sm dim" style="line-height:1.75">'+h(A.chiPhi.chan)+'</p></div>';
  return o;
};

/* ═══════════════ SINH TRẮC HỌC VÂN TAY ═══════════════ */
G.VIEWS['van-tay'] = function(){
  /* Kho tra cứu của nghề, không phải công cụ thao tác với gia đình.
     Bảng PERM đã nói rõ: nghe_chung mở cho R01–R12 — "toàn bộ kho nghề".
     Khoá ở pro_coach hoặc pro_consult thì Chuyên gia đánh giá, Chuyên gia
     tư vấn và Phân tích dữ liệu thấy mục này trong trình đơn mà bấm vào
     chỉ nhận được một thẻ khoá — đúng loại mục chết anh Quang đã bảo dẹp.
     Quyền THAO TÁC (buồng lái Coach, cổng nghiệm thu, xuất dữ liệu) vẫn
     giữ nguyên ở pro_coach và pro_approve. */
  if(!G.can('nghe_chung')) return U.lockCard();
  var V = G.VANTAY;
  if(!V) return U.empty('Chưa mở được phần này','Phần này nằm trong kho nghề.');

  var o = U.ph({eyebrow:'NHÓM 03 · KHO BÁU VẬT', ic:'shield', grad:1, t:'Sinh trắc học vân tay',
    lead:'Câu hỏi này đến từ phụ huynh gần như mỗi tuần. Đây là câu trả lời thống nhất của GITA.'});

  o += '<div class="card mb" style="border-color:rgba(248,113,113,.4);background:rgba(248,113,113,.06)">'+
    '<div class="row mb" style="gap:8px"><span style="color:#BE0E16">'+ic('x','w-5 h-5')+'</span>'+
    '<b style="color:#BE0E16;font-size:16px">Kết luận</b></div>'+
    '<p class="sm" style="line-height:1.8"><b>'+h(V.ketLuan)+'</b></p></div>';

  o += U.sec('VÌ SAO','Năm lý do, xếp theo mức quan trọng.');
  o += '<div class="card">'+U.list(V.viSao,'#BE0E16')+'</div>';

  o += U.sec(V.thayVao.tieu, V.thayVao.y);
  o += U.tbl(['Mặt so sánh','Sinh trắc vân tay','Bộ test nhận diện GITA'], V.thayVao.doSanh.map(function(d){
    return ['<b class="sm">'+h(d.mat)+'</b>',
            '<span class="tiny" style="color:#BE0E16">'+h(d.vt)+'</span>',
            '<span class="tiny" style="color:#0B7350">'+h(d.gita)+'</span>'];
  }));

  o += U.sec(V.neuKhachHoi.tieu,'Không tranh luận đúng sai ngay buổi đầu — làm thế là mất gia đình.');
  o += '<div class="card">'+U.list(V.neuKhachHoi.cach,'#0B6675')+'</div>';

  o += '<div class="card mt2" style="border-color:rgba(248,113,113,.35)">'+
    '<div class="tiny up mb" style="color:#BE0E16">LUẬT CỨNG</div>'+U.list(V.luatCung,'#BE0E16')+'</div>';
  return o;
};
})();

})();

/* ═════════ src/chieu-sau.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.9 — CHIỀU SÂU NĂM LỚP: TRA CỨU VÀ ĐO

   Hàm phải nằm ở src/, không nằm ở kho-goc/ — kho đóng gói bằng
   JSON.stringify nên hàm viết trong kho sẽ biến mất sau khi mã hoá.

   Màn này cố ý hiện CẢ PHẦN CHƯA VIẾT. Một bảng chỉ khoe phần đã xong
   thì không dùng để điều hành được; anh Quang cần biết còn bao nhiêu mô
   thức chưa có chiều sâu, và thiếu ở lớp nào.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function(){
var U = G.U, h = U.h, ic = U.ic;
G.VIEWS = G.VIEWS || {};

var CAP = ['C1','C2','C3','C4','C5'];
var TRUONG_CAP = ['lam','chua','viec','len'];
var TRUONG_CHUNG = ['nha','truong','xaHoi','thoiQuen','di','tuLieu'];

/* Chiều sâu của một mô thức, hoặc null nếu chưa viết */
G.sauCua = function(id){
  var b = G.MT_SAU;
  return (b && b[id]) ? b[id] : null;
};

/* Một lớp cụ thể — dùng khi giao diện lọc theo cấp của người đang đăng nhập */
G.sauLop = function(id, cap){
  var r = G.sauCua(id);
  return (r && r.c && r.c[cap]) ? r.c[cap] : null;
};

/* Đếm độ phủ. Trả về số thật, kể cả khi số ấy khó nhìn. */
G.sauDoPhu = function(){
  var ds = G.MOTHUC || [], b = G.MT_SAU || {};
  var du = [], thieu = [], chuaCo = [];
  ds.forEach(function(m){
    var r = b[m.id];
    if(!r){ chuaCo.push(m.id); return; }
    var hong = [];
    TRUONG_CHUNG.forEach(function(f){ if(!r[f]) hong.push(f); });
    CAP.forEach(function(c){
      var l = r.c && r.c[c];
      if(!l){ hong.push(c); return; }
      TRUONG_CAP.forEach(function(f){ if(!l[f]) hong.push(c + '.' + f); });
    });
    if(hong.length) thieu.push({ id:m.id, hong:hong });
    else du.push(m.id);
  });
  return { tong:ds.length, du:du, thieu:thieu, chuaCo:chuaCo,
           pt: ds.length ? Math.round(du.length * 100 / ds.length) : 0 };
};

/* Luật "năm lớp phải THẬT SỰ khác nhau" phải đo được, nếu không nó chỉ là
   một câu trong tài liệu. Phép đo: hai lớp bất kỳ của cùng một mô thức
   không được có phần 'lam' giống nhau, và không lớp nào được ngắn hơn
   một câu thật. */
G.sauLopKhacNhau = function(){
  var b = G.MT_SAU || {}, lap = [], cut = [];
  Object.keys(b).forEach(function(id){
    var r = b[id], thay = {};
    CAP.forEach(function(c){
      var l = r.c && r.c[c]; if(!l) return;
      TRUONG_CAP.forEach(function(f){
        var v = String(l[f] || '').trim();
        if(v.length && v.length < 40) cut.push(id + '.' + c + '.' + f + '(' + v.length + ')');
      });
      var k = String(l.lam || '').trim().toLowerCase();
      if(!k) return;
      if(thay[k]) lap.push(id + ': ' + thay[k] + ' và ' + c + ' làm được cùng một việc');
      thay[k] = c;
    });
  });
  return { lap:lap, cut:cut };
};

/* ══════════ MÀN HÌNH ══════════ */
G.VIEWS['chieu-sau'] = function(){
  if(!G.can('nghe_chung')) return U.lockCard();

  var d = G.sauDoPhu(), kn = G.sauLopKhacNhau();
  var DS = G.MOTHUC || [], CD = G.CAPDO_VANDUNG || [];

  var o = U.ph({eyebrow:'CHUẨN CHIỀU SÂU', ic:'chart', grad:1,
    t:'Năm lớp trên mỗi mô thức',
    lead:'Cùng một mô thức, năm người ở năm cấp nghề khác nhau phải LÀM ĐƯỢC năm việc khác nhau. '+
         'Bảng dưới đếm thật: mô thức nào đã có đủ năm lớp, mô thức nào chưa, và thiếu ở đâu.'});

  /* Con số đứng đầu, kể cả khi khó nhìn */
  o += '<div class="grid g4 mt2">'+
    U.stat({k:'MÔ THỨC ĐỦ NĂM LỚP', v:d.du.length + '/' + d.tong, d:'đủ cả 6 trường chung và 5×4 trường lớp',
            c: d.pt >= 100 ? '#0B7350' : (d.pt >= 50 ? '#B45309' : '#BE0E16')})+
    U.stat({k:'ĐỘ PHỦ', v:d.pt + '%', d:'phần trăm kho mô thức đã có chiều sâu',
            c: d.pt >= 100 ? '#0B7350' : '#BE0E16'})+
    U.stat({k:'CHƯA VIẾT', v:d.chuaCo.length, d:'chưa có bản ghi chiều sâu nào', c:'#B45309'})+
    U.stat({k:'VIẾT DỞ', v:d.thieu.length, d:'có bản ghi nhưng còn trường trống', c:'#B45309'})+
  '</div>';

  /* ══ CHIỀU SÂU CỦA PHÁC ĐỒ VÀ TÌNH HUỐNG ══
     Màn này từng chỉ đếm 42 mô thức, nên nó báo đúng 100% trong khi 220
     phác đồ và 250 tình huống chưa có lớp nào. Người đọc thấy 100% rồi
     yên tâm — đó là con số đúng đo sai phạm vi.

     Ba kho viết theo ba mức khác nhau có chủ ý: mô thức viết từng cái
     (42), phác đồ viết theo nhóm (11 nhóm × 20), tình huống viết theo
     chủ đề (10 chủ đề × 25). Bảng dưới nói rõ mức nào là mức nào, chứ
     không gộp thành một con số làm mờ cả ba. */
  var PDS = G.PD_SAU || {}, THS = G.TH_SAU || {};
  var soNhomPD = {}; (G.PHACDO || []).forEach(function(x){ soNhomPD[x.nhom] = 1; });
  var canPD = Object.keys(soNhomPD).length;
  var coPD = Object.keys(PDS).length, coTH = Object.keys(THS).length;
  var nk = G.nkSoat ? G.nkSoat() : null;

  o += U.sec('BA KHO, BA MỨC VIẾT', 'Không gộp thành một con số — gộp là làm mờ chỗ còn thiếu');
  o += U.tbl(['Kho', 'Số bản ghi', 'Viết chiều sâu theo', 'Đã có', 'Còn thiếu'], [
    ['Mô thức', String((G.MOTHUC || []).length), 'từng mô thức',
      d.du.length + '/' + d.tong,
      d.du.length >= d.tong ? '<span style="color:var(--ok)">không</span>'
        : '<span style="color:var(--alert)">' + (d.tong - d.du.length) + '</span>'],
    ['Phác đồ', String((G.PHACDO || []).length), 'nhóm vấn đề (' + canPD + ' nhóm)',
      coPD + '/' + canPD,
      coPD >= canPD ? '<span style="color:var(--ok)">không</span>'
        : '<span style="color:var(--alert)">' + (canPD - coPD) + ' nhóm</span>'],
    ['Tình huống', String((G.TINHHUONG || []).length), 'chủ đề (10 chủ đề)',
      coTH + '/10',
      coTH >= 10 ? '<span style="color:var(--ok)">không</span>'
        : '<span style="color:var(--alert)">' + (10 - coTH) + ' chủ đề</span>']
  ]);

  if(nk){
    o += U.sec('LỚP NỐI', 'Kho không thiếu nội dung — kho từng thiếu đường đi giữa các nội dung');
    o += '<div class="grid g4">' +
      U.stat({k:'PHÁC ĐỒ CÓ KỊCH BẢN', v:nk.pdCoKB + '/' + nk.pd,
        d:'trước đây: 0', c:nk.pdCoKB >= nk.pd ? '#0B7350' : '#B45309'}) +
      U.stat({k:'TÌNH HUỐNG CÓ KỊCH BẢN', v:nk.thCoKB + '/' + nk.th,
        d:'ưu tiên kịch bản cùng tầng', c:nk.thCoKB >= nk.th ? '#0B7350' : '#B45309'}) +
      U.stat({k:'QUY TRÌNH RIÊNG NHÓM', v:nk.qt + '/' + canPD,
        d:'ngoài bảy bước chung', c:nk.qt >= canPD ? '#0B7350' : '#B45309'}) +
      U.stat({k:'TÀI LIỆU PHÁT GIA ĐÌNH', v:nk.tl + '/' + canPD,
        d:'mỗi nhóm một tài liệu', c:nk.tl >= canPD ? '#0B7350' : '#B45309'}) +
      '</div>';
    o += '<p class="tiny muted mt" style="line-height:1.7">Mối nối do hệ thống dựng bằng độ trùng ' +
      'từ khoá tiếng Việt có dấu, ghép đôi âm tiết. Mỗi mối nối mang điểm và từ khoá trùng để người ' +
      'dùng tự kiểm; dưới ngưỡng thì không nối, vì một kịch bản sai gắn vào ca thật là một buổi hỏng.</p>';
  }

  if(kn.lap.length || kn.cut.length)
    o += '<div class="card mt2" style="border-color:var(--gita-do)">'+
      '<div class="tiny up mb" style="color:var(--gita-do-ink)">LUẬT BỊ VI PHẠM</div>'+
      (kn.lap.length ? '<p class="sm" style="line-height:1.7"><b>Hai lớp làm được cùng một việc</b> — '+
        'đó là chữ, không phải chiều sâu:<br>'+h(kn.lap.slice(0,6).join(' · '))+'</p>' : '')+
      (kn.cut.length ? '<p class="sm mt" style="line-height:1.7"><b>Câu cụt dưới 40 ký tự</b>:<br>'+
        h(kn.cut.slice(0,8).join(' · '))+'</p>' : '')+
    '</div>';

  /* Thang năm cấp — nhắc lại ngay đây, vì bảng dưới đọc theo nó */
  o += U.sec('THANG NĂM CẤP NGHỀ','Bảng dưới đọc theo thang này — mỗi cấp làm được một việc khác, không phải hiểu sâu hơn một chút');
  o += '<div class="row wrap" style="gap:11px">'+ CD.map(function(c){
    return '<div class="card" style="flex:1;min-width:200px;border-top:3px solid '+c.mau+'">'+
      '<div class="row" style="gap:8px;align-items:baseline">'+
        '<b class="mono" style="color:'+c.mau+'">'+h(c.ma)+'</b>'+
        '<b style="flex:1;font-size:14px">'+h(c.ten)+'</b></div>'+
      '<p class="sm mt" style="line-height:1.65">'+h(c.sau)+'</p></div>';
  }).join('') +'</div>';

  /* Bảng từng mô thức */
  o += U.sec('TỪNG MÔ THỨC','Bấm vào mô thức đã đủ lớp để đọc cả năm lớp');
  o += U.tbl(['Mô thức','Tầng khách','C1','C2','C3','C4','C5','Trạng thái'],
    DS.map(function(m){
      var r = G.sauCua(m.id);
      var o1 = function(c){
        var l = r && r.c && r.c[c];
        var du = l && TRUONG_CAP.every(function(f){ return !!l[f]; });
        return '<span class="mono" style="color:'+(du ? 'var(--ok)' : 'var(--ink-4)')+'">'+
               (du ? '●' : '○')+'</span>';
      };
      var trang = !r ? '<span class="chip" style="color:var(--ink-4)">chưa viết</span>'
        : (d.thieu.filter(function(x){ return x.id === m.id; }).length
           ? '<span class="chip" style="color:var(--gita-do-ink);border-color:var(--gita-do)">viết dở</span>'
           : '<span class="chip" style="color:var(--ok);border-color:var(--ok)">đủ năm lớp</span>');
      return [(r ? '<a href="#" data-sau="'+h(m.id)+'"><b class="sm">'+h(m.id)+'</b></a>'
                 : '<b class="sm">'+h(m.id)+'</b>')+
              '<div class="tiny muted">'+h(m.title)+'</div>',
              '<span class="tiny mono">'+h((m.tiers||[]).join(' '))+'</span>']
             .concat(CAP.map(o1)).concat([trang]);
    }));

  /* ══ DUYỆT TRỰC TIẾP 11 NHÓM PHÁC ĐỒ VÀ 10 CHỦ ĐỀ TÌNH HUỐNG ══
     Trước bản này hai kho ấy chỉ mở được khi đi vòng qua một phác đồ
     hoặc một tình huống cụ thể. Người muốn đọc cả bản đồ năng lực của
     nghề thì không có cửa nào — mà đó đúng là thứ Coach mới cần nhất
     khi hỏi "tôi đang ở đâu và còn thiếu gì". */
  var soNhomPD2 = {}; (G.PHACDO || []).forEach(function(x){ soNhomPD2[x.nhom] = x.nhomTen || x.nhom; });
  var dsPD = Object.keys(G.PD_SAU || {});
  if(dsPD.length){
    o += U.sec('MƯỜI MỘT NHÓM PHÁC ĐỒ', 'Bấm để đọc cả năm cấp — 220 phác đồ chia vào các nhóm này');
    o += U.tbl(['Nhóm', 'Số phác đồ', 'C1', 'C2', 'C3', 'C4', 'C5', 'Cái bẫy của nhóm'],
      dsPD.map(function(n){
        var v = G.PD_SAU[n], dem = (G.PHACDO || []).filter(function(x){ return x.nhom === n; }).length;
        var oc = function(c){
          var l = v.c && v.c[c];
          var du = l && TRUONG_CAP.every(function(f){ return !!l[f]; });
          return '<span class="mono" style="color:' + (du ? 'var(--ok)' : 'var(--ink-4)') + '">' +
            (du ? '●' : '○') + '</span>';
        };
        return ['<a href="#" data-pdsau="' + h(n) + '"><b class="sm">' + h(n) + '</b></a>' +
                '<div class="tiny muted">' + h(soNhomPD2[n] || '') + '</div>',
                '<span class="tiny mono">' + dem + '</span>']
               .concat(CAP.map(oc))
               .concat(['<span class="tiny muted">' + h(G.chuHet ? G.chuHet(v.y, 110) : v.y) + '</span>']);
      }));
  }

  var dsTH = Object.keys(G.TH_SAU || {});
  if(dsTH.length){
    var demTH = {};
    var nk2 = (G.NOI_KET || {}).th || {};
    Object.keys(nk2).forEach(function(k){ var c = nk2[k].chuDe; if(c) demTH[c] = (demTH[c] || 0) + 1; });
    o += U.sec('MƯỜI CHỦ ĐỀ TÌNH HUỐNG', 'Bấm để đọc cả năm cấp — 250 tình huống chia vào các chủ đề này');
    o += U.tbl(['Chủ đề', 'Số tình huống', 'C1', 'C2', 'C3', 'C4', 'C5', 'Cái bẫy của chủ đề'],
      dsTH.map(function(n){
        var v = G.TH_SAU[n];
        var oc = function(c){
          var l = v.c && v.c[c];
          var du = l && TRUONG_CAP.every(function(f){ return !!l[f]; });
          return '<span class="mono" style="color:' + (du ? 'var(--ok)' : 'var(--ink-4)') + '">' +
            (du ? '●' : '○') + '</span>';
        };
        return ['<a href="#" data-thsau="' + h(n) + '"><b class="sm">' + h(v.ten || n) + '</b></a>',
                '<span class="tiny mono">' + (demTH[n] || 0) + '</span>']
               .concat(CAP.map(oc))
               .concat(['<span class="tiny muted">' + h(G.chuHet ? G.chuHet(v.y, 110) : v.y) + '</span>']);
      }));
  }

  /* Luật viết — để người viết tiếp không phải đoán */
  o += U.sec('SÁU LUẬT KHI VIẾT CHIỀU SÂU','Viết sai luật thì thà chưa viết — chữ nhiều mà không có tầng làm hỏng cả bảng');
  o += '<div class="card">'+ (G.SAU_LUAT || []).map(function(x, i){
    return '<div style="'+(i ? 'border-top:1px solid var(--line);padding-top:13px;margin-top:13px' : '')+'">'+
      '<b class="sm">'+h(x.t)+'</b>'+
      '<p class="sm muted mt" style="line-height:1.7">'+h(x.y)+'</p></div>';
  }).join('') +'</div>';

  return o;
};

/* Đọc cả năm lớp của một mô thức */
G.sauModal = function(id){
  var r = G.sauCua(id); if(!r) return;
  var m = (G.MOTHUC || []).filter(function(x){ return x.id === id; })[0] || {};
  var CD = G.CAPDO_VANDUNG || [];
  var BC = G.SAU_BOICANH || [];

  var o = '<div class="tiny up muted">'+h(id)+'</div>'+
    '<h3 style="font-size:19px;font-weight:800;margin:4px 0 12px">'+h(m.title || id)+'</h3>';

  o += '<div class="row wrap mb" style="gap:9px">'+
    (m.tiers||[]).map(function(t){ return U.chip(t); }).join('')+
    U.chip('Trăm năm · ' + (r.di||''), '#5140B4')+'</div>';

  /* Ba bối cảnh GITA hoá */
  o += '<div class="row wrap" style="gap:10px">'+ BC.map(function(b){
    return '<div class="card" style="flex:1;min-width:230px;padding:14px;border-top:3px solid '+b.c+'">'+
      '<div class="row" style="gap:7px;align-items:center">'+ic(b.ic,'w-3 h-3')+
        '<b class="tiny up" style="color:'+b.c+'">'+h(b.ten)+'</b></div>'+
      '<p class="sm mt" style="line-height:1.65">'+h(r[b.ma] || '')+'</p></div>';
  }).join('') +'</div>';

  o += '<div class="card mt2" style="border-left:3px solid var(--gita)">'+
    '<div class="tiny up muted">THÓI QUEN MÔ THỨC NÀY DỰNG NÊN</div>'+
    '<p class="sm mt" style="line-height:1.7">'+h(r.thoiQuen || '')+'</p>'+
    '<p class="tiny muted mt2">Tài liệu bổ trợ: '+h(r.tuLieu || '')+'</p></div>';

  /* Năm lớp */
  CD.forEach(function(c){
    var l = r.c && r.c[c.ma]; if(!l) return;
    o += '<div class="card mt2" style="border-left:3px solid '+c.mau+'">'+
      '<div class="row" style="gap:9px;align-items:baseline;flex-wrap:wrap">'+
        '<b class="mono" style="color:'+c.mau+';font-size:15px">'+h(c.ma)+'</b>'+
        '<b style="flex:1;min-width:140px">'+h(c.ten)+'</b></div>'+
      '<p class="sm mt" style="line-height:1.7"><b style="color:var(--ok)">Làm được:</b> '+h(l.lam)+'</p>'+
      '<p class="sm mt" style="line-height:1.7;color:var(--gita-do-ink)"><b>Chưa làm được:</b> '+h(l.chua)+'</p>'+
      '<p class="sm mt" style="line-height:1.7"><b>Việc thực hành:</b> '+h(l.viec)+'</p>'+
      '<p class="sm mt" style="line-height:1.7"><b style="color:'+c.mau+'">Lên cấp khi:</b> '+h(l.len)+'</p>'+
    '</div>';
  });

  U.modal(o);
};

document.addEventListener('click', function(e){
  var a = e.target.closest && e.target.closest('[data-sau]');
  if(!a) return;
  e.preventDefault();
  G.sauModal(a.getAttribute('data-sau'));
});

})();

})();

/* ═════════ src/ma-tran-bang.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÀN HÌNH MA TRẬN 220 × 5 TẦNG × 4 NHÓM KHÁCH HÀNG

   Màn hình này KHÔNG đọc 4.400 bản ghi có sẵn. Nó ghép bốn lớp dữ
   liệu lại thành một phiếu ngay lúc hiển thị:
     G.MATRAN.vande      → tên vấn đề, nguyên nhân, key giải pháp
     G.MATRAN_Tn         → kế hoạch của tầng: lộ trình, việc bốn vai, đích, hồ sơ
     G.MT_BANG_TANG      → băng này ở tầng này giao gì, giữ gì, cổng đòi gì
     G.MT_BANG_NHOM      → băng này ở nhóm vấn đề này trông thế nào, làm gì trước, khi nào dừng
     G.MT_DO             → chỉ số riêng của vấn đề + bốn ngưỡng băng
   220 × 5 × 4 = 4.400 phiếu, phiếu nào cũng có ngưỡng riêng của
   chính vấn đề đó. Xem lời giải thích đầy đủ ở đầu tệp
   kho-goc/data.matran.bang.js.

   Vì sao hàm ghép nằm ở src chứ không ở kho-goc: tools/ma-hoa-kho.js
   đóng gói kho bằng JSON.stringify, mà JSON thì bỏ hàm. Hàm định
   nghĩa trong kho-goc sẽ biến mất sau khi mã hoá. Dữ liệu ở kho-goc,
   hàm ở src — đây là quy tắc chung của dự án.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};
(function(){
var U = G.U, h = U.h, ic = U.ic;

function coTang(t){ return !!(G['MATRAN_'+t] && G['MATRAN_'+t].length); }

/* ─── Tra cứu bốn lớp dữ liệu ───
   Bốn hàm này phải ở đây, không được ở kho-goc: kho đóng gói bằng
   JSON.stringify nên hàm định nghĩa trong kho-goc sẽ bị bỏ mất. */
G.mtBang = function(ma){
  var a = G.MT_BANG || [];
  for(var i=0;i<a.length;i++) if(a[i].ma===ma) return a[i];
  return null;
};
/* Tầng nhận cả hai dạng: số 1 và chuỗi 'T1'.

   Đây là mắt xích đã gãy suốt từ lúc dựng lớp băng mà không ai thấy:
   G.MT_BANG_TANG lưu tang là 'T1', còn người gọi — kể cả G.mtPhieu —
   truyền số. So sánh === giữa 1 và 'T1' luôn sai, nên mtBangTang trả
   null, kéo theo mtPhieu trả null cho CẢ 4.400 phiếu.

   Không màn nào văng lỗi vì mtPhieu trả null gọn gàng, và không bài kiểm
   nào bắt được vì không bài nào gọi thẳng mtPhieu. Một lớp dữ liệu đầy
   đủ nằm im vì một phép so sánh kiểu. */
function chuanTang(t){
  if(typeof t === 'number') return 'T' + t;
  var s = String(t == null ? '' : t).trim().toUpperCase();
  return /^[1-5]$/.test(s) ? 'T' + s : s;
}
G.mtChuanTang = chuanTang;

G.mtBangTang = function(tang, bang){
  var a = G.MT_BANG_TANG || [], t = chuanTang(tang);
  for(var i=0;i<a.length;i++) if(chuanTang(a[i].tang)===t && a[i].bang===bang) return a[i];
  return null;
};
G.mtBangNhom = function(nhom, bang){
  var a = G.MT_BANG_NHOM || [];
  for(var i=0;i<a.length;i++) if(a[i].nhom===nhom && a[i].bang===bang) return a[i];
  return null;
};
G.mtDo = function(ma){
  var a = G.MT_DO || [];
  for(var i=0;i<a.length;i++) if(a[i].ma===ma) return a[i];
  return null;
};
/* Cùng một bệnh với mtBangTang: kho tên là MATRAN_T1 nhưng người gọi
   truyền số 1, thành ra đọc MATRAN_1 — một kho không tồn tại. */
function layTang(t, ma){ var a=G['MATRAN_'+chuanTang(t)]||[]; for(var i=0;i<a.length;i++) if(a[i].ma===ma) return a[i]; return null; }
function layVan(ma){ var a=(G.MATRAN&&G.MATRAN.vande)||[]; for(var i=0;i<a.length;i++) if(a[i].ma===ma) return a[i]; return null; }

/* ─── Ghép một phiếu (vấn đề × tầng × băng) ───
   Trả về null khi thiếu bất kỳ lớp nào, để màn hình nói thật là
   chưa mở được chứ không dựng một phiếu rỗng nhìn như đã có. */
G.mtPhieu = function(maVan, tang, maBang){
  var v  = layVan(maVan);            if(!v)  return null;
  var kh = layTang(tang, maVan);     if(!kh) return null;
  var b  = G.mtBang && G.mtBang(maBang);            if(!b)  return null;
  var bt = G.mtBangTang && G.mtBangTang(tang, maBang);
  var bn = G.mtBangNhom && G.mtBangNhom(v.nhom, maBang);
  var d  = G.mtDo && G.mtDo(maVan);
  return { van:v, keHoach:kh, bang:b, oTang:bt, oNhom:bn, do:d,
           nguong: d ? ({XANH:d.x, VANG:d.v, CAM:d.c, DO:d.d})[maBang] : '' };
};

/* Trần việc giao thật sự: trần của tầng đè lên trần chung của băng.
   Ví dụ băng VÀNG trần chung 4 việc, nhưng ở T1 vẫn là 4 — còn băng
   ĐỎ thì mọi tầng đều là 0, vì việc duy nhất là gặp mặt. */
G.mtTran = function(tang, maBang){
  var bt = G.mtBangTang && G.mtBangTang(tang, maBang);
  if(bt && typeof bt.tran === 'number') return bt.tran;
  var b = G.mtBang && G.mtBang(maBang);
  return b ? b.tran : '';
};

/* Xếp băng từ ba số của hệ đo lường khách hàng. Không nhận điểm do
   người đồng hành tự cho — chỉ nhận số thô. Luật số 1, mục E. */
G.mtXepBang = function(m1, m2, mocTruot){
  if(m1 == null || m2 == null) return null;
  if(m1 < 40 || m2 <= 2 || mocTruot >= 2) return 'DO';
  if(m1 < 65 || m2 <= 6 || mocTruot >= 1) return 'CAM';
  if(m1 < 85 || m2 < 14)                  return 'VANG';
  return 'XANH';
};

/* ═══════════════ MÀN HÌNH ═══════════════ */
G.VIEWS['ma-tran-bang'] = function(){
  /* Đây là kho NGHỀ: cột "dừng và chuyển tuyến", trần việc giao, tên băng
     và tỷ lệ tệp đều là ngôn ngữ nội bộ. Trình đơn đã đặt perm nghe_chung
     nên học viên và phụ huynh không thấy mục này — cổng dưới đây chặn cả
     đường gọi thẳng vào màn hình. Hai chỗ khớp nhau thì không sinh mục chết. */
  if(!G.can('nghe_chung')) return U.lockCard();
  var M = G.MATRAN;
  if(!M || !G.MT_BANG) return U.empty('Chưa mở được ma trận bốn băng',
    'Lớp băng nằm trong gói nền. Đăng nhập lại để nạp.');
  var co = ['T1','T2','T3','T4','T5'].filter(coTang);
  if(!co.length) return U.lockCard('Chưa có tầng nào được cấp phép. Ma trận bốn băng cần ít nhất một tầng.');

  var S  = G.S || {};
  var st = S.mtb || (S.mtb = {});
  var tangHien = co.indexOf(st.tang) >= 0 ? st.tang : co[0];
  var bangHien = st.bang || 'VANG';
  var nhomHien = st.nhom || 'ALL';

  var o = U.ph({eyebrow:'NHÓM 03 · KHO BÁU VẬT', ic:'map', grad:1,
    t:'Ma trận 220 vấn đề × 5 tầng × 4 nhóm khách hàng',
    lead:'Cùng một vấn đề, cùng một tầng, nhưng nhà đang tự đi và nhà sắp rời thì phải làm khác nhau. Bốn băng XANH – VÀNG – CAM – ĐỎ là bốn nhóm khách hàng trong mỗi tầng. Chọn tầng, chọn băng, rồi mở vấn đề để lấy phiếu làm việc.'});

  o += '<div class="grid g4 mb">'+
    U.stat({k:'Vấn đề',   v:String(M.vande.length),  d:'11 nhóm · 20 vấn đề mỗi nhóm', c:'#0B6675'})+
    U.stat({k:'Tầng mở',  v:co.length+'/5',          d:co.join(' · '), c:'#185AB4'})+
    U.stat({k:'Nhóm khách', v:'4',                   d:'XANH · VÀNG · CAM · ĐỎ', c:'#0B7350'})+
    U.stat({k:'Phiếu ghép được', v:String(M.vande.length*co.length*4).replace(/\B(?=(\d{3})+(?!\d))/g,'.'),
            d:'vấn đề × tầng × băng', c:'#5140B4'})+
    '</div>';

  /* ── Bốn băng: bảng định nghĩa, đọc trước khi dùng ── */
  o += U.sec('BỐN NHÓM KHÁCH HÀNG TRONG MỖI TẦNG',
    'Băng nói tình trạng đồng hành, không nói năng lực học sinh và không nói tiền. Nhà tầng 5 vẫn có thể ở băng ĐỎ; nhà tầng 1 vẫn có thể ở băng XANH.');
  o += '<div class="grid g2 mb">'+ G.MT_BANG.map(function(b){
    return '<div class="card" style="border-color:'+b.c+'33">'+
      '<div class="row wrap mb" style="gap:8px">'+U.chip(b.ma,b.c)+
      '<b style="color:'+b.c+';font-size:15px">'+h(b.ten)+'</b>'+
      '<span class="tiny muted">'+h(b.tyLe)+'</span></div>'+
      '<p class="sm dim mb" style="line-height:1.65">'+h(b.y)+'</p>'+
      '<div class="grid g2" style="gap:9px">'+
        '<div class="card pad-sm"><div class="tiny up muted mb">VÀO BĂNG KHI</div><p class="tiny">'+h(b.vao)+'</p></div>'+
        '<div class="card pad-sm"><div class="tiny up muted mb">NHỊP CHẠM</div><p class="tiny">'+h(b.nhip)+'</p></div>'+
        '<div class="card pad-sm"><div class="tiny up muted mb">TRẦN VIỆC GIAO</div><p class="tiny">'+h(b.tran)+'</p></div>'+
        '<div class="card pad-sm"><div class="tiny up muted mb">AI KÉO CHÍNH</div><p class="tiny">'+h(b.keo)+'</p></div>'+
        '<div class="card pad-sm"><div class="tiny up muted mb">LÊN BĂNG KHI</div><p class="tiny">'+h(b.len)+'</p></div>'+
        '<div class="card pad-sm"><div class="tiny up muted mb">TỤT BĂNG KHI</div><p class="tiny">'+h(b.xuong)+'</p></div>'+
      '</div>'+
      '<div class="card pad-sm mt" style="border-color:rgba(248,113,113,.32)">'+
      '<div class="tiny up mb" style="color:var(--bad)">ĐIỀU CẤM</div><p class="tiny">'+h(b.cam)+'</p></div>'+
      '</div>';
  }).join('') +'</div>';

  /* ── Bộ chọn: tầng, băng, nhóm ── */
  o += U.sec('CHỌN Ô LÀM VIỆC','Ba nút: tầng nhà mình đang ở, băng nhà mình đang ở, nhóm vấn đề đang xử lý.');
  o += '<div class="card mb">'+
    '<div class="tiny up muted mb">TẦNG</div>'+
    '<div class="row wrap mb" style="gap:7px">'+ co.map(function(t){
      return '<button class="btn ghost sm'+(t===tangHien?' on':'')+'" data-mbt="'+t+'">'+t+' · '+
        h((M.tenLo&&M.tenLo[t])||'').replace(/^Lộ trình /,'')+'</button>';
    }).join('') +'</div>'+
    '<div class="tiny up muted mb">NHÓM KHÁCH HÀNG</div>'+
    '<div class="row wrap mb" style="gap:7px">'+ G.MT_BANG.map(function(b){
      return '<button class="btn ghost sm'+(b.ma===bangHien?' on':'')+'" data-mbb="'+b.ma+'" '+
        'style="'+(b.ma===bangHien?'border-color:'+b.c+';color:'+b.c:'')+'">'+h(b.ma)+'</button>';
    }).join('') +'</div>'+
    '<div class="tiny up muted mb">NHÓM VẤN ĐỀ</div>'+
    '<div class="row wrap" style="gap:7px">'+
      '<button class="btn ghost sm'+(nhomHien==='ALL'?' on':'')+'" data-mbn="ALL">Tất cả</button>'+
      M.nhom.map(function(n){
        return '<button class="btn ghost sm'+(n.ma===nhomHien?' on':'')+'" data-mbn="'+h(n.ma)+'">'+h(n.ten)+'</button>';
      }).join('') +'</div></div>';

  /* ── Ô băng × tầng và ô băng × nhóm đang chọn ── */
  var b  = G.mtBang(bangHien);
  var bt = G.mtBangTang(tangHien, bangHien);
  if(bt){
    o += '<div class="card mb" style="border-color:'+b.c+'44">'+
      '<div class="row wrap mb" style="gap:8px">'+U.chip(tangHien,'#185AB4')+U.chip(b.ma,b.c)+
      '<b style="color:'+b.c+'">Ở tầng này, băng này làm gì</b>'+
      '<span class="tiny muted">trần '+h(String(G.mtTran(tangHien,bangHien)))+' việc/tuần</span></div>'+
      '<div class="grid g2" style="gap:10px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">GIAO GÌ</div><p class="tiny">'+h(bt.giao)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">GIỮ LẠI GÌ</div><p class="tiny">'+h(bt.giu)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">CỔNG NGHIỆM THU ĐÒI GÌ</div><p class="tiny">'+h(bt.cong)+'</p></div>'+
      '<div class="card pad-sm" style="border-color:rgba(251,146,60,.32)"><div class="tiny up mb" style="color:var(--alert)">RỦI RO LỚN NHẤT</div><p class="tiny">'+h(bt.rui)+'</p></div>'+
      '</div></div>';
  }
  if(nhomHien !== 'ALL'){
    var bn = G.mtBangNhom(nhomHien, bangHien);
    if(bn){
      var nTen = (M.nhom.filter(function(n){return n.ma===nhomHien;})[0]||{}).ten || nhomHien;
      o += '<div class="card mb" style="border-color:'+b.c+'44">'+
        '<div class="row wrap mb" style="gap:8px">'+U.chip(nhomHien,'#0B6675')+U.chip(b.ma,b.c)+
        '<b style="color:'+b.c+'">'+h(nTen)+' — băng này trông thế nào</b></div>'+
        '<div class="grid g3" style="gap:10px">'+
        '<div class="card pad-sm"><div class="tiny up muted mb">TRÔNG THẾ NÀO</div><p class="tiny">'+h(bn.mat)+'</p></div>'+
        '<div class="card pad-sm"><div class="tiny up muted mb">LÀM TRƯỚC TIÊN</div><p class="tiny">'+h(bn.truoc)+'</p></div>'+
        '<div class="card pad-sm" style="border-color:rgba(248,113,113,.32)"><div class="tiny up mb" style="color:var(--bad)">DỪNG · CHUYỂN TUYẾN KHI</div><p class="tiny">'+h(bn.dung)+'</p></div>'+
        '</div></div>';
    }
  }

  /* ── Danh sách vấn đề, mỗi thẻ đã mang ngưỡng của băng đang chọn ── */
  o += U.sec('CHỌN VẤN ĐỀ ĐỂ MỞ PHIẾU',
    'Con số dưới mỗi vấn đề là ngưỡng của băng '+bangHien+' cho chính vấn đề đó — không phải ngưỡng chung.');
  o += '<div class="grid g2" id="mbList">' + M.vande.map(function(v){
    var d = G.mtDo(v.ma);
    var ng = d ? ({XANH:d.x,VANG:d.v,CAM:d.c,DO:d.d})[bangHien] : '';
    var an = (nhomHien!=='ALL' && v.nhom!==nhomHien);
    return '<button class="card lift" data-mbv="'+h(v.ma)+'" data-f="'+h(v.nhom)+'"'+
      (an?' style="text-align:left;display:none"':' style="text-align:left"')+'>'+
      '<div class="row wrap mb" style="gap:7px">'+U.chip(v.ma,'#0B6675')+
      '<span class="tiny muted">'+h(v.nhomTen)+'</span></div>'+
      '<b class="sm" style="display:block;line-height:1.45;margin-bottom:6px">'+h(v.ten)+'</b>'+
      (d ? '<div class="row wrap tiny" style="gap:6px">'+
            '<span class="muted">'+h(d.dv)+'</span>'+
            '<span style="color:'+b.c+';font-weight:700">'+h(String(ng))+'</span></div>'
         : '<p class="tiny muted">Chưa có chỉ số riêng</p>')+
      '</button>';
  }).join('') + '</div>';

  /* ── Luật ── */
  o += U.sec('BẢY LUẬT XẾP BĂNG','Băng không do người đồng hành cảm thấy mà ra.');
  o += '<div class="card">' + (G.MT_BANG_LUAT||[]).map(function(l){
    return '<div style="display:flex;gap:10px;padding:9px 0;border-top:1px solid var(--line)">'+
      '<span style="flex:none;width:26px;height:26px;border-radius:9px;display:grid;place-items:center;'+
      'font-weight:900;font-size:12px;background:rgba(11,102,117,.14);color:#0B6675">'+l.no+'</span>'+
      '<div><b class="sm" style="display:block;margin-bottom:3px">'+h(l.ten)+'</b>'+
      '<span class="tiny muted" style="line-height:1.6">'+h(l.y)+'</span></div></div>';
  }).join('') + '</div>';
  return o;
};

/* ═══════════════ PHIẾU ĐẦY ĐỦ ═══════════════ */
G.mtBangModal = function(maVan){
  var S = G.S || {}, st = S.mtb || {};
  var co = ['T1','T2','T3','T4','T5'].filter(coTang);
  var tang = co.indexOf(st.tang)>=0 ? st.tang : co[0];
  var bang = st.bang || 'VANG';
  var p = G.mtPhieu(maVan, tang, bang);
  if(!p){ U.modal('<p class="sm">Chưa ghép được phiếu này. Có thể tầng '+h(tang)+' chưa được cấp phép.</p>'); return; }

  var b = p.bang, v = p.van, kh = p.keHoach;
  var html =
    '<div class="row wrap" style="gap:7px;margin-bottom:9px">'+U.chip(v.ma,'#0B6675')+U.chip(tang,'#185AB4')+
      U.chip(b.ma,b.c)+U.chip(v.nhomTen)+'</div>'+
    '<h2 style="font-size:21px;font-weight:800;margin-bottom:4px">'+h(v.ten)+'</h2>'+
    '<p class="tiny muted" style="margin-bottom:13px">'+h(b.ten)+' · trần '+
      h(String(G.mtTran(tang,bang)))+' việc/tuần · '+h(b.nhip)+'</p>'+

    '<div class="grid g2" style="gap:10px;margin-bottom:13px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">NGUYÊN NHÂN CỐT LÕI</div><p class="sm">'+h(v.nguyen)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">KEY GIẢI PHÁP</div><p class="sm">'+h(v.key)+'</p></div>'+
    '</div>';

  /* Đo bằng gì — lớp làm phiếu này khác 4.399 phiếu còn lại */
  if(p.do){
    html += '<div class="card mb" style="border-color:'+b.c+'44">'+
      '<div class="tiny up mb" style="color:'+b.c+'">ĐO BẰNG GÌ — VÀ NGƯỠNG CỦA BĂNG '+h(b.ma)+'</div>'+
      '<div class="grid g2" style="gap:10px;margin-bottom:10px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">ĐƠN VỊ</div><p class="sm">'+h(p.do.dv)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">CÁCH LẤY SỐ</div><p class="tiny">'+h(p.do.cach)+'</p></div>'+
      '</div>'+
      '<div class="grid g4" style="gap:8px">'+ G.MT_BANG.map(function(x){
        var val = ({XANH:p.do.x,VANG:p.do.v,CAM:p.do.c,DO:p.do.d})[x.ma];
        var day = x.ma===b.ma;
        return '<div class="card pad-sm center" style="border-color:'+x.c+(day?'88':'22')+
          (day?';background:'+x.c+'12':'')+'">'+
          '<div class="tiny up mb" style="color:'+x.c+'">'+h(x.ma)+'</div>'+
          '<b class="sm">'+h(String(val))+'</b></div>';
      }).join('') +'</div></div>';
  }

  /* Băng × nhóm vấn đề */
  if(p.oNhom){
    html += '<div class="card mb">'+
      '<div class="tiny up mb" style="color:'+b.c+'">BĂNG '+h(b.ma)+' TRONG NHÓM '+h(v.nhomTen)+'</div>'+
      '<div class="grid g3" style="gap:10px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">TRÔNG THẾ NÀO</div><p class="tiny">'+h(p.oNhom.mat)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">LÀM TRƯỚC TIÊN</div><p class="tiny">'+h(p.oNhom.truoc)+'</p></div>'+
      '<div class="card pad-sm" style="border-color:rgba(248,113,113,.32)"><div class="tiny up mb" style="color:var(--bad)">DỪNG · CHUYỂN TUYẾN KHI</div><p class="tiny">'+h(p.oNhom.dung)+'</p></div>'+
      '</div></div>';
  }

  /* Băng × tầng */
  if(p.oTang){
    html += '<div class="card mb">'+
      '<div class="tiny up mb" style="color:'+b.c+'">BĂNG '+h(b.ma)+' Ở '+h(tang)+'</div>'+
      '<div class="grid g2" style="gap:10px">'+
      '<div class="card pad-sm"><div class="tiny up muted mb">GIAO GÌ</div><p class="tiny">'+h(p.oTang.giao)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">GIỮ LẠI GÌ</div><p class="tiny">'+h(p.oTang.giu)+'</p></div>'+
      '<div class="card pad-sm"><div class="tiny up muted mb">CỔNG NGHIỆM THU</div><p class="tiny">'+h(p.oTang.cong)+'</p></div>'+
      '<div class="card pad-sm" style="border-color:rgba(251,146,60,.32)"><div class="tiny up mb" style="color:var(--alert)">RỦI RO</div><p class="tiny">'+h(p.oTang.rui)+'</p></div>'+
      '</div></div>';
  }

  /* Kế hoạch gốc của tầng — bốn vai */
  html += '<div class="card mb">'+
    '<div class="tiny up mb" style="color:#185AB4">KẾ HOẠCH '+h(tang)+' — GIỮ NGUYÊN, ĐIỀU CHỈNH THEO BĂNG Ở TRÊN</div>'+
    '<div class="card pad-sm mb"><div class="tiny up muted mb">LỘ TRÌNH</div><p class="tiny">'+h(kh.lo)+'</p></div>'+
    '<div class="grid g2" style="gap:10px">'+
    '<div class="card pad-sm"><div class="tiny up muted mb">HỌC VIÊN</div><p class="tiny">'+h(kh.hs)+'</p></div>'+
    '<div class="card pad-sm"><div class="tiny up muted mb">PHỤ HUYNH</div><p class="tiny">'+h(kh.ph)+'</p></div>'+
    '<div class="card pad-sm"><div class="tiny up muted mb">TƯ VẤN</div><p class="tiny">'+h(kh.tv)+'</p></div>'+
    '<div class="card pad-sm"><div class="tiny up muted mb">COACH</div><p class="tiny">'+h(kh.coach)+'</p></div>'+
    '</div>'+
    '<div class="card pad-sm mt"><div class="tiny up muted mb">ĐÍCH PHẢI ĐẠT</div><p class="tiny">'+h(kh.dich)+'</p></div>'+
    '<div class="card pad-sm mt"><div class="tiny up muted mb">HỒ SƠ PHẢI NỘP</div><p class="tiny">'+h(kh.hoSo)+'</p></div>'+
    '</div>';

  html += '<div class="card" style="border-color:'+b.c+'44;background:'+b.c+'0d">'+
    '<div class="tiny up mb" style="color:'+b.c+'">NÓI VỚI GIA ĐÌNH THẾ NÀO</div>'+
    '<p class="sm" style="line-height:1.7">Không đọc tên băng cho gia đình nghe. Nói bằng việc: tuần này nhà mình làm '+
    h(String(G.mtTran(tang,bang)))+' việc, gặp nhau theo nhịp '+h(b.nhip.toLowerCase())+
    ' — luật số 6, mục xếp băng.</p></div>';

  U.modal(html);
};

/* ═══════════════ SỰ KIỆN ═══════════════ */
function on(sel, fn){
  document.addEventListener('click', function(e){
    var el = e.target.closest && e.target.closest(sel);
    if(el){ e.preventDefault(); fn(el, e); }
  });
}
function datVeLai(khoa, gt){
  G.S.mtb = G.S.mtb || {};
  G.S.mtb[khoa] = gt;
  if(G.save) G.save();
  if(G.render) G.render();
}
on('[data-mbt]', function(el){ datVeLai('tang', el.getAttribute('data-mbt')); });
on('[data-mbb]', function(el){ datVeLai('bang', el.getAttribute('data-mbb')); });
on('[data-mbn]', function(el){ datVeLai('nhom', el.getAttribute('data-mbn')); });
on('[data-mbv]', function(el){ G.mtBangModal(el.getAttribute('data-mbv')); });
})();

})();

/* ═════════ src/chien-luoc.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — BẢN ĐỒ CHIẾN LƯỢC VÀ THẺ ĐIỂM CÂN BẰNG

   Kho chuẩn nằm ở kho-goc/data.chien-luoc.js (CL_THAP · CL_TANG ·
   CL_MUC · CL_KETQUA · CL_NHIP · CL_NHAT · CL_LUAT). Tệp này là phần
   CHẠY: soi chuỗi nhân quả, tính trạng thái từng mắt xích, và dựng hai
   màn hình.

   Vì sao phần chạy phải ở src/ chứ không ở kho: tools/ma-hoa-kho.js
   đóng gói bằng JSON.stringify, và JSON.stringify bỏ hàm.

   MỘT ĐIỀU TỰ ĐẶT VÀ SẼ KHÔNG NỚI: màn này KHÔNG bịa số. Mục tiêu nào
   hệ thống chưa đo được thì hiện thẳng là "chưa có số", kèm tên thứ còn
   thiếu. Một bản đồ tô xanh bằng số ước lượng còn tệ hơn một bản đồ
   trống — bản đồ trống thì người ta biết là mình chưa biết.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h, ic = U.ic;

  function tangCua(ma) {
    var ds = G.CL_TANG || [];
    for (var i = 0; i < ds.length; i++) if (ds[i].ma === ma) return ds[i];
    return null;
  }
  function mucCua(ma) {
    var ds = G.CL_MUC || [];
    for (var i = 0; i < ds.length; i++) if (ds[i].ma === ma) return ds[i];
    return null;
  }
  G.clMuc = mucCua;

  /* ─── Mục tiêu theo tầng, tầng gốc ở dưới ───
     Trả về theo thứ tự VẼ: tài chính trên cùng, học tập dưới cùng. Chiều
     đọc nhân quả thì ngược lại — dưới đẩy lên. */
  G.clTheoTang = function () {
    return (G.CL_TANG || []).slice().sort(function (a, b) { return b.thu - a.thu; })
      .map(function (t) {
        return { tang: t, muc: (G.CL_MUC || []).filter(function (m) { return m.tang === t.ma; }) };
      });
  };

  /* ─── Nguồn số của một mục tiêu có thật hay không ───
     `nguon` trỏ vào một kho hoặc một hàm trong hệ thống. Hàm này KHÔNG
     đoán giá trị; nó chỉ trả lời được ba trạng thái:

       co     — nguồn có mặt, đo được
       trong  — nguồn có mặt nhưng chưa có dữ liệu nào để tính
       thieu  — nguồn không tồn tại trong phiên này

     Phân biệt "trống" với "thiếu" là chỗ quan trọng nhất: trống là hệ
     thống chưa chạy đủ lâu, thiếu là mục tiêu đang trỏ vào hư không. */
  G.clNguon = function (m) {
    var v = G[m.nguon];
    if (typeof v === 'function') {
      var ra = null;
      try { ra = v(); } catch (e) { return { trang: 'trong', vi: 'Hàm ' + m.nguon + ' chưa tính được trong phiên này.' }; }
      if (ra === null || ra === undefined) return { trang: 'trong', vi: 'Chưa có dữ liệu để tính.' };
      if (typeof ra === 'object' && ra.pt === null) return { trang: 'trong', vi: 'Chưa đủ ngày để ra số.' };
      return { trang: 'co', vi: 'Đo bằng ' + m.nguon + '().', so: ra };
    }
    if (v === undefined) return { trang: 'thieu', vi: 'Kho ' + m.nguon + ' không có trong phạm vi đang mở.' };
    var n = Array.isArray(v) ? v.length : (v && typeof v === 'object' ? Object.keys(v).length : 1);
    if (!n) return { trang: 'trong', vi: 'Kho ' + m.nguon + ' đang rỗng.' };
    return { trang: 'co', vi: 'Đọc từ kho ' + m.nguon + ' · ' + n + ' bản ghi.' };
  };

  /* ─── Soi chuỗi nhân quả ───
     Bốn câu hỏi, mỗi câu bắt một lớp hỏng khác nhau:
       lacTang  — mục tiêu gắn vào một tầng không có thật
       noiHong  — nối tới một mã không có thật
       cut      — không nối lên đâu, mà lại không ở tầng tài chính
       khongToi — đi ngược mãi vẫn không tới được tầng tài chính

     Cái thứ tư là cái đắt nhất và khó thấy nhất bằng mắt: mắt xích có
     nối, nối đúng mã, nhưng cả nhánh ấy chạy vòng trong hai tầng dưới
     rồi dừng. Nhìn bản đồ thì vẫn thấy có mũi tên. */
  G.clSoiChuoi = function () {
    var ds = G.CL_MUC || [];
    var maCo = {}; ds.forEach(function (m) { maCo[m.ma] = m; });
    var lacTang = [], noiHong = [], cut = [], khongToi = [];

    ds.forEach(function (m) {
      if (!tangCua(m.tang)) lacTang.push(m.ma);
      (m.noi || []).forEach(function (n) { if (!maCo[n]) noiHong.push(m.ma + '→' + n); });
      if (!(m.noi || []).length && m.tang !== 'TC') cut.push(m.ma);
    });

    function toiTaiChinh(ma, daQua) {
      var m = maCo[ma];
      if (!m) return false;
      if (m.tang === 'TC') return true;
      if (daQua[ma]) return false;              /* vòng lặp — coi như không tới */
      daQua[ma] = 1;
      return (m.noi || []).some(function (n) { return toiTaiChinh(n, daQua); });
    }
    ds.forEach(function (m) { if (m.tang !== 'TC' && !toiTaiChinh(m.ma, {})) khongToi.push(m.ma); });

    return { lacTang: lacTang, noiHong: noiHong, cut: cut, khongToi: khongToi,
      lanh: !lacTang.length && !noiHong.length && !cut.length && !khongToi.length };
  };

  /* ─── Mục tiêu nào đang đo được ─── */
  G.clDemNguon = function () {
    var co = 0, trong = 0, thieu = [];
    (G.CL_MUC || []).forEach(function (m) {
      var n = G.clNguon(m);
      if (n.trang === 'co') co++;
      else if (n.trang === 'trong') trong++;
      else thieu.push(m.ma + '→' + m.nguon);
    });
    return { co: co, trong: trong, thieu: thieu, tong: (G.CL_MUC || []).length };
  };

  /* ─── Mục tiêu nào KHÔNG có đầu việc nào đẩy ───
     Bậc bảy của tháp là đầu việc; bậc năm là bản đồ. Nếu một mục tiêu
     trong bản đồ không có đầu việc nào của bất kỳ vị trí nào đẩy nó, thì
     mục tiêu ấy chỉ tồn tại trên giấy. Nối bằng VAI: mục tiêu do vai nào
     chịu trách nhiệm thì vai ấy phải có đầu việc trong danh mục. */
  G.clMucKhongCoViec = function () {
    var dm = G.cvDanhMuc ? G.cvDanhMuc() : [];
    if (!dm.length) return null;
    return (G.CL_MUC || []).filter(function (m) {
      return !(m.vai || []).some(function (v) {
        return dm.some(function (dv) { return (dv.vai || []).indexOf(v) >= 0; });
      });
    }).map(function (m) { return m.ma; });
  };

  /* ═══════════ MÀN: BẢN ĐỒ CHIẾN LƯỢC ═══════════ */
  G.VIEWS['ban-do-chien-luoc'] = function () {
    if (!G.CL_MUC || !G.CL_TANG)
      return U.empty('Chưa mở được bản đồ chiến lược',
        'Bản đồ chiến lược là công cụ điều hành nội bộ, nằm trong gói nghề. Đăng nhập bằng tài khoản có phạm vi ấy để mở.');

    var soi = G.clSoiChuoi();
    var ngu = G.clDemNguon();

    var o = U.ph({ eyebrow: 'BẢN ĐỒ CHIẾN LƯỢC', ic: 'map', grad: 1,
      t: 'Việc hôm nay chạm vào lời hứa trăm năm ở chỗ nào',
      lead: 'Đọc từ DƯỚI LÊN. Tầng dưới đẩy tầng trên: học tập đẩy vận hành, vận hành đẩy gia đình, ' +
        'gia đình đẩy tài chính. Doanh thu nằm trên cùng vì nó là kết quả — chỗ duy nhất không kéo trực tiếp được.' });

    /* Bốn kết quả ở đỉnh */
    o += U.sec('Bốn kết quả ở đỉnh', 'Mọi mắt xích bên dưới phải dẫn tới ít nhất một trong bốn.');
    o += '<div class="grid g2 mb">' + (G.CL_KETQUA || []).map(function (k) {
      return '<div class="card" style="border-color:' + k.c + '2e">' +
        '<b class="sm" style="display:block;color:' + k.c + ';margin-bottom:7px">' + h(k.ten) + '</b>' +
        '<p class="sm dim" style="line-height:1.8">' + h(k.y) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7"><b>Đo bằng:</b> ' + h(k.do) + '</p></div>';
    }).join('') + '</div>';

    /* Bốn tầng, tầng gốc dưới cùng */
    G.clTheoTang().forEach(function (nhom) {
      var t = nhom.tang;
      o += '<div class="card mb" style="border-color:' + t.c + '2e">' +
        '<div class="row wrap mb" style="gap:10px;align-items:baseline">' +
        '<b style="color:' + t.c + '">' + h(t.ten) + '</b>' +
        '<span class="tiny muted">' + h(t.hoi) + '</span></div>' +
        '<p class="tiny dim mb" style="line-height:1.7">' + h(t.y) + '</p>';

      o += '<div class="grid g2">' + nhom.muc.map(function (m) {
        var n = G.clNguon(m);
        var mau = n.trang === 'co' ? '#0B7350' : n.trang === 'trong' ? '#B4720F' : '#BE0E16';
        var nhan = n.trang === 'co' ? 'ĐO ĐƯỢC' : n.trang === 'trong' ? 'CHƯA CÓ SỐ' : 'THIẾU NGUỒN';
        var len = (m.noi || []).map(function (x) {
          var d = mucCua(x); return d ? d.ten : x;
        });
        return '<div class="card" style="border-color:' + mau + '26">' +
          '<div class="row wrap" style="gap:7px;align-items:baseline;margin-bottom:6px">' +
          '<span class="tiny up" style="color:' + mau + '">' + h(m.ma) + ' · ' + nhan + '</span></div>' +
          '<b class="sm" style="display:block;margin-bottom:7px">' + h(m.ten) + '</b>' +
          '<p class="sm dim" style="line-height:1.8">' + h(m.y) + '</p>' +
          '<div class="tiny mt" style="line-height:1.8">' +
          '<div><b>Đo:</b> ' + h(m.do) + '</div>' +
          '<div><b>Đạt khi:</b> ' + h(m.chuan) + ' · <b>Nhịp:</b> ' + h(m.nhip) + '</div>' +
          '<div class="muted">' + h(n.vi) + '</div>' +
          (len.length ? '<div class="mt"><b>Đẩy lên:</b> ' + len.map(h).join(' · ') + '</div>'
                      : '<div class="mt muted">Nằm ở tầng kết quả — không đẩy tiếp lên đâu nữa.</div>') +
          '</div></div>';
      }).join('') + '</div></div>';
    });

    /* Kết quả soi chuỗi — nói thẳng, kể cả khi xấu */
    o += U.sec('Chuỗi nhân quả có lành không',
      'Phần này soi chính bản đồ ở trên, không soi công việc. Bản đồ hỏng thì mọi con số bên dưới đều đo nhầm chỗ.');
    var dong = [
      ['Mục tiêu gắn vào tầng có thật', soi.lacTang, 'Gắn nhầm tầng thì nó nằm sai chỗ trong chuỗi nhân quả.'],
      ['Mọi mối nối trỏ vào mã có thật', soi.noiHong, 'Nối vào một mã không tồn tại là mũi tên vẽ ra chỗ trống.'],
      ['Không mục tiêu nào cụt', soi.cut, 'Cụt nghĩa là làm xong cũng không ai khá hơn.'],
      ['Mọi nhánh đều tới được tầng tài chính', soi.khongToi, 'Có mũi tên nhưng chạy vòng rồi dừng — nhìn bản đồ không thấy được.']
    ];
    o += '<div class="card mb">' + dong.map(function (d) {
      var xau = d[1].length;
      return '<div class="row wrap" style="gap:9px;align-items:baseline;padding:7px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<span style="color:' + (xau ? '#BE0E16' : '#0B7350') + '">' + ic(xau ? 'bell' : 'check', 'w-4 h-4') + '</span>' +
        '<div style="flex:1"><b class="sm">' + h(d[0]) + '</b>' +
        '<div class="tiny dim" style="line-height:1.7">' + h(d[2]) + '</div>' +
        (xau ? '<div class="tiny" style="color:#BE0E16">' + h(d[1].join(' ')) + '</div>' : '') + '</div></div>';
    }).join('') + '</div>';

    o += '<div class="card mb"><b class="sm">Đo được bao nhiêu phần của bản đồ</b>' +
      '<p class="sm dim mt" style="line-height:1.8">' + ngu.co + ' trên ' + ngu.tong +
      ' mục tiêu đang có nguồn số thật. ' + ngu.trong + ' mục tiêu có nguồn nhưng chưa đủ dữ liệu — ' +
      'đó là chuyện bình thường của một hệ mới chạy, và nó sẽ tự đầy lên.' +
      (ngu.thieu.length ? ' <b style="color:#BE0E16">' + ngu.thieu.length +
        ' mục tiêu đang trỏ vào nguồn không có thật: ' + h(ngu.thieu.join(' ')) + '</b>' : '') +
      '</p></div>';

    /* Chín bậc tháp */
    o += U.sec('Chín bậc tháp', 'Bậc dưới quyết định bậc trên. Càng lên cao càng đổi nhanh — đó là lý do phải tách bậc.');
    o += '<div class="card">' + (G.CL_THAP || []).slice().reverse().map(function (b) {
      var coKho = G[b.kho] !== undefined;
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<div class="row wrap" style="gap:9px;align-items:baseline">' +
        '<span class="tiny up muted">BẬC ' + b.b + '</span>' +
        '<b class="sm">' + h(b.ten) + '</b>' +
        '<span class="tiny dim">' + h(b.hoi) + '</span>' +
        '<span class="tiny" style="margin-left:auto;color:' + (coKho ? '#0B7350' : '#B4720F') + '">' +
        h(b.kho) + (coKho ? '' : ' · ngoài phạm vi đang mở') + '</span></div>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(b.y) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(b.dau) + '</p>' +
        '<div class="tiny muted mt">Ai chốt: ' + h(b.ai) + ' · Xem lại: ' + h(b.nhip) +
        (b.man ? ' · <button class="btn ghost sm" data-v="' + h(b.man) + '">Mở</button>' : '') + '</div></div>';
    }).join('') + '</div>';

    return o;
  };

  /* ═══════════ MÀN: THẺ ĐIỂM CÂN BẰNG ═══════════ */
  G.VIEWS['the-diem-can-bang'] = function () {
    if (!G.CL_MUC)
      return U.empty('Chưa mở được thẻ điểm',
        'Thẻ điểm cân bằng là công cụ điều hành nội bộ, nằm trong gói nghề.');

    var o = U.ph({ eyebrow: 'THẺ ĐIỂM CÂN BẰNG', ic: 'chart', grad: 1,
      t: 'Mỗi mục tiêu một thước, mỗi thước một ngưỡng',
      lead: 'Không có ngưỡng thì con số chỉ là con số. Và một bộ thước không bao giờ đỏ là một bộ thước không đo gì — ' +
        'quý nào cả bốn tầng đều xanh thì việc phải làm là siết chuẩn, không phải ăn mừng.' });

    var hang = [];
    G.clTheoTang().forEach(function (nhom) {
      nhom.muc.forEach(function (m) {
        var n = G.clNguon(m);
        var nhan = n.trang === 'co' ? 'Đo được' : n.trang === 'trong' ? 'Chưa có số' : 'Thiếu nguồn';
        /* U.tbl thoát chữ ở đầu cột nhưng KHÔNG thoát ô, nên thoát tại đây.
           Nội dung này là kho của Học viện chứ không phải người dùng gõ,
           nhưng một ô không thoát hôm nay là một ô không ai nhớ ngày mai. */
        hang.push([h(nhom.tang.ten), h(m.ma + ' · ' + m.ten), h(m.do), h(m.chuan), h(m.nhip),
          h((m.vai || []).join(' ')), h(nhan)]);
      });
    });
    o += U.tbl(['Tầng', 'Mục tiêu', 'Đo bằng số nào', 'Đạt khi', 'Nhịp', 'Ai chịu', 'Trạng thái'], hang);

    /* Nhịp xem lại */
    o += U.sec('Nhịp xem lại — phân tầng theo thời gian',
      'Mỗi tầng thời gian có ĐÚNG MỘT câu hỏi, và tầng dưới không được bàn câu hỏi của tầng trên.');
    o += '<div class="card mb">' + (G.CL_NHIP || []).map(function (n) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<div class="row wrap" style="gap:9px;align-items:baseline">' +
        '<b class="sm">' + h(n.ten) + '</b>' +
        '<span class="tiny muted">' + h(n.ai) + (n.phut ? ' · ' + n.phut + ' phút' : '') + '</span></div>' +
        '<p class="sm mt" style="line-height:1.8"><b>Hỏi:</b> ' + h(n.hoi) + '</p>' +
        '<p class="tiny dim" style="line-height:1.7"><b>Ra khỏi buổi với:</b> ' + h(n.ra) + '</p>' +
        '<p class="tiny" style="line-height:1.7;color:#B4720F">' + h(n.khong) + '</p></div>';
    }).join('') + '</div>';

    /* Sáu nếp nghề, mỗi nếp phải chỉ ra cơ chế có thật */
    o += U.sec('Sáu nếp nghề và cơ chế đang thi hành chúng',
      'Chép khẩu hiệu thì dễ và vô ích. Mỗi nếp phải chỉ ra được cái cơ chế CÓ THẬT trong hệ thống đang thực thi nó.');
    o += '<div class="grid g2 mb">' + (G.CL_NHAT || []).map(function (x) {
      return '<div class="card">' +
        '<div class="row wrap" style="gap:8px;align-items:baseline;margin-bottom:6px">' +
        '<b class="sm">' + h(x.ten) + '</b><span class="tiny muted">' + h(x.tu) + '</span></div>' +
        '<p class="sm dim" style="line-height:1.8">' + h(x.y) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#0B7350"><b>Cơ chế đang chạy:</b> ' + h(x.co) + '</p></div>';
    }).join('') + '</div>';

    o += U.sec('Sáu luật của lớp này', 'Viết ra để sau này không ai nới.');
    o += '<div class="card">' + (G.CL_LUAT || []).map(function (l) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + l.no + '. ' + h(l.t) + '</b>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(l.y) + '</p></div>';
    }).join('') + '</div>';
    return o;
  };
})();

})();

/* ═════════ src/tuyen.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.8 — MÀN BỐN TUYẾN

   Màn này trả lời đúng một câu: mỗi tuyến còn thiếu gì trước khi mở
   được cho khách. Và trả lời bằng cách ĐO dữ liệu đang có trong máy,
   không bằng một cờ ai đó tự bật — giống hệt cách màn tự soát làm.

   Vì sao cần: bốn tuyến đang dựng chuẩn song song. Không có một chỗ
   nhìn thấy tất cả thì tới lúc hợp nhất mới phát hiện tuyến nào thiếu
   băng, tuyến nào thiếu kịch bản — và lúc ấy sửa đắt hơn nhiều.

   Hàm đo nằm ở src/data.tuyen.js (G.tuyenDatMoc). Ở đây chỉ vẽ.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function(){
var U = G.U, h = U.h, ic = U.ic;
G.VIEWS = G.VIEWS || {};

function o1(dat){
  return dat ? '<span style="color:var(--ok);font-weight:700">✓</span>'
             : '<span style="color:var(--gita-do-ink);font-weight:700">✕</span>';
}
function o1x(dat){
  return dat ? '<span class="chip" style="color:var(--ok);border-color:var(--ok)">đã có</span>'
             : '<span class="chip" style="color:var(--gita-do-ink);border-color:var(--gita-do)">chưa có</span>';
}

G.VIEWS['tuyen'] = function(){
  /* Bảng này lộ toàn bộ kế hoạch sản phẩm của Học viện — tuyến nào sắp
     mở, tuyến nào còn thiếu gì. Chỉ mở cho cấp quản trị. */
  if(!G.can('qt_trang')) return U.lockCard(
    'Bảng bốn tuyến cho biết tuyến nào sắp mở và tuyến nào còn thiếu gì — '+
    'đó là kế hoạch sản phẩm của Học viện. Màn này chỉ mở cho Super Admin và Admin hệ thống.');

  var DS = G.TUYEN || [], MOC = G.TUYEN_MOC || [];
  var chay = DS.filter(function(t){ return t.trangThai === 'chay'; }).length;

  var o = U.ph({eyebrow:'HỢP NHẤT HỆ THỐNG', ic:'orbit', grad:1,
    t:'Bốn tuyến chuyên môn',
    lead:'ENGWIN365 · MATH365 · SAT365 · HSA365 đang dựng chuẩn riêng, hợp nhất vào GITA365 sau. '+
         'Bảng dưới đo bằng dữ liệu đang có trong máy, không bằng cờ tự bật: mốc nào chưa xanh là '+
         'thứ đó chưa có thật.'});

  /* Hai điều đã chốt — đặt ngay đầu màn vì mọi thứ dưới đây suy ra từ chúng */
  o += '<div class="row wrap mt2" style="gap:12px">'+
    '<div class="card" style="flex:1;min-width:280px;border-left:3px solid var(--ok)">'+
      '<div class="tiny up muted">DÙNG CHUNG</div>'+
      '<b style="display:block;margin-top:4px;font-size:15px">Năm tầng T1 → T5</b>'+
      '<p class="sm mt" style="line-height:1.7">Cả bốn tuyến đi theo cùng năm tầng của GITA365. '+
      'Nhờ vậy ma trận, cổng nghiệm thu, chuẩn thời gian và cách đồng hành dùng lại được nguyên — '+
      'hợp nhất là ghép dữ liệu, không phải viết lại khung.</p></div>'+
    '<div class="card" style="flex:1;min-width:280px;border-left:3px solid var(--gita-do-ink)">'+
      '<div class="tiny up muted">RIÊNG TỪNG TUYẾN</div>'+
      '<b style="display:block;margin-top:4px;font-size:15px">Tín hiệu vào bốn băng</b>'+
      '<p class="sm mt" style="line-height:1.7">Bốn băng giữ nguyên tên và nguyên ý nghĩa hành động, '+
      'nhưng mỗi tuyến tự đặt cách đo: SAT365 đo bằng điểm thi thử, GITA365 đo bằng mức tự chủ. '+
      'Tuyến chưa có chuẩn băng thì hệ thống báo trống, KHÔNG mượn tạm băng của GITA365.</p></div>'+
  '</div>';

  o += U.sec('TRẠNG THÁI SÁU MỐC', chay + '/' + DS.length + ' tuyến đang phục vụ khách · mốc nào chưa xanh là chưa mở được cho khách');

  o += U.tbl(
    ['Tuyến','Trạng thái'].concat(MOC.map(function(m){ return m.ma; })),
    DS.map(function(t){
      var d = G.tuyenDatMoc(t.ma);
      var xong = MOC.filter(function(m){ return d[m.do]; }).length;
      return ['<b class="sm" style="color:'+t.c+'">'+h(t.ten)+'</b>'+
                '<div class="tiny muted">'+h(t.day)+'</div>',
              t.trangThai === 'chay'
                ? '<span class="chip" style="color:var(--ok);border-color:var(--ok)">Đang chạy</span>'
                : '<span class="chip" style="color:var(--gita-do-ink);border-color:var(--gita-do)">Dựng chuẩn '+xong+'/'+MOC.length+'</span>'
             ].concat(MOC.map(function(m){ return '<span class="mono">'+o1(d[m.do])+'</span>'; }));
    }));

  o += '<div class="card mt2"><div class="tiny up muted mb">SÁU MỐC NGHĨA LÀ GÌ</div>'+
    MOC.map(function(m, i){
      return '<div class="row'+(i ? ' mt2' : '')+'" style="gap:11px;align-items:flex-start">'+
        '<b class="mono" style="flex:none;color:var(--gita)">'+h(m.ma)+'</b>'+
        '<div style="flex:1"><b class="sm">'+h(m.ten)+'</b>'+
        '<p class="sm muted mt" style="line-height:1.7">'+h(m.y)+'</p></div></div>';
    }).join('') +'</div>';

  /* Gói cấp phép của từng tuyến — để anh Quang thấy bán tách được */
  o += U.sec('GÓI CẤP PHÉP CỦA TỪNG TUYẾN','Bán tuyến này mà không mở tuyến kia — mỗi tuyến một bộ gói riêng');
  o += '<div class="card"><p class="sm mb" style="line-height:1.75">'+
    'Tuyến gốc GITA365 <b>giữ nguyên tên gói cũ</b> (<span class="mono">nghe · tang1…tang5</span>) — '+
    'đây là ràng buộc cứng: đổi tên là mọi giấy phép đã cấp cho đội ngũ và cho máy khách thành giấy lộn. '+
    'Tuyến mới mang tiền tố riêng.</p>'+
    U.tbl(['Tuyến','Gói nghề','Gói năm tầng'], (G.TUYEN||[]).map(function(t){
      return ['<b class="sm" style="color:'+t.c+'">'+h(t.ma)+'</b>',
              '<span class="mono sm">'+h(G.goiNghe(t.ma))+'</span>',
              '<span class="mono sm">'+h(G.goiTang(t.ma,1))+' … '+h(G.goiTang(t.ma,5))+'</span>'];
    })) +'</div>';

  /* ── HỢP ĐỒNG RIÊNG TỪNG TUYẾN ── */
  o += U.sec('HỢP ĐỒNG RIÊNG CỦA TỪNG TUYẾN',
    'Mỗi tuyến biên soạn hợp đồng theo quy định của chính tuyến ấy — mười bốn điều chung không bỏ điều nào, bảy điều riêng không chép từ tuyến khác');

  o += '<div class="card" style="border-left:3px solid var(--gita-do-ink)">'+
    '<p class="sm" style="line-height:1.75">Bảng dưới đếm theo <b>kho hợp đồng của chính tuyến</b> '+
    '(<span class="mono">&lt;MÃ TUYẾN&gt;_HOPDONG</span>), đối chiếu với mười bốn điều ở bản chuẩn. '+
    'Chưa có kho thì thiếu cả mười bốn.</p>'+
    '<p class="sm mt" style="line-height:1.75"><b>Bản chuẩn không thay luật sư.</b> Nó là danh sách kiểm. '+
    'Điều khoản có hiệu lực phải do người có thẩm quyền pháp lý soạn và gắn với pháp nhân đứng tên — '+
    'mà pháp nhân hiện còn để trống trong <span class="mono">LICENSE</span> và <span class="mono">NOTICE</span>.</p></div>';

  o += U.tbl(['Tuyến','Học phí riêng','Hợp đồng riêng','Điều còn thiếu'],
    DS.map(function(t){
      var d = G.tuyenDatMoc(t.ma);
      var thieu = G.hdConThieu(t.ma);
      var coChuan = thieu !== null;
      return ['<b class="sm" style="color:'+t.c+'">'+h(t.ma)+'</b>',
              o1x(d.hocphi),
              o1x(d.hopdong),
              !coChuan
                ? '<span class="tiny muted">chưa mở được bản chuẩn</span>'
                : (thieu.length
                    ? '<span class="tiny mono" style="color:var(--gita-do-ink)">'+
                      thieu.length+'/14 · '+h(thieu.slice(0,6).join(' '))+
                      (thieu.length > 6 ? '…' : '')+'</span>'
                    : '<span class="tiny" style="color:var(--ok)">đủ mười bốn điều</span>')];
    }));

  o += '<div class="card mt2"><div class="tiny up muted mb">MƯỜI BỐN ĐIỀU CHUNG — KHÔNG TUYẾN NÀO ĐƯỢC BỎ</div>'+
    (G.HD_CHUAN || []).map(function(x, i){
      return '<div style="'+(i ? 'border-top:1px solid var(--line);padding-top:13px;margin-top:13px' : '')+'">'+
        '<div class="row" style="gap:9px;align-items:baseline;flex-wrap:wrap">'+
          '<b class="mono" style="color:var(--gita)">'+h(x.ma)+'</b>'+
          U.chip(x.nhom)+
          '<b class="sm" style="flex:1;min-width:200px">'+h(x.t)+'</b></div>'+
        '<p class="sm mt" style="line-height:1.7">'+h(x.y)+'</p>'+
        '<p class="sm mt" style="line-height:1.7;color:var(--gita-do-ink)"><b>Thiếu thì:</b> '+h(x.rui)+'</p></div>';
    }).join('') +'</div>';

  o += '<div class="card mt2" style="border-color:var(--gita-vien-1)">'+
    '<div class="tiny up muted mb">BẢY ĐIỀU MỖI TUYẾN TỰ QUYẾT — KHÔNG CHÉP TỪ TUYẾN KHÁC</div>'+
    (G.HD_RIENG || []).map(function(x, i){
      return '<div class="row'+(i ? ' mt2' : '')+'" style="gap:10px;align-items:flex-start">'+
        '<span style="color:var(--gita);font-weight:700;flex:none">'+(i+1)+'</span>'+
        '<div style="flex:1"><b class="sm">'+h(x.t)+'</b>'+
        '<p class="sm muted mt" style="line-height:1.7">'+h(x.y)+'</p></div></div>';
    }).join('') +'</div>';

  o += '<div class="card mt2" style="border-color:var(--gita-do)">'+
    '<div class="tiny up mb" style="color:var(--gita-do-ink)">NĂM LUẬT</div>'+
    (G.HD_LUAT || []).map(function(x, i){
      return '<div style="'+(i ? 'border-top:1px solid var(--line);padding-top:12px;margin-top:12px' : '')+'">'+
        '<b class="sm">'+h(x.t)+'</b>'+
        '<p class="sm muted mt" style="line-height:1.7">'+h(x.y)+'</p></div>';
    }).join('') +'</div>';

  /* Hình dạng chuẩn băng — để lúc mang chuẩn về là cắm vào được ngay */
  o += U.sec('CHUẨN BĂNG PHẢI CÓ ĐÚNG NHỮNG TRƯỜNG NÀY','Cùng hình dạng với băng của GITA365 thì hợp nhất là ghép, không phải nắn lại');
  o += '<div class="card">'+ U.tbl(['Trường','Phải ghi gì'],
    (G.TUYEN_BANG_TRUONG||[]).map(function(x){
      return ['<span class="mono sm'+(x.t === 'vao' ? ' b' : '')+'" style="'+
                (x.t === 'vao' ? 'color:var(--gita-do-ink)' : '')+'">'+h(x.t)+'</span>',
              '<span class="sm">'+h(x.y)+'</span>'];
    })) +'</div>';

  return o;
};

})();

})();

/* ═════════ src/tu-van-hanh.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v8.4 — MÀN TỰ VẬN HÀNH

   Màn này KHÔNG phải một bảng mô tả. Nó chạy thật: G.tdQuet() đi hết
   danh mục canh, đo trên dữ liệu đang nạp, và trả về kết quả kèm mức
   nghiêm trọng. Bảng mô tả thì ai cũng viết được; thứ đáng tin là con
   số đo được lúc mở màn.

   Hàm nằm ở src/ vì kho đóng gói bằng JSON.stringify — hàm viết trong
   kho-goc sẽ biến mất sau khi mã hoá.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function(){
var U = G.U, h = U.h, ic = U.ic;
G.VIEWS = G.VIEWS || {};

function mucCua(ma){
  var a = G.TD_MUC || [];
  for(var i=0;i<a.length;i++) if(a[i].ma === ma) return a[i];
  return null;
}

/* ── Quét thật. Mỗi mục canh nào đo được ở phía trình duyệt thì đo. ── */
G.tdQuet = function(){
  var kq = [];
  function ghi(ma, dat, so, ghiChu){
    kq.push({ ma:ma, dat:dat, so:so, ghiChu:ghiChu || '' });
  }

  /* C-05 · danh sách tệp lệch — đo bằng số tệp đã nạp thật */
  var tep = document.querySelectorAll('script[src^="src/"]').length;
  ghi('C-05', true, tep ? tep + ' tệp mã nguồn đã nạp' : 'bản một tệp — không áp dụng');

  /* C-06 và C-07 · dùng KẾT QUẢ ĐÃ CÓ của bộ tự soát, không ép nó chạy.

     Ép chạy ở đây là đệ quy: bộ tự soát dựng thử mọi màn, trong đó có
     chính màn này, và màn này lại gọi bộ tự soát. Đã treo trình duyệt
     một lần vì đúng chuyện ấy.

     Nên: có sẵn kết quả thì đọc, chưa có thì nói thẳng là chưa đo và mời
     mở màn tự soát. Thà báo "chưa đo" còn hơn treo máy. */
  var soat = (G.soatTatCa && G.soatCoSan && G.soatCoSan()) ? G.soatTatCa() : null;
  if(soat){
    ghi('C-06', !soat.hong, soat.hong ? soat.hong + ' chỗ lệch' : 'mọi mốc khớp');
    var n = (soat.tam ? soat.tam.length : 0) + (soat.cut ? soat.cut.length : 0);
    ghi('C-07', !n, n ? n + ' chỗ' : 'sạch');
  } else {
    ghi('C-06', null, 'mở màn Soát đủ ruột một lần để có số');
    ghi('C-07', null, 'mở màn Soát đủ ruột một lần để có số');
  }

  /* C-08 · bậc thang phân quyền đảo ngược */
  if(G.demTheoVai){
    var d = G.demTheoVai().slice().sort(function(a,b){ return a.vai.lv - b.vai.lv; });
    var nguoc = [];
    for(var i=1;i<d.length;i++) if(d[i].thay > d[i-1].thay) nguoc.push(d[i].vai.id);
    ghi('C-08', !nguoc.length, nguoc.length ? nguoc.join(' ') : 'bậc thang đúng chiều');
  } else ghi('C-08', null, 'chưa đo được');

  /* C-09 · vai thấy màn mà Super Admin không thấy */
  if(G.soSanhVai && G.ROLES){
    var thieu = G.ROLES.filter(function(v){ return v.id !== 'R01'; })
      .filter(function(v){ return G.soSanhVai('R01', v.id).chiB.length > 0; })
      .map(function(v){ return v.id; });
    ghi('C-09', !thieu.length, thieu.length ? thieu.join(' ') : 'Super Admin thấy hết');
  } else ghi('C-09', null, 'chưa đo được');

  /* C-04 · gói kho giải mã lỗi */
  var kho = G.KHO || {};
  ghi('C-04', !kho.lyDoTuChoi,
    kho.cheDoMau ? 'chế độ mẫu — không có gói nào để giải mã'
                 : ((kho.daNap || []).length + ' gói mở tốt'));

  /* C-01 · ngưỡng tài nguyên — đọc từ lớp theo dõi nếu có */
  if(G.tnVuot){
    try { var v = G.tnVuot(); ghi('C-01', !v.length, v.length ? v.length + ' tài khoản vượt' : 'không ai vượt 20%'); }
    catch(e){ ghi('C-01', null, 'chưa đo được'); }
  } else ghi('C-01', null, 'đo ở máy chủ, không đo ở trình duyệt');

  /* C-02 · C-03 · C-10 — đo ở máy chủ hoặc cần người đọc ngữ cảnh */
  ghi('C-02', null, 'đo ở máy chủ cấp phép');
  ghi('C-03', null, 'cần người đọc ngữ cảnh — máy chỉ đánh dấu');
  ghi('C-10', null, 'ngưỡng chưa chốt — chờ Hội đồng chuyên môn');

  var doDuoc = kq.filter(function(x){ return x.dat !== null; });
  return {
    kq: kq,
    doDuoc: doDuoc.length,
    dat: doDuoc.filter(function(x){ return x.dat; }).length,
    hong: doDuoc.filter(function(x){ return !x.dat; }),
    chuaDo: kq.filter(function(x){ return x.dat === null; }).length
  };
};

G.VIEWS['tu-van-hanh'] = function(){
  if(!G.can('qt_trang')) return U.lockCard(
    'Màn tự vận hành cho thấy toàn bộ cơ chế canh, ngưỡng, và những việc hệ thống tự làm. '+
    'Chỉ mở cho Super Admin và Admin hệ thống.');

  var q = G.tdQuet(), CANH = G.TD_CANH || [], MUC = G.TD_MUC || [];
  var tra = {}; q.kq.forEach(function(x){ tra[x.ma] = x; });

  var o = U.ph({eyebrow:'QUẢN TRỊ TRANG', ic:'pulse', grad:1,
    t:'Tự vận hành, tự vá, tự học',
    lead:'Bốn mức: máy tự phát hiện, tự chặn, tự sửa trong danh sách hẹp — và dừng lại ở mức thứ tư, '+
         'nơi quyết định gắn với trách nhiệm. Bảng dưới quét thật trên dữ liệu đang nạp, không mô tả suông.'});

  o += '<div class="grid g4 mt2">'+
    U.stat({k:'MỤC CANH', v:CANH.length, d:'toàn bộ danh mục', c:'#2A72C6'})+
    U.stat({k:'ĐO ĐƯỢC NGAY', v:q.doDuoc, d:'ở phía trình duyệt', c:'#5140B4'})+
    U.stat({k:'ĐANG ĐẠT', v:q.dat + '/' + q.doDuoc, d:'trên số đo được',
            c: q.hong.length ? '#BE0E16' : '#0B7350'})+
    U.stat({k:'ĐO Ở NƠI KHÁC', v:q.chuaDo, d:'máy chủ, hoặc cần người đọc', c:'#B45309'})+
  '</div>';

  if(q.hong.length)
    o += '<div class="card mt2" style="border-color:var(--gita-do)">'+
      '<div class="tiny up mb" style="color:var(--gita-do-ink)">ĐANG CÓ VẤN ĐỀ</div>'+
      q.hong.map(function(x){
        var c = CANH.filter(function(y){ return y.ma === x.ma; })[0] || {};
        return '<p class="sm mt" style="line-height:1.7"><b class="mono">'+h(x.ma)+'</b> · '+
               h(c.ten || '')+' — <span style="color:var(--gita-do-ink)">'+h(x.so)+'</span></p>';
      }).join('') +'</div>';
  else
    o += '<div class="card mt2" style="border-color:var(--ok)">'+
      '<div class="row" style="gap:9px"><span style="color:var(--ok)">'+ic('check','w-4 h-4')+'</span>'+
      '<p class="sm" style="flex:1;line-height:1.7">Mọi mục canh đo được ở đây đều đang đạt. '+
      h(q.chuaDo)+' mục còn lại đo ở máy chủ hoặc cần người đọc ngữ cảnh — chúng được ghi rõ, không bỏ qua.</p></div></div>';

  /* Bốn mức */
  o += U.sec('BỐN MỨC TỰ ĐỘNG','Mức bốn không phải chỗ hệ thống yếu — là chỗ quyết định gắn với người đứng tên');
  o += '<div class="row wrap" style="gap:11px">'+ MUC.map(function(m){
    return '<div class="card" style="flex:1;min-width:230px;border-top:3px solid '+m.c+'">'+
      '<div class="row" style="gap:8px;align-items:baseline">'+
        '<b class="mono" style="color:'+m.c+'">'+h(m.ma)+'</b>'+
        '<b style="flex:1;font-size:14px">'+h(m.ten)+'</b>'+
        (m.tuDong ? U.chip('máy tự làm', m.c) : U.chip('cần người', '#BE0E16'))+'</div>'+
      '<p class="sm mt" style="line-height:1.7">'+h(m.y)+'</p>'+
      '<p class="tiny muted mt2" style="line-height:1.6"><b>Ví dụ:</b> '+h(m.vd)+'</p>'+
      '<p class="tiny mt" style="line-height:1.6;color:var(--gita-do-ink)"><b>Rủi ro:</b> '+h(m.rui)+'</p></div>';
  }).join('') +'</div>';

  /* Danh mục canh + kết quả quét */
  o += U.sec('DANH MỤC CANH — VÀ KẾT QUẢ QUÉT NGAY BÂY GIỜ',
    'Cột "máy làm gì" và cột "lùi thế nào" đi cùng nhau. Việc nào máy tự làm mà không lùi được thì không được tự làm.');
  o += U.tbl(['Mã','Canh gì','Ngưỡng','Mức','Máy làm gì','Ai xác nhận','Lùi thế nào','Đo được'],
    CANH.map(function(c){
      var m = mucCua(c.muc) || {}, r = tra[c.ma] || {};
      var oDat = r.dat === true  ? '<span style="color:var(--ok)">✓ '+h(r.so)+'</span>'
               : r.dat === false ? '<span style="color:var(--gita-do-ink)">✗ '+h(r.so)+'</span>'
               : '<span class="tiny muted">'+h(r.so || '—')+'</span>';
      return ['<b class="mono sm">'+h(c.ma)+'</b><div class="tiny muted">'+h(c.nhom)+'</div>',
              '<b class="sm">'+h(c.ten)+'</b><div class="tiny muted">'+h(c.do)+'</div>',
              '<span class="sm">'+h(c.nguong)+'</span>',
              '<span class="chip" style="color:'+(m.c||'')+';border-color:'+(m.c||'')+'55">'+h(c.muc)+'</span>',
              '<span class="sm">'+h(c.may)+'</span>',
              '<span class="sm">'+h(c.ai)+'</span>',
              '<span class="tiny muted">'+h(c.lui)+'</span>',
              oDat];
    }));

  /* Đường cập nhật kiến thức */
  o += U.sec('ĐƯỜNG CẬP NHẬT KIẾN THỨC','Máy đi ba chặng đầu và DỪNG trước cửa kho — chỉ tài liệu đã duyệt mới thành chuẩn nghề');
  o += '<div class="row wrap" style="gap:11px">'+ (G.TD_TRITHUC || []).map(function(x){
    var c = x.may ? '#0B7350' : '#BE0E16';
    return '<div class="card" style="flex:1;min-width:220px;border-top:3px solid '+c+'">'+
      '<div class="row" style="gap:8px;align-items:baseline">'+
        '<b class="mono" style="color:'+c+'">'+h(x.b)+'</b>'+
        '<b style="flex:1;font-size:14px">'+h(x.ten)+'</b></div>'+
      (x.may ? U.chip('máy làm', c) : U.chip('người quyết', c))+
      '<p class="sm mt" style="line-height:1.7">'+h(x.lam)+'</p>'+
      '<p class="tiny muted mt2" style="line-height:1.6"><b>Ra:</b> '+h(x.ra)+'</p></div>';
  }).join('') +'</div>';

  /* Máy chủ nhà */
  var MC = G.TD_MAYCHU || {};
  o += U.sec('DỮ LIỆU Ở MÁY CHỦ CỦA CHỦ HỆ THỐNG','Máy khác chỉ dùng, không giữ');
  o += '<div class="card"><p class="sm" style="line-height:1.75">'+h(MC.y || '')+'</p>'+
    '<div class="row wrap mt2" style="gap:12px;align-items:flex-start">'+
      '<div style="flex:1;min-width:230px"><div class="tiny up" style="color:var(--gita)">MÁY CHỦ GIỮ</div>'+
        U.list(MC.chu || [], 'var(--gita)')+'</div>'+
      '<div style="flex:1;min-width:230px"><div class="tiny up" style="color:var(--ok)">MÁY KHÁCH ĐƯỢC</div>'+
        U.list(MC.khach || [], 'var(--ok)')+'</div>'+
      '<div style="flex:1;min-width:230px"><div class="tiny up" style="color:var(--gita-do-ink)">CHẶN BẰNG</div>'+
        U.list(MC.chan || [], 'var(--gita-do)')+'</div>'+
    '</div>'+
    '<div class="card mt2" style="border-color:var(--gita-do);background:rgba(251,146,60,.06)">'+
      '<div class="tiny up mb" style="color:var(--alert)">NÓI THẲNG PHẦN KHÔNG CHẶN ĐƯỢC</div>'+
      '<p class="sm" style="line-height:1.75">'+h(MC.that || '')+'</p></div></div>';

  /* ── Đã chạy thật / chưa làm ──
     Trước v8.5 cả mục này mới là chính sách viết ra giấy. Nay phần chạy
     thật nằm ở desktop/may-chu.js và src/may-khach.js, nên phải tách rõ
     hai cột: cái đã có hàng rào, và cái mới có lời hứa. Gộp chung là
     đúng kiểu làm người đọc yên tâm nhầm chỗ. */
  o += '<div class="row wrap mt2" style="gap:14px;align-items:flex-start">'+
    '<div class="card" style="flex:1;min-width:300px;border-color:var(--ok)">'+
      '<div class="tiny up mb" style="color:var(--ok)">ĐÃ CHẠY THẬT — CÓ MỤC KIỂM ĐỨNG SAU</div>'+
      (MC.daChay || []).map(function(x, i){
        return '<div class="row'+(i ? ' mt2' : '')+'" style="gap:10px;align-items:flex-start">'+
          '<span style="color:var(--ok);font-weight:700;flex:none">✓</span>'+
          '<div style="flex:1"><b class="sm">'+h(x.t)+'</b>'+
          '<p class="sm muted mt" style="line-height:1.7">'+h(x.y)+'</p></div></div>';
      }).join('')+'</div>'+
    '<div class="card" style="flex:1;min-width:300px;border-color:var(--alert)">'+
      '<div class="tiny up mb" style="color:var(--alert)">CHƯA LÀM — GHI RA THAY VÌ GIẤU ĐI</div>'+
      (MC.chuaLam || []).map(function(x, i){
        return '<div class="row'+(i ? ' mt2' : '')+'" style="gap:10px;align-items:flex-start">'+
          '<span style="color:var(--alert);font-weight:700;flex:none">○</span>'+
          '<div style="flex:1"><b class="sm">'+h(x.t)+'</b>'+
          '<p class="sm muted mt" style="line-height:1.7">'+h(x.y)+'</p></div></div>';
      }).join('')+'</div>'+
  '</div>';

  /* Không bao giờ tự động */
  o += U.sec('SÁU VIỆC KHÔNG BAO GIỜ TỰ ĐỘNG','Tự động hoá phần chịu trách nhiệm không phải tiến bộ — là bỏ tay lái');
  o += '<div class="card" style="border-color:var(--gita-do)">'+ (G.TD_KHONG || []).map(function(x, i){
    return '<div class="row'+(i ? ' mt2' : '')+'" style="gap:10px;align-items:flex-start">'+
      '<span style="color:var(--gita-do-ink);font-weight:700;flex:none">✕</span>'+
      '<div style="flex:1"><b class="sm">'+h(x.t)+'</b>'+
      '<p class="sm muted mt" style="line-height:1.7">'+h(x.y)+'</p></div></div>';
  }).join('') +'</div>';

  /* Nói thật về ba chữ */
  o += U.sec('BA CHỮ, VÀ NGHĨA THẬT CỦA CHÚNG','Một hệ thống hứa quá phần làm được sẽ làm người dùng lơi tay ở đúng chỗ cần chặt nhất');
  o += '<div class="row wrap" style="gap:11px">'+ (G.TD_THAT || []).map(function(x){
    return '<div class="card" style="flex:1;min-width:270px;border-left:3px solid var(--gita)">'+
      '<div class="tiny up muted">CHỮ ĐẶT RA</div>'+
      '<b style="display:block;margin:3px 0 8px;font-size:15px">'+h(x.chu)+'</b>'+
      '<p class="sm" style="line-height:1.75">'+h(x.that)+'</p>'+
      '<p class="tiny muted mt2" style="line-height:1.6"><b>Đo được:</b> '+h(x.do)+'</p></div>';
  }).join('') +'</div>';

  return o;
};

})();

})();

/* ═════════ src/quy-trinh-toan-he.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v8.1 — MÀN BẢNG QUY TRÌNH TOÀN WEB APP

   Trả lời câu chủ hệ thống hỏi: nhìn từ A đến Z thì Web App này vận
   hành thế nào, và trong phạm vi quyền của mình thì mình cầm những gì.

   Ba phần:
     A · Tám luồng vận hành — chuỗi bước có thật, mỗi bước một màn
     B · Toàn bộ màn hình — ĐẾM TỪ G.NAV, không khai tay
     C · Quyền chỉ cấp quản trị có

   Phần B tự đếm có chủ ý. Một bảng quy trình khai tay sẽ lệch khỏi ứng
   dụng ngay lần thêm màn sau, và bảng lệch còn tệ hơn không có bảng —
   người đọc tin nó rồi ra quyết định sai.

   Mọi tên màn trong luồng cũng được đối chiếu với G.NAV lúc dựng: khai
   một màn không có thật thì hiện đỏ ngay tại dòng ấy.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function(){
var U = G.U, h = U.h, ic = U.ic;
G.VIEWS = G.VIEWS || {};

/* Bản đồ tên màn → mục điều hướng, dựng lại mỗi lần vẽ */
function banDoMan(){
  var m = {};
  (G.NAV || []).forEach(function(g){
    (g.items || []).forEach(function(i){ m[i.v] = { it:i, nhom:g }; });
  });
  return m;
}

/* Vai thấp nhất mở được một màn — đọc từ bảng quyền thật */
function vaiThapNhat(perm){
  if(!perm) return 'mọi vai';
  var ds = (G.ROLES || []).filter(function(v){ return G.vaiCo && G.vaiCo(v.id, perm); });
  if(!ds.length) return '—';
  var thap = ds[0];
  ds.forEach(function(v){ if(v.lv > thap.lv) thap = v; });
  return thap.short + ' (LV' + thap.lv + ')';
}

G.qtSoat = function(){
  var bd = banDoMan(), hong = [], man = 0;
  (G.QT_LUONG || []).forEach(function(l){
    (l.buoc || []).forEach(function(b, i){
      man++;
      if(!bd[b.man]) hong.push(l.ma + '.' + (i + 1) + ' → ' + b.man);
    });
  });
  return { hong:hong, man:man, luong:(G.QT_LUONG || []).length };
};

G.VIEWS['quy-trinh-toan-he'] = function(){
  if(!G.can('qt_trang')) return U.lockCard(
    'Bảng quy trình toàn hệ cho thấy mọi luồng vận hành và mọi quyền của cấp quản trị. '+
    'Màn này chỉ mở cho Super Admin và Admin hệ thống.');

  var L = G.QT_LUONG || [], bd = banDoMan(), soat = G.qtSoat();
  var NAV = G.NAV || [], TH = G.TANG_HIENTHI || [];
  var tongMan = 0; NAV.forEach(function(g){ tongMan += (g.items || []).length; });
  var soQuyen = Object.keys(G.PERM || {}).length;
  var trongLuong = {};
  L.forEach(function(l){ (l.buoc || []).forEach(function(b){
    (trongLuong[b.man] = trongLuong[b.man] || []).push(l.ma); }); });
  var daPhu = Object.keys(trongLuong).filter(function(v){ return bd[v]; }).length;

  var o = U.ph({eyebrow:'QUẢN TRỊ TRANG', ic:'orbit', grad:1,
    t:'Bảng quy trình toàn Web App',
    lead:'Tám luồng vận hành, từng bước một màn, mỗi bước nói rõ ai làm · xong khi nào · '+
         'không xong thì làm gì. Số màn và số quyền ở đây được ĐẾM từ chính ứng dụng đang chạy, '+
         'không khai tay — bảng quy trình lệch còn tệ hơn không có bảng.'});

  o += '<div class="grid g4 mt2">'+
    U.stat({k:'LUỒNG VẬN HÀNH', v:soat.luong, d:'chuỗi bước có thật trong ứng dụng', c:'#2A72C6'})+
    U.stat({k:'TỔNG BƯỚC', v:soat.man, d:'mỗi bước gắn đúng một màn', c:'#5140B4'})+
    U.stat({k:'MÀN HÌNH', v:tongMan, d:daPhu + ' màn nằm trong một luồng', c:'#0B7350'})+
    U.stat({k:'QUYỀN', v:soQuyen, d:'Super Admin có đủ, không thiếu quyền nào',
            c: soat.hong.length ? '#BE0E16' : '#0B7350'})+
  '</div>';

  if(soat.hong.length)
    o += '<div class="card mt2" style="border-color:var(--gita-do)">'+
      '<div class="tiny up mb" style="color:var(--gita-do-ink)">BƯỚC TRỎ TỚI MÀN KHÔNG CÓ THẬT</div>'+
      '<p class="sm" style="line-height:1.7">'+h(soat.hong.join(' · '))+'</p>'+
      '<p class="sm muted mt">Ứng dụng đã đổi mà bảng luồng chưa đổi theo. Sửa ở '+
      '<span class="mono">kho-goc/data.quy-trinh-toan-he.js</span>.</p></div>';
  else
    o += '<div class="card mt2" style="border-color:var(--ok)">'+
      '<div class="row" style="gap:9px"><span style="color:var(--ok)">'+ic('check','w-4 h-4')+'</span>'+
      '<p class="sm" style="flex:1;line-height:1.7">Cả '+soat.man+' bước đều trỏ tới màn có thật. '+
      'Bảng luồng đang khớp với ứng dụng.</p></div></div>';

  /* ══ A · TÁM LUỒNG ══ */
  o += U.sec('TÁM LUỒNG VẬN HÀNH',
    'Cột "không xong thì làm gì" quan trọng ngang cột "xong khi" — quy trình chỉ mô tả đường thuận là quy trình chưa dùng được');

  L.forEach(function(l){
    o += '<div class="card mt2" style="border-left:3px solid '+l.c+'">'+
      '<div class="row" style="gap:11px;align-items:baseline;flex-wrap:wrap">'+
        '<span style="color:'+l.c+'">'+ic(l.ic,'w-4 h-4')+'</span>'+
        '<b class="mono" style="color:'+l.c+'">'+h(l.ma)+'</b>'+
        '<b style="flex:1;min-width:200px;font-size:16px">'+h(l.ten)+'</b>'+
        '<span class="chip">'+h(l.buoc.length)+' bước</span></div>'+
      '<p class="sm mt" style="line-height:1.75">'+h(l.y)+'</p>'+
      '<p class="tiny muted mt"><b>Ai chạy luồng này:</b> '+h(l.ai)+'</p>'+
      '<div class="mt2">'+
      U.tbl(['#','Ai','Mở màn','Làm gì','Xong khi','Không xong thì'],
        l.buoc.map(function(b, i){
          var co = bd[b.man];
          return ['<b class="mono" style="color:'+l.c+'">'+(i+1)+'</b>',
                  '<span class="sm">'+h(b.ai)+'</span>',
                  co ? '<a href="#" data-v="'+h(b.man)+'"><b class="sm">'+h(co.it.t)+'</b></a>'+
                       '<div class="tiny mono muted">'+h(b.man)+'</div>'
                     : '<b class="sm" style="color:var(--gita-do-ink)">'+h(b.man)+' — KHÔNG CÓ MÀN NÀY</b>',
                  '<span class="sm">'+h(b.lam)+'</span>',
                  '<span class="sm" style="color:var(--ok)">'+h(b.xong)+'</span>',
                  '<span class="sm" style="color:var(--gita-do-ink)">'+h(b.neu)+'</span>'];
        }))+'</div></div>';
  });

  /* ══ B · TOÀN BỘ MÀN, ĐẾM TỪ ỨNG DỤNG ══ */
  o += U.sec('TOÀN BỘ MÀN HÌNH — ĐẾM TỪ ỨNG DỤNG ĐANG CHẠY',
    tongMan + ' màn trong ' + NAV.length + ' nhóm. Cột "vai thấp nhất" đọc từ bảng quyền thật, không chép tay.');

  NAV.forEach(function(g){
    o += '<div class="card mt2">'+
      '<div class="row" style="gap:10px;align-items:baseline;flex-wrap:wrap">'+
        '<b style="font-size:15px">'+h(g.t || g.id)+'</b>'+
        '<span class="chip">'+((g.items || []).length)+' màn</span></div>'+
      '<div class="mt">'+
      U.tbl(['Màn','Làm gì','Quyền','Vai thấp nhất mở được','Trong luồng'],
        (g.items || []).map(function(i){
          var l = trongLuong[i.v];
          return ['<a href="#" data-v="'+h(i.v)+'"><b class="sm">'+h(i.t)+'</b></a>'+
                  '<div class="tiny mono muted">'+h(i.v)+'</div>',
                  '<span class="sm">'+h(i.h || '')+'</span>',
                  i.perm ? '<span class="tiny mono">'+h(i.perm)+'</span>'
                         : '<span class="tiny muted">mở cho mọi vai</span>',
                  '<span class="tiny">'+h(vaiThapNhat(i.perm))+'</span>',
                  l ? '<span class="tiny mono" style="color:var(--gita)">'+h(l.join(' '))+'</span>'
                    : '<span class="tiny muted">—</span>'];
        }))+'</div></div>';
  });

  /* ══ C · QUYỀN RIÊNG CỦA CẤP QUẢN TRỊ ══ */
  o += U.sec('QUYỀN CHỈ SUPER ADMIN VÀ ADMIN HỆ THỐNG CÓ',
    'Viết ra để biết mình đang cầm gì — và biết mất tài khoản này thì mất những gì');
  o += '<div class="card">'+ (G.QT_RIENG || []).map(function(x, i){
    return '<div class="row'+(i ? ' mt2' : '')+'" style="gap:11px;align-items:flex-start">'+
      '<span style="color:var(--gita);font-weight:700;flex:none">'+(i+1)+'</span>'+
      '<div style="flex:1"><b class="sm">'+h(x.t)+'</b>'+
      '<p class="sm muted mt" style="line-height:1.7">'+h(x.y)+'</p></div></div>';
  }).join('') +'</div>';

  /* ══ TẦNG HIỂN THỊ ══ */
  o += U.sec('CHÍN TẦNG HIỂN THỊ','Mỗi màn thuộc đúng một tầng — đây là cách phạm vi được chia');
  o += U.tbl(['Tầng','Ai thấy','Điều kiện quyền','Số màn'],
    TH.map(function(t){
      var n = 0;
      NAV.forEach(function(g){ (g.items || []).forEach(function(i){ if(i.capMo === t.id) n++; }); });
      return ['<b class="sm mono">'+h(t.id)+'</b><div class="tiny muted">'+h(t.t)+'</div>',
              '<span class="sm">'+h(t.mo)+'</span>',
              t.perm ? '<span class="tiny mono">'+h(t.perm)+'</span>'
                     : '<span class="tiny muted">không điều kiện</span>',
              '<b class="mono">'+n+'</b>'];
    }));

  /* ══ LUẬT ══ */
  o += U.sec('BỐN LUẬT KHI ĐỌC BẢNG NÀY','');
  o += '<div class="card">'+ (G.QT_LUAT || []).map(function(x, i){
    return '<div style="'+(i ? 'border-top:1px solid var(--line);padding-top:13px;margin-top:13px' : '')+'">'+
      '<b class="sm">'+h(x.t)+'</b>'+
      '<p class="sm muted mt" style="line-height:1.7">'+h(x.y)+'</p></div>';
  }).join('') +'</div>';

  return o;
};

})();

})();

/* ═════════ src/kiem-theo-vai.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v8.2 — KIỂM THỬ THEO VAI

   Chủ hệ thống cần ngồi một chỗ và kiểm được: vai nào nhìn thấy gì.

   Trước màn này việc ấy phải làm bằng tay — đăng xuất, đăng nhập vai
   khác, đi hết trình đơn, ghi ra giấy, rồi lặp lại mười chín lần. Không
   ai làm nổi, nên trên thực tế không ai kiểm.

   Màn này tính sẵn cả ma trận và cho đổi vai bằng một cú bấm.

   MỌI CON SỐ Ở ĐÂY ĐƯỢC TÍNH TỪ G.NAV VÀ G.vaiCo LÚC CHẠY. Không bảng
   nào khai tay. Thêm một màn hay đổi một quyền là ma trận đổi theo ngay
   — bảng phân quyền lệch khỏi ứng dụng là kiểu hỏng không ai phát hiện
   cho tới lúc một vai nhìn thấy thứ đáng lẽ không được nhìn.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function(){
var U = G.U, h = U.h, ic = U.ic;
G.VIEWS = G.VIEWS || {};

function moiMan(){
  var ds = [];
  (G.NAV || []).forEach(function(g){
    (g.items || []).forEach(function(i){ ds.push({ it:i, nhom:g }); });
  });
  return ds;
}

/* Vai này thấy màn kia không — đúng phép mà ứng dụng dùng để dựng trình đơn */
G.vaiThayMan = function(vai, it){
  return !it.perm || G.vaiCo(vai, it.perm);
};

/* Đếm cho mọi vai. Trả về số thật, kể cả khi số ấy khó nhìn. */
G.demTheoVai = function(){
  var man = moiMan(), tong = man.length;
  return (G.ROLES || []).map(function(v){
    var thay = man.filter(function(m){ return G.vaiThayMan(v.id, m.it); });
    return { vai:v, thay:thay.length, tong:tong,
             pt: tong ? Math.round(thay.length * 100 / tong) : 0,
             khoa: man.length - thay.length };
  });
};

/* Hai vai khác nhau ở đúng những màn nào */
G.soSanhVai = function(a, b){
  var man = moiMan(), chiA = [], chiB = [], caHai = 0;
  man.forEach(function(m){
    var x = G.vaiThayMan(a, m.it), y = G.vaiThayMan(b, m.it);
    if(x && y) caHai++;
    else if(x) chiA.push(m.it);
    else if(y) chiB.push(m.it);
  });
  return { chiA:chiA, chiB:chiB, caHai:caHai, tong:man.length };
};

/* Tài khoản mẫu của một vai — gồm cả bốn chuyên gia phản biện */
function tkCuaVai(id){
  var a = (G.ACCOUNTS || []).filter(function(x){ return x.role === id; })[0];
  return a || null;
}

G.VIEWS['kiem-theo-vai'] = function(){
  if(!G.can('qt_trang')) return U.lockCard(
    'Màn kiểm thử theo vai cho thấy toàn bộ ma trận màn × vai và mật khẩu của mọi tài khoản mẫu. '+
    'Chỉ mở cho Super Admin và Admin hệ thống.');

  var dem = G.demTheoVai(), man = moiMan(), toi = G.S.roleObj;
  var NAV = G.NAV || [];

  var o = U.ph({eyebrow:'QUẢN TRỊ TRANG', ic:'users', grad:1,
    t:'Kiểm thử theo vai',
    lead:'Mười chín tài khoản, một cú bấm là vào vai ấy. Ma trận bên dưới tính từ '+
         'chính bảng quyền đang chạy — không bảng nào khai tay, nên thêm một màn hay '+
         'đổi một quyền là ma trận đổi theo ngay.'});

  o += '<div class="card mt2" style="border-left:3px solid var(--gita)">'+
    '<div class="row" style="gap:9px;align-items:baseline;flex-wrap:wrap">'+
      '<span class="tiny up muted">ĐANG Ở VAI</span>'+
      U.chip(toi.short + ' · LV' + toi.lv, toi.c)+
      '<span class="sm" style="flex:1;min-width:200px">'+h(toi.ln || '')+'</span></div>'+
    '<p class="sm muted mt">Bấm <b>Vào vai này</b> ở bảng dưới là đổi ngay, không phải đăng xuất. '+
    'Quay lại Super Admin cũng bằng đúng cách ấy.</p></div>';

  /* ── A · MƯỜI LĂM VAI, MỘT CÚ BẤM ── */
  o += U.sec('MƯỜI LĂM VAI — TÀI KHOẢN, MẬT KHẨU, SỐ MÀN THẤY ĐƯỢC',
    'Cột "khoá" là số màn vai ấy KHÔNG thấy. Đây là con số đáng nhìn hơn con số thấy được.');

  o += U.tbl(['Vai','Tài khoản mẫu','Thấy được','Khoá','Phủ','Vào vai'],
    dem.map(function(d){
      var a = tkCuaVai(d.vai.id);
      var dang = d.vai.id === toi.id;
      return ['<b class="sm" style="color:'+d.vai.c+'">'+h(d.vai.short)+'</b>'+
                '<div class="tiny mono muted">'+h(d.vai.id)+' · LV'+d.vai.lv+'</div>',
              a ? '<span class="tiny mono">'+h(a.u)+'</span>'+
                  '<div class="tiny mono muted">'+h(a.p)+'</div>'
                : '<span class="tiny muted">chưa có tài khoản mẫu</span>',
              '<b class="mono">'+d.thay+'</b><span class="tiny muted">/'+d.tong+'</span>',
              '<span class="mono" style="color:'+(d.khoa ? 'var(--gita-do-ink)' : 'var(--ok)')+'">'+d.khoa+'</span>',
              '<div style="min-width:90px">'+U.bar(d.pt, d.vai.c)+
                '<div class="tiny mono muted mt">'+d.pt+'%</div></div>',
              dang ? '<span class="chip" style="color:var(--ok);border-color:var(--ok)">đang ở đây</span>'
                   : (a ? '<button class="btn ghost sm" data-switch="'+h(d.vai.id)+'">Vào vai này</button>'
                        : '<span class="tiny muted">—</span>')];
    }));

  /* ── B · BỐN CHUYÊN GIA PHẢN BIỆN ── */
  if((G.AUDITORS || []).length){
    o += U.sec('BỐN CHUYÊN GIA PHẢN BIỆN','Bốn tài khoản riêng để soi hệ thống từ góc khó tính nhất');
    o += U.tbl(['Người','Vai mượn','Tài khoản','Vào vai'],
      G.AUDITORS.map(function(a){
        var v = G.roleById(a.role) || {};
        return ['<b class="sm">'+h(a.ten)+'</b>',
                '<span class="tiny mono">'+h(a.role)+' · '+h(v.short || '')+'</span>',
                '<span class="tiny mono">'+h(a.u)+'</span><div class="tiny mono muted">'+h(a.p)+'</div>',
                '<button class="btn ghost sm" data-login="'+h(a.u)+'">Vào vai này</button>'];
      }));
  }

  /* ── C · MA TRẬN MÀN × VAI ── */
  o += U.sec('MA TRẬN MÀN × VAI',
    man.length + ' màn × ' + dem.length + ' vai. Ô đặc là thấy, ô rỗng là khoá. '+
    'Cột bên phải là số vai thấy được màn ấy — màn chỉ một vai thấy là màn nhạy nhất.');

  /* Chú giải mã cột. Bảng mười bảy cột không đủ chỗ cho tên vai, nên cột
     mang số và tên nằm ở đây. Bảng tự cuộn ngang trong khung của nó —
     thân trang không bao giờ cuộn ngang. */
  o += '<div class="card"><div class="tiny up muted mb">MÃ CỘT</div>'+
    '<div class="row wrap" style="gap:8px">'+ dem.map(function(d){
      return '<span class="chip" style="color:'+d.vai.c+';border-color:'+d.vai.c+'55">'+
             '<b class="mono">'+h(d.vai.id.replace('R',''))+'</b> '+h(d.vai.short)+'</span>';
    }).join('') +'</div></div>';

  NAV.forEach(function(g){
    o += '<div class="card mt2">'+
      '<div class="row" style="gap:10px;align-items:baseline;flex-wrap:wrap">'+
        '<b style="font-size:15px">'+h(g.t || g.id)+'</b>'+
        '<span class="chip">'+((g.items || []).length)+' màn</span></div>'+
      '<div class="mt">'+
      /* Tiêu đề cột là CHỮ THUẦN. U.tbl bọc tiêu đề bằng U.h nên thẻ HTML
         đưa vào đây sẽ hiện ra nguyên mã — đã vấp đúng lỗi ấy một lần.
         Màu và tên đầy đủ của vai nằm ở dải chú giải ngay trên bảng. */
      U.tbl(['Màn'].concat(dem.map(function(d){ return d.vai.id.replace('R',''); }))
              .concat(['Số vai']),
        (g.items || []).map(function(i){
          var n = 0;
          var o1 = dem.map(function(d){
            var thay = G.vaiThayMan(d.vai.id, i);
            if(thay) n++;
            return thay ? '<span style="color:'+d.vai.c+'">●</span>'
                        : '<span style="color:var(--ink-4)">○</span>';
          });
          return ['<b class="sm">'+h(i.t)+'</b>'+
                    '<div class="tiny mono muted">'+h(i.v)+
                    (i.perm ? ' · ' + h(i.perm) : '')+'</div>']
                 .concat(o1)
                 .concat(['<b class="mono" style="color:'+
                    (n === 1 ? 'var(--gita-do-ink)' : (n === dem.length ? 'var(--ok)' : 'var(--ink-2)'))+
                    '">'+n+'</b>']);
        }))+'</div></div>';
  });

  /* ── D · MÀN NHẠY NHẤT ── */
  var hep = man.map(function(m){
    var n = dem.filter(function(d){ return G.vaiThayMan(d.vai.id, m.it); }).length;
    return { it:m.it, n:n };
  }).filter(function(x){ return x.n <= 2; }).sort(function(a,b){ return a.n - b.n; });

  o += U.sec('MÀN HẸP NHẤT — TỪ HAI VAI TRỞ XUỐNG',
    hep.length + ' màn. Đây là chỗ một lần nới quyền nhầm sẽ tốn nhất, nên nó được liệt riêng.');
  o += U.tbl(['Màn','Quyền','Số vai thấy','Những vai nào'],
    hep.map(function(x){
      var ai = dem.filter(function(d){ return G.vaiThayMan(d.vai.id, x.it); })
                  .map(function(d){ return d.vai.short; });
      return ['<b class="sm">'+h(x.it.t)+'</b><div class="tiny mono muted">'+h(x.it.v)+'</div>',
              '<span class="tiny mono">'+h(x.it.perm || '—')+'</span>',
              '<b class="mono" style="color:var(--gita-do-ink)">'+x.n+'</b>',
              '<span class="sm">'+h(ai.join(' · '))+'</span>'];
    }));

  /* ── E · SO SÁNH HAI VAI ── */
  var A = 'R01', B = G.S.ssVai || 'R13';
  var ss = G.soSanhVai(A, B);
  var vB = G.roleById(B) || {};
  o += U.sec('SO SÁNH SUPER ADMIN VỚI MỘT VAI KHÁC',
    'Chọn vai để xem chính xác Super Admin thấy thêm những màn nào');
  o += '<div class="card"><div class="row wrap mb" style="gap:7px">'+
    dem.filter(function(d){ return d.vai.id !== 'R01'; }).map(function(d){
      return '<button class="chip'+(d.vai.id === B ? ' on' : '')+'" data-ssvai="'+h(d.vai.id)+'"'+
             (d.vai.id === B ? ' style="color:'+d.vai.c+';border-color:'+d.vai.c+'"' : '')+'>'+
             h(d.vai.short)+'</button>';
    }).join('')+'</div>'+
    '<div class="grid g4 mb">'+
      U.stat({k:'CẢ HAI CÙNG THẤY', v:ss.caHai, d:'màn chung', c:'#0B7350'})+
      U.stat({k:'CHỈ SUPER ADMIN', v:ss.chiA.length, d:'màn ' + h(vB.short || B) + ' không thấy', c:'#BE0E16'})+
      U.stat({k:'CHỈ ' + h((vB.short || B).toUpperCase()), v:ss.chiB.length, d:'màn Super Admin không thấy', c:'#B45309'})+
      U.stat({k:'TỔNG MÀN', v:ss.tong, d:'toàn hệ', c:'#2A72C6'})+
    '</div>'+
    (ss.chiB.length
      ? '<div class="card" style="border-color:var(--gita-do)"><b class="sm" style="color:var(--gita-do-ink)">'+
        'CÓ MÀN SUPER ADMIN KHÔNG THẤY</b><p class="sm mt">'+
        h(ss.chiB.map(function(i){ return i.t; }).join(' · '))+
        '</p><p class="sm muted mt">Super Admin phải thấy được mọi màn. Đây là lỗi phân quyền, không phải thiết kế.</p></div>'
      : '<p class="sm" style="color:var(--ok)">Không màn nào Super Admin không thấy — đúng như phải thế.</p>')+
    '<div class="mt2"><div class="tiny up muted mb">'+ss.chiA.length+' MÀN CHỈ SUPER ADMIN THẤY, '+
      h(vB.short || B)+' THÌ KHÔNG</div>'+
      '<div class="row wrap" style="gap:6px">'+
      ss.chiA.map(function(i){ return U.chip(i.t); }).join('')+'</div></div>'+
    '</div>';

  return o;
};

/* Chọn vai để so sánh — không đổi vai đang dùng, chỉ đổi bảng so sánh */
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-ssvai]');
  if(!b) return;
  e.preventDefault();
  G.S.ssVai = b.getAttribute('data-ssvai');
  if(G.save) G.save();
  if(G.render) G.render();
});

})();

})();

/* ═════════ src/soat-day-du.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÀN TỰ SOÁT: CHỦ HỆ THỐNG TỰ KIỂM 100%

   Trước tệp này, muốn biết kho có chỗ nào rỗng thì phải chạy
   tools/ra-soat-day-du.js ở dòng lệnh — nghĩa là chủ Học viện phải
   TIN LỜI người viết mã. Màn này bỏ chỗ phải tin đó đi: Super Admin
   và Admin hệ thống bấm một nút, hệ thống tự đếm lại từ dữ liệu đang
   nạp trong máy, và hiện ra từng con số.

   Năm phép soát, chạy ngay trong trình duyệt:
     1. Con số công bố — kho nói có bao nhiêu thì phải đếm ra đúng
     2. Bản ghi thiếu trường — theo hợp đồng ở G.SOAT_BAT_BUOC
     3. Chất lượng nội dung — câu cụt, câu chép lại, chữ tạm
     4. Màn hình — dựng thử mọi màn, bắt màn lỗi và màn rỗng ruột
     5. Ngoại lệ có chủ đích — liệt kê đủ, kèm lý do từng cái

   Vì sao phần 5 quan trọng ngang bốn phần trên: một chỗ trống có lý
   do và một chỗ trống bị bỏ quên nhìn giống hệt nhau trong dữ liệu.
   Liệt kê ra thì chủ hệ thống tự phán được cái nào chấp nhận được.

   Màn này KHÔNG sửa gì. Nó chỉ đếm và trình bày.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};
(function(){
var U = G.U, h = U.h, ic = U.ic;

/* ─── Trường coi là trống ─── */
function trong(x){
  if(x === undefined || x === null) return true;
  if(typeof x === 'string' && !x.trim()) return true;
  if(Array.isArray(x) && !x.length) return true;
  return false;
}
function daTha(kho, truong){
  var o = kho + '.' + truong;
  for(var i=0;i<(G.SOAT_THA||[]).length;i++) if(G.SOAT_THA[i].o === o) return G.SOAT_THA[i];
  return null;
}

/* ═══════════ PHÉP SOÁT 1 · CON SỐ CÔNG BỐ ═══════════ */
G.soatConSo = function(){
  return (G.SOAT_MOC || []).map(function(m){
    var v = G[m.k];
    var co = Array.isArray(v) ? v.length : (v && typeof v === 'object' ? Object.keys(v).length : 0);
    return { k:m.k, ten:m.ten, can:m.so, co:co, dat:co === m.so, nap:v !== undefined };
  });
};

/* ═══════════ PHÉP SOÁT 2 · BẢN GHI THIẾU TRƯỜNG ═══════════ */
G.soatTruong = function(){
  var ra = [];
  Object.keys(G.SOAT_BAT_BUOC || {}).forEach(function(k){
    var hd = G.SOAT_BAT_BUOC[k], v = G[k];
    if(!Array.isArray(v)) { ra.push({kho:k, y:hd.y, chuaNap:true}); return; }
    var thieu = [];
    hd.truong.forEach(function(f){
      if(daTha(k, f)) return;
      var so = v.filter(function(r){ return !r || typeof r !== 'object' || trong(r[f]); }).length;
      if(so) thieu.push({ truong:f, so:so, tong:v.length });
    });
    ra.push({ kho:k, y:hd.y, tong:v.length, thieu:thieu, dat:!thieu.length });
  });
  /* Kho ngoài hợp đồng vẫn soát bằng luật chung: trường có ở ≥90% bản ghi */
  var them = [];
  Object.keys(G).forEach(function(k){
    if(!/^[A-Z][A-Z0-9_]*$/.test(k)) return;
    if(G.SOAT_BAT_BUOC && G.SOAT_BAT_BUOC[k]) return;
    var v = G[k];
    if(!Array.isArray(v) || v.length < 3 || typeof v[0] !== 'object' || v[0] === null) return;
    var dem = {};
    v.forEach(function(r){ r && typeof r === 'object' &&
      Object.keys(r).forEach(function(f){ dem[f] = (dem[f]||0) + 1; }); });
    var thieu = [];
    Object.keys(dem).filter(function(f){ return dem[f] >= v.length * 0.9; }).forEach(function(f){
      if(daTha(k, f)) return;
      var so = v.filter(function(r){ return !r || trong(r[f]); }).length;
      if(so) thieu.push({ truong:f, so:so, tong:v.length });
    });
    if(thieu.length) them.push({ kho:k, tong:v.length, thieu:thieu, dat:false, chung:true });
  });
  return { hopDong:ra, luatChung:them };
};

/* ═══════════ PHÉP SOÁT 3 · CHẤT LƯỢNG NỘI DUNG ═══════════ */
G.soatChatLuong = function(){
  var K = G.KICHBAN || [];
  var cut = K.filter(function(k){
    return String(k.mo||'').length < 40 || String(k.chot||'').length < 60 || String(k.muc||'').length < 40;
  });
  function lap(truong){
    var d = {}; K.forEach(function(k){ if(k[truong]) d[k[truong]] = (d[k[truong]]||0) + 1; });
    return Object.keys(d).filter(function(x){ return d[x] > 1; }).length;
  }
  /* Chữ tạm: soi GIÁ TRỊ TRỌN VẸN của từng trường, không quét chuỗi con
     trong cả kho. Quét chuỗi con báo nhầm rất nặng — "em vẫn đang cập nhật
     nó" là một phương án trả lời thật trong bộ test, "Nhà mình sắp có đợt
     bận dài" là một câu hỏi sát hạch thật, và "F-xxx" là mẫu mã gia đình.
     Cả ba đều là nội dung đúng. Chỗ trống thật là chỗ mà TOÀN BỘ giá trị
     của trường chỉ có mỗi chữ tạm. */
  /* KHÔNG bắt dấu ba chấm, dấu gạch hay dấu hỏi đứng một mình: trong tài
     liệu gốc của Học viện đó là cách đánh dấu ô ĐỂ ĐIỀN TAY — "Họ và tên: …",
     "Điểm đạt được: …" trong phiếu đánh giá in ra. Ô ấy trống là đúng chủ
     đích, người dùng viết vào. Chỉ bắt chữ tạm của người viết mã. */
  var TAM = /^\s*(TODO|FIXME|TBD|XXX|lorem ipsum.*|coming soon|placeholder|đang cập nhật|sắp cập nhật|chưa có nội dung|chưa cập nhật|undefined|null|NaN)\s*[.!]?\s*$/i;
  var coTam = [];
  function soi(k, x, sau){
    if(sau > 6) return false;
    if(typeof x === 'string') return TAM.test(x);
    if(Array.isArray(x)) return x.some(function(y){ return soi(k, y, sau+1); });
    if(x && typeof x === 'object')
      return Object.keys(x).some(function(f){ return soi(k, x[f], sau+1); });
    return false;
  }
  Object.keys(G).forEach(function(k){
    if(!/^[A-Z][A-Z0-9_]*$/.test(k)) return;
    try { if(soi(k, G[k], 0)) coTam.push(k); } catch(e){ /* kho quá sâu — bỏ qua */ }
  });
  var en = G.ITEM_EN || {}, man = [];
  (G.NAV||[]).forEach(function(g){ (g.items||[]).forEach(function(i){ man.push(i.v); }); });
  var thieuEN = man.filter(function(v){ return !en[v]; });
  return {
    tongKichBan: K.length,
    cut: cut.length, viDuCut: G.dsHet(cut,3).map(function(k){ return k.ma; }),
    moLap: lap('mo'), chotLap: lap('chot'),
    coTam: coTam, tongMuc: man.length, thieuEN: thieuEN
  };
};

/* ═══════════ PHÉP SOÁT 4 · DỰNG THỬ MỌI MÀN ═══════════ */
/* Màn nào gọi lại G.soatTatCa() trong lúc dựng thì phải nằm ở đây. */
var TU_GOI = ['soat-day-du', 'tu-van-hanh'];
G.TU_GOI_SOAT = TU_GOI;

G.soatManHinh = function(){
  var KHOA = '<div class="card center" style="padding:40px">';
  var CHAN = /kho nghề|cấp phép|chưa mở được|chưa có|Đăng nhập lại|chưa thao tác được|dành cho/i;
  var man = [];
  (G.NAV||[]).forEach(function(g){ (g.items||[]).forEach(function(i){
    /* BỎ MỌI MÀN TỰ GỌI LẠI BỘ SOÁT. Không bỏ thì soat-day-du dựng thử
       soat-day-du, mà lần dựng ấy lại dựng thử soat-day-du — đệ quy vô
       tận, trình duyệt treo. Lỗi này đã làm bộ kiểm phát hành đứng im ở
       mục 2, và tái diễn ở v8.4 khi màn tu-van-hanh gọi G.soatTatCa()
       trong lúc dựng.

       Danh sách này phải mở rộng mỗi lần có màn mới gọi bộ soát. Màn tự
       soát không tự soát chính nó được; phần kiểm chúng nằm ở mục 34 của
       tools/kiem-tra.js, chạy từ bên ngoài. */
    if(TU_GOI.indexOf(i.v) < 0) man.push(i.v);
  }); });
  var loi = [], rong = [], khoa = 0, ok = 0;
  man.forEach(function(v){
    var html;
    try { html = G.VIEWS[v] ? G.VIEWS[v]() : null; }
    catch(e){ loi.push(v + ' — ' + e.message); return; }
    if(typeof html !== 'string'){ loi.push(v + ' — không trả về chuỗi'); return; }
    var t = html.trim();
    if(t.indexOf(KHOA) === 0){ khoa++; return; }
    if(t.length < 700 && !CHAN.test(t)){ rong.push(v + ' (' + t.length + ' ký tự)'); return; }
    ok++;
  });
  return { tong:man.length, ok:ok, khoa:khoa, loi:loi, rong:rong };
};

/* ═══════════ CHẠY CẢ NĂM PHÉP ═══════════
   Có bộ nhớ đệm: năm phép soát dựng thử hơn một trăm màn nên tốn thật.
   Dựng lại màn vì lý do khác — đổi ngôn ngữ, bấm một nút, quay lại từ màn
   khác — không được chạy lại cả bộ. Nút "Soát lại ngay" xoá đệm rồi dựng. */
var dem = null;
G.soatXoaDem = function(){ dem = null; };
/* Đã có kết quả trong bộ đệm chưa. Màn khác hỏi trước khi đọc, để không
   vô tình ép bộ soát chạy giữa lúc chính nó đang dựng màn. */
G.soatCoSan = function(){ return dem != null; };
G.soatTatCa = function(batBuocLai){
  if(dem && !batBuocLai) return dem;
  dem = soatThat();
  return dem;
};
function soatThat(){
  var cs = G.soatConSo(), tr = G.soatTruong(), cl = G.soatChatLuong(), mh = G.soatManHinh();
  var hong = 0;
  cs.forEach(function(x){ if(!x.dat) hong++; });
  tr.hopDong.forEach(function(x){ if(!x.dat) hong++; });
  hong += tr.luatChung.length;
  if(cl.cut) hong++;
  if(cl.moLap || cl.chotLap) hong++;
  if(cl.coTam.length) hong++;
  if(cl.thieuEN.length) hong++;
  hong += mh.loi.length + mh.rong.length;
  return { conSo:cs, truong:tr, chatLuong:cl, manHinh:mh, hong:hong, luc:new Date() };
};

/* ═══════════════ MÀN HÌNH ═══════════════ */
G.VIEWS['soat-day-du'] = function(){
  /* Chỉ Super Admin và Admin hệ thống. Đây là màn soi vào ruột hệ
     thống — nó hiện cả tên biến và số bản ghi của mọi kho. */
  if(!G.can('qt_trang')) return U.lockCard();
  if(!G.SOAT_MOC) return U.empty('Chưa nạp được chuẩn soát','Phần này nằm trong gói nền. Đăng nhập lại để nạp.');

  var r = G.soatTatCa();
  var xanh = r.hong === 0;

  var o = U.ph({eyebrow:'QUẢN TRỊ · TỰ KIỂM', ic:'shield', grad:1,
    t:'Soát đủ ruột — anh tự kiểm, không phải tin ai',
    lead:'Năm phép soát chạy ngay lúc anh mở màn này, đếm lại từ dữ liệu đang nạp trong máy. Không có con số nào viết sẵn. Bấm nút dưới cùng để chạy lại bất cứ lúc nào.'});

  /* Kết luận đặt lên đầu — người bận chỉ đọc dòng này */
  o += '<div class="card mb" style="border-color:'+(xanh?'rgba(16,185,129,.45)':'rgba(239,68,68,.45)')+
    ';background:'+(xanh?'rgba(16,185,129,.07)':'rgba(239,68,68,.07)')+'">'+
    '<div class="row" style="gap:11px;align-items:center">'+
    '<span style="color:'+(xanh?'var(--ok)':'var(--bad)')+'">'+ic(xanh?'check':'bell','w-6 h-6')+'</span>'+
    '<div><b style="font-size:18px;color:'+(xanh?'var(--ok)':'var(--bad)')+'">'+
    (xanh ? 'KHÔNG CÒN CHỖ NÀO ĐỂ TRỐNG' : 'CÒN ' + r.hong + ' CHỖ PHẢI XEM')+'</b>'+
    '<div class="tiny muted mt">Soát lúc '+h(r.luc.toLocaleString('vi-VN'))+
    ' · '+r.conSo.length+' con số công bố · '+r.truong.hopDong.length+' kho theo hợp đồng · '+
    r.manHinh.tong+' màn hình</div></div></div></div>';

  /* ── 1 · Con số công bố ── */
  o += U.sec('1 · CON SỐ CÔNG BỐ CÓ ĐẾM RA ĐÚNG KHÔNG',
    'Kho nào nói mình có bao nhiêu thì phải đếm ra đúng chừng ấy. Đây là chỗ bắt kiểu hỏng nguy hiểm nhất: con số trong lời giới thiệu đi một đằng, dữ liệu thật đi một nẻo.');
  o += U.tbl(['Kho','Phải có','Đếm được','Kết quả'], r.conSo.map(function(x){
    return [
      '<b class="sm">'+h(x.ten)+'</b><div class="tiny muted mono">'+h(x.k)+'</div>',
      '<span class="mono">'+x.can.toLocaleString('vi-VN')+'</span>',
      '<span class="mono" style="color:'+(x.dat?'var(--ok)':'var(--bad)')+';font-weight:700">'+
        (x.nap ? x.co.toLocaleString('vi-VN') : 'chưa nạp')+'</span>',
      x.dat ? '<span style="color:var(--ok)">'+ic('check','w-4 h-4')+'</span>'
            : '<span style="color:var(--bad)">'+ic('x','w-4 h-4')+' lệch '+Math.abs(x.co-x.can)+'</span>'
    ];
  }));

  /* ── 2 · Bản ghi thiếu trường ── */
  o += U.sec('2 · BẢN GHI CÓ ĐỦ TRƯỜNG KHÔNG',
    'Mỗi kho có một bản hợp đồng: nói mình có trường nào thì mọi bản ghi phải có đủ trường đó. Cột cuối ghi vì sao trường ấy không được trống.');
  o += r.truong.hopDong.map(function(x){
    var mau = x.dat ? '#0B7350' : '#EF4444';
    return '<div class="card pad-sm mb" style="border-color:'+mau+'2e">'+
      '<div class="row wrap" style="gap:8px;align-items:center">'+
      '<span style="color:'+mau+'">'+ic(x.dat?'check':'x','w-4 h-4')+'</span>'+
      '<b class="sm mono">'+h(x.kho)+'</b>'+
      (x.chuaNap ? '<span class="tiny" style="color:var(--alert)">chưa nạp — cần cấp phép gói chứa kho này</span>'
        : '<span class="tiny muted">'+x.tong.toLocaleString('vi-VN')+' bản ghi · '+
          (x.dat ? 'đủ trường' : x.thieu.length + ' trường còn trống')+'</span>')+
      '</div>'+
      (x.thieu && x.thieu.length
        ? '<div class="mt tiny" style="color:var(--bad)">'+x.thieu.map(function(t){
            return h(t.truong)+' — '+t.so+'/'+t.tong+' bản ghi trống'; }).join(' · ')+'</div>' : '')+
      '<p class="tiny muted mt" style="line-height:1.6">'+h(x.y||'')+'</p></div>';
  }).join('');

  if(r.truong.luatChung.length){
    o += '<div class="card mb" style="border-color:rgba(251,146,60,.4)">'+
      '<div class="tiny up mb" style="color:var(--alert)">KHO NGOÀI HỢP ĐỒNG CÓ TRƯỜNG TRỐNG</div>'+
      '<p class="tiny muted mb">Những kho này chưa có bản hợp đồng riêng nên soát bằng luật chung: trường nào có mặt ở từ 90% bản ghi trở lên thì coi là bắt buộc. Xem lại — hoặc thêm vào G.SOAT_BAT_BUOC, hoặc thêm lý do vào G.SOAT_THA.</p>'+
      r.truong.luatChung.map(function(x){
        return '<div class="tiny" style="padding:5px 0;border-top:1px solid var(--line)">'+
          '<b class="mono">'+h(x.kho)+'</b> — '+x.thieu.map(function(t){
            return h(t.truong)+' '+t.so+'/'+t.tong; }).join(' · ')+'</div>';
      }).join('')+'</div>';
  } else {
    o += '<div class="card mb" style="border-color:rgba(16,185,129,.35)">'+
      '<p class="tiny">'+ic('check','w-3 h-3')+' Không kho nào ngoài hợp đồng có trường bỏ trống — soát bằng luật chung trên toàn bộ dữ liệu đang nạp.</p></div>';
  }

  /* ── 3 · Chất lượng nội dung ── */
  var c = r.chatLuong;
  o += U.sec('3 · ĐỦ TRƯỜNG RỒI, RUỘT CÓ THẬT KHÔNG',
    'Đủ trường chưa phải là đủ ruột. Bốn phép dưới đây bắt kiểu lấp cho có.');
  o += '<div class="grid g2 mb">'+ [
    ['CL1','Không câu nào cụt', c.cut === 0,
      c.cut ? c.cut + ' bản: ' + c.viDuCut.join(' ') : c.tongKichBan.toLocaleString('vi-VN')+' kịch bản đều đủ dài'],
    ['CL2','Không câu nào bị chép lại', (c.moLap + c.chotLap) === 0,
      (c.moLap + c.chotLap) ? c.moLap+' câu mở · '+c.chotLap+' câu chốt bị lặp'
        : 'nghìn bản là nghìn tình huống thật'],
    ['CL3','Không còn chữ tạm', c.coTam.length === 0,
      /* Không viết thẳng mấy chữ tạm ra màn hình. Đây là màn duy nhất nói
         VỀ chữ tạm, nên nếu in nguyên chữ ra thì bộ rà soát chỗ trống lại
         bắt chính màn này — và cách chữa dễ dãi là tha cho nó một ngoại lệ.
         Tha một lần là mở đường tha lần sau, nên đổi câu chữ thay vì đổi
         luật. Chữ tạm cụ thể vẫn hiện đủ ở nhánh trái khi thật sự bắt được. */
      c.coTam.length ? c.coTam.join(' ') : 'không kho nào lấp chỗ trống bằng chữ đánh dấu để quay lại sau'],
    ['CL4','Đủ bản tiếng Anh', c.thieuEN.length === 0,
      c.thieuEN.length ? c.thieuEN.length+'/'+c.tongMuc+' thiếu: '+c.thieuEN.slice(0,5).join(' ')
        : c.tongMuc+'/'+c.tongMuc+' mục điều hướng']
  ].map(function(x){
    var m = x[2] ? '#0B7350' : '#EF4444';
    var ct = (G.SOAT_CHATLUONG||[]).filter(function(y){ return y.ma === x[0]; })[0];
    return '<div class="card pad-sm" style="border-color:'+m+'2e">'+
      '<div class="row" style="gap:8px;align-items:center;margin-bottom:6px">'+
      '<span style="color:'+m+'">'+ic(x[2]?'check':'x','w-4 h-4')+'</span>'+
      U.chip(x[0], m)+'<b class="sm">'+h(x[1])+'</b></div>'+
      '<p class="tiny" style="color:'+(x[2]?'var(--ink-2)':'var(--bad)')+'">'+h(x[3])+'</p>'+
      (ct ? '<p class="tiny muted mt" style="line-height:1.6">'+h(ct.y)+'</p>' : '')+
      '</div>';
  }).join('') +'</div>';

  /* ── 4 · Dựng thử mọi màn ── */
  var m = r.manHinh;
  o += U.sec('4 · DỰNG THỬ MỌI MÀN HÌNH',
    'Chạy thật từng màn với đúng quyền của tài khoản đang đăng nhập, bắt màn văng lỗi và màn chỉ có khung mà không có ruột.');
  o += '<div class="grid g4 mb">'+
    U.stat({k:'Dựng ra nội dung', v:String(m.ok), d:'trên tổng '+m.tong+' màn', c:'#0B7350'})+
    U.stat({k:'Khoá đúng quyền',  v:String(m.khoa), d:'chặn có chủ đích', c:'#64748B'})+
    U.stat({k:'Văng lỗi',         v:String(m.loi.length), d:m.loi.length?'phải sửa':'không có', c:m.loi.length?'#EF4444':'#0B7350'})+
    U.stat({k:'Rỗng ruột',        v:String(m.rong.length), d:m.rong.length?'phải lấp':'không có', c:m.rong.length?'#EF4444':'#0B7350'})+
    '</div>';
  if(m.loi.length)
    o += '<div class="card mb" style="border-color:rgba(239,68,68,.4)"><div class="tiny up mb" style="color:var(--bad)">MÀN VĂNG LỖI</div>'+
      U.list(m.loi,'#EF4444')+'</div>';
  if(m.rong.length)
    o += '<div class="card mb" style="border-color:rgba(251,146,60,.4)"><div class="tiny up mb" style="color:var(--alert)">MÀN RỖNG RUỘT</div>'+
      U.list(m.rong,'#FB923C')+'</div>';

  /* ── 5 · Ngoại lệ có chủ đích ── */
  o += U.sec('5 · CHỖ TRỐNG CÓ CHỦ ĐÍCH — '+(G.SOAT_THA||[]).length+' Ô',
    'Một chỗ trống có lý do và một chỗ trống bị bỏ quên nhìn giống hệt nhau trong dữ liệu. Liệt kê đủ ra đây để anh tự phán cái nào chấp nhận được. Ngoại lệ không có lý do thì không được nằm trong bảng này.');
  o += U.tbl(['Ô để trống','Vì sao để trống'], (G.SOAT_THA||[]).map(function(x){
    return ['<b class="sm mono">'+h(x.o)+'</b>', '<span class="tiny">'+h(x.y)+'</span>'];
  }));

  /* ── Nút chạy lại ── */
  o += '<div class="card mt2 center" style="border-color:var(--gita-vien-1)">'+
    '<p class="sm dim mb" style="line-height:1.7">Màn này không sửa gì cả — nó chỉ đếm và trình bày. '+
    'Muốn soát sâu hơn nữa, ngoài trình duyệt, chạy <span class="mono">node tools/ra-soat-day-du.js</span> '+
    'trên máy: bộ đó dựng thử mọi màn cho <b>cả mười lăm vai</b>, còn màn này dựng theo quyền của tài khoản đang đăng nhập.</p>'+
    '<button class="btn pri" data-act="soat-lai">'+ic('pulse','w-4 h-4')+' Soát lại ngay</button></div>';
  return o;
};

/* Chạy lại = dựng lại màn, vì mọi con số đều tính lúc dựng */
document.addEventListener('click', function(e){
  var el = e.target.closest && e.target.closest('[data-act="soat-lai"]');
  if(el){
    e.preventDefault();
    if(G.soatXoaDem) G.soatXoaDem();      /* xoá đệm thì lần dựng sau mới đếm lại thật */
    if(G.render) G.render();
    if(G.U) G.U.toast('Đã soát lại toàn bộ kho.','ok');
  }
});
})();

})();

/* ═════════ src/cai-tien.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÁY CHẠY LUỒNG CẢI TIẾN

   Kho chuẩn ở kho-goc/data.cai-tien.js (CT_TRANG · CT_LOAI · CT_DIEM ·
   CT_LUAT). Tệp này là phần CHẠY: gửi, gán người trả lời, đẩy trạng thái
   theo đồng hồ, nhận hoặc từ chối, và chấm điểm.

   Vì sao phần chạy phải ở src/: tools/ma-hoa-kho.js đóng gói bằng
   JSON.stringify, và JSON.stringify bỏ hàm.

   Sổ đề xuất nằm ở G.S.caiTien, lưu xuống máy cùng sổ việc và dọn khi
   đổi người đăng nhập — đề xuất mang tên người nói và chuyện trong nhà,
   không được ở lại máy cho người sau.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h, ic = U.ic;
  var NGAY = 86400000;

  G.CT_HAN_NGAY = 14;
  G.CT_LYDO_TOITHIEU = 30;

  function so() {
    if (!G.S.caiTien || typeof G.S.caiTien !== 'object') G.S.caiTien = {};
    return G.S.caiTien;
  }
  G.ctSo = so;

  function loaiCua(ma) {
    var ds = G.CT_LOAI || [];
    for (var i = 0; i < ds.length; i++) if (ds[i].ma === ma) return ds[i];
    return null;
  }
  G.ctLoai = loaiCua;

  /* ─── Trạng thái TÍNH RA, không lưu ───
     Lưu trạng thái thì phải có ai đó chạy đồng hồ để đẩy sang QUÁ HẠN.
     Tính ra thì không cần đồng hồ nào cả, và không bao giờ lệch. Cùng
     luật với bảng công việc. */
  G.ctTrangThai = function (d, luc) {
    var t = luc || Date.now();
    if (d.xongLuc) return d.ketQua === 'nhan' ? 'nhan' : 'khong';
    if (t > d.guiLuc + G.CT_HAN_NGAY * NGAY) return 'tre';
    return d.doLuc ? 'dang' : 'moi';
  };

  /* ─── Gửi một đề xuất ───
     Người trả lời được gán NGAY lúc gửi, theo loại. Không có đề xuất nào
     rơi vào khoảng không chờ ai đó nhặt lên. */
  G.CT_NOIDUNG_TOITHIEU = 40;
  G.ctGui = function (maLoai, noiDung) {
    var l = loaiCua(maLoai);
    if (!l) return { ok: false, loi: 'Chưa chọn loại đề xuất.' };
    var nd = String(noiDung || '').trim();
    if (nd.length < G.CT_NOIDUNG_TOITHIEU)
      return { ok: false, loi: 'Cần ít nhất ' + G.CT_NOIDUNG_TOITHIEU +
        ' ký tự: chỗ nào đang vướng, và anh chị nghĩ nên làm khác thế nào.' };
    var luc = Date.now();
    var id = maLoai + '|' + luc;
    so()[id] = { id: id, loai: maLoai, noiDung: nd,
      nguoiGui: (G.S.roleObj && G.S.roleObj.id) || '',
      nguoiTraLoi: l.vai, guiLuc: luc, doLuc: 0, xongLuc: 0,
      ketQua: '', lyDo: '', ngayAp: '', daDoi: '',
      lichSu: [{ luc: luc, vai: (G.S.roleObj && G.S.roleObj.id) || '', viec: 'Gửi đề xuất · chuyển tới ' + l.vai }] };
    if (G.save) G.save();
    return { ok: true, de: so()[id] };
  };

  G.ctMoRa = function (id) {
    var d = so()[id];
    if (!d || d.xongLuc || d.doLuc) return false;
    d.doLuc = Date.now();
    d.lichSu.push({ luc: d.doLuc, vai: d.nguoiTraLoi, viec: 'Đã mở ra đọc' });
    if (G.save) G.save();
    return true;
  };

  /* ─── Nhận ───
     Bắt buộc có ngày áp. Nhận mà không đặt ngày là từ chối lịch sự. */
  G.ctNhan = function (id, ngayAp) {
    var d = so()[id];
    if (!d) return { ok: false, loi: 'Không tìm thấy đề xuất.' };
    if (d.xongLuc) return { ok: false, loi: 'Đề xuất này đã đóng.' };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(ngayAp || '')))
      return { ok: false, loi: 'Phải đặt NGÀY ÁP. Nhận mà không có ngày là từ chối lịch sự, và đắt hơn từ chối thẳng vì người ta còn chờ.' };
    d.xongLuc = Date.now(); d.ketQua = 'nhan'; d.ngayAp = ngayAp;
    d.lichSu.push({ luc: d.xongLuc, vai: d.nguoiTraLoi, viec: 'Nhận · áp ngày ' + ngayAp });
    if (G.save) G.save();
    return { ok: true, de: d };
  };

  /* ─── Không nhận ───
     Bắt buộc có lý do viết ra. "Chưa phù hợp" không phải một lý do. */
  G.ctKhongNhan = function (id, lyDo) {
    var d = so()[id];
    if (!d) return { ok: false, loi: 'Không tìm thấy đề xuất.' };
    if (d.xongLuc) return { ok: false, loi: 'Đề xuất này đã đóng.' };
    var ld = String(lyDo || '').trim();
    if (ld.length < G.CT_LYDO_TOITHIEU)
      return { ok: false, loi: 'Cần lý do ít nhất ' + G.CT_LYDO_TOITHIEU +
        ' ký tự. Từ chối là chuyện bình thường; từ chối không lý do mới là hỏng.' };
    d.xongLuc = Date.now(); d.ketQua = 'khong'; d.lyDo = ld;
    d.lichSu.push({ luc: d.xongLuc, vai: d.nguoiTraLoi, viec: 'Không nhận · đã ghi lý do' });
    if (G.save) G.save();
    return { ok: true, de: d };
  };

  /* ─── Ghi lại đã đổi gì sau khi áp ─── */
  G.ctDaAp = function (id, daDoi) {
    var d = so()[id];
    if (!d || d.ketQua !== 'nhan') return { ok: false, loi: 'Chỉ ghi được cho đề xuất đã nhận.' };
    var dd = String(daDoi || '').trim();
    if (dd.length < G.CT_LYDO_TOITHIEU)
      return { ok: false, loi: 'Ghi rõ đã đổi cái gì, ít nhất ' + G.CT_LYDO_TOITHIEU + ' ký tự.' };
    d.daDoi = dd;
    d.lichSu.push({ luc: Date.now(), vai: d.nguoiTraLoi, viec: 'Đã áp · ghi lại thay đổi' });
    if (G.save) G.save();
    return { ok: true, de: d };
  };

  /* ─── Điểm của một người ───
     Điểm cho việc NÓI RA. Xem G.CT_DIEM và luật số 5. */
  G.ctDiemCua = function (vai) {
    var v = vai || (G.S.roleObj && G.S.roleObj.id);
    var D = G.CT_DIEM || { gui: 0, nhan: 0, ap: 0 };
    var s = so(), d = 0, n = 0;
    Object.keys(s).forEach(function (k) {
      var x = s[k];
      if (x.nguoiGui !== v) return;
      n++; d += D.gui;
      if (x.ketQua === 'nhan') d += D.nhan;
      if (x.daDoi) d += D.ap;
    });
    return { diem: d, so: n };
  };

  G.ctTheoTrang = function () {
    var s = so(), bo = { moi: [], dang: [], tre: [], nhan: [], khong: [] };
    Object.keys(s).forEach(function (k) { bo[G.ctTrangThai(s[k])].push(s[k]); });
    return bo;
  };

  /* Đề xuất đang chờ CHÍNH vai này trả lời */
  G.ctChoToi = function () {
    var v = (G.S.roleObj && G.S.roleObj.id) || '';
    var s = so(), ra = [];
    Object.keys(s).forEach(function (k) {
      if (s[k].nguoiTraLoi === v && !s[k].xongLuc) ra.push(s[k]);
    });
    return ra;
  };

  /* ═══════════ MÀN ═══════════ */
  G.VIEWS['cai-tien'] = function () {
    if (!G.CT_LOAI)
      return U.empty('Chưa mở được luồng cải tiến',
        'Phần này nằm trong gói nghề. Đăng nhập bằng tài khoản có phạm vi ấy để mở.');

    var bo = G.ctTheoTrang();
    var diem = G.ctDiemCua();
    var cho = G.ctChoToi();

    var o = U.ph({ eyebrow: 'CẢI TIẾN TỪ NGƯỜI LÀM', ic: 'lightning', grad: 1,
      t: 'Chỗ nào đang vướng thì nói ra ở đây',
      lead: 'Người làm trực tiếp nhìn thấy chỗ vướng sớm hơn mọi bảng báo cáo. ' +
        'Mọi đề xuất đều có người phải trả lời trong ' + G.CT_HAN_NGAY + ' ngày — ' +
        'im lặng không phải câu trả lời, và một hộp thư góp ý không ai trả lời còn tệ hơn không có hộp nào.' });

    if (cho.length) {
      o += '<div class="card mb" style="border-color:#BE0E1626">' +
        '<b class="sm" style="color:#BE0E16">' + cho.length + ' đề xuất đang chờ chính anh chị trả lời</b>' +
        '<p class="sm dim mt" style="line-height:1.8">Vai của anh chị là người nhận của những loại này. ' +
        'Trả lời được cả hai đường — nhận kèm ngày áp, hoặc không nhận kèm lý do.</p></div>';
    }

    /* Bốn cột, TRỄ đứng trước */
    var cot = [['tre', bo.tre], ['moi', bo.moi], ['dang', bo.dang],
               ['nhan', bo.nhan], ['khong', bo.khong]];
    o += '<div class="grid g2 mb">' + cot.map(function (c) {
      var t = (G.CT_TRANG || []).filter(function (x) { return x.ma === c[0]; })[0] || {};
      return '<div class="card" style="border-color:' + (t.c || '#888') + '26">' +
        '<div class="row wrap" style="gap:8px;align-items:baseline;margin-bottom:6px">' +
        '<b class="sm" style="color:' + t.c + '">' + h(t.ten || c[0]) + '</b>' +
        '<b style="margin-left:auto;font-size:20px;color:' + t.c + '">' + c[1].length + '</b></div>' +
        '<p class="tiny dim" style="line-height:1.7">' + h(t.y || '') + '</p>' +
        (c[1].length ? '<div class="mt">' + c[1].slice(0, 3).map(function (d) {
          var l = loaiCua(d.loai) || {};
          return '<div class="tiny" style="padding:5px 0;border-top:1px solid var(--gita-vien-2)">' +
            '<b>' + h(l.ten || d.loai) + '</b> · ' + h(d.noiDung.slice(0, 70)) +
            (d.noiDung.length > 70 ? '…' : '') +
            '<div class="muted">gửi bởi ' + h(d.nguoiGui) + ' · chờ ' + h(d.nguoiTraLoi) +
            (d.lyDo ? ' · lý do: ' + h(d.lyDo.slice(0, 50)) : '') +
            (d.ngayAp ? ' · áp ngày ' + h(d.ngayAp) : '') + '</div></div>';
        }).join('') + '</div>' : '') + '</div>';
    }).join('') + '</div>';

    o += U.sec('Năm loại đề xuất', 'Chia loại để biết đường gửi tới ai. Gửi nhầm tay là đề xuất chết ngay ở bước đầu.');
    o += U.tbl(['Loại', 'Ai trả lời', 'Ví dụ'],
      (G.CT_LOAI || []).map(function (l) { return [h(l.ten), h(l.vai), h(l.vd)]; }));

    o += '<div class="card mb mt"><b class="sm">Điểm của anh chị</b>' +
      '<p class="sm dim mt" style="line-height:1.8">' + diem.so + ' đề xuất đã gửi · ' +
      diem.diem + ' điểm. ' + h((G.CT_DIEM || {}).y || '') + '</p>' +
      '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h((G.CT_DIEM || {}).vi || '') + '</p></div>';

    o += U.sec('Sáu luật của luồng này', 'Viết ra để sau này không ai nới.');
    o += '<div class="card">' + (G.CT_LUAT || []).map(function (l) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + l.no + '. ' + h(l.t) + '</b>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(l.y) + '</p></div>';
    }).join('') + '</div>';
    return o;
  };
})();

})();

/* ═════════ src/luat-lam-viec.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v8.7 — SOI VI PHẠM LUẬT LÀM VIỆC

   Luật nằm ở kho-goc/data.luat-lam-viec.js. Tệp này làm hai việc:

     1. Soi văn bản trước khi nó tới gia đình — số điện thoại cá nhân,
        email, tài khoản Zalo, lời rủ ra ngoài hệ thống.
     2. Dựng màn hình để đội ngũ đọc luật, và để Admin xem các lượt đã soi.

   Một điều cố ý: máy CẢNH BÁO và GHI LẠI, máy không kết luận. Một số điện
   thoại trong đoạn chat có thể là số của bệnh viện, của trường, của chính
   Học viện. Kết luận vi phạm là việc của Hội đồng chuyên môn sau khi nghe
   người liên quan trình bày — đúng như quy trình bốn bước trong luật.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function(){
var U = G.U, h = U.h, ic = U.ic;
G.VIEWS = G.VIEWS || {};

var KHO = 'gita365_soi_luat';
G.SOI_LUAT = G.SOI_LUAT || [];

function nap(){
  try{ var v = JSON.parse(localStorage.getItem(KHO) || '[]'); if(Array.isArray(v)) G.SOI_LUAT = v; }catch(e){}
}
function ghi(){
  try{ localStorage.setItem(KHO, JSON.stringify(G.SOI_LUAT.slice(-300))); }catch(e){}
  if(G.danhDauCaiDat) G.danhDauCaiDat('soiluat');
}
nap();

/* ═══════════ SOI MỘT ĐOẠN VĂN BẢN ═══════════ */
G.soiLuat = function(van, boiCanh){
  var L = G.LUAT_LAMVIEC;
  if(!L || !van) return {sach:true, thay:[]};

  var t = String(van);
  /* Bỏ những thứ của chính Học viện ra trước khi soi — nếu không thì số
     hotline in trên mọi tài liệu sẽ bị bắt mỗi lần. */
  (L.ngoaiLe || []).forEach(function(x){
    t = t.split(x).join(' ');
  });

  var thay = [];
  (L.dauHieu || []).forEach(function(d){
    var re;
    try{ re = new RegExp(d.re, 'gi'); }catch(e){ return; }
    var m = t.match(re);
    if(m && m.length) thay.push({ma:d.ma, ten:d.ten, vd:m.slice(0,2).join(' · ')});
  });

  if(thay.length){
    var r = G.S && G.S.roleObj;
    G.SOI_LUAT.push({
      luc: new Date().toISOString(),
      u: (G.S.acc && G.S.acc.u) || '', vai: (r && r.n) || '',
      boiCanh: String(boiCanh || ''),
      thay: thay.map(function(x){ return x.ten; }),
      trich: t.replace(/\s+/g,' ').slice(0, 160),
      xem: false
    });
    ghi();
    if(G.secLog) G.secLog('Dấu hiệu vi phạm luật làm việc',
      thay.map(function(x){ return x.ten; }).join(' · ') + ' · ' + (boiCanh||''), 'Cảnh báo');
  }
  return {sach: !thay.length, thay: thay};
};

/* Ai phải bị soi: đội ngũ trực tiếp làm việc với gia đình */
G.phaiSoiLuat = function(){
  var r = G.S && G.S.roleObj;
  return !!(r && r.lv >= 5 && r.lv <= 11);
};

/* ═══════════════════════════════════════════════════════════════
   MÀN HÌNH · LUẬT LÀM VIỆC VỚI GIA ĐÌNH
   ═══════════════════════════════════════════════════════════════ */
G.VIEWS['luat-lam-viec'] = function(){
  var L = G.LUAT_LAMVIEC;
  var o = U.ph({eyebrow:'LUẬT ' + (L ? L.ma : 'LV-01'), ic:'shield', grad:1,
    t:'Làm việc với gia đình phải đi qua hệ thống',
    lead:'Luật này không cấm quan tâm. Nó chỉ đòi việc quan tâm để lại dấu vết ở chỗ cả hai bên đều tra được.'});
  if(!L) return o + '<div class="card"><p class="sm dim">Luật nằm trong kho nghề — đăng nhập bằng vai được cấp phép.</p></div>';

  o += '<div class="card mt2" style="border-color:var(--gita-do)">'+
    '<div class="row" style="gap:10px;align-items:center;flex-wrap:wrap">'+
      ic('bell','w-5 h-5')+
      '<b style="font-size:16px;color:var(--gita-do-ink)">Vi phạm: '+h(L.chetai.muc)+'</b></div>'+
    '<p class="sm dim mt">Áp dụng với: '+h(L.apDung.join(' · '))+'</p></div>';

  o += U.sec('VÌ SAO CHẶT ĐẾN THẾ','Ba lý do thật, không phải để kiểm soát người làm');
  o += '<div class="row wrap" style="gap:12px">'+
    [['Gia đình mất chỗ bấu víu',
      'Trao đổi qua Zalo riêng thì khi người ấy nghỉ việc, chuyển nhóm hay đơn giản là bận, cả lịch sử chăm sóc biến mất theo. Nhà mình phải kể lại từ đầu với người mới.'],
     ['Không ai bảo vệ được ai',
      'Có chuyện xảy ra — một lời khuyên sai, một hiểu lầm về tiền — thì không có bản ghi nào để đối chiếu. Người làm đúng cũng không chứng minh được mình đúng.'],
     ['Trẻ vị thành niên',
      'Một người lớn nhắn tin riêng với một em nhỏ, không qua hệ thống, không ai thấy. Đó là chỗ Học viện không được phép để xảy ra, dù người lớn ấy có ý tốt đến đâu.']]
    .map(function(x){
      return '<div class="card" style="flex:1;min-width:250px;border-left:3px solid var(--gita-do)">'+
        '<b class="sm" style="color:var(--gita-do-ink)">'+h(x[0])+'</b>'+
        '<p class="sm dim mt" style="line-height:1.65">'+h(x[1])+'</p></div>';
    }).join('')+'</div>';

  o += U.sec('NĂM ĐIỀU KHÔNG ĐƯỢC LÀM','Không có ngoại lệ ở điều thứ năm');
  o += U.tbl(['Điều','Rõ hơn'], L.cam.map(function(c){
    return ['<b class="sm"><span class="mono" style="color:var(--gita-do)">'+h(c.ma)+'</span> '+h(c.t)+'</b>',
            '<span class="sm">'+h(c.ro)+'</span>'];
  }));

  o += U.sec('BỐN ĐIỀU VẪN LÀM BÌNH THƯỜNG','Luật không làm khó việc chăm sóc');
  o += '<div class="card">'+U.list(L.duoc, 'var(--ok)')+'</div>';

  o += U.sec('CHẾ TÀI VÀ QUY TRÌNH','Máy cảnh báo, người quyết định');
  o += '<div class="row wrap" style="gap:12px">'+
    '<div class="card" style="flex:1;min-width:250px;border-color:var(--gita-do)">'+
      '<div class="tiny up mb" style="color:var(--gita-do-ink)">MỨC</div>'+
      '<b class="sm">'+h(L.chetai.muc)+'</b>'+U.list(L.chetai.them, 'var(--gita-do)')+'</div>'+
    '<div class="card" style="flex:1;min-width:250px">'+
      '<div class="tiny up mb">QUY TRÌNH BỐN BƯỚC</div>'+
      U.list(L.chetai.quyTrinh)+
      '<p class="tiny muted mt">Hội đồng chuyên môn quyết định — không phải máy quyết định.</p></div>'+
  '</div>';

  o += U.sec('ĐIỀU KHOẢN ĐƯA VÀO HỢP ĐỒNG','Chép nguyên văn vào phụ lục hợp đồng lao động và hợp đồng cộng tác');
  o += '<div class="card cho-chep" style="border-color:var(--gita-vien-1)">'+
    '<p class="sm" style="line-height:1.9;text-align:justify">'+h(L.dieuKhoanHopDong)+'</p>'+
    '<p class="tiny muted mt">Hiệu lực: '+h(L.hieuLuc)+'</p></div>';

  /* Nhật ký soi — chỉ R01–R02 */
  if(G.can('qt_trang')){
    var ds = G.SOI_LUAT.slice().reverse();
    o += U.sec('CÁC LƯỢT MÁY ĐÃ SOI THẤY', ds.length ? ds.length + ' lượt' : 'Chưa có lượt nào');
    if(!ds.length){
      o += G.khungTrongGon('Nhật ký soi luật',
        'Khi một người trong đội ngũ soạn nội dung gửi cho gia đình mà có số điện thoại cá nhân, '+
        'email, tài khoản Zalo hoặc lời rủ ra ngoài hệ thống, lượt ấy sẽ hiện ở đây kèm trích đoạn.',
        {t:'Đọc lại năm điều cấm', v:'luat-lam-viec'});
    } else {
      o += U.tbl(['Lúc','Ai','Thấy gì','Trích'], G.dsHet(ds,25).map(function(x){
        return ['<span class="tiny">'+h(new Date(x.luc).toLocaleString('vi-VN'))+'</span>',
          '<span class="mono sm">'+h(x.u)+'</span><div class="tiny muted">'+h(x.vai)+'</div>',
          '<span class="tiny" style="color:var(--gita-do-ink)">'+h(x.thay.join(' · '))+'</span>',
          '<span class="tiny muted">'+h(x.trich)+'</span>'];
      }));
      o += '<p class="tiny muted mt">Một số điện thoại trong đoạn chat có thể là số bệnh viện, số trường, '+
        'hoặc số của chính Học viện. Nghe người liên quan trình bày trước khi kết luận.</p>';
    }
  }
  return o;
};

})();

})();

/* ═════════ src/nam-dau.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÁY CHẠY SỔ TAY NĂM ĐẦU

   Kho chuẩn ở kho-goc/data.nam-dau.js. Hàm quan trọng nhất ở đây là
   ndSoiTyLe() — và nó tồn tại vì một chỗ vênh số.

   CHỖ VÊNH, VÀ CÁCH TÔI XỬ

   Bản gốc Phần VII viết "một Đồng Hành : tối đa mười gia đình". Trần
   đã ép trong hệ từ bản 9.14 là NĂM, và trần ấy có hàm từ chối thật.
   Hai con số không thể cùng đúng.

   Tôi giữ trần và sửa kế hoạch: một trăm nhà cần HAI MƯƠI người kèm,
   không phải mười. Sửa trần cho vừa kế hoạch thì dễ hơn, và đó chính
   là cách mọi cái trần trên đời chết — không ai xoá nó, người ta chỉ
   nới nó một lần vì có lý do chính đáng.

   ndSoiTyLe() đọc trần từ DD_CAP chứ không đọc con số viết tay, nên
   hôm nào ai đó đổi trần mà quên đổi kế hoạch thì bộ kiểm đỏ ngay.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h;

  /* ─── Kế hoạch năm đầu có khớp trần đã ép không ───
     Đọc trần từ kho ép, KHÔNG đọc con số viết tay trong kế hoạch. */
  G.ndSoiTyLe = function () {
    var q = G.ND_QUYMO;
    if (!q || !G.ddTranCua) return [];
    var tran = G.ddTranCua('DH');
    if (!tran) return [];                    /* chưa nạp kho ép thì không kết luận */
    var can = Math.ceil(q.nhaToiDa / tran);
    var loi = [];
    if (q.donghanhCan !== can)
      loi.push('kế hoạch ' + q.donghanhCan + ' người, trần ' + tran + ' nhà đòi ' + can);
    /* Tổng số nhà nhận qua 12 tháng phải bằng đúng quy mô đã chốt */
    var tong = (G.ND_THANG || []).reduce(function (a, t) { return a + (t.nhan || 0); }, 0);
    if (tong !== q.nhaToiDa) loi.push('12 tháng nhận ' + tong + ', quy mô chốt ' + q.nhaToiDa);
    return loi;
  };

  G.ndCanBaoNhieuNguoi = function (soNha) {
    var tran = G.ddTranCua ? G.ddTranCua('DH') : 0;
    if (!tran) return null;
    return Math.ceil((Number(soNha) || 0) / tran);
  };

  /* ─── Mốc kiểm của ngày thứ N ───
     Trả về mốc gần nhất đã tới. Ngày chưa tới mốc nào thì trả null —
     không được trả mốc đầu tiên cho lấy lệ. */
  G.ndMocCua = function (ngay) {
    var n = Number(ngay) || 0, ra = null;
    (G.ND_MOC || []).forEach(function (m) { if (n >= m.ngay) ra = m; });
    return ra;
  };

  G.ndThangCua = function (thang) {
    var ds = G.ND_THANG || [];
    for (var i = 0; i < ds.length; i++) if (ds[i].thang === thang) return ds[i];
    return null;
  };

  /* ─── Tuần quá tải thì bỏ hoạt động nào ───
     Trả về danh sách theo ĐÚNG thứ tự được phép bỏ. `bo: 0` không bao
     giờ vào danh sách. Thứ tự viết sẵn để lúc bận không phải quyết —
     lúc bận mà còn phải quyết bỏ gì thì bao giờ cũng bỏ nhầm. */
  G.ndThuTuBo = function () {
    return (G.ND_TUAN || []).filter(function (x) { return x.bo > 0; })
      .slice().sort(function (a, b) { return a.bo - b.bo; });
  };

  G.ndKhongDuocBo = function () {
    return (G.ND_TUAN || []).filter(function (x) { return !x.bo; });
  };

  /* ─── Kịch bản sự cố nào cũng đủ ba cột chưa ───
     Thiếu `cam` là kịch bản chỉ dạy làm gì mà không dạy KHÔNG làm gì —
     và trong khủng hoảng, cột "không làm gì" mới là cột cứu người. */
  G.ndSoiSuCo = function () {
    return (G.ND_SUCO || []).filter(function (s) {
      return !s.biet || !(s.lam || []).length || !s.cam || !s.hoc;
    }).map(function (s) { return s.ma; });
  };

  /* ═══════════ MÀN: SỔ TAY NĂM ĐẦU ═══════════ */
  G.VIEWS['nam-dau'] = function () {
    if (!G.ND_THANG)
      return U.empty('Chưa mở được sổ tay năm đầu',
        'Đây là sổ vận hành nội bộ, nằm trong gói nghề.');

    var q = G.ND_QUYMO, lech = G.ndSoiTyLe();
    var o = U.ph({ eyebrow: 'SỔ TAY NĂM ĐẦU', ic: 'compass', grad: 1,
      t: 'Ba trăm sáu mươi lăm ngày có ngày tháng',
      lead: 'Sẽ có một sáng thứ Hai ai đó đứng lên hỏi: vậy tuần sau mình làm gì đầu tiên? ' +
        'Câu ấy không có câu trả lời thì cả đề án thành thứ nguy hiểm nhất — một điều hay ho được nói rồi cất vào ngăn kéo.' });

    /* ── Quy mô: chỗ con số phải khớp trần ── */
    o += '<div class="card mb" style="border-color:' + (lech.length ? '#BE0E16' : '#0B7350') + '3e">' +
      '<div class="row wrap" style="gap:16px;align-items:baseline">' +
      '<b>' + q.nhaToiDa + ' nhà</b><b>' + q.donghanhCan + ' người đi cùng</b>' +
      '<span class="tiny muted">trần ' + (G.ddTranCua ? G.ddTranCua('DH') : '?') + ' nhà mỗi người</span>' +
      '<span class="tiny" style="margin-left:auto;color:' + (lech.length ? '#BE0E16' : '#0B7350') + '">' +
      (lech.length ? 'LỆCH: ' + h(lech.join(' · ')) : 'khớp trần') + '</span></div>' +
      '<p class="sm mt" style="line-height:1.8">' + h(q.vi) + '</p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(q.luat) + '</p></div>';

    o += U.sec('Ba nguyên tắc năm đầu', '');
    o += '<div class="card mb">' + (G.ND_LUAT || []).map(function (l) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + l.no + '. ' + h(l.t) + '</b>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(l.y) + '</p></div>';
    }).join('') + '</div>';

    o += U.sec('Ngày 0 — tám điều kiện mở cửa',
      'Thiếu một điều thì mở cửa muộn một tháng còn hơn mở sớm một ngày.');
    o += U.tbl(['#', 'Điều kiện', 'Vì sao'],
      (G.ND_NGAY0 || []).map(function (x) { return [String(x.so), h(x.t), h(x.y)]; }));

    o += U.sec('Mười hai tháng', 'Cột "cấm" là cột hay bị bỏ qua nhất, và là cột giữ tháng ấy đúng nhịp.');
    o += (G.ND_THANG || []).map(function (t) {
      return '<div class="card mb" style="border-color:' + t.c + '2e">' +
        '<div class="row wrap" style="gap:10px;align-items:baseline">' +
        '<span class="tiny up" style="color:' + t.c + '">THÁNG ' + t.thang + ' · ' + h(t.ten) + '</span>' +
        (t.nhan ? '<span class="tiny muted">nhận ' + t.nhan + ' nhà</span>' : '') +
        (t.le ? '<span class="tiny" style="color:#B4720F">' + h(t.le) + '</span>' : '') +
        (t.moc && t.moc.length ? '<span class="tiny muted" style="margin-left:auto">mốc ngày ' + t.moc.join(', ') + '</span>' : '') +
        '</div>' +
        (t.bat && t.bat.length ? '<p class="tiny mt" style="line-height:1.7"><b>Bật:</b> ' + h(t.bat.join(' · ')) + '</p>' : '') +
        '<p class="sm mt" style="line-height:1.8">' + h(t.cot) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>Cấm:</b> ' + h(t.cam) + '</p></div>';
    }).join('');

    o += U.sec('Nhịp tuần của đội vận hành', ((G.ND_TUAN_LUAT || {}).luat || ''));
    o += U.tbl(['Thứ', 'Việc', 'Phút', 'Bỏ được không', 'Vì sao'],
      (G.ND_TUAN || []).map(function (x) {
        return [x.thu === 8 ? 'CN' : 'Thứ ' + x.thu, h(x.ten), x.phut ? String(x.phut) : '—',
          x.bo ? 'thứ ' + x.bo : 'KHÔNG BAO GIỜ', h(x.vi)];
      }));
    o += '<p class="tiny dim mb" style="line-height:1.7">' + h((G.ND_TUAN_LUAT || {}).vi || '') + '</p>';

    o += U.sec('Sáu mốc kiểm', ((G.ND_MOC_LUAT || {}).vi || ''));
    o += (G.ND_MOC || []).map(function (m) {
      return '<div class="card mb" style="border-color:' + m.c + '2e">' +
        '<span class="tiny up" style="color:' + m.c + '">NGÀY ' + m.ngay + ' · ' + h(m.ten) + '</span>' +
        '<div class="mt">' + (m.hoi || []).map(function (c) {
          return '<div class="sm" style="padding:4px 0;line-height:1.7">· ' + h(c) + '</div>';
        }).join('') + '</div>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(m.y) + '</p></div>';
    }).join('');

    o += U.sec('Tám kịch bản lần đầu',
      'Viết TRƯỚC khi xảy ra. Lần đầu xử thế nào thì rừng sẽ xử thế đó mãi — người ta không nhớ luật đã học, người ta nhớ hình ảnh đã thấy.');
    o += (G.ND_SUCO || []).map(function (s) {
      return '<div class="card mb" style="border-color:' + s.c + '2e">' +
        '<div class="row wrap" style="gap:10px;align-items:baseline">' +
        '<span class="tiny up" style="color:' + s.c + '">' + h(s.ma) + '</span><b>' + h(s.ten) + '</b></div>' +
        '<p class="sm mt" style="line-height:1.8"><b>Nhận biết:</b> ' + h(s.biet) + '</p>' +
        '<div class="mt">' + (s.lam || []).map(function (b, i) {
          return '<div class="sm" style="padding:4px 0;line-height:1.7">' + (i + 1) + '. ' + h(b) + '</div>';
        }).join('') + '</div>' +
        '<p class="sm mt" style="line-height:1.8;color:#BE0E16"><b>Cấm:</b> ' + h(s.cam) + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7"><b>Bài học ghi sẵn:</b> ' + h(s.hoc) + '</p></div>';
    }).join('');

    o += U.sec('Sáu điều cấm tuyệt đối năm đầu', 'Vì năm đầu định hình chín mươi chín năm còn lại.');
    o += '<div class="card">' + (G.ND_CAM || []).map(function (c) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + c.no + '. ' + h(c.t) + '</b>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(c.y) + '</p></div>';
    }).join('') + '</div>';
    return o;
  };
})();

})();

/* ═════════ src/dao-tao-dh.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÁY CHẠY GIÁO TRÌNH BỐN MƯƠI GIỜ

   Kho chuẩn ở kho-goc/data.dao-tao.js. Hai hàm làm việc thật:

   1. dtSoiGio() — mười hai buổi cộng bài thi phải đúng bốn mươi giờ.
      Giáo trình trôi giờ không bao giờ trôi ở buổi đầu; nó trôi ở buổi
      cuối, mà buổi cuối là buổi đạo đức khó. Cắt ngầm buổi ấy là cắt
      đúng thứ không cắt được.

   2. dtSoiNgonTu() — quét cột `dat` bằng CHÍNH máy quét của lời hỏi
      hằng ngày. Cột `truot` chứa cố ý câu sai và không bị quét — cùng
      bẫy với DD_TINHHUONG.sai và HM_NGONTU.thayBang. Ba chỗ, một máy.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h;

  G.dtTongGioLop = function () {
    return (G.DT_BUOI || []).reduce(function (a, b) { return a + (b.gio || 0); }, 0);
  };

  /* ─── Bốn mươi giờ có còn là bốn mươi giờ không ───
     Cộng cả giờ lớp và giờ thi. Con số bốn mươi nằm ở DD_CAP — đọc từ
     đó chứ không viết lại, để hai chỗ không rời nhau. */
  G.dtSoiGio = function () {
    var lop = G.dtTongGioLop();
    var thi = (G.DT_THI || {}).gio || 0;
    var can = 0;
    (G.DD_CAP || []).forEach(function (c) { if (c.ma === 'DH') can = c.gioDaoTao; });
    if (!can) return [];                    /* chưa nạp kho ép thì không kết luận */
    var loi = [];
    if (lop + thi !== can) loi.push('lớp ' + lop + ' + thi ' + thi + ' ≠ ' + can);
    if ((G.DT_BUOI || []).length !== 12) loi.push('số buổi=' + (G.DT_BUOI || []).length);
    return loi;
  };

  /* ─── Hai mươi ca thi vai, bốn nhóm năm ca ─── */
  G.dtSoiVai = function () {
    var ds = G.DT_VAI || [], loi = [];
    if (ds.length !== 20) loi.push('số ca=' + ds.length);
    ['A', 'B', 'C', 'D'].forEach(function (n) {
      var so = ds.filter(function (x) { return x.nhom === n; }).length;
      if (so !== 5) loi.push('nhóm ' + n + '=' + so);
    });
    ds.forEach(function (x) {
      if (!x.bay || !x.dat || !x.truot || String(x.dat).trim() === String(x.truot).trim())
        loi.push(x.ma);
    });
    return loi;
  };

  /* ─── Những câu THẬT SỰ nói với gia đình trong giáo trình ───
     Chỉ cột `dat`. Cột `truot` là ví dụ để đối chiếu — quét nó vào thì
     phép kiểm đỏ vĩnh viễn, và rồi ai đó sẽ tắt phép kiểm. */
  G.dtLoiNoiVoiNha = function () {
    return (G.DT_VAI || []).map(function (x) { return ['DT_VAI.' + x.ma, x.dat]; });
  };

  G.dtSoiNgonTu = function () {
    return G.hmQuetTuCam ? G.hmQuetTuCam(G.dtLoiNoiVoiNha()) : [];
  };

  /* ─── Buổi nào thiếu cột nào ───
     Thiếu `tru` là buổi chỉ có giảng mà không có luyện — và bảy phần
     luyện ba phần giảng là luật số hai của giáo trình. */
  G.dtSoiBuoi = function () {
    return (G.DT_BUOI || []).filter(function (b) { return !b.cot || !b.tru || !b.nha; })
      .map(function (b) { return 'buổi ' + b.so; });
  };

  /* ═══════════ MÀN: BỐN MƯƠI GIỜ ═══════════ */
  G.VIEWS['dao-tao-dh'] = function () {
    if (!G.DT_BUOI)
      return U.empty('Chưa mở được giáo trình',
        'Đây là giáo trình nghề, nằm trong gói nghề.');

    var gio = G.dtSoiGio(), lop = G.dtTongGioLop(), thi = (G.DT_THI || {}).gio || 0;
    var o = U.ph({ eyebrow: 'BỐN MƯƠI GIỜ', ic: 'brain', grad: 1,
      t: 'Không ai dạy được ai lắng nghe — mọi người vốn biết',
      lead: 'Bốn mươi giờ chỉ đủ để gỡ bỏ những thứ chặn nó lại: thói quen sửa chữa, nỗi sợ im lặng, ' +
        'ham được cảm ơn, và ảo tưởng mình là người hùng. Nên giáo trình này không phải bản nhạc — là danh sách những cái phải gỡ.' });

    o += '<div class="card mb" style="border-color:' + (gio.length ? '#BE0E16' : '#0B7350') + '3e">' +
      '<div class="row wrap" style="gap:16px;align-items:baseline">' +
      '<b>' + (G.DT_BUOI || []).length + ' buổi</b><b>' + lop + ' giờ lớp</b><b>' + thi + ' giờ thi</b>' +
      '<span class="tiny" style="margin-left:auto;color:' + (gio.length ? '#BE0E16' : '#0B7350') + '">' +
      (gio.length ? 'LỆCH: ' + h(gio.join(' · ')) : 'đúng ' + (lop + thi) + ' giờ') + '</span></div></div>';

    o += U.sec('Bốn nguyên tắc đào tạo', '');
    o += '<div class="card mb">' + (G.DT_LUAT || []).map(function (l) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + l.no + '. ' + h(l.t) + '</b>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(l.y) + '</p></div>';
    }).join('') + '</div>';

    var v = G.DT_VAO || {};
    o += U.sec('Tuyển chọn gánh nửa trách nhiệm',
      'Lớp tốt nhất không cứu được tuyển chọn sai.');
    o += '<div class="grid g2 mb">' +
      '<div class="card" style="border-color:#0B73502e"><b class="sm" style="color:#0B7350">ĐƯỢC NHẬN</b>' +
      (v.duoc || []).map(function (x) {
        return '<div class="tiny mt" style="line-height:1.7"><b>' + h(x.t) + '</b><div class="dim">' + h(x.y) + '</div></div>';
      }).join('') + '</div>' +
      '<div class="card" style="border-color:#BE0E162e"><b class="sm" style="color:#BE0E16">KHÔNG NHẬN, BẤT KỂ THIỆN CHÍ</b>' +
      (v.khong || []).map(function (x) {
        return '<div class="tiny mt" style="line-height:1.7"><b>' + h(x.t) + '</b><div class="dim">' + h(x.y) + '</div></div>';
      }).join('') + '</div></div>';
    o += U.tbl(['Vòng', 'Làm gì', 'Chấm bằng gì'],
      (v.vong || []).map(function (x) { return [h(x.ten), h(x.lam), h(x.cham)]; }));
    o += '<p class="tiny dim mb" style="line-height:1.7">' + h(v.khongDat || '') + '</p>';

    o += U.sec('Mười hai buổi', 'Cột "trụ" là bài luyện chính. Buổi nào không có trụ là buổi chỉ có giảng.');
    o += (G.DT_BUOI || []).map(function (b) {
      return '<div class="card mb">' +
        '<div class="row wrap" style="gap:10px;align-items:baseline">' +
        '<span class="tiny up" style="color:#5140B4">BUỔI ' + b.so + ' · ' + b.gio + ' GIỜ</span>' +
        '<b>' + h(b.ten) + '</b></div>' +
        '<p class="sm mt" style="line-height:1.8">' + h(b.cot) + '</p>' +
        '<p class="sm mt" style="line-height:1.8"><b>Trụ:</b> ' + h(b.tru) + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7"><b>Về nhà:</b> ' + h(b.nha) + '</p></div>';
    }).join('');

    o += U.sec('Hai mươi ca thi vai', ((G.DT_VAI_LUAT || {}).vi || ''));
    o += U.tbl(['Mã', 'Tình huống', 'Cạm bẫy tự nhiên', 'Đạt khi nói', 'Trượt khi nói'],
      (G.DT_VAI || []).map(function (x) {
        return [h(x.ma), h(x.ten), h(x.bay), h(x.dat), h(x.truot)];
      }));

    var tt = G.DT_THUCTAP || {};
    o += U.sec('Mười tuần thực tập', 'Sau bốn mươi giờ, không ai cầm chứng chỉ ngay.');
    o += U.tbl(['Tuần', 'Làm gì', 'Giám sát làm gì'],
      (tt.chang || []).map(function (c) { return [c.tu + '–' + c.den, h(c.lam), h(c.giamSat)]; }));
    o += '<div class="card mb"><b class="sm">Ba ngưỡng hoàn thành</b>' +
      (tt.nguong || []).map(function (n) {
        return '<div class="sm mt" style="line-height:1.8">· ' + h(n.t) +
          (n.y ? '<div class="tiny dim">' + h(n.y) + '</div>' : '') + '</div>';
      }).join('') +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(tt.truot || '') + '</p></div>';

    o += U.sec('Năm tiêu chí chứng chỉ', '');
    o += U.tbl(['#', 'Tiêu chí', 'Bằng chứng lấy từ đâu', 'Chuẩn'],
      (G.DT_RUBRIC || []).map(function (r) { return [String(r.so), h(r.t), h(r.bang), h(r.chuan)]; }));

    var td = G.DT_TUYETDOI || {};
    o += '<div class="card mb" style="border-color:#BE0E163e">' +
      '<span class="tiny up" style="color:#BE0E16">TIÊU CHÍ TUYỆT ĐỐI — ĐỨNG TRÊN CẢ NĂM TIÊU CHÍ KIA</span>' +
      '<p class="mt" style="line-height:1.9"><b>' + h(td.t || '') + '</b></p>' +
      '<p class="sm mt" style="line-height:1.8">' + h(td.vi || '') + '</p>' +
      '<p class="tiny mt" style="line-height:1.7">Lần một: ' + h(td.lan1 || '') + ' Lần hai: ' + h(td.lan2 || '') + '</p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(td.luat || '') + '</p></div>';

    var th = G.DT_THI || {};
    o += U.sec('Bài thi cuối — không có bài viết', (th.lam || ''));
    o += U.tbl(['Giám khảo', 'Chấm gì', 'Quyền'],
      (th.giamKhao || []).map(function (g) { return [h(g.ai), h(g.cham), h(g.quyen || '—')]; }));
    o += '<div class="card mb"><b class="sm">Kết quả chỉ có hai trạng thái: ' +
      h((th.ketQua || []).join(' hoặc ')) + '</b>' +
      '<p class="sm mt" style="line-height:1.8">' + h(th.khongCoTruot || '') + '</p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(th.vi || '') + '</p></div>';

    o += U.sec('Sau chứng chỉ — ba phao cứu sinh', '');
    o += U.tbl(['Phao', 'Nhịp', 'Vì sao'],
      (G.DT_PHAO || []).map(function (p) { return [h(p.ten), h(p.nhip), h(p.y)]; }));

    var tc = G.DT_TAICHUNGCHI || {}, rl = G.DT_RUTLUI || {};
    o += '<div class="card mb"><b class="sm">Tái chứng chỉ — ' + tc.nam + ' năm một lần, ' + tc.gio + ' giờ</b>' +
      (tc.phan || []).map(function (x) { return '<div class="sm mt" style="line-height:1.8">· ' + h(x) + '</div>'; }).join('') +
      '<p class="tiny dim mt" style="line-height:1.7"><b>Trượt khi:</b> ' + h(tc.truotKhi || '') + '</p></div>';
    o += '<div class="card"><b class="sm">' + h(rl.cot || '') + '</b>' +
      (rl.duong || []).map(function (x) { return '<div class="sm mt" style="line-height:1.8">· ' + h(x) + '</div>'; }).join('') +
      '<p class="sm mt" style="line-height:1.8">' + h(rl.nghiThuc || '') + '</p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(rl.vi || '') + '</p></div>';
    return o;
  };
})();

})();
