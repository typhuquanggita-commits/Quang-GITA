/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v9.0 — MÀN GIỚI THIỆU VỀ GITA365

   Ba loại người mở màn này, và cả ba phải dùng được:

     · Một nhà vừa nhận tài khoản, chưa biết mình bước vào đâu
     · Một người trong đội ngũ cần bản nói lại cho gọn khi ngồi trước
       gia đình — nên phần này có nút chép nguyên văn cho đội ngũ
     · Anh Quang, khi cần rà lại xem Học viện đang tự giới thiệu ra sao

   Nguyên tắc: phần KHÔNG làm được đặt ngay cạnh phần làm được, không
   giấu xuống cuối. Lời giới thiệu chỉ có phần hay thì người đọc trừ hao,
   và trừ hao thì họ trừ luôn cả phần thật.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function(){
var U = G.U, h = U.h, ic = U.ic;
G.VIEWS = G.VIEWS || {};

function nhom(){
  var n = G.NHOM_NGONNGU ? G.NHOM_NGONNGU() : 'nghe';
  return n === 'hocvien' ? 'hv' : (n === 'phuhuynh' ? 'ph' : 'ng');
}

G.VIEWS['gioi-thieu'] = function(){
  var nh = nhom();
  var laNghe = (nh === 'ng');

  var o = U.ph({eyebrow:'HỆ SINH THÁI GIA ĐÌNH THỊNH VƯỢNG', ic:'seed', grad:1,
    t:'GITA 365 là gì',
    lead: nh === 'hv'
      ? 'Đây là chỗ nói cho em biết em đang bước vào cái gì, mất bao lâu, và cuối đường thì trông như thế nào. '+
        'Đọc mười phút, không cần chuẩn bị gì.'
      : nh === 'ph'
      ? 'Đây là chỗ nói cho anh chị biết nhà mình đang bước vào cái gì, mất bao lâu, và Học viện làm được gì — '+
        'cũng như không làm được gì. Mười phút đọc.'
      : 'Bản giới thiệu chuẩn của Học viện. Đội ngũ dùng nguyên văn phần này khi ngồi trước gia đình, '+
        'để mười người nói mười kiểu thì gia đình nghe ra mười Học viện khác nhau.'});

  /* Một câu */
  o += '<div class="card mt2" style="border-color:var(--gita-vien-1);background:var(--phu-1)">'+
    '<span class="tiny up muted">NẾU CHỈ ĐƯỢC NÓI MỘT CÂU</span>'+
    '<p class="mt" style="font-size:17px;line-height:1.8;font-weight:600">'+h(G.GT_MOT_CAU || '')+'</p></div>';

  /* Vì sao có GITA365 */
  var V = G.GT_VISAO || {};
  o += U.sec('VÌ SAO CÓ GITA365','Ba chỗ hỏng có thật, và đây là chỗ chữa');
  o += '<div class="card">'+
    '<p class="sm" style="line-height:1.8">'+h(V.canh || '')+'</p>'+
    (V.hong || []).map(function(x, i){
      return '<div class="row mt2" style="gap:11px;align-items:flex-start">'+
        '<span style="width:26px;height:26px;flex:none;border-radius:9px;display:flex;align-items:center;'+
          'justify-content:center;background:var(--gita-do)18;color:var(--gita-do-ink);font-weight:700;'+
          'font-size:13px">'+(i+1)+'</span>'+
        '<p class="sm" style="flex:1;line-height:1.75">'+h(x)+'</p></div>';
    }).join('')+
    '<p class="sm mt2" style="line-height:1.8;font-weight:600;color:var(--gita)">'+h(V.chot || '')+'</p></div>';

  /* Bốn lời hứa */
  o += U.sec('BỐN ĐIỀU HỌC VIỆN LÀM ĐƯỢC','Và ngay dưới là sáu điều không làm — đọc cả hai rồi hãy quyết');
  o += '<div class="row wrap" style="gap:12px">'+ (G.GT_HUA || []).map(function(x){
    return '<div class="card" style="flex:1;min-width:250px;border-left:3px solid '+x.c+'">'+
      '<div class="row" style="gap:8px;align-items:center">'+ic(x.ic,'w-4 h-4')+
        '<b style="font-size:15px;color:'+x.c+'">'+h(x.t)+'</b></div>'+
      '<p class="sm mt" style="line-height:1.75">'+h(x.y)+'</p></div>';
  }).join('') +'</div>';

  /* Sáu điều không làm — đặt ngay cạnh, không giấu xuống cuối */
  o += U.sec('SÁU ĐIỀU HỌC VIỆN KHÔNG LÀM','Nói trước thì phần còn lại được tin');
  o += '<div class="card" style="border-color:var(--gita-do)">'+
    (G.GT_KHONG || []).map(function(x, i){
      return '<div class="row'+(i ? ' mt2' : '')+'" style="gap:10px;align-items:flex-start">'+
        '<span style="color:var(--gita-do-ink);font-weight:700;flex:none">✕</span>'+
        '<p class="sm" style="flex:1;line-height:1.75">'+h(x)+'</p></div>';
    }).join('') +'</div>';

  /* Bốn chặng */
  o += U.sec('MỘT NHÀ ĐI QUA NHỮNG GÌ','Bốn chặng, đi theo thứ tự, không nhảy cóc');
  (G.GT_CHANG || []).forEach(function(x){
    o += '<div class="card mt2" style="border-left:3px solid '+x.c+'">'+
      '<div class="row" style="gap:11px;align-items:baseline;flex-wrap:wrap">'+
        '<span class="chip" style="color:'+x.c+';border-color:'+x.c+'55">'+h(x.ngay)+'</span>'+
        '<b style="flex:1;min-width:170px;font-size:16px">'+h(x.ten)+'</b></div>'+
      '<p class="sm mt" style="line-height:1.75"><b>Làm gì:</b> '+h(x.lam)+'</p>'+
      '<p class="sm mt" style="line-height:1.75;color:var(--ok)"><b>Xong khi:</b> '+h(x.xong)+'</p></div>';
  });

  /* Năm tầng */
  o += U.sec('NĂM TẦNG','Tầng sau chỉ mở khi tầng trước đã chắc — đây là chỗ nhiều nơi khác bỏ qua');
  o += '<div class="row wrap" style="gap:11px">'+ (G.GT_TANG || []).map(function(x){
    return '<div class="card" style="flex:1;min-width:190px;border-top:3px solid '+x.c+'">'+
      '<span class="tiny up" style="color:'+x.c+'">'+h(x.t)+'</span>'+
      '<b style="display:block;margin-top:3px">'+h(x.ten)+'</b>'+
      '<p class="tiny mt" style="line-height:1.65">'+h(x.y)+'</p></div>';
  }).join('') +'</div>';

  /* Ai làm việc với nhà mình */
  o += U.sec('AI LÀM VIỆC VỚI NHÀ MÌNH','Sáu vai, và mỗi vai có ranh giới rõ');
  o += U.tbl(['Vai','Làm gì cho nhà mình'], (G.GT_VAI || []).map(function(x){
    return ['<b class="sm">'+h(x.t)+'</b>', '<span class="sm">'+h(x.y)+'</span>'];
  }));

  /* Số liệu */
  o += U.sec('HỆ THỐNG CÓ GÌ','Chỉ ghi những con số hệ thống tự đếm được');
  o += '<div class="row wrap" style="gap:11px">'+ (G.GT_SO || []).map(function(x){
    return '<div class="card" style="flex:1;min-width:130px;text-align:center">'+
      '<b style="font-size:24px;color:var(--gita)">'+h(x.so)+'</b>'+
      '<div class="tiny muted mt" style="line-height:1.5">'+h(x.n)+'</div></div>';
  }).join('') +'</div>';

  /* Câu hỏi hay gặp */
  o += U.sec('CÂU HỎI HAY GẶP','Tám câu người ta hỏi nhiều nhất, trả lời thẳng');
  o += '<div class="card">'+ (G.GT_HOI || []).map(function(x, i){
    return '<div style="'+(i ? 'border-top:1px solid var(--line);padding-top:14px;margin-top:14px' : '')+'">'+
      '<b class="sm">'+ic('search','w-3 h-3')+' '+h(x.h)+'</b>'+
      '<p class="sm mt" style="line-height:1.8">'+h(x.d)+'</p></div>';
  }).join('') +'</div>';

  /* Bước tiếp theo */
  o += U.sec('BẮT ĐẦU TỪ ĐÂU','Bốn việc, làm được ngay hôm nay, mỗi việc dưới mười lăm phút');
  (G.GT_BUOC || []).forEach(function(x, i){
    var co = !!(G.VIEWS && G.VIEWS[x.v] && G.allowed && G.allowed(x.v));
    o += '<div class="card mt2">'+
      '<div class="row" style="gap:11px;align-items:center;flex-wrap:wrap">'+
        '<span style="width:30px;height:30px;flex:none;border-radius:10px;display:flex;align-items:center;'+
          'justify-content:center;background:var(--gita)18;color:var(--gita);font-weight:700">'+(i+1)+'</span>'+
        '<div style="flex:1;min-width:200px"><b>'+h(x.t)+'</b>'+
          '<div class="tiny muted mt" style="line-height:1.6">'+h(x.y)+'</div></div>'+
        (co ? '<button class="btn pri sm" data-v="'+h(x.v)+'">Mở</button>'
            : '<span class="chip" style="color:var(--ink-4)">Mở ở chặng sau</span>')+
      '</div></div>';
  });

  /* Phần cho đội ngũ: bản nói lại cho gọn */
  if(laNghe){
    o += U.sec('DÙNG BẢN NÀY KHI NGỒI TRƯỚC GIA ĐÌNH','Nói nguyên văn, đừng tự nghĩ thêm lời');
    o += '<div class="card" style="border-color:var(--gita-vien-1)">'+
      '<ul class="sm" style="line-height:1.8;padding-left:19px;margin:0">'+
       ['Buổi đầu chỉ dùng ba phần: một câu ở trên cùng, bốn điều làm được, và SÁU ĐIỀU KHÔNG LÀM. '+
        'Phần không làm được đọc đủ, không rút gọn — đó là phần mua được lòng tin.',
        'Không đọc phần năm tầng ở buổi đầu. Nhà mới nghe năm tầng thì thấy dài và thấy xa.',
        'Câu hỏi về kết quả và thời gian: dùng nguyên văn hai câu trả lời trong phần Câu hỏi hay gặp. '+
        'Đừng hứa nhanh hơn để chốt cho được.',
        'Nhà nào hỏi về chi phí thì nói con số ngay, đừng vòng. Vòng vo về tiền tạo ra nghi ngờ.',
        'Nếu thấy nhà chưa hợp thì nói thẳng và hẹn lại — điều đó nằm ngay trong sáu điều không làm, '+
        'và nói ra thì gia đình tin phần còn lại hơn.']
       .map(function(x){ return '<li style="margin-bottom:7px">'+h(x)+'</li>'; }).join('')+
      '</ul></div>';
  }

  return o;
};

})();
