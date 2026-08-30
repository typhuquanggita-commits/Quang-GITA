import { lazy, Suspense } from 'react';
import { useRoute } from '@/state';
import { href, topicIdFromSlug, paperIdFromSlug, type PageId } from '@/lib/routes';
import { SeoHead } from '@/components/SeoHead';
import { Shell } from '@/components/Shell';
import Home from '@/pages/Home';

/*
 * Chia nhỏ mã theo trang.
 *
 * Trước đây toàn bộ ứng dụng nằm trong một tệp JavaScript duy nhất, nên người
 * vào đọc một trang chuyên đề vẫn phải tải cả phần chấm bài, biểu đồ và tài
 * liệu học viện. Với trang nội dung, thời gian hiển thị nội dung chính là chỉ
 * số xếp hạng thật — nên mỗi trang chỉ nạp đúng phần mã của nó.
 */
const Onboarding = lazy(() => import('@/pages/Onboarding'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Today = lazy(() => import('@/pages/Today'));
const RoadmapPage = lazy(() => import('@/pages/Roadmap'));
const Missions = lazy(() => import('@/pages/Missions'));
const MissionRun = lazy(() => import('@/pages/MissionRun'));
const Solution = lazy(() => import('@/pages/Solution'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Report = lazy(() => import('@/pages/Report'));
const Guide = lazy(() => import('@/pages/Guide'));
const TopicList = lazy(() => import('@/pages/Topics').then((m) => ({ default: m.TopicList })));
const TopicDetail = lazy(() => import('@/pages/Topics').then((m) => ({ default: m.TopicDetail })));
const Exams = lazy(() => import('@/pages/Exams'));
const PaperList = lazy(() => import('@/pages/Papers').then((m) => ({ default: m.PaperList })));
const PaperView = lazy(() => import('@/pages/Papers').then((m) => ({ default: m.PaperView })));
const Playbook = lazy(() => import('@/pages/Playbook'));
const Formulas = lazy(() => import('@/pages/Formulas'));
const Gita = lazy(() => import('@/pages/Gita'));
const Library = lazy(() => import('@/pages/Library'));
const Roles = lazy(() => import('@/pages/Roles'));
const Classes = lazy(() => import('@/pages/Classes'));
const Academy = lazy(() => import('@/pages/Academy'));
const Search = lazy(() => import('@/pages/Search'));
const Brand = lazy(() => import('@/pages/Brand'));
const Sources = lazy(() => import('@/pages/Sources'));
const SeoDashboard = lazy(() => import('@/pages/SeoDashboard'));

/** Trang nào thì tô sáng mục nào trên thanh điều hướng. */
const NAV_OF: Partial<Record<PageId, PageId>> = {
  'lam-phieu': 'nhiem-vu',
  'loi-giai': 'nhiem-vu',
  'chuyen-de-detail': 'chuyen-de',
  'huong-dan-on': 'chuyen-de',
  'de-thi-detail': 'de-thi',
};

export default function App() {
  const { id, params } = useRoute();
  const activeId = NAV_OF[id] ?? id;

  let page: React.ReactNode;
  switch (id) {
    case 'home':
      page = <Home />;
      break;
    case 'bat-dau':
      page = <Onboarding />;
      break;
    case 'hom-nay':
      page = <Today />;
      break;
    case 'tien-do':
      page = <Dashboard />;
      break;
    case 'lo-trinh':
      page = <RoadmapPage />;
      break;
    case 'nhiem-vu':
      page = <Missions />;
      break;
    case 'lam-phieu':
      page = <MissionRun missionId={params.id ?? ''} />;
      break;
    case 'loi-giai':
      page = <Solution worksheetId={params.id ?? ''} variant={params.variant} />;
      break;
    case 'ho-so':
      page = <Portfolio />;
      break;
    case 'bao-cao':
      page = <Report />;
      break;
    case 'huong-dan-on':
      page = <Guide topicId={topicIdFromSlug(params.slug ?? '')} />;
      break;
    case 'chuyen-de':
      page = <TopicList />;
      break;
    case 'chuyen-de-detail':
      page = <TopicDetail id={topicIdFromSlug(params.slug ?? '')} />;
      break;
    case 'cau-truc-de-thi':
      page = <Exams />;
      break;
    case 'de-thi':
      page = <PaperList />;
      break;
    case 'de-thi-detail':
      page = <PaperView id={paperIdFromSlug(params.slug ?? '')} />;
      break;
    case 'bi-kip':
      page = <Playbook />;
      break;
    case 'cong-thuc':
      page = <Formulas />;
      break;
    case 'mo-thuc-gita':
      page = <Gita />;
      break;
    case 'kho-tai-lieu':
      page = <Library />;
      break;
    case 'phan-quyen':
      page = <Roles />;
      break;
    case 'lop-hoc':
      page = <Classes />;
      break;
    case 'hoc-vien':
      page = <Academy />;
      break;
    case 'tim-kiem':
      page = <Search initial={params.q} />;
      break;
    case 'nhan-dien':
      page = <Brand />;
      break;
    case 'nguon-phuong-phap':
      page = <Sources />;
      break;
    case 'seo':
      page = <SeoDashboard />;
      break;
    default:
      page = <Home />;
  }

  return (
    <>
      <SeoHead page={id} params={params} />
      <Shell active={href(activeId, params)}>
        <div key={`${id}:${Object.values(params).join('/')}`} className="animate-fade">
          <Suspense fallback={<PageSkeleton />}>{page}</Suspense>
        </div>
      </Shell>
    </>
  );
}

/** Khung chờ khi phần mã của trang đang được nạp. */
function PageSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <div className="h-7 w-2/5 animate-pulse rounded-lg bg-slate-200" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
    </div>
  );
}
