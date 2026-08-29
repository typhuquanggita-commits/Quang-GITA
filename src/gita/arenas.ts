/**
 * The three arenas GITA transfers into.
 *
 * A study method that never leaves the desk produces a good score and no
 * changed person. The claim this platform makes — that the model becomes part
 * of who someone is — is only honest if transfer is measured, so each arena
 * carries its own rituals, its own observable indicators, and its own
 * evidence of transfer.
 *
 * Study is deliberately not one of these. Study is where the method is built;
 * these three are where it has to survive without the scaffolding.
 */

import type { Arena, Habit } from './habits.ts';
import { HABITS } from './habits.ts';
import type { PillarId } from './framework.ts';

export interface Ritual {
  id: string;
  label: string;
  labelVi: string;
  /** Who takes part beyond the learner. */
  participants: string;
  participantsVi: string;
  cadence: 'daily' | 'weekly' | 'monthly';
  minutes: number;
  /** The steps, in order. A ritual that needs improvising is not a ritual. */
  steps: string[];
  stepsVi: string[];
  /** The mistake that most often kills this ritual. */
  pitfall: string;
  pitfallVi: string;
}

export interface TransferIndicator {
  id: string;
  pillar: PillarId;
  label: string;
  labelVi: string;
  /** Observable evidence, phrased so it can be answered yes or no. */
  observable: string;
  observableVi: string;
}

export interface ArenaSpec {
  id: Exclude<Arena, 'study'>;
  label: string;
  labelVi: string;
  /** What GITA is trying to change in this arena. */
  purpose: string;
  purposeVi: string;
  /** Who else has to act for this arena to work. */
  stakeholders: string[];
  stakeholdersVi: string[];
  /** The absorption tier at which this arena opens. */
  opensAtTier: 1 | 2 | 3 | 4 | 5;
  rituals: Ritual[];
  indicators: TransferIndicator[];
  color: string;
}

