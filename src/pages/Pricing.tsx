import React from 'react';
import { Link } from '@/lib/router';
import { Card, Note } from '@/components/ui';

const PLANS = [
  {
    name: 'Học thử', price: 'Miễn phí', tone: '',
    desc: 'Dành cho học sinh ngoài muốn trải nghiệm phương pháp GITA.',
    items: [
      'Toàn bộ Lý thuyết các chuyên đề',
      'Sơ đồ đọc vị bài & Sơ đồ tư duy',
      'Dạng bài mức Nhận biết – Thông hiểu',
      '3 đề luyện thi mỗi khối',
      'Chấm điểm tự động + lời giải chi tiết',
    ],
    excl: ['Bài Vận dụng – Vận dụng cao', 'Đề cương & đề HSG', 'Nhiệm vụ về nhà', 'Báo cáo tiến bộ'],
  },
  {
    name: 'GITA Chính khoá', price: 'Theo lớp học tại trung tâm', tone: 'gold', badge: 'Phổ biến nhất',
    desc: 'Dành cho học sinh đang theo học tại GITA — mở toàn bộ học liệu.',
    items: [
      'Tất cả quyền lợi gói Học thử',
      'Toàn bộ dạng bài Vận dụng & Vận dụng cao',
      'Bộ 100 đề luyện thi mỗi khối',
      'Đề cương giữa kỳ – cuối kỳ – cả năm – ôn hè',
      'Cẩm nang công thức điểm 10 đầy đủ',
      'Chuyên đề & đề thi Học sinh giỏi',
      'Nhiệm vụ về nhà từ thầy cô',
      'Báo cáo tiến bộ gửi phụ huynh hằng tuần',
    ],
    excl: [],
  },
  {
    name: 'Chuyên · CLC · HSG', price: 'Lớp chọn tại GITA', tone: 'violet',
    desc: 'Dành cho học sinh mục tiêu trường chuyên, lớp chất lượng cao và đội tuyển HSG.',
    items: [
      'Tất cả quyền lợi gói Chính khoá',
      'Bộ đề Chuyên · CLC (10 đề nâng cao mỗi khối)',
      'Kỹ thuật lõi bồi dưỡng HSG theo từng khối',
      'Đề HSG vòng trường và vòng huyện/quận',
      'Kèm cặp trực tiếp theo báo cáo năng lực cá nhân',
    ],
    excl: [],
  },
];

export const Pricing: React.FC = () => (
  <div className="wrap page">
    <div className="tc mb8">
      <span className="ribbon">Gói học liệu MATHGITA</span>
      <h1 className="mt3">Chọn gói phù hợp với mục tiêu của em</h1>
      <p className="muted" style={{ maxWidth: 620, margin: '0 auto' }}>
        Học liệu MATHGITA là phần trực tuyến đi kèm chương trình học tại GITA. Học sinh đang theo học tại trung tâm
        được kích hoạt tài khoản đầy đủ; học sinh ngoài có thể học thử phần Nền tảng miễn phí.
      </p>
    </div>

    <div className="grid g3">
      {PLANS.map((p) => (
        <Card key={p.name} className="rule-top" style={p.tone === 'gold' ? { borderTopColor: 'var(--gita-gold-600)', boxShadow: 'var(--sh-3)' } : p.tone === 'violet' ? { borderTopColor: 'var(--gita-violet-600)' } : undefined}>
          {p.badge && <span className="ribbon mb3">{p.badge}</span>}
          <h3 style={{ marginTop: p.badge ? 8 : 0 }}>{p.name}</h3>
          <div className="bold" style={{ fontSize: 'var(--fs-xl)', color: 'var(--brand)' }}>{p.price}</div>
          <p className="muted small">{p.desc}</p>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {p.items.map((i) => <li key={i} style={{ display: 'flex', gap: 8 }}><span style={{ color: 'var(--ok)' }}>✓</span><span className="small">{i}</span></li>)}
            {p.excl.map((i) => <li key={i} style={{ display: 'flex', gap: 8, opacity: .55 }}><span>—</span><span className="small">{i}</span></li>)}
          </ul>
          <Link to="/dang-nhap" className="btn btn-primary btn-block mt4">{p.price === 'Miễn phí' ? 'Đăng ký học thử' : 'Liên hệ trung tâm GITA'}</Link>
        </Card>
      ))}
    </div>

    <Note title="🔐 Cách kích hoạt gói GITA" tone="gold">
      <ol className="mb0">
        <li>Học sinh đăng ký tài khoản bằng email trên hệ thống.</li>
        <li>Báo email đã đăng ký cho giáo viên chủ nhiệm lớp tại GITA.</li>
        <li>Quản trị viên kích hoạt gói trong trang Quản trị; tài khoản mở toàn bộ học liệu ngay lập tức.</li>
      </ol>
    </Note>
  </div>
);
