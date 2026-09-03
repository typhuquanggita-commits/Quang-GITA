/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÃ CỦA GÓI NGHỀ · 21 TỆP

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
    G.ROLES.map(function(r){ return '<th style="text-align:center;font-size:10.5px;color:'+r.c+'">'+h(r.id)+'</th>'; }).join('')+
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
      '<p class="serif" style="font-size:16px;font-style:italic;line-height:1.6;color:var(--ink)">"'+h(y.ly)+'"</p>'+
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
    '<p class="mono mt" style="font-size:16px;color:var(--gold-2);letter-spacing:.04em">'+h(D.cauTruc)+'</p></div>';

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
    'padding:12px;font-size:14.5px;line-height:1.6;resize:vertical;outline:none"></textarea>'+
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
    '<div class="row mb" style="gap:8px">'+U.dot(n.color)+'<b style="color:'+n.color+';font-size:18px">'+h(n.label)+'</b></div>'+
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
      '<b style="color:'+d.c+';font-size:16px">'+h(d.ten)+'</b></div>'+
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
    '<div class="center mt2"><b style="font-size:18px;color:var(--gold-ink);letter-spacing:.02em">'+h(R.thongDiep)+'</b></div></div>';

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
      '<b style="color:'+x.c+';font-size:18px">'+h(x.ten)+'</b></div>'+
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
        '<b style="color:'+n.c+';font-size:16px">'+h(n.ten)+'</b></div>'+
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
      '<b style="color:'+p.c+';font-size:16px">'+h(p.ten)+'</b>'+
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
      '<b style="color:'+x.c+';font-size:16px">'+h(x.ten)+'</b></div>'+
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
        '<b style="flex:1;font-size:14.5px">'+h(c.ten)+'</b></div>'+
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
    '<h3 style="font-size:18px;font-weight:800;margin:4px 0 12px">'+h(m.title || id)+'</h3>';

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
        '<b class="mono" style="color:'+c.mau+';font-size:16px">'+h(c.ma)+'</b>'+
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
      '<b style="color:'+b.c+';font-size:16px">'+h(b.ten)+'</b>'+
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
      'font-weight:900;font-size:12.5px;background:rgba(11,102,117,.14);color:#0B6675">'+l.no+'</span>'+
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
      '<b style="display:block;margin-top:4px;font-size:16px">Năm tầng T1 → T5</b>'+
      '<p class="sm mt" style="line-height:1.7">Cả bốn tuyến đi theo cùng năm tầng của GITA365. '+
      'Nhờ vậy ma trận, cổng nghiệm thu, chuẩn thời gian và cách đồng hành dùng lại được nguyên — '+
      'hợp nhất là ghép dữ liệu, không phải viết lại khung.</p></div>'+
    '<div class="card" style="flex:1;min-width:280px;border-left:3px solid var(--gita-do-ink)">'+
      '<div class="tiny up muted">RIÊNG TỪNG TUYẾN</div>'+
      '<b style="display:block;margin-top:4px;font-size:16px">Tín hiệu vào bốn băng</b>'+
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
        '<b style="flex:1;font-size:14.5px">'+h(m.ten)+'</b>'+
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
        '<b style="flex:1;font-size:14.5px">'+h(x.ten)+'</b></div>'+
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
      '<b style="display:block;margin:3px 0 8px;font-size:16px">'+h(x.chu)+'</b>'+
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
        '<b style="font-size:16px">'+h(g.t || g.id)+'</b>'+
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
        '<b style="font-size:16px">'+h(g.t || g.id)+'</b>'+
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
        '<b style="margin-left:auto;font-size:21px;color:' + t.c + '">' + c[1].length + '</b></div>' +
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

