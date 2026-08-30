import { go } from '@/state';
import { BRAND } from '@/data/brand';
import { SCHOOLS } from '@/data/schools';
import { BLUEPRINTS } from '@/data/blueprints';
import { RESOURCES } from '@/data/resources';
import { catalogStats } from '@/data/catalog';
import { formulaStats } from '@/data/formulas';
import { EXAM_PAPERS } from '@/data/papers';
import { TOPICS } from '@/data/topics';
import { faqFor } from '@/data/faq';
import { SITE } from '@/lib/seo';
import { href } from '@/lib/routes';
import { Card, SectionTitle, Badge, Callout } from '@/components/ui';
import { GitaLogo } from '@/components/Logo';
import { Faq } from '@/components/Faq';
import {
  REFERENCE_SOURCES,
  CONTENT_GAPS,
  sourceStats,
  ACCESS_LABEL,
  KIND_LABEL,
  GAP_STATUS_LABEL,
} from '@/data/sources';

/**
 * Trang minh bạch nguồn và phương pháp.
 *
 * Với nội dung giáo dục, thứ quyết định niềm tin của cả người đọc lẫn công cụ
 * tìm kiếm không phải là số lượng bài viết mà là bốn câu trả lời được kiểm
 * chứng: nội dung lấy từ đâu, kiểm tra bằng cách nào, ai chịu trách nhiệm, và
 * sai thì sửa ra sao. Trang này trả lời cả bốn.
 */

const official = RESOURCES.filter((r) => r.official);

