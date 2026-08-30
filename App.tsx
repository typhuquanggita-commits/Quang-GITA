/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState, lazy, Suspense} from 'react';
import {NORTH_STAR, TAB_TUYEN, TUYEN, docVai, luuVai, tabDuocXem, phamViVai, BAC_QUYEN, VAI_MAC_DINH, docVaiTuKet, luuVaiVaoKet, laBanMayTinh,
  TRANG_THEO_TAB, duongDanCuaTab, tabCuaDuongDan, duLieuCoCauTruc, anhOg, GOC} from './data';
import type {TuyenId} from './types';
const Charter = lazy(() => import('./components/engwin/Charter').then((m) => ({default: m.Charter})));
const MyPlan = lazy(() => import('./components/engwin/MyPlan').then((m) => ({default: m.MyPlan})));
const Overview = lazy(() => import('./components/engwin/Overview').then((m) => ({default: m.Overview})));
const Roadmap = lazy(() => import('./components/engwin/Roadmap').then((m) => ({default: m.Roadmap})));
const Methods = lazy(() => import('./components/engwin/Methods').then((m) => ({default: m.Methods})));
const Drills = lazy(() => import('./components/engwin/Drills').then((m) => ({default: m.Drills})));
const Lectures = lazy(() => import('./components/engwin/Lectures').then((m) => ({default: m.Lectures})));
const Playbooks = lazy(() => import('./components/engwin/Playbooks').then((m) => ({default: m.Playbooks})));
const Habits = lazy(() => import('./components/engwin/Habits').then((m) => ({default: m.Habits})));
const Mindset = lazy(() => import('./components/engwin/Mindset').then((m) => ({default: m.Mindset})));
const Clubs = lazy(() => import('./components/engwin/Clubs').then((m) => ({default: m.Clubs})));
const Resources = lazy(() => import('./components/engwin/Resources').then((m) => ({default: m.Resources})));
const Academy = lazy(() => import('./components/engwin/Academy').then((m) => ({default: m.Academy})));
const Levels = lazy(() => import('./components/engwin/Levels').then((m) => ({default: m.Levels})));
const Grading = lazy(() => import('./components/engwin/Grading').then((m) => ({default: m.Grading})));
const Studio = lazy(() => import('./components/engwin/Studio').then((m) => ({default: m.Studio})));
const Podcast = lazy(() => import('./components/engwin/Podcast').then((m) => ({default: m.Podcast})));
const Brand = lazy(() => import('./components/engwin/Brand').then((m) => ({default: m.Brand})));
const Sprint = lazy(() => import('./components/engwin/Sprint').then((m) => ({default: m.Sprint})));
const Chuyen = lazy(() => import('./components/engwin/Chuyen').then((m) => ({default: m.Chuyen})));
const Gita = lazy(() => import('./components/engwin/Gita').then((m) => ({default: m.Gita})));
const Assistant = lazy(() => import('./components/engwin/Assistant').then((m) => ({default: m.Assistant})));
const Training = lazy(() => import('./components/engwin/Training').then((m) => ({default: m.Training})));
const Assess = lazy(() => import('./components/engwin/Assess').then((m) => ({default: m.Assess})));
const Dossier = lazy(() => import('./components/engwin/Dossier').then((m) => ({default: m.Dossier})));
import {Lock} from './components/engwin/Lock';
const Casting = lazy(() => import('./components/engwin/Casting').then((m) => ({default: m.Casting})));
const Exams = lazy(() => import('./components/engwin/Exams').then((m) => ({default: m.Exams})));
const Certify = lazy(() => import('./components/engwin/Certify').then((m) => ({default: m.Certify})));
const Tuyen = lazy(() => import('./components/engwin/Tuyen').then((m) => ({default: m.Tuyen})));
const TimKiem = lazy(() => import('./components/engwin/TimKiem').then((m) => ({default: m.TimKiem})));
const Phieu = lazy(() => import('./components/engwin/Phieu').then((m) => ({default: m.Phieu})));
const GiangSau = lazy(() => import('./components/engwin/GiangSau').then((m) => ({default: m.GiangSau})));
const Quyen = lazy(() => import('./components/engwin/Quyen').then((m) => ({default: m.Quyen})));
const ChuGita = lazy(() => import('./components/engwin/ChuGita').then((m) => ({default: m.ChuGita})));
const Chuan = lazy(() => import('./components/engwin/Chuan').then((m) => ({default: m.Chuan})));
const ChuyenDe = lazy(() => import('./components/engwin/ChuyenDe').then((m) => ({default: m.ChuyenDe})));
const HoSo = lazy(() => import('./components/engwin/HoSo').then((m) => ({default: m.HoSo})));
const LamBai = lazy(() => import('./components/engwin/LamBai').then((m) => ({default: m.LamBai})));
const BoDe = lazy(() => import('./components/engwin/BoDe').then((m) => ({default: m.BoDe})));
const DeThi = lazy(() => import('./components/engwin/DeThi').then((m) => ({default: m.DeThi})));

