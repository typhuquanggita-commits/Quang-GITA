/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.6 — BẢNG PHÂN QUYỀN · PHẠM VI CỦA TÔI
   Hai màn hình sinh ra từ hai câu hỏi thật:
     · Super Admin và Admin lấy gì để phân quyền cho từng vị trí?
     · Khách hàng lấy gì để biết mình đang mở tới đâu, còn gì chưa mở?
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
(function(){
var U = G.U, h = U.h, ic = U.ic;

/* ═══════════════ 1 · BẢNG PHÂN QUYỀN ═══════════════ */

/* Ba trạng thái một ô có thể ở:
     'bac'  — theo bậc của vai, không ai đụng vào
     'cho'  — cấp thêm ngoài bậc
     'cam'  — thu lại dù bậc có cho                                        */
G.oQuyen = function(vaiId, perm){
  var ov = G.PHANQUYEN[vaiId];
  if(ov && ov.cam.indexOf(perm) >= 0) return 'cam';
  if(ov && ov.cho.indexOf(perm) >= 0) return 'cho';
  return 'bac';
};

/* Người đang đăng nhập có được sửa ô này không.
   Bốn luật, kiểm theo đúng thứ tự — luật nào chặn thì dừng ở đó. */
G.suaDuocO = function(vaiId, perm){
  var toi = G.S.roleObj;
  if(!toi || !G.can('sys_manage_user')) return 'Vai này không có quyền quản trị người dùng.';
  var dich = G.roleById(vaiId);
  if(!dich) return 'Không có vai này.';
  if(dich.lv < toi.lv) return 'Không sửa được quyền của vai cao hơn mình (' + dich.n + ').';
  if(dich.id === toi.id && perm === 'sys_manage_user')
    return 'Không tự thu quyền quản trị của chính mình — thu xong sẽ không ai mở lại được.';
  if(!G.can(perm)) return 'Không cấp được quyền mà chính mình không có (' + (G.PERM_TEN[perm]||perm) + ').';
  return true;
};

G.doiO = function(vaiId, perm){
  var duoc = G.suaDuocO(vaiId, perm);
  if(duoc !== true){ U.toast(duoc, 'err'); return; }
  if(!G.PHANQUYEN[vaiId]) G.PHANQUYEN[vaiId] = {cho:[], cam:[]};
  var ov = G.PHANQUYEN[vaiId];
  function bo(a, x){ var i = a.indexOf(x); if(i>=0) a.splice(i,1); }
  var truoc = G.vaiCo(vaiId, perm), tt = G.oQuyen(vaiId, perm);

  /* Vòng: theo bậc → cho → cấm → theo bậc */
  if(tt === 'bac'){ bo(ov.cam, perm); ov.cho.push(perm); }
  else if(tt === 'cho'){ bo(ov.cho, perm); ov.cam.push(perm); }
  else { bo(ov.cam, perm); bo(ov.cho, perm); }

  G.luuPhanQuyen();
  var sau = G.vaiCo(vaiId, perm);
  if(G.secLog) G.secLog('Đổi phân quyền',
    vaiId + ' · ' + perm + ' · ' + (truoc?'có':'không') + ' → ' + (sau?'có':'không') +
    ' · người sửa ' + (G.S.acc && G.S.acc.u), 'Ghi nhận');
  G.render();
};

G.datLaiPhanQuyen = function(){
  if(!G.can('sys_manage_user')){ U.toast('Vai này không có quyền.','err'); return; }
  G.PHANQUYEN = {};
  Object.keys(G.PHANQUYEN_GOC||{}).forEach(function(k){
    G.PHANQUYEN[k] = {cho:G.PHANQUYEN_GOC[k].cho.slice(), cam:G.PHANQUYEN_GOC[k].cam.slice()};
  });
  G.luuPhanQuyen();
  if(G.secLog) G.secLog('Đặt lại phân quyền','Về mặc định gốc · ' + (G.S.acc && G.S.acc.u),'Ghi nhận');
  U.toast('Đã trả bảng phân quyền về mặc định gốc.','ok');
  G.render();
};

G.VIEWS['phan-quyen'] = function(){
  if(!G.can('sys_manage_user'))
    return U.lockCard('Bảng phân quyền chỉ mở cho Super Admin và Admin hệ thống. '+
      'Đây là chỗ quyết định mọi vai khác nhìn thấy gì, nên không mở rộng hơn.');

  var toi = G.S.roleObj;
  var VAI = G.ROLES.slice().sort(function(a,b){ return a.lv - b.lv; });

  var o = U.ph({eyebrow:'QUẢN TRỊ · CHỈ R01 – R02', ic:'lock', grad:1,
    t:'Bảng phân quyền theo vị trí',
    lead:'Mỗi ô là một câu trả lời: vị trí này có được làm việc này không. '+
      'Bấm vào ô để đổi. Bậc của vai là nền mặc định; anh chị cấp thêm hoặc thu lại ngay trên bảng.'});

  /* Ba luật đọc bảng */
  o += '<div class="pq-chugiai">'+
    '<span><i class="pq-ic bac">'+ic('check','w-3 h-3')+'</i> theo bậc — mặc định của vai</span>'+
    '<span><i class="pq-ic cho">'+ic('plus','w-3 h-3')+'</i> cấp thêm ngoài bậc</span>'+
    '<span><i class="pq-ic cam">'+ic('x','w-3 h-3')+'</i> đã thu lại</span>'+
    '<span><i class="pq-ic khong"></i> bậc không cho, chưa cấp thêm</span></div>';

  o += '<div class="card pad-sm mb" style="border-color:rgba(245,185,66,.3)">'+
    '<p class="sm" style="line-height:1.7;color:var(--ink-2)">'+
    '<b>Bốn điều bảng này không cho làm:</b> không sửa quyền của vai cao hơn mình; '+
    'không cấp quyền mà chính mình không có; không tự thu quyền quản trị của chính mình; '+
    'và mọi lần đổi đều vào nhật ký hệ thống kèm tên người sửa.</p></div>';

  /* Bảng lớn: hàng = quyền, cột = vai */
  G.PERM_NHOM.forEach(function(nh){
    o += U.sec(nh.t, nh.ds.length + ' quyền');
    var cols = ['Quyền'].concat(VAI.map(function(r){ return r.short; }));
    var rows = nh.ds.map(function(perm){
      var oCells = VAI.map(function(r){
        var tt = G.oQuyen(r.id, perm), co = G.vaiCo(r.id, perm);
        var cls = co ? (tt==='cho' ? 'cho' : 'bac') : (tt==='cam' ? 'cam' : 'khong');
        var suaDuoc = G.suaDuocO(r.id, perm) === true;
        var nhan = cls==='bac'?'có theo bậc':cls==='cho'?'được cấp thêm':cls==='cam'?'đã thu lại':'không có';
        return '<button class="pq-o '+cls+(suaDuoc?'':' cung')+'" '+
          (suaDuoc?'data-pq="'+h(r.id)+'|'+h(perm)+'"':'disabled')+
          ' title="'+h(r.n+' — '+(G.PERM_TEN[perm]||perm)+' — '+nhan+(suaDuoc?'':' (không sửa được)'))+'">'+
          (cls==='bac'?ic('check','w-3 h-3'):cls==='cho'?ic('plus','w-3 h-3'):cls==='cam'?ic('x','w-3 h-3'):'')+
          '</button>';
      });
      return ['<div class="pq-ten"><b>'+h(G.PERM_TEN[perm]||perm)+'</b>'+
        '<span class="mono tiny muted">'+h(perm)+' · bậc ≤ '+G.PERM[perm]+'</span></div>'].concat(oCells);
    });
    o += '<div class="pq-bang">' + U.tbl(cols, rows) + '</div>';
  });

  /* Tổng kết từng vai — để thấy ngay vai nào rộng vai nào hẹp */
  o += U.sec('TỔNG KẾT TỪNG VỊ TRÍ','Số quyền đang có và số màn hình mở được');
  var tongPerm = Object.keys(G.PERM).length;
  o += U.tbl(['Vị trí','Bậc','Quyền','Màn hình mở','Sửa bởi bảng'], VAI.map(function(r){
    var nQ = G.demQuyen(r.id);
    var nM = 0; G.NAV.forEach(function(g){ g.items.forEach(function(it){
      if(!it.perm || G.vaiCo(r.id, it.perm)) nM++; }); });
    var ov = G.PHANQUYEN[r.id] || {cho:[],cam:[]};
    var sua = (ov.cho.length? '+'+ov.cho.length+' cấp thêm ' : '') + (ov.cam.length? '−'+ov.cam.length+' thu lại' : '');
    return [U.chip(r.n, r.c),
      '<span class="mono sm">'+r.lv+'</span>',
      '<b>'+nQ+'</b><span class="muted sm"> / '+tongPerm+'</span>',
      '<b>'+nM+'</b><span class="muted sm"> / '+G.tongManHinh()+'</span>',
      sua ? '<span class="sm" style="color:var(--gold)">'+h(sua)+'</span>' : '<span class="sm muted">theo bậc</span>'];
  }));

  o += '<div class="row mt2" style="gap:10px;flex-wrap:wrap">'+
    '<button class="btn ghost sm" data-act="pq-dat-lai">'+ic('orbit','w-4 h-4')+'Trả về mặc định gốc</button>'+
    '<button class="btn ghost sm" data-v="tang-quyen">Xem tầng quyền truy cập</button>'+
    '<button class="btn ghost sm" data-v="nhat-ky-ht">Nhật ký hệ thống</button></div>';

  o += '<p class="tiny muted mt">Bảng lưu trong máy này và đồng bộ lên máy chủ ở lần đồng bộ kế tiếp. '+
    'Người dùng đang đăng nhập sẽ thấy phạm vi mới ở lần đăng nhập sau.</p>';
  return o;
};

G.tongManHinh = function(){
  var n = 0; G.NAV.forEach(function(g){ n += g.items.length; }); return n;
};

/* ═══════════════ 2 · PHẠM VI CỦA TÔI ═══════════════
   Trả lời đúng ba câu khách hàng hay hỏi: tôi đang mở tới đâu, cái gì
   chưa mở, và mở nó bằng cách nào. Không né, không nói vòng. */

G.VIEWS['pham-vi'] = function(){
  var r = G.S.roleObj || {}, T = G.TIERS || [];
  var nha = G.myFamily ? G.myFamily() : null;
  var tangDang = nha && nha.tier ? Number(nha.tier) : 0;
  var khach = r.lv >= 13;

  var mo = [], khoa = [];
  G.NAV.forEach(function(g){
    g.items.forEach(function(it){
      var duoc = !it.perm || G.can(it.perm);
      (duoc ? mo : khoa).push({g:g, it:it});
    });
  });

  var o = U.ph({eyebrow:'PHẠM VI CỦA TÔI', ic:'compass', grad:1,
    t:'Mình đang mở tới đâu',
    lead: khach
      ? 'Trang này nói thẳng: tài khoản của anh chị mở được những gì hôm nay, phần nào chưa mở, và mở nó bằng cách nào.'
      : 'Phạm vi của vai ' + (r.n||'') + ': mở được gì, còn gì thuộc vai khác.'});

  /* Ba con số đầu tiên */
  o += '<div class="pv-lo">'+
    '<div class="pv-th"><b>'+mo.length+'</b><span>MÀN HÌNH ĐANG MỞ</span></div>'+
    '<div class="pv-th"><b>'+khoa.length+'</b><span>CHƯA MỞ</span></div>'+
    '<div class="pv-th"><b>'+G.demQuyen(r)+'</b><span>QUYỀN ĐANG CÓ</span></div>'+
    '<div class="pv-th"><b>'+((G.KHO&&G.KHO.daNap.length)||0)+'</b><span>GÓI NỘI DUNG ĐÃ MỞ</span></div>'+
    '</div>';

  /* Trạng thái kho — nói rõ đang ở chế độ nào */
  if(G.KHO && G.KHO.cheDoMau){
    o += '<div class="card mt2" style="border-color:rgba(245,158,11,.42);background:rgba(245,158,11,.07)">'+
      '<div class="row mb"><span style="color:var(--warn)">'+ic('shield','w-4 h-4')+'</span>'+
      '<b>Đang ở chế độ mẫu — chưa nối máy chủ cấp phép</b></div>'+
      '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Ứng dụng đang chạy với gói nội dung công khai: '+
      'lộ trình năm tầng, chuỗi trải nghiệm, cách ghi nhận, nhận diện thương hiệu, một bài test rút gọn và '+
      'phần minh hoạ của kho nghề. Toàn bộ kịch bản chuyên môn, phác đồ, mô thức và hệ VIP vẫn khoá.</p>'+
      '<p class="sm muted mt">Nối máy chủ cấp phép rồi đăng nhập lại là mở đủ theo vai và tầng.</p></div>';
  } else if(G.KHO){
    o += '<div class="card mt2" style="border-color:rgba(16,185,129,.4)">'+
      '<div class="row mb"><span style="color:var(--ok)">'+ic('check','w-4 h-4')+'</span>'+
      '<b>Đã mở kho theo phạm vi được cấp</b></div>'+
      '<p class="sm dim">Gói đang mở: <b class="mono">'+h(G.KHO.daNap.join(' · ')||'—')+'</b>'+
      (G.KHO.hanKhoa ? ' · hạn tới '+h(G.KHO.hanKhoa) : '')+'</p></div>';
  }

  /* Với khách hàng: năm tầng, tầng nào mở tầng nào chưa */
  if(khach && T.length){
    o += U.sec('NĂM TẦNG — TẦNG NÀO ĐÃ MỞ','Tầng mở dần theo KPI đã đạt và khoản đã thanh toán');
    o += '<div class="pv-tang">'+ T.map(function(t){
      var trang = t.id <= tangDang ? 'mo' : (t.id === tangDang+1 ? 'ke' : 'chua');
      return '<div class="pv-t '+trang+'" style="--tc:'+t.c+'">'+
        '<div class="pv-t-h"><b>'+h(t.code)+'</b><span>'+h(t.name)+'</span></div>'+
        '<div class="pv-t-tt">'+ (trang==='mo' ? ic('check','w-3 h-3')+' đã mở'
            : trang==='ke' ? ic('arrow','w-3 h-3')+' tầng kế tiếp' : ic('lock','w-3 h-3')+' chưa mở') +'</div>'+
        '<p class="pv-t-m">'+h(t.days+' ngày · '+t.q)+'</p></div>';
    }).join('') + '</div>';

    var ke = T[tangDang] || null;
    o += '<div class="card mt2" style="border-color:rgba(245,185,66,.34)">'+
      '<div class="up mb" style="color:var(--gold)">MỞ TẦNG TIẾP THEO BẰNG CÁCH NÀO</div>'+
      (ke ? '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Tầng kế tiếp là <b>'+h(ke.code+' · '+ke.name)+'</b>. '+
              'Hai điều kiện, phải đủ cả hai:</p>'+
            U.list([
              'Hoàn thành KPI của tầng đang học — hệ thống đếm từ chính dữ liệu anh chị đã ghi, không ai khai hộ.',
              'Xác nhận thanh toán thành công — kế toán đối chiếu sao kê rồi mới ghi nhận.'
            ])+
            '<p class="sm muted mt">Đủ KPI mà chưa thanh toán thì giữ nguyên tầng và hiện rõ đang chờ. '+
            'Đã thanh toán mà chưa đủ KPI thì tiền được ghi nhận, dùng cho lần duyệt sau. '+
            'Mỗi lần chỉ lên đúng một tầng.</p>'
          : '<p class="sm dim">Nhà mình đã đi hết năm tầng.</p>')+
      '<div class="row mt" style="gap:9px;flex-wrap:wrap">'+
        '<button class="btn ghost sm" data-v="kpi-100">Xem KPI của mình</button>'+
        '<button class="btn ghost sm" data-v="lo-trinh">Xem lộ trình năm tầng</button></div></div>';
  }

  /* Cái gì chưa mở, và vì sao — nhóm theo lý do, không đổ một đống */
  if(khoa.length){
    o += U.sec('PHẦN CHƯA MỞ — VÀ LÝ DO', khoa.length + ' màn hình');
    var theoQuyen = {};
    khoa.forEach(function(x){ (theoQuyen[x.it.perm] = theoQuyen[x.it.perm] || []).push(x.it); });
    o += U.tbl(['Nhóm nội dung','Mở cho ai','Số màn','Gồm những gì'],
      Object.keys(theoQuyen).map(function(perm){
        var ds = theoQuyen[perm];
        var bac = G.PERM[perm];
        var aiMo = G.ROLES.filter(function(x){ return G.vaiCo(x.id, perm); })
          .sort(function(a,b){return a.lv-b.lv;});
        var ten = aiMo.length ? aiMo[aiMo.length-1].n + ' trở lên' : 'chưa vai nào';
        return ['<b>'+h(G.PERM_TEN[perm]||perm)+'</b>',
          '<span class="sm">'+h(ten)+'</span>',
          '<b>'+ds.length+'</b>',
          '<span class="sm muted">'+h(ds.slice(0,4).map(function(i){return G.iname(i);}).join(' · ') +
            (ds.length>4 ? ' …' : ''))+'</span>'];
      }));
    o += '<p class="tiny muted mt">Đây không phải lỗi. Mỗi vai chỉ mở phần thuộc việc của vai đó — '+
      'đó là cách GITA giữ hồ sơ của từng gia đình không rơi sang tay người không phụ trách.</p>';
  }

  /* Đang mở những gì */
  o += U.sec('ĐANG MỞ', mo.length + ' màn hình');
  o += '<div class="pv-mo">'+ G.NAV.map(function(g){
    var ds = g.items.filter(function(it){ return !it.perm || G.can(it.perm); });
    if(!ds.length) return '';
    return '<div class="pv-nh"><div class="pv-nh-h" style="color:'+g.c+'">'+ic(g.ic,'w-4 h-4')+
      '<b>'+h(G.gname(g))+'</b><span class="muted">'+ds.length+'</span></div>'+
      '<div class="pv-nh-b">'+ ds.map(function(it){
        return '<button class="pv-i" data-v="'+h(it.v)+'">'+h(G.iname(it))+'</button>';
      }).join('') +'</div></div>';
  }).join('') +'</div>';

  return o;
};
})();
