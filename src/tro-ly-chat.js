/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v8.2 — KHUNG TRÒ CHUYỆN VỚI TRỢ LÝ
   Bản trước là ô tra cứu: gõ một câu, nhận một khối kết quả. Nó đúng
   nhưng không giống người. Bản này là một cuộc trò chuyện thật, đi theo
   sáu nhịp của mô thức huấn luyện GITA:

     N1 MỞ · N2 NGHE · N3 CÔNG NHẬN · N4 LÀM RÕ · N5 DẪN ĐƯỜNG · N6 GIỮ

   Ba việc khung này làm khác một khung chat thường:

     · Trợ lý chào trước bằng đúng giọng của người đang nghe — lời nhà
       mình cho phụ huynh và học viên, lời nghề cho đội ngũ.
     · Câu có dấu hiệu khẩn thì trợ lý DỪNG, không kèm tư liệu, chuyển
       thẳng sang người thật. Đây là đường không được phép hỏng.
     · Tư liệu nằm ngoài phần nền 30% của gia đình vẫn hiện tên, nhưng
       không mở ra ở đây. Nó đi qua Tư vấn hoặc Coach — có người thật đọc
       lại rồi mới gửi. Gia đình bấm một nút để đặt lời xin.

   Toàn bộ chạy trong máy. Không gọi ra mạng, không có nút tải xuống,
   không có tệp nén: đọc thẳng trên ứng dụng.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function(){
var U = G.U, h = U.h, ic = U.ic;

/* Lịch sử phiên này. Không ghi ra đĩa: chuyện của một nhà không nằm lại
   trên máy chung. Đóng ứng dụng là hết. */
G.CHAT = G.CHAT || [];

function khach(){ return !!(G.LA_KHACH && G.LA_KHACH()); }
function tenToi(){ return (G.S.acc && G.S.acc.ten) || 'Anh chị'; }

/* ─── Lời chào mở đầu, theo nhịp N1 ─── */
function loiChao(){
  var K = G.KICHBAN_AI;
  if(khach()){
    var f = G.myFamily ? G.myFamily() : null;
    return (K && K.moDau && K.moDau.nha) ||
      ('Chào ' + tenToi() + '. Nhà mình đang mắc chuyện gì, kể em nghe.' +
       (f && f.nha ? ' Em đang mở hồ sơ ' + f.nha + '.' : ''));
  }
  return (K && K.moDau && K.moDau.nghe) ||
    'Trợ lý tra trong kho của Học viện. Hỏi phác đồ, kịch bản, mô thức hoặc tình huống.';
}

function goiY(){
  if(khach())
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

/* ═══════════ MỘT LƯỢT TRẢ LỜI ═══════════ */
G.chatHoi = function(cauHoi){
  cauHoi = String(cauHoi || '').trim();
  if(!cauHoi) return;
  G.CHAT.push({ai:'toi', loi:cauHoi, luc:new Date()});
  var d = G.aiTraLoi(cauHoi);
  G.CHAT.push({ai:'trolY', dap:d, luc:new Date()});
  if(G.secLog) G.secLog('Hỏi trợ lý',
    cauHoi.slice(0, 80) + ' → ' + (d.khan ? 'chuyển người thật' : d.nguon.length + ' nguồn'),
    d.khan ? 'Cảnh báo' : 'Ghi nhận');
  ve();
};

G.chatXoa = function(){ G.CHAT = []; ve(); };

/* ═══════════ VẼ MỘT BÓNG NÓI ═══════════ */
function bongToi(m){
  return '<div class="ch-luot ch-toi"><div class="ch-bong">'+h(m.loi)+'</div>'+
    '<div class="ch-anh ch-anh-toi">'+h(tenToi().trim().slice(0,1).toUpperCase())+'</div></div>';
}

function theNguon(n, moDuoc){
  if(moDuoc)
    return '<button class="ai-n" style="--nc:'+n.mau+'" data-v="'+h(n.go)+'">'+
      '<div class="ai-n-h"><span class="ai-n-loai">'+h(n.loai)+'</span>'+
        '<span class="ai-n-ma mono">'+h(n.ma)+'</span></div>'+
      '<b>'+h(n.ten)+'</b>'+
      (n.tom ? '<p>'+h(n.tom)+'</p>' : '')+
      (n.muc ? '<span class="ai-n-muc">'+h(n.muc)+'</span>' : '')+
    '</button>';
  /* Ngoài phần nền: hiện tên thật, không hiện nội dung, và nói rõ đường đi. */
  var dat = G.datKpi80 && G.datKpi80();
  return '<div class="ai-n ai-n-cho" style="--nc:'+n.mau+'">'+
    '<div class="ai-n-h"><span class="ai-n-loai">'+h(n.loai)+'</span>'+
      '<span class="ai-n-ma mono">'+h(n.ma)+'</span></div>'+
    '<b>'+h(n.ten)+'</b>'+
    '<p class="ai-n-cho-loi">'+ic('lock','w-3 h-3')+
      (dat ? ' Phần này Tư vấn hoặc Coach của nhà mình gửi tới, để đọc cùng một buổi hẹn.'
           : ' Phần này mở khi nhà mình đi tới 80% chặng đang làm. Còn bây giờ thì làm nốt việc đang dở đã.')+
    '</p>'+
    (dat ? '<button class="btn sm" data-xin="'+h(n.loai)+'|'+h(n.ma)+'|'+h(n.ten)+'">'+
             ic('bell','w-3 h-3')+'Nhờ Tư vấn gửi</button>' : '')+
  '</div>';
}

function theDap(d){
  var o = '';
  if(d.khan)
    return '<div class="ai-khan">'+ic('shield','w-5 h-5')+
      '<div><b>Việc này cần người thật, không phải trợ lý</b>'+
      '<p>'+h(d.loi)+'</p>'+
      '<a class="btn sm pri mt" href="tel:0855554688">'+ic('bell','w-3 h-3')+'Gọi 08.5555.4688</a>'+
      '</div></div>';

  if(d.y) o += '<div class="ai-nhip">'+ic('compass','w-3 h-3')+
    '<span>'+h(d.y.ten)+' · nhịp '+h(d.y.nhip)+'</span></div>';
  if(d.loi) o += '<p class="ai-loi">'+h(d.loi)+'</p>';

  /* ── BỐN NHỊP DẪN MỘT VIỆC ──
     Đặt TRƯỚC danh sách tư liệu: người hỏi về một việc cần biết tối nay
     làm gì, không cần mười hai tư liệu trước đã. */
  if(d.viec && d.viec.vuotTang)
    o += '<div class="ai-viec ai-viec-cho">'+ic('lock','w-4 h-4')+
      '<div><b>'+h(d.viec.ma)+' — việc của tầng '+h(String(d.viec.tang).slice(1))+'</b>'+
      '<p>'+h(d.viec.y)+'</p></div></div>';
  else if(d.viec){
    var v = d.viec;
    o += '<div class="ai-viec"><div class="ai-viec-h">'+
      '<span class="ai-n-ma mono">'+h(v.ma)+'</span><b>'+h(v.ten)+'</b>'+
      '<span class="ai-viec-bd">'+h(v.banhDa)+' · tầng '+h(String(v.tang).slice(1))+'</span></div>';
    o += v.nhip.map(function(n){
      return '<div class="ai-viec-n'+(n.thieu ? ' thieu' : '')+'">'+
        '<span class="ai-viec-no">'+n.no+'</span>'+
        '<div><b>'+h(n.ten)+'</b>'+
        (n.thieu
          ? '<p class="ai-viec-thieu">Kho chưa có phần này ('+h(n.docTu)+'). Em không bịa cho tròn.</p>'
          : '<p>'+h(n.loi)+'</p>')+'</div></div>';
    }).join('');
    o += '<p class="ai-viec-chan">'+ic('spark','w-3 h-3')+
      ' Bốn nhịp trên ghép từ chính kho việc — em không viết thêm câu nào.</p></div>';
  }

  if(d.chuaCo)
    return o + '<p class="ai-loi">'+h(d.thieu || 'Kho chưa có phần này. Em không đoán.')+'</p>';

  /* Chia hai rổ: mở được ngay và phải qua người thật */
  var mo = [], cho = [];
  d.nguon.forEach(function(n){
    ((G.khachMoDuoc && !G.khachMoDuoc(n.loai, n.ma)) ? cho : mo).push(n);
  });

  if(mo.length){
    o += '<div class="ai-nguon-nhan">'+mo.length+' tư liệu mở được ngay — bấm để đọc</div>';
    o += '<div class="ai-ds">'+ mo.map(function(n){ return theNguon(n, true); }).join('') +'</div>';
  }
  if(cho.length){
    o += '<div class="ai-nguon-nhan ai-nguon-cho">'+cho.length+
      ' phần nữa có trong kho của Học viện — đi qua Tư vấn hoặc Coach</div>';
    o += '<div class="ai-ds">'+ cho.map(function(n){ return theNguon(n, false); }).join('') +'</div>';
  }
  /* Câu "chưa tìm được gì khớp" CHỈ đúng khi thật sự chưa có gì. Dẫn
     xong bốn nhịp của một việc rồi vẫn in câu ấy là tự cãi mình ngay
     trong một lượt trả lời — người đọc sẽ tin câu sau và bỏ qua câu
     trước, tức là bỏ qua đúng phần dùng được. */
  if(!mo.length && !cho.length && !d.viec)
    o += '<p class="ai-loi">Em chưa tìm được gì khớp. Anh chị kể cụ thể hơn một chút được không?</p>';
  /* NÓI RA CÁI KHÔNG ĐƯA. Giấu con số này thì nhà mình tưởng kho chỉ có
     bấy nhiêu; nói ra thì họ biết còn đường phía trước, và biết đường ấy
     mở bằng cách đi hết tầng đang làm chứ không bằng cách xin. */
  if(d.giuLaiVuotTang)
    o += '<p class="ai-tang-giu">'+ic('lock','w-3 h-3')+' '+d.giuLaiVuotTang+
      ' tư liệu nữa thuộc tầng trên — em giữ lại. Nền của chúng nằm ở tầng nhà mình đang đi, '+
      'nên đọc bây giờ chưa dùng được. Đi hết chặng này thì chúng mở ra.</p>';
  if((d.khoChuaKhaiTang || []).length)
    o += '<p class="ai-tang-chua tiny dim">Kho '+h(d.khoChuaKhaiTang.join(', '))+
      ' chưa khai tầng nên em chưa lọc theo tầng được ở đó — phần ấy vẫn đi qua trần 30% như cũ.</p>';
  if(d.chot) o += '<p class="ai-chot">'+h(d.chot)+'</p>';
  return o;
}

function bongTroLy(m){
  return '<div class="ch-luot ch-troly">'+
    '<div class="ch-anh ch-anh-ai">'+ic('spark','w-4 h-4')+'</div>'+
    '<div class="ch-bong ch-bong-ai">'+theDap(m.dap)+'</div></div>';
}

/* Dựng sẵn cả cuộc trò chuyện thành chuỗi. Màn hình trả về đã có nội dung
   ngay từ đầu — không có khoảnh khắc khung trống rồi mới hiện chữ. */
function cuonChat(){
  return '<div class="ch-luot ch-troly"><div class="ch-anh ch-anh-ai">'+ic('spark','w-4 h-4')+'</div>'+
    '<div class="ch-bong ch-bong-ai"><p class="ai-loi">'+h(loiChao())+'</p></div></div>' +
    G.CHAT.map(function(m){ return m.ai === 'toi' ? bongToi(m) : bongTroLy(m); }).join('');
}

function ve(){
  var o = document.getElementById('chKhung');
  if(!o) return;
  o.innerHTML = cuonChat();
  o.scrollTop = o.scrollHeight;
}
G.veChat = ve;

/* ═══════════ MÀN HÌNH ═══════════ */
G.VIEWS['tro-ly'] = function(){
  var K = G.KICHBAN_AI;
  var kh = khach();
  var f = kh && G.myFamily ? G.myFamily() : null;
  var t = f && G.tierOf ? G.tierOf(f.tier) : null;

  var o = U.ph({eyebrow:'TRỢ LÝ GITA', ic:'spark', grad:1,
    t: kh ? 'Nói chuyện với trợ lý' : 'Trợ lý tra kho',
    lead: kh ? 'Kể chuyện của nhà mình bằng lời thường ngày. Em nghe, rồi chỉ đúng việc cần làm trước.'
             : 'Tra phác đồ, kịch bản, mô thức và tình huống trong kho của Học viện. Câu trả lời nào cũng có mã để mở lại.'});

  o += '<div class="card ch-hop">'+
    '<div class="ch-dau">'+
      '<div class="ch-dau-t">'+ic('spark','w-4 h-4')+'<b>Trợ lý GITA</b>'+
        '<span class="ch-trangthai">'+ic('dot','w-2 h-2')+'đang nghe</span></div>'+
      (G.CHAT.length ? '<button class="btn ghost sm" data-act="chat-xoa">'+ic('x','w-3 h-3')+'Bắt đầu lại</button>' : '')+
    '</div>'+
    '<div id="chKhung" class="ch-khung">'+cuonChat()+'</div>'+
    '<div class="ch-go">'+
      '<input id="aiQ" placeholder="'+(kh?'Nhà mình đang mắc chuyện gì?':'Tra phác đồ, kịch bản, mô thức, tình huống…')+'" autocomplete="off">'+
      '<button class="btn pri" data-act="ai-ask" aria-label="Gửi">'+ic('arrow','w-4 h-4')+'Gửi</button>'+
    '</div>'+
    '<div class="row wrap ch-goiy">'+
      goiY().map(function(g){ return '<button class="chip" data-aiq="'+h(g)+'">'+h(g)+'</button>'; }).join('')+
    '</div></div>';

  /* Gia đình: nói thẳng phần nào đang mở, phần nào chưa, và mở bằng cách nào */
  if(kh && G.khoCuaNha){
    var s = G.khoCuaNha();
    o += '<div class="card mt2" style="border-color:var(--gita-vien-1)">'+
      '<div class="row" style="gap:18px;align-items:center;flex-wrap:wrap">'+
        U.ring(s.phanTramMo, 'var(--gita)', 'NHÀ MÌNH ĐANG MỞ')+
        U.ring(s.kpi, s.dat80 ? 'var(--ok)' : 'var(--gita-do)', 'KPI CỦA NHÀ')+
        '<div style="flex:1;min-width:250px">'+
          '<b class="sm">'+s.mo.toLocaleString('vi-VN')+' / '+s.tong.toLocaleString('vi-VN')+' tư liệu</b>'+
          '<p class="sm dim mt" style="line-height:1.6">Phần nền của mỗi nhà là '+
            Math.round(G.TRAN_KHACH*100)+'% kho — đủ đi hết chặng đang ở. '+
            'Phần còn lại không mất đi: Tư vấn và Coach gửi tới theo đúng lúc nhà mình cần, '+
            'khi KPI đi qua '+G.KPI_XIN_THEM+'%.</p>'+
          (s.them ? '<p class="tiny mt" style="color:var(--ok)">'+ic('check','w-3 h-3')+
             ' Đã nhận thêm '+s.them+' tư liệu do Tư vấn và Coach gửi.</p>' : '')+
        '</div>'+
      '</div></div>';

    var cho = G.XIN_THEM.filter(function(x){ return x.trangThai === 'cho'; });
    if(cho.length)
      o += '<div class="card pad-sm mt2"><div class="tiny up mb">ĐANG CHỜ TƯ VẤN XEM</div>'+
        U.list(cho.map(function(x){ return x.loai + ' · ' + x.ten; }))+'</div>';
  }

  /* Nói trước trợ lý làm gì và không làm gì — không để ai kỳ vọng sai */
  o += '<div class="row wrap mt2" style="gap:12px;align-items:stretch">'+
    '<div class="card" style="flex:1;min-width:270px;border-color:var(--gita-vien-1)">'+
      '<div class="up mb" style="color:var(--gita-ink)">'+ic('check','w-4 h-4')+' TRỢ LÝ LÀM ĐƯỢC</div>'+
      U.list([
        'Nghe chuyện bằng lời thường ngày, không bắt ai nói đúng thuật ngữ.',
        'Tra trong kho của Học viện và chỉ ra đúng tư liệu, có mã để mở lại.',
        'Trả lời trong đúng phần vai và chặng của tài khoản đang dùng.',
        'Chạy hoàn toàn trong máy — chuyện của nhà mình không gửi đi đâu cả.'
      ])+'</div>'+
    '<div class="card" style="flex:1;min-width:270px">'+
      '<div class="up mb" style="color:var(--gita-do-ink)">'+ic('x','w-4 h-4')+' TUYỆT ĐỐI KHÔNG LÀM</div>'+
      (K ? U.list(K.khongLam.slice(0, 5), 'var(--gita-do)') : '')+'</div></div>';

  if(t) o += '<div class="card pad-sm mt2" style="border-color:'+t.c+'44">'+
    '<div class="tiny up mb" style="color:'+t.c+'">ĐANG TRẢ LỜI TRONG PHẠM VI</div>'+
    '<b class="sm" style="color:'+t.c+'">'+h(t.code+' · '+G.tname(t))+'</b>'+
    '<p class="tiny muted mt" style="line-height:1.55">'+h(t.note)+'</p></div>';

  setTimeout(function(){
    var k = document.getElementById('chKhung');
    if(k) k.scrollTop = k.scrollHeight;
    var i = document.getElementById('aiQ');
    if(i && G.CHAT.length) i.focus();
  }, 0);
  return o;
};

/* Giữ đường cũ chạy được: nơi nào còn gọi G.aiHoi thì vào thẳng khung chat */
G.aiHoi = function(q){ G.chatHoi(q); };
G.moTroLy = function(){ G.go('tro-ly'); };

/* ═══════════ BẤM ═══════════ */
document.addEventListener('click', function(e){
  var q = e.target.closest && e.target.closest('[data-aiq]');
  if(q){
    G.chatHoi(q.getAttribute('data-aiq'));
    var i = document.getElementById('aiQ'); if(i) i.value = '';
    return;
  }
  var x = e.target.closest && e.target.closest('[data-xin]');
  if(x){
    var p = x.getAttribute('data-xin').split('|');
    var r = G.xinThemTuLieu(p[0], p[1], p[2]);
    if(!r.ok){ U.toast(r.ly, 'err'); return; }
    U.toast('Đã nhắn Tư vấn của nhà mình. Phần này sẽ được gửi tới trong buổi hẹn gần nhất.', 'ok');
    G.render && G.render();
  }
});

document.addEventListener('keydown', function(e){
  if(e.key !== 'Enter') return;
  var i = document.getElementById('aiQ');
  if(!i || document.activeElement !== i) return;
  e.preventDefault();
  G.chatHoi(i.value); i.value = '';
});

})();