/** Bối cảnh truyền xuống tab. Hầu hết tab không cần, nên chúng bỏ qua tham số. */
interface NavCtx {
  tuyen: LocTuyen;
  setTuyen: (t: LocTuyen) => void;
}

interface Nav {
  id: string;
  icon: string;
  label: string;
  hint: string;
  group: 'learner' | 'academy';
  render: (ctx: NavCtx) => React.ReactNode;
}

/* Thứ tự các thang trong bảng đổi vai: học trước, dạy sau, vận hành cuối. */
const THANG_VAI = [
  'học viên', 'giảng dạy', 'gia đình', 'kinh doanh', 'sản phẩm', 'điều hành', 'vận hành',
] as const;

const GROUP_LABEL: Record<string, string> = {
  learner: 'Dành cho học viên',
  academy: 'Vận hành học viện',
};

/** 'ca-hai' nghĩa là không lọc: hiện đủ cả hai tuyến. */
type LocTuyen = TuyenId | 'ca-hai';

const LOC: {id: LocTuyen; label: string}[] = [
  {id: 'ca-hai', label: 'Cả hai'},
  ...TUYEN.map((t) => ({id: t.id as LocTuyen, label: t.id === 'ielts' ? 'IELTS 8.0' : 'Chuyên Anh'})),
];

