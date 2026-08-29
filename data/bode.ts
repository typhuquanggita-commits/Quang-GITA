/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {BoDe, BaremPhan} from '../types';
import {DANG_BAI, KHUNG, phieuLuyen, NGUONG_DAT} from './phieu';
import {LEVELS} from './levels';
import {GIAI_BY_DANG} from './giaide';

/* ==========================================================================
   BỘ 2.000 ĐỀ — ĐÁP ÁN VÀ BẢNG PHÂN TÍCH BẢY CHIỀU

   NÓI THẲNG TRƯỚC VỀ CÁI NÀY LÀ GÌ VÀ KHÔNG LÀ GÌ
     Đây KHÔNG phải 2.000 đề với 40.000 câu hỏi viết tay riêng từng câu. Viết
     bằng ấy câu thì mỗi câu chỉ dùng được đúng một lần, phần lớn sẽ lặp
     nhau, và không ai đọc hết được.

     Đây là 2.000 BẢNG PHÂN TÍCH — mỗi phiếu luyện một bảng — trả lời bảy câu
     hỏi mà một học viên vừa làm xong thật sự cần. Thứ chuyển giao được là
     cách đọc vị dạng bài và quy trình nghĩ, chứ không phải lời giải của một
     câu cụ thể; và cái đó thì dùng lại được ở mọi câu cùng dạng, kể cả câu
     chưa gặp bao giờ.

     Câu cụ thể có đáp án bấm được nằm ở data/nganhang.ts. Đề thi mẫu trọn
     vẹn nằm ở data/dethi.ts. Ba tầng khác nhau, ba việc khác nhau.

   BẢY CHIỀU, VÀ MỖI CHIỀU LÀM MỘT VIỆC KHÁC NHAU
     1. KIẾN THỨC     đề này thật sự kiểm cái gì
     2. DẠNG BÀI      hỏi dưới hình thức nào ở đúng tầng này
     3. ĐỌC VỊ        dấu hiệu nhận ra dạng này khi gặp trong đề lạ
     4. PHƯƠNG PHÁP   cách tiếp cận tổng thể
     5. BƯỚC GIẢI     quy trình nghĩ từng bước
     6. MẸO XỬ LÝ     chỗ bẫy và cách né
     7. BÍ KÍP        một câu chốt mang đi được

   VÌ SAO PHẢI BIẾN THEO CẢ HAI TRỤC
     Cùng một dạng bài, học viên tầng 1 và tầng 5 cần hai lời khuyên khác
     hẳn nhau: tầng 1 cần chậm và đủ bước, tầng 5 cần nhanh và biết bỏ câu.
     Bảng nào chỉ biến theo dạng bài mà không biến theo tầng thì 25 bản của
     cùng một dạng sẽ giống hệt nhau — đó là khai khống 2.000 bảng trong khi
     thực chất chỉ có 80. Có bài kiểm đếm số bản trùng nội dung.
   ========================================================================== */

export const BODE_CREED = {
  name: 'BỘ 2.000 ĐỀ',
  claim:
    'Mỗi phiếu luyện có một bảng phân tích bảy chiều: kiến thức, dạng bài, đọc vị, phương pháp, bước giải, mẹo xử lý, bí kíp — cộng barem chấm cho từng phần.',
  khongPhai:
    'Đây KHÔNG phải 2.000 đề với 40.000 câu viết tay riêng. Câu cụ thể có đáp án bấm được nằm ở ngân hàng câu hỏi; đề thi mẫu trọn vẹn nằm ở bộ đề thi mẫu. Nói rõ để không ai mua nhầm kỳ vọng.',
  bienTheoTang:
    'Cùng một dạng bài, tầng 1 cần chậm và đủ bước, tầng 5 cần nhanh và biết bỏ câu. Bảng nào không biến theo tầng thì 25 bản của một dạng sẽ giống hệt nhau.',
  demChoDung:
    'Cả 2.000 bảng đều khác nhau, nhưng không phải mọi chiều đều có 2.000 biến thể. Kiến thức và dạng bài biến theo từng cấp — 25 bản khác nhau trong một dạng. Phương pháp, mẹo theo tầng và bí kíp biến theo TẦNG, nên chỉ có 5 biến thể trong một dạng. Nói ra vì con số 2.000 dễ bị hiểu thành 2.000 phương pháp khác nhau, mà đó không phải sự thật — và cũng không nên là sự thật: năm cấp trong cùng một tầng thì đúng là nên làm bài giống nhau.',
  barem:
    'Barem nói rõ TRỪ ĐIỂM Ở ĐÂU, không chỉ nói cho điểm ở đâu. Chỗ người chấm hay châm chước chính là chỗ thành bất công giữa hai học viên.',
};

