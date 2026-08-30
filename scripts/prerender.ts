/**
 * DỰNG SẴN HTML TĨNH CHO TỪNG ĐỊA CHỈ
 *
 * Vì sao cần bước này: ứng dụng là một trang đơn dựng bằng JavaScript. Công cụ
 * tìm kiếm có thể chạy JavaScript, nhưng làm chậm hơn, tốn ngân sách thu thập
 * hơn và không đảm bảo. Với một kho nội dung hơn một trăm địa chỉ, cách chắc
 * chắn nhất là mỗi địa chỉ có sẵn một tệp HTML chứa đủ phần đầu tài liệu và
 * phần nội dung đọc được ngay khi tải về.
 *
 * Nội dung tĩnh được dựng từ chính các mô-đun dữ liệu mà ứng dụng dùng, nên
 * không có chuyện trang tĩnh nói một đằng và ứng dụng hiển thị một nẻo.
 */

import fs from 'node:fs';
import path from 'node:path';

import { allIndexablePaths, matchRoute, topicIdFromSlug, paperIdFromSlug, href, topicSlug, paperSlug } from '../src/lib/routes';
import { seoFor, SITE, organizationLd, websiteLd } from '../src/lib/seo';
import { faqFor } from '../src/data/faq';
import { TOPICS, topicById } from '../src/data/topics';
import { EXAM_PAPERS, paperById, paperItems } from '../src/data/papers';
import { BLUEPRINTS } from '../src/data/blueprints';
import { SCHOOLS, strandById } from '../src/data/schools';
import { FORMULA_GROUPS } from '../src/data/formulas';
import { TIPS, HABITS, METHODS } from '../src/data/playbook';
import { PILLARS } from '../src/data/gita';
import { LESSON_PLANS } from '../src/data/academy';
import { catalogStats, sheetsOfTopic } from '../src/data/catalog';
import { SHEET_TYPES } from '../src/data/sheets';
import { BRAND } from '../src/data/brand';
import { LIBRARY_TREE } from '../src/data/library-tree';
import type { PageId } from '../src/lib/routes';

/* Script được gói vào node_modules/.cache khi chạy, nên lấy gốc dự án từ thư mục làm việc. */
const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

/* ---------------- Tiện ích ---------------- */

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const p = (s: string) => `<p>${esc(s)}</p>`;
const ul = (items: string[]) => (items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '');
const h2 = (s: string) => `<h2>${esc(s)}</h2>`;
const h3 = (s: string) => `<h3>${esc(s)}</h3>`;
const link = (to: string, label: string) => `<a href="${to}">${esc(label)}</a>`;

/* ---------------- Nội dung tĩnh cho từng trang ---------------- */

function faqBlock(page: PageId) {
  const items = faqFor(page);
  if (!items.length) return '';
  return `<section>${h2('Câu hỏi thường gặp')}${items
    .map((f) => `<article>${h3(f.q)}${p(f.a)}</article>`)
    .join('')}</section>`;
}

/** Khối liên kết nội bộ — giúp công cụ tìm kiếm đi hết kho nội dung. */
function relatedBlock(links: { to: string; label: string }[], title = 'Nội dung liên quan') {
  if (!links.length) return '';
  return `<nav aria-label="${esc(title)}">${h2(title)}<ul>${links
    .map((l) => `<li>${link(l.to, l.label)}</li>`)
    .join('')}</ul></nav>`;
}

