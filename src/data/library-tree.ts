import type { TrackId } from '@/types';
import { TOPICS } from './topics';
import { STRANDS } from './schools';
import { stagesByTrack, MISSIONS } from './catalog';
import { TIERS } from './gita';
import { BRAND_TRACK_STYLE } from './brand';

/**
 * KIẾN TRÚC TÀI LIỆU MATH365.
 *
 * Mỗi thư mục có mã, mục đích, chủ sở hữu (vai trò chịu trách nhiệm) và danh sách
 * tài liệu bổ trợ. Các thư mục lá của chuyên đề được phân theo năm tầng hấp thu,
 * để mỗi tầng khách hàng nhận đúng loại tài liệu mình cần.
 */

export interface Folder {
  code: string;
  name: string;
  purpose: string;
  owner: string;
  tier?: number;
  cadence?: string;
  artifacts: string[];
  children?: Folder[];
}

const TIER_ARTIFACTS: Record<number, (topic: string) => string[]> = {
  1: (t) => [
    `Sơ đồ khái niệm 1 trang — ${t}`,
    `Bộ thẻ công thức cắt rời — ${t}`,
    'Bảng thuật ngữ và ký hiệu chuẩn',
  ],
  2: (t) => [
    `Bài giảng mẫu có chú giải từng bước — ${t}`,
    'Bộ ví dụ kèm phản ví dụ (chỉ rõ điều kiện áp dụng)',
    'Phiếu hỏi “vì sao” sau mỗi bước giải',
  ],
  3: (t) => [
    `Phiếu luyện Level 1–3 — ${t}`,
    'Bảng lỗi thường gặp kèm cách phòng tránh',
    'Bộ bài tập tăng dần độ khó có đáp án',
  ],
  4: (t) => [
    `Phiếu trộn dạng và đề tính giờ có liên quan tới ${t}`,
    'Ngân hàng biến thể khó và bẫy quen thuộc',
    'Barem chấm chi tiết theo từng bước',
  ],
  5: (t) => [
    `Hướng dẫn tự soạn đề về ${t} kèm barem`,
    'Khung bài giảng để học sinh giảng lại cho nhóm',
    'Gợi ý dự án ứng dụng thực tế',
  ],
};

function topicFolder(code: string, topicName: string, topicId: string): Folder {
  return {
    code,
    name: topicName,
    purpose: 'Toàn bộ tài liệu của chuyên đề, phân theo năm tầng hấp thu.',
    owner: 'P3 · Giáo viên (biên soạn: P4 · Coach)',
    artifacts: [`Mã chuyên đề: ${topicId}`],
    children: TIERS.map((tier) => ({
      code: `${code}.${tier.id}`,
      name: tier.name,
      purpose: tier.descriptor,
      owner: tier.id >= 4 ? 'P4 · Coach' : 'P3 · Giáo viên',
      tier: tier.id,
      artifacts: TIER_ARTIFACTS[tier.id](topicName),
    })),
  };
}

