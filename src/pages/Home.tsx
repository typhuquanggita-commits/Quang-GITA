import React from 'react';
import { Link } from '@/lib/router';
import { useAuth } from '@/lib/auth';
import { Card, Stat, M } from '@/components/ui';
import { ALL_TOPICS, GRADES, getRoadmap } from '@/content';
import { ALL_TEMPLATES } from '@/bank';

const PILLARS = [
  { icon: '📘', t: 'Lý thuyết chuẩn hoá', d: 'Bám sát Chương trình GDPT 2018, viết lại theo ngôn ngữ học sinh hiểu ngay từ lần đọc đầu tiên.' },
  { icon: '🧭', t: 'Sơ đồ đọc vị bài', d: 'Bảng “dấu hiệu trong đề → hành động giải” giúp em biết phải làm gì ngay khi vừa đọc xong đề.' },
  { icon: '🗺', t: 'Sơ đồ tư duy tổng hợp', d: 'Hệ thống hoá kiến thức theo chuyên đề và theo học kỳ, ôn lại cả chương trong 10 phút.' },
  { icon: '🎯', t: 'Dạng bài & phương pháp', d: 'Mỗi dạng có phương pháp theo bước, lỗi sai thường gặp và ví dụ mẫu có phân tích tư duy.' },
  { icon: '📝', t: 'Luyện trực tiếp — chấm ngay', d: 'Làm bài trên web, chấm điểm tự động theo chuẩn Bộ GD&ĐT, xem lời giải chi tiết ngay sau khi nộp.' },
  { icon: '📊', t: 'Đánh giá & định hướng', d: 'Hệ thống chỉ rõ hổng ở dạng nào, vì sao sai và kê “đơn luyện tập” theo thứ tự ưu tiên.' },
  { icon: '🏆', t: 'Cẩm nang điểm 10 & HSG', d: 'Bộ công thức trọng tâm kèm bẫy, chuyên đề bồi dưỡng học sinh giỏi với kỹ thuật lõi.' },
  { icon: '🏠', t: 'Nhiệm vụ về nhà', d: 'Giáo viên giao bài, học sinh làm và nộp, phụ huynh xem báo cáo tiến bộ theo tuần.' },
];