/* ------------------------- BIẾN ĐỔI THEO TẦNG --------------------------- */
/*
 * Năm tầng, năm cách làm khác nhau với CÙNG một dạng bài. Đây là trục biến
 * thứ hai; trục thứ nhất là dạng bài. Hai trục nhân nhau ra 2.000 bảng.
 */
const TANG = [
  {
    ten: 'KHAI NHĨ',
    phuongPhap:
      'Làm chậm và làm đủ bước, không bỏ bước nào kể cả bước thấy thừa. Ở tầng này tốc độ chưa phải mục tiêu — bỏ bước mới là thứ tạo ra lỗi hoá thạch, và lỗi hoá thạch thì hai năm sau vẫn còn.',
    themBuoc: 'Làm xong đọc lại một lượt và nói to lý do chọn từng câu.',
    meo: [
      'Chưa chắc thì đừng đoán vội — khoanh lại, làm câu khác, quay về sau.',
      'Câu nào mất quá hai phút thì bỏ qua: ở tầng này nó chưa phải câu của mình.',
    ],
    truDiem: 'Chưa trừ điểm trình bày. Chỉ chấm đúng sai nội dung.',
    tuKiem: 'Nói được lý do cho ít nhất bốn trên năm câu. Không nói được là đang đoán.',
  },
  {
    ten: 'DỰNG NỀN',
    phuongPhap:
      'Vẫn đủ bước nhưng bắt đầu bấm giờ. Mục tiêu là làm đúng trong khoảng thời gian đã định, chứ không phải làm đúng bằng mọi giá.',
    themBuoc: 'Ghi lại thời gian từng phần để biết phần nào đang ăn giờ.',
    meo: [
      'Phần KHỞI và MẪU phải xong dưới một nửa thời gian định mức, để dồn giờ cho phần TỰ.',
      'Sai hai câu cùng một điểm kiến thức thì dừng lại đọc lý thuyết, đừng làm tiếp.',
    ],
    truDiem: 'Trừ nửa điểm cho câu đúng nội dung nhưng sai chính tả cơ bản.',
    tuKiem: 'Nói được lý do cho toàn bộ các câu đã làm, và chỉ ra được câu nào mình đoán.',
  },
  {
    ten: 'BẬT TIẾNG',
    phuongPhap:
      'Rút bớt bước trung gian, giữ lại bước quyết định. Ở tầng này quy trình đã thành phản xạ nên viết ra từng bước làm chậm mình lại.',
    themBuoc: 'Với câu dễ thì làm thẳng, chỉ dựng lại đủ bước ở câu thấy gợn.',
    meo: [
      'Đọc câu hỏi trước khi đọc ngữ liệu — đây là kỹ thuật rẻ nhất và cho điểm nhanh nhất.',
      'Gặp dây nhiễu đúng ngữ pháp nhưng lệch nghĩa thì đó là bẫy dựng sẵn, không phải trùng hợp.',
    ],
    truDiem: 'Trừ điểm cả nội dung lẫn chính tả. Bắt đầu chấm cả tính nhất quán.',
    tuKiem: 'Chỉ ra được ba câu dễ sai nhất trong phiếu và nói vì sao chúng dễ sai.',
  },
  {
    ten: 'HỌC THUẬT',
    phuongPhap:
      'Phân bổ thời gian trước khi làm. Quét toàn phiếu ba mươi giây, chấm câu nào làm trước câu nào để sau, rồi mới bắt đầu.',
    themBuoc: 'Chừa lại năm phút cuối để soát riêng những câu đã đánh dấu ngờ.',
    meo: [
      'Câu dài chưa chắc câu khó. Đọc nhanh cả phiếu để biết chỗ nào đáng dồn giờ.',
      'Một câu bỏ trống rẻ hơn ba câu làm ẩu vì cuống — biết bỏ là một kỹ năng.',
    ],
    truDiem: 'Chấm như đề thi thật: đúng nội dung mà sai dạng thức vẫn mất điểm.',
    tuKiem: 'Ước được điểm của chính mình trước khi xem đáp án, sai lệch dưới mười phần trăm.',
  },
  {
    ten: 'TINH LUYỆN',
    phuongPhap:
      'Làm dưới áp lực giờ thật, chặt hơn định mức mười phần trăm. Ở tầng này việc cần luyện không còn là làm đúng, mà là làm đúng khi mệt và khi thiếu giờ.',
    themBuoc: 'Sau khi chấm, viết lại một câu sai thành lời giải cho người khác đọc.',
    meo: [
      'Chốt đáp án rồi thì không đổi, trừ khi tìm ra bằng chứng mới — đổi theo cảm giác thường sai.',
      'Soát theo nhóm lỗi của chính mình, không soát tuần tự từ câu một.',
    ],
    truDiem: 'Chấm nghiêm nhất: mọi lỗi đều trừ, không châm chước lỗi nhỏ.',
    tuKiem: 'Giải thích được cho một bạn tầng dưới hiểu, chỉ bằng lời, không nhìn phiếu.',
  },
];

