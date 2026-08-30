import React from 'react';
import { AppBar } from '@/components/AppBar';
import { match, useRouter } from '@/lib/router';
import { useAuth } from '@/lib/auth';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Topics } from '@/pages/Topics';
import { TopicDetail } from '@/pages/TopicDetail';
import { Exams } from '@/pages/Exams';
import { ExamRunner } from '@/pages/ExamRunner';
import { Result } from '@/pages/Result';
import { Formulas } from '@/pages/Formulas';
import { Hsg } from '@/pages/Hsg';
import { Roadmap } from '@/pages/Roadmap';
import { Dashboard } from '@/pages/Dashboard';
import { Reports } from '@/pages/Reports';
import { Homework } from '@/pages/Homework';
import { Teacher } from '@/pages/Teacher';
import { Admin } from '@/pages/Admin';
import { Pricing } from '@/pages/Pricing';
import { Library } from '@/pages/Library';
import { Practice } from '@/pages/Practice';
import { Notebook } from '@/pages/Notebook';
import { Brand } from '@/pages/Brand';
import { Card } from '@/components/ui';

const Footer: React.FC = () => (
  <footer className="no-print" style={{ background: 'var(--gita-navy-900)', color: 'rgba(255,255,255,.72)', padding: '32px 0', marginTop: 48 }}>
    <div className="wrap">
      <div className="between">
        <div>
          <div className="bold" style={{ color: '#fff', fontSize: 18, letterSpacing: '.4px' }}>MATHGITA</div>
          <div className="small">Hệ thống luyện Toán THCS 6–9 của Trung tâm GITA · Mục tiêu 9+ điểm</div>
        </div>
        <div className="small tr">
          Chuẩn Chương trình GDPT 2018 · Ma trận đề theo Bộ GD&amp;ĐT
          <div className="mt2">
            <a href="#/nhan-dien" style={{ color: 'var(--gita-gold-500)' }}>Bộ chuẩn nhận diện thương hiệu GITA →</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export const App: React.FC = () => {
  const { route } = useRouter();
  const { ready } = useAuth();
  const p = route.path;

  if (!ready) return <div className="wrap page"><Card>Đang khởi tạo hệ thống…</Card></div>;

  let body: React.ReactNode;
  let m: Record<string, string> | null;

  if (p === '/' || p === '') body = <Home />;
  else if (p === '/dang-nhap') body = <Login />;
  else if (p === '/chuyen-de') body = <Topics />;
  else if ((m = match('/chuyen-de/:id', p))) body = <TopicDetail id={m.id} />;
  else if (p === '/bo-de') body = <Exams />;
  else if ((m = match('/lam-bai/:id', p))) body = <ExamRunner examId={m.id} />;
  else if ((m = match('/ket-qua/:id', p))) body = <Result attemptId={m.id} />;
  else if (p === '/cam-nang') body = <Formulas />;
  else if (p === '/hsg') body = <Hsg />;
  else if (p === '/lo-trinh') body = <Roadmap />;
  else if (p === '/bang-dieu-khien') body = <Dashboard />;
  else if (p === '/bao-cao') body = <Reports />;
  else if (p === '/nhiem-vu') body = <Homework />;
  else if (p === '/giao-vien') body = <Teacher />;
  else if (p === '/quan-tri') body = <Admin />;
  else if (p === '/bang-gia') body = <Pricing />;
  else if (p === '/thu-vien') body = <Library />;
  else if (p === '/luyen-tap') body = <Practice />;
  else if (p === '/so-tay') body = <Notebook />;
  else if (p === '/nhan-dien') body = <Brand />;
  else body = (
    <div className="wrap page">
      <Card className="tc">
        <div style={{ fontSize: 40 }}>🧭</div>
        <h2>Không tìm thấy trang</h2>
        <p className="muted">Đường dẫn <code>{p}</code> không tồn tại trong hệ thống.</p>
        <a className="btn btn-primary" href="#/">Về trang chủ</a>
      </Card>
    </div>
  );

  return (
    <>
      <AppBar />
      {body}
      <Footer />
    </>
  );
};