export default function Sources() {
  const st = catalogStats();
  const fs = formulaStats();
  const src = sourceStats();

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Minh bạch"
        title="Nguồn, phương pháp biên soạn và chính sách nội dung"
        desc="Trang này tồn tại để bạn kiểm chứng được chúng tôi, không phải để thuyết phục bạn. Nó nói rõ nội dung lấy từ đâu, kiểm tra bằng cách nào, phần nào có thể sai và chúng tôi sửa ra sao."
      />

      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <GitaLogo size={44} />
          <div className="min-w-0 flex-1">
            <div className="text-[16px] font-extrabold text-slate-900">
              {BRAND.fullName}
            </div>
            <div className="mt-0.5 text-[13px] text-slate-600">{BRAND.promise}</div>
          </div>
          <div className="text-right text-[12px] text-slate-500">
            <div>Cập nhật nội dung gần nhất</div>
            <div className="font-bold text-slate-800">{SITE.updated.split('-').reverse().join('/')}</div>
          </div>
        </div>
      </Card>

      {/* 1. Nội dung được làm ra thế nào */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">
          1. Nội dung được làm ra như thế nào
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              t: 'Cấu trúc đề và ma trận',
              d: `${BLUEPRINTS.length} ma trận đề được tổng hợp từ đề thi chính thức, đề tham khảo và thông tin tuyển sinh các năm gần đây của ${SCHOOLS.length} kỳ thi và trường. Mỗi trường có đường dẫn tới trang công bố chính thức ngay trong hệ thống.`,
              risk: 'Quy chế và định dạng đề có thể thay đổi giữa các mùa thi. Đây là phần có rủi ro lỗi thời cao nhất.',
            },
            {
              t: 'Câu hỏi luyện tập',
              d: `${st.items.toLocaleString('vi-VN')} câu được sinh từ ${st.generators} bộ sinh đề tham số hoá có hạt giống cố định. Đáp án được tính ra từ tham số chứ không chép tay, nên không thể sai lệch giữa đề và đáp án. Phương án nhiễu được dựng từ lỗi sai điển hình.`,
              risk: 'Câu sinh tự động có thể ra tình huống hiếm gặp trong thực tế đề thi. Mọi câu đều được kiểm tra tự động mỗi lần build.',
            },
            {
              t: 'Đề mẫu, lời giải và công thức',
              d: `${EXAM_PAPERS.length} đề mẫu trọn vẹn và ${fs.items} công thức được biên soạn thủ công, đối chiếu với ma trận gốc về số phần, điểm từng phần, thang điểm và thời gian.`,
              risk: 'Đề mẫu là đề do MATH365 biên soạn theo cấu trúc thống kê, không phải đề thi thật và không nhằm dự đoán đề thật.',
            },
          ].map((c) => (
            <Card key={c.t} className="p-5">
              <div className="text-[14px] font-extrabold text-slate-900">{c.t}</div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">{c.d}</p>
              <div className="mt-2.5 rounded-lg bg-amber-50 px-3 py-2 text-[12px] leading-relaxed text-amber-900">
                <b>Rủi ro đã biết: </b>
                {c.risk}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 2. Kiểm tra tự động */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">
          2. Nội dung được kiểm tra bằng cách nào
        </h2>
        <Card className="p-5">
          <p className="text-[13px] leading-relaxed text-slate-600">
            Mỗi lần dựng bản mới, một bộ kiểm tra tự động chạy qua toàn bộ kho nội dung. Bản dựng bị
            chặn nếu có bất kỳ lỗi nào trong danh sách dưới đây. Đây là lí do các con số trên trang
            chủ là con số thật, không phải con số quảng cáo.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              `Sinh đủ ${st.items.toLocaleString('vi-VN')} câu hỏi và kiểm tra từng câu: đủ 4 phương án phân biệt, có lời giải từng bước, không chứa giá trị lỗi.`,
              'Không có câu nào lặp lại trong cùng một phiếu.',
              `Cả ${st.generators} dạng bài đều có hồ sơ phân tích chuyên sâu đi kèm.`,
              `Cả ${EXAM_PAPERS.length} đề mẫu khớp ma trận gốc về số phần, điểm từng phần, thang điểm, thời gian và tổng thời lượng các câu.`,
              'Barem của mỗi câu cộng đủ đúng số điểm của câu đó; câu đúng/sai dùng đúng thang luỹ tiến.',
              'Mọi công thức có biểu thức, có phần “dùng khi nào”, không trùng tên trong cùng nhóm.',
              'Mọi mã chuyên đề được tham chiếu đều tồn tại thật.',
              'Chỉ số tìm kiếm không trùng mã và mọi đường dẫn đều hợp lệ.',
            ].map((x) => (
              <div key={x} className="flex gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[12.5px] leading-relaxed text-slate-700">
                <span className="font-bold text-emerald-600">✓</span>
                <span>{x}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* 3. Nguồn chính thức */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">
          3. Nguồn công bố chính thức
        </h2>
        <Callout tone="amber" title="Luôn đối chiếu trước mỗi mùa thi">
          Thông tin kỳ thi trên MATH365 mang tính tham khảo. Trước khi chốt kế hoạch ôn, hãy kiểm tra
          công bố mới nhất tại chính nguồn dưới đây.
        </Callout>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {SCHOOLS.map((s) => (
            <a
              key={s.id}
              className="card block p-4 transition hover:border-brand-300"
              href={s.officialUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[13.5px] font-bold text-slate-900">{s.name}</div>
                  <div className="mt-0.5 text-[12px] text-slate-500">{s.org}</div>
                </div>
                <span className="shrink-0 text-[11px] font-semibold text-brand-600">Nguồn ↗</span>
              </div>
              <div className="mt-1.5 truncate font-mono text-[11px] text-slate-400">{s.officialUrl}</div>
            </a>
          ))}
        </div>
        {official.length > 0 && (
          <div className="mt-4">
            <div className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Tài liệu chính thức khác được tham chiếu
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {official.map((r) => (
                <Badge key={r.id} tone="slate">
                  {r.title}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4. Ai chịu trách nhiệm */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">
          4. Ai chịu trách nhiệm về nội dung
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <div className="text-[14px] font-extrabold text-slate-900">Quy trình duyệt nội dung</div>
            <ol className="mt-2.5 space-y-2">
              {[
                'Người biên soạn ở cấp độ chuyên môn P3 trở lên viết bản đầu, kèm nguồn đối chiếu.',
                'Bộ kiểm tra tự động chạy trên toàn bộ nội dung; bản dựng bị chặn nếu có lỗi.',
                'Chủ nhiệm chuyên môn ở cấp P4 hoặc P5 duyệt về mặt học thuật trước khi phát hành.',
                'Sau khi phát hành, mọi phản hồi về lỗi được xử lý theo chính sách đính chính ở mục 5.',
              ].map((x, i) => (
                <li key={i} className="flex gap-2.5 text-[12.5px] leading-relaxed text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-[10.5px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span>{x}</span>
                </li>
              ))}
            </ol>
            <button className="btn btn-ghost mt-3 px-3 py-1.5 text-[12.5px]" onClick={() => go(href('phan-quyen'))}>
              Xem năm cấp độ chuyên môn P1–P5
            </button>
          </Card>
          <Card className="p-5">
            <div className="text-[14px] font-extrabold text-slate-900">Phạm vi chuyên môn</div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
              Nội dung phủ {TOPICS.length} chuyên đề thuộc chương trình Toán trung học cơ sở và trung
              học phổ thông Việt Nam, cho ba đích đến: thi vào lớp 10 chuyên Toán, thi vào lớp 10
              công lập, và thi tốt nghiệp trung học phổ thông môn Toán.
            </p>
            <div className="mt-3 rounded-lg bg-rose-50 px-3 py-2.5">
              <div className="text-[12.5px] font-bold text-rose-800">Ngoài phạm vi</div>
              <ul className="mt-1 space-y-1">
                {[
                  'Không tư vấn chọn trường hay chọn ngành.',
                  'Không thay thế việc học chính khoá trên lớp.',
                  'Không cung cấp thông tin tuyển sinh mang tính pháp lý — hãy dùng nguồn chính thức.',
                ].map((x) => (
                  <li key={x} className="flex gap-2 text-[12px] leading-relaxed text-rose-900">
                    <span className="font-bold">✕</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. Đính chính */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">
          5. Chính sách đính chính
        </h2>
        <Card className="p-5">
          <p className="text-[13px] leading-relaxed text-slate-600">
            Nội dung Toán học có thể sai, và chúng tôi không giả vờ ngược lại. Nguyên tắc xử lý:
          </p>
          <div className="mt-3 space-y-2">
            {[
              {
                k: 'Lỗi tính toán hoặc lỗi đáp án',
                v: 'Sửa ngay khi xác nhận, không chờ đợt cập nhật. Bộ kiểm tra tự động được bổ sung một trường hợp mới để lỗi cùng loại không tái diễn.',
              },
              {
                k: 'Thông tin kỳ thi lỗi thời',
                v: 'Cập nhật theo công bố chính thức mới nhất, kèm ghi chú thời điểm thay đổi trong phần “ghi chú cập nhật” của ma trận đề.',
              },
              {
                k: 'Nội dung gây hiểu nhầm',
                v: 'Viết lại cho rõ, và nếu cách diễn đạt cũ đã khiến người học làm sai thì bổ sung phần cảnh báo ngay tại chỗ.',
              },
              {
                k: 'Không xoá dấu vết',
                v: 'Nội dung đã sửa không bị xoá lịch sử. Toàn bộ mã nguồn và lịch sử thay đổi được lưu công khai theo từng lần cập nhật.',
              },
            ].map((x) => (
              <div key={x.k} className="rounded-lg border border-slate-200 px-3.5 py-2.5">
                <div className="text-[13px] font-bold text-slate-800">{x.k}</div>
                <div className="mt-0.5 text-[12.5px] leading-relaxed text-slate-600">{x.v}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>


      {/* 6. Đối chiếu với các nguồn tham chiếu */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">
          6. Đối chiếu với các nguồn tham chiếu trong ngành
        </h2>
        <Callout tone="brand" title="Cách đọc bảng này">
          Chúng tôi khảo sát các kho tài liệu, nền tảng học và cộng đồng lớn của thị trường để
          đối chiếu độ phủ, KHÔNG để sao chép nội dung. Cột trạng thái nói thật về giới hạn của
          từng lần khảo sát: có nguồn đọc được trực tiếp, có nguồn chỉ khảo sát gián tiếp qua kết
          quả tìm kiếm, và có nguồn hoàn toàn không truy cập được từ môi trường biên soạn.
        </Callout>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            { k: 'Nguồn đã đối chiếu', v: String(src.total) },
            { k: 'Khảo sát được', v: String(src.surveyed) },
            { k: 'Không truy cập được', v: String(src.blocked) },
          ].map((x) => (
            <Card key={x.k} className="p-4">
              <div className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">{x.k}</div>
              <div className="mt-1 text-2xl font-extrabold text-slate-900">{x.v}</div>
            </Card>
          ))}
        </div>
        <div className="mt-3 space-y-3">
          {REFERENCE_SOURCES.map((s2) => (
            <Card key={s2.url} className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-[15px] font-extrabold text-slate-900">{s2.name}</div>
                <Badge tone="slate">{KIND_LABEL[s2.kind]}</Badge>
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                  style={{ background: ACCESS_LABEL[s2.access].color }}
                >
                  {ACCESS_LABEL[s2.access].label}
                </span>
              </div>
              <div className="mt-1 text-[13px] leading-relaxed text-slate-600">{s2.what}</div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <div className="text-[12px] font-bold uppercase tracking-wide text-slate-500">
                    Nội dung họ phủ
                  </div>
                  <ul className="mt-1 space-y-1">
                    {s2.covers.map((c) => (
                      <li key={c} className="text-[12.5px] leading-relaxed text-slate-700">
                        · {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[12px] font-bold uppercase tracking-wide text-slate-500">
                    MATH365 rút ra được gì
                  </div>
                  <ul className="mt-1 space-y-1">
                    {s2.learned.map((c) => (
                      <li key={c} className="text-[12.5px] leading-relaxed text-slate-700">
                        · {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {s2.caveat && (
                <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-[12.5px] leading-relaxed text-amber-900">
                  Giới hạn khảo sát: {s2.caveat}
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* 7. Khoảng trống nội dung */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">
          7. Khoảng trống nội dung và tiến độ lấp
        </h2>
        <Callout tone="amber" title="Vì sao công khai phần còn thiếu">
          Một hệ thống nói mình đã đủ mọi thứ là một hệ thống không đáng tin. Bảng dưới đây liệt
          kê những chỗ MATH365 phát hiện là còn thiếu sau khi đối chiếu với thị trường, kèm trạng
          thái thật của từng mục — kể cả những mục chưa làm.
        </Callout>
        <div className="mt-3 space-y-3">
          {[...CONTENT_GAPS]
            .sort((a, b) => a.priority - b.priority)
            .map((g) => (
              <Card key={g.title} className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                    style={{ background: GAP_STATUS_LABEL[g.status].color }}
                  >
                    {GAP_STATUS_LABEL[g.status].label}
                  </span>
                  <Badge tone="slate">Ưu tiên {g.priority}</Badge>
                  <div className="text-[15px] font-extrabold text-slate-900">{g.title}</div>
                </div>
                <div className="mt-2 grid gap-2 text-[12.5px] leading-relaxed text-slate-700">
                  <div>
                    <span className="font-bold text-slate-900">Phát hiện từ: </span>
                    {g.foundVia}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Vì sao đáng lấp: </span>
                    {g.why}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Việc đã/sẽ làm: </span>
                    {g.action}
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* 8. Không cam kết */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">
          8. Những điều chúng tôi không cam kết
        </h2>
        <Card className="p-5">
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              'Không cam kết đỗ. Bất kỳ nơi nào cam kết đỗ đều nên khiến bạn thận trọng.',
              'Không dự đoán đề thi. Đề mẫu bám cấu trúc thống kê, không bám nội dung năm nay.',
              'Không hứa một mốc điểm cụ thể. Điểm thi phụ thuộc nhiều yếu tố ngoài phạm vi một nền tảng học tập.',
              'Không thay thế giáo viên. Hệ thống đo và định hướng; việc dạy vẫn cần con người.',
              'Không thu thập dữ liệu học tập của bạn. Tiến độ lưu ngay trên trình duyệt, không gửi đi đâu.',
              'Không đăng đánh giá sao nếu chưa có đánh giá thật của người dùng thật.',
            ].map((x) => (
              <div key={x} className="flex gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[12.5px] leading-relaxed text-slate-700">
                <span className="font-bold text-slate-400">—</span>
                <span>{x}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Faq items={faqFor('nguon-phuong-phap')} />

      <div className="flex flex-wrap gap-2">
        <button className="btn btn-ghost text-sm" onClick={() => go(href('cau-truc-de-thi'))}>
          Xem ma trận đề và nguồn từng kỳ thi
        </button>
        <button className="btn btn-ghost text-sm" onClick={() => go(href('de-thi'))}>
          Xem đề thi thử có lời giải
        </button>
      </div>
    </div>
  );
}