function bodyFor(pageId: PageId, params: Record<string, string>): string {
  const st = catalogStats();
  switch (pageId) {
    case 'home':
      return [
        h2('Ba luồng luyện thi'),
        ul([
          `Luồng 1 · Toán chuyên — ${st.chuyen} phiếu luyện, đích đến là đỗ lớp chuyên Toán KHTN, Hà Nội – Amsterdam, Chu Văn An, Nguyễn Tất Thành, Chuyên Sư phạm.`,
          `Luồng 2 · Toán vào lớp 10 — ${st.thpt} phiếu luyện, đích đến là 9 đến 10 điểm Toán tuyển sinh lớp 10 Hà Nội.`,
          `Luồng 3 · Toán THPT lớp 10–12 — ${st.quocGia} phiếu luyện, đích đến là trên 9 điểm Toán thi đại học và đứng đầu lớp môn Toán.`,
        ]),
        h2('Hệ thống gồm những gì'),
        ul([
          `${st.worksheets.toLocaleString('vi-VN')} phiếu luyện và ${st.worksheets.toLocaleString('vi-VN')} nhiệm vụ, mỗi nhiệm vụ có mốc KPI và điều kiện mở khoá riêng.`,
          `${st.items.toLocaleString('vi-VN')} câu hỏi, mỗi câu có lời giải từng bước và bảng phân tích dạng bài.`,
          `${EXAM_PAPERS.length} đề thi thử trọn vẹn dựng đúng ma trận từng kỳ thi, kèm barem chấm tới 0,25 điểm.`,
          `${TOPICS.length} chuyên đề, mỗi chuyên đề là một bộ sáu phiếu theo đúng thứ tự sư phạm.`,
          `${FORMULA_GROUPS.reduce((s, g) => s + g.items.length, 0)} công thức tra cứu, mỗi công thức nói rõ dùng khi nào và sai ở đâu.`,
        ]),
        h2('Vòng lặp luyện tập'),
        p(
          'Chọn chuyên đề, làm từng phần của phiếu, nộp bài. Hệ thống chấm ngay, báo KPI tổng và KPI từng phần, chỉ ra sai ở kỹ năng nào và vì sao, đưa ra việc cụ thể cần làm, rồi cập nhật lại lộ trình. Câu sai được lưu vào hồ sơ và xếp lịch gặp lại theo mốc 1, 3, 7 và 21 ngày.',
        ),
        h2('Mô thức huấn luyện GITA'),
        ul(PILLARS.map((x) => `${x.letter} · ${x.name} — ${x.principle}`)),
        relatedBlock([
          { to: href('chuyen-de'), label: `Xem ${TOPICS.length} chuyên đề Toán` },
          { to: href('de-thi'), label: `Xem ${EXAM_PAPERS.length} đề thi thử có lời giải` },
          { to: href('cau-truc-de-thi'), label: 'Xem cấu trúc và ma trận đề thi' },
          { to: href('cong-thuc'), label: 'Mở sổ tay công thức Toán' },
          { to: href('nguon-phuong-phap'), label: 'Nguồn và phương pháp biên soạn' },
        ], 'Bắt đầu từ đâu'),
        faqBlock('home'),
      ].join('');

    case 'chuyen-de': {
      const byStrand = new Map<string, typeof TOPICS>();
      for (const t of TOPICS) {
        const k = strandById(t.strand)?.name ?? t.strand;
        byStrand.set(k, [...(byStrand.get(k) ?? []), t]);
      }
      return [
        p(
          `Danh sách ${TOPICS.length} chuyên đề Toán, phân theo 10 mạch kiến thức và 5 mức độ. Mỗi chuyên đề là một bộ sáu phiếu: Lý thuyết nền, Dạng bài và Đọc vị đề, Kỹ năng và Phương pháp, Luyện nâng cao, Ôn thi tổng hợp và Phiếu thi.`,
        ),
        [...byStrand.entries()]
          .map(
            ([strand, list]) =>
              `<section>${h2(strand)}<ul>${list
                .map(
                  (t) =>
                    `<li>${link(href('chuyen-de-detail', { slug: topicSlug(t.id) }), t.name)} — mức ${t.level}/5, tần suất ${t.frequency}%. ${esc(t.summary)}</li>`,
                )
                .join('')}</ul></section>`,
          )
          .join(''),
        faqBlock('chuyen-de'),
      ].join('');
    }

    case 'chuyen-de-detail': {
      const t = topicById(topicIdFromSlug(params.slug));
      if (!t) return '';
      const sheets = sheetsOfTopic(t.id).slice(0, 6);
      return [
        p(
          `Chuyên đề thuộc mạch ${strandById(t.strand)?.name ?? ''}, mức độ ${t.level}/5, tần suất xuất hiện trong đề khoảng ${t.frequency}%, thời lượng học đề xuất ${t.hours} giờ.`,
        ),
        h2('Học xong chuyên đề này em làm được gì'),
        ul(t.outcomes),
        h2('Kỹ thuật xử lý'),
        ul(t.techniques),
        h2('Lỗi hay mắc'),
        ul(t.pitfalls),
        t.keyFormulas?.length ? h2('Công thức chính') + ul(t.keyFormulas) : '',
        h2('Bộ phiếu của chuyên đề'),
        ul(
          SHEET_TYPES.map(
            (s) => `Phiếu ${s.code} · ${s.name} — ${s.purpose} Mục tiêu KPI ${s.kpiTarget}%, ${s.minutes} phút.`,
          ),
        ),
        sheets.length ? p(`Chuyên đề hiện có ${sheetsOfTopic(t.id).length} phiếu luyện đã biên soạn.`) : '',
        relatedBlock(
          [
            { to: href('huong-dan-on', { slug: topicSlug(t.id) }), label: `Hướng dẫn ôn chắc ${t.name}` },
            { to: href('chuyen-de'), label: 'Tất cả chuyên đề Toán' },
            { to: href('cong-thuc'), label: 'Sổ tay công thức liên quan' },
            { to: href('de-thi'), label: 'Đề thi thử có lời giải' },
          ],
          'Đi tiếp',
        ),
      ].join('');
    }

    case 'huong-dan-on': {
      const t = topicById(topicIdFromSlug(params.slug));
      if (!t) return '';
      return [
        p(`Hướng dẫn ôn chắc chuyên đề ${t.name}: học theo thứ tự nào và làm sao biết mình đã chắc.`),
        h2('Thứ tự học sáu phiếu'),
        ul(SHEET_TYPES.map((s, i) => `Bước ${i + 1} — Phiếu ${s.code} · ${s.name}: ${s.outcome}`)),
        h2('Checklist coi là đã ôn chắc'),
        ul([
          ...t.outcomes.map((o) => `Làm được: ${o}`),
          ...t.pitfalls.map((x) => `Không còn mắc: ${x}`),
          'Đạt KPI từ 90% ở hai phiếu cùng mức độ.',
        ]),
        h2('Lịch ôn lại chống quên'),
        p(
          'Sau khi làm xong lần đầu, hãy gặp lại chuyên đề này vào ngày thứ 1, thứ 3, thứ 7 và thứ 21. Ôn đúng hạn tốn ít thời gian hơn nhiều so với ôn muộn, vì kiến thức chưa kịp phai.',
        ),
        h2('Kỹ thuật cần thuộc'),
        ul(t.techniques),
        relatedBlock([{ to: href('chuyen-de-detail', { slug: topicSlug(t.id) }), label: `Quay lại chuyên đề ${t.name}` }]),
      ].join('');
    }

    case 'cau-truc-de-thi':
      return [
        p(
          `Ma trận chi tiết của ${BLUEPRINTS.length} kỳ thi: số bài, điểm từng phần, thời gian, yêu cầu từng ý và chiến thuật phân bổ thời gian trong phòng thi.`,
        ),
        BLUEPRINTS.map(
          (b) =>
            `<section>${h2(b.title)}${p(`${b.format}. Thời gian ${b.minutes} phút, thang điểm ${b.totalPoints}.`)}${p(
              b.updatedNote,
            )}<ul>${b.parts
              .map(
                (part) =>
                  `<li><strong>${esc(part.label)} (${part.points} điểm, ${part.minutes} phút)</strong> — ${esc(part.content)}. ${esc(part.requirements.join(' '))}</li>`,
              )
              .join('')}</ul>${h3('Chiến thuật thời gian')}<ul>${b.timeStrategy
              .map((t) => `<li>Phút ${esc(t.minutes)} — ${esc(t.phase)}: ${esc(t.action)}</li>`)
              .join('')}</ul></section>`,
        ).join(''),
        h2('Nguồn công bố chính thức'),
        `<ul>${SCHOOLS.map(
          (s) =>
            `<li>${esc(s.name)} — <a href="${s.officialUrl}" rel="nofollow noopener" target="_blank">${esc(s.officialUrl)}</a></li>`,
        ).join('')}</ul>`,
        faqBlock('cau-truc-de-thi'),
        relatedBlock([{ to: href('de-thi'), label: 'Làm thử đề chuẩn cấu trúc' }]),
      ].join('');

    case 'de-thi':
      return [
        p(
          `${EXAM_PAPERS.length} đề thi thử trọn vẹn, mỗi đề dựng đúng ma trận của một kỳ thi. Mỗi câu có lời giải từng bước, barem chấm tới 0,25 điểm và bảng phân tích dạng bài.`,
        ),
        `<ul>${EXAM_PAPERS.map((x) => {
          const school = SCHOOLS.find((s) => s.id === x.schoolId);
          return `<li>${link(href('de-thi-detail', { slug: paperSlug(x.id) }), x.title)} — ${esc(school?.shortName ?? '')}, ${x.minutes} phút, thang ${x.totalPoints}, ${paperItems(x).length} câu. ${esc(x.subtitle)}</li>`;
        }).join('')}</ul>`,
        h2('Đây là đề mẫu, không phải đề thi thật'),
        p(
          'Đề do MATH365 biên soạn theo cấu trúc thống kê của các mùa thi gần đây, dùng để luyện tập và tự chẩn đoán. Cấu trúc đề chính thức có thể thay đổi giữa các mùa — luôn đối chiếu với công bố mới nhất.',
        ),
        faqBlock('de-thi'),
      ].join('');

    case 'de-thi-detail': {
      const paper = paperById(paperIdFromSlug(params.slug));
      if (!paper) return '';
      const items = paperItems(paper);
      return [
        p(`${paper.subtitle}. Thời gian ${paper.minutes} phút, thang điểm ${paper.totalPoints}, ${items.length} câu.`),
        h2('Đề này bám cấu trúc thật ở chỗ nào'),
        ul(paper.fidelity),
        h2('Cấu trúc đề'),
        `<ul>${paper.parts
          .map(
            (part) =>
              `<li><strong>${esc(part.label)} — ${part.points} điểm</strong>: ${esc(part.note)}<ul>${part.items
                .map((it) => `<li>${esc(it.label)} (${it.points} điểm, ${it.minutes} phút) — ${esc(it.analysis.dang)}</li>`)
                .join('')}</ul></li>`,
          )
          .join('')}</ul>`,
        h2('Một câu ví dụ kèm lời giải'),
        items[0]
          ? `<article>${h3(items[0].label)}${p(items[0].statement.replace(/\n/g, ' '))}${p(`Đáp án: ${items[0].answer}`)}<ol>${items[0].solution
              .map((s) => `<li>${esc(s)}</li>`)
              .join('')}</ol>${h3('Barem chấm')}<ul>${items[0].barem
              .map((b) => `<li>${esc(b.item)} — ${b.point} điểm</li>`)
              .join('')}</ul></article>`
          : '',
        h2('Kế hoạch thời gian trong phòng thi'),
        ul(paper.timePlan.map((t) => `Phút ${t.minutes} — ${t.phase}: ${t.action}`)),
        h2('Lưu ý chấm bài'),
        ul(paper.gradingNotes),
        relatedBlock([
          { to: href('de-thi'), label: 'Tất cả đề thi thử có lời giải' },
          { to: href('cau-truc-de-thi'), label: 'Ma trận gốc của kỳ thi này' },
        ]),
      ].join('');
    }

    case 'cong-thuc':
      return [
        p(
          'Mỗi công thức trả lời ba câu: viết thế nào kèm điều kiện áp dụng, dùng khi nào theo dấu hiệu trong đề, và sai ở đâu. Mục có dấu sao là công thức bắt buộc thuộc lòng.',
        ),
        FORMULA_GROUPS.map(
          (g) =>
            `<section>${h2(g.name)}${p(g.intro)}<ul>${g.items
              .map(
                (i) =>
                  `<li><strong>${i.star ? '★ ' : ''}${esc(i.name)}</strong>: <code>${esc(i.expr)}</code>${i.condition ? ` — Điều kiện: ${esc(i.condition)}` : ''}. Dùng khi: ${esc(i.use)}${i.trap ? ` Bẫy: ${esc(i.trap)}` : ''}</li>`,
              )
              .join('')}</ul></section>`,
        ).join(''),
        faqBlock('cong-thuc'),
      ].join('');

    case 'bi-kip':
      return [
        p('Kỹ thuật giải toán chỉ là một nửa. Nửa còn lại là cách học: gặp lại kiến thức đúng lúc, sửa đúng lỗi, giữ nhịp đều đặn.'),
        h2('Bí kíp phòng thi và luyện tập'),
        `<ul>${TIPS.map((t) => `<li><strong>${esc(t.title)}</strong> — ${esc(t.body)}</li>`).join('')}</ul>`,
        h2('Thói quen luyện tập'),
        `<ul>${HABITS.map((h) => `<li><strong>${esc(h.name)}</strong> (${esc(h.cadence)}, ${h.minutes} phút) — ${esc(h.why)}</li>`).join('')}</ul>`,
        h2('Phương pháp học'),
        `<ul>${METHODS.map((m) => `<li><strong>${esc(m.name)}</strong> — ${esc(m.principle)}</li>`).join('')}</ul>`,
        faqBlock('bi-kip'),
      ].join('');

    case 'lo-trinh':
      return [
        p('Lộ trình không cố định sẵn mà sinh ra từ dữ liệu làm bài thật: bạn sai ở đâu, sai bao lâu rồi, và chuyên đề đó nặng bao nhiêu trong đề thi.'),
        h2('Bốn giai đoạn theo số ngày còn lại'),
        ul([
          'Nền tảng — còn trên 120 ngày: xây nền thật chắc, không vội nhảy vào đề thi.',
          'Tăng tốc — còn 45 đến 120 ngày: bám nhóm 20/80 và giữ nhịp phiếu nâng cao.',
          'Tổng duyệt — còn 15 đến 45 ngày: mỗi tuần ít nhất một đề mẫu trọn vẹn, làm đúng giờ như thi thật.',
          'Nước rút — còn dưới 15 ngày: không học kiến thức mới, mỗi ngày một đề tính giờ, chỉ sửa lỗi lặp lại.',
        ]),
        h2('Cách xếp thứ tự chuyên đề'),
        p(
          'Hệ thống xếp hạng theo công thức: tần suất ra đề nhân với mật độ lỗi nhân với độ mới của lỗi nhân với độ phù hợp mức độ, rồi đánh dấu nhóm 20% chuyên đề tạo ra phần lớn điểm số.',
        ),
        h2('Quy tắc thăng cấp'),
        ul([
          'Đạt KPI từ 90% ở hai phiếu cùng mức độ thì mở khoá mức độ kế tiếp.',
          'Đạt chuẩn ở 15 nhiệm vụ của một giai đoạn, với KPI trung bình năm lượt gần nhất từ 90%, thì mở khoá giai đoạn mới.',
        ]),
        h2('Lịch ôn lại chống quên'),
        p('Mỗi phiếu đã làm được xếp lịch gặp lại vào ngày thứ 1, 3, 7 và 21. Qua đủ bốn mốc thì dạng bài coi như đã thành phản xạ.'),
        faqBlock('lo-trinh'),
      ].join('');

    case 'kho-tai-lieu':
      return [
        p('Tài liệu nhiều không giúp gì nếu không biết lấy cái nào lúc nào. Kho được tổ chức theo tầng năng lực của người học.'),
        `<ul>${LIBRARY_TREE.map(
          (f) =>
            `<li><strong>${esc(f.code)} · ${esc(f.name)}</strong> — ${esc(f.purpose)}${f.children?.length ? `<ul>${f.children.map((c) => `<li>${esc(c.code)} · ${esc(c.name)}</li>`).join('')}</ul>` : ''}</li>`,
        ).join('')}</ul>`,
      ].join('');

    case 'mo-thuc-gita':
      return [
        p('GITA không phải khẩu hiệu mà là bốn trụ cột có tín hiệu nhận diện riêng, xuất hiện xuyên suốt từ thư mục tài liệu tới quy trình, giải pháp, chiến lược và thói quen hằng ngày.'),
        PILLARS.map(
          (x) =>
            `<section>${h2(`${x.letter} · ${x.name}`)}${p(x.question)}${p(x.principle)}${x.actions
              .map((a) => `${h3(a.role)}${ul(a.items)}`)
              .join('')}${h3('Đo bằng gì')}${ul(x.kpi)}</section>`,
        ).join(''),
      ].join('');

    case 'hoc-vien':
      return [
        p('Tài liệu dành cho giáo viên và coach: khung buổi dạy chia tới từng khối thời gian, có dấu hiệu quan sát được cho biết khối đó đã đạt.'),
        LESSON_PLANS.map(
          (pl) =>
            `<section>${h2(pl.name)}${p(pl.goal)}${h3('Chuẩn bị trước buổi')}${ul(pl.prepare)}${h3('Các khối thời gian')}<ul>${pl.blocks
              .map(
                (b) =>
                  `<li><strong>${esc(b.name)} — ${b.minutes} phút</strong>: ${esc(b.purpose)} Dấu hiệu đạt: ${esc(b.success)} Lỗi hay mắc: ${esc(b.pitfall)}</li>`,
              )
              .join('')}</ul>${h3('Giao về nhà')}${ul(pl.homework)}</section>`,
        ).join(''),
        faqBlock('hoc-vien'),
      ].join('');

    case 'nguon-phuong-phap':
      return [
        p('Trang này tồn tại để bạn kiểm chứng được chúng tôi, không phải để thuyết phục bạn.'),
        h2('Nội dung được làm ra như thế nào'),
        ul([
          `Cấu trúc đề và ma trận: tổng hợp từ đề thi chính thức, đề tham khảo và thông tin tuyển sinh các năm gần đây của ${SCHOOLS.length} kỳ thi và trường.`,
          `Câu hỏi luyện tập: ${catalogStats().items.toLocaleString('vi-VN')} câu sinh từ ${catalogStats().generators} bộ sinh đề tham số hoá có hạt giống cố định; đáp án được tính ra chứ không chép tay.`,
          `Đề mẫu và công thức: biên soạn thủ công, đối chiếu với ma trận gốc về số phần, điểm từng phần, thang điểm và thời gian.`,
        ]),
        h2('Nội dung được kiểm tra bằng cách nào'),
        p('Mỗi lần dựng bản mới, một bộ kiểm tra tự động chạy qua toàn bộ kho nội dung. Bản dựng bị chặn nếu có bất kỳ lỗi nào.'),
        h2('Nguồn công bố chính thức'),
        `<ul>${SCHOOLS.map(
          (s) => `<li>${esc(s.name)} — <a href="${s.officialUrl}" rel="nofollow noopener" target="_blank">${esc(s.officialUrl)}</a></li>`,
        ).join('')}</ul>`,
        h2('Những điều chúng tôi không cam kết'),
        ul([
          'Không cam kết đỗ. Bất kỳ nơi nào cam kết đỗ đều nên khiến bạn thận trọng.',
          'Không dự đoán đề thi. Đề mẫu bám cấu trúc thống kê, không bám nội dung năm nay.',
          'Không thay thế giáo viên. Hệ thống đo và định hướng; việc dạy vẫn cần con người.',
          'Không thu thập dữ liệu học tập của bạn. Tiến độ lưu ngay trên trình duyệt.',
          'Không đăng đánh giá sao nếu chưa có đánh giá thật của người dùng thật.',
        ]),
        faqBlock('nguon-phuong-phap'),
      ].join('');

    case 'nhan-dien':
      return [
        p('Nguồn chân lý duy nhất cho logo, màu, chữ, giọng điệu và quy chuẩn tài liệu của toàn hệ thống.'),
        h2('Giọng điệu nội dung'),
        ul(BRAND.promise ? [BRAND.tagline, BRAND.promise] : []),
      ].join('');

    case 'phan-quyen':
      return [p('Tám vai trò trong ba nhóm học viên, giáo viên và quản trị, gắn với năm cấp độ chuyên môn P1 đến P5.')].join('');

    default:
      return '';
  }
}