function trackFolder(track: TrackId, base: string): Folder {
  const style = BRAND_TRACK_STYLE[track];
  const topics = TOPICS.filter((t) => t.tracks.includes(track));
  const stages = stagesByTrack(track);

  const strandFolders: Folder[] = STRANDS.filter((s) =>
    topics.some((t) => t.strand === s.id),
  ).map((strand, si) => {
    const list = topics.filter((t) => t.strand === strand.id);
    return {
      code: `${base}.2.${si + 1}`,
      name: strand.name,
      purpose: strand.description,
      owner: 'P4 · Coach',
      artifacts: [`${list.length} chuyên đề`, 'Bản đồ phụ thuộc giữa các chuyên đề'],
      children: list.map((t, ti) => topicFolder(`${base}.2.${si + 1}.${ti + 1}`, t.name, t.id)),
    };
  });

  const stageFolders: Folder[] = stages.map((stage, si) => {
    const ms = MISSIONS.filter((m) => m.stageId === stage.id);
    return {
      code: `${base}.3.${si + 1}`,
      name: stage.name,
      purpose: stage.goal,
      owner: 'P3 · Giáo viên',
      cadence: stage.duration,
      artifacts: [
        `${ms.length} nhiệm vụ (${ms[0]?.id ?? '—'} → ${ms[ms.length - 1]?.id ?? '—'})`,
        `${ms.length} phiếu luyện tương ứng`,
        `Ngưỡng KPI: ${stage.kpi}%`,
        'Bảng theo dõi tiến độ lớp',
      ],
    };
  });

  return {
    code: base,
    name: style.label,
    purpose: style.goal,
    owner: 'P4 · Coach phụ trách luồng',
    artifacts: ['Sổ tay luồng', 'Chuẩn đầu ra từng giai đoạn'],
    children: [
      {
        code: `${base}.1`,
        name: 'Bản đồ kỳ thi',
        purpose: 'Mọi thứ cần biết về kỳ thi đích: cấu trúc, barem, ngưỡng điểm, lịch trình.',
        owner: 'P4 · Coach',
        artifacts: [
          'Ma trận đề chi tiết theo từng phần',
          'Bảng phân bổ thời gian phòng thi',
          'Mốc điểm mục tiêu theo nhóm năng lực',
          'Danh mục nguồn chính thức cần đối chiếu mỗi mùa thi',
        ],
      },
      {
        code: `${base}.2`,
        name: 'Chuyên đề học thuật',
        purpose: 'Cây chuyên đề đầy đủ, mỗi chuyên đề chia theo năm tầng hấp thu.',
        owner: 'P4 · Coach',
        artifacts: [`${topics.length} chuyên đề`, `${topics.length * 5} thư mục tầng`],
        children: strandFolders,
      },
      {
        code: `${base}.3`,
        name: 'Ngân hàng phiếu & nhiệm vụ',
        purpose: 'Toàn bộ nhiệm vụ của luồng, tổ chức theo giai đoạn.',
        owner: 'P3 · Giáo viên',
        artifacts: [`${MISSIONS.filter((m) => m.track === track).length} nhiệm vụ`],
        children: stageFolders,
      },
      {
        code: `${base}.4`,
        name: 'Đề & barem',
        purpose: 'Đề tính giờ, đáp án và barem chấm chi tiết.',
        owner: 'P4 · Coach',
        cadence: 'Cập nhật sau mỗi mùa thi',
        artifacts: [
          'Đề chính thức các năm kèm đáp án',
          'Đề thi thử nội bộ',
          'Barem chấm theo bước',
          'Bảng theo dõi điểm từng phần của mỗi học sinh',
        ],
      },
      {
        code: `${base}.5`,
        name: 'Bí kíp & thói quen',
        purpose: 'Kỹ thuật thực chiến và hệ thống thói quen dành riêng cho luồng.',
        owner: 'P4 · Coach',
        artifacts: [
          'Kho bí kíp phân theo nhóm kỹ năng',
          'Bộ thói quen luyện theo nhịp ngày – tuần – tháng',
          'Checklist phòng thi',
        ],
      },
    ],
  };
}

