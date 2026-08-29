import { useHashRoute } from '@/state';
import { Shell } from '@/components/Shell';
import Home from '@/pages/Home';
import Onboarding from '@/pages/Onboarding';
import Dashboard from '@/pages/Dashboard';
import RoadmapPage from '@/pages/Roadmap';
import Missions from '@/pages/Missions';
import MissionRun from '@/pages/MissionRun';
import Solution from '@/pages/Solution';
import Portfolio from '@/pages/Portfolio';
import Guide from '@/pages/Guide';
import { TopicList, TopicDetail } from '@/pages/Topics';
import Exams from '@/pages/Exams';
import Playbook from '@/pages/Playbook';
import Gita from '@/pages/Gita';
import Library from '@/pages/Library';
import Roles from '@/pages/Roles';
import Classes from '@/pages/Classes';
import Brand from '@/pages/Brand';

export default function App() {
  const [segments] = useHashRoute();
  const [root, param, param2] = segments;
  const active = root ? `/${root}` : '/';

  let page: React.ReactNode;
  switch (root) {
    case undefined:
      page = <Home />;
      break;
    case 'onboarding':
      page = <Onboarding />;
      break;
    case 'dashboard':
      page = <Dashboard />;
      break;
    case 'roadmap':
      page = <RoadmapPage />;
      break;
    case 'missions':
      page = <Missions />;
      break;
    case 'mission':
      page = <MissionRun missionId={param ?? ''} />;
      break;
    case 'solution':
      page = <Solution worksheetId={param ?? ''} variant={param2} />;
      break;
    case 'portfolio':
      page = <Portfolio />;
      break;
    case 'guide':
      page = <Guide topicId={param ?? ''} />;
      break;
    case 'topics':
      page = param ? <TopicDetail id={param} /> : <TopicList />;
      break;
    case 'exams':
      page = <Exams />;
      break;
    case 'playbook':
      page = <Playbook />;
      break;
    case 'gita':
      page = <Gita />;
      break;
    case 'library':
      page = <Library />;
      break;
    case 'roles':
      page = <Roles />;
      break;
    case 'classes':
      page = <Classes />;
      break;
    case 'brand':
      page = <Brand />;
      break;
    default:
      page = <Home />;
  }

  return (
    <Shell active={root === 'mission' ? '/missions' : active}>
      <div key={segments.join('/')} className="animate-fade">
        {page}
      </div>
    </Shell>
  );
}