/* ---------------- Dựng tệp HTML ---------------- */

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

function headFor(pageId: PageId, params: Record<string, string>, url: string) {
  const m = seoFor(pageId, params);
  const og = `${SITE.origin}/og-image.svg`;
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />`,
    `<link rel="canonical" href="${m.canonical}" />`,
    `<meta property="og:type" content="${pageId === 'home' ? 'website' : 'article'}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${m.canonical}" />`,
    `<meta property="og:image" content="${og}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
    ...m.jsonLd.map(
      (b) => `<script type="application/ld+json" data-seo-ld>${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`,
    ),
  ];
  void url;
  return { tags: tags.join('\n    '), meta: m };
}

function shell(pageId: PageId, params: Record<string, string>) {
  const { tags, meta } = headFor(pageId, params, `${SITE.origin}${href(pageId, params)}`);
  const crumbs = meta.breadcrumbs
    .map((c, i) => (i === meta.breadcrumbs.length - 1 ? `<span>${esc(c.label)}</span>` : `${link(c.path, c.label)} ›`))
    .join(' ');
  const body = bodyFor(pageId, params);

  /*
   * Nội dung tĩnh nằm trong #root và bị React thay thế ngay khi ứng dụng khởi
   * động. Điều quan trọng: nội dung này được dựng từ đúng các mô-đun dữ liệu mà
   * ứng dụng dùng, nên bản tĩnh và bản tương tác luôn nói cùng một điều.
   */
  /*
   * Chân trang tĩnh: xuất hiện trên mọi trang nên là con đường ngắn nhất để công
   * cụ tìm kiếm đi từ bất kỳ đâu tới mọi khu vực nội dung chính, kể cả khi không
   * chạy JavaScript.
   */
  const footerLinks = [
    { to: href('chuyen-de'), label: 'Chuyên đề Toán' },
    { to: href('de-thi'), label: 'Đề thi thử có lời giải' },
    { to: href('cau-truc-de-thi'), label: 'Cấu trúc và ma trận đề thi' },
    { to: href('cong-thuc'), label: 'Sổ tay công thức Toán' },
    { to: href('lo-trinh'), label: 'Lộ trình ôn thi' },
    { to: href('bi-kip'), label: 'Bí kíp và thói quen học' },
    { to: href('mo-thuc-gita'), label: 'Mô thức huấn luyện GITA' },
    { to: href('kho-tai-lieu'), label: 'Kho tài liệu' },
    { to: href('hoc-vien'), label: 'Học viện giáo viên' },
    { to: href('nguon-phuong-phap'), label: 'Nguồn và phương pháp biên soạn' },
  ].filter((l) => l.to !== href(pageId, params));

  const staticHtml = `<div class="prerender">
      <nav aria-label="Đường dẫn phân cấp">${crumbs}</nav>
      <h1>${esc(meta.h1)}</h1>
      <p>${esc(meta.intro)}</p>
      ${body}
      <hr />
      <nav aria-label="Khu vực nội dung chính"><ul>${footerLinks
        .map((l) => `<li>${link(l.to, l.label)}</li>`)
        .join('')}</ul></nav>
      <p><small>${esc(BRAND.fullName)} · Cập nhật ${SITE.updated.split('-').reverse().join('/')}. Dữ liệu học tập được lưu trên trình duyệt của bạn. Thông tin kỳ thi mang tính tham khảo — luôn đối chiếu với công bố chính thức của Bộ GD&amp;ĐT, Sở GD&amp;ĐT Hà Nội và từng trường trước mỗi mùa thi. Đề mẫu do MATH365 biên soạn theo cấu trúc thống kê, không phải đề thi thật. Chúng tôi không cam kết kết quả thi.</small></p>
    </div>`;

  let html = template;
  /* Thay toàn bộ phần đầu tài liệu do Vite sinh bằng phần đầu riêng của trang. */
  html = html.replace(/<title>[\s\S]*?<\/title>/, '');
  html = html.replace(/<meta\s+name="description"[\s\S]*?\/>/, '');
  html = html.replace('</head>', `  ${tags}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${staticHtml}</div>`);
  return html;
}