const NAV: Nav[] = [
  {
    id: 'tuyen',
    icon: '🔀',
    label: 'Hai tuyến',
    hint: 'Tách lộ trình · phần tinh tuý',
    group: 'learner',
    render: (c) => <Tuyen tuyen={c.tuyen} onTuyen={c.setTuyen} />,
  },
  {
    id: 'chugita',
    icon: '🧭',
    label: 'Bốn chữ GITA',
    hint: '4 chữ · 31 thành tố · 36 ô ba sân',
    group: 'learner',
    render: () => <ChuGita />,
  },
  {
    id: 'gita',
    icon: '🧬',
    label: 'Mô thức GITA',
    hint: '12 bước · 300 bài định hướng',
    group: 'learner',
    render: () => <Gita />,
  },
  {
    id: 'charter',
    icon: '🧿',
    label: 'La Bàn',
    hint: 'Hiến chương cá nhân',
    group: 'learner',
    render: () => <Charter />,
  },
  {
    id: 'myplan',
    icon: '🎯',
    label: 'Kế hoạch của tôi',
    hint: 'Cá nhân hoá — 13 câu',
    group: 'learner',
    render: () => <MyPlan />,
  },
  {
    id: 'sprint',
    icon: '⚡',
    label: 'Chu kỳ 21·90',
    hint: 'Lớp tăng tốc · 6 khối/ngày',
    group: 'learner',
    render: () => <Sprint />,
  },
  {
    id: 'dossier',
    icon: '📔',
    label: 'Hồ sơ 365 ngày',
    hint: '365 ngày viết sẵn',
    group: 'learner',
    render: () => <Dossier />,
  },
  {
    id: 'assistant',
    icon: '🤖',
    label: 'Trợ lý AI',
    hint: 'Hôm nay làm gì · 6 bước · 3 gói',
    group: 'learner',
    render: () => <Assistant />,
  },
  {
    id: 'assess',
    icon: '📊',
    label: 'Đánh giá định kỳ',
    hint: '4 bộ đề · kho 1.000 đơn',
    group: 'learner',
    render: () => <Assess />,
  },
  {
    id: 'overview',
    icon: '◎',
    label: 'Tổng quan',
    hint: 'Hiến chương & quỹ đạo',
    group: 'learner',
    render: () => <Overview />,
  },
  {
    id: 'roadmap',
    icon: '⛰',
    label: 'Lộ trình',
    hint: '12 cột mốc / 36 tháng',
    group: 'learner',
    render: () => <Roadmap />,
  },
  {
    id: 'chuyen',
    icon: '🎯',
    label: 'Luyện thi chuyên Anh',
    hint: 'Vào 10 CLC & chuyên · 22 tháng',
    group: 'learner',
    render: () => <Chuyen />,
  },
  {
    id: 'exams',
    icon: '📋',
    label: 'Thi tốt nghiệp',
    hint: '9 bài · đo bằng số',
    group: 'learner',
    render: () => <Exams />,
  },
  {
    id: 'methods',
    icon: '🧪',
    label: 'Phương pháp',
    hint: '28 phương pháp thế giới',
    group: 'learner',
    render: () => <Methods />,
  },
  {
    id: 'drills',
    icon: '🏋',
    label: 'Luyện tập',
    hint: '31 bài luyện chuẩn hoá',
    group: 'learner',
    render: () => <Drills />,
  },
  {
    id: 'lectures',
    icon: '🎬',
    label: 'Bài giảng',
    hint: '10 chuỗi · 268 bài',
    group: 'learner',
    render: () => <Lectures />,
  },
  {
    id: 'phieu',
    icon: '🧾',
    label: 'Phiếu luyện',
    hint: '2.000 phiếu · 2.000 nhiệm vụ',
    group: 'learner',
    render: () => <Phieu />,
  },
  {
    id: 'chuyende',
    icon: '🗂️',
    label: 'Bộ phiếu chuyên đề',
    hint: '80 chuyên đề · 7 loại · 1.120 phiếu',
    group: 'learner',
    render: () => <ChuyenDe />,
  },
  {
    id: 'bode',
    icon: '📑',
    label: 'Bộ 2.000 đề',
    hint: '7 chiều · 10.000 barem',
    group: 'learner',
    render: () => <BoDe />,
  },
  {
    id: 'dethi',
    icon: '📄',
    label: 'Đề thi mẫu',
    hint: '4 đề trọn vẹn · 58 lời giải',
    group: 'learner',
    render: () => <DeThi />,
  },
  {
    id: 'lambai',
    icon: '✍️',
    label: 'Làm bài · xem đáp án',
    hint: '600 câu · 2.400 nhận xét',
    group: 'learner',
    render: () => <LamBai />,
  },
  {
    id: 'hoso',
    icon: '🗃️',
    label: 'Hồ sơ của tôi',
    hint: 'Lịch sử · phân tích · lộ trình',
    group: 'learner',
    render: () => <HoSo />,
  },
  {
    id: 'giangsau',
    icon: '📚',
    label: 'Bài giảng chuyên sâu',
    hint: '4 trụ · 2.000 bài',
    group: 'learner',
    render: () => <GiangSau />,
  },
  {
    id: 'playbooks',
    icon: '🗝',
    label: 'Bí kíp',
    hint: '24 chiến thuật',
    group: 'learner',
    render: () => <Playbooks />,
  },
  {
    id: 'habits',
    icon: '⚙',
    label: 'Thói quen',
    hint: '12 thói quen · 6 nghi thức',
    group: 'learner',
    render: () => <Habits />,
  },
  {
    id: 'mindset',
    icon: '🧭',
    label: 'Tư duy',
    hint: '10 mô-đun lập trình',
    group: 'learner',
    render: () => <Mindset />,
  },
  {
    id: 'clubs',
    icon: '🤝',
    label: 'Club',
    hint: '7 CLB · 12 cổng kiểm định',
    group: 'learner',
    render: () => <Clubs />,
  },
  {
    id: 'resources',
    icon: '📚',
    label: 'Tài liệu',
    hint: '45 nguồn đã sàng lọc',
    group: 'learner',
    render: () => <Resources />,
  },
  {
    id: 'chuan',
    icon: '🏅',
    label: 'Chuẩn quốc tế',
    hint: '16 chuẩn · 5 tầng hấp thu',
    group: 'academy',
    render: () => <Chuan />,
  },
  {
    id: 'quyen',
    icon: '🔐',
    label: 'Phân quyền',
    hint: '39 quyền · 18 bậc · 7 thang',
    group: 'academy',
    render: () => <Quyen />,
  },
  {
    id: 'academy',
    icon: '🏛',
    label: 'Học viện',
    hint: 'Triết lý · GITA · NLP · Cố vấn',
    group: 'academy',
    render: () => <Academy />,
  },
  {
    id: 'levels',
    icon: '🏅',
    label: '25 Cấp độ',
    hint: '5 tầng × 5 cấp',
    group: 'academy',
    render: () => <Levels />,
  },
  {
    id: 'grading',
    icon: '📝',
    label: 'Chấm bài',
    hint: '4 phần · 20 phác đồ lỗi',
    group: 'academy',
    render: () => <Grading />,
  },
  {
    id: 'podcast',
    icon: '🎙',
    label: 'Podcast',
    hint: 'Engwin Radio · 6 tập',
    group: 'academy',
    render: () => <Podcast />,
  },
  {
    id: 'certify',
    icon: '🏆',
    label: 'Kiểm định nhân sự',
    hint: '6 vai · 5 bậc · 4 khoá nghề',
    group: 'academy',
    render: () => <Certify />,
  },
  {
    id: 'casting',
    icon: '🎚',
    label: 'Dàn giọng',
    hint: '10 giọng · 2 chuẩn phát âm',
    group: 'academy',
    render: () => <Casting />,
  },
  {
    id: 'brand',
    icon: '◈',
    label: 'Nhận diện',
    hint: '59 ấn phẩm sinh tự động',
    group: 'academy',
    render: () => <Brand />,
  },
  {
    id: 'training',
    icon: '🎓',
    label: 'Đào tạo nâng cao',
    hint: 'Kèm 1–1 · thang coach · xuất sắc',
    group: 'academy',
    render: () => <Training />,
  },
  {
    id: 'studio',
    icon: '🎥',
    label: 'Xưởng học liệu',
    hint: '11 bản thiết kế sản xuất',
    group: 'academy',
    render: () => <Studio />,
  },
];