/* ═════════ src/so-tay-van-hanh.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÁY CHẠY PHẦN KẾT SỔ TAY VẬN HÀNH

   Kho chuẩn ở kho-goc/data.so-tay-van-hanh.js. Toàn bộ ở gói NGHỀ.

   ═══ BỐN CÁI MỞ ═══

   svUuTien(a, b)     hai mối lo đụng nhau thì nghe cái nào. Trả về bậc,
                      tên, và câu vì sao — không trả về một chữ "an toàn"
                      trống, vì người đọc cần biết cái kia thua ở đâu.
   svCoachThang(tang) tháng Coach ở tầng này có được cắt không. Nó KHÔNG
                      tự viết lại lời hứa: nó đọc đúng dòng trong
                      HP_TANG.gom của tầng ấy và đưa nguyên văn ra.
   svHaiNguoi(tang)   ca ở tầng này có bắt buộc hai người biết hồ sơ không.
   svKichBanSap()     lời phải nói khi hệ sập giữa nhịp.

   ═══ BA CÁI KHOÁ ═══

   svSoiDieuLe()   mỗi điều lệ phải khai noiChay và cờ chay, và KHÔNG
                   được mang con số trong CÂU điều lệ. Điều lệ mang số là
                   bản thứ hai của một con số đang sống ở kho khác.
   svSoiCoDo()     điều lệ số 7 hứa "người vào trong 24-48 giờ khi có cờ
                   đỏ". Phép soi này đo lại lời hứa ấy trên chính AICHAM:
                   mọi luật màu đỏ phải có mốc trong 48 giờ. Nó KHÔNG ghi
                   lại con số 24-48 vào kho — nó đọc cột han và tự dịch.
   svSoiKhongChep() không dòng nào của tệp này được chép nguyên văn một
                   luật đã có ở kho khác.

   ═══ VÌ SAO svSoiCoDo() ĐỌC MÀU CHỨ KHÔNG ĐỌC TÊN ═══

   "Cờ đỏ" trong sổ tay không có định nghĩa bằng danh sách. Trong AICHAM
   thì có: cột c của mỗi luật. Ba luật mang mã đỏ đậm là L03 (sắp rời
   bỏ), L14 (việc khẩn ngoài giờ), L15 (dấu hiệu vượt phạm vi). Đọc màu
   thì thêm một luật đỏ mới là phép soi tự bao luôn; đọc danh sách mã thì
   luật mới lọt qua trong im lặng.

   ═══ MỘT CHỖ ĐÃ SUÝT SAI ═══

   Bản đầu tôi định đặt SV_HAI_NGUOI.tuTang = 4 lấy từ XK_TRAN — lằn ranh
   quyền xem hồ sơ. Đó là lấy đúng số vì lý do sai: quyền xem là việc bảo
   mật, người dự phòng là việc lời hứa. Nguồn thật nằm ở HP_TANG.gom của
   T4: "Coach riêng cho cả năm, CÓ NGƯỜI THAY KHI VẮNG". T3 không có dòng
   ấy. Hai chỗ tình cờ cùng ra số 4, và nếu tôi giữ nguồn sai thì ngày
   XK_TRAN đổi vì lý do bảo mật, lời hứa với nhà cũng đổi theo mà không ai
   biết vì sao.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h;

  function coKho(ten) { return G[ten] !== undefined && G[ten] !== null; }

  /* Số tầng từ mọi cách người ta viết: 'T4', 4, '4', 'tang4'. */
  function soTang(t) {
    var m = String(t == null ? '' : t).match(/(\d)/);
    return m ? Number(m[1]) : 0;
  }

  /* ═══════════ MỞ 1: HAI MỐI LO ĐỤNG NHAU THÌ NGHE AI ═══════════ */
  G.svUuTien = function (a, b) {
    var ds = G.SV_THUTU || [];
    if (!ds.length) return { chuaDo: true, thieu: 'SV_THUTU' };

    function tim(x) {
      var k = String(x == null ? '' : x).toUpperCase();
      for (var i = 0; i < ds.length; i++)
        if (ds[i].ma === k || String(ds[i].ten).toUpperCase() === k) return ds[i];
      return null;
    }
    var A = tim(a), B = tim(b);
    if (!A || !B) return { khongBiet: true, thieuTen: (!A ? a : b),
      goiY: ds.map(function (x) { return x.ma; }) };

    /* Cùng một mối lo thì không có gì để quyết. Nói thẳng, đừng trả về
       một bên thắng — vì lúc ấy người đọc tưởng mình vừa được phân xử. */
    if (A.ma === B.ma) return { bangNhau: true, ten: A.ten,
      vi: 'Cùng một mối lo. Bảng này chỉ dùng lúc hai mối lo KHÁC nhau đụng nhau.' };

    var thang = A.bac < B.bac ? A : B;
    var thua  = A.bac < B.bac ? B : A;
    return {
      thang: thang.ma, tenThang: thang.ten, bacThang: thang.bac,
      thua: thua.ma, tenThua: thua.ten, bacThua: thua.bac,
      vi: thang.thang,
      thuaODau: 'Không bỏ ' + thua.ten.toLowerCase() + ' — chỉ xếp nó sau. ' +
        'Xử xong ' + thang.ten.toLowerCase() + ' thì quay lại đúng chỗ đang dở.',
      noiChay: thang.noiChay || ''
    };
  };

  /* ═══════════ MỞ 2: THÁNG COACH CÓ ĐƯỢC CẮT KHÔNG ═══════════ */
  G.svCoachThang = function (tang) {
    var cam = (G.SV_CAM_QUYMO || []).filter(function (c) { return c.ma === 'CQ-1'; })[0];
    if (!cam) return { chuaDo: true, thieu: 'SV_CAM_QUYMO CQ-1' };

    var so = soTang(tang), ma = 'T' + so;
    var trong = (cam.tang || []).indexOf(ma) >= 0;
    if (!trong) return { camCat: false, tang: ma,
      vi: 'Tầng này không có tháng Coach trong phần đã bán, nên không có gì để cắt.' };

    /* Đọc ĐÚNG dòng lời hứa của tầng ấy thay vì viết lại nó. HP_TANG là
       gói nghề; máy gia đình không có, và đó là quyền chứ không phải lỗi. */
    var loiHua = '', coBang = coKho('HP_TANG');
    if (coBang) {
      var b = (G.HP_TANG || []).filter(function (x) { return x.tang === ma; })[0];
      if (b) loiHua = (b.gom || []).filter(function (d) { return /Coach/i.test(d); }).join(' · ');
    }

    return {
      camCat: true, tang: ma,
      luat: cam.cam,
      vi: cam.vi,
      thayVao: cam.thayVao,
      loiHua: loiHua,
      chuaDoLoiHua: !coBang,
      thieuKho: coBang ? undefined : 'HP_TANG',
      noiChay: 'DD_TRAN_LUAT'
    };
  };

  /* ═══════════ MỞ 3: CA NÀY CÓ BẮT BUỘC HAI NGƯỜI KHÔNG ═══════════ */
  G.svHaiNguoi = function (tang) {
    var l = G.SV_HAI_NGUOI || {};
    if (l.tuTang === undefined) return { chuaDo: true, thieu: 'SV_HAI_NGUOI' };
    var so = soTang(tang);
    var can = so >= Number(l.tuTang);
    return {
      canHaiNguoi: can, tang: 'T' + so, tuTang: 'T' + l.tuTang,
      layTuDau: l.layTuDau || '',
      vi: can
        ? 'Ca tầng này phải có người dự phòng ĐÃ BIẾT hồ sơ — không phải người sẽ đọc hồ sơ khi cần.'
        : 'Tầng này chưa hứa người thay. Không phải vì ca dễ hơn — vì lời hứa đã bán chưa gồm nó.',
      choChuHe: can ? undefined : (l.choChuHe || '')
    };
  };

  /* ═══════════ MỞ 4: LỜI PHẢI NÓI KHI HỆ SẬP ═══════════ */
  G.svKichBanSap = function () {
    var r = (G.SV_RUIRO || []).filter(function (x) { return x.ma === 'R1'; })[0];
    if (!r) return { chuaDo: true, thieu: 'SV_RUIRO R1' };
    return { loiNoi: r.loiNoi, vi: r.viLoiNoi, buoc: (r.buoc || []).slice(), camGiau: r.camGiau };
  };

  G.svKhungHoang = function () {
    var r = (G.SV_RUIRO || []).filter(function (x) { return x.ma === 'R3'; })[0];
    if (!r) return { chuaDo: true, thieu: 'SV_RUIRO R3' };
    return { nguyenTac: r.nguyenTacSoMot, vi: r.viNguyenTacSoMot,
      loiNoi: r.loiNoi, buoc: (r.buoc || []).slice(), cam: r.camTuyetDoi };
  };

  /* Điều lệ lọc theo vai. 'ai' hoặc 'coach'; không truyền thì lấy hết. */
  G.svDieuLe = function (vai) {
    var ds = G.SV_DIEULE || [];
    if (!vai) return ds.slice();
    return ds.filter(function (d) { return (d.buoc || []).indexOf(vai) >= 0; });
  };

  /* ═══════════ KHOÁ 1: MỖI ĐIỀU PHẢI KHAI ĐƯỢC CHỖ CHẠY ═══════════ */
  G.svSoiDieuLe = function () {
    var ds = G.SV_DIEULE || [], loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'SV_DIEULE', loi: [] };
    if (ds.length !== 10) loi.push('điều lệ có ' + ds.length + ' điều, bản gốc mười điều');

    var thay = {};
    ds.forEach(function (d) {
      var n = 'điều ' + d.no;
      if (thay[d.no]) loi.push(n + ' trùng số');
      thay[d.no] = 1;
      if (!d.dieu) loi.push(n + ' thiếu nội dung');
      if (!(d.buoc || []).length) loi.push(n + ' chưa khai buộc ai');
      (d.buoc || []).forEach(function (v) {
        if (v !== 'ai' && v !== 'coach') loi.push(n + ' buộc vai lạ: ' + v);
      });

      /* Chỗ này là cả cái luật của bảng: mọi điều đều nói được nó chặn ở
         đâu, hoặc nói rõ chưa chặn ở đâu cả và thiếu cái gì. */
      if (!d.noiChay) loi.push(n + ' chưa khai noiChay');
      if (typeof d.chay !== 'boolean') loi.push(n + ' chưa khai cờ chay');
      if (d.chay === false && !/thiếu/i.test(String(d.noiChay)))
        loi.push(n + ' khai chưa chạy mà không nói thiếu cái gì');

      /* Điều lệ mang con số là bản thứ hai của một con số đang sống ở
         kho khác. Chữ số trong câu điều lệ thì cấm; trong noiChay thì
         không, vì đó là tên mã luật (L01, L15, T4…). */
      if (/\d/.test(String(d.dieu)))
        loi.push(n + ' có con số trong câu điều lệ');
    });
    return { chuaDo: false, loi: loi, soDieu: ds.length,
      chuaChay: ds.filter(function (d) { return d.chay === false; }).length };
  };

  /* ═══════════ KHOÁ 2: ĐIỀU LỆ 7 ĐO LẠI TRÊN AICHAM ═══════════

     Lời hứa: người vào trong 24-48 giờ khi có cờ đỏ, không ngoại lệ.
     Phép soi đọc cột han của mọi luật AICHAM màu đỏ đậm và dịch ra giờ.
     Mốc "ngay lập tức" hoặc tính bằng phút thì đương nhiên đạt. */
  var DO_DAM = ['#dc2626', '#BE0E16', '#b91c1c'];
  var TRAN_GIO = 48;

  function gioTu(han) {
    var s = String(han || '').toLowerCase();
    if (!s) return null;
    if (/ngay lập tức|ngay lap tuc|trong ngày|trong ngay/.test(s)) return 0;
    if (/phút|phut/.test(s)) return 1;                 /* mọi mốc phút đều < 48 giờ */
    var m = s.match(/(\d+)\s*giờ|(\d+)\s*gio/);
    if (m) return Number(m[1] || m[2]);
    var d = s.match(/(\d+)\s*ngày|(\d+)\s*ngay/);
    if (d) return Number(d[1] || d[2]) * 24;
    return null;                                        /* không dịch được */
  }

  G.svSoiCoDo = function () {
    if (!coKho('AICHAM')) return { chuaDo: true, thieu: 'AICHAM', loi: [] };
    var ds = (G.AICHAM || {}).luat || [], loi = [], do_ = [];
    if (!ds.length) return { chuaDo: true, thieu: 'AICHAM.luat', loi: [] };

    ds.forEach(function (l) {
      if (DO_DAM.indexOf(String(l.c)) < 0) return;
      do_.push(l.ma);
      var g = gioTu(l.han);
      if (g === null) { loi.push(l.ma + ' mốc "' + l.han + '" không dịch được ra giờ'); return; }
      if (g > TRAN_GIO) loi.push(l.ma + ' mốc ' + g + ' giờ, vượt ' + TRAN_GIO + ' giờ của điều lệ 7');
    });

    /* Không luật đỏ nào là chính nó một lỗi: lời hứa điều 7 lúc ấy
       không có gì đỡ, và phép soi sẽ xanh mãi mãi trong khi rỗng. */
    if (!do_.length) loi.push('AICHAM không có luật nào màu đỏ — điều lệ 7 không có chỗ chạy');

    return { chuaDo: false, loi: loi, luatDo: do_, tran: TRAN_GIO };
  };

  /* ═══════════ KHOÁ 3: KHÔNG CHÉP LẠI LUẬT ĐÃ CÓ ═══════════

     Tệp này là sổ tra. Một dòng chép nguyên văn một luật ở kho khác là
     bản thứ hai của luật ấy. So bằng câu đủ dài — dưới mười lăm chữ thì
     trùng nhau là chuyện bình thường của tiếng Việt. */
  G.svSoiKhongChep = function () {
    var loi = [], nguon = [];
    ['KBTV_BA_KHONG', 'KBTV_BA_LUON'].forEach(function (k) {
      if (coKho(k)) (G[k] || []).forEach(function (c) { nguon.push({ kho: k, cau: String(c) }); });
    });
    if (coKho('KBTV_DAODUC'))
      (G.KBTV_DAODUC || []).forEach(function (d) { nguon.push({ kho: 'KBTV_DAODUC', cau: String(d.vi || '') }); });
    if (!nguon.length) return { chuaDo: true, thieu: 'KBTV_*', loi: [] };

    function chuan(s) { return String(s || '').toLowerCase().replace(/[^\p{L}\p{N} ]/gu, ' ').replace(/\s+/g, ' ').trim(); }

    var cua = [];
    (G.SV_DIEULE || []).forEach(function (d) { cua.push({ o: 'điều lệ ' + d.no, cau: d.dieu }); });
    (G.SV_CAM_QUYMO || []).forEach(function (c) { cua.push({ o: c.ma, cau: c.cam }); });

    cua.forEach(function (x) {
      var a = chuan(x.cau);
      if (a.split(' ').length < 15) return;
      nguon.forEach(function (n) {
        if (chuan(n.cau) === a) loi.push(x.o + ' chép nguyên văn ' + n.kho);
      });
    });
    return { chuaDo: false, loi: loi, soCau: cua.length, soNguon: nguon.length };
  };

  G.svChoChu = function () { return (G.SV_CHOCHU || []).slice(); };

  /* ═══════════════════════════════════════════════════════════
     MÀN HÌNH
     ═══════════════════════════════════════════════════════════ */
  G.VIEWS['so-tay-van-hanh'] = function () {
    if (!G.SV_DIEULE)
      return U.empty('Chưa mở được phần này',
        'Phần này nằm trong gói nghề. Đăng nhập bằng tài khoản có quyền nghề để nạp.');

    var loi = G.SV_LOI || {};
    var o = U.ph({ eyebrow: 'SỔ TAY VẬN HÀNH · PHẦN KẾT 10/10', ic: 'compass', grad: 1,
      t: 'Phần Trợ lý và Coach bấm được, ở tầng ba và tầng bốn',
      lead: 'Sổ tay gốc viết cho Giám đốc và Quản lý vận hành. Trang này chỉ giữ phần ' +
        'người đi cùng một nhà thật sự phải làm — phần còn lại khai ở cuối trang, kèm lý do bỏ.' });

    o += '<div class="card mb" style="border-color:#0B667556">' +
      '<p style="line-height:1.9"><b>' + h(loi.la || '') + '</b></p>' +
      '<p class="sm mt" style="line-height:1.8">' + h(loi.phamVi || '') + '</p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(loi.vi || '') + '</p>' +
      '<p class="tiny mt" style="line-height:1.8;color:#0B6675"><b>' + h(loi.tuyenNgon || '') + '</b></p></div>';

    o += G.kaKhung ? G.kaKhung('so-tay-van-hanh', 'dau') : '';

    /* ── Thứ tự ưu tiên ── */
    var tl = G.SV_THUTU_LUAT || {};
    o += U.sec('Khi hai mối lo đụng nhau', tl.cot || '');
    o += '<div class="card mb">' + (G.SV_THUTU || []).map(function (t) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<span class="tiny up" style="color:' + t.c + '"><b>BẬC ' + t.bac + ' · ' + h(t.ten) + '</b></span>' +
        '<p class="sm mt" style="line-height:1.8">' + h(t.la) + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(t.thang) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Chạy ở: ' + h(t.noiChay) + '</p></div>';
    }).join('') + '</div>';
    o += '<p class="tiny dim mb" style="line-height:1.7">' + h(tl.vi || '') + '<br>' +
      h(tl.viKhongDoiTheoTang || '') + '</p>';

    /* Một ví dụ chạy thật, để bảng không chỉ là bảng. */
    var vd = G.svUuTien('NHIP', 'AN_TOAN');
    if (vd && vd.thang)
      o += '<div class="card mb" style="border-color:#dc262644">' +
        '<span class="tiny up dim">THỬ MỘT CA</span>' +
        '<p class="sm mt" style="line-height:1.8">Nhà đang đứt nhịp bốn ngày, và trong tin nhắn ' +
        'có một câu về chuyện an toàn. Nghe cái nào trước?</p>' +
        '<p class="mt" style="line-height:1.8"><b>' + h(vd.tenThang) + ' (bậc ' + vd.bacThang + ')</b> ' +
        'trước ' + h(vd.tenThua.toLowerCase()) + ' (bậc ' + vd.bacThua + ').</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(vd.thuaODau) + '</p></div>';

    /* ── Điều lệ mười điều ── */
    var sd = G.svSoiDieuLe();
    var scd = G.svSoiCoDo();
    var lech = (sd.loi || []).concat(scd.chuaDo ? [] : (scd.loi || []));
    o += U.sec('Mười điều, và chỗ mỗi điều thật sự chặn' + (lech.length ? ' — LỆCH: ' + lech.join(' · ') : ''),
      (G.SV_DIEULE_LUAT || {}).cot || '');

    o += '<div class="card mb">' + (G.SV_DIEULE || []).map(function (d) {
      var mau = d.chay === false ? '#B4720F' : '#0B6675';
      return '<div style="padding:10px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + d.no + '. ' + h(d.dieu) + '</b>' +
        '<p class="tiny mt" style="line-height:1.7">' +
        (d.buoc || []).map(function (v) {
          return '<span class="tiny up dim">' + (v === 'ai' ? 'TRỢ LÝ' : 'COACH') + '</span>';
        }).join(' · ') + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:' + mau + '">' +
        (d.chay === false ? h(d.noiChay) : 'Chạy ở: ' + h(d.noiChay)) + '</p></div>';
    }).join('') + '</div>';
    o += '<p class="tiny dim mb" style="line-height:1.7">' +
      h((G.SV_DIEULE_LUAT || {}).viCamSo || '') + '<br>' +
      h((G.SV_DIEULE_LUAT || {}).motDieuChuaChay || '') + '</p>';

    if (!scd.chuaDo)
      o += '<div class="card mb"><span class="tiny up dim">ĐIỀU 7 ĐO LẠI TRÊN AICHAM</span>' +
        '<p class="sm mt" style="line-height:1.8">' + (scd.luatDo || []).length +
        ' luật màu đỏ · trần ' + scd.tran + ' giờ · ' +
        (scd.loi.length ? '<b style="color:#BE0E16">' + h(scd.loi.join(' · ')) + '</b>'
                        : 'mọi mốc đều trong trần') + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">Phép soi đọc cột hạn của từng luật đỏ và tự dịch ' +
        'ra giờ. Con số 24-48 không được chép vào kho — nó sống ở AICHAM.</p></div>';

    o += G.kaKhung ? G.kaKhung('so-tay-van-hanh', 'giua') : '';

    /* ── Bốn điều cấm khi tăng quy mô ── */
    o += U.sec('Bốn điều cấm khi hệ lớn lên',
      'Điều đầu tiên gọi thẳng tên tầng ba, tầng bốn, tầng năm — nên nó là một cổng, không phải lời khuyên.');
    o += '<div class="card mb">' + (G.SV_CAM_QUYMO || []).map(function (c) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<span class="tiny up" style="color:#BE0E16">' + h(c.ma) +
        (c.tang ? ' · ' + h((c.tang || []).join(' · ')) : '') + '</span>' +
        '<p class="sm mt" style="line-height:1.8"><b>CẤM: ' + h(c.cam) + '</b></p>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(c.vi) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Thay vào: ' + h(c.thayVao) + '</p>' +
        (c.daHuaODau ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(c.daHuaODau) + '</p>' : '') +
        '</div>';
    }).join('') + '</div>';

    /* Cổng tháng Coach chạy thật cho hai tầng chủ hệ giao. */
    var cong = ['T3', 'T4'].map(function (t) { return G.svCoachThang(t); })
      .filter(function (x) { return x && x.camCat; });
    if (cong.length)
      o += '<div class="card mb" style="border-color:#BE0E1644">' +
        '<span class="tiny up dim">CỔNG CHẠY THẬT</span>' + cong.map(function (c) {
          return '<p class="sm mt" style="line-height:1.8"><b>' + h(c.tang) + ' — không được cắt.</b> ' +
            (c.chuaDoLoiHua
              ? '<span class="tiny dim">(chưa đọc được lời hứa: máy này không có ' + h(c.thieuKho) + ')</span>'
              : h(c.loiHua)) + '</p>';
        }).join('') +
        '<p class="tiny dim mt" style="line-height:1.7">Lời hứa đọc thẳng từ HP_TANG, không viết lại. ' +
        'Sửa bảng học phí thì dòng này đổi theo trong cùng một lần.</p></div>';

    /* ── Bốn rủi ro ── */
    o += U.sec('Bốn chỗ hệ có thể gãy, và lời phải nói',
      'Sổ tay gốc liệt sáu. Hai cái còn lại Coach không bấm được gì — khai ở cuối trang.');
    o += (G.SV_RUIRO || []).map(function (r) {
      return '<div class="card mb" style="border-color:' + r.c + '4d">' +
        '<span class="tiny up" style="color:' + r.c + '">' + h(r.ma) + ' · ' + h(r.mucDo) + '</span>' +
        '<p class="mt" style="line-height:1.9"><b>' + h(r.ten) + '</b></p>' +
        (r.nguyenTacSoMot ? '<p class="sm mt" style="line-height:1.8;color:#BE0E16"><b>' +
          h(r.nguyenTacSoMot) + '</b></p>' +
          '<p class="tiny dim mt" style="line-height:1.7">' + h(r.viNguyenTacSoMot) + '</p>' : '') +
        '<ul class="sm mt" style="line-height:1.8;padding-left:18px">' +
        (r.buoc || []).map(function (b) { return '<li>' + h(b) + '</li>'; }).join('') + '</ul>' +
        (r.loiNoi ? '<div class="mt" style="padding:10px 12px;border-left:3px solid ' + r.c +
          ';background:var(--gita-nen-2)"><p class="sm" style="line-height:1.8">' +
          '&ldquo;' + h(r.loiNoi) + '&rdquo;</p>' +
          '<p class="tiny dim mt" style="line-height:1.7">' + h(r.viLoiNoi || r.viHoanDe || '') + '</p></div>' : '') +
        (r.camGiau ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>' + h(r.camGiau) + '</b></p>' : '') +
        (r.camTuyetDoi ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>' + h(r.camTuyetDoi) + '</b></p>' : '') +
        (r.viHaiNguoi ? '<p class="tiny dim mt" style="line-height:1.7">' + h(r.viHaiNguoi) + '</p>' : '') +
        (r.viBiBoQua ? '<p class="tiny dim mt" style="line-height:1.7">' + h(r.viBiBoQua) + '</p>' : '') +
        '</div>';
    }).join('');

    /* Quy tắc hai người, chạy cho T3 và T4 để thấy chúng khác nhau. */
    var hn = ['T3', 'T4'].map(function (t) { return G.svHaiNguoi(t); });
    if (hn[0] && !hn[0].chuaDo) {
      o += '<div class="card mb"><span class="tiny up dim">QUY TẮC HAI NGƯỜI · CHẠY THẬT</span>' +
        hn.map(function (x) {
          return '<p class="sm mt" style="line-height:1.8"><b>' + h(x.tang) + ': ' +
            (x.canHaiNguoi ? 'bắt buộc hai người' : 'chưa bắt buộc') + '.</b> ' + h(x.vi) + '</p>';
        }).join('') +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(hn[1].layTuDau || '') + '</p></div>';
    }

    /* ── Một dòng từ bảng ngân sách ── */
    var ns = G.SV_NGANSACH_COACH || {};
    if (ns.luat)
      o += '<div class="card mb" style="border-color:#dc262644">' +
        '<span class="tiny up" style="color:#dc2626">TỪ BẢNG NGÂN SÁCH · MỘT DÒNG</span>' +
        '<p class="mt" style="line-height:1.9"><b>' + h(ns.luat) + '</b></p>' +
        '<p class="sm mt" style="line-height:1.8">' + h(ns.nghiaLa) + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(ns.vi) + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(ns.viKhongMangConSo) + '</p></div>';

    /* ── Phần không vào kho ── */
    o += U.sec('Phần kết còn gì, và vì sao không vào kho',
      'Khai ra để lần sau không ai chép lại ở chỗ khác.');
    o += '<div class="card mb">' + (G.SV_NGOAI || []).map(function (n) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(n.ma) + ' · ' + h(n.muc) + '</b>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(n.vi) + '</p>' +
        (n.khongDung ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(n.khongDung) + '</p>' : '') +
        (n.thayBang ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Thay bằng: ' + h(n.thayBang) + '</p>' : '') +
        (n.daCoOKho ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Đã có ở: ' + h(n.daCoOKho) + '</p>' : '') +
        (n.giuLaiMotDong ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Giữ lại một dòng: ' + h(n.giuLaiMotDong) + '</p>' : '') +
        (n.giuLaiMotCau ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(n.giuLaiMotCau) + '</p>' : '') +
        (n.canGi ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">Cần: ' + h(n.canGi) + '</p>' : '') +
        '</div>';
    }).join('') + '</div>';

    /* ── Chỗ lệch ── */
    o += U.sec('Chỗ phần kết lệch với kho', 'Máy đọc kho. Chỗ lệch ghi ra, không tự chọn hộ.');
    o += '<div class="card mb">' + (G.SV_LECH || []).map(function (l) {
      return '<div style="padding:10px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(l.ma) + ' · ' + h(l.o) + '</b>' +
        '<p class="tiny mt" style="line-height:1.7"><b>Tài liệu:</b> ' + h(l.taiLieu) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7"><b>Kho:</b> ' + h(l.kho) + '</p>' +
        (l.tuMauThuan ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(l.tuMauThuan) + '</p>' : '') +
        (l.phepCong ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(l.phepCong) + '</p>' : '') +
        (l.yNghia ? '<p class="tiny mt" style="line-height:1.7">' + h(l.yNghia) + '</p>' : '') +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(l.mayLam) + '</p>' +
        (l.noHoSo ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Hồ sơ đã mở ở: ' + h(l.noHoSo) + '</p>' : '') +
        (l.canGi ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>Cần: ' + h(l.canGi) + '</b></p>' : '') +
        (l.daRo ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Chỗ này không cần chủ hệ quyết.</p>' : '') +
        '</div>';
    }).join('') + '</div>';

    /* ── Chờ chủ hệ ── */
    if (G.SV_CHOCHU && G.SV_CHOCHU.length) {
      o += U.sec('Câu chờ chủ hệ', 'Mã không tự trả lời được câu này.');
      o += '<div class="card mb">' + G.svChoChu().map(function (c) {
        return '<div style="padding:9px 0">' +
          '<b class="sm">' + h(c.hoi) + '</b>' +
          '<p class="tiny dim mt" style="line-height:1.7">' + h(c.boi) + '</p>' +
          '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(c.toiNghieng || '') + '</p>' +
          '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(c.mayDangLam || '') + '</p></div>';
      }).join('') + '</div>';
    }

    o += G.kaKhung ? G.kaKhung('so-tay-van-hanh', 'cuoi') : '';
    return o;
  };
})();

})();

/* ═════════ src/tang34.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÁY CHẠY TẦNG 3 VÀ TẦNG 4 CHO TRỢ LÝ VÀ COACH

   Kho chuẩn ở kho-goc/data.tang34.js. Toàn bộ ở gói NGHỀ.

   ═══ SÁU CÁI MỞ ═══

   t34VaiCuaAi(viec, tang)  việc này của máy hay của người. Đây là hàm
                            quan trọng nhất tệp — audit của sổ tay ghi
                            lỗi phổ biến nhất tầng 3 là hai vai lấn nhau.
   t34SoiTin(tin)           một tin nhắn đã đủ nhịp G-I-T-S-A chưa. Nó
                            KHÔNG chấm hay dở — nó chỉ hỏi có thiếu nhịp
                            bắt buộc nào không.
   t34BaoCao(...)           dựng báo cáo ba trụ ĐÚNG THỨ TỰ. Gọi hàm thì
                            không đảo thứ tự được, mà đảo thứ tự là lỗi
                            hay gặp nhất khi người soạn vội.
   t34ChangHomNay(tang,ngay) hôm nay là chặng nào, mùa nào, mốc nào tới.
   t34CuaRa(tang, nha)      ba cửa của ngày cuối, đã lọc qua cổng phí.
   t34Gia(tang)             giá một tầng và giá mỗi ngày, TÍNH TẠI CHỖ
                            từ HP_TANG.

   ═══ VÌ SAO t34Gia() TÍNH CHỨ KHÔNG ĐỌC ═══

   Sổ tay ghi sẵn "≈55.000đ/ngày" cho tầng 4. Con số ấy chỉ đúng nếu
   tầng 4 là hai mươi triệu — mà kho ghi ba mươi. Chép 55.000 vào kho là
   lén chọn hộ chủ hệ một con số tiền bằng đường vòng: không ai thấy
   mình vừa quyết định giá, nhưng lời nói với nhà mình thì đã theo con số
   ấy rồi.

   Nên hàm này chia tại chỗ: gia ÷ soNgay. Sửa HP_TANG thì cả hai con số
   đổi theo trong cùng một lần.

   ═══ BA CÁI KHOÁ ═══

   t34SoiVai()      không việc nào khai hai chủ; mọi việc đều khai tầng.
   t34SoiThuTu()    ba trụ phải đúng thứ tự Thái độ → Kỹ năng → Kiến thức
                    trong CHÍNH kho, không chỉ trong lời hứa.
   t34SoiCuaRa()    mọi cửa loại lên tầng phải khai quaCongPhi = true.
                    Một cửa mời lên tầng mà không qua cổng là một đường
                    vòng quanh luật đã chốt — và đường vòng thì không ai
                    thấy cho tới lúc có người đi qua.

   ═══ MỘT CHỖ SUÝT SAI ═══

   Bản đầu t34CuaRa() lọc bỏ hẳn cửa lên tầng khi cổng phí đóng. Sai:
   lọc bỏ thì màn hình còn hai cửa và người soạn tưởng ngày ấy chỉ có
   hai đường. Nay nó GIỮ cửa và gắn nhãn cổng đóng, kèm lý do — người
   soạn cần biết cửa ấy có tồn tại và vì sao hôm nay chưa mở.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h;
  var SO_NGAY = { T3: 90, T4: 365 };

  function coKho(ten) { return G[ten] !== undefined && G[ten] !== null; }
  function maTang(t) { var m = String(t == null ? '' : t).match(/(\d)/); return m ? 'T' + m[1] : ''; }
  function bo(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  }

  /* ═══════════ MỞ 1: VIỆC NÀY CỦA AI ═══════════ */
  G.t34VaiCuaAi = function (viec, tang) {
    var ds = G.T34_VAI || [];
    if (!ds.length) return { chuaDo: true, thieu: 'T34_VAI' };
    var k = bo(viec), ma = maTang(tang);

    var hop = ds.filter(function (v) {
      if (ma && (v.tang || []).indexOf(ma) < 0) return false;
      return bo(v.viec).indexOf(k) >= 0 || k.indexOf(bo(v.viec)) >= 0;
    });
    if (!hop.length) return { khongBiet: true, viec: viec, tang: ma,
      goiY: ds.filter(function (v) { return !ma || (v.tang || []).indexOf(ma) >= 0; })
              .map(function (v) { return v.viec; }) };

    var v = hop[0];
    return {
      cua: v.cua, viec: v.viec, tang: (v.tang || []).slice(),
      vi: v.vi,
      han: v.han,
      camAiLam: v.camAiLam,
      phaiQua: v.nhungPhaiQua,
      dieuKien: v.dieuKien,
      cot: (G.T34_VAI_LUAT || {}).cot || ''
    };
  };

  /* ═══════════ MỞ 2: TIN NÀY ĐỦ NHỊP CHƯA ═══════════

     Không chấm hay dở. Chỉ hỏi: có thiếu nhịp BẮT BUỘC nào không.
     Nhận vào một đối tượng {G:'…', I:'…', T:'…', S:'…', A:'…'} — vì
     đoán nhịp từ một khối chữ liền thì đoán sai, và đoán sai ở đây
     nguy hơn không đo: người soạn tin sẽ tin vào một con dấu rỗng. */
  G.t34SoiTin = function (tin) {
    var ds = G.T34_GITSA || [];
    if (!ds.length) return { chuaDo: true, thieu: 'T34_GITSA' };
    tin = tin || {};
    var thieu = [], coLuoc = [];
    ds.forEach(function (n) {
      var co = String(tin[n.nhip] || '').trim().length > 0;
      if (co) return;
      if (n.luocDuoc) coLuoc.push(n.nhip);
      else thieu.push(n.nhip + ' — ' + n.ten);
    });
    return {
      dat: thieu.length === 0,
      thieu: thieu,
      daLuoc: coLuoc,
      vi: thieu.length
        ? (G.T34_GITSA_LUAT || {}).viIvaT || ''
        : 'Đủ nhịp bắt buộc.' + (coLuoc.length ? ' Lược ' + coLuoc.join(', ') + ' — cho phép ở tin ngắn.' : '')
    };
  };

  /* ═══════════ MỞ 3: BÁO CÁO BA TRỤ, ĐÚNG THỨ TỰ ═══════════ */
  G.t34BaoCao = function (noiDung) {
    var ds = (G.T34_BATRU || []).slice().sort(function (a, b) { return a.thu - b.thu; });
    if (!ds.length) return { chuaDo: true, thieu: 'T34_BATRU' };
    noiDung = noiDung || {};
    var l = G.T34_BATRU_LUAT || {};
    return {
      moBang: l.loiMoChuan || '',
      dong: ds.map(function (t) {
        return { ma: t.ma, ten: t.ten, c: t.c,
          noiDung: String(noiDung[t.ma] || '').trim(),
          trong: !String(noiDung[t.ma] || '').trim(),
          layTuDau: t.docTuDau };
      }),
      thuTu: l.thuTuBaoCao || '',
      viNguoc: l.viNguoc || ''
    };
  };

  /* ═══════════ MỞ 4: HÔM NAY LÀ CHẶNG NÀO ═══════════ */
  G.t34ChangHomNay = function (tang, ngay) {
    var ma = maTang(tang), n = Number(ngay) || 0;
    if (ma === 'T3') {
      var ds = G.T34_T3_CHANG || [];
      if (!ds.length) return { chuaDo: true, thieu: 'T34_T3_CHANG' };
      var c = ds.filter(function (x) {
        var m = String(x.ngay).split(/[–-]/);
        return n >= Number(m[0]) && n <= Number(m[1]);
      })[0];
      if (!c) return { ngoaiChang: true, tang: ma, ngay: n, tong: SO_NGAY.T3 };
      return { tang: ma, ngay: n, chang: c.so, chuDe: c.chuDe, tru: (c.tru || []).slice(),
        sanPham: c.sanPham, moc: (c.moc || []).slice(), c: c.c, tong: SO_NGAY.T3 };
    }
    if (ma === 'T4') {
      var dm = G.T34_T4_MUA || [];
      if (!dm.length) return { chuaDo: true, thieu: 'T34_T4_MUA' };
      var thang = Math.max(1, Math.min(12, Math.ceil(n / 30.4)));
      var q = dm.filter(function (x) {
        var m = String(x.thang).split(/[–-]/);
        return thang >= Number(m[0]) && thang <= Number(m[1]);
      })[0];
      if (!q) return { ngoaiChang: true, tang: ma, ngay: n, tong: SO_NGAY.T4 };
      return { tang: ma, ngay: n, thang: thang, quy: q.quy, mua: q.mua, chuDe: q.chuDe,
        sanPham: q.sanPham, moc: (q.moc || []).slice(), c: q.c, tong: SO_NGAY.T4 };
    }
    return { khongPhaiTang34: true, tang: ma };
  };

  /* ═══════════ MỞ 5: GIÁ, TÍNH TẠI CHỖ ═══════════ */
  G.t34Gia = function (tang) {
    var ma = maTang(tang);
    if (!coKho('HP_TANG')) return { chuaDo: true, thieu: 'HP_TANG' };
    var b = (G.HP_TANG || []).filter(function (x) { return x.tang === ma; })[0];
    if (!b) return { khongCo: true, tang: ma };
    if (b.gia === null || b.gia === undefined)
      return { chuaCoGia: true, tang: ma,
        vi: 'Chủ Học viện chưa điền giá tầng này. Chưa điền thì không hiện bảng giá.' };
    var soNgay = SO_NGAY[ma] || 0;
    return {
      tang: ma, ten: b.ten, gia: b.gia, donVi: b.donVi,
      soNgay: soNgay,
      moiNgay: soNgay ? Math.round(b.gia / soNgay) : undefined,
      tinhTaiCho: true,
      viTinh: 'Chia tại chỗ từ HP_TANG.gia. Không ghi sẵn con số mỗi ngày vào kho — ghi sẵn là ' +
        'chốt hộ một con số tiền bằng đường vòng.'
    };
  };

  /* ═══════════ MỞ 6: BA CỬA CỦA NGÀY CUỐI ═══════════

     Giữ cả ba cửa. Cửa lên tầng thì gắn nhãn cổng — mở hay chưa, và vì
     sao. Lọc bỏ hẳn thì người soạn tưởng ngày ấy chỉ có hai đường. */
  G.t34CuaRa = function (tang, nha) {
    var ma = maTang(tang);
    var ds = (G.T34_CUARA || []).filter(function (c) { return c.tang === ma; });
    if (!ds.length) return { chuaDo: true, thieu: 'T34_CUARA', tang: ma };

    var cong = null;
    if (typeof G.tvCongPhi === 'function') { try { cong = G.tvCongPhi(nha); } catch (e) { cong = null; } }

    return {
      tang: ma,
      ngay: ds[0].ngay,
      cua: ds.map(function (c) {
        var r = { ma: c.ma, ten: c.ten, loai: c.loai, loi: c.loi, quaCongPhi: !!c.quaCongPhi };
        if (!c.quaCongPhi) { r.mo = true; return r; }
        if (!cong) { r.mo = false; r.viChua = 'Chưa hỏi được cổng phí — thiếu dữ liệu nhà mình. Cổng đóng.'; return r; }
        r.mo = !!cong.noiPhi;
        if (!r.mo) r.viChua = cong.vi || 'Cổng phí chưa mở. Khép chặng bình thường, không nói phí.';
        if (r.mo && c.tangKe) {
          var g = G.t34Gia(c.tangKe);
          if (g && g.gia !== undefined) { r.giaTangKe = g.gia; r.moiNgay = g.moiNgay; }
          else r.giaChuaDoc = true;
        }
        return r;
      }),
      cam: (G.T34_CUARA_LUAT || {}).camTuyetDoi || '',
      viCam: (G.T34_CUARA_LUAT || {}).viCamTuyetDoi || ''
    };
  };

  G.t34Kho = function (tang) {
    var ma = maTang(tang);
    return (G.T34_KHO || []).filter(function (k) { return !ma || k.tang === ma; });
  };
  G.t34Kpi = function (tang) {
    var ma = maTang(tang);
    return (G.T34_KPI || []).filter(function (k) { return !ma || k.tang === ma; });
  };

  /* ═══════════ KHOÁ 1: RANH GIỚI VAI KHÔNG ĐƯỢC MỜ ═══════════ */
  G.t34SoiVai = function () {
    var ds = G.T34_VAI || [], loi = [], thay = {};
    if (!ds.length) return { chuaDo: true, thieu: 'T34_VAI', loi: [] };
    ds.forEach(function (v) {
      var n = '"' + v.viec + '"';
      if (v.cua !== 'ai' && v.cua !== 'coach') loi.push(n + ' chủ lạ: ' + v.cua);
      if (!(v.tang || []).length) loi.push(n + ' chưa khai tầng');
      (v.tang || []).forEach(function (t) {
        if (t !== 'T3' && t !== 'T4') loi.push(n + ' khai tầng ngoài phạm vi: ' + t);
      });
      if (!v.vi) loi.push(n + ' chưa nói vì sao');
      var k = bo(v.viec);
      if (thay[k]) loi.push(n + ' khai hai lần');
      thay[k] = 1;
    });
    /* Cả hai vai đều phải có việc. Bảng chỉ có một vai là bảng không
       phân được ranh giới nào cả. */
    ['ai', 'coach'].forEach(function (v) {
      if (!ds.filter(function (x) { return x.cua === v; }).length)
        loi.push('không việc nào thuộc ' + v);
    });
    return { chuaDo: false, loi: loi, soViec: ds.length,
      cuaAi: ds.filter(function (x) { return x.cua === 'ai'; }).length,
      cuaCoach: ds.filter(function (x) { return x.cua === 'coach'; }).length };
  };

  /* ═══════════ KHOÁ 2: BA TRỤ ĐÚNG THỨ TỰ TRONG CHÍNH KHO ═══════════ */
  G.t34SoiThuTu = function () {
    var ds = G.T34_BATRU || [], loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'T34_BATRU', loi: [] };
    var dung = ['THAIDO', 'KYNANG', 'KIENTHUC'];
    ds.slice().sort(function (a, b) { return a.thu - b.thu; }).forEach(function (t, i) {
      if (t.ma !== dung[i]) loi.push('trụ thứ ' + (i + 1) + ' là ' + t.ma + ', phải là ' + dung[i]);
      if (t.thu !== i + 1) loi.push(t.ma + ' mang số thứ tự ' + t.thu);
    });
    if (ds.length !== 3) loi.push('có ' + ds.length + ' trụ, phải ba');
    var l = G.T34_BATRU_LUAT || {};
    if (!l.thuTuBaoCao) loi.push('chưa khai thứ tự báo cáo');
    if (!l.viNguoc) loi.push('chưa nói vì sao thứ tự ngược với câu phụ huynh hỏi');
    return { chuaDo: false, loi: loi };
  };

  /* ═══════════ KHOÁ 3: CỬA LÊN TẦNG PHẢI QUA CỔNG ═══════════ */
  G.t34SoiCuaRa = function () {
    var ds = G.T34_CUARA || [], loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'T34_CUARA', loi: [] };
    ds.forEach(function (c) {
      if (c.loai === 'len-tang' || c.loai === 'gia-han') {
        if (c.quaCongPhi !== true) loi.push(c.ma + ' mời lên tầng mà không qua cổng phí');
        if (c.loai === 'len-tang' && !c.tangKe) loi.push(c.ma + ' chưa khai tầng kế');
      }
      /* Con số tiền trong lời thoại là bản thứ hai của HP_TANG.gia. */
      if (/\d[\d.,]*\s*(triệu|nghìn|đồng|đ\/)/i.test(String(c.loi || '')))
        loi.push(c.ma + ' có con số tiền nằm cứng trong lời');
    });
    ['T3', 'T4'].forEach(function (t) {
      var n = ds.filter(function (c) { return c.tang === t; }).length;
      if (n < 3) loi.push(t + ' chỉ có ' + n + ' cửa, sổ tay ghi ba');
    });
    return { chuaDo: false, loi: loi, soCua: ds.length };
  };

  /* ═══════════════════════════════════════════════════════════
     MÀN HÌNH
     ═══════════════════════════════════════════════════════════ */
  G.VIEWS['tang34'] = function () {
    if (!G.T34_VAI)
      return U.empty('Chưa mở được phần này',
        'Phần này nằm trong gói nghề. Đăng nhập bằng tài khoản có quyền nghề để nạp.');

    var loi = G.T34_LOI || {};
    var o = U.ph({ eyebrow: 'TẦNG 3 · TẦNG 4', ic: 'compass', grad: 1,
      t: 'Việc của Trợ lý, việc của Coach — và lằn ranh giữa hai bên',
      lead: 'Chín mươi ngày và ba trăm sáu lăm ngày. Đây là chỗ người thật bước vào ' +
        'và đứng cạnh máy suốt bốn trăm năm mươi lăm ngày.' });

    o += '<div class="card mb" style="border-color:#0B667556">' +
      '<p style="line-height:1.9;font-size:1.05em"><b>' + h(loi.vaiChuyen || '') + '</b></p>' +
      '<p class="sm mt" style="line-height:1.8"><b>Tầng 3 —</b> ' + h(loi.t3 || '') + '</p>' +
      '<p class="sm" style="line-height:1.8"><b>Tầng 4 —</b> ' + h(loi.t4 || '') + '</p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(loi.viDiChung || '') + '</p></div>';

    o += G.kaKhung ? G.kaKhung('tang34', 'dau') : '';

    /* ── Ranh giới vai ── */
    var sv = G.t34SoiVai();
    o += U.sec('Việc nào của máy, việc nào của người' + (sv.loi && sv.loi.length ? ' — LỆCH: ' + sv.loi.join(' · ') : ''),
      (G.T34_VAI_LUAT || {}).hailoi || '');
    o += '<div class="card mb">' + (G.T34_VAI || []).map(function (v) {
      var la = v.cua === 'ai';
      var mau = la ? '#0B6675' : '#B4720F';
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<span class="tiny up" style="color:' + mau + '"><b>' + (la ? 'TRỢ LÝ' : 'COACH') + '</b></span> ' +
        '<span class="tiny dim">' + h((v.tang || []).join(' · ')) + '</span>' +
        '<p class="sm mt" style="line-height:1.8"><b>' + h(v.viec) + '</b>' +
        (v.han ? ' <span class="tiny dim">— ' + h(v.han) + '</span>' : '') + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(v.vi) + '</p>' +
        (v.camAiLam ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(v.camAiLam) + '</p>' : '') +
        (v.nhungPhaiQua ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">Máy đề nghị, ' +
          h(v.nhungPhaiQua) + ' chốt.</p>' : '') +
        (v.dieuKien ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Điều kiện: ' + h(v.dieuKien) + '</p>' : '') +
        '</div>';
    }).join('') + '</div>';
    o += '<p class="tiny dim mb" style="line-height:1.7">' +
      h((G.T34_VAI_LUAT || {}).viCoachKhongOmNhip || '') + '</p>';

    /* ── Khuôn năm nhịp ── */
    var gl = G.T34_GITSA_LUAT || {};
    o += U.sec('Năm nhịp dựng một tin nhắn — G-I-T-S-A', gl.cot || '');
    o += '<div class="card mb">' + (G.T34_GITSA || []).map(function (n) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(n.nhip) + ' — ' + h(n.ten) + '</b> ' +
        (n.luocDuoc ? '<span class="tiny dim">lược được ở tin ngắn</span>'
                    : '<span class="tiny" style="color:#BE0E16">KHÔNG bao giờ lược</span>') +
        '<p class="sm mt" style="line-height:1.8">' + h(n.lam) + '</p>' +
        (n.tuNen ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Từ nên dùng: ' +
          h((n.tuNen || []).join(' · ')) + '</p>' : '') +
        (n.tuTranh ? '<p class="tiny" style="line-height:1.7;color:#BE0E16">Từ phải tránh: ' +
          h((n.tuTranh || []).join(' · ')) + '</p>' : '') +
        '</div>';
    }).join('') + '</div>';
    o += '<p class="tiny dim mb" style="line-height:1.7">' + h(gl.viIvaT || '') + '<br>' +
      h(gl.khongDaChuoiNamVong || '') + '</p>';

    /* ── Ba trụ, và một báo cáo dựng thật ── */
    var st = G.t34SoiThuTu();
    var bt = G.T34_BATRU_LUAT || {};
    o += U.sec('Ba trụ đo, và thứ tự báo cáo' + (st.loi && st.loi.length ? ' — LỆCH: ' + st.loi.join(' · ') : ''),
      bt.thuTuBaoCao || '');
    o += '<div class="card mb">' + (G.T34_BATRU || []).map(function (t) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<span class="tiny up" style="color:' + t.c + '"><b>' + t.thu + '. ' + h(t.ten) + '</b></span>' +
        '<p class="sm mt" style="line-height:1.8">' + h(t.la) + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">Lấy từ: ' + h(t.docTuDau) + '</p></div>';
    }).join('') + '</div>';
    o += '<div class="card mb" style="border-color:#B4720F44">' +
      '<p class="tiny up dim">CÂU MỞ CHUẨN — NÓI Ở BÁO CÁO ĐẦU TIÊN</p>' +
      '<p class="sm mt" style="line-height:1.8">&ldquo;' + h(bt.loiMoChuan || '') + '&rdquo;</p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(bt.viNguoc || '') + '</p>' +
      '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(bt.kienThucChuyenTre || '') + '</p></div>';

    o += G.kaKhung ? G.kaKhung('tang34', 'giua') : '';

    /* ── Tầng 3: ba chặng ── */
    o += U.sec('Tầng 3 — ba chặng ba mươi ngày', 'Coach gặp bốn lần: ngày 10, 30, 60, 90.');
    o += (G.T34_T3_CHANG || []).map(function (c) {
      return '<div class="card mb" style="border-color:' + c.c + '4d">' +
        '<span class="tiny up" style="color:' + c.c + '">CHẶNG ' + c.so + ' · NGÀY ' + h(c.ngay) +
        ' · TRỤ ' + h((c.tru || []).join(' + ')) + '</span>' +
        '<p class="mt" style="line-height:1.9"><b>' + h(c.chuDe) + '</b></p>' +
        '<p class="sm mt" style="line-height:1.8">Sản phẩm cuối chặng: ' + h(c.sanPham) + '</p>' +
        '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
        (c.moc || []).map(function (m) { return '<li>' + h(m) + '</li>'; }).join('') + '</ul></div>';
    }).join('');

    /* Ba nhánh khám phá */
    if (G.T34_NHANH) {
      o += U.sec('Ba nhánh khám phá thế mạnh', (G.T34_NHANH_LUAT || {}).cot || '');
      o += '<div class="card mb">' + (G.T34_NHANH || []).map(function (n) {
        return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
          '<b class="sm">' + h(n.ten) + '</b>' +
          '<p class="tiny mt" style="line-height:1.7">Thử: ' + h(n.thu) + '</p>' +
          '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Máy ghi: ' +
          h((n.ghiGi || []).join(' · ')) + '</p>' +
          '<p class="tiny mt" style="line-height:1.7">Cửa mạnh: ' + h(n.cuaManh) + '</p>' +
          '<p class="tiny mt" style="line-height:1.8">&ldquo;' + h(n.loiMoi) + '&rdquo;</p></div>';
      }).join('') + '</div>';
      o += '<p class="tiny dim mb" style="line-height:1.7">' +
        h((G.T34_NHANH_LUAT || {}).viGhiHanhVi || '') + '<br>' +
        h((G.T34_NHANH_LUAT || {}).banDoSaiLaViecDaTra || '') + '</p>';
    }

    /* Buông có kiểm soát */
    if (G.T34_BUONG) {
      o += U.sec('Tuần 9 đến 12 — buông có kiểm soát', (G.T34_BUONG_LUAT || {}).cot || '');
      o += '<div class="card mb">' + (G.T34_BUONG || []).map(function (b) {
        return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
          '<b class="sm">Tuần ' + b.tuan + ' — bỏ: ' + h(b.bo) + '</b>' +
          '<p class="tiny mt" style="line-height:1.8">&ldquo;' + h(b.noiVoiNha) + '&rdquo;</p></div>';
      }).join('') + '</div>';
      o += '<p class="tiny mb" style="line-height:1.7;color:#BE0E16">' +
        h((G.T34_BUONG_LUAT || {}).loiThuongGap || '') + '</p>';
      o += '<div class="card mb">' + (G.T34_BUONG_BAY || []).map(function (b) {
        return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
          '<b class="sm">Bẫy: ' + h(b.bay) + '</b>' +
          '<p class="tiny dim mt" style="line-height:1.7">Dấu hiệu: ' + h(b.dauHieu) + '</p>' +
          (b.khongLam ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(b.khongLam) + '</p>' : '') +
          '<p class="tiny mt" style="line-height:1.8">&ldquo;' + h(b.xuLy) + '&rdquo;</p></div>';
      }).join('') + '</div>';
    }

    /* ── Tầng 4: bốn mùa ── */
    o += U.sec('Tầng 4 — bốn quý, bốn mùa', 'Coach gặp mười hai lần, mỗi tháng một buổi.');
    o += (G.T34_T4_MUA || []).map(function (q) {
      return '<div class="card mb" style="border-color:' + q.c + '4d">' +
        '<span class="tiny up" style="color:' + q.c + '">QUÝ ' + q.quy + ' · THÁNG ' + h(q.thang) +
        ' · ' + h(q.mua).toUpperCase() + '</span>' +
        '<p class="mt" style="line-height:1.9"><b>' + h(q.chuDe) + '</b></p>' +
        '<p class="sm mt" style="line-height:1.8">Sản phẩm cuối quý: ' + h(q.sanPham) + '</p>' +
        (q.loiChuyen ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(q.loiChuyen) + '</p>' : '') +
        '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
        (q.moc || []).map(function (m) { return '<li>' + h(m) + '</li>'; }).join('') + '</ul></div>';
    }).join('');

    if (G.T34_T4_NHIP) {
      o += '<div class="card mb"><span class="tiny up dim">NHỊP VẬN HÀNH TẦNG 4</span>' +
        (G.T34_T4_NHIP || []).map(function (n) {
          var ten = n.cua === 'ai' ? 'TRỢ LÝ' : (n.cua === 'coach' ? 'COACH' : 'CẢ HỆ');
          return '<p class="sm mt" style="line-height:1.8"><b>' + h(n.nhip) + ' · ' + ten + ':</b> ' +
            h(n.lam) + '</p>' +
            (n.vi ? '<p class="tiny dim" style="line-height:1.7">' + h(n.vi) + '</p>' : '') +
            (n.chuanBi ? '<p class="tiny" style="line-height:1.7;color:#B4720F">' + h(n.chuanBi) + '</p>' : '');
        }).join('') + '</div>';
    }

    if (G.T34_CHUQUYEN_CON) {
      var cq = G.T34_CHUQUYEN_CON;
      o += '<div class="card mb" style="border-color:#0B667544">' +
        '<span class="tiny up" style="color:#0B6675">CHỦ QUYỀN CỦA CON · TỪ ' + h(cq.tuTang) + '</span>' +
        '<p class="mt" style="line-height:1.9"><b>' + h(cq.luat) + '</b></p>' +
        '<p class="sm mt" style="line-height:1.8">Điều kiện: ' + h(cq.dieuKien) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7">Nếu không mở: ' + h(cq.neuKhongMo) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(cq.meBietKhongCanThiep) + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(cq.vi) + '</p></div>';
    }

    /* ── Hai kịch bản phải thuộc ── */
    var tb = G.T34_THATBAI;
    if (tb) {
      o += U.sec('Kịch bản thất bại công khai — bắt buộc thuộc', tb.viBatBuoc || '');
      o += '<div class="card mb" style="border-color:#BE0E1644">' +
        (tb.buoc || []).map(function (b) {
          return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
            '<b class="sm">' + h(b.khi) + '</b>' +
            (b.khongLam ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(b.khongLam) + '</p>' : '') +
            '<p class="tiny mt" style="line-height:1.7">' + h(b.lam) + '</p>' +
            (b.loiNoi ? '<p class="sm mt" style="line-height:1.8">&ldquo;' + h(b.loiNoi) + '&rdquo;</p>' : '') +
            (b.luat ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F"><b>' + h(b.luat) + '</b></p>' : '') +
            '</div>';
        }).join('') +
        '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>' + h(tb.loiNguyHiemNhat) + '</b></p></div>';
    }

    var dn = G.T34_DENNHAY;
    if (dn) {
      o += U.sec('Chế độ Đèn nháy — có cửa ngõ lớn trong lộ trình', dn.batKhiNao || '');
      o += '<div class="card mb">' + (dn.buoc || []).map(function (b) {
        return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
          '<b class="sm">' + b.no + '. ' + h(b.lam) + '</b>' +
          (b.vi ? '<p class="tiny dim mt" style="line-height:1.7">' + h(b.vi) + '</p>' : '') +
          (b.baCau ? '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
            (b.baCau || []).map(function (c) { return '<li>' + h(c) + '</li>'; }).join('') + '</ul>' : '') +
          (b.cam ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(b.cam) + '</p>' : '') +
          (b.loiNoi ? '<p class="tiny mt" style="line-height:1.8">&ldquo;' + h(b.loiNoi) + '&rdquo;</p>' : '') +
          '</div>';
      }).join('') +
        '<p class="tiny mt" style="line-height:1.7;color:#B4720F"><b>' + h(dn.ketQuaThiKhongDoLoTrinh) + '</b></p></div>';
    }

    /* ── Mười bốn dạng khó ── */
    o += U.sec('Mười bốn dạng khó — sáu của tầng 3, tám của tầng 4',
      'Mỗi dạng kèm câu nói. Câu nói là chỗ dễ hỏng nhất, nên nó ghi nguyên văn.');
    o += '<div class="card mb">' + (G.T34_KHO || []).map(function (k) {
      var mau = k.tang === 'T3' ? '#0B6675' : '#B4720F';
      return '<div style="padding:10px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<span class="tiny up" style="color:' + mau + '">' + h(k.ma) + ' · ' + h(k.tang) +
        (k.aiXu === 'coach' ? ' · COACH XỬ' : '') + '</span>' +
        '<p class="sm mt" style="line-height:1.8"><b>' + h(k.ten) + '</b></p>' +
        (k.khongCoiThuong ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>' + h(k.khongCoiThuong) + '</b></p>' : '') +
        '<p class="tiny mt" style="line-height:1.7">' + h(k.xuLy) + '</p>' +
        (k.ngheAiTruoc ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(k.ngheAiTruoc) + '</p>' : '') +
        (k.noiVoiNha ? '<p class="tiny mt" style="line-height:1.8">&ldquo;' + h(k.noiVoiNha) + '&rdquo;</p>' : '') +
        (k.luat ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F"><b>' + h(k.luat) + '</b></p>' : '') +
        (k.cam ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(k.cam) + '</p>' : '') +
        (k.khiNaoChuyen ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(k.khiNaoChuyen) + '</p>' : '') +
        (k.khiNaoChuyenTuyen ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(k.khiNaoChuyenTuyen) + '</p>' : '') +
        (k.neuEpGayGat ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(k.neuEpGayGat) + '</p>' : '') +
        (k.neuConMuonTuDi ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(k.neuConMuonTuDi) + '</p>' : '') +
        (k.loTrinh ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(k.loTrinh) + '</p>' : '') +
        (k.vi ? '<p class="tiny dim mt" style="line-height:1.7">' + h(k.vi) + '</p>' : '') +
        (k.viKhongCam ? '<p class="tiny dim mt" style="line-height:1.7">' + h(k.viKhongCam) + '</p>' : '') +
        '</div>';
    }).join('') + '</div>';

    /* ── Hồ sơ năm ── */
    var hs = G.T34_HOSO;
    if (hs) {
      o += U.sec('Hồ sơ tài năng năm — sản phẩm lớn nhất tầng 4', hs.aiSoan || '');
      o += '<div class="card mb">' + (hs.muc || []).map(function (m) {
        return '<div style="padding:7px 0;border-bottom:1px solid var(--gita-vien-2)">' +
          '<b class="sm">' + h(m.ma) + ' · ' + h(m.ten) + '</b>' +
          (m.batBuoc ? ' <span class="tiny" style="color:#BE0E16">BẮT BUỘC CÓ</span>' : '') +
          (m.viBatBuoc ? '<p class="tiny dim mt" style="line-height:1.7">' + h(m.viBatBuoc) + '</p>' : '') +
          '</div>';
      }).join('') +
        '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(hs.dichSoMuc) + '</p></div>';
    }

    /* ── Ba cửa của ngày cuối, chạy thật qua cổng phí ── */
    var scr = G.t34SoiCuaRa();
    o += U.sec('Ba cửa của ngày cuối' + (scr.loi && scr.loi.length ? ' — LỆCH: ' + scr.loi.join(' · ') : ''),
      (G.T34_CUARA_LUAT || {}).loiTuSoTayCuaTuTvCongPhi || '');
    ['T3', 'T4'].forEach(function (t) {
      var r = G.t34CuaRa(t, typeof G.myFamily === 'function' ? G.myFamily() : null);
      if (r.chuaDo) return;
      o += '<div class="card mb"><span class="tiny up dim">' + h(r.tang) + ' · NGÀY ' + r.ngay + '</span>' +
        (r.cua || []).map(function (c) {
          return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
            '<b class="sm">' + h(c.ten) + '</b> ' +
            (c.quaCongPhi
              ? (c.mo ? '<span class="tiny" style="color:#0B6675">cổng phí MỞ</span>'
                      : '<span class="tiny" style="color:#B4720F">cổng phí CHƯA MỞ</span>')
              : '<span class="tiny dim">không qua cổng phí</span>') +
            '<p class="tiny mt" style="line-height:1.8">&ldquo;' + h(c.loi) + '&rdquo;</p>' +
            (c.viChua ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(c.viChua) + '</p>' : '') +
            (c.moiNgay !== undefined
              ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Giá tầng kế đọc từ HP_TANG: ' +
                Number(c.giaTangKe).toLocaleString('vi-VN') + ' đồng — khoảng ' +
                Number(c.moiNgay).toLocaleString('vi-VN') + ' đồng mỗi ngày, tính tại chỗ.</p>'
              : '') +
            '</div>';
        }).join('') + '</div>';
    });
    o += '<p class="tiny mb" style="line-height:1.7;color:#BE0E16"><b>' +
      h((G.T34_CUARA_LUAT || {}).camTuyetDoi || '') + '</b> ' +
      h((G.T34_CUARA_LUAT || {}).viCamTuyetDoi || '') + '</p>';
    o += '<p class="tiny dim mb" style="line-height:1.7">' +
      h((G.T34_CUARA_LUAT || {}).congDongThiVanKhanhThanh || '') + '</p>';

    /* ── KPI ── */
    o += U.sec('KPI hai tầng', (G.T34_KPI_LUAT || {}).motDichBangMotTram || '');
    ['T3', 'T4'].forEach(function (t) {
      var ds = G.t34Kpi(t);
      if (!ds.length) return;
      o += '<div class="card mb"><span class="tiny up dim">' + t + '</span>' + ds.map(function (k) {
        return '<div style="padding:7px 0;border-bottom:1px solid var(--gita-vien-2)">' +
          '<b class="sm">' + h(k.ten) + '</b> ' +
          '<span class="tiny" style="color:#0B6675">' + (k.nguoc ? '≤ ' : '≥ ') +
          h(String(k.dich)) + ' ' + h(k.donVi) + '</span>' +
          '<p class="tiny dim mt" style="line-height:1.7">' + h(k.y) + '</p></div>';
      }).join('') + '</div>';
    });
    o += '<p class="tiny dim mb" style="line-height:1.7">' +
      h((G.T34_KPI_LUAT || {}).viKhongChep || '') + '</p>';

    if (G.T34_AUDIT) {
      o += U.sec('Audit hai tầng', 'Đọc gì, và soi vào đâu.');
      o += '<div class="card mb">' + (G.T34_AUDIT || []).map(function (a) {
        return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
          '<b class="sm">' + h(a.tang) + ' — ' + h(a.matDo) + '</b>' +
          (a.viThua ? '<p class="tiny dim mt" style="line-height:1.7">' + h(a.viThua) + '</p>' : '') +
          '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
          (a.trongDiem || []).map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') +
          '</ul></div>';
      }).join('') + '</div>';
    }

    /* ── Chỗ lệch ── */
    o += U.sec('Chỗ sổ tay lệch với kho', 'Máy đọc kho. Chỗ lệch ghi ra, không tự chọn hộ.');
    o += '<div class="card mb">' + (G.T34_LECH || []).map(function (l) {
      return '<div style="padding:10px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(l.ma) + ' · ' + h(l.o) + '</b>' +
        '<p class="tiny mt" style="line-height:1.7"><b>Sổ tay:</b> ' + h(l.taiLieu) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7"><b>Kho:</b> ' + h(l.kho) + '</p>' +
        (l.vanDe ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(l.vanDe) + '</p>' : '') +
        (l.phepChia ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(l.phepChia) + '</p>' : '') +
        (l.dayLaLanThuMay ? '<p class="tiny mt" style="line-height:1.7">' + h(l.dayLaLanThuMay) + '</p>' : '') +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(l.mayLam) + '</p>' +
        (l.noHoSo ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Hồ sơ đã mở ở: ' + h(l.noHoSo) + '</p>' : '') +
        (l.suaGhiCu ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(l.suaGhiCu) + '</p>' : '') +
        (l.canGi ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>Cần: ' + h(l.canGi) + '</b></p>' : '') +
        (l.daRo ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Chỗ này không cần chủ hệ quyết.</p>' : '') +
        '</div>';
    }).join('') + '</div>';

    o += G.kaKhung ? G.kaKhung('tang34', 'cuoi') : '';
    return o;
  };
})();

})();

/* ═════════ src/tang5-pro.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÁY CHẠY DÒNG T5-PRO

   Kho chuẩn ở kho-goc/data.tang5-pro.js. Toàn bộ ở gói NGHỀ, khoá ở
   quyền dừng tại Senior Coach.

   ═══ NĂM CÁI MỞ ═══

   t5pSangLoc(diem)     sáu điểm vào, một phán quyết ra. Không phải
                        phép cộng: hai tiêu chí loại cứng chặn TRƯỚC
                        khi nhìn tổng.
   t5pTuChoi(ma)        kịch bản từ chối, nguyên văn.
   t5pGiaiDoan(thang)   tháng thứ mấy thì đang ở giai đoạn nào.
   t5pNghiThuc(gd)      nghi thức nào được phép chạy ở giai đoạn này.
   t5pNhanCase(bang)    Coach này đã đủ chuẩn cầm case chưa.

   ═══ MỘT CÁI TỪ CHỐI ═══

   t5pBaoGia() KHÔNG báo giá. Tài liệu ghi một con số, kho chưa có
   dòng nào trong HP_TANG. Luật HP_LUAT đã chốt từ lâu: chưa điền giá
   thì màn không hiện bảng giá — và luật ấy không có ngoại lệ cho một
   con số vừa đọc được trong một tài liệu.

   Hàm này trả về con số của TÀI LIỆU kèm nhãn, để Coach biết nó tồn
   tại, nhưng cờ baoDuoc luôn là false cho tới khi giá vào bảng.

   ═══ BỐN CÁI KHOÁ ═══

   t5pSoiKhongPhaiTang()  quan trọng nhất tệp. Nó đỏ nếu có bản ghi
                          nào của dòng này mang một tầng thứ sáu, hoặc
                          nếu HP_TANG khác năm dòng. Đây là phép kiểm
                          giữ cho một lần biên soạn tài liệu KHÔNG âm
                          thầm đổi số tầng của cả hệ.
   t5pSoiDaoDuc()         mười hai điều, đủ bốn cụm, mỗi điều có chi
                          tiết hoặc hậu quả.
   t5pSoiNangLuc()        mười một năng lực, ba cụm, và đúng ba cái
                          đòi M4 — N1, N2, N9.
   t5pSoiNghiThuc()       bảy nghi thức, mỗi cái khai giai đoạn sớm
                          nhất, và giai đoạn ấy nằm trong 1..4.

   ═══ VÌ SAO t5pSangLoc() CHẶN TRƯỚC KHI CỘNG ═══

   Nếu cộng trước rồi mới xét loại cứng, mã vẫn ra đúng kết quả —
   nhưng người đọc màn hình thấy "tổng 19, nhận" rồi mới thấy dòng
   từ chối bên dưới, và cái đọng lại là con số 19.

   Sổ tay nói chính xác chỗ hỏng ấy: gia đình giàu, lịch sự, tổng
   điểm đẹp, mà không có người quyết. Nên hàm này trả về phán quyết
   TỪ CHỐI trước, và tổng điểm chỉ là dữ liệu kèm theo.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h;
  var MUC_BAC = { M1: 1, M2: 2, M3: 3, M4: 4 };

  function coKho(ten) { return G[ten] !== undefined && G[ten] !== null; }

  /* ═══════════ MỞ 1: CỬA VÀO ═══════════

     diem là một đối tượng {1:4, 2:3, …, 6:2} hoặc một mảng sáu số.
     Thiếu tiêu chí nào thì KHÔNG đoán bằng 0 và cũng không bỏ qua —
     trả về chuaChamDu, kèm tên tiêu chí còn trống. Chấm thiếu mà ra
     phán quyết là phán quyết trên dữ liệu chưa có. */
  G.t5pSangLoc = function (diem) {
    var ds = G.T5P_SANGLOC || [], l = G.T5P_SANGLOC_LUAT || {};
    if (!ds.length) return { chuaDo: true, thieu: 'T5P_SANGLOC' };
    diem = diem || {};

    var thieu = [], tong = 0, bang = [];
    ds.forEach(function (t, i) {
      var v = diem[t.so] !== undefined ? diem[t.so] : diem[i];
      if (v === undefined || v === null || v === '') { thieu.push(t.so + '. ' + t.ten); return; }
      v = Number(v);
      if (!(v >= 0 && v <= 4)) { thieu.push(t.so + '. ' + t.ten + ' — điểm ngoài thang 0–4'); return; }
      tong += v;
      bang.push({ so: t.so, ten: t.ten, diem: v, loaiCung: !!t.loaiCung });
    });
    if (thieu.length) return { chuaChamDu: true, thieu: thieu, daCham: bang.length, can: ds.length };

    /* Loại cứng chặn TRƯỚC khi nhìn tổng — xem đầu tệp. */
    var pham = bang.filter(function (b) { return b.loaiCung && b.diem <= 1; });
    if (pham.length) return {
      ket: 'khong-nhan', loaiCung: true, tong: tong,
      phamTieuChi: pham.map(function (b) { return b.so + '. ' + b.ten + ' — ' + b.diem + ' điểm'; }),
      vi: l.viLoaiCung || '',
      luat: l.loaiCung || '',
      bang: bang,
      buocTiep: 'Dùng kịch bản từ chối mở cửa, hẹn tái khám.'
    };

    var ng = (l.nguong || []).filter(function (n) { return tong >= n.tu && tong <= n.den; })[0];
    return {
      ket: ng ? ng.ket : 'khong-ro', tong: tong, tran: ds.length * 4,
      noi: ng ? ng.noi : '', viDu: ng ? ng.viDu : undefined,
      bang: bang, loaiCung: false,
      nhacChamThap: l.viChamThap || '',
      aiCham: l.khongTuChamTuQuyet || ''
    };
  };

  /* ═══════════ MỞ 2: KỊCH BẢN TỪ CHỐI ═══════════ */
  G.t5pTuChoi = function (ma) {
    var ds = G.T5P_TUCHOI || [];
    if (!ds.length) return { chuaDo: true, thieu: 'T5P_TUCHOI' };
    if (!ma) return { ds: ds.slice(), luat: (G.T5P_TUCHOI_LUAT || []).slice() };
    var k = ds.filter(function (t) { return t.ma === String(ma).toUpperCase(); })[0];
    if (!k) return { khongCo: true, ma: ma, coNhung: ds.map(function (t) { return t.ma; }) };
    return {
      ma: k.ma, ten: k.ten, tinHieu: k.tinHieu, loi: k.loi,
      duongRa: k.duongRa, ranhGioi: k.ranhGioi, camTuyetDoi: k.camTuyetDoi,
      sauDo: (G.T5P_SAUTUCHOI || []).slice()
    };
  };

  /* ═══════════ MỞ 3: THÁNG NÀY LÀ GIAI ĐOẠN NÀO ═══════════ */
  G.t5pGiaiDoan = function (thang) {
    var ds = G.T5P_GIAIDOAN || [];
    if (!ds.length) return { chuaDo: true, thieu: 'T5P_GIAIDOAN' };
    var n = Number(thang) || 0;
    var tong = (G.T5P_LOI || {}).thoiHan || 24;
    if (n < 1 || n > tong) return { ngoaiLoTrinh: true, thang: n, tong: tong };
    var gd = ds.filter(function (g) {
      var m = String(g.thang).split(/[–-]/);
      return n >= Number(m[0]) && n <= Number(m[1]);
    })[0];
    if (!gd) return { khongRo: true, thang: n };
    return {
      thang: n, tong: tong, giaiDoan: gd.so, ten: gd.ten, c: gd.c,
      hoi: gd.hoi, loiViec: (gd.loiViec || []).slice(), sanPham: gd.sanPham,
      nghiThucMoDuoc: G.t5pNghiThuc(gd.so).duoc
    };
  };

  /* ═══════════ MỞ 4: NGHI THỨC NÀO ĐƯỢC CHẠY ═══════════ */
  G.t5pNghiThuc = function (giaiDoan) {
    var ds = G.T5P_NGHITHUC || [];
    if (!ds.length) return { chuaDo: true, thieu: 'T5P_NGHITHUC', duoc: [], chua: [] };
    var gd = Number(giaiDoan) || 0;
    var duoc = [], chua = [];
    ds.forEach(function (n) {
      (gd >= Number(n.tuGiaiDoan) ? duoc : chua).push(n);
    });
    return {
      giaiDoan: gd,
      duoc: duoc, chua: chua,
      nhac: (G.T5P_NGHITHUC_LUAT || {}).antoanTruoc || '',
      cot: (G.T5P_NGHITHUC_LUAT || {}).cot || ''
    };
  };

  /* ═══════════ MỞ 5: COACH NÀY CẦM ĐƯỢC CASE CHƯA ═══════════

     bang là {N1:'M4', N2:'M3', …}. Thiếu năng lực nào thì báo thiếu,
     không coi là chưa đạt — chưa chấm khác với chấm rồi mà thấp. */
  G.t5pNhanCase = function (bang) {
    var ds = G.T5P_NANGLUC || [];
    if (!ds.length) return { chuaDo: true, thieu: 'T5P_NANGLUC' };
    bang = bang || {};
    var thieu = [], chuaDat = [];
    ds.forEach(function (n) {
      var m = bang[n.ma];
      if (!m) { thieu.push(n.ma + ' ' + n.ten); return; }
      var co = MUC_BAC[String(m).toUpperCase()] || 0;
      var can = MUC_BAC[n.mucToiThieu] || 0;
      if (co < can) chuaDat.push(n.ma + ' ' + n.ten + ' — đang ' + m + ', cần ' + n.mucToiThieu);
    });
    if (thieu.length) return { chuaChamDu: true, thieu: thieu, daCham: ds.length - thieu.length, can: ds.length };
    return {
      nhanDuoc: chuaDat.length === 0,
      chuaDat: chuaDat,
      chuan: (G.T5P_NANGLUC_LUAT || {}).congNhanCase || '',
      aiCham: (G.T5P_NANGLUC_LUAT || {}).aiCham || ''
    };
  };

  /* ═══════════ TỪ CHỐI: BÁO GIÁ ═══════════ */
  G.t5pBaoGia = function () {
    var g = G.T5P_GIA || {};
    if (!g.viChuaBaoGia) return { chuaDo: true, thieu: 'T5P_GIA' };

    /* Nếu một ngày chủ hệ đưa dòng này vào bảng giá thì cổng tự mở —
       không phải sửa hàm. Tìm theo tên tầng, không tìm theo con số. */
    var trongBang = null;
    if (coKho('HP_TANG'))
      trongBang = (G.HP_TANG || []).filter(function (x) {
        return /pro/i.test(String(x.tang)) || /PRO/.test(String(x.ten || ''));
      })[0] || null;

    if (trongBang && trongBang.gia !== null && trongBang.gia !== undefined)
      return { baoDuoc: true, gia: trongBang.gia, donVi: trongBang.donVi, tuBang: true };

    return {
      baoDuoc: false,
      viChua: g.viChuaBaoGia,
      giaTaiLieu: g.giaTaiLieu,
      donViTaiLieu: g.donViTaiLieu,
      nhan: 'CON SỐ CỦA TÀI LIỆU — CHƯA VÀO BẢNG GIÁ CỦA HỆ',
      luatKhac: (g.luatKhac || []).slice()
    };
  };

  G.t5pPhien = function (ma) {
    var ds = G.T5P_PHIEN || [];
    if (!ma) return ds.slice();
    return ds.filter(function (p) { return p.ma === String(ma).toUpperCase(); })[0] || null;
  };

  /* ═══════════ KHOÁ 1: KHÔNG ÂM THẦM THÀNH TẦNG THỨ SÁU ═══════════ */
  G.t5pSoiKhongPhaiTang = function () {
    var loi = [];
    if (!(G.T5P_LOI || {}).khongPhaiTangSau)
      loi.push('T5P_LOI chưa khai đây không phải tầng thứ sáu');

    /* Không bản ghi nào của dòng này được mang mã tầng. */
    ['T5P_GIAIDOAN', 'T5P_NGHITHUC', 'T5P_PHIEN', 'T5P_SANGLOC', 'T5P_TUCHOI'].forEach(function (k) {
      (G[k] || []).forEach(function (x) {
        if (x.tang !== undefined) loi.push(k + ' có bản ghi mang trường tang: ' + x.tang);
      });
    });

    /* Bảng giá phải vẫn đúng năm tầng. Kho nghề nên máy gia đình
       không có — vắng là quyền, không phải lỗi. */
    if (coKho('HP_TANG')) {
      var n = (G.HP_TANG || []).length;
      if (n !== 5) loi.push('HP_TANG có ' + n + ' dòng, phải năm — dòng PRO không được thành tầng thứ sáu');
    }
    return { chuaDo: false, loi: loi, doBangGia: coKho('HP_TANG') };
  };

  /* ═══════════ KHOÁ 2: MƯỜI HAI ĐIỀU ĐẠO ĐỨC ═══════════ */
  G.t5pSoiDaoDuc = function () {
    var ds = G.T5P_DAODUC || [], loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'T5P_DAODUC', loi: [] };
    if (ds.length !== 12) loi.push('có ' + ds.length + ' điều, sổ tay ghi mười hai');

    var cum = {}, thay = {};
    ds.forEach(function (d) {
      var n = 'điều ' + d.no;
      if (thay[d.no]) loi.push(n + ' trùng số');
      thay[d.no] = 1;
      if (!d.dieu) loi.push(n + ' thiếu nội dung');
      if (!d.cum) loi.push(n + ' chưa khai cụm');
      else cum[d.cum] = (cum[d.cum] || 0) + 1;
      /* Một điều chỉ có tên mà không nói thêm gì là một điều không
         dùng được lúc phải quyết. */
      if (!d.chiTiet && !d.hauQua && !d.vi && !d.thayVao && !d.lam && !d.huaGi)
        loi.push(n + ' chỉ có tên, không nói được gì thêm');
    });
    if (Object.keys(cum).length !== 4)
      loi.push('có ' + Object.keys(cum).length + ' cụm, sổ tay chia bốn');

    var nang = ds.filter(function (d) { return d.nangNhat; });
    if (nang.length !== 1) loi.push('phải có đúng một điều đánh dấu nặng nhất, đang có ' + nang.length);
    if ((G.T5P_DAODUC_LUAT || {}).dichViPham !== 0)
      loi.push('đích vi phạm phải bằng không');
    return { chuaDo: false, loi: loi, soDieu: ds.length, cum: cum };
  };

  /* ═══════════ KHOÁ 3: MƯỜI MỘT NĂNG LỰC ═══════════ */
  G.t5pSoiNangLuc = function () {
    var ds = G.T5P_NANGLUC || [], loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'T5P_NANGLUC', loi: [] };
    if (ds.length !== 11) loi.push('có ' + ds.length + ' năng lực, sổ tay ghi mười một');

    var maCum = (G.T5P_CUM || []).map(function (c) { return c.ma; });
    var thay = {};
    ds.forEach(function (n) {
      if (thay[n.ma]) loi.push(n.ma + ' trùng mã');
      thay[n.ma] = 1;
      if (!n.ten) loi.push(n.ma + ' thiếu tên');
      if (maCum.indexOf(n.cum) < 0) loi.push(n.ma + ' thuộc cụm không có thật: ' + n.cum);
      if (!MUC_BAC[n.mucToiThieu]) loi.push(n.ma + ' mức tối thiểu lạ: ' + n.mucToiThieu);
    });

    /* Ba cái đòi M4 là N1, N2, N9 — không phải một danh sách tuỳ ý.
       Nới một cái trong ba là nới đúng chỗ sổ tay nói không sửa được
       bằng kinh nghiệm. */
    var m4 = ds.filter(function (n) { return n.mucToiThieu === 'M4'; })
               .map(function (n) { return n.ma; }).sort().join(',');
    if (m4 !== 'N1,N2,N9') loi.push('nhóm đòi M4 đang là [' + m4 + '], phải là N1,N2,N9');

    if ((G.T5P_MUC || []).length !== 4) loi.push('thang thành thạo phải bốn mức');
    return { chuaDo: false, loi: loi, so: ds.length };
  };

  /* ═══════════ KHOÁ 4: NGHI THỨC PHẢI CÓ CỔNG ═══════════ */
  G.t5pSoiNghiThuc = function () {
    var ds = G.T5P_NGHITHUC || [], loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'T5P_NGHITHUC', loi: [] };
    if (ds.length !== 7) loi.push('có ' + ds.length + ' nghi thức, sổ tay ghi bảy');
    var soGd = (G.T5P_GIAIDOAN || []).length || 4;
    ds.forEach(function (n) {
      var t = 'nghi thức ' + n.so;
      if (!n.ten) loi.push(t + ' thiếu tên');
      if (!(Number(n.tuGiaiDoan) >= 1 && Number(n.tuGiaiDoan) <= soGd))
        loi.push(t + ' khai giai đoạn ngoài 1–' + soGd + ': ' + n.tuGiaiDoan);
      if (!n.lam) loi.push(t + ' chưa nói làm gì');
      /* Cái sâu nhất phải có điều kiện riêng — cổng giai đoạn một
         mình nó không đủ cho một nghi thức mở vết thương. */
      if (n.sauNhat && !n.dieuKienRieng) loi.push(t + ' đánh dấu sâu nhất mà không khai điều kiện riêng');
    });
    var chuaRuot = ds.filter(function (n) { return n.chuaChiTiet; }).length;
    return { chuaDo: false, loi: loi, so: ds.length, chuaRuot: chuaRuot };
  };

  G.t5pChoChu = function () { return (G.T5P_CHOCHU || []).slice(); };

  /* ═══════════════════════════════════════════════════════════
     MÀN HÌNH
     ═══════════════════════════════════════════════════════════ */
  G.VIEWS['tang5-pro'] = function () {
    if (!G.T5P_LOI)
      return U.empty('Chưa mở được phần này',
        'Phần này khoá ở quyền của Coach cấp cao. Đăng nhập bằng tài khoản có quyền ấy để nạp.');

    var loi = G.T5P_LOI;
    var o = U.ph({ eyebrow: 'DÒNG T5-PRO · GIA ĐÌNH THỊNH VƯỢNG', ic: 'vault', grad: 1,
      t: 'Hai tư tháng, và một hệ gia đình tự chạy sau khi mình rút',
      lead: 'Dòng riêng, không phải tầng thứ sáu. Khách riêng, đội ba vai, hợp đồng riêng, ' +
        'nhịp riêng — và một cửa vào chặt hơn mọi dòng khác.' });

    o += '<div class="card mb" style="border-color:#0B667556">' +
      '<p style="line-height:1.9"><b>' + h(loi.dinhVi || '') + '</b></p>' +
      '<p class="sm mt" style="line-height:1.85;font-style:italic">&ldquo;' + h(loi.tuyenNgon || '') + '&rdquo;</p>' +
      '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>' + h(loi.viKhongPhaiTangSau || '') + '</b></p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(loi.dungTrenNen || '') + '</p>' +
      '<p class="tiny mt" style="line-height:1.7;color:#0B6675"><b>Thước cuối: ' + h(loi.thuocDoCuoi || '') + '</b></p></div>';

    var skt = G.t5pSoiKhongPhaiTang();
    if (skt.loi && skt.loi.length)
      o += '<div class="card mb" style="border-color:#BE0E16"><b class="sm" style="color:#BE0E16">' +
        'LỆCH — dòng này đang chạm vào cấu trúc năm tầng: ' + h(skt.loi.join(' · ')) + '</b></div>';

    o += G.kaKhung ? G.kaKhung('tang5-pro', 'dau') : '';

    /* ── Ba trụ ── */
    o += U.sec('Ba trụ giá trị', 'Mọi truyền thông, mọi buổi tìm hiểu chỉ nói ba điều này.');
    o += '<div class="card mb">' + (G.T5P_BATRU || []).map(function (t) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<span class="tiny up" style="color:' + t.c + '"><b>' + t.so + '. ' + h(t.ten) + '</b></span>' +
        '<p class="sm mt" style="line-height:1.8">' + h(t.nhanDuoc) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">Nếu không có: ' + h(t.matNeuKhong) + '</p></div>';
    }).join('') + '</div>';

    /* ── Khác gì T5 thường ── */
    o += U.sec('Khác gì tầng 5 thường', (G.T5P_KHAC_LUAT || {}).dungKhiNao || '');
    if (U.tbl) {
      o += U.tbl(['Chiều', 'Tầng 5', 'T5-PRO'],
        (G.T5P_KHAC_T5 || []).map(function (r) {
          return ['<b>' + h(r.chieu) + '</b>', h(r.t5), '<b>' + h(r.pro) + '</b>'];
        }));
    }
    o += '<p class="tiny dim mb" style="line-height:1.7">' +
      h((G.T5P_KHAC_LUAT || {}).viKhongCoDongGia || '') + '</p>';

    /* ── Năm ranh giới ── */
    o += U.sec('T5-PRO KHÔNG là gì', 'Năm ranh giới định vị. Sai từ buổi đầu là sai cả dòng.');
    o += '<div class="card mb">' + (G.T5P_KHONGLA || []).map(function (k) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm" style="color:#BE0E16">KHÔNG: ' + h(k.khong) + '</b>' +
        '<p class="tiny mt" style="line-height:1.7">' + h(k.ranh) + '</p>' +
        (k.thayVao ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Thay vào: ' +
          h(k.thayVao) + '</p>' : '') + '</div>';
    }).join('') + '</div>';

    /* ── Cửa vào ── */
    var sl = G.T5P_SANGLOC_LUAT || {};
    o += U.sec('Cửa vào — sáu tiêu chí, và hai tiêu chí loại cứng', sl.thang || '');
    o += '<div class="card mb">' + (G.T5P_SANGLOC || []).map(function (t) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + t.so + '. ' + h(t.ten) + '</b>' +
        (t.loaiCung ? ' <span class="tiny" style="color:#BE0E16">LOẠI CỨNG</span>' : '') +
        '<p class="tiny mt" style="line-height:1.7;color:#0B6675">4 điểm: ' + h(t.bonDiem) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">0 điểm: ' + h(t.khongDiem) + '</p></div>';
    }).join('') + '</div>';
    o += '<div class="card mb" style="border-color:#BE0E1644">' +
      '<p class="sm" style="line-height:1.8"><b>' + h(sl.loaiCung || '') + '</b></p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(sl.viLoaiCung || '') + '</p>' +
      '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(sl.viChamThap || '') + '</p>' +
      '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(sl.khongTuChamTuQuyet || '') + '</p></div>';

    /* Hai ca chạy thật, để thấy cổng loại cứng làm việc. */
    var caA = G.t5pSangLoc({ 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3 });
    var caB = G.t5pSangLoc({ 1: 1, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4 });
    if (caA && caA.ket)
      o += '<div class="card mb"><span class="tiny up dim">CỔNG CHẠY THẬT</span>' +
        '<p class="sm mt" style="line-height:1.8"><b>Ca A</b> — tổng ' + caA.tong + '/' + caA.tran +
        ', không tiêu chí nào loại cứng → <b>' + h(caA.ket) + '</b></p>' +
        '<p class="sm mt" style="line-height:1.8"><b>Ca B</b> — tổng ' + caB.tong +
        ', cao hơn ca A, nhưng tiêu chí loại cứng chỉ 1 điểm → <b style="color:#BE0E16">' +
        h(caB.ket) + '</b></p>' +
        (caB.phamTieuChi ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' +
          h(caB.phamTieuChi.join(' · ')) + '</p>' : '') +
        '<p class="tiny dim mt" style="line-height:1.7">Tổng điểm che được chỗ ấy, nên nó có cửa riêng.</p></div>';

    /* ── Từ chối ── */
    o += U.sec('Nghệ thuật từ chối — năm dạng, kèm nguyên văn',
      'Từ chối không đường ra là bỏ rơi.');
    o += '<div class="card mb">' + (G.T5P_TUCHOI_LUAT || []).map(function (l) {
      return '<div style="padding:7px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + l.no + '. ' + h(l.luat) + '</b>' +
        (l.vi ? '<p class="tiny dim mt" style="line-height:1.7">' + h(l.vi) + '</p>' : '') +
        (l.mauCau ? '<p class="tiny mt" style="line-height:1.8">&ldquo;' + h(l.mauCau) + '&rdquo;</p>' : '') +
        '</div>';
    }).join('') + '</div>';
    o += (G.T5P_TUCHOI || []).map(function (t) {
      return '<div class="card mb" style="border-color:#BE0E1633">' +
        '<span class="tiny up" style="color:#BE0E16">' + h(t.ma) + '</span>' +
        '<p class="mt" style="line-height:1.9"><b>' + h(t.ten) + '</b></p>' +
        '<p class="tiny dim mt" style="line-height:1.7">Tín hiệu: ' + h(t.tinHieu) + '</p>' +
        '<div class="mt" style="padding:10px 12px;border-left:3px solid #BE0E16;background:var(--gita-nen-2)">' +
        '<p class="sm" style="line-height:1.85">&ldquo;' + h(t.loi) + '&rdquo;</p></div>' +
        (t.ranhGioi ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(t.ranhGioi) + '</p>' : '') +
        (t.camTuyetDoi ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>' +
          h(t.camTuyetDoi) + '</b></p>' : '') +
        (t.duongRa ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Đường ra: ' +
          h(t.duongRa) + '</p>' : '') + '</div>';
    }).join('');
    o += '<div class="card mb"><span class="tiny up dim">SAU KHI TỪ CHỐI — BA VIỆC BẮT BUỘC</span>' +
      (G.T5P_SAUTUCHOI || []).map(function (v) {
        return '<p class="sm mt" style="line-height:1.8"><b>' + h(v.viec) + ':</b> ' + h(v.chiTiet) + '</p>' +
          (v.vi ? '<p class="tiny dim" style="line-height:1.7">' + h(v.vi) + '</p>' : '');
      }).join('') + '</div>';

    o += G.kaKhung ? G.kaKhung('tang5-pro', 'giua') : '';

    /* ── Bốn giai đoạn ── */
    o += U.sec('Bốn giai đoạn, mỗi giai đoạn sáu tháng',
      (G.T5P_TRINHTU || {}).ngoaiLeDuyNhat || '');
    o += (G.T5P_GIAIDOAN || []).map(function (g) {
      return '<div class="card mb" style="border-color:' + g.c + '4d">' +
        '<span class="tiny up" style="color:' + g.c + '">GIAI ĐOẠN ' + g.so + ' · THÁNG ' +
        h(g.thang) + ' · ' + h(g.ten).toUpperCase() + '</span>' +
        '<p class="mt" style="line-height:1.9"><b>&ldquo;' + h(g.hoi) + '&rdquo;</b></p>' +
        '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
        (g.loiViec || []).map(function (v) { return '<li>' + h(v) + '</li>'; }).join('') + '</ul>' +
        '<p class="sm mt" style="line-height:1.8">Sản phẩm: <b>' + h(g.sanPham) + '</b></p>' +
        (g.nhipDay ? '<p class="tiny dim mt" style="line-height:1.7">' + h(g.nhipDay) + '</p>' : '') +
        (g.batDauVai ? '<p class="tiny dim mt" style="line-height:1.7">' + h(g.batDauVai) + '</p>' : '') +
        '</div>';
    }).join('');
    o += '<div class="card mb"><span class="tiny up dim">VÌ SAO KHÔNG NHẢY CÓC</span>' +
      ((G.T5P_TRINHTU || {}).luat || []).map(function (l) {
        return '<p class="sm mt" style="line-height:1.8"><b>' + h(l.buoc) + '.</b> ' + h(l.vi) + '</p>';
      }).join('') +
      '<p class="tiny mt" style="line-height:1.7;color:#B4720F"><b>' +
      h((G.T5P_TRINHTU || {}).viNgoaiLe || '') + '</b></p></div>';

    /* ── Đội ba vai ── */
    o += U.sec('Đội ba vai', 'Coach giữ danh dự của hệ, Tư vấn giữ cấu trúc, Trợ lý giữ trí nhớ.');
    o += '<div class="card mb">' + (G.T5P_DOI || []).map(function (v) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<span class="tiny up" style="color:' + v.c + '"><b>' + h(v.vai) + '</b></span>' +
        (v.chuTri ? ' <span class="tiny dim">chủ trì</span>' : '') +
        '<p class="sm mt" style="line-height:1.8">' + h(v.lamViecVoi) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7">Phạm vi: ' + h(v.phamVi) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">Không: ' +
        h((v.khongLam || []).join(' · ')) + '</p>' +
        (v.khacDongThuong ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' +
          h(v.khacDongThuong) + '</p>' : '') + '</div>';
    }).join('') + '</div>';
    o += '<div class="card mb">' + (G.T5P_PHOI_DOI || []).map(function (p) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(p.ma) + ' — ' + h(p.luat) + '</b>' +
        (p.chiTiet ? '<p class="tiny mt" style="line-height:1.7">' + h(p.chiTiet) + '</p>' : '') +
        (p.caNhan ? '<p class="tiny mt" style="line-height:1.7">' + h(p.caNhan) + '</p>' : '') +
        (p.mayKhongGiuRieng ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' +
          h(p.mayKhongGiuRieng) + '</p>' : '') +
        (p.ngoaiLeBatBuoc ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>' +
          h(p.ngoaiLeBatBuoc) + '</b></p>' : '') +
        (p.vi ? '<p class="tiny dim mt" style="line-height:1.7">' + h(p.vi) + '</p>' : '') +
        (p.noiTuPhienDau ? '<p class="tiny mt" style="line-height:1.8">&ldquo;' +
          h(p.noiTuPhienDau) + '&rdquo;</p>' : '') + '</div>';
    }).join('') + '</div>';

    /* ── Mười hai điều đạo đức ── */
    var sdd = G.t5pSoiDaoDuc();
    o += U.sec('Mười hai điều đạo đức' + (sdd.loi && sdd.loi.length ? ' — LỆCH: ' + sdd.loi.join(' · ') : ''),
      (G.T5P_DAODUC_LUAT || {}).cot || '');
    o += '<div class="card mb">' + (G.T5P_DAODUC || []).map(function (d) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<span class="tiny up dim">' + h(d.cum) + '</span> ' +
        '<b class="sm">' + d.no + '. ' + h(d.dieu) + '</b>' +
        (d.nangNhat ? ' <span class="tiny" style="color:#BE0E16">NẶNG NHẤT</span>' : '') +
        (d.chiTiet ? '<p class="tiny mt" style="line-height:1.7">' + h(d.chiTiet) + '</p>' : '') +
        (d.lam ? '<p class="tiny mt" style="line-height:1.7">' + h(d.lam) + '</p>' : '') +
        (d.thayVao ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(d.thayVao) + '</p>' : '') +
        (d.huaGi ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(d.huaGi) + '</p>' : '') +
        (d.hauQua ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>' + h(d.hauQua) + '</b></p>' : '') +
        (d.vi ? '<p class="tiny dim mt" style="line-height:1.7">' + h(d.vi) + '</p>' : '') +
        (d.khongPhaiPhucLoi ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' +
          h(d.khongPhaiPhucLoi) + '</p>' : '') + '</div>';
    }).join('') + '</div>';
    o += '<p class="tiny dim mb" style="line-height:1.7">' +
      h((G.T5P_DAODUC_LUAT || {}).daCoONen || '') + '</p>';

    /* ── Mười một năng lực ── */
    var snl = G.t5pSoiNangLuc();
    o += U.sec('Mười một năng lực, và cổng nhận case' +
      (snl.loi && snl.loi.length ? ' — LỆCH: ' + snl.loi.join(' · ') : ''),
      (G.T5P_NANGLUC_LUAT || {}).congNhanCase || '');
    (G.T5P_CUM || []).forEach(function (c) {
      var ds = (G.T5P_NANGLUC || []).filter(function (n) { return n.cum === c.ma; });
      if (!ds.length) return;
      o += '<div class="card mb"><span class="tiny up dim">' + h(c.ten) + ' — ' + h(c.hoi) + '</span>' +
        ds.map(function (n) {
          return '<p class="sm mt" style="line-height:1.8"><b>' + h(n.ma) + '</b> ' + h(n.ten) +
            ' <span class="tiny" style="color:' + (n.mucToiThieu === 'M4' ? '#BE0E16' : '#0B6675') +
            '">cần ' + h(n.mucToiThieu) + '</span></p>';
        }).join('') + '</div>';
    });
    o += '<p class="tiny mb" style="line-height:1.7;color:#B4720F">' +
      h((G.T5P_NANGLUC_LUAT || {}).viBaCaiM4 || '') + '</p>';

    /* ── Bốn loại phiên ── */
    o += U.sec('Bốn loại phiên', 'Mỗi loại một khung riêng — dùng nhầm khung là hỏng đúng loại phiên đó.');
    o += (G.T5P_PHIEN || []).map(function (p) {
      return '<div class="card mb" style="border-color:' + p.c + '4d">' +
        '<span class="tiny up" style="color:' + p.c + '">' + h(p.ten).toUpperCase() + ' · ' +
        h(String(p.phut)) + ' PHÚT · ' + p.soNhip + ' NHỊP' +
        (p.tuoi ? ' · ' + h(p.tuoi) + ' TUỔI' : '') + '</span>' +
        (p.viKhungRieng ? '<p class="tiny dim mt" style="line-height:1.7">' + h(p.viKhungRieng) + '</p>' : '') +
        (p.nhip || []).map(function (n) {
          return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
            '<b class="sm">' + n.so + '. ' + h(n.ten) + ' — ' + h(String(n.phut)) + ' phút</b>' +
            (n.traiTim ? ' <span class="tiny" style="color:' + p.c + '">trái tim phiên</span>' : '') +
            (n.lam ? '<p class="tiny mt" style="line-height:1.7">' + h(n.lam) + '</p>' : '') +
            (n.baLuat ? '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
              n.baLuat.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' : '') +
            (n.baCau ? '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
              n.baCau.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' : '') +
            (n.vungSau ? '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
              n.vungSau.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' : '') +
            (n.luatDeTai ? '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
              n.luatDeTai.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' : '') +
            (n.haiHinhThuc ? '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
              n.haiHinhThuc.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' : '') +
            (n.dieuChinh ? '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
              n.dieuChinh.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' : '') +
            (n.vong ? '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
              n.vong.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' : '') +
            (n.loi ? '<p class="tiny mt" style="line-height:1.8">&ldquo;' + h(n.loi) + '&rdquo;</p>' : '') +
            (n.chuyenHoa ? '<p class="tiny mt" style="line-height:1.8">&ldquo;' + h(n.chuyenHoa) + '&rdquo;</p>' : '') +
            (n.luat ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F"><b>' + h(n.luat) + '</b></p>' : '') +
            (n.luatDeTaiChung ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' +
              h(n.luatDeTaiChung) + '</p>' : '') +
            (n.luatDiSau ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(n.luatDiSau) + '</p>' : '') +
            (n.canhBao ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(n.canhBao) + '</p>' : '') +
            (n.khongLam ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(n.khongLam) + '</p>' : '') +
            (n.camTuyetDoi ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>' +
              h(n.camTuyetDoi) + '</b></p>' : '') +
            (n.ghi ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Ghi: ' + h(n.ghi) + '</p>' : '') +
            '</div>';
        }).join('') + '</div>';
    }).join('');

    /* ── Bảy nghi thức ── */
    var snt = G.t5pSoiNghiThuc();
    o += U.sec('Bảy nghi thức hệ, và giai đoạn sớm nhất được chạy' +
      (snt.loi && snt.loi.length ? ' — LỆCH: ' + snt.loi.join(' · ') : ''),
      (G.T5P_NGHITHUC_LUAT || {}).cot || '');
    o += '<div class="card mb">' + (G.T5P_NGHITHUC || []).map(function (n) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + n.so + '. ' + h(n.ten) + '</b> ' +
        '<span class="tiny" style="color:#0B6675">mở từ giai đoạn ' + n.tuGiaiDoan + '</span>' +
        (n.sauNhat ? ' <span class="tiny" style="color:#BE0E16">SÂU NHẤT</span>' : '') +
        (n.xuongSong ? ' <span class="tiny" style="color:#B4720F">xương sống</span>' : '') +
        '<p class="tiny mt" style="line-height:1.7">' + h(n.lam) + '</p>' +
        (n.luatPhong ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">Luật phòng: ' +
          h(n.luatPhong) + '</p>' : '') +
        (n.cauDan ? '<p class="tiny mt" style="line-height:1.8">&ldquo;' + h(n.cauDan) + '&rdquo;</p>' : '') +
        (n.giaTri ? '<p class="tiny dim mt" style="line-height:1.7">' + h(n.giaTri) + '</p>' : '') +
        (n.dieuKienRieng ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' +
          h(n.dieuKienRieng) + '</p>' : '') +
        (n.camTuyetDoi ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>' +
          h(n.camTuyetDoi) + '</b></p>' : '') +
        (n.chuaChiTiet ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">CHƯA CÓ RUỘT — ' +
          h(n.chuaChiTiet) + '</p>' : '') + '</div>';
    }).join('') + '</div>';
    o += '<p class="tiny mb" style="line-height:1.7;color:#B4720F">' +
      h((G.T5P_NGHITHUC_LUAT || {}).antoanTruoc || '') + '</p>';

    /* ── Mười khủng hoảng ── */
    o += U.sec('Mười khủng hoảng đỉnh', (G.T5P_KHUNGHOANG_LUAT || {}).cot || '');
    o += '<div class="card mb">' + (G.T5P_KHUNGHOANG || []).map(function (k) {
      return '<p class="sm" style="line-height:1.8;padding:5px 0"><b>' + k.so + '.</b> ' + h(k.ten) +
        (k.canhCua ? ' <span class="tiny" style="color:#BE0E16">— nếu đang diễn ra lúc sàng lọc thì đây là lý do TỪ CHỐI</span>' : '') +
        (k.chuyenTuyen ? ' <span class="tiny" style="color:#BE0E16">— chuyển tuyến</span>' : '') +
        (k.trongDoi ? ' <span class="tiny" style="color:#B4720F">— trong đội</span>' : '') + '</p>';
    }).join('') + '</div>';
    o += '<p class="tiny mb" style="line-height:1.7;color:#B4720F">' +
      h((G.T5P_KHUNGHOANG_LUAT || {}).chuaCoKichBan || '') + '</p>';

    /* ── Thước đo ── */
    o += U.sec('Thước đo cả dòng', '');
    o += '<div class="card mb">' + (G.T5P_DICH || []).map(function (d) {
      return '<div style="padding:7px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(d.ten) + '</b> ' +
        (d.dich !== undefined
          ? '<span class="tiny" style="color:#0B6675">' + (d.nguoc ? '= ' : '≥ ') +
            h(String(d.dich)) + ' ' + h(d.donVi) + '</span>'
          : '<span class="tiny dim">' + h(d.doBang || '') + '</span>') +
        (d.thuocTong ? ' <span class="tiny" style="color:#BE0E16">THƯỚC TỔNG</span>' : '') +
        (d.y ? '<p class="tiny dim mt" style="line-height:1.7">' + h(d.y) + '</p>' : '') + '</div>';
    }).join('') + '</div>';

    /* ── Tiền ── */
    var bg = G.t5pBaoGia();
    if (bg && !bg.chuaDo) {
      o += U.sec('Tiền', bg.baoDuoc ? '' : 'Máy CHƯA báo giá được dòng này.');
      o += '<div class="card mb" style="border-color:#B4720F55">';
      if (bg.baoDuoc) {
        o += '<p class="sm" style="line-height:1.8"><b>' +
          Number(bg.gia).toLocaleString('vi-VN') + ' đồng</b> — ' + h(bg.donVi || '') +
          ' <span class="tiny dim">đọc từ bảng giá</span></p>';
      } else {
        o += '<p class="sm" style="line-height:1.8"><b style="color:#BE0E16">' + h(bg.nhan) + ':</b> ' +
          Number(bg.giaTaiLieu).toLocaleString('vi-VN') + ' đồng — ' + h(bg.donViTaiLieu) + '</p>' +
          '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(bg.viChua) + '</p>';
      }
      o += (bg.luatKhac || []).map(function (k) {
        return '<div style="padding:7px 0;border-top:1px solid var(--gita-vien-2)">' +
          '<b class="tiny">' + h(k.khoan) + '</b>' +
          '<p class="tiny mt" style="line-height:1.7">' + h(k.chuan) + '</p>' +
          (k.vi ? '<p class="tiny dim" style="line-height:1.7">' + h(k.vi) + '</p>' : '') +
          (k.noiTruoc ? '<p class="tiny" style="line-height:1.7;color:#0B6675">' + h(k.noiTruoc) + '</p>' : '') +
          '</div>';
      }).join('') + '</div>';
    }

    /* ── Chỗ lệch ── */
    o += U.sec('Chỗ sổ tay lệch — với kho, và với chính nó', 'Máy đọc kho. Chỗ lệch ghi ra, không tự chọn hộ.');
    o += '<div class="card mb">' + (G.T5P_LECH || []).map(function (l) {
      return '<div style="padding:10px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(l.ma) + ' · ' + h(l.o) + '</b>' +
        (l.tuMauThuan ? ' <span class="tiny" style="color:#B4720F">tài liệu tự mâu thuẫn</span>' : '') +
        '<p class="tiny mt" style="line-height:1.7"><b>Sổ tay:</b> ' + h(l.taiLieu) + '</p>' +
        (l.kho ? '<p class="tiny mt" style="line-height:1.7"><b>Kho:</b> ' + h(l.kho) + '</p>' : '') +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(l.mayLam) + '</p>' +
        (l.viKhongTuThem ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' +
          h(l.viKhongTuThem) + '</p>' : '') +
        (l.canGi ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>Cần: ' + h(l.canGi) + '</b></p>' : '') +
        '</div>';
    }).join('') + '</div>';

    /* ── Chờ chủ hệ ── */
    o += U.sec('Ba câu chờ chủ hệ', 'Mã không tự trả lời được ba câu này.');
    o += '<div class="card mb">' + G.t5pChoChu().map(function (c) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(c.hoi) + '</b>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(c.boi) + '</p>' +
        (c.neuLaTangSau ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' +
          h(c.neuLaTangSau) + '</p>' : '') +
        (c.toiNghieng ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(c.toiNghieng) + '</p>' : '') +
        (c.toiKhongTuDat ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' +
          h(c.toiKhongTuDat) + '</p>' : '') +
        (c.mayDangLam ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(c.mayDangLam) + '</p>' : '') +
        (c.canXacNhan ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(c.canXacNhan) + '</p>' : '') +
        '</div>';
    }).join('') + '</div>';

    o += G.kaKhung ? G.kaKhung('tang5-pro', 'cuoi') : '';
    return o;
  };
})();

})();

/* ═════════ src/ban-ve.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÁY CHẠY BỘ BẢN VẼ 13 TỜ

   Kho ở kho-goc/data.ban-ve.js (máy sinh) và data.ban-ve-luat.js
   (viết tay). Toàn bộ ở gói NGHỀ.

   ═══ CÁI QUAN TRỌNG NHẤT TỆP NÀY LÀM ═══

   bvGhiNhanDuoc(tang, cap, bangChung) — cổng ghi nhận cấp.

   Nguyên tắc số 1 của cả bộ bản vẽ: "Chỉ ghi nhận cấp N khi có bằng
   chứng quan sát được. Không ghi theo lịch."

   Hàm này là chỗ nguyên tắc ấy thành cái chặn. Nó KHÔNG chấm bằng
   chứng đúng hay sai — chấm đúng sai là việc nghề. Nó chỉ từ chối khi
   không có gì để chấm, và nó nói ra ô ấy đòi bằng chứng gì.

   Vì sao đáng có: một hệ ghi cấp theo lịch thì bảng lên đều còn nhà
   đứng yên, và người đọc bảng ấy quyết định sai vì họ tin con số.

   ═══ SÁU CÁI MỞ ═══

   bvCap(tang, cap)          đọc một ô: mốc, bằng chứng, máy làm gì,
                             người làm gì, điểm WOW, đường tụt.
   bvGhiNhanDuoc(...)        cổng ghi nhận — xem trên.
   bvDuocBanKhong(cap)       luật cổng số 2: từ cấp 4 trở đi mọi hoạt
                             động bán phải IM LẶNG.
   bvCong(ma)                đặc tả một cổng chuyển tầng.
   bvLoc(tin)                tám bộ lọc ngôn ngữ, chạy được.
   bvModuleThieu()           bản đồ nâng cấp: module nào còn hụt gì.

   ═══ NĂM CÁI KHOÁ ═══

   bvSoi50()          đúng 50 ô, mỗi ô có bằng chứng và có đường tụt.
   bvSoiNhip()        mười nhịp, và ba luật của cỗ máy còn đúng: 07
                      trước 08, 10 nối về 01, nhịp 03 và 09 có người.
   bvSoiDo()          hai mươi tín hiệu, mỗi cái có hạn giờ và người
                      nhận; mọi tín hiệu Đỏ 1 phải trong 2 giờ.
   bvSoiMaCong()      cổng bản vẽ KHÔNG được mang khoá C1–C4 — kho đã
                      có G.CHUYENDOI dùng bộ mã ấy với nghĩa khác.
   bvSoiModule()      mọi màn khai ở bản đồ nâng cấp phải có thật.

   ═══ VÌ SAO bvSoiMaCong() ĐÁNG CÓ MỘT PHÉP KIỂM RIÊNG ═══

   G.CHUYENDOI có tám cổng C0–C7. Bộ bản vẽ có bốn cổng cũng gọi C1–C4,
   lệch nhau đúng một bậc. Hai bộ mã trùng chữ khác nghĩa là lớp hỏng
   ngầm điển hình: cả hai đều tồn tại thật, nên người trỏ nhầm không
   thấy lỗi, chỉ thấy một cổng có điều kiện lạ.

   Nên khoá của bản vẽ là BVC*, và phép kiểm này canh đúng chỗ ấy.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h;
  var CAP_IM_BAN = 4;   /* từ cấp này trở đi mọi hoạt động bán im lặng */

  function maTang(t) { var m = String(t == null ? '' : t).match(/(\d)/); return m ? 'T' + m[1] : ''; }
  function gio(s) {
    var x = String(s || '').toLowerCase();
    var m = x.match(/(\d+)\s*giờ/);   if (m) return Number(m[1]);
    var d = x.match(/(\d+)\s*ngày/);  if (d) return Number(d[1]) * 24;
    if (/ngay lập tức|ngay|trong ngày/.test(x)) return 0;
    return null;
  }

  /* ═══════════ MỞ 1: ĐỌC MỘT Ô ═══════════ */
  G.bvCap = function (tang, cap) {
    var ds = G.BV_CAPDO || [];
    if (!ds.length) return { chuaDo: true, thieu: 'BV_CAPDO' };
    var t = maTang(tang), n = Number(cap);
    var o = ds.filter(function (x) { return x.tang === t && x.cap === n; })[0];
    if (!o) return { khongCo: true, tang: t, cap: n,
      coNhung: ds.filter(function (x) { return x.tang === t; }).map(function (x) { return x.cap; }) };
    return {
      ma: o.ma, tang: o.tang, cap: o.cap, moc: o.moc,
      bangChung: o.bangChung, ai: o.ai, nguoi: o.nguoi, wow: o.wow, neuTut: o.neuTut,
      khuc: o.cap <= 3 ? 'vào cuộc' : (o.cap <= 7 ? 'tạo kết quả' : 'trở thành trụ cột'),
      duocBan: G.bvDuocBanKhong(o.cap).duoc
    };
  };

  /* ═══════════ MỞ 2: CỔNG GHI NHẬN CẤP ═══════════

     KHÔNG chấm bằng chứng đúng hay sai — đó là việc nghề. Chỉ từ chối
     khi không có gì để chấm, và nói ra ô ấy đòi bằng chứng gì. */
  G.bvGhiNhanDuoc = function (tang, cap, bangChung) {
    var o = G.bvCap(tang, cap);
    if (o.chuaDo || o.khongCo) return o;
    var co = String(bangChung == null ? '' : bangChung).trim();
    if (!co) return {
      ghiDuoc: false, ma: o.ma, thieuBangChung: true,
      doiGi: o.bangChung,
      luat: (G.BV_CAPDO_LUAT || {}).cot || '',
      vi: (G.BV_CAPDO_LUAT || {}).vi || ''
    };
    return {
      ghiDuoc: true, ma: o.ma, moc: o.moc, daCo: co,
      nhac: 'Máy KHÔNG ký. Cấp mới cần tên một người thật xác nhận.',
      theoLuat: ((G.BV_NHIP_LUAT || {}).nguoiThat || {}).luat || ''
    };
  };

  /* ═══════════ MỞ 3: CẤP NÀY CÒN ĐƯỢC BÁN KHÔNG ═══════════ */
  G.bvDuocBanKhong = function (cap) {
    var n = Number(cap) || 0;
    var l = (G.BV_CONG_LUAT || []).filter(function (x) { return x.no === 2; })[0] || {};
    if (n >= CAP_IM_BAN) return {
      duoc: false, cap: n, tuCap: CAP_IM_BAN,
      luat: l.luat || '', chiTiet: l.chiTiet || '',
      conLai: 'Chỉ còn đồng hành.'
    };
    return { duoc: true, cap: n, tuCap: CAP_IM_BAN,
      nhac: 'Còn được nói, nhưng vẫn qua luật số 1: chẩn đoán trước, đề xuất sau.' };
  };

  /* ═══════════ TRẦN CÔNG SUẤT — HÀM CHẶN THẬT ═══════════

     Kho đòi hàm này hai lần, bằng chữ, và chưa ai viết nó:

       BV_VAI_LUAT luật 3   "một vai đã đủ trần thì hệ thống DỪNG nhận
                             khách mới cho vai đó. Không có ngoại lệ vì
                             lý do doanh số."
       BV_CONG_LUAT luật 5  "Không mở cổng khi Coach hoặc Tư vấn đã đủ trần."
       CS_NEN N2            "Hệ từ chối cái thứ sáu." và câu nặng nhất:
                             "Trần không có hàm chặn thì sáu tháng sau ai
                              cũng giữ tám nhà."
       BV_BANGIAO           "Tư vấn → Coach: XÁC NHẬN CÒN TRẦN CÔNG SUẤT"
                             — nêu đúng thời điểm phải hỏi.

     Bốn chỗ, ba tờ khác nhau, cùng một câu. Nên câu hỏi tôi để lại ở bản
     9.56 — "trần có được dùng để chặn không" — thật ra đã có câu trả lời
     nằm sẵn trong kho; tôi hỏi lại một điều chủ hệ đã chốt.

     ═══ TRẦN CHẶN Ở ĐÂU: NHẬN NHÀ MỚI, KHÔNG PHẢI LÊN CẤP ═══

     Cả bốn chỗ đều nói "nhận khách MỚI" và "mở CỔNG". Không chỗ nào nói
     lên cấp trong tầng. Một nhà Coach đã giữ, đi từ cấp 6 lên cấp 7,
     không tiêu thêm một suất nào — chặn nó vì Coach đông nhà là phạt
     gia đình vì việc của hệ.

     ═══ BẢN ĐỒ TẦNG → VAI KHÔNG VIẾT LẠI Ở ĐÂY ═══

     BV_VAI.tran đã tự khai tầng nào thuộc vai nào: "40 hồ sơ T2 hoặc 15
     hồ sơ T3" là Tư vấn, "8 gia đình T4 hoặc 3 gia đình T5" là Coach.
     Dựng thêm một bảng tầng→vai là dựng bản thứ hai của một thứ đã có. */

  G.bvTranVai = function (tenVai) {
    var v = (G.BV_VAI || []).filter(function (x) {
      return String(x.ten).trim() === String(tenVai).trim();
    })[0];
    if (!v) return null;
    if (!v.tran) return { vai: v.ten, chuoi: null, theoTang: {}, khongKhaiTran: true };
    var ra = { vai: v.ten, chuoi: v.tran, theoTang: {} }, m;
    var re = /(\d+)\s*(?:gia đình|hồ sơ)\s*(T\d)/g;
    while ((m = re.exec(String(v.tran)))) ra.theoTang[m[2]] = Number(m[1]);
    if (/không giới hạn/i.test(v.tran)) ra.khongGioiHan = true;
    return ra;
  };

  /* Vai nào giữ tầng này — đọc ngược từ chính các trần đã khai. */
  G.bvVaiGiuTang = function (tang) {
    var t = String(tang || '').toUpperCase(), thay = null;
    (G.BV_VAI || []).forEach(function (v) {
      var tr = G.bvTranVai(v.ten);
      if (tr && tr.theoTang && typeof tr.theoTang[t] === 'number' && !thay) thay = tr;
    });
    return thay;
  };

  /* Người này còn nhận thêm được một nhà ở tầng ấy không.
     dsNha do bên gọi truyền vào — hàm này không tự đi lấy danh sách nhà,
     vì nó nằm ở gói bản vẽ và không được biết ai đang đăng nhập. */
  G.bvNhanDuoc = function (nguoi, tang, dsNha) {
    var t = String(tang || '').toUpperCase();
    var tr = G.bvVaiGiuTang(t);
    if (!nguoi) return { chuaBiet: true, vi: 'Chưa có tên người phụ trách để đếm.' };
    if (!tr) return { chuaBiet: true, vi: 'Bộ bản vẽ chưa khai trần cho tầng ' + t + '.' };

    var ds = dsNha || (typeof G.dsNha === 'function' ? G.dsNha() : (G.FAMILIES || [])) || [];
    var giu = ds.filter(function (x) {
      var m = String(x.tier == null ? '' : x.tier).match(/(\d)/);
      return x.coach === nguoi && m && ('T' + m[1]) === t;
    }).length;

    var tran = tr.theoTang[t];
    var l5 = (G.BV_CONG_LUAT || []).filter(function (x) { return x.no === 5; })[0] || {};
    var l3 = (G.BV_VAI_LUAT || []).filter(function (x) { return /trần công suất/i.test(x.luat); })[0] || {};

    if (giu >= tran) return {
      duoc: false, chan: true, vai: tr.vai, nguoi: nguoi, tang: t,
      dangGiu: giu, tran: tran, tranChuoi: tr.chuoi,
      vi: tr.vai + ' ' + nguoi + ' đang giữ ' + giu + '/' + tran + ' nhà ' + t + ' — đã đủ trần.',
      lam: 'Chuyển cho người còn trần, hoặc để nhà chờ. KHÔNG giao dày lên.',
      theoLuat: l5.luat || '', khongNgoaiLe: (l3.chiTiet || '')
    };
    return {
      duoc: true, chan: false, vai: tr.vai, nguoi: nguoi, tang: t,
      dangGiu: giu, tran: tran, tranChuoi: tr.chuoi, conCho: tran - giu,
      /* Báo sớm từ 80% để người điều phối còn kịp xoay, chứ không báo
         đúng lúc đã đầy — lúc ấy nhà đã ở trên bàn rồi. */
      sapDay: giu >= Math.ceil(tran * 0.8) ? 'Còn ' + (tran - giu) + ' suất. Sắp đủ trần.' : undefined
    };
  };

  /* KHOÁ: trần phải CHẶN được, không chỉ nằm trên giấy. */
  G.bvSoiTran = function () {
    var loi = [], ds = G.BV_VAI || [];
    if (!ds.length) return { chuaDo: true, thieu: 'BV_VAI', loi: [] };

    /* KHÔNG đếm "phải có đúng N trần". Bản đầu tôi viết N = 7, lấy từ
       câu "bảy con số trần" tôi tự viết ở 9.56 — mà bản vẽ khai SÁU.
       Phép kiểm đỏ ngay trên kho còn lành, và nó đỏ vì con số của tôi
       sai chứ không vì kho sai. Một phép kiểm canh con số tôi tự đặt ra
       thì nó canh trí nhớ của tôi, không canh cái kho.

       Nên hỏi TÍNH CHẤT: trần nào khai theo tầng thì phải đọc ra được
       ít nhất một tầng. Chuỗi đổi cách viết mà máy đọc ra rỗng là chỗ
       trần chết trong im lặng — trần vẫn nằm đó, hàm chặn vẫn chạy, và
       nó cho qua tất cả. */
    var soTran = 0;
    ds.forEach(function (v) {
      var tr = G.bvTranVai(v.ten);
      if (!tr || !tr.chuoi) return;
      soTran++;
      if (/(gia đình|hồ sơ)\s*T\d/.test(tr.chuoi) && !Object.keys(tr.theoTang).length)
        loi.push('trần của ' + v.ten + ' ghi theo tầng mà máy đọc ra rỗng: "' + tr.chuoi + '"');
    });
    if (!soTran) loi.push('không vai nào còn khai trần — hàm chặn sẽ cho qua tất cả');

    /* Tầng CÓ THU TIỀN phải có người khai trần cho nó. Đây là chỗ luật
       số 5 nhắm tới: "bán vượt năng lực giao hàng là vi phạm nặng nhất"
       — mà chỉ bán được ở tầng có giá.

       Đích lấy từ HP_TANG, không viết tay danh sách tầng: viết tay thì
       thêm một tầng có giá mà quên thêm vào đây là phép kiểm im. Tầng 1
       giá 0 nên không đòi trần — và chỗ ấy ghi ở BV_LECH BL-0, không
       giấu. */
    (G.HP_TANG || []).forEach(function (t) {
      if (!(Number(t.gia) > 0)) return;
      var m = String(t.tang || '').match(/(\d)/);
      if (!m) return;
      if (!G.bvVaiGiuTang('T' + m[1]))
        loi.push('tầng ' + t.tang + ' có thu tiền mà không vai nào khai trần — ' +
          'bvNhanDuoc() sẽ cho qua mọi hồ sơ ở tầng ấy');
    });

    /* Phép thử phá đứng ngay trong khoá: dựng một người đã đủ trần rồi
       hỏi hàm. Trả "được" là trần lại thành lời khuyên. */
    var tr4 = G.bvVaiGiuTang('T4');
    if (tr4) {
      var day = [];
      for (var i = 0; i < tr4.theoTang.T4; i++) day.push({ coach: '· thử ·', tier: 'Tầng 4' });
      var r = G.bvNhanDuoc('· thử ·', 'T4', day);
      if (!r.chan) loi.push('người đã đủ trần T4 mà hàm vẫn cho nhận — trần thành lời khuyên');
      var r2 = G.bvNhanDuoc('· thử ·', 'T4', day.slice(0, 1));
      if (r2.chan) loi.push('người mới giữ 1 nhà mà hàm đã chặn — trần chặn nhầm');
    }
    var l5 = (G.BV_CONG_LUAT || []).filter(function (x) { return x.no === 5; })[0];
    if (!l5) loi.push('mất luật cổng số 5 — trần chặn cổng');
    return { chuaDo: false, loi: loi, soTran: soTran };
  };

  /* ═══════════ MỞ 4: MỘT CỔNG CHUYỂN TẦNG ═══════════ */
  G.bvCong = function (ma) {
    var ds = G.BV_CONG || [];
    if (!ds.length) return { chuaDo: true, thieu: 'BV_CONG' };
    if (!ma) return { ds: ds.slice(), luat: (G.BV_CONG_LUAT || []).slice() };
    var k = String(ma).toUpperCase();
    var c = ds.filter(function (x) { return x.ma === k || x.maGoc === k; })[0];
    if (!c) return { khongCo: true, ma: ma, coNhung: ds.map(function (x) { return x.ma; }) };
    /* Trả kèm cảnh báo nếu người gọi dùng mã gốc — vì mã gốc trùng
       với G.CHUYENDOI và trùng thì trỏ nhầm. */
    return {
      ma: c.ma, maGoc: c.maGoc, chuyen: c.chuyen,
      dieuKienMo: c.dieuKienMo, duLieuBatBuoc: c.duLieuBatBuoc,
      nguoiQuyet: c.nguoiQuyet, cauThoai: c.cauThoai,
      khiNaoKhongMo: c.khiNaoKhongMo, duongThayThe: c.duongThayThe,
      canhMaTrung: (k === c.maGoc)
        ? 'Vừa tra bằng mã gốc ' + c.maGoc + '. G.CHUYENDOI cũng có mã ấy với nghĩa KHÁC — ' +
          'dùng khoá ' + c.ma + ' cho chắc.'
        : undefined
    };
  };

  /* ═══════════ MỞ 5: TÁM BỘ LỌC, CHẠY ĐƯỢC ═══════════

     Nhận một đối tượng {1:true, 2:false, …} — người soạn tự trả lời
     tám câu. Máy KHÔNG tự chấm một khối chữ: chấm sai ở đây thì người
     soạn tin vào một con dấu rỗng, và đó nguy hơn không chấm. */
  G.bvLoc = function (traLoi) {
    var ds = G.BV_LOC || [];
    if (!ds.length) return { chuaDo: true, thieu: 'BV_LOC' };
    traLoi = traLoi || {};
    var truot = [], chuaTraLoi = [];
    ds.forEach(function (l) {
      var v = traLoi[l.no];
      if (v === undefined || v === null) { chuaTraLoi.push(l.no + '. ' + l.hoi); return; }
      if (!v) truot.push({ no: l.no, hoi: l.hoi, luat: l.luat });
    });
    if (chuaTraLoi.length) return { chuaTraLoiDu: true, chuaTraLoi: chuaTraLoi, soCau: ds.length };
    return {
      quaDuoc: truot.length === 0,
      truot: truot,
      luat: truot.length
        ? 'Tin không đạt bị GIỮ LẠI và báo người phụ trách.'
        : 'Qua đủ tám bộ lọc.',
      hauKiem: (G.BV_LOC_LUAT || {}).hauKiem || ''
    };
  };

  /* ═══════════ MỞ 6: BẢN ĐỒ NÂNG CẤP ═══════════ */
  G.bvModuleThieu = function () {
    var mod = G.BV_MODULE || [], noi = G.BV_MODULE_NOI || [];
    if (!mod.length) return { chuaDo: true, thieu: 'BV_MODULE' };
    var tra = {};
    noi.forEach(function (n) { tra[n.ma] = n; });
    var ds = mod.map(function (m) {
      var n = tra[m.ma] || {};
      var man = (n.man || []).filter(function (v) { return G.VIEWS && G.VIEWS[v]; });
      return {
        ma: m.ma, ten: m.ten, chucNang: m.chucNang,
        man: (n.man || []).slice(),
        manCoThat: man,
        du: !!n.du,
        thieu: n.thieu
      };
    });
    return {
      ds: ds,
      soDu: ds.filter(function (x) { return x.du; }).length,
      soThieu: ds.filter(function (x) { return x.thieu; }).length,
      manhChung: (G.BV_MODULE_LUAT || {}).manhChung || '',
      lamGiTruoc: (G.BV_MODULE_LUAT || {}).lamGiTruoc || ''
    };
  };

  /* ═══════════ KHOÁ 1: ĐÚNG NĂM MƯƠI Ô ═══════════ */
  G.bvSoi50 = function () {
    var ds = G.BV_CAPDO || [], loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'BV_CAPDO', loi: [] };
    if (ds.length !== 50) loi.push('có ' + ds.length + ' ô, phải năm mươi');
    var thay = {};
    ['T1', 'T2', 'T3', 'T4', 'T5'].forEach(function (t) {
      var cap = ds.filter(function (x) { return x.tang === t; })
                  .map(function (x) { return x.cap; }).sort(function (a, b) { return a - b; });
      var can = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      if (cap.join() !== can.join()) loi.push(t + ' cấp lệch: [' + cap.join(' ') + ']');
    });
    ds.forEach(function (o) {
      var n = o.ma || (o.tang + '-' + o.cap);
      if (thay[o.ma]) loi.push(n + ' trùng mã');
      thay[o.ma] = 1;
      if (!o.moc) loi.push(n + ' thiếu mốc trạng thái');
      /* Hai trường này là cả cái luật của ma trận. */
      if (!o.bangChung) loi.push(n + ' thiếu BẰNG CHỨNG — ô không có bằng chứng là ô ghi theo lịch');
      if (!o.neuTut) loi.push(n + ' thiếu ĐƯỜNG TỤT — ô chỉ có đường lên dạy hệ rằng khách không hụt');
    });
    return { chuaDo: false, loi: loi, so: ds.length };
  };

  /* ═══════════ KHOÁ 2: BA LUẬT CỦA CỖ MÁY ═══════════ */
  G.bvSoiNhip = function () {
    var ds = G.BV_NHIP || [], l = G.BV_NHIP_LUAT || {}, loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'BV_NHIP', loi: [] };
    if (ds.length !== 10) loi.push('có ' + ds.length + ' nhịp, phải mười');

    var theoSo = {};
    ds.forEach(function (n) {
      theoSo[n.so] = n;
      if (!n.ten) loi.push('nhịp ' + n.so + ' thiếu tên');
      if (!n.dauRa) loi.push('nhịp ' + n.so + ' thiếu đầu ra bắt buộc');
      if (!n.cauChuan) loi.push('nhịp ' + n.so + ' thiếu câu chuẩn');
      if (!n.cauCam) loi.push('nhịp ' + n.so + ' thiếu câu bị cấm');
    });

    /* Luật 1: đo trước khen. Thứ tự trong mảng phải giữ 07 < 08. */
    var i7 = ds.findIndex(function (n) { return n.so === 7; });
    var i8 = ds.findIndex(function (n) { return n.so === 8; });
    if (!(i7 >= 0 && i8 >= 0 && i7 < i8)) loi.push('nhịp 07 không còn đứng trước nhịp 08');

    /* Luật 3: nhịp 03 và 09 luôn có người thật. */
    ((l.nguoiThat || {}).nhip || [3, 9]).forEach(function (s) {
      var n = theoSo[s];
      if (n && !n.nguoiLam) loi.push('nhịp ' + s + ' phải có người thật mà cột người làm đang trống');
    });

    /* Luật 2: vòng khép. Khai ở luật, kiểm ở đây cho khỏi thành lời suông. */
    var v = l.vongKhep || {};
    if (!(Number(v.tu) === 10 && Number(v.ve) === 1)) loi.push('luật vòng khép không còn 10 nối về 01');
    return { chuaDo: false, loi: loi, so: ds.length };
  };

  /* ═══════════ KHOÁ 3: HAI MƯƠI TÍN HIỆU ĐỎ ═══════════ */
  G.bvSoiDo = function () {
    var ds = G.BV_DO || [], loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'BV_DO', loi: [] };
    if (ds.length !== 20) loi.push('có ' + ds.length + ' tín hiệu, phải hai mươi');
    var muc = {};
    ds.forEach(function (t) {
      var n = 'tín hiệu ' + t.so;
      if (!t.tinHieu) loi.push(n + ' thiếu dấu hiệu nhận biết');
      if (!t.hanhDong) loi.push(n + ' thiếu hành động chuẩn');
      if (!t.nguoiNhan) loi.push(n + ' thiếu TÊN NGƯỜI NHẬN');
      var g = gio(t.hanGio);
      if (g === null) { loi.push(n + ' hạn giờ không dịch được: ' + t.hanGio); return; }
      muc[t.muc] = (muc[t.muc] || 0) + 1;
      /* Đỏ 1 là nhóm an toàn con người. Nới nó là nới đúng chỗ không
         được nới. */
      if (t.muc === 'Đỏ 1' && g > 2)
        loi.push(n + ' thuộc Đỏ 1 mà hạn ' + g + ' giờ, phải trong 2 giờ');
    });
    if (Object.keys(muc).length !== 5)
      loi.push('có ' + Object.keys(muc).length + ' mức đỏ, bản vẽ chia năm');
    return { chuaDo: false, loi: loi, so: ds.length, muc: muc };
  };

  /* ═══════════ KHOÁ 4: MÃ CỔNG KHÔNG ĐƯỢC TRÙNG ═══════════ */
  G.bvSoiMaCong = function () {
    var ds = G.BV_CONG || [], loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'BV_CONG', loi: [] };
    ds.forEach(function (c) {
      if (/^C\d$/.test(String(c.ma)))
        loi.push(c.ma + ' đang mang mã trùng G.CHUYENDOI — phải là BVC*');
      if (!c.maGoc) loi.push(c.ma + ' mất mã gốc, không đối chiếu được với tờ giấy');
      if (!c.dieuKienMo) loi.push(c.ma + ' thiếu điều kiện mở');
      if (!c.khiNaoKhongMo) loi.push(c.ma + ' thiếu cột KHI NÀO KHÔNG MỞ');
      if (!c.duongThayThe) loi.push(c.ma + ' thiếu đường thay thế — cổng không đường ra là cổng ép');
    });
    /* Nếu máy này có cả hai kho thì kiểm chỗ trùng thật. */
    if (G.CHUYENDOI && (G.CHUYENDOI.cong || []).length) {
      var cu = (G.CHUYENDOI.cong || []).map(function (x) { return x.ma; });
      var trung = ds.filter(function (c) { return cu.indexOf(c.ma) >= 0; });
      if (trung.length) loi.push('mã trùng thật với CHUYENDOI: ' +
        trung.map(function (c) { return c.ma; }).join(' '));
    }
    return { chuaDo: false, loi: loi, so: ds.length, doCaHai: !!G.CHUYENDOI };
  };

  /* ═══════════ KHOÁ 5: BẢN ĐỒ NÂNG CẤP KHÔNG NÓI DỐI ═══════════ */
  G.bvSoiModule = function () {
    var noi = G.BV_MODULE_NOI || [], mod = G.BV_MODULE || [], loi = [];
    if (!noi.length) return { chuaDo: true, thieu: 'BV_MODULE_NOI', loi: [] };
    var maMod = mod.map(function (m) { return m.ma; });
    noi.forEach(function (n) {
      if (maMod.length && maMod.indexOf(n.ma) < 0) loi.push(n.ma + ' không có trong BV_MODULE');
      if (!n.du && !n.thieu) loi.push(n.ma + ' chưa khai đủ hay thiếu');
      if (n.du && n.thieu) loi.push(n.ma + ' khai cả đủ lẫn thiếu');
      (n.man || []).forEach(function (v) {
        if (G.VIEWS && !G.VIEWS[v]) loi.push(n.ma + ' trỏ vào màn không có thật: ' + v);
      });
    });
    if (mod.length && noi.length !== mod.length)
      loi.push('nối ' + noi.length + ' module trên tổng ' + mod.length);
    return { chuaDo: false, loi: loi };
  };

  /* Đối chiếu hai mươi tín hiệu với mười sáu luật AICHAM. Không gộp —
     chỉ nói ra chỗ bản vẽ có mà luật nền chưa có. */
  G.bvSoiDoKhopAicham = function () {
    if (!(G.AICHAM && (G.AICHAM.luat || []).length))
      return { chuaDo: true, thieu: 'AICHAM' };
    var chu = (G.AICHAM.luat || []).map(function (l) {
      return String(l.ten + ' ' + l.khi).toLowerCase();
    }).join(' | ');
    var chua = (G.BV_DO || []).filter(function (t) {
      var tu = String(t.tinHieu).toLowerCase().split(/\s+/)
        .filter(function (w) { return w.length >= 5; }).slice(0, 3);
      return !tu.some(function (w) { return chu.indexOf(w) >= 0; });
    });
    return {
      soLuatNen: (G.AICHAM.luat || []).length,
      soTinHieu: (G.BV_DO || []).length,
      chuaCoONen: chua.map(function (t) { return t.muc + ' #' + t.so + ' ' + t.tinHieu; }),
      khongGop: 'Không gộp hai bảng. AICHAM là luật máy chạy nền theo dữ liệu; ' +
        'BV_DO là bảng phân loại sự cố có mức và có đồng hồ.'
    };
  };

  G.bvChoChu = function () { return (G.BV_CHOCHU || []).slice(); };

  /* ═══════════════════════════════════════════════════════════
     MÀN HÌNH
     ═══════════════════════════════════════════════════════════ */
  G.VIEWS['ban-ve'] = function () {
    if (!G.BV_CAPDO)
      return U.empty('Chưa mở được phần này',
        'Phần này nằm trong gói nghề. Đăng nhập bằng tài khoản có quyền nghề để nạp.');

    var loi = G.BV_LOI || {};
    var o = U.ph({ eyebrow: 'BỘ BẢN VẼ · 13 TỜ A0', ic: 'map', grad: 1,
      t: 'Năm mươi ô, mỗi ô một tag, mỗi tag một bằng chứng',
      lead: 'Đây là đặc tả hệ thống, không phải nội dung. Nó không dạy nói gì với một nhà — ' +
        'nó khai hệ có bao nhiêu ô và ô nào ghi nhận bằng gì.' });

    o += '<div class="card mb" style="border-color:#0B667556">' +
      '<p style="line-height:1.9;font-size:1.05em"><b>' + h(loi.cauQuanTrongNhat || '') + '</b></p>' +
      '<p class="sm mt" style="line-height:1.8">' + h(loi.khoDangThieu || '') + '</p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(loi.khacTaiLieuTruoc || '') + '</p>' +
      '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(loi.boDem || '') + '</p></div>';

    var s50 = G.bvSoi50(), snh = G.bvSoiNhip(), sdo = G.bvSoiDo(),
        smc = G.bvSoiMaCong(), smd = G.bvSoiModule(), str = G.bvSoiTran();
    var lech = [].concat(s50.loi || [], snh.loi || [], sdo.loi || [], smc.loi || [],
      smd.loi || [], str.loi || []);
    if (lech.length)
      o += '<div class="card mb" style="border-color:#BE0E16"><b class="sm" style="color:#BE0E16">' +
        'LỆCH: ' + h(lech.join(' · ')) + '</b></div>';

    o += G.kaKhung ? G.kaKhung('ban-ve', 'dau') : '';

    /* ── Bốn nguyên tắc ── */
    o += U.sec('Bốn nguyên tắc đọc', 'Đọc sai nguyên tắc thì mọi tờ sau đều bị dùng sai.');
    o += '<div class="card mb">' + (G.BV_NGUYENTAC || []).map(function (n) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + n.no + ' · ' + h(n.ten) + '</b>' +
        (n.khongPhai ? ' <span class="tiny" style="color:#BE0E16">' + h(n.khongPhai) + '</span>' : '') +
        '<p class="tiny mt" style="line-height:1.7">' + h(n.luat) + '</p>' +
        (n.coCong ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Có cổng chạy: ' +
          h(n.coCong) + '</p>' : '') + '</div>';
    }).join('') + '</div>';

    /* ── Ma trận 50 ô ── */
    var cl = G.BV_CAPDO_LUAT || {};
    o += U.sec('Ma trận năm mươi ô', cl.cot || '');
    o += '<p class="tiny dim mb" style="line-height:1.7">' + h(cl.vi || '') + '<br>' +
      h(cl.baKhuc || '') + '</p>';
    ['T1', 'T2', 'T3', 'T4', 'T5'].forEach(function (t) {
      var ch = (G.BV_TANG || []).filter(function (x) { return x.tang === t; })[0] || {};
      var ds = (G.BV_CAPDO || []).filter(function (x) { return x.tang === t; });
      if (!ds.length) return;
      o += '<div class="card mb"><span class="tiny up dim">' + t +
        (ch.thoiLuong ? ' · ' + h(ch.thoiLuong) : '') +
        (ch.vaiDan ? ' · ' + h(ch.vaiDan) : '') + '</span>' +
        (ch.tranCongSuat ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">Trần: ' +
          h(ch.tranCongSuat) + '</p>' : '') +
        ds.map(function (x) {
          var ban = x.cap < 4;
          return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
            '<b class="sm">' + h(x.ma) + ' · ' + h(x.moc) + '</b> ' +
            '<span class="tiny dim">' + (x.cap <= 3 ? 'vào cuộc' : (x.cap <= 7 ? 'tạo kết quả' : 'trụ cột')) +
            '</span>' + (ban ? '' : ' <span class="tiny" style="color:#BE0E16">im bán</span>') +
            '<p class="tiny mt" style="line-height:1.7"><b>Bằng chứng:</b> ' + h(x.bangChung) + '</p>' +
            (x.ai ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Máy: ' + h(x.ai) + '</p>' : '') +
            (x.nguoi ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">Người: ' + h(x.nguoi) + '</p>' : '') +
            (x.wow ? '<p class="tiny mt" style="line-height:1.8">&ldquo;' + h(x.wow) + '&rdquo;</p>' : '') +
            '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">Nếu tụt: ' + h(x.neuTut) + '</p>' +
            '</div>';
        }).join('') + '</div>';
    });

    /* Cổng ghi nhận chạy thật, hai chiều. */
    var caO = G.bvGhiNhanDuoc('T3', 6, '');
    var caC = G.bvGhiNhanDuoc('T3', 6, 'Ảnh bảng tầm nhìn và biên bản cuộc gọi mốc ngày 43');
    if (caO && caO.ma)
      o += '<div class="card mb" style="border-color:#0B667544">' +
        '<span class="tiny up dim">CỔNG GHI NHẬN CHẠY THẬT · Ô ' + h(caO.ma) + '</span>' +
        '<p class="sm mt" style="line-height:1.8"><b>Không đưa bằng chứng →</b> ' +
        '<b style="color:#BE0E16">từ chối ghi nhận</b>. Ô này đòi: ' + h(caO.doiGi) + '</p>' +
        '<p class="sm mt" style="line-height:1.8"><b>Có bằng chứng →</b> ' +
        '<b style="color:#0B6675">ghi được</b> — nhưng ' + h(caC.nhac || '') + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(caO.vi || '') + '</p></div>';

    o += G.kaKhung ? G.kaKhung('ban-ve', 'giua') : '';

    /* ── Bốn cổng ── */
    o += U.sec('Bốn cổng chuyển tầng', 'Cổng là kết luận chẩn đoán, không phải bước bán.');
    o += (G.BV_CONG || []).map(function (c) {
      return '<div class="card mb" style="border-color:#5140B444">' +
        '<span class="tiny up" style="color:#5140B4">' + h(c.ma) +
        ' <span class="dim">(tờ giấy ghi ' + h(c.maGoc) + ')</span> · ' + h(c.chuyen) + '</span>' +
        '<p class="sm mt" style="line-height:1.8"><b>Mở khi:</b> ' + h(c.dieuKienMo) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7">Dữ liệu bắt buộc: ' + h(c.duLieuBatBuoc) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7">Người quyết: ' + h(c.nguoiQuyet) + '</p>' +
        '<div class="mt" style="padding:9px 12px;border-left:3px solid #5140B4;background:var(--gita-nen-2)">' +
        '<p class="sm" style="line-height:1.8">&ldquo;' + h(c.cauThoai) + '&rdquo;</p></div>' +
        '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">KHÔNG mở khi: ' + h(c.khiNaoKhongMo) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Đường thay thế: ' + h(c.duongThayThe) + '</p>' +
        '</div>';
    }).join('');
    o += '<div class="card mb"><span class="tiny up dim">TÁM LUẬT CỨNG CỦA CỔNG</span>' +
      (G.BV_CONG_LUAT || []).map(function (l) {
        return '<div style="padding:7px 0;border-bottom:1px solid var(--gita-vien-2)">' +
          '<b class="sm">' + l.no + ' · ' + h(l.luat) + '</b>' +
          (l.chiTiet ? '<p class="tiny mt" style="line-height:1.7">' + h(l.chiTiet) + '</p>' : '') +
          (l.vi ? '<p class="tiny dim mt" style="line-height:1.7">' + h(l.vi) + '</p>' : '') +
          (l.khopVoiKho ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' +
            h(l.khopVoiKho) + '</p>' : '') +
          (l.coCong ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Có cổng chạy: ' +
            h(l.coCong) + '</p>' : '') + '</div>';
      }).join('') + '</div>';

    /* ── Đường tụt ── */
    o += U.sec('Bốn mức hụt — bắt buộc có ở cả năm mươi ô', '');
    o += '<div class="card mb">' + (G.BV_TUTCAP || []).map(function (t) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(t.muc) + '</b> <span class="tiny dim">' + h(t.dauHieu) + '</span>' +
        '<p class="tiny mt" style="line-height:1.7">' + h(t.hanhDong) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">Tuyệt đối không: ' +
        h(t.tuyetDoiKhong) + '</p></div>';
    }).join('') + '</div>';

    /* ── Mười nhịp ── */
    var nl = G.BV_NHIP_LUAT || {};
    o += U.sec('Cỗ máy mười nhịp', 'Vòng lặp chạy bên trong cả năm mươi ô.');
    o += '<div class="card mb">' + (G.BV_NHIP || []).map(function (n) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + (n.so < 10 ? '0' : '') + n.so + ' · ' + h(n.ten) + '</b> ' +
        '<span class="tiny dim">' + h(n.mucDich) + '</span>' +
        (n.mayLam ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Máy: ' + h(n.mayLam) + '</p>' : '') +
        (n.nguoiLam ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">Người: ' + h(n.nguoiLam) + '</p>' : '') +
        '<p class="tiny mt" style="line-height:1.7">Đầu ra: ' + h(n.dauRa) + '</p>' +
        '<p class="tiny mt" style="line-height:1.8;color:#0B6675">&ldquo;' + h(n.cauChuan) + '&rdquo;</p>' +
        '<p class="tiny mt" style="line-height:1.8;color:#BE0E16">Cấm: &ldquo;' + h(n.cauCam) + '&rdquo;</p>' +
        '</div>';
    }).join('') + '</div>';
    o += '<div class="card mb"><span class="tiny up dim">BA LUẬT CỦA CỖ MÁY</span>' +
      [nl.doTruocKhen, nl.vongKhep, nl.nguoiThat].filter(Boolean).map(function (l) {
        return '<p class="sm mt" style="line-height:1.8"><b>' + h(l.luat) + '</b></p>' +
          '<p class="tiny dim" style="line-height:1.7">' + h(l.vi) + '</p>' +
          (l.khopVoiKho ? '<p class="tiny" style="line-height:1.7;color:#0B6675">' +
            h(l.khopVoiKho) + '</p>' : '');
      }).join('') + '</div>';

    /* ── Hai mươi tín hiệu đỏ ── */
    o += U.sec('Hai mươi tín hiệu đỏ', 'Quá hạn giờ thì KHÔNG tính là đã xử lý.');
    o += '<div class="card mb">' + (G.BV_DO || []).map(function (t) {
      var d1 = t.muc === 'Đỏ 1';
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<span class="tiny up" style="color:' + (d1 ? '#BE0E16' : '#B4720F') + '"><b>' +
        h(t.muc) + ' · #' + t.so + '</b></span> ' +
        '<span class="tiny" style="color:#0B6675">' + h(t.hanGio) + '</span>' +
        '<p class="sm mt" style="line-height:1.8"><b>' + h(t.tinHieu) + '</b></p>' +
        '<p class="tiny mt" style="line-height:1.7">' + h(t.hanhDong) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#B4720F">→ ' + h(t.nguoiNhan) + '</p></div>';
    }).join('') + '</div>';
    var kh = G.bvSoiDoKhopAicham();
    if (kh && !kh.chuaDo)
      o += '<div class="card mb"><span class="tiny up dim">ĐỐI CHIẾU VỚI ' + kh.soLuatNen +
        ' LUẬT AICHAM</span>' +
        '<p class="tiny mt" style="line-height:1.7">' + h(kh.khongGop) + '</p>' +
        (kh.chuaCoONen.length
          ? '<p class="tiny mt" style="line-height:1.8;color:#B4720F">Bản vẽ có mà luật nền chưa có: ' +
            h(kh.chuaCoONen.join(' · ')) + '</p>'
          : '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Luật nền phủ được cả hai mươi.</p>') +
        '</div>';

    /* ── Tám bộ lọc ── */
    o += U.sec('Tám bộ lọc ngôn ngữ', 'Mọi tin nhắn và mọi cuộc gọi đều phải qua.');
    o += '<div class="card mb">' + (G.BV_LOC || []).map(function (l) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + l.no + ' · ' + h(l.hoi) + '</b>' +
        '<p class="tiny mt" style="line-height:1.7">' + h(l.luat) + '</p>' +
        (l.khopVoiKho ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' +
          h(l.khopVoiKho) + '</p>' : '') +
        (l.chuY ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>' + h(l.chuY) + '</b></p>' : '') +
        '</div>';
    }).join('') + '</div>';
    o += '<p class="tiny mb" style="line-height:1.7;color:#B4720F">' +
      h((G.BV_LOC_LUAT || {}).locBayDangDo || '') + '</p>';

    /* ── Bốn hàng rào kỹ thuật ── */
    o += U.sec('Bốn hàng rào kỹ thuật bắt buộc', '');
    o += '<div class="card mb">' + (G.BV_RAO || []).map(function (r) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(r.ten) + '</b>' +
        '<p class="tiny mt" style="line-height:1.7">' + h(r.luat) + '</p>' +
        (r.khopVoiKho ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' +
          h(r.khopVoiKho) + '</p>' : '') + '</div>';
    }).join('') + '</div>';

    /* ── Trigger ── */
    o += U.sec('Trigger tự động, gắn vào tag cấp độ', '');
    o += '<div class="card mb">' + (G.BV_TRIGGER || []).map(function (t) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(t.khi) + '</b> <span class="tiny" style="color:#0B6675">' +
        h(t.hanGio) + '</span>' +
        '<p class="tiny mt" style="line-height:1.7">' + h(t.lam) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">Hàng rào: ' + h(t.hangRao) + '</p></div>';
    }).join('') + '</div>';

    /* ── Bản đồ nâng cấp ── */
    var mt = G.bvModuleThieu();
    o += U.sec('Bản đồ nâng cấp — tám module nối với màn đang có',
      mt.soDu + ' module đủ · ' + mt.soThieu + ' module còn hụt một mảnh');
    o += '<div class="card mb">' + (mt.ds || []).map(function (m) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(m.ma) + ' · ' + h(m.ten) + '</b> ' +
        (m.du ? '<span class="tiny" style="color:#0B6675">ĐỦ</span>'
              : '<span class="tiny" style="color:#B4720F">CÒN HỤT</span>') +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(m.chucNang) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Màn đang có: ' +
        h(m.manCoThat.join(' · ')) + '</p>' +
        (m.thieu ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">Thiếu: ' +
          h(m.thieu) + '</p>' : '') + '</div>';
    }).join('') + '</div>';
    o += '<div class="card mb" style="border-color:#B4720F55">' +
      '<p class="sm" style="line-height:1.85"><b>' + h(mt.manhChung) + '</b></p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' +
      h((G.BV_MODULE_LUAT || {}).vi || '') + '</p>' +
      '<p class="tiny mt" style="line-height:1.8;color:#0B6675"><b>Làm gì trước: ' +
      h(mt.lamGiTruoc) + '</b></p>' +
      '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' +
      h((G.BV_MODULE_LUAT || {}).chuaLam || '') + '</p></div>';

    /* ── Mười vai và trần ── */
    o += U.sec('Mười vai nghiệp vụ và trần công suất',
      'Bảng TRÁCH NHIỆM. Bảng QUYỀN TRUY CẬP vẫn là mười lăm vai R* — xem BL-4.');
    o += '<div class="card mb">' + (G.BV_VAI || []).map(function (v) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + (v.so < 10 ? '0' : '') + v.so + ' · ' + h(v.ten) + '</b>' +
        (v.tran ? ' <span class="tiny" style="color:#B4720F">trần ' + h(v.tran) + '</span>' : '') +
        '<p class="tiny mt" style="line-height:1.7">' + h(v.nhiemVu) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(v.gioiHanTuyetDoi) + '</p></div>';
    }).join('') + '</div>';
    o += '<div class="card mb">' + (G.BV_VAI_LUAT || []).map(function (l) {
      return '<p class="sm mt" style="line-height:1.8"><b>' + h(l.luat) + '.</b> ' + h(l.chiTiet) + '</p>' +
        (l.vi ? '<p class="tiny dim" style="line-height:1.7">' + h(l.vi) + '</p>' : '');
    }).join('') + '</div>';

    /* ── Chỗ lệch ── */
    o += U.sec('Chỗ bộ bản vẽ lệch với kho', 'Máy đọc kho. Chỗ lệch ghi ra, không tự chọn hộ.');
    o += '<div class="card mb">' + (G.BV_LECH || []).map(function (l) {
      return '<div style="padding:10px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(l.ma) + ' · ' + h(l.o) + '</b>' +
        (l.nguy ? ' <span class="tiny" style="color:#BE0E16">CHỖ NGUY</span>' : '') +
        '<p class="tiny mt" style="line-height:1.7"><b>Bản vẽ:</b> ' + h(l.banVe) + '</p>' +
        (l.kho ? '<p class="tiny mt" style="line-height:1.7"><b>Kho:</b> ' + h(l.kho) + '</p>' : '') +
        (l.taiLieuKhac ? '<p class="tiny mt" style="line-height:1.7"><b>Tài liệu khác:</b> ' +
          h(l.taiLieuKhac) + '</p>' : '') +
        (l.vanDe ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(l.vanDe) + '</p>' : '') +
        (l.namNguon ? '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
          l.namNguon.map(function (x) { return '<li>' + h(x) + '</li>'; }).join('') + '</ul>' : '') +
        (l.tuXungLaNguon ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' +
          h(l.tuXungLaNguon) + '</p>' : '') +
        (l.lanThuBa ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(l.lanThuBa) + '</p>' : '') +
        (l.caiMoi ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(l.caiMoi) + '</p>' : '') +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(l.mayLam) + '</p>' +
        (l.noHoSo ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Hồ sơ đã mở ở: ' +
          h(l.noHoSo) + '</p>' : '') +
        (l.canGi ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16"><b>Cần: ' +
          h(l.canGi) + '</b></p>' : '') +
        (l.daRo ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Chỗ này không cần chủ hệ quyết.</p>' : '') +
        '</div>';
    }).join('') + '</div>';

    /* ── Chờ chủ hệ ── */
    o += U.sec('Ba câu chờ chủ hệ', 'Mã không tự trả lời được ba câu này.');
    o += '<div class="card mb">' + G.bvChoChu().map(function (c) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(c.hoi) + '</b>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(c.boi) + '</p>' +
        (c.toiNghieng ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' +
          h(c.toiNghieng) + '</p>' : '') +
        (c.toiKhongTuDat ? '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' +
          h(c.toiKhongTuDat) + '</p>' : '') +
        (c.mayDangLam ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' +
          h(c.mayDangLam) + '</p>' : '') + '</div>';
    }).join('') + '</div>';

    o += G.kaKhung ? G.kaKhung('ban-ve', 'cuoi') : '';
    return o;
  };
})();

})();