export const Home: React.FC = () => {
  const { user } = useAuth();
  const grade = user?.grade ?? 6;
  const rm = getRoadmap(grade);

  return (
    <div className="wrap page">
      <section className="hero">
        <span className="ribbon">Hệ thống luyện Toán THCS của GITA</span>
        <h1 className="mt3" style={{ maxWidth: 760 }}>Học Toán hiểu tận gốc — mục tiêu <span style={{ color: 'var(--gita-gold-500)' }}>9+ điểm</span> cho khối 6 · 7 · 8 · 9</h1>
        <p style={{ maxWidth: 700, fontSize: 'var(--fs-lg)' }}>
          MATHGITA chuẩn hoá toàn bộ giáo án GITA thành một hệ thống học liệu trực tuyến: lý thuyết —
          sơ đồ đọc vị bài — dạng bài — kỹ năng luyện — vận dụng cao — bộ 100 đề mỗi khối,
          làm bài và chấm điểm ngay trên web, kèm phân tích chất lượng và lộ trình cải thiện cá nhân hoá.
        </p>
        <div className="btn-group mt6">
          <Link to="/chuyen-de" className="btn btn-accent btn-lg">Bắt đầu học ngay</Link>
          <Link to="/lo-trinh" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.14)', borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}>
            Xem lộ trình lớp {grade}
          </Link>
          {!user && <Link to="/dang-nhap" className="btn btn-lg" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,.4)', color: '#fff' }}>Đăng nhập</Link>}
        </div>
      </section>

      <div className="grid g4 mt6">
        <Stat k="Chuyên đề" v={ALL_TOPICS.length} sub="Khối 6 → 9, bám sát GDPT 2018" />
        <Stat k="Đề luyện thi" v="400+" sub="100 đề mỗi khối, mỗi mã đề một bộ câu hỏi riêng" tone="gold" />
        <Stat k="Khuôn câu hỏi" v={`${ALL_TEMPLATES.length}+`} sub="Sinh biến thể vô hạn, đều có lời giải từng bước" />
        <Stat k="Mục tiêu đầu ra" v="9+" sub="Điểm kiểm tra định kỳ và thi tuyển sinh" tone="ok" />
      </div>

      <section className="mt8">
        <div className="section-head">
          <h2>Hệ thống học liệu 8 lớp</h2>
          <span className="muted small">Chuẩn biên soạn thống nhất cho mọi chuyên đề</span>
        </div>
        <div className="grid g4">
          {PILLARS.map((p) => (
            <Card key={p.t} className="card-hover">
              <div style={{ fontSize: 26, marginBottom: 8 }}>{p.icon}</div>
              <div className="card-title" style={{ fontSize: 'var(--fs-md)' }}>{p.t}</div>
              <p className="muted small mb0">{p.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt8">
        <div className="section-head">
          <h2>Chọn khối lớp của em</h2>
          <Link to="/chuyen-de" className="btn btn-outline btn-sm">Xem toàn bộ chuyên đề →</Link>
        </div>
        <div className="grid g4">
          {GRADES.map((g) => {
            const ts = ALL_TOPICS.filter((t) => t.grade === g);
            const r = getRoadmap(g);
            return (
              <Link key={g} to={`/chuyen-de?khoi=${g}`} className="card card-hover rule-top" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="between">
                  <h3 style={{ margin: 0 }}>Toán {g}</h3>
                  <span className="badge badge-brand">{ts.length} chuyên đề</span>
                </div>
                <p className="muted small mt2">{r.headline}</p>
                <div className="faint">🎯 {r.target}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt8">
        <Card className="rule-top">
          <div className="section-head">
            <h3 style={{ margin: 0 }}>Lộ trình 3 giai đoạn của GITA — lớp {grade}</h3>
            <Link to="/lo-trinh" className="btn btn-sm btn-outline">Chi tiết từng mốc →</Link>
          </div>
          <p className="muted">{rm.headline}</p>
          <div className="grid g3 mt4">
            {[
              { t: 'Giai đoạn 1 · Nền tảng', d: 'Vá lỗ hổng, nắm chắc lý thuyết và dạng bài mức Nhận biết – Thông hiểu. Ngưỡng chuyển mốc: 8,0.' },
              { t: 'Giai đoạn 2 · Chuyên đề nâng cao', d: 'Làm chủ Vận dụng và Vận dụng cao theo từng chuyên đề, học kỹ thuật và sơ đồ đọc vị. Ngưỡng: 8,5.' },
              { t: 'Giai đoạn 3 · Luyện đề & Tổng ôn', d: 'Bấm giờ với bộ 100 đề, rèn chiến thuật phòng thi, chốt mục tiêu 9+.' },
            ].map((s, i) => (
              <div key={i} className="mm-branch">
                <h5>{s.t}</h5>
                <p className="muted small mb0">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt4 faint"><M t={`Nhịp học khuyến nghị: ${rm.weeklyLoad}`} /></div>
        </Card>
      </section>

      <section className="mt8">
        <Card style={{ background: 'linear-gradient(120deg, var(--gita-navy-050), var(--gita-gold-100))' }}>
          <div className="between">
            <div>
              <h3>Học sinh đang học tại GITA được mở toàn bộ học liệu</h3>
              <p className="muted mb0" style={{ maxWidth: 620 }}>
                Bao gồm bài Vận dụng cao, bộ 100 đề mỗi khối, đề cương giữa kỳ – cuối kỳ – cả năm – ôn hè,
                chuyên đề học sinh giỏi, cẩm nang công thức điểm 10, nhiệm vụ về nhà và báo cáo tiến bộ hằng tuần.
              </p>
            </div>
            <Link to="/bang-gia" className="btn btn-primary btn-lg nowrap">Tìm hiểu gói học</Link>
          </div>
        </Card>
      </section>
    </div>
  );
};