/* ---------------- Chạy ---------------- */

const targets = allIndexablePaths();
let written = 0;

for (const t of targets) {
  const { id, params } = matchRoute(t.path);
  const html = shell(id, params);
  const dir = t.path === '/' ? DIST : path.join(DIST, t.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  written++;
}

/* Sơ đồ trang */
const urls = targets
  .map(
    (t) =>
      `  <url>\n    <loc>${SITE.origin}${t.path === '/' ? '/' : t.path}</loc>\n    <lastmod>${SITE.updated}</lastmod>\n    <changefreq>${t.page.changefreq}</changefreq>\n    <priority>${t.page.priority.toFixed(1)}</priority>\n  </url>`,
  )
  .join('\n');

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  'utf8',
);

/* Tệp robots */
fs.writeFileSync(
  path.join(DIST, 'robots.txt'),
  [
    '# MATH365 · GITA365',
    'User-agent: *',
    'Allow: /',
    '',
    '# Trang phụ thuộc dữ liệu cá nhân, không có giá trị với người tìm kiếm',
    'Disallow: /hom-nay',
    'Disallow: /tien-do',
    'Disallow: /ho-so-hoc-vien',
    'Disallow: /bao-cao-gia-dinh',
    'Disallow: /quan-ly-lop',
    'Disallow: /lam-phieu/',
    'Disallow: /loi-giai/',
    'Disallow: /tim-kiem',
    'Disallow: /seo',
    '',
    `Sitemap: ${SITE.origin}/sitemap.xml`,
    '',
  ].join('\n'),
  'utf8',
);