/**
 * Mỗi tab được tải riêng khi người dùng bấm vào, không tải sẵn cả 23 tab lúc
 * mở app. Khung chờ này chiếm đúng chỗ để trang không nhảy khi mã về.
 */
const DangTai: React.FC = () => (
  <div className="animate-pulse space-y-4" aria-busy="true">
    <div className="h-6 w-48 rounded bg-slate-800" />
    <div className="h-10 w-2/3 rounded bg-slate-800" />
    <div className="h-4 w-full rounded bg-slate-900" />
    <div className="h-4 w-5/6 rounded bg-slate-900" />
  </div>
);

export const App: React.FC = () => {
  /* ==========================================================================
     MỖI THẺ MỘT ĐỊA CHỈ RIÊNG

     Trước phần này, ba mươi chín thẻ nội dung nằm sau đúng MỘT địa chỉ. Máy
     tìm kiếm xếp hạng địa chỉ chứ không xếp hạng thẻ, nên ba mươi tám thẻ
     kia không tồn tại với người đang tìm kiếm — và người dùng cũng không gửi
     được đường dẫn tới đúng chỗ mình muốn chỉ cho bạn.

     Dùng History API chứ không dùng thư viện định tuyến: cả ứng dụng chỉ cần
     đọc một đường dẫn và ghi một đường dẫn, thêm một thư viện cho việc đó là
     bắt mọi người tải thêm mã cho một thứ mười dòng làm xong.

     Trên bản MÁY TÍNH thì không đụng vào địa chỉ. Ở đó trang chạy qua giao
     thức app:// và không có ai tìm kiếm nó; đổi địa chỉ chỉ thêm một đường
     hỏng mà không đổi lại được gì.
     ========================================================================== */
  const dungDiaChi = typeof window !== 'undefined' && !window.engwin;

  // Vào thẳng một đường dẫn thì mở đúng thẻ đó, không bật về thẻ mặc định.
  const [tab, setTab] = useState(
    () => (dungDiaChi ? tabCuaDuongDan(window.location.pathname) : undefined) ?? 'tuyen',
  );
  const [menuOpen, setMenuOpen] = useState(false);
  // Bộ lọc tuyến: 'ca-hai' hiện đủ mục, chọn một tuyến thì ẩn mục không thuộc
  // tuyến đó. Mục vận hành học viện không bị lọc vì không thuộc tuyến nào.
  const [tuyen, setTuyen] = useState<LocTuyen>('ca-hai');
  // Ô tìm kiếm: chỉ dựng khi mở, vì chỉ mục kéo theo cả 365 ngày hồ sơ và 300
  // bài định hướng. Nạp sẵn là bắt mọi người trả giá cho tính năng họ chưa mở.
  const [timMo, setTimMo] = useState(false);
  // Trên web thì không có két, vào thẳng. Trên bản máy tính phải mở khoá trước.
  const [unlocked, setUnlocked] = useState(!window.engwin);
  /*
   * VAI ĐANG DÙNG — phân quyền được BẬT, không phải chỉ mô tả.
   *
   * Thẻ không thuộc quyền của vai thì KHÔNG được dựng: nó không có trong
   * danh sách điều hướng, và cả khi trạng thái tab trỏ vào nó thì màn hình
   * cũng đưa về thẻ mở được chứ không dựng nội dung ra rồi che đi. Dựng rồi
   * che là kiểu chặn giả — nội dung vẫn nằm trong cây DOM.
   *
   * Đây là chặn ở giao diện, không phải bảo mật. Dải thông báo trên đầu
   * màn hình nói đúng điều đó, không giấu.
   */
  const [vai, setVai] = useState(docVai);
  const [moDoiVai, setMoDoiVai] = useState(false);

  /*
   * KÉT TỰ KHOÁ THÌ MÀN HÌNH PHẢI VỀ NGAY MÀN HÌNH MÃ KHOÁ.
   *
   * Tiến trình chính khoá két khi máy khoá màn hình, khi máy ngủ, hoặc khi
   * không ai đụng tới trong mười phút. Nhưng khoá két chỉ bảo vệ tệp trên
   * đĩa — hồ sơ đang hiện ra vẫn nằm nguyên trên màn hình cho tới khi trang
   * chuyển đi. Ở phòng máy dùng chung, đó đúng là chỗ rò rỉ.
   */
  React.useEffect(() => {
    const cau = window.engwin;
    if (!cau?.khiTuKhoa) return;
    return cau.khiTuKhoa(() => setUnlocked(false));
  }, []);

  /*
   * Trên bản máy tính, két là nguồn sự thật của vai. Đọc lại ngay sau khi
   * mở khoá: bộ nhớ trình duyệt có thể đã bị sửa bằng tay, còn két thì phải
   * có mã khoá mới ghi được.
   */
  React.useEffect(() => {
    if (!laBanMayTinh() || !unlocked) return;
    let conSong = true;
    docVaiTuKet().then((v) => {
      if (conSong && v) setVai(luuVai(v));
    });
    return () => {
      conSong = false;
    };
  }, [unlocked]);

  /*
   * ĐỒNG BỘ HAI CHIỀU VỚI ĐỊA CHỈ
   *
   * Đi tới: đổi thẻ thì ghi địa chỉ mới, đổi luôn tiêu đề và mô tả của
   * trang. Tiêu đề là dòng người ta thấy trên kết quả tìm kiếm và trên thẻ
   * trình duyệt; để nguyên một tiêu đề cho cả ba mươi chín trang thì ba mươi
   * chín trang trông như một.
   *
   * Đi lui: bấm nút quay lại của trình duyệt thì về đúng thẻ trước đó. Không
   * xử lý popstate thì nút quay lại đưa người dùng ra khỏi hẳn ứng dụng —
   * đó là chỗ mất người dùng nhiều nhất trong mọi ứng dụng một trang.
   */
  React.useEffect(() => {
    if (!dungDiaChi) return;
    const t = TRANG_THEO_TAB[tab];
    if (!t) return;
    const duong = duongDanCuaTab(tab);
    if (window.location.pathname !== duong) {
      window.history.pushState({tab}, '', duong);
    }
    document.title = `${t.tieuDe} — ENGWIN365`;
    const dat = (ten: string, noiDung: string, theo: 'name' | 'property' = 'name') => {
      let m = document.head.querySelector<HTMLMetaElement>(`meta[${theo}="${ten}"]`);
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute(theo, ten);
        document.head.appendChild(m);
      }
      m.content = noiDung;
    };
    dat('description', t.moTa);
    dat('og:title', t.tieuDe, 'property');
    dat('og:description', t.moTa, 'property');
    dat('og:url', `${GOC}${duong}`, 'property');
    dat('og:type', 'website', 'property');
    dat('og:locale', 'vi_VN', 'property');
    dat('og:site_name', 'ENGWIN365', 'property');
    dat('og:image', anhOg(tab), 'property');
    dat('og:image:width', '1200', 'property');
    dat('og:image:height', '630', 'property');
    dat('og:image:alt', t.tieuDe, 'property');
    dat('twitter:card', 'summary_large_image');
    dat('twitter:title', t.tieuDe);
    dat('twitter:description', t.moTa);
    dat('twitter:image', anhOg(tab));

    /*
     * Thẻ chỉ mở cho vai vận hành thì KHÔNG cho vào chỉ mục.
     *
     * Khách vãng lai vào thẳng địa chỉ đó sẽ bị đưa về thẻ khác. Một kết
     * quả tìm kiếm dẫn tới chỗ người ta không vào được là kết quả hỏng:
     * người dùng bấm vào rồi bấm quay lại ngay, và Google đọc đúng chuỗi
     * đó là trang không đáp ứng truy vấn.
     */
    dat('robots', t.congKhai ? 'index, follow, max-image-preview:large' : 'noindex, follow');

    let can = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!can) {
      can = document.createElement('link');
      can.rel = 'canonical';
      document.head.appendChild(can);
    }
    can.href = `${GOC}${duong}`;

    // Dữ liệu có cấu trúc: thay cả khối, không chồng thêm khối mới mỗi lần
    // đổi thẻ — chồng lên nhau thì máy tìm kiếm đọc được nhiều mô tả mâu
    // thuẫn cho cùng một trang.
    document.head.querySelectorAll('script[data-seo]').forEach((n) => n.remove());
    for (const o of duLieuCoCauTruc(tab)) {
      const sc = document.createElement('script');
      sc.type = 'application/ld+json';
      sc.setAttribute('data-seo', '1');
      sc.textContent = JSON.stringify(o);
      document.head.appendChild(sc);
    }
  }, [tab, dungDiaChi]);

  React.useEffect(() => {
    if (!dungDiaChi) return;
    const lui = () => {
      const t = tabCuaDuongDan(window.location.pathname);
      if (t) setTab(t);
    };
    window.addEventListener('popstate', lui);
    return () => window.removeEventListener('popstate', lui);
  }, [dungDiaChi]);

  // Đổi vai: ghi vào cả hai chỗ. Két là nguồn sự thật, localStorage là bản sao.
  const doiVai = (id: string) => {
    setVai(luuVai(id));
    if (laBanMayTinh()) void luuVaiVaoKet(id);
  };

  // Ctrl+K hoặc ⌘K mở ô tìm. Không bắt phím khi con trỏ đang ở trong một ô
  // nhập liệu khác, để người dùng vẫn gõ được chữ k bình thường.
  React.useEffect(() => {
    const nghe = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTimMo(true);
      }
    };
    window.addEventListener('keydown', nghe);
    return () => window.removeEventListener('keydown', nghe);
  }, []);

  // Hai bộ lọc chồng lên nhau và chúng làm hai việc khác nhau:
  //   quyền  — vai này CÓ ĐƯỢC mở thẻ đó không (bắt buộc, không tắt được)
  //   tuyến  — thẻ đó có thuộc tuyến đang chọn không (tuỳ chọn của người dùng)
  const hopTuyen = (n: Nav) =>
    tuyen === 'ca-hai' || n.group === 'academy' || (TAB_TUYEN[n.id] ?? []).includes(tuyen);
  const hienTab = (n: Nav) => tabDuocXem(vai, n.id) && hopTuyen(n);

  // Đang đứng ở mục vừa bị ẩn thì đưa về mục đầu tiên còn mở, không để màn
  // hình trắng. Không mặc định về 'tuyen' nữa: có vai không mở được nó.
  const conMo = NAV.filter(hienTab);
  const tabHopLe = conMo.some((n) => n.id === tab) ? tab : conMo[0]?.id;
  const active = NAV.find((n) => n.id === tabHopLe);
  const soAn = NAV.filter((n) => n.group === 'learner' && !hienTab(n)).length;
  const pv = phamViVai(vai, NAV.map((n) => n.id));

  if (!unlocked) return <Lock onUnlocked={() => setUnlocked(true)} />;

  /*
   * Vai không mở được thẻ nào thì nói thẳng, không để màn hình trắng.
   *
   * Với bảng quyền hiện tại thì trường hợp này không xảy ra — mọi vai đều
   * có q-xem-lo-trinh. Nhưng nó xảy ra được ngay khi ai đó sửa bảng quyền,
   * và một màn hình trắng thì người dùng không có cách nào tự thoát ra.
   */
  if (!active) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-8">
        <div className="max-w-md rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6">
          <p className="text-sm font-semibold text-amber-100">
            Vai “{pv.bac?.ten ?? vai}” chưa mở được thẻ nào
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
            Vai này đang có {pv.soQuyen} quyền, và không quyền nào trong số đó mở được một thẻ
            nào của hệ thống. Đây là lỗi của bảng phân quyền chứ không phải lỗi của người dùng.
          </p>
          <button
            onClick={() => doiVai(VAI_MAC_DINH)}
            className="mt-4 rounded-lg bg-sky-500 px-4 py-2 text-[13px] font-semibold text-slate-950">
            Về vai mặc định
          </button>
        </div>
      </div>
    );
  }

  /*
   * DẢI VAI — luôn hiện, kể cả khi không ẩn thẻ nào.
   *
   * Nếu chỉ hiện khi có thẻ bị ẩn thì người dùng không bao giờ biết mình
   * đang xem bằng vai nào, và sẽ tưởng phần mềm tự dưng thiếu mục.
   */
  const VaiBar = (
    <div className="mb-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
        Vai đang dùng
      </p>
      <p className="mt-1 text-[12px] font-semibold leading-snug text-slate-100">
        {pv.bac?.ten ?? vai}
      </p>
      <p className="mt-1 text-[11px] leading-snug text-slate-400">
        {pv.soQuyen} quyền · mở {pv.soTabMo}/{NAV.length} thẻ
        {pv.soTabAn > 0 ? ` · ẩn ${pv.soTabAn}` : ''}
      </p>
      <button
        onClick={() => setMoDoiVai(!moDoiVai)}
        aria-expanded={moDoiVai}
        className="mt-2 w-full rounded-lg border border-slate-700 py-1 text-[11px] font-semibold text-slate-200 transition hover:border-sky-500 hover:text-sky-200">
        {moDoiVai ? 'Đóng' : 'Đổi vai'}
      </button>
      {moDoiVai && (
        <div className="mt-2 max-h-72 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/60 p-1.5">
          {THANG_VAI.map((t) => (
            <div key={t} className="mb-1.5">
              <p className="px-1 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                {t}
              </p>
              {BAC_QUYEN.filter((x) => x.thang === t).map((x) => (
                <button
                  key={x.id}
                  data-vai={x.id}
                  onClick={() => {
                    doiVai(x.id);
                    setMoDoiVai(false);
                    setMenuOpen(false);
                  }}
                  className={`block w-full rounded px-1.5 py-1 text-left text-[11px] leading-snug transition ${
                    x.id === vai
                      ? 'bg-sky-500/15 font-semibold text-sky-200'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}>
                  {x.ten}
                </button>
              ))}
            </div>
          ))}
          <p className="border-t border-slate-800 px-1 pt-2 text-[11px] leading-relaxed text-amber-200">
            Đổi vai ở đây là đổi thứ mình NHÌN THẤY, không phải đổi quyền thật.
            Trên bản web ai mở công cụ nhà phát triển cũng làm được việc này.
            Hiệu lực thật cần máy chủ kiểm lại vai ở từng thao tác.
          </p>
        </div>
      )}
    </div>
  );

  /*
   * MỘT MỤC ĐIỀU HƯỚNG LÀ MỘT LIÊN KẾT THẬT, KHÔNG PHẢI MỘT CÁI NÚT.
   *
   * Đây là chỗ có đòn bẩy lớn thứ hai trong cả tầng SEO, sau việc tách địa
   * chỉ. Trước đây điều hướng dựng bằng <button onClick>. Máy tìm kiếm
   * KHÔNG bấm nút — nó chỉ đi theo thẻ <a href>. Nghĩa là 34 trang công
   * khai không có một đường nào dẫn tới nhau: chúng là 34 trang mồ côi,
   * chỉ tìm thấy được qua sitemap, và không trang nào chuyển được chút uy
   * tín nào cho trang nào.
   *
   * Đổi sang <a href> được thêm ba thứ mà người dùng thật sự cần, và cả ba
   * đều KHÔNG có ở cái nút:
   *   · bấm giữa chuột hoặc Ctrl+bấm mở sang thẻ mới — nên phải để trình
   *     duyệt tự xử lý khi có phím bổ trợ, không được chặn
   *   · chuột đặt lên thì hiện địa chỉ ở góc dưới, người dùng biết mình
   *     sắp đi đâu trước khi bấm
   *   · sao chép địa chỉ liên kết
   *
   * Trên bản MÁY TÍNH thì giữ nguyên cái nút: ở đó trang chạy qua app://,
   * không có máy tìm kiếm nào, và một thẻ <a href> chỉ thêm một đường
   * người dùng bấm nhầm ra ngoài ứng dụng.
   */
  const NavMuc: React.FC<{
    n: Nav;
    className: string;
    children: React.ReactNode;
  }> = ({n, className, children}) => {
    const di = () => {
      setTab(n.id);
      setMenuOpen(false);
      window.scrollTo({top: 0});
    };
    if (!dungDiaChi) {
      return (
        <button data-tab={n.id} onClick={di} className={className}>
          {children}
        </button>
      );
    }
    return (
      <a
        data-tab={n.id}
        href={duongDanCuaTab(n.id)}
        aria-current={tabHopLe === n.id ? 'page' : undefined}
        onClick={(e) => {
          // Có phím bổ trợ hoặc không phải chuột trái thì để trình duyệt
          // làm việc của nó: mở thẻ mới, mở cửa sổ mới, tải về.
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
          e.preventDefault();
          di();
        }}
        className={className}>
        {children}
      </a>
    );
  };

  const NavList = (
    <nav className="space-y-1">
      {(['learner', 'academy'] as const).map((g) => (
        <div key={g} className={g === 'academy' ? 'pt-3' : ''}>
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            {GROUP_LABEL[g]}
          </p>
          {NAV.filter((n) => n.group === g && hienTab(n)).map((n) => (
            <NavMuc
              key={n.id}
              n={n}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1 text-left transition ${
                tabHopLe === n.id
                  ? g === 'academy'
                    ? 'bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/30'
                    : 'bg-sky-500/10 text-sky-300 ring-1 ring-inset ring-sky-500/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}>
              <span className="w-4 shrink-0 text-center text-sm">{n.icon}</span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium leading-tight">
                  {n.label}
                </span>
                <span className="block truncate text-[11px] leading-tight text-slate-400">
                  {n.hint}
                </span>
              </span>
            </NavMuc>
          ))}
          {g === 'learner' && soAn > 0 && (
            <p className="px-3 pt-1.5 text-[11px] leading-snug text-slate-400">
              Đang ẩn {soAn} mục không thuộc tuyến đã chọn.
            </p>
          )}
        </div>
      ))}
    </nav>
  );

  const NutTim = (
    <button
      onClick={() => setTimMo(true)}
      className="mb-3 flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-2 text-left text-[12px] text-slate-400 transition hover:border-slate-700 hover:text-slate-200">
      <span aria-hidden="true">⌕</span>
      <span className="flex-1">Tìm trong toàn hệ thống</span>
      <span className="rounded border border-slate-700 px-1.5 py-0.5 text-[10px] font-medium">
        Ctrl K
      </span>
    </button>
  );

  const LocTuyenBar = (
    <div className="mb-4">
      <p className="px-1 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
        Tuyến của tôi
      </p>
      <div className="flex gap-1 rounded-lg bg-slate-900 p-1">
        {LOC.map((l) => (
          <button
            key={l.id}
            onClick={() => setTuyen(l.id)}
            aria-pressed={tuyen === l.id}
            className={`flex-1 rounded-md px-1.5 py-1 text-[11px] font-medium transition ${
              tuyen === l.id
                ? 'bg-slate-700 text-slate-100'
                : 'text-slate-400 hover:text-slate-300'
            }`}>
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 antialiased">
      {timMo && (
        <Suspense fallback={null}>
          <TimKiem
            onDong={() => setTimMo(false)}
            onChon={(t) => {
              // Kết quả có thể nằm ở mục đang bị bộ lọc tuyến ẩn. Nhảy tới đó
              // mà không bỏ lọc thì màn hình lại bật về mục Hai tuyến, và
              // người dùng tưởng ô tìm hỏng. Bỏ lọc là hành vi ít gây bất ngờ
              // nhất: họ đã hỏi đích danh mục này.
              if (!(TAB_TUYEN[t] ?? []).includes(tuyen as TuyenId)) {
                setTuyen('ca-hai');
              }
              setTab(t);
              setTimMo(false);
              setMenuOpen(false);
              window.scrollTo({top: 0});
            }}
          />
        </Suspense>
      )}
      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar — desktop */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-800 p-5 lg:flex">
          <div className="mb-6">
            <p className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-xl font-black tracking-tight text-transparent">
              ENGWIN365
            </p>
            <p className="mt-1 text-[11px] leading-snug text-slate-400">
              {tuyen === 'chuyen'
                ? 'Lớp 8 → đỗ chuyên Anh trong 22 tháng'
                : '0 → IELTS 8.0 trong 1.095 ngày'}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {NutTim}
            {VaiBar}
            {LocTuyenBar}
            {NavList}
          </div>
          {window.engwin && (
            <button
              onClick={async () => {
                await window.engwin!.vault.lock();
                setUnlocked(false);
              }}
              className="mt-3 w-full rounded-lg border border-slate-800 py-1.5 text-[11px] font-medium text-slate-400 transition hover:border-slate-700 hover:text-slate-300">
              🔒 Khoá lại
            </button>
          )}
          <p className="mt-3 hidden border-t border-slate-800 pt-3 text-[11px] leading-relaxed text-slate-400 2xl:block">
            {NORTH_STAR.bigBet}
          </p>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Mobile header */}
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur lg:hidden">
            <p className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-lg font-black tracking-tight text-transparent">
              ENGWIN365
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTimMo(true)}
                aria-label="Tìm trong toàn hệ thống"
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300">
                ⌕
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300">
                {menuOpen ? '✕' : '☰'} {active.label}
              </button>
            </div>
          </header>
          {menuOpen && (
            <div className="border-b border-slate-800 bg-slate-900 p-4 lg:hidden">
              {NutTim}
              {VaiBar}
              {LocTuyenBar}
              {NavList}
            </div>
          )}

          <main className="px-4 py-8 md:px-8 lg:px-10 lg:py-10">
            <Suspense fallback={<DangTai />}>
              {active.render({tuyen, setTuyen})}
            </Suspense>
            <footer className="mt-16 border-t border-slate-800 pt-6 text-xs leading-relaxed text-slate-400">
              <p className="font-semibold text-slate-400">
                ENGWIN365 — {NORTH_STAR.meaning}
              </p>
              <p className="mt-2 max-w-3xl">
                Hệ thống này là một bản thiết kế, không phải một lời hứa. Nó chỉ
                tạo ra kết quả khi được vận hành mỗi ngày. Nếu bạn chỉ đọc nó
                một lần rồi đóng lại, nó không khác gì 100 bài viết “bí quyết
                IELTS” bạn đã đọc trước đây. Hãy bắt đầu ở tab{' '}
                <span className="font-medium text-slate-400">Hai tuyến</span> —
                chọn tuyến của mình rồi đọc phần tinh tuý, vì hai tuyến khác
                nhau ở mười trục và đi nhầm thì mất hàng trăm giờ. Sau đó sang
                tab <span className="font-medium text-slate-400">La Bàn</span>,
                viết cho xong mục 01 và mục 11 bằng câu trả lời thật của bạn, và
                làm đúng buổi học của ngày mai.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};