/* ---------------------------- ĐỌC VỊ THEO KỸ NĂNG ------------------------ */
/*
 * Đọc vị là dấu hiệu nhận ra dạng bài khi gặp trong một đề CHƯA TỪNG THẤY.
 * Nó gắn với kỹ năng chứ không gắn với từng dạng, vì cách một đề lộ ra nó
 * đang hỏi gì thì giống nhau trong cùng một kỹ năng.
 */
const DOC_VI: Record<string, string[]> = {
  listening: [
    'Câu hỏi có số, tên riêng, hoặc đơn vị đo — đề đang hỏi CHI TIẾT, phải bắt đúng chỗ đó.',
    'Câu hỏi hỏi "chủ yếu về", "mục đích chính" — đề hỏi Ý CHÍNH, nghe chi tiết là lạc.',
    'Hai lựa chọn khác nhau đúng một từ — chỗ đó chính là chỗ đề bẫy bằng âm gần giống.',
  ],
  speaking: [
    'Đề cho tình huống chứ không cho câu hỏi — đang kiểm phản xạ, không kiểm kiến thức.',
    'Có giới hạn thời gian nói — đang kiểm độ trôi chảy, ngập ngừng mất điểm nặng hơn sai ngữ pháp.',
    'Yêu cầu "nêu ý kiến và giải thích" — thiếu phần giải thích là mất một nửa điểm.',
  ],
  reading: [
    'Câu hỏi có "the word ... refers to" — đang hỏi tham chiếu đại từ, đáp án nằm ngay trước đó.',
    'Câu hỏi có "NOT" hoặc "EXCEPT" viết hoa — ba đáp án đúng và một sai, đọc ngược lại.',
    'Câu hỏi hỏi thái độ tác giả — tìm tính từ mang sắc thái, đừng tìm sự kiện.',
  ],
  writing: [
    'Đề cho sẵn từ gợi ý trong ngoặc — bắt buộc dùng, không dùng là không tính điểm dù câu đúng.',
    'Đề nói "giữ nguyên nghĩa" — mất một sắc thái là mất điểm, dù ngữ pháp hoàn hảo.',
    'Đề giới hạn số từ — vượt quá bị trừ, viết thiếu cũng bị trừ.',
  ],
  vocabulary: [
    'Bốn lựa chọn cùng loại từ — đề đang hỏi NGHĨA, không hỏi dạng từ.',
    'Bốn lựa chọn cùng gốc khác đuôi — đề đang hỏi DẠNG TỪ, xét chức năng trong câu.',
    'Chỗ trống đứng ngay sau động từ hoặc tính từ quen — đề đang hỏi CỤM cố định.',
  ],
  grammar: [
    'Có mốc thời gian trong câu — đề đang hỏi THÌ, mốc đó là chìa khoá.',
    'Có dấu phẩy trước chỗ trống — nhiều khả năng là mệnh đề quan hệ không xác định.',
    'Câu bắt đầu bằng trạng từ phủ định — đang hỏi ĐẢO NGỮ, không phải trật tự thường.',
  ],
  pronunciation: [
    'Bốn từ cùng số âm tiết — đề đang hỏi TRỌNG ÂM.',
    'Bốn từ khác nhau ở một chữ cái — đề đang hỏi CÁCH PHÁT ÂM của chữ đó.',
    'Có từ mang hậu tố -ic, -ity, -ion — hậu tố quyết định, không cần nhớ từng từ.',
  ],
  mindset: [
    'Câu hỏi về thói quen chứ về kiến thức — đang kiểm quy trình, không kiểm trí nhớ.',
    'Đề hỏi "làm gì tiếp theo" — đang kiểm khả năng tự điều chỉnh sau khi sai.',
    'Không có đáp án đúng duy nhất — chấm theo lập luận, nên phải nói ra được lý do.',
  ],
};

