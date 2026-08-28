/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.7 — LOGO CHUẨN GITA, DỰNG BẰNG VECTOR
   Dựng lại logo chính thức ngay trong ứng dụng: ba nét vòng cung
   (xanh sâu ngoài, xanh sáng trong, đỏ trên cùng), năm ngôi sao
   (bốn xanh một đỏ) và chữ GITA.

   Vẽ bằng vector nên không gọi ảnh ra mạng, in ra không vỡ, và đổi
   nền sáng / tối vẫn đúng màu. Mọi chỗ hiện logo đều gọi từ đây —
   không nơi nào tự vẽ lại, để nhận diện không bao giờ lệch.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function(){

/* Ba màu chuẩn — đọc từ bảng màu để nền tối tự hợp. */
function mau(){
  var cs = getComputedStyle(document.documentElement);
  return {
    sau:  (cs.getPropertyValue('--gita-sau')  || '#174C9E').trim(),
    giua: (cs.getPropertyValue('--gita')      || '#2166CE').trim(),
    sang: (cs.getPropertyValue('--gita-sang') || '#4A8FE0').trim(),
    do:   (cs.getPropertyValue('--gita-do')   || '#E4232B').trim()
  };
}

/* Một ngôi sao năm cánh, tâm (cx,cy), bán kính r, nghiêng nhẹ như logo. */
function sao(cx, cy, r, m, xoay){
  var d = '', b = r * 0.42;
  for(var i = 0; i < 10; i++){
    var bk = (i % 2 === 0) ? r : b;
    var g = (Math.PI / 5) * i - Math.PI / 2 + (xoay || 0);
    d += (i ? 'L' : 'M') + (cx + bk * Math.cos(g)).toFixed(2) + ' ' + (cy + bk * Math.sin(g)).toFixed(2) + ' ';
  }
  return '<path d="' + d + 'Z" fill="' + m + '"/>';
}

/* Một nét vòng cung THON: dày ở giữa, vuốt nhọn về hai đầu.
   Không dùng được một lệnh cung đơn vì bề dày phải thay đổi dọc
   theo nét, nên lấy mẫu điểm rồi nối lại thành một hình khép kín. */
function net(cx, cy, rx, ry, tuDo, denDo, day, mauNet){
  var N = 84, ngoai = [], trong = [];
  for(var i = 0; i <= N; i++){
    var t = i / N;
    var g = (tuDo + (denDo - tuDo) * t) * Math.PI / 180;
    /* thon hai đầu: dày nhất ở giữa nét, về 0 ở hai mút */
    var d = day * Math.pow(Math.sin(Math.PI * t), 0.55);
    var co = Math.cos(g), si = Math.sin(g);
    ngoai.push([(cx + rx * co).toFixed(2), (cy + ry * si).toFixed(2)]);
    trong.push([(cx + (rx - d) * co).toFixed(2), (cy + (ry - d) * si).toFixed(2)]);
  }
  var d1 = 'M' + ngoai[0][0] + ' ' + ngoai[0][1];
  for(var a = 1; a <= N; a++) d1 += 'L' + ngoai[a][0] + ' ' + ngoai[a][1];
  for(var b = N; b >= 0; b--) d1 += 'L' + trong[b][0] + ' ' + trong[b][1];
  return '<path d="' + d1 + 'Z" fill="' + mauNet + '"/>';
}

/* ─── Logo đầy đủ: ba nét thon + năm sao + chữ GITA ─── */
G.logoGita = function(cao){
  var m = mau();
  var W = 520, H = 270;
  var o = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="logo-gita"' +
    (cao ? ' style="height:' + cao + 'px;width:auto"' : '') +
    ' role="img" aria-label="GITA">' +
    '<title>GITA</title><g transform="rotate(-7 250 138)">';

  /* Ba nét mở về bên phải: bắt đầu dưới phải, vòng qua trái, vút lên trên phải.
     Nét ngoài dài và dày nhất, vào trong ngắn dần; nét đỏ nằm trên cùng. */
  o += net(250, 140, 224, 118, 58, 356, 25, m.sau);
  o += net(250, 138, 190,  98, 74, 352, 21, m.giua);
  o += net(250, 132, 158,  78, 96, 350, 18, m.do);
  o += '</g>';

  /* Năm ngôi sao vút lên góc trên bên phải — bốn xanh, một đỏ */
  [[366,30,14],[404,22,13],[440,28,12],[470,42,10.5],[492,60,8.5]]
    .forEach(function(s, i){ o += sao(s[0], s[1], s[2], i === 4 ? m.do : m.giua, .1); });

  /* Chữ GITA — nằm trong lòng ba nét, dùng bộ chữ đã nhúng sẵn */
  o += '<text x="252" y="188" font-family="Georgia, \'Times New Roman\', serif" ' +
    'font-size="104" font-weight="700" letter-spacing="-2" fill="' + m.giua + '">GITA</text>';

  return o + '</svg>';
};

/* ─── Dấu vuông nhỏ: ba nét thon rút gọn, dùng ở thanh trên và biểu tượng ứng dụng.
       Dùng lại đúng hàm net() của logo lớn nên hai bản không bao giờ lệch nhau. ─── */
G.dauGita = function(){
  var m = mau();
  return '<svg viewBox="0 0 48 48" class="dau-gita" role="img" aria-label="GITA">' +
    '<title>GITA</title>' +
    '<rect width="48" height="48" rx="13" fill="#FFFFFF"/>' +
    '<g transform="rotate(-7 24 26)">' +
      net(24, 26, 19.5, 12.5, 66, 352, 3.6, m.sau) +
      net(24, 26, 15.5,  9.5, 82, 348, 3.0, m.giua) +
      net(24, 26, 11.5,  6.5, 104, 344, 2.6, m.do) +
    '</g>' +
    sao(40, 10.5, 4.4, m.do, .1) +
    '</svg>';
};
})();
