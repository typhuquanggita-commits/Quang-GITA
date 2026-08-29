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