/* ------------------------------ SINH BỘ ĐỀ ------------------------------ */

const baremPhan = (tangNo: number, tongCau: number): BaremPhan[] =>
  KHUNG.map((k) => {
    const soCau = k.soCau;
    const diem = Number(((k.trong / 100) * 10).toFixed(2));
    return {
      ma: k.ma,
      ten: k.ten,
      soCau,
      trong: k.trong,
      cachCham: `${soCau} câu, mỗi câu ${(diem / soCau).toFixed(2)} điểm, tổng ${diem} điểm trên thang 10.`,
      barem:
        k.ma === 'CHUOI'
          ? `Chấm theo cả chuỗi: đứt một mắt là mất điểm cả chuỗi. Phần này không cộng dồn từng câu vì cái nó đo là nối được hay không.`
          : `Đúng trọn câu mới tính điểm câu đó. Không cho điểm một phần, trừ khi đề ghi rõ chấm theo số từ đúng.`,
      truDiem: TANG[tangNo - 1].truDiem,
    };
  });

let cache: BoDe[] | null = null;

/** Sinh bộ 2.000 đề. Hàm thuần, kết quả được nhớ lại. */
export function boDe(): BoDe[] {
  if (cache) return cache;
  const phieu = phieuLuyen();
  const ra: BoDe[] = [];

  for (const p of phieu) {
    const d = DANG_BAI.find((x) => x.id === p.dangId);
    const g = GIAI_BY_DANG[p.dangId];
    const lv = LEVELS.find((x) => x.id === p.levelId);
    if (!d || !g || !lv) throw new Error(`Bộ đề thiếu neo cho phiếu ${p.id}`);
    const t = TANG[p.tier - 1];
    const dv = DOC_VI[d.skill];
    if (!t || !dv) throw new Error(`Bộ đề thiếu tầng hoặc đọc vị cho ${p.id}`);

    ra.push({
      id: `bd-${p.dangId.slice(2)}-${p.levelId}`,
      phieuId: p.id,
      no: ra.length + 1,
      dangId: p.dangId,
      dangTen: p.dangTen,
      skill: p.skill,
      levelId: p.levelId,
      tenCap: lv.name,
      tier: p.tier,
      ten: `${p.dangTen} — cấp ${lv.name}`,

      /* 1. KIẾN THỨC — của dạng bài, nói rõ đang ở tầng nào. */
      kienThuc: g.diemKienThuc.map(
        (k) => `${k} — ở tầng ${t.ten} thì phần này được hỏi ở mức ${lv.name.toLowerCase()}.`,
      ),

      /* 2. DẠNG BÀI. */
      dangBai: `${p.mucTieu} Đề ra dưới dạng ${p.tongCau} câu chia năm phần theo khung KHỞI · MẪU · DẪN · TỰ · CHUỖI, làm trong ${p.tongPhut} phút. Học liệu: ${p.hocLieu}`,

      /* 3. ĐỌC VỊ — dấu hiệu của kỹ năng, cộng dấu hiệu riêng của dạng. */
      docVi: [
        ...dv,
        `Riêng dạng này: ${g.bay[0].chon.toLowerCase()} là dấu hiệu em đang đọc sai đề.`,
      ],

      /* 4. PHƯƠNG PHÁP — biến theo tầng. */
      phuongPhap: t.phuongPhap,

      /* 5. BƯỚC GIẢI — quy trình của dạng, cộng một bước riêng của tầng. */
      buocGiai: [...g.cachNghi, t.themBuoc],

      /* 6. MẸO XỬ LÝ — ba bẫy của dạng, cộng hai mẹo của tầng. */
      meoXuLy: [
        ...g.bay.map((b) => `${b.chon} — ${b.saiODau}`),
        ...t.meo,
      ],

      /* 7. BÍ KÍP — một câu chốt mang đi được. */
      biKip: `${g.tuKiemDapAn} Ở tầng ${t.ten}: ${t.tuKiem}`,

      barem: baremPhan(p.tier, p.tongCau),
      tongDiem: 10,
      nguongDat: NGUONG_DAT,
      tuKiem: t.tuKiem,
      neuSai: g.neuSai,
    });
  }
  cache = ra;
  return ra;
}

