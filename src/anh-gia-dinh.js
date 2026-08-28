/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.6 — ẢNH "NHÀ MÌNH" Ở CỔNG VÀO
   Tranh vẽ vector dựng ngay trong ứng dụng: một ngôi nhà sáng đèn,
   ba mẹ và hai con nắm tay nhau trước cửa. Vẽ bằng hình khối nên
   không dùng ảnh người thật, không gọi ra mạng, phóng to vẫn nét.
   Bố cục: nhà là nền, cửa chính lọt đúng khoảng giữa hai con.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

G.anhGiaDinh = function(){
  var W = 620, H = 400;
  var DAT = 332;                    /* mặt đất — chân người chạm ở đây */
  var nx  = 310;                    /* tâm ngôi nhà */

  var DA   = ['#F7D0A8','#F9D8B6','#F6CEA6','#F4C79C'];
  var TOC  = ['#3B2B22','#4A2E24','#5B3A26','#3F2A20'];
  var AO   = {ba:'#3B82F6', me:'#FB7185', lon:'#10B981', nho:'#8B5CF6'};
  var QUAN = '#5A5175';

  var o = '<svg viewBox="0 0 '+W+' '+H+'" role="img" '+
    'aria-label="Tranh vẽ một ngôi nhà sáng đèn, ba mẹ và hai con nắm tay nhau trước cửa, cả nhà cùng cười.">'+
    '<title>Nhà mình — ba mẹ và hai con nắm tay nhau trước ngôi nhà sáng đèn</title>'+
    '<defs>'+
      '<clipPath id="agKhung"><rect x="0" y="0" width="'+W+'" height="'+H+'" rx="20"/></clipPath>'+
      '<linearGradient id="agTroi" x1=".15" y1="0" x2=".85" y2="1">'+
        '<stop offset="0"   stop-color="#FFF3DA"/>'+
        '<stop offset=".42" stop-color="#FFE3BE"/>'+
        '<stop offset=".78" stop-color="#FBE0D6"/>'+
        '<stop offset="1"   stop-color="#EFE3FB"/></linearGradient>'+
      '<radialGradient id="agNang" cx=".5" cy=".5" r=".5">'+
        '<stop offset="0"   stop-color="#FFE7B0" stop-opacity=".92"/>'+
        '<stop offset=".5"  stop-color="#F5B942" stop-opacity=".30"/>'+
        '<stop offset="1"   stop-color="#F5B942" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="agMai" x1="0" y1="0" x2="1" y2="1">'+
        '<stop offset="0" stop-color="#FFCE72"/><stop offset="1" stop-color="#FF7A45"/></linearGradient>'+
      '<linearGradient id="agTuong" x1="0" y1="0" x2="0" y2="1">'+
        '<stop offset="0" stop-color="#FFFDF7"/><stop offset="1" stop-color="#F8E4C6"/></linearGradient>'+
      '<radialGradient id="agDen" cx=".5" cy=".5" r=".5">'+
        '<stop offset="0" stop-color="#FFDB94" stop-opacity=".9"/>'+
        '<stop offset="1" stop-color="#FFDB94" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="agDat" x1="0" y1="0" x2="0" y2="1">'+
        '<stop offset="0" stop-color="#8CE8C4"/>'+
        '<stop offset="1" stop-color="#57D3A4"/></linearGradient>'+
    '</defs>';

  /* ═══ trời · nắng · mây ═══ */
  o += '<g clip-path="url(#agKhung)">'+
    '<rect x="0" y="0" width="'+W+'" height="'+H+'" fill="url(#agTroi)"/>'+
    '<circle cx="522" cy="70" r="118" fill="url(#agNang)"/>'+
    '<circle cx="522" cy="70" r="27" fill="#FFC94F"/>'+
    '<circle cx="522" cy="70" r="27" fill="#FFFFFF" opacity=".28"/>';

  function may(x,y,s,op){
    return '<g opacity="'+op+'" transform="translate('+x+' '+y+') scale('+s+')" fill="#FFFFFF">'+
      '<ellipse cx="0" cy="0" rx="27" ry="13"/><ellipse cx="21" cy="4" rx="19" ry="10"/>'+
      '<ellipse cx="-20" cy="4" rx="16" ry="9"/></g>';
  }
  o += may(92,62,1,.92) + may(212,38,.7,.72) + may(438,116,.6,.6) + may(560,168,.5,.5);

  function chim(x,y,w,d){
    return '<path d="M'+x+' '+y+' q'+(w/2)+' -'+d+' '+w+' 0 q'+(w/2)+' -'+d+' '+w+' 0" '+
      'fill="none" stroke="#C9A87E" stroke-opacity=".85" stroke-width="2" stroke-linecap="round"/>';
  }
  o += chim(112,118,11,7) + chim(154,100,8,5) + chim(180,130,7,4.5);

  /* ═══ đồi đất ═══ */
  o += '<path d="M0 '+DAT+' Q 150 '+(DAT-20)+' 320 '+(DAT-5)+' T '+W+' '+(DAT-14)+' L '+W+' '+H+' L 0 '+H+' Z" fill="url(#agDat)"/>'+
    '<path d="M0 '+DAT+' Q 150 '+(DAT-20)+' 320 '+(DAT-5)+' T '+W+' '+(DAT-14)+'" fill="none" '+
      'stroke="#34D399" stroke-opacity=".85" stroke-width="2"/>';

  /* ═══ cây hai bên ═══ */
  function cay(x, yGoc, s, op){
    return '<g opacity="'+op+'" transform="translate('+x+' '+yGoc+') scale('+s+')">'+
      '<rect x="-4.5" y="-46" width="9" height="48" rx="4" fill="#8A6440"/>'+
      '<circle cx="0"   cy="-64" r="30" fill="#3FCE97"/>'+
      '<circle cx="-19" cy="-50" r="22" fill="#2FBB85"/>'+
      '<circle cx="19"  cy="-51" r="23" fill="#57D3A4"/></g>';
  }
  o += cay(74, DAT-2, 1, 1) + cay(556, DAT-6, .74, .92);

  /* ═══ NGÔI NHÀ ═══ */
  var bT = 156, bB = 292;                       /* thân nhà từ y=156 tới 292 */
  o += '<g>'+
    '<ellipse cx="'+nx+'" cy="'+(bB+2)+'" rx="126" ry="12" fill="#3A2A55" opacity=".14"/>'+
    /* thân */
    '<rect x="'+(nx-104)+'" y="'+bT+'" width="208" height="'+(bB-bT)+'" rx="6" fill="url(#agTuong)"/>'+
    /* chân tường */
    '<rect x="'+(nx-104)+'" y="'+(bB-14)+'" width="208" height="14" rx="4" fill="#EED4AE"/>'+
    /* ống khói + khói */
    '<rect x="'+(nx+58)+'" y="94" width="24" height="50" rx="4" fill="#E8875A"/>'+
    '<rect x="'+(nx+54)+'" y="88" width="32" height="11" rx="4" fill="#FF7A45"/>'+
    '<g fill="#FFFFFF" opacity=".9">'+
      '<circle cx="'+(nx+72)+'" cy="76" r="7"/><circle cx="'+(nx+80)+'" cy="58" r="9"/>'+
      '<circle cx="'+(nx+70)+'" cy="38" r="11"/></g>'+
    /* mái + diềm mái */
    '<path d="M'+(nx-128)+' '+bT+' L '+nx+' 62 L '+(nx+128)+' '+bT+' Z" fill="url(#agMai)"/>'+
    '<rect x="'+(nx-128)+'" y="'+(bT-1)+'" width="256" height="8" rx="4" fill="#FFB765"/>'+
    /* trái tim trên mặt tiền mái */
    '<path d="M'+nx+' 106 c -9 -12 -20 -5 -20 4 c 0 10 13 15 20 22 c 7 -7 20 -12 20 -22 c 0 -9 -11 -16 -20 -4 Z" '+
      'fill="#FB7185"/>'+
    /* hai cửa sổ sáng đèn */
    '<circle cx="'+(nx-76)+'" cy="202" r="42" fill="url(#agDen)"/>'+
    '<circle cx="'+(nx+76)+'" cy="202" r="42" fill="url(#agDen)"/>'+
    '<rect x="'+(nx-94)+'" y="184" width="36" height="36" rx="5" fill="#FFDB94"/>'+
    '<rect x="'+(nx+58)+'" y="184" width="36" height="36" rx="5" fill="#FFDB94"/>'+
    '<path d="M'+(nx-76)+' 184 v36 M'+(nx-94)+' 202 h36" stroke="#E08A4B" stroke-width="2.4"/>'+
    '<path d="M'+(nx+76)+' 184 v36 M'+(nx+58)+' 202 h36" stroke="#E08A4B" stroke-width="2.4"/>'+
    '<rect x="'+(nx-98)+'" y="222" width="44" height="5" rx="2.5" fill="#E8B98A"/>'+
    '<rect x="'+(nx+54)+'" y="222" width="44" height="5" rx="2.5" fill="#E8B98A"/>'+
    /* cửa chính — lọt đúng khoảng giữa hai con */
    '<path d="M'+(nx-22)+' '+bB+' v-42 a22 22 0 0 1 44 0 v42 Z" fill="#E08A4B"/>'+
    '<path d="M'+(nx-22)+' '+bB+' v-42 a22 22 0 0 1 44 0" fill="none" stroke="#C9713A" stroke-width="2.2"/>'+
    '<circle cx="'+(nx+12)+'" cy="'+(bB-30)+'" r="3.2" fill="#FFE9BE"/>'+
    /* lối đi ra cửa */
    '<path d="M'+(nx-15)+' '+bB+' L '+(nx-20)+' '+(DAT-4)+' Q '+nx+' '+(DAT+1)+' '+(nx+20)+' '+(DAT-4)+
      ' L '+(nx+15)+' '+bB+' Z" fill="#EFDCBB"/>'+
    '</g>';

  /* ═══ BỐN NGƯỜI NẮM TAY — ba · con lớn · con nhỏ · mẹ ═══ */
  var NG = [
    {x:186, lon:1, da:0, toc:'ngan', ao:'ba'},
    {x:262, lon:0, da:1, toc:'buoi', ao:'lon'},
    {x:358, lon:0, da:2, toc:'ngan', ao:'nho'},
    {x:434, lon:1, da:3, toc:'dai',  ao:'me'}
  ];
  function dau(p){  return p.lon ? 242 : 266; }   /* tâm đầu */
  function rDau(p){ return p.lon ? 15  : 12;  }
  function vai(p){  return dau(p) + rDau(p) + 6; }
  function eo(p){   return p.lon ? 310 : 314;  }

  function nguoi(p, i){
    var x = p.x, r = rDau(p), yD = dau(p), yV = vai(p), yE = eo(p);
    var da = DA[p.da], toc = TOC[i], ao = AO[p.ao], lon = p.lon;
    var g = '<g>';

    g += '<ellipse cx="'+x+'" cy="'+(DAT+2)+'" rx="'+(lon?17:14)+'" ry="4" fill="#3A2A55" opacity=".20"/>';

    /* tóc dài nằm sau đầu */
    if(p.toc === 'dai'){
      g += '<path d="M'+(x-r-3)+' '+(yD-3)+' q -5 30 3 41 q 8 -9 7 -23 '+
        'M'+(x+r+3)+' '+(yD-3)+' q 5 30 -3 41 q -8 -9 -7 -23" fill="'+toc+'"/>';
    }

    /* chân */
    var wc = lon ? 8 : 7, hc = DAT - yE;
    g += '<rect x="'+(x-wc-1.5)+'" y="'+yE+'" width="'+wc+'" height="'+hc+'" rx="'+(wc/2)+'" fill="'+QUAN+'"/>'+
         '<rect x="'+(x+1.5)+'" y="'+yE+'" width="'+wc+'" height="'+hc+'" rx="'+(wc/2)+'" fill="'+QUAN+'"/>'+
         '<ellipse cx="'+(x-wc/2-1.5)+'" cy="'+(DAT+0.5)+'" rx="'+(wc/2+2)+'" ry="3.4" fill="#453D5E"/>'+
         '<ellipse cx="'+(x+wc/2+1.5)+'" cy="'+(DAT+0.5)+'" rx="'+(wc/2+2)+'" ry="3.4" fill="#453D5E"/>';

    /* thân áo */
    var wV = lon ? 13 : 10, wD = lon ? 19 : 15;
    g += '<path d="M'+(x-wV)+' '+(yV+2)+' Q '+x+' '+(yV-5)+' '+(x+wV)+' '+(yV+2)+
         ' L '+(x+wD)+' '+yE+' Q '+x+' '+(yE+5)+' '+(x-wD)+' '+yE+' Z" fill="'+ao+'"/>'+
         '<path d="M'+(x-5)+' '+(yV+1)+' Q '+x+' '+(yV+7)+' '+(x+5)+' '+(yV+1)+'" fill="none" '+
         'stroke="#FFFFFF" stroke-opacity=".45" stroke-width="1.8" stroke-linecap="round"/>';

    /* cổ + đầu */
    g += '<rect x="'+(x-3.6)+'" y="'+(yD+r-5)+'" width="7.2" height="10" rx="3.4" fill="'+da+'"/>'+
         '<circle cx="'+x+'" cy="'+yD+'" r="'+r+'" fill="'+da+'"/>';

    /* tóc */
    if(p.toc === 'buoi'){
      g += '<path d="M'+(x-r)+' '+(yD+1)+' a'+r+' '+r+' 0 0 1 '+(r*2)+' 0 q -'+r+' -9 -'+(r*2)+' 0 Z" fill="'+toc+'"/>'+
        '<circle cx="'+(x-r+1)+'" cy="'+(yD-7)+'" r="5" fill="'+toc+'"/>'+
        '<circle cx="'+(x+r-1)+'" cy="'+(yD-7)+'" r="5" fill="'+toc+'"/>';
    } else {
      g += '<path d="M'+(x-r)+' '+(yD+1)+' a'+r+' '+r+' 0 0 1 '+(r*2)+' 0 q -'+r+' -11 -'+(r*2)+' 0 Z" fill="'+toc+'"/>';
    }

    /* mặt cười */
    var em = lon ? 5.4 : 4.6, ey = yD - 1.5, rm = lon ? 1.8 : 1.6;
    g += '<circle cx="'+(x-em)+'" cy="'+ey+'" r="'+rm+'" fill="#3B2B22"/>'+
         '<circle cx="'+(x+em)+'" cy="'+ey+'" r="'+rm+'" fill="#3B2B22"/>'+
         '<path d="M'+(x-em)+' '+(ey+5)+' Q '+x+' '+(ey+10.5)+' '+(x+em)+' '+(ey+5)+'" fill="none" '+
           'stroke="#3B2B22" stroke-width="'+(lon?1.9:1.7)+'" stroke-linecap="round"/>'+
         '<circle cx="'+(x-em-3.4)+'" cy="'+(ey+5)+'" r="2.9" fill="#FB7185" opacity=".28"/>'+
         '<circle cx="'+(x+em+3.4)+'" cy="'+(ey+5)+'" r="2.9" fill="#FB7185" opacity=".28"/>';
    return g + '</g>';
  }

  /* tay nắm nhau — vẽ trước thân người để bàn tay không đè lên áo */
  var tay = '';
  function noiTay(a, b){
    var A = NG[a], B = NG[b];
    var yA = vai(A) + 4, yB = vai(B) + 4;
    var mx = (A.x + B.x) / 2, my = Math.max(yA, yB) + 22;
    var wA = A.lon ? 13 : 10, wB = B.lon ? 13 : 10;
    tay += '<path d="M'+(A.x+wA)+' '+yA+' Q '+((A.x+mx)/2+5)+' '+(my-3)+' '+mx+' '+my+'" fill="none" '+
        'stroke="'+DA[A.da]+'" stroke-width="'+(A.lon?7:6)+'" stroke-linecap="round"/>'+
      '<path d="M'+(B.x-wB)+' '+yB+' Q '+((B.x+mx)/2-5)+' '+(my-3)+' '+mx+' '+my+'" fill="none" '+
        'stroke="'+DA[B.da]+'" stroke-width="'+(B.lon?7:6)+'" stroke-linecap="round"/>'+
      '<circle cx="'+mx+'" cy="'+my+'" r="5.6" fill="'+DA[B.da]+'"/>'+
      '<circle cx="'+mx+'" cy="'+(my-1)+'" r="5.6" fill="#FFFFFF" opacity=".16"/>';
  }
  noiTay(0,1); noiTay(1,2); noiTay(2,3);

  /* hai tay ngoài buông tự nhiên */
  tay += '<path d="M'+(NG[0].x-13)+' '+(vai(NG[0])+4)+' Q '+(NG[0].x-26)+' '+(vai(NG[0])+26)+' '+
      (NG[0].x-23)+' '+(vai(NG[0])+46)+'" fill="none" stroke="'+DA[NG[0].da]+'" stroke-width="7" stroke-linecap="round"/>'+
    '<path d="M'+(NG[3].x+13)+' '+(vai(NG[3])+4)+' Q '+(NG[3].x+26)+' '+(vai(NG[3])+26)+' '+
      (NG[3].x+23)+' '+(vai(NG[3])+46)+'" fill="none" stroke="'+DA[NG[3].da]+'" stroke-width="7" stroke-linecap="round"/>';

  o += tay;
  NG.forEach(function(p,i){ o += nguoi(p,i); });

  /* ═══ hoa nhỏ dưới đất và đốm nắng ═══ */
  [[120,344,'#FB7185'],[148,352,'#F5B942'],[498,346,'#8B5CF6'],[532,354,'#FB7185'],[86,354,'#F5B942']]
    .forEach(function(f){
      o += '<g transform="translate('+f[0]+' '+f[1]+')">'+
        '<rect x="-.9" y="0" width="1.8" height="9" rx="1" fill="#34D399"/>'+
        '<circle cx="0" cy="-1.5" r="3.6" fill="'+f[2]+'" opacity=".85"/></g>';
    });
  [[130,166,3],[196,128,2.2],[452,150,2.6],[576,236,2],[92,196,2.4]]
    .forEach(function(d){
      o += '<circle cx="'+d[0]+'" cy="'+d[1]+'" r="'+d[2]+'" fill="#FFE1A2" opacity=".7"/>';
    });

  return o + '</g></svg>';
};