export const LIBRARY_TREE: Folder[] = [
  {
    code: '00',
    name: 'Nền tảng hệ thống',
    purpose: 'Chuẩn mực chung của MATH365: mô thức, chuẩn đầu ra, quy tắc đo lường.',
    owner: 'P5 · Master Coach',
    artifacts: ['Sổ tay mô thức GITA', 'Quy tắc KPI và thăng cấp', 'Bộ nhận diện thương hiệu'],
    children: [
      {
        code: '00.1',
        name: 'Mô thức GITA',
        purpose: 'Bốn trụ cột G–I–T–A và cách áp dụng vào từng vai.',
        owner: 'P5 · Master Coach',
        artifacts: [
          'Sổ tay bốn trụ cột',
          'Bảng việc cần làm theo vai (học sinh – giáo viên – gia đình)',
          'Checklist triển khai cho một lớp mới',
        ],
      },
      {
        code: '00.2',
        name: 'Tầng hấp thu & chuẩn đầu ra',
        purpose: 'Định nghĩa năm tầng, bằng chứng đạt tầng và tiêu chí chuyển tầng.',
        owner: 'P5 · Master Coach',
        artifacts: ['Bảng mô tả năm tầng', 'Rubric đánh giá tầng', 'Bộ câu hỏi kiểm tra tầng'],
      },
      {
        code: '00.3',
        name: 'Quy tắc đo lường',
        purpose: 'KPI, ngưỡng thăng Level và thăng Giai đoạn.',
        owner: 'P5 · Master Coach',
        artifacts: [
          'Định nghĩa KPI và cách tính',
          'Quy tắc mở khoá Level (2 phiếu ≥ 90%)',
          'Quy tắc mở khoá Giai đoạn (15 nhiệm vụ đạt chuẩn + KPI trung bình ≥ 90%)',
          'Nhật ký thao tác mở khoá thủ công',
        ],
      },
      {
        code: '00.4',
        name: 'Đối chiếu khung quốc tế',
        purpose: 'Cơ sở phương pháp luận của chương trình.',
        owner: 'P5 · Master Coach',
        artifacts: ['Bảng đối chiếu Bloom – Mastery – Deliberate Practice', 'Ghi chú giới hạn và phạm vi'],
      },
    ],
  },
  trackFolder('chuyen', '10'),
  trackFolder('thpt', '20'),
  trackFolder('thpt-qg', '30'),
  {
    code: '40',
    name: 'Đào tạo tư vấn – giáo viên – coach',
    purpose: 'Giáo trình nội bộ theo năm cấp chuyên môn P1 → P5.',
    owner: 'P5 · Master Coach',
    artifacts: ['Khung năng lực theo cấp', 'Bộ đề kiểm định chuyên môn', 'Biểu mẫu dự giờ'],
    children: [
      {
        code: '40.1',
        name: 'P1 · Tư vấn viên lộ trình',
        purpose: 'Đủ năng lực tiếp nhận và định hướng học sinh mới.',
        owner: 'P4 · Coach',
        artifacts: ['Kịch bản tư vấn đầu vào', 'Bộ câu hỏi thường gặp của phụ huynh', 'Bảng so sánh năm luồng'],
      },
      {
        code: '40.2',
        name: 'P2 · Trợ giảng',
        purpose: 'Chấm chữa chuẩn xác và theo dõi nhịp học của nhóm nhỏ.',
        owner: 'P4 · Coach',
        artifacts: ['Cẩm nang chấm theo barem', 'Bảng mã nguyên nhân lỗi', 'Mẫu nhận xét hành động được'],
      },
      {
        code: '40.3',
        name: 'P3 · Giáo viên',
        purpose: 'Dạy trọn một lớp theo lộ trình và dữ liệu.',
        owner: 'P4 · Coach',
        artifacts: [
          'Giáo án mẫu theo tầng hấp thu',
          'Quy trình điều chỉnh lộ trình theo dữ liệu KPI',
          'Bộ đề kiểm định chuyên môn theo luồng',
        ],
      },
      {
        code: '40.4',
        name: 'P4 · Coach',
        purpose: 'Huấn luyện học sinh mục tiêu cao và huấn luyện giáo viên.',
        owner: 'P5 · Master Coach',
        artifacts: [
          'Khung kèm cặp 1–1',
          'Biểu mẫu dự giờ theo mô thức GITA',
          'Quy trình biên soạn phiếu và barem',
        ],
      },
      {
        code: '40.5',
        name: 'P5 · Master Coach',
        purpose: 'Sở hữu chuẩn mực chuyên môn và kiểm định chất lượng.',
        owner: 'P5 · Master Coach',
        artifacts: ['Quy trình kiểm định nội dung', 'Hồ sơ hiệu chỉnh ngưỡng KPI', 'Chiến lược chương trình'],
      },
    ],
  },
  {
    code: '50',
    name: 'GITA trong gia đình',
    purpose: 'Bộ công cụ để phụ huynh đồng hành đúng cách.',
    owner: 'P1 · Tư vấn viên',
    cadence: 'Bàn giao khi nhập học, nhắc lại hằng tháng',
    artifacts: ['Sổ tay phụ huynh', 'Bộ ba câu hỏi mỗi tối', 'Bảng theo dõi tuần dán tường'],
    children: [
      {
        code: '50.1',
        name: 'Quy trình hằng ngày',
        purpose: 'Bàn tròn 10 phút và khung giờ bất khả xâm phạm.',
        owner: 'P1 · Tư vấn viên',
        cadence: 'hằng ngày',
        artifacts: ['Thẻ ba câu hỏi', 'Cam kết khung giờ học của cả nhà'],
      },
      {
        code: '50.2',
        name: 'Quy trình hằng tuần',
        purpose: 'Chủ nhật nhìn lại cùng con.',
        owner: 'P1 · Tư vấn viên',
        cadence: 'hằng tuần',
        artifacts: ['Mẫu bảng KPI tuần cho phụ huynh', 'Gợi ý cách ghi nhận nỗ lực'],
      },
      {
        code: '50.3',
        name: 'Những điều nên tránh',
        purpose: 'Các hành vi thiện chí nhưng gây hại cho động lực của con.',
        owner: 'P4 · Coach',
        artifacts: ['Danh mục antipattern kèm giải thích', 'Kịch bản xử lý khi con điểm kém'],
      },
    ],
  },
  {
    code: '60',
    name: 'GITA trong nhà trường',
    purpose: 'Triển khai mô thức vào nhịp dạy – học chính khoá.',
    owner: 'P4 · Coach',
    artifacts: ['Kế hoạch triển khai theo lớp', 'Bộ biểu mẫu theo dõi'],
    children: [
      {
        code: '60.1',
        name: 'Quy trình trong tiết học',
        purpose: 'Năm phút gợi nhớ đầu giờ và chấm theo nguyên nhân.',
        owner: 'P3 · Giáo viên',
        cadence: 'mỗi buổi',
        artifacts: ['Mẫu phiếu gợi nhớ đầu giờ', 'Bảng mã nguyên nhân lỗi dùng chung'],
      },
      {
        code: '60.2',
        name: 'Phân tầng nhiệm vụ trong lớp',
        purpose: 'Ba mức nhiệm vụ cùng một chuyên đề cho ba nhóm trình độ.',
        owner: 'P3 · Giáo viên',
        cadence: 'hằng tuần',
        artifacts: ['Bộ nhiệm vụ ba mức', 'Sơ đồ ghép cặp học sinh Tầng 5 kèm Tầng 2–3'],
      },
      {
        code: '60.3',
        name: 'Báo cáo & phối hợp',
        purpose: 'Kết nối dữ liệu học tập với giáo viên chủ nhiệm và phụ huynh.',
        owner: 'P3 · Giáo viên',
        cadence: 'hằng tháng',
        artifacts: ['Mẫu báo cáo tiến độ lớp', 'Mẫu thư gửi phụ huynh'],
      },
    ],
  },
  {
    code: '70',
    name: 'GITA trong đời sống & phát triển bản thân',
    purpose: 'Chuyển kỷ luật học Toán thành năng lực sống lâu dài.',
    owner: 'P4 · Coach',
    artifacts: ['Bộ dự án ứng dụng', 'Nhật ký phẩm chất', 'Khung chương trình kèm bạn'],
    children: [
      {
        code: '70.1',
        name: 'Tư duy định lượng hằng ngày',
        purpose: 'Đưa ước lượng và kiểm chứng vào quyết định đời thường.',
        owner: 'P4 · Coach',
        cadence: 'hằng tuần',
        artifacts: ['Mẫu nhật ký ước lượng', 'Bộ tình huống gợi ý'],
      },
      {
        code: '70.2',
        name: 'Dự án ứng dụng hằng tháng',
        purpose: 'Dùng công cụ toán để giải quyết một vấn đề thật.',
        owner: 'P4 · Coach',
        cadence: 'hằng tháng',
        artifacts: ['Danh mục 12 dự án mẫu', 'Rubric chấm dự án', 'Khung trình bày 5 phút'],
      },
      {
        code: '70.3',
        name: 'Chương trình kèm bạn',
        purpose: 'Học sinh Tầng 5 kèm bạn — vừa củng cố vừa rèn tinh thần phụng sự.',
        owner: 'P3 · Giáo viên',
        cadence: 'hằng tháng',
        artifacts: ['Hướng dẫn cho người kèm', 'Mẫu nhật ký buổi kèm', 'Tiêu chí ghi nhận'],
      },
      {
        code: '70.4',
        name: 'Nhật ký phẩm chất',
        purpose: 'Theo dõi tám phẩm chất được rèn qua quá trình học.',
        owner: 'P4 · Coach',
        artifacts: ['Bảng tám phẩm chất kèm bằng chứng', 'Mẫu tự đánh giá hằng tháng'],
      },
    ],
  },
];

export function countFolders(nodes: Folder[]): number {
  return nodes.reduce((sum, n) => sum + 1 + (n.children ? countFolders(n.children) : 0), 0);
}

export function countArtifacts(nodes: Folder[]): number {
  return nodes.reduce(
    (sum, n) => sum + n.artifacts.length + (n.children ? countArtifacts(n.children) : 0),
    0,
  );
}

export function findFolder(nodes: Folder[], code: string): Folder | undefined {
  for (const n of nodes) {
    if (n.code === code) return n;
    if (n.children) {
      const f = findFolder(n.children, code);
      if (f) return f;
    }
  }
  return undefined;
}
