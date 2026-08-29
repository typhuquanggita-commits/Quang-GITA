/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v8.1 — TRỢ LÝ GITA
   Chạy hoàn toàn trong máy: không gọi ra mạng, không tốn phí gọi API,
   và dữ liệu của gia đình không rời khỏi thiết bị. Trợ lý tra trong
   chính kho đã giải mã trong bộ nhớ phiên làm việc.

   Bản cũ chỉ so khớp TỪ ĐẦU TIÊN của câu hỏi nên gần như không tìm
   được gì. Bản này tách từ, bỏ dấu, chấm điểm theo số từ khớp và
   trọng số từng trường, rồi xếp hạng.

   Ba luật cứng, kiểm được bằng máy:
     · chỉ trả lời trong phạm vi vai và tầng đang được cấp
     · luôn nêu nguồn, có mã tra lại được
     · kho chưa có thì nói thẳng là chưa có, không đoán
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function(){
var U = G.U;

/* ─── Chuẩn hoá tiếng Việt: bỏ dấu, thường hoá, tách từ ─── */
function boDau(s){
  return String(s || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
var HU_TU = ('la cua va cho voi thi ma nhung o tai den tu khi nao sao gi de duoc co khong ' +
  'toi minh em anh chi con nha mot hai cac nhung rat qua lam nen se da dang bi bo ai nay ' +
  'the nhu hay hon nua chua roi cung ve theo tren duoi trong ngoai').split(' ');
function tachTu(s){
  return boDau(s).split(' ').filter(function(t){
    return t.length >= 2 && HU_TU.indexOf(t) < 0;
  });
}

/* ─── Nguồn tra cứu: mỗi nguồn khai trường nào đáng cân nặng bao nhiêu ─── */
function nguon(){
  return [
    {kho:G.MOTHUC,   loai:'Mô thức',   mau:'#2A72C6', go:'mo-thuc',
     ma:function(x){ return x.id; }, ten:function(x){ return x.title; },
     than:function(x){ return [x.title, (x.keywords||[]).join(' '), x.summary]; }},
    {kho:G.PHACDO,   loai:'Phác đồ',   mau:'#5140B4', go:'phac-do',
     ma:function(x){ return x.ma; }, ten:function(x){ return x.ten; },
     than:function(x){ return [x.ten, x.nhomTen, x.nguyenNhan, x.giaiPhap]; }},
    {kho:G.KICHBAN,  loai:'Kịch bản',  mau:'#0B6675', go:'kich-ban',
     ma:function(x){ return x.ma; }, ten:function(x){ return x.ten; },
     than:function(x){ return [x.ten, x.mo, x.muc, x.tang]; }},
    /* Kho 250 tình huống dùng tên trường riêng: th · mo · pt · gp · key.
       Bản trước đọc x.ten và x.tinhHuong nên không bao giờ trúng — cả kho
       này im lặng suốt. Đọc đúng trường thì nó trả lời được. */
    {kho:G.TINHHUONG,loai:'Tình huống',mau:'#0B7350', go:'tinh-huong',
     ma:function(x){ return x.key || x.ma || ('TH-' + x.stt); },
     ten:function(x){ return x.th || x.ten || x.tinhHuong; },
     than:function(x){ return [x.th, x.mo, x.pt, x.gp, x.chot]; }},
    {kho:G.BAIHOC,   loai:'Bài học',   mau:'#0B7350', go:'tu-duy',
     ma:function(x){ return x.id; }, ten:function(x){ return x.ten; },
     than:function(x){ return [x.ten, x.nguyenLy, x.apDung]; }}
  ].filter(function(n){ return Array.isArray(n.kho) && n.kho.length; });
}

/* Tài liệu gốc: 1.647 dòng bảng — tra riêng vì cấu trúc khác */
function traTaiLieuGoc(tu){
  var ra = [];
  /* Tài liệu Drive: tra cả bảng lẫn đoạn văn */
  (G.TAILIEU_DRIVE || []).forEach(function(d){
    (d.doan || []).forEach(function(v){
      var chu = boDau(v), d2 = 0;
      tu.forEach(function(t){ if(chu.indexOf(t) >= 0) d2 += 2; });
      if(d2 >= 6) ra.push({
        diem: d2, loai: 'Tài liệu Học viện', mau: '#185AB4', go: 'tai-lieu-goc',
        ma: d.ma, ten: d.ten, tom: v.slice(0, 280), muc: d.mo});
    });
    (d.bang || []).forEach(function(b){
      b.hang.forEach(function(h2){
        var chu = boDau(h2.join(' ')), d2 = 0;
        tu.forEach(function(t){ if(chu.indexOf(t) >= 0) d2 += 2; });
        if(d2 >= 6) ra.push({
          diem: d2, loai: 'Tài liệu Học viện', mau: '#185AB4', go: 'tai-lieu-goc',
          ma: d.ma, ten: h2[0] || d.ten, tom: h2.slice(1, 3).join(' — ').slice(0, 260), muc: d.ten});
      });
    });
  });
  (G.TAILIEU_GOC || []).forEach(function(d){
    d.bang.forEach(function(b){
      b.hang.forEach(function(h){
        var chu = boDau(h.join(' '));
        var d2 = 0;
        tu.forEach(function(t){ if(chu.indexOf(t) >= 0) d2 += 2; });
        if(d2 >= 4) ra.push({
          diem: d2, loai: 'Tài liệu gốc', mau: '#BE0E16', go: 'tai-lieu-goc',
          ma: d.ma + '·' + (h[0] || ''), ten: h[1] || h[0],
          tom: h.slice(2, 4).join(' — ').slice(0, 260), muc: b.muc || d.ten
        });
      });
    });
  });
  return ra;
}

/* ─── Tra kho ─── */
G.aiTra = function(cauHoi){
  var tu = tachTu(cauHoi);
  if(!tu.length) return [];
  var ra = [];
  nguon().forEach(function(n){
    n.kho.forEach(function(x){
      var truong = n.than(x).map(function(v){ return boDau(v); });
      var diem = 0;
      tu.forEach(function(t){
        if(truong[0] && truong[0].indexOf(t) >= 0) diem += 5;      /* trúng tên: nặng nhất */
        for(var i = 1; i < truong.length; i++)
          if(truong[i] && truong[i].indexOf(t) >= 0){ diem += 2; break; }
      });
      if(diem >= 5) ra.push({
        diem: diem, loai: n.loai, mau: n.mau, go: n.go,
        ma: n.ma(x) || '', ten: n.ten(x) || '',
        tom: String(n.than(x)[2] || n.than(x)[1] || '').slice(0, 260)
      });
    });
  });
  ra = ra.concat(traTaiLieuGoc(tu));
  ra.sort(function(a, b){ return b.diem - a.diem; });

  /* bỏ trùng theo mã */
  var thay = {}, loc = [];
  ra.forEach(function(x){
    var k = x.loai + '|' + x.ma;
    if(thay[k]) return;
    thay[k] = 1; loc.push(x);
  });
  loc = loc.slice(0, 12);

  /* Ghi mức dùng tài nguyên: mỗi tư liệu trợ lý mở ra cho người trong nghề
     đều tính một lần chạm. Đây là chỗ đếm chính xác nhất, vì tra kho là
     đường mà cả người làm việc lẫn người gom kho đều phải đi qua. */
  if(G.chamTaiNguyen) loc.forEach(function(x){ G.chamTaiNguyen(x.loai, x.ma); });

  return loc;
};

/* ─── Lưới an toàn: dấu hiệu khẩn phải bắt được kể cả khi kho chưa mở ───
   Không phụ thuộc dữ liệu trong kho, vì đây là đường không được phép hỏng. */
var DAU_KHAN = ['tu tu','tu sat','muon chet','khong muon song','tu hai','rach tay',
  'bo nha','bo di','danh nhau','bao luc','tram cam','hoang loan','cap cuu','chay mau',
  'ngat','uong thuoc','xam hai','bat nat nang'];
G.aiCoKhan = function(cauHoi){
  var chu = boDau(cauHoi);
  for(var i = 0; i < DAU_KHAN.length; i++)
    if(chu.indexOf(DAU_KHAN[i]) >= 0) return true;
  return false;
};
var LOI_KHAN = 'Chuyện này em không trả lời bằng máy được. Anh chị gọi ngay hotline 08.5555.4688 ' +
  'để có người thật nghe. Nếu đang có nguy hiểm ngay lúc này, gọi 115 hoặc tới cơ sở y tế gần nhất trước đã.';

/* ─── Đọc ý định câu hỏi ─── */
G.aiYDinh = function(cauHoi){
  var K = G.KICHBAN_AI;
  if(!K) return null;
  var chu = boDau(cauHoi);
  /* Chấm theo ĐỘ DÀI từ khoá trúng, không đếm số lần trúng: "điện thoại"
     cụ thể hơn "bắt đầu", nên phải thắng khi câu hỏi có cả hai. */
  var tot = null, cao = 0;
  K.yDinh.forEach(function(y){
    var d = 0;
    y.dau.forEach(function(t){
      var k = boDau(t);
      if(k && chu.indexOf(k) >= 0) d += k.length;
    });
    if(d > cao){ cao = d; tot = y; }
  });
  return cao ? tot : null;
};

/* ─── Trả lời một câu ─── */
G.aiTraLoi = function(cauHoi){
  var K = G.KICHBAN_AI || {};
  var khach = G.LA_KHACH && G.LA_KHACH();
  var giong = khach ? 'nha' : 'nghe';
  var y = G.aiYDinh(cauHoi);

  /* Dấu hiệu khẩn — dừng trả lời tự động, chuyển người thật.
     Kiểm bằng lưới an toàn TRƯỚC, rồi mới tới kịch bản trong kho. */
  if(G.aiCoKhan(cauHoi) || (y && y.ma === 'KHAN')){
    if(!y || y.ma !== 'KHAN') y = {ma:'KHAN', ten:'Cần người thật', nhip:'DỪNG'};
    if(G.secLog) G.secLog('Trợ lý chuyển người thật',
      'Câu hỏi có dấu hiệu khẩn · ' + (G.S.acc && G.S.acc.u), 'Cảnh báo');
    return {khan:true, loi:(y[giong] || LOI_KHAN), nguon:[], y:y};
  }

  var tim = G.aiTra(cauHoi);
  return {
    khan: false,
    y: y,
    loi: y ? y[giong] : null,
    chuaCo: !tim.length,
    thieu: !tim.length ? (K.chuaCo ? K.chuaCo[giong] : '') : '',
    chot: K.chot ? K.chot[giong] : '',
    nguon: tim
  };
};
})();

/* ═══════════════════════════════════════════════════════════════
   GIAO DIỆN TRỢ LÝ — một khung trò chuyện, mở được từ mọi màn hình
   ═══════════════════════════════════════════════════════════════ */
(function(){
var U = G.U, h = U.h, ic = U.ic;
G.AI_HOI = [];        /* lịch sử phiên này, không ghi ra đĩa */

function goiY(){
  if(G.LA_KHACH && G.LA_KHACH())
    return ['Con ôm điện thoại, mình bắt đầu từ đâu?',
            'Con không tự giác, phải nhắc mãi',
            'Nhà mình đang căng, nói chuyện thế nào?',
            'Hôm nay nhà mình nên làm việc gì?',
            'Khi nào thì nhà mình lên chặng sau?'];
  return ['Phác đồ cho ca ôm điện thoại tầng 2',
          'Kịch bản mở cửa cho phụ huynh còn nghi ngờ',
          'Mô thức nào dùng khi học viên mất động lực',
          'Cổng nghiệm thu tầng 3 gồm những gì',
          'Tình huống con chuyển trường tụt điểm'];
}

G.aiHoi = function(cauHoi){
  cauHoi = String(cauHoi || '').trim();
  if(!cauHoi) return;
  var d = G.aiTraLoi(cauHoi);
  G.AI_HOI.push({hoi: cauHoi, dap: d, luc: new Date()});
  if(G.secLog) G.secLog('Hỏi trợ lý',
    cauHoi.slice(0, 80) + ' → ' + (d.khan ? 'chuyển người thật' : d.nguon.length + ' nguồn'), 'Ghi nhận');
  veKhung();
};

function theDap(d){
  var o = '';
  if(d.khan){
    return '<div class="ai-khan">'+ic('shield','w-5 h-5')+
      '<div><b>Việc này cần người thật, không phải trợ lý</b>'+
      '<p>'+h(d.loi)+'</p></div></div>';
  }
  if(d.y) o += '<div class="ai-nhip">'+ic('compass','w-3 h-3')+
    '<span>'+h(d.y.ten)+' · nhịp '+h(d.y.nhip)+'</span></div>';
  if(d.loi) o += '<p class="ai-loi">'+h(d.loi)+'</p>';

  if(d.chuaCo){
    o += '<div class="ai-chuaco">'+ic('seed','w-4 h-4')+'<span>'+h(d.thieu)+'</span></div>';
    return o;
  }

  o += '<div class="ai-nguon-nhan">'+d.nguon.length+' tư liệu trong kho — bấm để mở</div>';
  o += '<div class="ai-ds">'+ d.nguon.map(function(n){
    return '<button class="ai-n" style="--nc:'+n.mau+'" data-v="'+h(n.go)+'">'+
      '<div class="ai-n-h"><span class="ai-n-loai">'+h(n.loai)+'</span>'+
        '<span class="ai-n-ma mono">'+h(n.ma)+'</span></div>'+
      '<b>'+h(n.ten)+'</b>'+
      (n.tom ? '<p>'+h(n.tom)+'</p>' : '')+
      (n.muc ? '<span class="ai-n-muc">'+h(n.muc)+'</span>' : '')+
    '</button>';
  }).join('') +'</div>';
  if(d.chot) o += '<p class="ai-chot">'+h(d.chot)+'</p>';
  return o;
}

function veKhung(){
  var o = document.getElementById('aiKhung');
  if(!o) return;
  o.innerHTML = G.AI_HOI.map(function(x){
    return '<div class="ai-luot">'+
      '<div class="ai-hoi">'+h(x.hoi)+'</div>'+
      '<div class="ai-dap">'+theDap(x.dap)+'</div></div>';
  }).join('');
  o.scrollTop = o.scrollHeight;
}

G.VIEWS['tro-ly'] = function(){
  var K = G.KICHBAN_AI;
  var khach = G.LA_KHACH && G.LA_KHACH();
  var f = G.myFamily ? G.myFamily() : null;
  var t = f && G.tierOf ? G.tierOf(f.tier) : null;

  var o = U.ph({eyebrow:'TRỢ LÝ GITA', ic:'spark', grad:1,
    t: khach ? 'Hỏi gì cũng được' : 'Trợ lý tra kho',
    lead: K ? K.moDau[khach ? 'nha' : 'nghe'] :
      'Trợ lý tra trong kho của Học viện và luôn nêu nguồn.'});

  o += '<div class="card ai-hop">'+
    '<div id="aiKhung" class="ai-khung">'+
      (G.AI_HOI.length ? '' :
       '<div class="ai-trong">'+ic('spark','w-8 h-8')+
       '<p>Gõ câu hỏi bên dưới, hoặc bấm một gợi ý.</p></div>')+
    '</div>'+
    '<div class="ai-go">'+
      '<input id="aiQ" placeholder="'+(khach?'Nhà mình đang mắc chuyện gì?':'Tra phác đồ, kịch bản, mô thức, tình huống…')+'" autocomplete="off">'+
      '<button class="btn pri" data-act="ai-ask">'+ic('arrow','w-4 h-4')+'Hỏi</button>'+
    '</div>'+
    '<div class="row wrap" style="gap:6px;margin-top:10px">'+
      goiY().map(function(g){ return '<button class="chip" data-aiq="'+h(g)+'">'+h(g)+'</button>'; }).join('')+
    '</div></div>';

  /* Trợ lý làm được gì và KHÔNG làm gì — nói trước, không để ai kỳ vọng sai */
  o += '<div class="row wrap mt2" style="gap:12px;align-items:stretch">'+
    '<div class="card" style="flex:1;min-width:270px;border-color:var(--gita-vien-1)">'+
      '<div class="up mb" style="color:var(--gita-ink)">'+ic('check','w-4 h-4')+' TRỢ LÝ LÀM ĐƯỢC</div>'+
      U.list([
        'Tra trong kho của Học viện và chỉ ra đúng tư liệu, có mã để mở lại.',
        'Trả lời trong đúng phần vai và chặng của tài khoản đang dùng.',
        'Chạy hoàn toàn trong máy — không gửi câu hỏi của gia đình đi đâu cả.'
      ])+'</div>'+
    '<div class="card" style="flex:1;min-width:270px">'+
      '<div class="up mb" style="color:var(--gita-do-ink)">'+ic('x','w-4 h-4')+' TUYỆT ĐỐI KHÔNG LÀM</div>'+
      (K ? U.list(K.khongLam.slice(0, 5), 'var(--gita-do)') : '')+'</div></div>';

  if(t) o += '<div class="card pad-sm mt2" style="border-color:'+t.c+'44">'+
    '<div class="tiny up mb" style="color:'+t.c+'">ĐANG TRẢ LỜI TRONG PHẠM VI</div>'+
    '<b class="sm" style="color:'+t.c+'">'+h(t.code+' · '+G.tname(t))+'</b>'+
    '<p class="tiny muted mt" style="line-height:1.55">'+h(t.note)+'</p></div>';

  setTimeout(veKhung, 0);
  return o;
};

/* Nút trợ lý nổi — mở được từ mọi màn hình */
G.moTroLy = function(){ G.go('tro-ly'); };

/* Bộ nghe [data-aiq] và phím Enter nay nằm TRỌN trong src/tro-ly-chat.js.
   Trước đây ba tệp cùng bắt một selector ở cấp document — app.js, tệp này và
   tro-ly-chat.js — nên bấm một chip gợi ý là hỏi trợ lý ba lần, khung chat
   lặp lại câu hỏi ba lần và nhật ký ghi ba dòng trùng. */

})();