export const ARENAS: Record<Exclude<Arena, 'study'>, ArenaSpec> = {
  family: {
    id: 'family',
    label: 'Family',
    labelVi: 'Gia đình',
    purpose:
      'Turn the home from a place that monitors studying into a place that makes studying easy.',
    purposeVi:
      'Biến ngôi nhà từ nơi giám sát việc học thành nơi khiến việc học trở nên dễ dàng.',
    stakeholders: ['The learner', 'At least one parent or guardian', 'Siblings, where present'],
    stakeholdersVi: ['Người học', 'Ít nhất một phụ huynh', 'Anh chị em, nếu có'],
    opensAtTier: 2,
    color: 'var(--accent)',
    rituals: [
      {
        id: 'r-quiet-hour',
        label: 'The household quiet hour',
        labelVi: 'Giờ yên tĩnh của cả nhà',
        participants: 'Everyone at home, including the adults',
        participantsVi: 'Mọi người trong nhà, kể cả người lớn',
        cadence: 'daily',
        minutes: 60,
        steps: [
          'A fixed hour is agreed once and not renegotiated nightly.',
          'Every person in the house works quietly — reading, paperwork, study.',
          'No entertainment screens for anyone, adults included.',
          'The hour ends on time even if the work is unfinished.',
        ],
        stepsVi: [
          'Chốt một khung giờ cố định, không thương lượng lại mỗi tối.',
          'Mọi người trong nhà cùng làm việc yên lặng — đọc sách, giấy tờ, học bài.',
          'Không màn hình giải trí với bất kỳ ai, kể cả người lớn.',
          'Hết giờ là dừng, kể cả khi việc chưa xong.',
        ],
        pitfall:
          'The adults exempt themselves. The hour then reads as a punishment rather than a norm, and it dies within two weeks.',
        pitfallVi:
          'Người lớn tự cho mình ngoại lệ. Giờ yên tĩnh lập tức bị hiểu là hình phạt chứ không phải nếp nhà, và chết trong hai tuần.',
      },
      {
        id: 'r-family-numbers',
        label: 'Fifteen minutes on the numbers',
        labelVi: 'Mười lăm phút với các con số',
        participants: 'The learner and one parent',
        participantsVi: 'Người học và một phụ huynh',
        cadence: 'weekly',
        minutes: 15,
        steps: [
          'The learner opens their own analytics and presents it — the parent does not drive.',
          'Three questions only: what improved, what did not, what changes next week.',
          'The parent asks about method, never about effort or attitude.',
          'The week ends with one specific commitment, written down.',
        ],
        stepsVi: [
          'Người học tự mở phần phân tích của mình và trình bày — phụ huynh không cầm lái.',
          'Chỉ ba câu hỏi: điều gì tiến bộ, điều gì không, tuần tới đổi gì.',
          'Phụ huynh hỏi về phương pháp, không hỏi về sự cố gắng hay thái độ.',
          'Kết thúc bằng một cam kết cụ thể, được viết ra.',
        ],
        pitfall:
          'It becomes an interrogation about effort. The learner then starts managing the meeting instead of the work.',
        pitfallVi:
          'Nó biến thành cuộc thẩm vấn về sự chăm chỉ. Người học sẽ bắt đầu đối phó với buổi họp thay vì lo việc học.',
      },
      {
        id: 'r-family-table',
        label: 'One honest sentence at the table',
        labelVi: 'Một câu thật ở bàn ăn',
        participants: 'Whoever is at the evening meal',
        participantsVi: 'Những ai có mặt ở bữa tối',
        cadence: 'daily',
        minutes: 3,
        steps: [
          'Each person names one thing that went well today and one that did not.',
          'Adults go first, and are specific about their own failure.',
          'Nobody fixes anybody. The sentence is heard, not solved.',
        ],
        stepsVi: [
          'Mỗi người nói một điều hôm nay tốt và một điều chưa tốt.',
          'Người lớn nói trước, và nói cụ thể về thất bại của chính mình.',
          'Không ai sửa lưng ai. Câu nói được lắng nghe, không phải để giải quyết.',
        ],
        pitfall:
          'An adult responds to the child’s admission with advice. The admissions stop the same week.',
        pitfallVi:
          'Người lớn đáp lại lời thú nhận của con bằng lời khuyên. Ngay tuần đó, con sẽ thôi thú nhận.',
      },
    ],
    indicators: [
      {
        id: 'i-family-space',
        pillar: 'action',
        label: 'A protected place and hour exist',
        labelVi: 'Có chỗ học và giờ học được bảo vệ',
        observable: 'The learner can study without negotiating for the space or the time.',
        observableVi: 'Người học ngồi vào học mà không phải xin chỗ hoặc xin giờ.',
      },
      {
        id: 'i-family-language',
        pillar: 'inspirits',
        label: 'The household talks about method, not effort',
        labelVi: 'Cả nhà nói về phương pháp, không nói về sự chăm chỉ',
        observable: 'A bad score prompts "what will you change?" rather than "you did not try".',
        observableVi: 'Điểm kém dẫn tới câu "con sẽ đổi gì?" chứ không phải "con không chịu cố".',
      },
      {
        id: 'i-family-autonomy',
        pillar: 'goal',
        label: 'The learner owns the goal out loud',
        labelVi: 'Người học tự nhận mục tiêu là của mình',
        observable: 'The learner states the target to the family, rather than the family stating it to them.',
        observableVi: 'Người học nói mục tiêu với gia đình, chứ không phải gia đình đặt mục tiêu cho họ.',
      },
    ],
  },

  school: {
    id: 'school',
    label: 'School',
    labelVi: 'Trường học',
    purpose:
      'Convert classroom hours from time served into deliberate practice, and use peers as an engine rather than a comparison.',
    purposeVi:
      'Biến giờ trên lớp từ chỗ ngồi cho hết giờ thành luyện tập có chủ đích, và dùng bạn bè làm động cơ thay vì thước đo so bì.',
    stakeholders: ['The learner', 'Subject teachers', 'A study team of three to five peers'],
    stakeholdersVi: ['Người học', 'Giáo viên bộ môn', 'Nhóm học từ ba đến năm bạn'],
    opensAtTier: 3,
    color: 'var(--rw)',
    rituals: [
      {
        id: 'r-teach-back',
        label: 'Teach-back circle',
        labelVi: 'Vòng giảng lại',
        participants: 'A study team of three to five',
        participantsVi: 'Nhóm học từ ba đến năm bạn',
        cadence: 'weekly',
        minutes: 30,
        steps: [
          'Each member teaches one concept for four minutes, without notes.',
          'The group asks one hard question each — not a supportive one.',
          'Anything the teacher could not answer becomes their drill for the week.',
        ],
        stepsVi: [
          'Mỗi thành viên giảng một khái niệm trong bốn phút, không nhìn ghi chép.',
          'Cả nhóm mỗi người hỏi một câu khó — không hỏi cho có.',
          'Điều gì người giảng không trả lời được sẽ thành bài luyện tuần đó của họ.',
        ],
        pitfall:
          'The group is kind. Soft questions make everyone feel fluent and teach nobody anything.',
        pitfallVi:
          'Cả nhóm nương nhau. Câu hỏi dễ khiến ai cũng thấy mình đã hiểu, và không ai học được gì.',
      },
      {
        id: 'r-team-board',
        label: 'The team board',
        labelVi: 'Bảng thi đua của nhóm',
        participants: 'The study team',
        participantsVi: 'Nhóm học',
        cadence: 'weekly',
        minutes: 10,
        steps: [
          'Post each member’s weekly volume and adherence — never their score.',
          'Celebrate the largest improvement, not the highest number.',
          'A member who misses two weeks is asked what changed, not warned.',
        ],
        stepsVi: [
          'Công khai khối lượng và mức duy trì của mỗi thành viên — tuyệt đối không công khai điểm số.',
          'Tôn vinh mức tiến bộ lớn nhất, không phải con số cao nhất.',
          'Ai vắng hai tuần thì được hỏi có chuyện gì, không phải bị cảnh cáo.',
        ],
        pitfall:
          'Scores go on the board. The strongest student stops trying and the weakest stops coming.',
        pitfallVi:
          'Đưa điểm số lên bảng. Bạn giỏi nhất thôi cố, bạn yếu nhất thôi đến.',
      },
    ],
    indicators: [
      {
        id: 'i-school-questions',
        pillar: 'inspirits',
        label: 'Asks questions in class',
        labelVi: 'Có hỏi trong giờ học',
        observable: 'Asks at least one real question a week in a lesson, in front of others.',
        observableVi: 'Mỗi tuần hỏi ít nhất một câu thật trong giờ, trước mặt cả lớp.',
      },
      {
        id: 'i-school-team',
        pillar: 'action',
        label: 'Belongs to a working study team',
        labelVi: 'Thuộc về một nhóm học thật sự hoạt động',
        observable: 'The team has met at least three times in the past month without a teacher present.',
        observableVi: 'Nhóm đã gặp ít nhất ba lần trong tháng qua mà không cần giáo viên có mặt.',
      },
      {
        id: 'i-school-teaching',
        pillar: 'talent',
        label: 'Can teach what they know',
        labelVi: 'Dạy lại được điều mình biết',
        observable: 'Has explained a concept to a peer this week and been questioned on it.',
        observableVi: 'Tuần này đã giảng một khái niệm cho bạn và bị hỏi vặn lại.',
      },
    ],
  },

  society: {
    id: 'society',
    label: 'Society',
    labelVi: 'Xã hội',
    purpose:
      'Prove the method is general — that it holds outside the subject it was learned on — and turn ability into contribution.',
    purposeVi:
      'Chứng minh phương pháp có tính tổng quát — đứng vững ngoài môn học đã sinh ra nó — và biến năng lực thành đóng góp.',
    stakeholders: ['The learner', 'A commitment outside school', 'People who benefit from it'],
    stakeholdersVi: ['Người học', 'Một cam kết ngoài trường học', 'Những người được hưởng lợi từ nó'],
    opensAtTier: 4,
    color: 'var(--math)',
    rituals: [
      {
        id: 'r-second-domain',
        label: 'The second domain',
        labelVi: 'Lĩnh vực thứ hai',
        participants: 'The learner, with a coach reviewing',
        participantsVi: 'Người học, có coach cùng rà soát',
        cadence: 'weekly',
        minutes: 20,
        steps: [
          'Choose one pursuit with nothing to do with the SAT — an instrument, a sport, a craft.',
          'Apply exactly one GITA habit to it, unchanged.',
          'Track adherence in that domain with the same honesty as study.',
          'Report at the weekly coach session what transferred and what did not.',
        ],
        stepsVi: [
          'Chọn một việc không liên quan gì tới SAT — một nhạc cụ, một môn thể thao, một nghề tay.',
          'Áp dụng đúng một thói quen GITA vào đó, giữ nguyên không sửa.',
          'Theo dõi mức duy trì ở lĩnh vực đó thành thật như với việc học.',
          'Báo cáo ở buổi coach hằng tuần: điều gì chuyển giao được, điều gì không.',
        ],
        pitfall:
          'The second domain is chosen to be easy, so it proves nothing. It should be something the learner has previously failed to sustain.',
        pitfallVi:
          'Chọn lĩnh vực thứ hai cho dễ, nên chẳng chứng minh được gì. Nên chọn đúng thứ trước đây người học từng bỏ dở.',
      },
      {
        id: 'r-give-it-away',
        label: 'Give the method away',
        labelVi: 'Trao lại phương pháp',
        participants: 'The learner and someone outside their circle',
        participantsVi: 'Người học và một người ngoài vòng quen biết',
        cadence: 'monthly',
        minutes: 90,
        steps: [
          'Find one person who wants what you can already do.',
          'Teach them the smallest useful piece of it.',
          'Ask afterwards what they will actually do differently.',
        ],
        stepsVi: [
          'Tìm một người cần đúng điều bạn đã làm được.',
          'Dạy họ phần nhỏ nhất mà dùng được ngay.',
          'Sau đó hỏi họ sẽ thật sự làm khác đi điều gì.',
        ],
        pitfall:
          'It becomes a performance of generosity. If nobody changed anything, it did not happen.',
        pitfallVi:
          'Nó thành màn trình diễn lòng tốt. Nếu không ai thay đổi gì, coi như chưa xảy ra.',
      },
    ],
    indicators: [
      {
        id: 'i-society-transfer',
        pillar: 'action',
        label: 'A habit runs outside study',
        labelVi: 'Có thói quen chạy ngoài việc học',
        observable: 'One GITA habit has been sustained for a month in a non-academic pursuit.',
        observableVi: 'Một thói quen GITA đã duy trì trọn một tháng ở một việc ngoài học thuật.',
      },
      {
        id: 'i-society-contribution',
        pillar: 'inspirits',
        label: 'Ability is used for someone else',
        labelVi: 'Năng lực được dùng cho người khác',
        observable: 'Has helped someone outside their circle using a strength, in the past month.',
        observableVi: 'Trong tháng qua đã dùng thế mạnh của mình giúp một người ngoài vòng quen biết.',
      },
      {
        id: 'i-society-identity',
        pillar: 'goal',
        label: 'The method is described as their own',
        labelVi: 'Phương pháp được nói tới như của chính mình',
        observable: 'Describes how they work without naming a coach, a class, or an app.',
        observableVi: 'Mô tả được cách mình làm việc mà không cần nhắc tới coach, lớp học hay ứng dụng nào.',
      },
    ],
  },
};

export const ARENA_ORDER: Array<Exclude<Arena, 'study'>> = ['family', 'school', 'society'];

export function arenaLabel(id: Exclude<Arena, 'study'>, locale: 'vi' | 'en'): string {
  return locale === 'vi' ? ARENAS[id].labelVi : ARENAS[id].label;
}

export function habitsInArena(arena: Exclude<Arena, 'study'>): Habit[] {
  return HABITS.filter((h) => h.arena === arena);
}

export const ALL_INDICATORS: TransferIndicator[] = ARENA_ORDER.flatMap((id) => ARENAS[id].indicators);

export const INDICATOR_BY_ID = new Map<string, TransferIndicator>(
  ALL_INDICATORS.map((i) => [i.id, i]),
);

/**
 * Transfer score for an arena: the share of its indicators currently observed.
 *
 * Reported as a fraction rather than a count so the three arenas — which have
 * different numbers of indicators — stay comparable on one chart.
 */
export function arenaTransfer(
  arena: Exclude<Arena, 'study'>,
  observed: ReadonlySet<string>,
): number {
  const indicators = ARENAS[arena].indicators;
  if (indicators.length === 0) return 0;
  return indicators.filter((i) => observed.has(i.id)).length / indicators.length;
}
