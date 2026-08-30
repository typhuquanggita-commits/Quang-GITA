import { go } from '@/state';
import {
  SYLLABI,
  syllabusById,
  syllabusStats,
  matrixTotal,
  TERM_LABEL,
  type Syllabus,
  type SyllabusTerm,
} from '@/data/syllabus';
import { href, syllabusSlug } from '@/lib/routes';
import { Card, SectionTitle, Badge, Callout, Empty, Lnk } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { faqFor } from '@/data/faq';

const MUC_LABEL: Record<string, { label: string; color: string }> = {
  'nhan-biet': { label: 'Nhận biết', color: '#0d9488' },
  'thong-hieu': { label: 'Thông hiểu', color: '#1B4F9C' },
  'van-dung': { label: 'Vận dụng', color: '#F0A21B' },
  'van-dung-cao': { label: 'Vận dụng cao', color: '#E01B24' },
};

const TERM_ORDER: SyllabusTerm[] = ['giua-ky-1', 'cuoi-ky-1', 'giua-ky-2', 'cuoi-ky-2', 'ca-nam', 'on-he'];

/* ============================================================
   DANH SÁCH ĐỀ CƯƠNG
   ============================================================ */

export function SyllabusList() {
  const st = syllabusStats();

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Luồng chính khoá"
        title="Đề cương ôn tập Toán theo kỳ"
        desc="Mỗi đề cương trả lời năm câu hỏi: kỳ này thi những gì và tỉ trọng ra sao, bản đồ kiến thức trông thế nào, có bao nhiêu dạng bài và đọc vị bằng dấu hiệu gì, ôn theo trình tự nào, và tự kiểm bằng danh mục nào trước hôm kiểm tra."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: 'Đề cương', v: String(st.total) },
          { k: 'Dạng bài có đọc vị', v: String(st.types) },
          { k: 'Nhánh sơ đồ tư duy', v: String(st.branches) },
          { k: 'Mục tự kiểm', v: String(st.checks) },
        ].map((x) => (
          <Card key={x.k} className="p-4">
            <div className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">{x.k}</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">{x.v}</div>
          </Card>
        ))}
      </div>

      <Callout tone="amber" title="Ma trận ở đây là ma trận tham chiếu">
        Ma trận trong mỗi đề cương được dựng theo Thông tư 22/2021/TT-BGDĐT và mặt bằng chung của đề
        kiểm tra định kỳ. Đây <strong>không phải</strong> ma trận chính thức của một trường cụ thể —
        mỗi trường tự ra đề. Hãy đối chiếu với ma trận do tổ chuyên môn của trường công bố trước khi
        dùng làm kế hoạch ôn.
      </Callout>

      {st.grades.map((grade) => {
        const items = SYLLABI.filter((s) => s.grade === grade).sort(
          (a, b) => TERM_ORDER.indexOf(a.term) - TERM_ORDER.indexOf(b.term),
        );
        return (
          <section key={grade}>
            <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">Toán lớp {grade}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {items.map((s) => (
                <Card key={s.id} className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                      style={{ background: TERM_LABEL[s.term].color }}
                    >
                      {TERM_LABEL[s.term].short}
                    </span>
                    <Badge tone="slate">{s.minutes} phút</Badge>
                    <Badge tone="brand">{s.keyTypes.length} dạng bài</Badge>
                  </div>
                  <Lnk
                    to={href('de-cuong-detail', { slug: syllabusSlug(s.id) })}
                    className="mt-2 block text-[15px] font-extrabold text-slate-900 hover:text-brand"
                  >
                    {s.title}
                  </Lnk>
                  <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{s.format}</div>
                  <ul className="mt-2 space-y-1">
                    {s.scope.slice(0, 2).map((x) => (
                      <li key={x} className="text-[12.5px] leading-relaxed text-slate-700">
                        · {x.split(':')[0]}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-3 text-[12px] text-slate-500">
                    <span>{s.mindmap.length} nhánh sơ đồ tư duy</span>
                    <span>{s.plan.length} tuần kế hoạch</span>
                    <span>{s.selfCheck.length} mục tự kiểm</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        );
      })}

      <Faq items={faqFor('de-cuong')} />
    </div>
  );
}

/* ============================================================
   CHI TIẾT MỘT ĐỀ CƯƠNG
   ============================================================ */

function MatrixTable({ s }: { s: Syllabus }) {
  const total = matrixTotal(s);
  const col = (key: keyof Pick<Syllabus['matrix'][number], 'nhanBiet' | 'thongHieu' | 'vanDung' | 'vanDungCao'>) =>
    s.matrix.reduce((a, r) => a + r[key], 0);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-[12.5px]">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="py-2 pr-3 font-semibold">Nội dung</th>
            <th className="py-2 px-2 text-center font-semibold">Nhận biết</th>
            <th className="py-2 px-2 text-center font-semibold">Thông hiểu</th>
            <th className="py-2 px-2 text-center font-semibold">Vận dụng</th>
            <th className="py-2 px-2 text-center font-semibold">Vận dụng cao</th>
            <th className="py-2 pl-2 text-center font-semibold">Tổng</th>
          </tr>
        </thead>
        <tbody>
          {s.matrix.map((r) => {
            const sum = r.nhanBiet + r.thongHieu + r.vanDung + r.vanDungCao;
            return (
              <tr key={r.topic} className="border-b border-slate-100">
                <td className="py-2 pr-3 font-semibold text-slate-800">{r.topic}</td>
                <td className="py-2 px-2 text-center text-slate-700">{r.nhanBiet || '—'}</td>
                <td className="py-2 px-2 text-center text-slate-700">{r.thongHieu || '—'}</td>
                <td className="py-2 px-2 text-center text-slate-700">{r.vanDung || '—'}</td>
                <td className="py-2 px-2 text-center text-slate-700">{r.vanDungCao || '—'}</td>
                <td className="py-2 pl-2 text-center font-bold text-slate-900">{sum}</td>
              </tr>
            );
          })}
          <tr className="bg-slate-50">
            <td className="py-2 pr-3 font-extrabold text-slate-900">Tổng</td>
            <td className="py-2 px-2 text-center font-bold">{col('nhanBiet')}</td>
            <td className="py-2 px-2 text-center font-bold">{col('thongHieu')}</td>
            <td className="py-2 px-2 text-center font-bold">{col('vanDung')}</td>
            <td className="py-2 px-2 text-center font-bold">{col('vanDungCao')}</td>
            <td className="py-2 pl-2 text-center font-extrabold text-brand">{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function SyllabusView({ id }: { id: string }) {
  const s = syllabusById(id);
  if (!s) {
    return (
      <Empty
        title="Không tìm thấy đề cương"
        desc="Đề cương này có thể đã đổi địa chỉ."
        action={
          <button className="btn btn-primary text-sm" onClick={() => go(href('de-cuong'))}>
            Về danh sách đề cương
          </button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow={`Toán ${s.grade} · ${TERM_LABEL[s.term].label}`}
        title={s.title}
        desc={`Bài kiểm tra ${s.minutes} phút — ${s.format}.`}
      />

      {/* 1. Phạm vi */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">1. Phạm vi kiến thức</h2>
        <Card className="p-5">
          <ul className="space-y-2">
            {s.scope.map((x) => (
              <li key={x} className="text-[13px] leading-relaxed text-slate-700">
                · {x}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* 2. Ma trận */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">2. Ma trận tham chiếu theo bốn mức độ</h2>
        <Card className="p-5">
          <MatrixTable s={s} />
          <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-[12.5px] leading-relaxed text-amber-900">
            Ma trận dựng theo Thông tư 22/2021/TT-BGDĐT và mặt bằng chung, không phải ma trận chính
            thức của một trường cụ thể. Hãy đối chiếu với thông báo của tổ chuyên môn trường bạn.
          </div>
        </Card>
      </section>

      {/* 3. Phải thuộc */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">3. Công thức và định lí phải thuộc</h2>
        <Card className="p-5">
          <div className="mb-2 text-[12.5px] text-slate-600">
            Đây là danh sách tối thiểu phải viết được ra giấy trắng, không tra cứu.
          </div>
          <ul className="space-y-1.5">
            {s.mustKnow.map((x) => (
              <li key={x} className="rounded-lg bg-slate-50 px-3 py-2 font-mono text-[12.5px] leading-relaxed text-slate-800">
                {x}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* 4. Sơ đồ tư duy */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">4. Sơ đồ tư duy tổng hợp kiến thức</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {s.mindmap.map((b) => (
            <Card key={b.branch} className="p-5">
              <div className="text-[14px] font-extrabold text-slate-900">{b.branch}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {b.nodes.map((n) => (
                  <span key={n} className="rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-semibold text-slate-700">
                    {n}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                <span className="font-bold text-slate-900">Dùng để: </span>
                {b.useFor}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Sơ đồ đọc vị dạng bài */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">
          5. Dạng bài trọng tâm — sơ đồ đọc vị và phương pháp
        </h2>
        <div className="space-y-3">
          {s.keyTypes.map((t) => (
            <Card key={t.name} className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                  style={{ background: MUC_LABEL[t.muc].color }}
                >
                  {MUC_LABEL[t.muc].label}
                </span>
                <div className="text-[15px] font-extrabold text-slate-900">{t.name}</div>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <div className="text-[12px] font-bold uppercase tracking-wide text-slate-500">
                    Đọc vị đề — dấu hiệu nhận ra dạng
                  </div>
                  <ul className="mt-1 space-y-1">
                    {t.docVi.map((x) => (
                      <li key={x} className="text-[12.5px] leading-relaxed text-slate-700">
                        · {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[12px] font-bold uppercase tracking-wide text-slate-500">
                    Quy trình giải chuẩn
                  </div>
                  <ol className="mt-1 space-y-1">
                    {t.method.map((x, i) => (
                      <li key={x} className="text-[12.5px] leading-relaxed text-slate-700">
                        {i + 1}. {x}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-[12.5px] leading-relaxed text-rose-900">
                <span className="font-bold">Bẫy mất điểm: </span>
                {t.trap}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. Kế hoạch ôn */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">6. Kế hoạch ôn theo tuần</h2>
        <div className="space-y-2">
          {s.plan.map((w) => (
            <Card key={w.week} className="p-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <Badge tone="brand">{w.week}</Badge>
                <div className="text-[13.5px] font-bold text-slate-900">{w.focus}</div>
              </div>
              <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
                <span className="font-bold text-slate-900">Sản phẩm phải có: </span>
                {w.output}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. Tự kiểm */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">7. Danh mục tự kiểm trước hôm kiểm tra</h2>
        <Card className="p-5">
          <ul className="space-y-2">
            {s.selfCheck.map((x) => (
              <li key={x} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                <span className="mt-0.5 shrink-0 text-slate-400">☐</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* 8. Đọc điểm */}
      <section>
        <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">8. Đọc điểm và việc tiếp theo</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {s.targets.map((t) => (
            <Card key={t.band} className="p-5">
              <div className="text-[14px] font-extrabold text-slate-900">{t.band}</div>
              <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{t.meaning}</div>
              <div className="mt-2 text-[12.5px] leading-relaxed text-slate-800">
                <span className="font-bold">Việc tiếp theo: </span>
                {t.next}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <button className="btn btn-ghost text-sm" onClick={() => go(href('de-cuong'))}>
          Xem toàn bộ đề cương
        </button>
        <button className="btn btn-ghost text-sm" onClick={() => go(href('chuyen-de'))}>
          Vào kho chuyên đề
        </button>
        <button className="btn btn-ghost text-sm" onClick={() => go(href('de-thi'))}>
          Luyện đề có lời giải
        </button>
      </div>
    </div>
  );
}