export const deTheoPhieu = (phieuId: string): BoDe | undefined =>
  boDe().find((b) => b.phieuId === phieuId);

export const deTheoDang = (dangId: string): BoDe[] =>
  boDe().filter((b) => b.dangId === dangId).sort((a, b) => a.tier - b.tier);

/* --------------------------- KHO BÍ KÍP --------------------------------- */
/*
 * Bí kíp gom lại theo dạng bài chứ không theo từng đề: 25 bản của cùng một
 * dạng chia chung một chuẩn tự kiểm, chỉ khác phần đuôi theo tầng. Gom lại
 * thì kho bí kíp có đúng 80 mục đọc hết được, thay vì 2.000 mục không ai đọc.
 */
export const KHO_BI_KIP = DANG_BAI.map((d) => {
  const g = GIAI_BY_DANG[d.id];
  return {
    dangId: d.id,
    dangTen: d.ten,
    skill: d.skill,
    chuanTuKiem: g.tuKiemDapAn,
    khiSai: g.neuSai,
    docVi: DOC_VI[d.skill],
    baBay: g.bay.map((b) => b.chon),
  };
});

export const BODE_SO = {
  soDe: boDe().length,
  soDangBai: DANG_BAI.length,
  soCap: LEVELS.length,
  soChieuPhanTich: 7,
  soBiKip: KHO_BI_KIP.length,
  soBaremPhan: boDe().length * KHUNG.length,
  soBuocGiai: boDe().reduce((s, b) => s + b.buocGiai.length, 0),
  soMeo: boDe().reduce((s, b) => s + b.meoXuLy.length, 0),
  soDocVi: boDe().reduce((s, b) => s + b.docVi.length, 0),
};