/* ═════════ src/ban-lam-viec.js ═════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÁY CHẠY BÀN LÀM VIỆC CỦA COACH

   Kho ở kho-goc/data.ban-lam-viec.js. Toàn bộ ở gói NGHỀ.

   ═══ HÀM QUAN TRỌNG NHẤT: blvXep() ═══

   Nó chia nhà của Coach vào năm ngăn, và tính chất phải giữ là:

       mỗi nhà rơi vào ĐÚNG MỘT ngăn, tổng năm ngăn bằng tổng số nhà.

   Cách giữ: xét theo THỨ TỰ BẬC và DỪNG ở ngăn đầu tiên khớp. Ngăn
   cuối — ĐANG YÊN — nhận phần còn lại, nên không nhà nào lọt.

   Viết kiểu "nhà nào khẩn thì vào ngăn đỏ, nhà nào tới hạn thì vào
   ngăn việc" mà không có ngăn vét thì một nhà bình thường biến mất
   khỏi màn hình — và đó đúng là lớp hỏng chủ hệ muốn chặn.

   ═══ MÁY ĐỀ NGHỊ CẤP, MÁY KHÔNG GÁN CẤP ═══

   blvCapDeNghi() đọc dữ liệu có thật của nhà — ngày thứ mấy, chỉ số tự
   chủ, số lần nhắc — rồi đề nghị một cấp trong mười, KÈM cái nó dựa
   vào và KÈM cái nó chưa có.

   Nó KHÔNG ghi cấp ấy vào đâu cả. Cấp chỉ thành thật khi GIÁM ĐỐC ĐIỀU
   HÀNH phê duyệt — chốt của chủ hệ ở bản 9.58 — và ngăn CHỜ KÝ giữ
   những nhà đang chờ đúng việc ấy. Việc của Coach là dựng hồ sơ cho đủ
   ba điều kiện rồi trình; xem blvDuyetDuoc().

   Vì sao không tự gán: nguyên tắc số 1 của bộ bản vẽ nói cấp độ là
   TRẠNG THÁI CỦA KHÁCH, chỉ ghi khi có bằng chứng quan sát được. Ngày
   thứ 74 không phải bằng chứng — nó chỉ là cái lịch.

   ═══ VÌ SAO blvCapDeNghi() KHÔNG DÙNG NGÀY LÀM CĂN CỨ CHÍNH ═══

   Cách dễ nhất là chia ngày cho tổng số ngày rồi nhân mười. Cách ấy
   luôn ra một con số đẹp, và luôn sai theo cùng một hướng: nhà nào
   cũng "đang tiến bộ đều".

   Nên hàm này lấy ngày làm TRẦN (không đề nghị cấp cao hơn chỗ lịch
   cho phép) và lấy chỉ số tự chủ làm CĂN CỨ. Hai thứ lệch nhau nhiều
   thì nó nói ra chỗ lệch, chứ không trung bình cộng chúng lại.

   ═══ TÁM CÁI KHOÁ ═══

   blvSoiVetCan()    tổng năm ngăn bằng tổng số nhà — không hơn không kém.
   blvSoiThuTu()     ngăn xếp đúng bậc của SV_THUTU.
   blvSoiGoi()       tám ô, mỗi ô khai lấy từ kho nào.
   blvSoiNhac()      mỗi loại nhắc có hạn và có nguồn.
   blvSoiKhongTuGui() không có đường nào từ bàn này gửi thẳng cho gia đình.
   blvSoiDuyet()     cửa duyệt đủ ba điều kiện, không kho nào chép lại
                     ngưỡng KPI, và người ký mang một quyền có thật.
   blvSoiNoiDo()     mỗi tín hiệu đỏ khai được nối bằng gì, hoặc vì sao
                     chưa nối và ai bắt thay — và hàm không nối nhiều
                     hơn kho khai.
   blvSoiMoc()       năm tầng đều có mốc gặp, mốc dẫn nguyên văn câu đã
                     hứa, và không tầng nào vừa trỏ kho vừa chép số.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h;
  var SO_NGAY = { T1: 7, T2: 21, T3: 90, T4: 365, T5: 365 };

  function maTang(t) { var m = String(t == null ? '' : t).match(/(\d)/); return m ? 'T' + m[1] : ''; }
  function co(x) { return x !== undefined && x !== null; }

  /* ═══════════ NHÀ CỦA COACH, ĐÃ LÀM GIÀU ═══════════ */
  G.blvNha = function (tenCoach) {
    var ds = (typeof G.dsNha === 'function' ? G.dsNha() : (G.FAMILIES || [])) || [];
    if (tenCoach) ds = ds.filter(function (n) { return n.coach === tenCoach; });
    return ds.map(function (n) {
      var t = maTang(n.tier), tong = SO_NGAY[t] || 0;
      var chang = (typeof G.t34ChangHomNay === 'function') ? G.t34ChangHomNay(t, n.ngay) : null;
      var dn = G.blvCapDeNghi(n);
      return {
        id: n.id, nha: n.nha, hv: n.hv, lop: n.lop, ph: n.ph,
        tang: t, ngay: n.ngay, tongNgay: tong,
        conLai: tong ? Math.max(0, tong - Number(n.ngay || 0)) : undefined,
        band: n.band, tuchu: n.tuchu, nhac: n.nhac, coach: n.coach, kyTich: n.kyTich,
        /* vai và kpi đi theo vì G.kpiCuaToi() đọc chúng. Bản đầu tôi bỏ quên
           vai, và KPI của mọi nhà tụt đúng 20 điểm mà không ai thấy — vì một
           con số thấp đều thì trông giống một hệ nghiêm khắc. */
        vai: n.vai, kpi: n.kpi, nguyenVong: n.nguyenVong,
        chang: chang && !chang.chuaDo && !chang.khongPhaiTang34 ? chang : undefined,
        capDeNghi: dn
      };
    });
  };

  /* ═══════════ ĐỀ NGHỊ CẤP — KHÔNG GÁN ═══════════

     Ngày làm TRẦN, chỉ số tự chủ làm CĂN CỨ. Xem đầu tệp. */
  G.blvCapDeNghi = function (n) {
    var t = maTang(n.tier), tong = SO_NGAY[t] || 0;
    if (!tong) return { chuaDoDuoc: true, vi: 'Không biết tầng này dài bao nhiêu ngày.' };

    var ngay = Number(n.ngay || 0);
    var tranTheoLich = Math.max(1, Math.min(10, Math.ceil(ngay / tong * 10)));

    var tc = Number(n.tuchu);
    if (!isFinite(tc)) return {
      chuaDoDuoc: true, tranTheoLich: tranTheoLich,
      vi: 'Nhà này chưa có chỉ số tự chủ. Đề nghị một cấp mà không có căn cứ là đoán.'
    };
    var theoCanCu = Math.max(1, Math.min(10, Math.round(tc / 10)));
    var deNghi = Math.min(tranTheoLich, theoCanCu);

    var o = (typeof G.bvCap === 'function') ? G.bvCap(t, deNghi) : null;
    var lech = tranTheoLich - theoCanCu;

    return {
      cap: deNghi, ma: o && o.ma ? o.ma : (t + '-C' + (deNghi < 10 ? '0' : '') + deNghi),
      moc: o && o.moc ? o.moc : undefined,
      doiBangChung: o && o.bangChung ? o.bangChung : undefined,
      canCu: 'Chỉ số tự chủ ' + tc + '% → cấp ' + theoCanCu,
      tranTheoLich: tranTheoLich,
      lechLich: lech,
      noiLech: lech >= 2
        ? 'Lịch cho phép tới cấp ' + tranTheoLich + ' mà căn cứ chỉ tới cấp ' + theoCanCu +
          '. Nhà này đang CHẬM hơn lịch — đừng ghi theo lịch.'
        : (lech <= -1
          ? 'Căn cứ cao hơn trần lịch. Giữ ở trần: chưa đi hết ngày thì chưa qua được ô ấy.'
          : undefined),
      chuaKy: true,
      vi: 'Máy ĐỀ NGHỊ. Cấp chỉ thành thật khi Giám đốc điều hành phê duyệt.'
    };
  };

  /* ═══════════ CỬA PHÊ DUYỆT CẤP ═══════════

     Ba điều kiện của chủ hệ, mỗi điều kiện trả về một trong BA trạng thái:
       dat        · đo được và đạt
       hut        · đo được và chưa đạt
       chuaBiet   · máy không có căn cứ để nói

     Vì sao ba chứ không hai: "chưa biết" và "chưa đạt" đòi hai việc khác
     nhau. Chưa đạt thì đi làm cho tốt hơn; chưa biết thì đi HỎI. Gộp lại
     thành một màu đỏ là làm mất đúng thông tin dùng được.

     Máy không duyệt. Ba điều kiện xanh chỉ nghĩa là hồ sơ ĐỦ ĐIỀU KIỆN
     TRÌNH lên Giám đốc điều hành. */

  G.blvDuyetDuoc = function (n, tenCoach) {
    var d = G.BLV_DUYET, ds = G.BLV_DUYET_DIEU || [];
    if (!d || !ds.length) return { chuaDo: true, thieu: 'BLV_DUYET' };
    var ra = [];

    ds.forEach(function (dk) {
      var o = { ma: dk.ma, ten: dk.ten, tuKho: dk.tuKho, aiLam: dk.aiLam };

      if (dk.ma === 'KPI') {
        /* Ngưỡng đọc từ KPI_XIN_THEM. Không viết lại con số ấy ở đây. */
        if (typeof G.kpiCuaToi !== 'function' || typeof G.KPI_XIN_THEM !== 'number') {
          o.trangThai = 'chuaBiet';
          o.noi = 'Chưa nạp kho khách — không đọc được ngưỡng KPI.';
        } else {
          var kpi = G.kpiCuaToi(n);
          o.so = kpi; o.nguong = G.KPI_XIN_THEM;
          o.trangThai = G.datKpi80(n) ? 'dat' : 'hut';
          o.noi = 'KPI ' + kpi + '% · ngưỡng ' + G.KPI_XIN_THEM + '%';
          if (o.trangThai === 'hut') o.canLam = dk.hut;
        }
      }

      if (dk.ma === 'CONGSUAT') {
        /* ═══ CHỖ BẢN 9.58 ĐẶT SAI CỬA ═══

           Bản trước tôi lấy trần công suất chặn ngay ở đây, cho mọi cấp.
           Đọc lại bốn chỗ trong kho — BV_VAI_LUAT luật 3, BV_CONG_LUAT
           luật 5, CS_NEN N2, BV_BANGIAO chặng "Tư vấn → Coach" — thì cả
           bốn đều nói trần chặn lúc NHẬN KHÁCH MỚI và lúc MỞ CỔNG. Không
           chỗ nào nói nó chặn một nhà đang đi lên cấp trong tầng.

           Và đúng là không nên: nhà Coach đã giữ, đi từ cấp 6 lên cấp 7,
           không tiêu thêm suất nào. Chặn nó vì Coach đông nhà là phạt
           gia đình vì việc điều phối của hệ.

           Nên ở cửa này trần chia hai đường:
             · cấp thường  → CẢNH BÁO, để Giám đốc thấy người này đang đầy
             · cấp 10      → CHẶN, vì cấp 10 là nhà sắp qua cổng sang
                             tầng sau và sẽ vào tay MỘT VAI KHÁC. Lúc ấy
                             nó đúng là "nhận khách mới", và luật số 5 áp
                             thẳng vào. */
        var nguoi = tenCoach || n.coach;
        if (!nguoi) {
          o.trangThai = 'chuaBiet';
          o.noi = 'Nhà này chưa có người phụ trách — chưa biết trần của ai để đếm.';
          o.canLam = 'Giao người phụ trách trước, rồi mới xét cấp.';
          ra.push(o); return;
        }
        if (typeof G.bvNhanDuoc !== 'function') {
          o.trangThai = 'chuaBiet';
          o.noi = 'Chưa nạp bộ bản vẽ — không đọc được trần công suất.';
          ra.push(o); return;
        }

        var capNay = Number((n.capDeNghi || {}).cap) || 0;
        var quaCong = capNay >= 10;
        /* Cấp 10 thì đếm trần của vai NHẬN ở tầng sau, không phải vai
           đang giữ — đó mới là người sắp gánh thêm một nhà. */
        var tangXet = quaCong
          ? 'T' + Math.min(5, (Number(String(n.tang).replace('T', '')) || 1) + 1)
          : n.tang;
        var r = G.bvNhanDuoc(nguoi, tangXet, null);
        o.vai = r.vai; o.dangGiu = r.dangGiu; o.tran = r.tran;
        o.tranChuoi = r.tranChuoi; o.nguoi = nguoi; o.tangXet = tangXet;
        o.quaCong = quaCong || undefined;

        if (r.chuaBiet) { o.trangThai = 'chuaBiet'; o.noi = r.vi; }
        else if (!r.chan) {
          o.trangThai = 'dat';
          o.noi = r.vai + ' ' + nguoi + ' đang giữ ' + r.dangGiu + '/' + r.tran +
            ' nhà ' + tangXet + (quaCong ? ' (tầng sẽ nhận)' : '');
          if (r.sapDay) o.sapDay = r.sapDay;
        } else {
          o.trangThai = 'hut'; o.noi = r.vi; o.canLam = r.lam; o.theoLuat = r.theoLuat;
          if (!quaCong) {
            /* Chỉ cảnh báo: nhà này đã ở trong tay người ấy rồi. */
            o.chiCanhBao = true;
            o.chuaChan = 'Nhà đã ở trong tay người này — lên cấp không tiêu thêm suất. ' +
              'Trần chặn lúc NHẬN nhà mới, không chặn lúc lên cấp. Nhưng Giám đốc nên biết ' +
              'người này đang quá tải trước khi ký thêm việc cho họ.';
          }
        }
      }

      if (dk.ma === 'NGUYENVONG') {
        var nv = n[dk.truong];
        if (nv === 'co')        { o.trangThai = 'dat';  o.noi = 'Nhà đã nói còn muốn đi tiếp.'; }
        else if (nv === 'khong'){ o.trangThai = 'hut';  o.noi = 'Đã hỏi — nhà KHÔNG muốn đi tiếp.';
                                  o.dungLai = true; o.canLam = dk.hut; }
        else                    { o.trangThai = 'chuaBiet'; o.chuaHoi = true;
                                  o.noi = 'CHƯA HỎI. Vắng mặt không phải là "không".';
                                  o.canLam = dk.hut; }
      }

      ra.push(o);
    });

    var hut  = ra.filter(function (x) { return x.trangThai === 'hut'; });
    var chua = ra.filter(function (x) { return x.trangThai === 'chuaBiet'; });
    /* Điều kiện chỉ CẢNH BÁO thì không chặn — nhưng vẫn hiện nguyên màu. */
    var chan = hut.filter(function (x) { return !x.chiCanhBao; });

    return {
      id: n.id, nha: n.nha, cap: (n.capDeNghi || {}).cap, ma: (n.capDeNghi || {}).ma,
      dieu: ra,
      duTrinh: chan.length === 0 && chua.length === 0,
      thieu: chan.map(function (x) { return x.ten; }),
      chuaBiet: chua.map(function (x) { return x.ten; }),
      canhBao: hut.filter(function (x) { return x.chiCanhBao; })
                  .map(function (x) { return x.noi; }),
      nguoiKy: d.nguoiKy, quyen: d.quyen,
      mayKhongDuyet: (G.BLV_DUYET_LUAT || {}).mayKhongDuyet || '',
      chuaKy: true
    };
  };

  /* Ai đang ngồi ở máy có được ký không. Đọc quyền, không đọc tên vai —
     tên vai đổi được, quyền thì gắn với bảng phân quyền. */
  G.blvAiKyDuoc = function () {
    var d = G.BLV_DUYET || {};
    var acc = G.S && G.S.acc;
    var duoc = !!(acc && typeof G.can === 'function' && G.can(d.quyen));
    return { duoc: duoc, quyen: d.quyen, nguoiKy: d.nguoiKy,
      ai: acc ? acc.ten : null,
      vi: duoc ? undefined
        : 'Chỉ ' + d.nguoiKy + ' phê duyệt cấp. Việc của Coach là dựng hồ sơ và trình.' };
  };

  /* ═══════════ HÀM QUAN TRỌNG NHẤT: CHIA NĂM NGĂN ═══════════ */
  G.blvXep = function (tenCoach) {
    var ngan = (G.BLV_NGAN || []).slice().sort(function (a, b) { return a.thu - b.thu; });
    if (!ngan.length) return { chuaDo: true, thieu: 'BLV_NGAN' };
    var ds = G.blvNha(tenCoach);

    var gom = {};
    ngan.forEach(function (x) { gom[x.ma] = []; });

    ds.forEach(function (n) {
      var vi = G.blvViCoDo(n, tenCoach);
      var viec = G.blvViecToiHan(n);
      var im = G.blvDangIm(n);
      /* Hồ sơ trình duyệt đi theo nhà vào BẤT KỲ ngăn nào, không chỉ
         ngăn chờ ký. Nhà rơi xuống ĐANG YÊN mà hồ sơ còn thiếu ba điều
         kiện thì Coach vẫn phải thấy nó thiếu gì — nếu không, "đang yên"
         đọc ra thành "không có việc". */
      var hoSo = (n.capDeNghi && n.capDeNghi.chuaKy)
        ? G.blvDuyetDuoc(n, tenCoach) : undefined;

      /* Xét theo ĐÚNG thứ tự ngăn đã khai ở kho, dừng ở ngăn đầu tiên
         khớp. Không viết cứng thứ tự vào hàm: viết cứng thì đổi thứ tự
         ở kho mà hàm vẫn chạy theo thứ tự cũ, và hai chỗ lệch nhau
         trong im lặng. */
      var khop = {
        KHAN:       function () {
          var qh = G.blvQuaHan(n);
          return (vi.length || qh) ? { viCo: vi, quaHan: qh || undefined } : null;
        },
        QUAN_TRONG: function () { return viec.length ? { viec: viec } : null; },
        CHO_KY:     function () {
          if (!(n.capDeNghi && n.capDeNghi.chuaKy)) return null;
          var hs = hoSo || {};
          /* ═══ CHỖ BẢN 9.57 CHƯA CHỮA HẾT ═══

             Bản 9.57 tôi hạ ngăn này xuống dưới VIỆC QUAN TRỌNG vì nó
             nuốt sáu nhà. Đo lại ở 9.59: nó vẫn nuốt năm nhà và ba ngăn
             dưới trống trơn. Hạ một bậc không chữa được gốc — gốc là
             điều kiện vào ngăn LUÔN ĐÚNG: chưa nhà nào từng được ký,
             nên nhà nào cũng "đang chờ ký".

             Một ngăn có điều kiện luôn đúng thì nó ăn hết mọi ngăn dưới
             nó, dù xếp ở bậc nào.

             Nay ngăn này chỉ nhận hồ sơ ĐÃ ĐỦ BA ĐIỀU KIỆN — tức việc
             thật sự nằm trên bàn Giám đốc. Hồ sơ còn thiếu là việc của
             Coach, không phải việc chờ ký, và nó hiện ở lượt rà soát
             buổi sáng RS-CAP cùng dòng ghi trên thẻ nhà. */
          if (!hs.duTrinh) return null;
          return { viCo: [], hoSo: hs };
        },
        IM_LANG:    function () { return im ? { im: im } : null; }
      };
      for (var i = 0; i < ngan.length; i++) {
        var x = ngan[i];
        if (x.laPhanConLai) break;
        var k = khop[x.ma] && khop[x.ma]();
        if (k) { k.nha = n; k.hoSo = k.hoSo || hoSo; gom[x.ma].push(k); return; }
      }
      var vet = ngan.filter(function (x) { return x.laPhanConLai; })[0];
      gom[vet.ma].push({ nha: n, hoSo: hoSo });
    });

    return {
      coach: tenCoach, tongNha: ds.length,
      ngan: ngan.map(function (x) {
        return { ma: x.ma, ten: x.ten, c: x.c, thu: x.thu, bac: x.bac, la: x.la,
          lam: x.lam, ds: gom[x.ma], so: gom[x.ma].length };
      }),
      tongTrongNgan: ngan.reduce(function (s, x) { return s + gom[x.ma].length; }, 0)
    };
  };

  /* Tín hiệu đỏ đang chạm. Đọc BV_DO cho hạn giờ và người nhận —
     không tự đặt hạn ở đây. */
  /* ═══════════ TÍN HIỆU ĐỎ ĐANG CHẠY ═══════════

     Đường nối khai ở BV_DO_NOI, không viết trong hàm này. Hàm chỉ chạy
     bốn phép tính đã được khai, và KHÔNG tự thêm cái thứ năm.

     Bản 9.57–9.59 viết thẳng hai câu if trong hàm, và cả hai nối sai
     kiểu: tín hiệu đếm NGÀY nối vào trường đếm LẦN, tín hiệu so với
     LỊCH nối vào một ngưỡng tuyệt đối. Sai kiểu thì kết quả vẫn ra một
     danh sách nhà trông hợp lý — nên nó chạy ba bản không ai thấy. */
  G.blvViCoDo = function (n, tenCoach) {
    var ds = G.BV_DO || [], noi = G.BV_DO_NOI || [], ra = [];
    if (!ds.length || !noi.length) return ra;

    var dn = n.capDeNghi || {};
    var lech = Number(dn.lechLich);
    var chan = null;
    if (typeof G.bvNhanDuoc === 'function' && (tenCoach || n.coach))
      chan = G.bvNhanDuoc(tenCoach || n.coach, n.tang, null);

    /* Mỗi khoá là số hiệu tín hiệu ở BV_DO_NOI. Thêm một khoá ở đây mà
       không khai ở kho thì blvSoiNoiDo() đỏ, và ngược lại. */
    var dodac = {
      6:  function () { return lech === 2; },
      7:  function () { return lech >= 3; },
      8:  function () { return n.nguyenVong === 'khong'; },
      17: function () { return !!(chan && chan.chan); }
    };

    noi.forEach(function (x) {
      if (!x.noi || !dodac[x.so]) return;
      if (!dodac[x.so]()) return;
      var t = ds.filter(function (d) { return d.so === x.so; })[0];
      if (!t) return;
      ra.push({ muc: t.muc, so: t.so, tinHieu: t.tinHieu, hanhDong: t.hanhDong,
        nguoiNhan: t.nguoiNhan, hanGio: t.hanGio, doBang: x.noi });
    });
    return ra;
  };

  /* Bao nhiêu tín hiệu máy bắt được, bao nhiêu là việc của tai người.
     Con số này hiện lên màn — Coach cần biết mình đang được canh mấy
     phần, chứ không đọc "hai mươi tín hiệu đỏ" rồi yên tâm. */
  G.blvDoCanhDuoc = function () {
    var noi = G.BV_DO_NOI || [];
    var may = noi.filter(function (x) { return x.noi; });
    return { tong: noi.length, may: may.length, nguoi: noi.length - may.length,
      dsMay: may.map(function (x) { return x.so; }),
      luat: (G.BV_DO_NOI_LUAT || {}).bonTrenHaiMuoi || '' };
  };

  /* Đã QUÁ ngày cuối tầng mà chưa qua cổng. Ngăn KHẨN khai sẵn "hoặc có
     việc đã QUÁ hạn giờ" — bản đầu tôi khai luật ấy mà không viết mã cho
     nó, và màn hình lộ ra ngay: một nhà ở ngày 96 trên 90 vẫn nằm ngăn
     việc quan trọng, cạnh những nhà còn hai ngày nữa mới tới hạn. */
  G.blvQuaHan = function (n) {
    var tong = SO_NGAY[n.tang] || 0;
    if (!tong) return null;
    var qua = Number(n.ngay || 0) - tong;
    if (qua <= 0) return null;
    var cong = (G.BV_CONG || []).filter(function (c) {
      return String(c.chuyen || '').indexOf('Tầng ' + n.tang.slice(1)) === 0;
    })[0];
    return {
      quaNgay: qua,
      ten: 'Quá ngày cuối tầng ' + qua + ' ngày mà chưa qua cổng',
      cong: cong ? cong.ma + ' · ' + cong.chuyen : undefined,
      lam: 'Xử hôm nay: hoặc mở cổng nếu đủ điều kiện, hoặc ghi biên bản gia hạn. ' +
        'Để trôi thêm là nhà đang trả tiền cho một tầng đã hết ngày.',
      khongDuocLam: 'Không mở cổng chỉ vì đã quá ngày. Quá ngày không phải một điều kiện.'
    };
  };

  /* Việc tới hạn trong bảy ngày: mốc gặp của chặng, và cổng cuối tầng. */
  G.blvViecToiHan = function (n) {
    var ra = [], tong = SO_NGAY[n.tang] || 0;
    if (G.blvQuaHan(n)) return ra;   /* quá hạn thì nó là ca KHẨN, không phải việc sắp tới */
    if (tong && n.conLai !== undefined && n.conLai <= 7) {
      var cong = (G.BV_CONG || []).filter(function (c) {
        return String(c.chuyen || '').indexOf('Tầng ' + n.tang.slice(1)) === 0;
      })[0];
      ra.push({
        loai: 'Cổng chuyển tầng', conLai: n.conLai,
        ten: cong ? cong.ma + ' · ' + cong.chuyen : 'Cổng cuối tầng ' + n.tang,
        dieuKien: cong ? cong.dieuKienMo : undefined,
        khiNaoKhongMo: cong ? cong.khiNaoKhongMo : undefined
      });
    }
    /* Mốc gặp đọc từ BLV_MOC, không viết cứng ở đây. */
    var mm = G.blvMocGap(n.tang);
    (mm.ngay || []).forEach(function (m) {
      var cach = m - Number(n.ngay || 0);
      if (cach >= 0 && cach <= 7)
        ra.push({ loai: 'Buổi gặp mốc', conLai: cach,
          ten: (mm.ten || 'Buổi gặp') + ' — ngày ' + m,
          chuanBi: 'Gói tài nguyên đóng trước 48 giờ', nguon: mm.nguon });
    });
    return ra;
  };

  /* ═══════════ MỐC GẶP CỦA MỘT TẦNG ═══════════

     Hai đường: "cứ N ngày một mốc", hoặc "đọc ranh giới từ một kho
     khác". Đường thứ hai quan trọng hơn — T3 và T4 KHÔNG chép lại con
     số ngày vào BLV_MOC, chúng trỏ sang T34_T3_CHANG và T34_T4_MUA và
     máy cắt ranh giới lúc chạy. Chép số vào đây thì ngày sổ tay đổi
     chặng, bảng mốc ở lại — và Coach đúng hẹn với một lịch đã chết. */
  G.blvMocGap = function (tang) {
    var t = String(tang || '').toUpperCase();
    var d = (G.BLV_MOC || []).filter(function (x) { return x.tang === t; })[0];
    if (!d) return { chuaKhai: true, tang: t, ngay: [],
      vi: 'Tầng ' + t + ' chưa khai mốc gặp ở BLV_MOC.' };
    var tong = SO_NGAY[t] || 0, ngay = [];

    if (d.cach === 'moiN' && d.n > 0) {
      for (var i = d.n; i <= tong; i += d.n) ngay.push(i);
      /* Mốc cuối LUÔN là ngày khép tầng — đó là cổng nghiệm thu. Nhưng
         nếu mốc đều đặn đã rơi sát ngày ấy thì thay nó, đừng thêm: tầng
         5 chia mỗi quý ra 91·182·273·364, thêm 365 nữa thành hai buổi
         cách nhau một ngày. */
      var cuoi = ngay[ngay.length - 1];
      if (tong && cuoi !== tong) {
        if (cuoi && tong - cuoi < d.n / 2) ngay[ngay.length - 1] = tong;
        else ngay.push(tong);
      }
    } else if (d.cach === 'tuKho') {
      var kho = G[d.tuKho] || [];
      kho.forEach(function (x) {
        /* "31–60" hay "4–6" — lấy vế SAU, đó là ngày khép chặng. */
        var m = String(x.ngay || x.thang || '').match(/(\d+)\s*[–-]\s*(\d+)/);
        if (!m) return;
        /* Trường thang đếm bằng THÁNG, trường ngay đếm bằng NGÀY. Nhân
           nhầm đơn vị ở đây thì mốc quý của tầng 4 rơi vào ngày thứ 3. */
        var so = Number(m[2]);
        ngay.push(x.thang && !x.ngay ? Math.round(so * (tong / 12)) : so);
      });
    }
    return { tang: t, ten: d.ten, nguon: d.nguon, lech: d.lech,
      ngay: ngay.filter(function (v, i, a) { return v > 0 && a.indexOf(v) === i; })
                .sort(function (a, b) { return a - b; }) };
  };

  /* ═══════════ NHÀ ĐANG TỤT NHỊP ═══════════

     Bốn mức hụt của BV_TUTCAP dùng CÙNG MỘT thứ tiếng với hai mươi tín
     hiệu đỏ: "trượt 1 mốc" · "trượt 2 mốc liên tiếp" · "trượt cả chặng"
     · "gia đình yêu cầu dừng". Nên đo bằng cùng một con số — lechLich,
     số mốc nhà đang chậm hơn lịch.

     Hai mức nặng đã thành tín hiệu đỏ và đi vào ngăn KHẨN, nên ngăn này
     chỉ còn giữ Hụt nhẹ. Đó đúng là chỗ nó phải ở: nhắc một lần bằng
     câu nhẹ, rồi để yên. */
  G.blvDangIm = function (n) {
    var lech = Number((n.capDeNghi || {}).lechLich);
    if (!(lech === 1)) return null;
    var m = (G.BV_TUTCAP || []).filter(function (x) { return /nhẹ/i.test(x.muc); })[0] || {};
    return {
      muc: m.muc || 'Hụt nhẹ',
      dauHieu: 'Chậm hơn lịch một mốc — ' + (m.dauHieu || ''),
      lam: m.hanhDong, khong: m.tuyetDoiKhong,
      doBang: 'blvCapDeNghi().lechLich === 1'
    };
  };

  /* ═══════════ GÓI TÀI NGUYÊN — TÁM Ô, Ô TRỐNG PHẢI HIỆN ═══════════ */
  G.blvGoi = function (nhaId, tenCoach) {
    var n = G.blvNha(tenCoach).filter(function (x) { return x.id === nhaId; })[0];
    if (!n) return { khongCo: true, id: nhaId };
    var dn = n.capDeNghi || {};
    var o = (typeof G.bvCap === 'function' && dn.cap) ? G.bvCap(n.tang, dn.cap) : null;
    var nhip = (G.BV_NHIP || []).filter(function (x) { return x.so === 6; })[0];
    var kho = (typeof G.t34Kho === 'function') ? G.t34Kho(n.tang) : [];
    var cong = (G.BV_CONG || []).filter(function (c) {
      return String(c.chuyen || '').indexOf('Tầng ' + n.tang.slice(1)) === 0;
    })[0];
    var band = (G.MT_BANG || []).filter(function (b) { return b.ma === n.band; })[0];

    function oGoi(ma, noiDung, chuaCoVi) {
      var d = (G.BLV_GOI || []).filter(function (x) { return x.ma === ma; })[0] || {};
      return { ma: ma, ten: d.ten, tuKho: d.tuKho,
        coGi: noiDung || undefined,
        chuaCo: noiDung ? undefined : (chuaCoVi || 'Kho chưa có phần này cho ô đang xét.') };
    }

    return {
      nha: n,
      o: [
        oGoi('VITRI', n.tang + ' · ngày ' + n.ngay + '/' + n.tongNgay +
          (n.chang ? ' · ' + (n.chang.ten || ('chặng ' + n.chang.chang) || n.chang.mua) : '') +
          (dn.cap ? ' · cấp đề nghị ' + dn.cap : '') +
          (band ? ' · băng ' + band.ma + ', ' + band.nhip : '')),
        oGoi('BANGCHUNG', o && o.bangChung, 'Chưa xác định được ô cấp độ nên chưa biết đòi bằng chứng gì.'),
        oGoi('VIEC_MAY', o && o.ai, 'Ô cấp độ này không giao việc tự động nào cho máy.'),
        oGoi('VIEC_NGUOI', o && o.nguoi, 'Ô cấp độ này bản vẽ để trống cột người làm — máy chạy một mình.'),
        oGoi('KICHBAN', nhip ? ('Nhịp ' + nhip.so + ' ' + nhip.ten + ' — chuẩn: “' + nhip.cauChuan +
          '” · CẤM: “' + nhip.cauCam + '”') : null),
        oGoi('DANGKHO', kho.length ? kho.map(function (k) { return k.ma + ' ' + k.ten; }).join(' · ')
          : null, 'Tầng này chưa có bảng dạng khó trong kho.'),
        oGoi('DUONGTUT', o && o.neuTut),
        oGoi('CONG', cong ? (cong.ma + ' — mở khi: ' + cong.dieuKienMo + ' · KHÔNG mở khi: ' +
          cong.khiNaoKhongMo) : null, 'Chưa nối được cổng cho tầng này.')
      ],
      luat: (G.BLV_GOI_LUAT || {}).khongDongGoiHo || ''
    };
  };

  /* ═══════════ TRỢ LÝ NHẮC VIỆC ═══════════ */
  /* ═══════════ TRỢ LÝ NHẮC VIỆC ═══════════

     ═══ LỜI NHẮC ĐỌC TỪ SỰ THẬT, KHÔNG ĐỌC TỪ NGĂN ═══

     Bản 9.57–9.59 duyệt theo ngăn: ngăn KHẨN thì bắn N-DO, ngăn VIỆC
     QUAN TRỌNG thì bắn N-GAP. Mà năm ngăn LOẠI TRỪ NHAU — một nhà chỉ
     nằm ở một ngăn. Nên nhà đang khủng hoảng VÀ có buổi gặp sau hai
     ngày thì mất luôn lời nhắc chuẩn bị buổi gặp ấy.

     Đo ở 9.59: ba trên bảy loại nhắc chưa bao giờ bắn một lần nào. Một
     lời nhắc chưa từng bắn thì chưa phải một lời nhắc — cùng cái luật
     đã dùng cho phép kiểm.

     Ngăn trả lời "hôm nay xử nhà nào TRƯỚC" — một câu hỏi cần loại trừ.
     Lời nhắc trả lời "nhà này còn việc gì" — một câu hỏi KHÔNG được
     loại trừ. Nay mỗi loại nhắc đọc thẳng sự thật của nhà. */
  G.blvNhac = function (tenCoach) {
    var ds = G.blvNha(tenCoach);
    if (!ds.length && !(G.BLV_NHAC || []).length)
      return { chuaDo: true, thieu: 'BLV_NHAC', ds: [], so: 0 };
    var loai = {};
    (G.BLV_NHAC || []).forEach(function (x) { loai[x.ma] = x; });
    var ra = [];

    ds.forEach(function (n) {
      /* N-DO — tín hiệu đỏ đang chạy, và việc đã quá hạn giờ */
      var qh = G.blvQuaHan(n);
      if (qh) ra.push({ ma: 'N-DO', c: '#BE0E16', nha: n.nha, id: n.id,
        viec: qh.ten, lam: qh.lam, han: 'hôm nay', nguoiNhan: 'Coach',
        cam: qh.khongDuocLam, nguon: 'BLV_NGAN KHAN' });
      G.blvViCoDo(n, tenCoach).forEach(function (d) {
        ra.push({ ma: 'N-DO', c: '#BE0E16', nha: n.nha, id: n.id,
          viec: d.tinHieu, lam: d.hanhDong, han: d.hanGio, nguoiNhan: d.nguoiNhan,
          nguon: 'BV_DO #' + d.so + ' · đo bằng ' + (d.doBang || '—') });
      });

      /* N-GAP và N-CONG — việc tới hạn, không phụ thuộc nhà đang ở ngăn nào */
      G.blvViecToiHan(n).forEach(function (v) {
        var gap = v.loai === 'Buổi gặp mốc';
        var l = loai[gap ? 'N-GAP' : 'N-CONG'] || {};
        /* Chỉ nhắc khi đã vào cửa sổ báo trước của chính loại nhắc ấy —
           truoc tính bằng GIỜ ở kho, đổi ra ngày để so với conLai. */
        var cua = Math.ceil(Number(l.truoc || 0) / 24);
        if (v.conLai > cua) return;
        ra.push({ ma: gap ? 'N-GAP' : 'N-CONG', c: '#5140B4', nha: n.nha, id: n.id,
          viec: v.ten, lam: v.chuanBi || ('Điều kiện: ' + (v.dieuKien || '—')),
          han: 'còn ' + v.conLai + ' ngày', nguoiNhan: 'Coach',
          nguon: v.nguon || (l.tuKho || '') });
      });

      /* N-IM — nhịp đang tụt nhẹ */
      var im = G.blvDangIm(n);
      if (im) ra.push({ ma: 'N-IM', c: '#B45309', nha: n.nha, id: n.id,
        viec: im.dauHieu, lam: im.lam, han: 'trong ngày', nguoiNhan: 'Coach',
        cam: im.khong, nguon: 'BV_TUTCAP · ' + (im.doBang || '') });

      /* N-BAOCAO — sắp khép một chặng. Mốc cuối cùng của tầng là chỗ
         phải có báo cáo ba trụ, và nó khác buổi gặp mốc: buổi gặp là
         ngồi với nhà, báo cáo là thứ gửi trước khi ngồi. */
      var mm = G.blvMocGap(n.tang);
      var chot = (mm.ngay || [])[(mm.ngay || []).length - 1];
      var cachChot = chot === undefined ? null : chot - Number(n.ngay || 0);
      var cuaBC = Math.ceil(Number((loai['N-BAOCAO'] || {}).truoc || 0) / 24);
      if (cachChot !== null && cachChot >= 0 && cachChot <= cuaBC)
        ra.push({ ma: 'N-BAOCAO', c: '#0B6675', nha: n.nha, id: n.id,
          viec: 'Báo cáo khép tầng ' + n.tang + ' — mốc ngày ' + chot,
          lam: (loai['N-BAOCAO'] || {}).noi || '', han: 'còn ' + cachChot + ' ngày',
          nguoiNhan: 'Coach', nguon: 'T34_BATRU · BLV_MOC' });

      /* N-KY — hồ sơ đã đủ ba điều kiện thì việc nằm trên bàn Giám đốc;
         còn thiếu thì nó là việc của Coach. Hai câu khác nhau, hai người
         nhận khác nhau. */
      var dn = n.capDeNghi || {};
      if (dn.chuaKy) {
        var hs = G.blvDuyetDuoc(n, tenCoach) || {};
        /* Chỉ nhắc khi hồ sơ ĐÃ ĐỦ — cùng luật đã dùng cho ngăn chờ ký.
           Bản đầu tôi nhắc cả hồ sơ còn thiếu, và mười nhà ra mười lời
           nhắc giống hệt lượt rà soát RS-CAP buổi sáng. Một việc nói hai
           chỗ thì người đọc bỏ qua cả hai. */
        if (hs.duTrinh)
          ra.push({ ma: 'N-KY', c: '#B4720F', nha: n.nha, id: n.id,
            viec: 'Đề nghị cấp ' + dn.cap + ' — ' + (dn.moc || ''),
            lam: 'Hồ sơ đủ ba điều kiện. Trình ' + (hs.nguoiKy || 'người phê duyệt') +
              ' đọc bằng chứng rồi duyệt hoặc từ chối. Từ chối cũng ghi lý do.',
            han: (loai['N-KY'] || {}).khi,
            nguoiNhan: hs.nguoiKy || 'Giám đốc điều hành', nguon: 'BLV_DUYET' });
      }
    });

    /* N-TRAN — trần công suất. Đọc bvNhanDuoc() chứ không tự cắt chuỗi
       trần lấy con số đầu tiên: "8 gia đình T4 hoặc 3 gia đình T5" cắt
       thô ra 8, và một Coach giữ 3 nhà T5 đã đủ trần vẫn im. */
    var nguoi = tenCoach || (ds[0] && ds[0].coach);
    if (nguoi && typeof G.bvNhanDuoc === 'function') {
      ['T4', 'T5', 'T3', 'T2'].forEach(function (t) {
        var r = G.bvNhanDuoc(nguoi, t, null);
        if (r.chuaBiet) return;
        if (r.chan || r.sapDay)
          ra.push({ ma: 'N-TRAN', c: '#BE0E16', nha: '—',
            viec: r.vai + ' đang giữ ' + r.dangGiu + '/' + r.tran + ' nhà ' + t +
              (r.chan ? ' — ĐÃ ĐỦ TRẦN' : ' — ' + r.sapDay),
            lam: r.lam || 'Trần công suất đứng trên doanh thu. Đủ trần thì dừng nhận nhà mới.',
            han: 'ngay', nguoiNhan: 'Coach + Admin', nguon: 'BV_VAI.tran · bvNhanDuoc()' });
      });
    }

    return { ds: ra, so: ra.length, luat: (G.BLV_NHAC_LUAT || {}).khongTuGui || '' };
  };

  /* ═══════════ BỐN LƯỢT RÀ SOÁT ═══════════ */
  G.blvRaSoat = function (tenCoach) {
    var ds = G.blvNha(tenCoach), ra = [];
    (G.BLV_RASOAT || []).forEach(function (r) {
      var thay = [];
      if (r.ma === 'RS-NHA')
        thay = ds.filter(function (n) { return Number(n.nhac) >= 1; })
                 .map(function (n) { return n.nha + ' — đã nhắc ' + n.nhac + ' lần'; });
      if (r.ma === 'RS-CAP')
        thay = ds.filter(function (n) { return (n.capDeNghi || {}).chuaKy; })
                 .map(function (n) {
                   var hs = G.blvDuyetDuoc(n, tenCoach) || {};
                   var t = (hs.thieu || []).concat(hs.chuaBiet || []);
                   return n.nha + ' — đề nghị cấp ' + n.capDeNghi.cap +
                     (t.length ? ', hồ sơ còn thiếu: ' + t.join(' · ')
                               : ', đủ điều kiện trình ' + (hs.nguoiKy || ''));
                 });
      if (r.ma === 'RS-KICHBAN') {
        thay = ds.filter(function (n) {
          var dn = n.capDeNghi || {};
          var o = (typeof G.bvCap === 'function' && dn.cap) ? G.bvCap(n.tang, dn.cap) : null;
          return o && !o.nguoi;
        }).map(function (n) { return n.nha + ' — ô ' + (n.capDeNghi || {}).ma + ' trống cột người làm'; });
      }
      if (r.ma === 'RS-TINHHUONG') {
        var dem = {};
        ds.forEach(function (n) { dem[n.tang] = (dem[n.tang] || 0) + 1; });
        thay = Object.keys(dem).filter(function (t) { return dem[t] >= 2; })
                     .map(function (t) { return t + ' — ' + dem[t] + ' nhà cùng tầng, dạng khó dễ lặp'; });
      }
      ra.push({ ma: r.ma, ten: r.ten, hoi: r.hoi, ra: r.ra, viDangKe: r.viDangKe,
        thay: thay, so: thay.length });
    });
    return ra;
  };

  /* ═══════════ KHOÁ 1: VÉT CẠN ═══════════ */
  G.blvSoiVetCan = function (tenCoach) {
    var x = G.blvXep(tenCoach);
    if (x.chuaDo) return { chuaDo: true, thieu: x.thieu, loi: [] };
    var loi = [];
    if (x.tongTrongNgan !== x.tongNha)
      loi.push('tổng năm ngăn = ' + x.tongTrongNgan + ', tổng số nhà = ' + x.tongNha +
        ' — có nhà lọt khe giữa hai ngăn');
    /* Không nhà nào được nằm ở hai ngăn. */
    var thay = {};
    (x.ngan || []).forEach(function (ng) {
      ng.ds.forEach(function (m) {
        var id = m.nha.id;
        if (thay[id]) loi.push(m.nha.nha + ' nằm ở cả ' + thay[id] + ' và ' + ng.ma);
        thay[id] = ng.ma;
      });
    });
    var vet = (G.BLV_NGAN || []).filter(function (n) { return n.laPhanConLai; });
    if (vet.length !== 1) loi.push('phải có ĐÚNG MỘT ngăn vét phần còn lại, đang có ' + vet.length);
    return { chuaDo: false, loi: loi, tongNha: x.tongNha, tongTrongNgan: x.tongTrongNgan };
  };

  /* ═══════════ KHOÁ 2: THỨ TỰ NGĂN THEO SV_THUTU ═══════════ */
  G.blvSoiThuTu = function () {
    var ngan = (G.BLV_NGAN || []).slice().sort(function (a, b) { return a.thu - b.thu; });
    var loi = [];
    if (!ngan.length) return { chuaDo: true, thieu: 'BLV_NGAN', loi: [] };
    if (!(G.SV_THUTU || []).length) return { chuaDo: true, thieu: 'SV_THUTU', loi: [] };
    var bac = {};
    (G.SV_THUTU || []).forEach(function (b) { bac[b.ma] = b.bac; });
    var truoc = 0;
    ngan.forEach(function (n) {
      if (!n.bac) { if (!n.laPhanConLai) loi.push(n.ma + ' không mang bậc mà cũng không phải ngăn vét'); return; }
      if (!bac[n.bac]) { loi.push(n.ma + ' mang bậc không có trong SV_THUTU: ' + n.bac); return; }
      if (bac[n.bac] < truoc) loi.push(n.ma + ' xếp sau một ngăn có bậc thấp hơn — thứ tự đảo');
      truoc = bac[n.bac];
    });
    var d1 = ngan[0];
    if (!d1 || bac[d1.bac] !== 1) loi.push('ngăn đầu phải mang bậc 1 (an toàn), đang là ' + (d1 && d1.bac));
    return { chuaDo: false, loi: loi };
  };

  /* ═══════════ KHOÁ 3, 4, 5 ═══════════ */
  G.blvSoiGoi = function () {
    var ds = G.BLV_GOI || [], loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'BLV_GOI', loi: [] };
    if (ds.length !== 8) loi.push('gói có ' + ds.length + ' ô, phải tám');
    var thay = {};
    ds.forEach(function (o) {
      if (thay[o.ma]) loi.push(o.ma + ' trùng mã');
      thay[o.ma] = 1;
      if (!o.ten) loi.push('ô ' + o.o + ' thiếu tên');
      if (!o.gom) loi.push(o.ma + ' chưa nói gom những gì');
      if (!o.tuKho) loi.push(o.ma + ' chưa khai lấy từ kho nào — ô không nguồn là ô sẽ bịa');
    });
    if (!(G.BLV_GOI_LUAT || {}).viKhongAn) loi.push('chưa khai vì sao không ẩn ô trống');
    return { chuaDo: false, loi: loi, so: ds.length };
  };

  G.blvSoiNhac = function () {
    var ds = G.BLV_NHAC || [], loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'BLV_NHAC', loi: [] };
    ds.forEach(function (n) {
      if (!n.khi) loi.push(n.ma + ' chưa khai khi nào nhắc');
      if (!co(n.truoc)) loi.push(n.ma + ' chưa khai nhắc trước bao lâu');
      if (!n.noi) loi.push(n.ma + ' chưa khai nói gì');
    });
    var l = G.BLV_NHAC_LUAT || {};
    if (!l.khongNhacDon) loi.push('chưa khai luật không nhắc dồn');
    if (!l.khongTuGui) loi.push('chưa khai luật trợ lý không tự gửi');
    return { chuaDo: false, loi: loi, so: ds.length };
  };

  /* Bàn này KHÔNG có đường gửi thẳng cho gia đình. Phép kiểm đọc chính
     mã của tệp — khai luật mà mã vẫn gửi thì luật là lời suông. */
  G.blvSoiKhongTuGui = function () {
    var loi = [];
    var ma = String(G.blvGoi) + String(G.blvNhac) + String(G.blvXep);
    if (/fetch\(|XMLHttpRequest|sendBeacon|mcGoi|guiKhach/.test(ma))
      loi.push('bàn làm việc đang có đường gửi ra ngoài — luật khongTuGui thành lời suông');
    if (!(G.BLV_LUAT || {}).khongTuGuiChoNha) loi.push('chưa khai luật không tự gửi');
    return { chuaDo: false, loi: loi };
  };

  /* ═══════════ KHOÁ 7: MỖI TÍN HIỆU ĐỎ PHẢI KHAI ĐƯỜNG NỐI ═══════════

     Không tín hiệu nào được im lặng. Khai được thì khai bằng phép tính
     nào; không khai được thì nói vì sao và AI bắt thay. Trống cả hai là
     một dòng chữ đỏ trên màn mà không ai canh. */
  G.blvSoiNoiDo = function () {
    var ds = G.BV_DO || [], noi = G.BV_DO_NOI || [], loi = [];
    if (!ds.length || !noi.length)
      return { chuaDo: true, thieu: !ds.length ? 'BV_DO' : 'BV_DO_NOI', loi: [] };

    if (noi.length !== ds.length)
      loi.push('có ' + ds.length + ' tín hiệu mà bảng nối khai ' + noi.length);

    var thay = {};
    noi.forEach(function (x) {
      if (thay[x.so]) loi.push('tín hiệu ' + x.so + ' khai hai lần');
      thay[x.so] = 1;
      if (!ds.filter(function (d) { return d.so === x.so; })[0])
        loi.push('bảng nối có tín hiệu ' + x.so + ' mà BV_DO không có');
      if (x.noi && x.chuaNoi) loi.push('tín hiệu ' + x.so + ' vừa khai nối vừa khai chưa nối');
      if (!x.noi && !x.chuaNoi) loi.push('tín hiệu ' + x.so + ' không khai gì cả');
      if (x.noi && !x.vi) loi.push('tín hiệu ' + x.so + ' nối mà không nói vì sao nối như thế');
      if (x.chuaNoi && !x.aiBat) loi.push('tín hiệu ' + x.so + ' chưa nối mà không nói ai bắt thay');
    });
    ds.forEach(function (d) {
      if (!thay[d.so]) loi.push('tín hiệu ' + d.so + ' chưa có trong bảng nối');
    });

    /* Hàm chạy không được nối nhiều hơn kho khai. Thêm một phép đo
       trong hàm mà quên khai ở kho là lại có một đường nối vô hình. */
    var trongHam = String(G.blvViCoDo).match(/^\s*(\d+):\s*function/gm) || [];
    var soHam = trongHam.map(function (x) { return Number(x.match(/\d+/)[0]); }).sort();
    var soKho = noi.filter(function (x) { return x.noi; })
                   .map(function (x) { return x.so; }).sort();
    if (soHam.join(',') !== soKho.join(','))
      loi.push('hàm đo tín hiệu [' + soHam + '] mà kho khai nối [' + soKho + ']');

    return { chuaDo: false, loi: loi, may: soKho.length, tong: ds.length };
  };

  /* ═══════════ KHOÁ 8: NĂM TẦNG ĐỀU CÓ MỐC GẶP ═══════════ */
  G.blvSoiMoc = function () {
    var loi = [], ds = G.BLV_MOC || [];
    if (!ds.length) return { chuaDo: true, thieu: 'BLV_MOC', loi: [] };
    ['T1', 'T2', 'T3', 'T4', 'T5'].forEach(function (t) {
      var m = G.blvMocGap(t);
      if (m.chuaKhai) { loi.push('tầng ' + t + ' chưa khai mốc gặp'); return; }
      if (!m.ngay.length) loi.push('tầng ' + t + ' khai mốc mà máy tính ra rỗng');
      var tong = SO_NGAY[t] || 0;
      m.ngay.forEach(function (v) {
        if (tong && v > tong) loi.push('tầng ' + t + ' có mốc ngày ' + v + ' vượt quá ' + tong);
      });
    });
    ds.forEach(function (d) {
      if (!d.nguon) loi.push('mốc tầng ' + d.tang + ' chưa dẫn nguyên văn câu đã hứa');
      if (d.cach === 'tuKho' && !(G[d.tuKho] || []).length)
        loi.push('mốc tầng ' + d.tang + ' trỏ sang ' + d.tuKho + ' mà kho ấy rỗng');
      /* Chép số ngày vào kho mốc là dựng bản thứ hai. */
      if (d.cach === 'tuKho' && d.n)
        loi.push('mốc tầng ' + d.tang + ' vừa trỏ sang kho vừa chép sẵn số ngày');
    });
    return { chuaDo: false, loi: loi, so: ds.length };
  };

  /* ═══════════ KHOÁ 6: CỬA DUYỆT ═══════════

     Bốn điều phải đúng cùng lúc, và điều thứ ba là điều tôi sợ nhất:
     không kho BLV_ nào được phép ghi lại con số ngưỡng KPI. Ngày ai đó
     tiện tay chép "80" vào đây, hệ có hai ngưỡng cùng tên, và bản chép
     sẽ là bản không được sửa. */
  G.blvSoiDuyet = function () {
    var d = G.BLV_DUYET, ds = G.BLV_DUYET_DIEU || [], l = G.BLV_DUYET_LUAT || {}, loi = [];
    if (!d || !ds.length) return { chuaDo: true, thieu: 'BLV_DUYET', loi: [] };

    if (ds.length !== 3) loi.push('chốt của chủ hệ có ba điều kiện, kho đang có ' + ds.length);
    ds.forEach(function (x) {
      if (!x.tuKho) loi.push(x.ma + ' chưa khai đọc từ kho nào');
      if (!x.hut) loi.push(x.ma + ' chưa khai hụt thì làm gì');
      if (!x.aiLam) loi.push(x.ma + ' chưa khai ai làm');
    });

    /* Không chép ngưỡng — trừ MỘT chỗ: nguyên văn lời chủ hệ.
       Lần chạy thử đầu tiên phép kiểm này đỏ ngay khi kho còn lành, vì
       chính câu chốt có chữ "80%". Bỏ hẳn câu chốt đi thì mất nguyên văn,
       mà nới phép kiểm cho qua thì mất luôn cái nó canh. Đường thứ ba:
       MIỄN cho ô nguyên văn, rồi bắt con số trong ô ấy phải KHỚP với
       G.KPI_XIN_THEM. Ngày chủ hệ đổi ngưỡng, câu chốt cũ đỏ lên và có
       người phải đọc lại nó — đúng việc cần xảy ra. */
    if (typeof G.KPI_XIN_THEM === 'number') {
      var mien = { nguyenVanChot: 1 };
      var kho = JSON.parse(JSON.stringify([d, ds, l, G.BLV_CHOCHU || []]));
      Object.keys(mien).forEach(function (k) { delete kho[0][k]; });
      var re = new RegExp('(^|[^\\d])' + G.KPI_XIN_THEM + '([^\\d%]|%|$)');
      if (re.test(JSON.stringify(kho)))
        loi.push('kho cửa duyệt đang chép lại ngưỡng KPI ' + G.KPI_XIN_THEM +
          ' — ngưỡng chỉ sống ở G.KPI_XIN_THEM');

      var trichSo = (String(d.nguyenVanChot || '').match(/(\d+)\s*%/) || [])[1];
      if (!trichSo) loi.push('câu chốt của chủ hệ không còn nêu con số ngưỡng nào');
      else if (Number(trichSo) !== G.KPI_XIN_THEM)
        loi.push('câu chốt nói ngưỡng ' + trichSo + '%, kho đang chạy ' + G.KPI_XIN_THEM +
          '% — một trong hai đã đổi mà chỗ kia chưa theo');
    }

    /* Người ký phải là một quyền có thật trong bảng phân quyền, không
       phải một chuỗi đẹp. Sai tên quyền thì G.can() trả false với MỌI
       người, và cửa duyệt đóng vĩnh viễn mà không ai hiểu vì sao. */
    if (!d.quyen) loi.push('chưa khai quyền của người phê duyệt');
    else if (G.PERM && !co(G.PERM[d.quyen]))
      loi.push('quyền "' + d.quyen + '" không có trong bảng phân quyền');

    if (!l.mayKhongDuyet) loi.push('chưa khai luật máy không duyệt');
    if (!l.baTrangThai) loi.push('chưa khai vì sao mỗi điều kiện có ba trạng thái');

    /* Hàm phải trả đủ ba trạng thái, không được rút xuống hai. */
    var thu = { id: 'x', nha: 'Nhà thử', tang: 'T4', tuchu: 95, ngay: 300, vai: 9, nhac: 0,
      coach: '· nhà thử ·', capDeNghi: { cap: 9, chuaKy: true } };
    var r = G.blvDuyetDuoc(thu);
    if (!r.chuaDo) {
      if (r.duTrinh) loi.push('nhà chưa ai hỏi nguyện vọng mà cửa vẫn cho trình');
      var nv = (r.dieu || []).filter(function (x) { return x.ma === 'NGUYENVONG'; })[0];
      if (!nv || nv.trangThai !== 'chuaBiet')
        loi.push('vắng trường nguyện vọng phải ra CHƯA BIẾT, đang ra ' + (nv && nv.trangThai));
    }
    return { chuaDo: false, loi: loi, so: ds.length };
  };

  /* ═══════════════════════════════════════════════════════════
     MÀN HÌNH
     ═══════════════════════════════════════════════════════════ */
  G.VIEWS['ban-coach'] = function () {
    if (!G.BLV_NGAN)
      return U.empty('Chưa mở được phần này',
        'Bàn làm việc nằm trong gói nghề. Đăng nhập bằng tài khoản Coach để nạp.');

    var toi = (G.S && G.S.acc) || {};
    var tenCoach = toi.ten || undefined;
    var xep = G.blvXep(tenCoach);
    /* Coach chưa có nhà nào mang tên mình thì xem toàn bộ — để bàn
       không trống trơn trên máy demo, và nói rõ đang xem của ai. */
    var loc = true;
    if (!xep.chuaDo && xep.tongNha === 0) { xep = G.blvXep(); tenCoach = undefined; loc = false; }

    var loi = G.BLV_LOI || {};
    var o = U.ph({ eyebrow: 'BÀN LÀM VIỆC · COACH', ic: 'pulse', grad: 1,
      t: 'Nhớ — nhận việc — xử lý, không bỏ sót nhà nào',
      lead: loi.khongBoSotLaPhepCong || '' });

    /* ── Thanh đếm: năm ngăn, và phép cộng ── */
    var vc = G.blvSoiVetCan(tenCoach);
    o += '<div class="card mb" style="border-color:' + (vc.loi.length ? '#BE0E16' : '#0B667556') + '">' +
      '<div style="display:flex;flex-wrap:wrap;gap:14px;align-items:baseline">' +
      (xep.ngan || []).map(function (n) {
        return '<div style="min-width:120px"><span class="tiny up" style="color:' + n.c + '">' +
          h(n.ten) + '</span><br><b style="font-size:1.5em;color:' + n.c + '">' + n.so + '</b></div>';
      }).join('') +
      '<div style="min-width:150px;border-left:1px solid var(--gita-vien-2);padding-left:14px">' +
      '<span class="tiny up dim">TỔNG NHÀ</span><br><b style="font-size:1.5em">' + xep.tongNha + '</b></div>' +
      '</div>' +
      '<p class="tiny mt" style="line-height:1.7;color:' + (vc.loi.length ? '#BE0E16' : '#0B6675') + '">' +
      (vc.loi.length
        ? '<b>LỆCH: ' + h(vc.loi.join(' · ')) + '</b>'
        : 'Năm ngăn cộng lại ' + vc.tongTrongNgan + ' = ' + vc.tongNha +
          ' nhà. Không nhà nào lọt khe giữa hai ngăn.') + '</p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' +
      (loc ? 'Đang xem nhà của ' + h(tenCoach || '') + '.'
           : 'Tài khoản này chưa được giao nhà nào — đang xem toàn bộ nhà trong hệ.') + '</p></div>';

    /* Sáu khoá chạy thật mỗi lần mở màn. Bản 9.57 tôi viết năm khoá rồi
       chỉ gọi một — năm khoá kia đúng nghĩa chưa từng chạy, và một khoá
       chưa từng chạy thì chưa phải một khoá. */
    var lech = [].concat(
      G.blvSoiThuTu().loi || [], G.blvSoiGoi().loi || [], G.blvSoiNhac().loi || [],
      G.blvSoiKhongTuGui().loi || [], G.blvSoiDuyet().loi || [],
      G.blvSoiNoiDo().loi || [], G.blvSoiMoc().loi || []);
    if (lech.length)
      o += '<div class="card mb" style="border-color:#BE0E16"><b class="sm" style="color:#BE0E16">' +
        'LỆCH: ' + h(lech.join(' · ')) + '</b></div>';

    o += G.kaKhung ? G.kaKhung('ban-coach', 'dau') : '';

    /* ── Năm ngăn ── */
    (xep.ngan || []).forEach(function (ng) {
      o += U.sec(ng.ten + ' — ' + ng.so + ' nhà', ng.la);
      if (!ng.so) {
        o += '<div class="card mb"><p class="tiny dim" style="line-height:1.7">Không có nhà nào. ' +
          h(ng.lam || '') + '</p></div>';
        return;
      }
      o += '<div class="card mb" style="border-color:' + ng.c + '4d">' + ng.ds.map(function (m) {
        var n = m.nha, dn = n.capDeNghi || {};
        var s = '<div style="padding:10px 0;border-bottom:1px solid var(--gita-vien-2)">' +
          '<b class="sm">' + h(n.nha) + '</b> <span class="tiny dim">' + h(n.hv || '') +
          (n.lop ? ' · ' + h(n.lop) : '') + '</span><br>' +
          '<span class="tiny" style="color:' + ng.c + '">' + h(n.tang) + ' · ngày ' + n.ngay + '/' +
          n.tongNgay +
          [(n.chang && (n.chang.ten || n.chang.mua)) ? (n.chang.ten || n.chang.mua) : '',
           n.band ? 'băng ' + n.band : ''].filter(Boolean)
            .map(function (x) { return ' · ' + h(x); }).join('') + '</span>';

        if (m.quaHan)
          s += '<div class="mt" style="padding:8px 10px;border-left:3px solid #BE0E16;background:var(--gita-nen-2)">' +
            '<b class="tiny" style="color:#BE0E16">QUÁ HẠN ' + m.quaHan.quaNgay + ' NGÀY' +
            (m.quaHan.cong ? ' · ' + h(m.quaHan.cong) : '') + '</b>' +
            '<p class="tiny mt" style="line-height:1.7">' + h(m.quaHan.ten) + '</p>' +
            '<p class="tiny" style="line-height:1.7">' + h(m.quaHan.lam) + '</p>' +
            '<p class="tiny" style="line-height:1.7;color:#BE0E16">' + h(m.quaHan.khongDuocLam) + '</p></div>';

        if (dn.cap)
          s += '<p class="tiny mt" style="line-height:1.7">Cấp đề nghị <b>' + dn.cap + '/10</b> — ' +
            h(dn.moc || '') + ' <span style="color:#B4720F">CHƯA KÝ</span></p>' +
            '<p class="tiny dim" style="line-height:1.7">' + h(dn.canCu || '') +
            (dn.noiLech ? ' · <span style="color:#B4720F">' + h(dn.noiLech) + '</span>' : '') + '</p>';
        else if (dn.chuaDoDuoc)
          s += '<p class="tiny mt" style="line-height:1.7;color:#B4720F">Chưa đề nghị được cấp: ' +
            h(dn.vi || '') + '</p>';

        /* ── Hồ sơ trình duyệt: ba điều kiện, ba màu ──
           Điều kiện CHƯA BIẾT mang màu riêng, không dùng chung màu đỏ với
           CHƯA ĐẠT. Hai thứ ấy đòi hai việc khác nhau, và Coach nhìn màu
           trước khi đọc chữ. */
        if (m.hoSo && !m.hoSo.chuaDo) {
          var hs = m.hoSo, MAU = { dat: '#0B6675', hut: '#BE0E16', chuaBiet: '#B4720F' };
          var NHAN = { dat: 'ĐẠT', hut: 'CHƯA ĐẠT', chuaBiet: 'CHƯA BIẾT' };
          s += '<div class="mt" style="padding:8px 10px;border-left:3px solid ' +
            (hs.duTrinh ? '#0B6675' : '#B4720F') + ';background:var(--gita-nen-2)">' +
            '<b class="tiny" style="color:' + (hs.duTrinh ? '#0B6675' : '#B4720F') + '">' +
            (hs.duTrinh ? 'ĐỦ ĐIỀU KIỆN TRÌNH — chờ ' + h(hs.nguoiKy)
                        : 'HỒ SƠ CHƯA ĐỦ ĐỂ TRÌNH') + '</b>' +
            hs.dieu.map(function (dk) {
              return '<p class="tiny mt" style="line-height:1.7"><span style="color:' +
                MAU[dk.trangThai] + '">● ' + NHAN[dk.trangThai] + '</span> — ' + h(dk.ten) +
                ': ' + h(dk.noi || '') +
                (dk.canLam ? '<br><span class="dim">' + h(dk.canLam) + '</span>' : '') +
                (dk.chiCanhBao ? '<br><span style="color:#B4720F">Chỉ cảnh báo, chưa chặn — ' +
                  h(dk.chuaChan || '') + '</span>' : '') + '</p>';
            }).join('') +
            '<p class="tiny dim mt" style="line-height:1.7">' + h(hs.mayKhongDuyet) + '</p></div>';
        }

        (m.viCo || []).forEach(function (d) {
          s += '<div class="mt" style="padding:8px 10px;border-left:3px solid #BE0E16;background:var(--gita-nen-2)">' +
            '<b class="tiny" style="color:#BE0E16">' + h(d.muc) + ' #' + d.so + ' · trong ' +
            h(d.hanGio) + ' · ' + h(d.nguoiNhan) + '</b>' +
            '<p class="tiny mt" style="line-height:1.7">' + h(d.tinHieu) + '</p>' +
            '<p class="tiny" style="line-height:1.7">' + h(d.hanhDong) + '</p></div>';
        });
        (m.viec || []).forEach(function (v) {
          s += '<p class="tiny mt" style="line-height:1.7;color:#5140B4"><b>' + h(v.loai) +
            ' — còn ' + v.conLai + ' ngày:</b> ' + h(v.ten) +
            (v.dieuKien ? '<br><span class="dim">Điều kiện: ' + h(v.dieuKien) + '</span>' : '') +
            (v.chuanBi ? '<br><span class="dim">' + h(v.chuanBi) + '</span>' : '') + '</p>';
        });
        if (m.im)
          s += '<p class="tiny mt" style="line-height:1.7;color:#B45309"><b>' + h(m.im.muc) + ':</b> ' +
            h(m.im.dauHieu) + '<br>' + h(m.im.lam || '') +
            '<br><span style="color:#BE0E16">Không: ' + h(m.im.khong || '') + '</span></p>';

        return s + '</div>';
      }).join('') + '</div>';
    });

    /* ── Trợ lý nhắc việc ── */
    var nh = G.blvNhac(tenCoach);
    o += U.sec('Trợ lý nhắc việc — ' + nh.so + ' lời nhắc',
      'Mỗi lời nhắc có hạn giờ và có tên người nhận. Hạn đọc từ kho, không tự đặt.');

    /* ── Máy canh được mấy phần trong hai mươi tín hiệu ──
       Dòng này phải đứng TRƯỚC danh sách nhắc. Coach đọc một bảng đỏ
       rồi tin là mình được canh hết; nói thật con số trước khi họ đọc
       thì họ còn tự nhìn phần còn lại. */
    var cd = G.blvDoCanhDuoc();
    o += '<div class="card mb" style="border-color:#B4720F56">' +
      '<b class="sm">Máy tự bắt được <span style="color:#BE0E16">' + cd.may + '/' + cd.tong +
      '</span> tín hiệu đỏ — tín hiệu số ' + h(cd.dsMay.join(', ')) + '</b>' +
      '<p class="tiny mt" style="line-height:1.75">' + h(cd.luat) + '</p>' +
      '<div class="mt">' + (G.BV_DO_NOI || []).map(function (x) {
        var t = (G.BV_DO || []).filter(function (d) { return d.so === x.so; })[0] || {};
        return '<p class="tiny" style="line-height:1.7;padding:3px 0">' +
          '<span style="color:' + (x.noi ? '#0B6675' : '#B4720F') + '">' +
          (x.noi ? '● máy' : '○ người') + '</span> <b>#' + x.so + '</b> ' + h(t.tinHieu || '') +
          '<br><span class="dim">' + h(x.noi ? 'đo bằng ' + x.noi : x.chuaNoi) + '</span>' +
          (x.aiBat ? '<br><span class="dim">Ai bắt: ' + h(x.aiBat) + '</span>' : '') +
          (x.canTruong ? '<br><span style="color:#BE0E16">Cần trường: ' + h(x.canTruong) +
            '</span>' : '') + '</p>';
      }).join('') + '</div></div>';
    o += '<div class="card mb">' + (nh.ds || []).map(function (x) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<span class="tiny up" style="color:' + x.c + '"><b>' + h(x.ma) + '</b></span> ' +
        '<b class="sm">' + h(x.nha) + '</b> ' +
        '<span class="tiny" style="color:' + x.c + '">' + h(String(x.han)) + '</span> ' +
        '<span class="tiny dim">→ ' + h(x.nguoiNhan) + '</span>' +
        '<p class="tiny mt" style="line-height:1.7">' + h(x.viec) + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#0B6675">' + h(x.lam || '') + '</p>' +
        (x.cam ? '<p class="tiny mt" style="line-height:1.7;color:#BE0E16">' + h(x.cam) + '</p>' : '') +
        (x.nguon ? '<p class="tiny dim mt" style="line-height:1.7">nguồn: ' + h(x.nguon) + '</p>' : '') +
        '</div>';
    }).join('') + '</div>';
    o += '<p class="tiny mb" style="line-height:1.7;color:#B4720F"><b>' + h(nh.luat) + '</b></p>';

    /* ── Gói tài nguyên: mở thật cho nhà đầu tiên có việc ── */
    var uuTien = (xep.ngan || []).filter(function (n) { return n.so; })[0];
    var nhaMau = uuTien && uuTien.ds[0] ? uuTien.ds[0].nha : null;
    if (nhaMau) {
      var g = G.blvGoi(nhaMau.id, tenCoach);
      o += U.sec('Gói tài nguyên trợ lý đã đóng sẵn — ' + h(nhaMau.nha),
        'Tám ô. Ô nào chưa có thì ghi là chưa có, không ẩn.');
      o += '<div class="card mb">' + (g.o || []).map(function (x) {
        return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
          '<b class="sm">' + h(x.ten) + '</b> <span class="tiny dim">' + h(x.tuKho || '') + '</span>' +
          (x.coGi
            ? '<p class="tiny mt" style="line-height:1.75">' + h(x.coGi) + '</p>'
            : '<p class="tiny mt" style="line-height:1.7;color:#B4720F"><b>CHƯA CÓ</b> — ' +
              h(x.chuaCo) + '</p>') + '</div>';
      }).join('') + '</div>';
      o += '<p class="tiny mb" style="line-height:1.7;color:#B4720F"><b>' + h(g.luat || '') + '</b></p>';
    }

    /* ── Mốc gặp của năm tầng ── */
    var ml = G.BLV_MOC_LUAT || {};
    o += U.sec('Mốc gặp của năm tầng', ml.cot || '');
    o += '<div class="card mb">' + ['T1', 'T2', 'T3', 'T4', 'T5'].map(function (t) {
      var m = G.blvMocGap(t);
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + t + ' · ' + h(m.ten || '—') + '</b> ' +
        '<span class="tiny" style="color:#5140B4">ngày ' +
        h((m.ngay || []).join(' · ') || 'CHƯA CÓ') + '</span>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(m.nguon || '') + '</p>' +
        (m.lech ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' + h(m.lech) +
          '</p>' : '') + '</div>';
    }).join('') + '</div>';
    o += '<p class="tiny mb" style="line-height:1.75;color:#B4720F"><b>' + h(ml.viTheo || '') +
      '</b></p>';

    /* ── Bốn lượt rà soát ── */
    o += U.sec('Bốn lượt trợ lý rà mỗi sáng', '');
    o += '<div class="card mb">' + G.blvRaSoat(tenCoach).map(function (r) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(r.ten) + '</b> <span class="tiny" style="color:#0B6675">' +
        r.so + ' chỗ</span>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(r.hoi) + '</p>' +
        (r.thay.length
          ? '<ul class="tiny mt" style="line-height:1.8;padding-left:18px">' +
            r.thay.map(function (t) { return '<li>' + h(t) + '</li>'; }).join('') + '</ul>'
          : '<p class="tiny mt" style="line-height:1.7;color:#0B6675">Không thấy chỗ nào.</p>') +
        (r.viDangKe ? '<p class="tiny mt" style="line-height:1.7;color:#B4720F">' +
          h(r.viDangKe) + '</p>' : '') + '</div>';
    }).join('') + '</div>';

    /* ── Cửa phê duyệt cấp ── */
    var cd = G.BLV_DUYET, ky = G.blvAiKyDuoc();
    if (cd) {
      o += U.sec('Cửa phê duyệt cấp — ai ký, và ký theo điều kiện gì',
        cd.nguyenVanChot);
      o += '<div class="card mb" style="border-color:' + (ky.duoc ? '#0B6675' : '#B4720F') + '56">' +
        '<p class="sm" style="line-height:1.75"><b>Người ký: ' + h(cd.nguoiKy) + '</b> ' +
        '<span class="tiny dim">quyền ' + h(cd.quyen) + '</span></p>' +
        '<p class="tiny mt" style="line-height:1.75;color:' + (ky.duoc ? '#0B6675' : '#B4720F') + '">' +
        (ky.duoc
          ? 'Tài khoản đang dùng (' + h(ky.ai || '') + ') CÓ quyền phê duyệt.'
          : h(ky.vi)) + '</p>' +
        '<p class="tiny mt" style="line-height:1.75">' + h(cd.vieccuaCoach) + '</p>' +
        '<p class="tiny mt" style="line-height:1.75">' + h(cd.vieccuaMay) + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.75">' + h(cd.viKhongPhaiCoach) + '</p>' +
        (G.BLV_DUYET_DIEU || []).map(function (dk) {
          return '<div style="padding:9px 0;border-top:1px solid var(--gita-vien-2)">' +
            '<b class="sm">' + dk.so + '. ' + h(dk.ten) + '</b> ' +
            '<span class="tiny dim">' + h(dk.tuKho) + '</span>' +
            '<p class="tiny mt" style="line-height:1.75">' +
            (dk.doDuoc ? 'Máy đo được.' : '<span style="color:#B4720F">Máy KHÔNG đo được.</span>') +
            ' ' + h(dk.aiLam) + '</p>' +
            (dk.viMayKhongSuy ? '<p class="tiny dim mt" style="line-height:1.75">' +
              h(dk.viMayKhongSuy) + '</p>' : '') + '</div>';
        }).join('') + '</div>';

      var dl = G.BLV_DUYET_LUAT || {};
      o += '<div class="card mb">' + Object.keys(dl).map(function (k) {
        return '<p class="tiny" style="line-height:1.75;padding:4px 0">• ' + h(dl[k]) + '</p>';
      }).join('') + '</div>';
    }

    /* ── Chỗ còn chờ chủ hệ ── */
    if ((G.BLV_CHOCHU || []).length) {
      o += U.sec('Chỗ này chờ chủ hệ, không chờ mã', '');
      o += '<div class="card mb" style="border-color:#B4720F56">' +
        G.BLV_CHOCHU.map(function (c) {
          return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
            '<b class="sm" style="color:#B4720F">' + h(c.hoi) + '</b>' +
            '<p class="tiny mt" style="line-height:1.75">' + h(c.boi) + '</p>' +
            (c.toiKhongTuDat ? '<p class="tiny mt" style="line-height:1.75">' +
              h(c.toiKhongTuDat) + '</p>' : '') +
            '<p class="tiny dim mt" style="line-height:1.75">Máy đang làm: ' +
            h(c.mayDangLam) + '</p></div>';
        }).join('') + '</div>';
    }

    /* ── Luật của bàn ── */
    o += U.sec('Luật của bàn này', '');
    var bl = G.BLV_LUAT || {};
    o += '<div class="card mb">' + Object.keys(bl).map(function (k) {
      return '<p class="tiny" style="line-height:1.75;padding:4px 0">• ' + h(bl[k]) + '</p>';
    }).join('') + '</div>';

    o += G.kaKhung ? G.kaKhung('ban-coach', 'cuoi') : '';
    return o;
  };
})();

})();