/* Ảnh chia sẻ mạng xã hội */
fs.writeFileSync(
  path.join(DIST, 'og-image.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="10" fill="#1B4F9C"/>
  <g transform="translate(96,150)">
    <g transform="rotate(-24 104 62)">
      <path d="M104 20 a72 34 0 0 1 0 84" fill="none" stroke="#2E6FBF" stroke-width="11" stroke-linecap="round"/>
      <path d="M104 104 a72 34 0 0 1 0 -84" fill="none" stroke="#E01B24" stroke-width="11" stroke-linecap="round"/>
    </g>
    <text x="46" y="82" fill="#1B4F9C" font-family="sans-serif" font-size="52" font-weight="800" letter-spacing="1.5">GITA</text>
  </g>
  <text x="96" y="360" fill="#0F172A" font-family="sans-serif" font-size="64" font-weight="800">MATH365 · Luyện thi Toán</text>
  <text x="96" y="430" fill="#334155" font-family="sans-serif" font-size="34">Toán chuyên · Toán vào 10 · Toán THPT 10–12</text>
  <text x="96" y="486" fill="#64748B" font-family="sans-serif" font-size="28">${esc(BRAND.tagline)}</text>
  <rect x="96" y="530" width="180" height="6" rx="3" fill="#E01B24"/>
</svg>
`,
  'utf8',
);

console.log(`dựng sẵn: ${written} trang HTML tĩnh`);
console.log(`sơ đồ trang: ${targets.length} địa chỉ`);
console.log('đã ghi: sitemap.xml, robots.txt, og-image.svg');
