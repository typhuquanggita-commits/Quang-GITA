/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  ACADEMY_CREED,
  ROOT_PRINCIPLES,
  PYRAMID,
  GITA_MODEL,
  GITA_PHASES,
  NLP_TECHNIQUES,
  ENVIRONMENT_LAYERS,
  ADVISOR_CREED,
  ADVISOR_PROTOCOLS,
  CYCLE_STEPS,
} from '../../data';
import {Card, Chip, Field, Bullets, NumberedSteps, Filters, Accordion} from './ui';

const Block: React.FC<{
  no: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}> = ({no, title, lead, children}) => (
  <section className="mb-14">
    <div className="mb-6 border-b border-slate-800 pb-5">
      <div className="flex items-baseline gap-3">
        <span className="bg-gradient-to-br from-emerald-400 to-sky-500 bg-clip-text text-3xl font-black text-transparent">
          {no}
        </span>
        <h2 className="text-xl font-bold text-slate-100 md:text-2xl">{title}</h2>
      </div>
      <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-400">
        {lead}
      </p>
    </div>
    {children}
  </section>
);

export const Academy: React.FC = () => {
  const [nlpFilter, setNlpFilter] = useState('all');
  const nlpShown =
    nlpFilter === 'all'
      ? NLP_TECHNIQUES
      : NLP_TECHNIQUES.filter((n) =>
          GITA_PHASES.find((g) => g.code === nlpFilter)?.nlpTools.includes(n.id),
        );

  return (
    <div>
      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
          Tầng vận hành học viện
        </p>
        <h1 className="mt-2 text-3xl font-black leading-tight text-slate-100 md:text-4xl">
          {ACADEMY_CREED.name}
        </h1>
        <p className="mt-4 text-lg font-semibold leading-snug text-emerald-300">
          {ACADEMY_CREED.oneLine}
        </p>
        <Card className="mt-6 border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-transparent">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Gốc rễ
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            {ACADEMY_CREED.root}
          </p>
          <p className="mt-4 border-t border-slate-800 pt-4 text-sm leading-relaxed text-slate-400">
            {ACADEMY_CREED.whySchoolFails}
          </p>
        </Card>
        <Card className="mt-4">
          <Field label="Cam kết với học viên">
            <p className="mb-3 text-slate-300">{ACADEMY_CREED.promise}</p>
            <Bullets items={ACADEMY_CREED.nonNegotiables} marker="✕" />
          </Field>
        </Card>
      </header>

      <Block
        no="01"
        title="BẢY NGUYÊN LÝ GỐC RỄ"
        lead="Mỗi nguyên lý bắt đầu từ một câu hỏi gốc, chỉ ra cách làm sai phổ biến, cách làm đúng, và hệ quả. Đây là thứ quyết định mọi lựa chọn thiết kế phía sau.">
        <div className="space-y-3">
          {ROOT_PRINCIPLES.map((p) => (
            <Accordion
              key={p.id}
              title={
                <span>
                  <span className="mr-2.5 text-emerald-400">
                    {String(p.no).padStart(2, '0')}
                  </span>
                  {p.name}
                </span>
              }
              subtitle={p.claim}>
              <Field label="Câu hỏi gốc">
                <p className="text-base italic text-emerald-300">
                  “{p.rootQuestion}”
                </p>
              </Field>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">
                    ✕ Cách làm sai
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    {p.wrongWay}
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    ✓ Cách làm đúng
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    {p.rightWay}
                  </p>
                </div>
              </div>
              <Field label="Hệ quả">
                <p className="text-slate-400">{p.consequence}</p>
              </Field>
            </Accordion>
          ))}
        </div>
      </Block>

      <Block
        no="02"
        title="THÁP HỌC TẬP 5 TẦNG"
        lead="Càng lên cao, tỉ lệ ghi nhớ càng lớn — nhưng cũng càng đòi hỏi học viên chủ động. Mọi tầng dưới chỉ là đường dẫn tới tầng đỉnh: dạy lại cho người khác.">
        <div className="space-y-3">
          {[...PYRAMID].reverse().map((t) => (
            <Card key={t.id} className="border-0 bg-gradient-to-r p-[1px]">
              <div className={`rounded-[11px] bg-gradient-to-r ${t.color} p-[1px]`}>
                <div className="rounded-[10px] bg-slate-950 p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2.5">
                    <span className="text-2xl font-black text-slate-700">
                      {t.no}
                    </span>
                    <div>
                      <p className="text-sm font-black tracking-wider text-slate-100">
                        {t.code}
                      </p>
                      <p className="text-xs text-slate-400">{t.name}</p>
                    </div>
                    <span className="ml-auto flex flex-wrap gap-1.5">
                      <Chip tone="emerald">{t.retention}</Chip>
                      <Chip tone="slate">{t.mode}</Chip>
                    </span>
                  </div>
                  <p className="mb-4 text-sm italic text-slate-400">{t.meaning}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Học viên làm gì">
                      <Bullets items={t.learnerDoes} marker="→" />
                    </Field>
                    <Field label="Cố vấn làm gì">
                      <Bullets items={t.advisorDoes} marker="→" />
                    </Field>
                  </div>
                  <div className="mt-2 rounded-lg border border-amber-500/25 bg-amber-500/5 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      ✨ Khoảnh khắc WOW của tầng này
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-200">
                      {t.wowMoment}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Block>

      <Block
        no="03"
        title={GITA_MODEL.name}
        lead={GITA_MODEL.core}>
        <Card className="mb-5 border-amber-500/25 bg-amber-500/5">
          <p className="text-sm leading-relaxed text-amber-200/90">
            <span className="font-semibold">Lưu ý: </span>
            {GITA_MODEL.note}
          </p>
        </Card>
        <p className="mb-4 text-sm text-slate-400">{GITA_MODEL.rhythm}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {GITA_PHASES.map((g) => (
            <Card key={g.letter}>
              <div className="mb-3 flex items-baseline gap-3">
                <span className="bg-gradient-to-br from-emerald-400 to-sky-500 bg-clip-text text-4xl font-black text-transparent">
                  {g.letter}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-100">{g.name}</p>
                </div>
              </div>
              <Field label="Mục đích">
                <p className="text-slate-400">{g.intent}</p>
              </Field>
              <Field label="Cố vấn đứng ở vị trí nào">
                <p className="text-sky-300/90">{g.advisorStance}</p>
              </Field>
              <Field label="Các nước đi">
                <Bullets items={g.moves} marker="→" />
              </Field>
              <Field label="Công cụ NLP dùng ở pha này">
                <div className="flex flex-wrap gap-1.5">
                  {g.nlpTools.map((id) => (
                    <Chip key={id} tone="violet">
                      {NLP_TECHNIQUES.find((n) => n.id === id)?.vnName ?? id}
                    </Chip>
                  ))}
                </div>
              </Field>
              <div className="mt-2 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">
                  ⚠ Hỏng ở đâu
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {g.failureMode}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Block>

      <Block
        no="04"
        title="VÒNG 11 BƯỚC CHUẨN"
        lead="Mọi cấp độ trong hệ thống đều chạy trọn vòng này. Hai mươi lăm cấp độ là hai mươi lăm vòng. Mỗi bước có lời thoại mẫu cho cố vấn, hành động cho học viên, và một sản phẩm cụ thể để lại.">
        <div className="space-y-2.5">
          {CYCLE_STEPS.map((s) => (
            <Accordion
              key={s.no}
              title={
                <span>
                  <span className="mr-2.5 text-emerald-400">
                    {String(s.no).padStart(2, '0')}
                  </span>
                  {s.name}
                </span>
              }
              subtitle={s.purpose}
              right={
                <span className="flex gap-1.5">
                  <Chip tone="violet">{s.phase}</Chip>
                  <Chip tone="slate">
                    {s.minutes >= 60
                      ? `${Math.round(s.minutes / 60)}h`
                      : `${s.minutes}′`}
                  </Chip>
                </span>
              }>
              <Field label="Lời thoại mẫu cho cố vấn">
                <p className="rounded-lg bg-slate-800/40 p-3 italic text-sky-200/90">
                  {s.advisorScript}
                </p>
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Học viên làm gì">
                  <p className="text-slate-300">{s.learnerAction}</p>
                </Field>
                <Field label="Sản phẩm để lại">
                  <p className="text-emerald-300/90">{s.artifact}</p>
                </Field>
              </div>
            </Accordion>
          ))}
        </div>
      </Block>

      <Block
        no="05"
        title="CÔNG CỤ NLP"
        lead="Mười kỹ thuật được chọn vì cố vấn dùng được ngay trong buổi học, có lời thoại cụ thể và có cảnh báo khi dùng sai. Lọc theo pha GITA để biết dùng cái nào lúc nào.">
        <Filters
          options={[
            {id: 'all', label: 'Tất cả'},
            ...GITA_PHASES.map((g) => ({id: g.code, label: `Pha ${g.letter} · ${g.code}`})),
          ]}
          value={nlpFilter}
          onChange={setNlpFilter}
        />
        <div className="space-y-2.5">
          {nlpShown.map((n) => (
            <Accordion
              key={n.id}
              title={
                <span className="flex flex-wrap items-baseline gap-2">
                  <span>{n.vnName}</span>
                  <span className="text-xs font-normal text-slate-500">
                    {n.name}
                  </span>
                </span>
              }
              subtitle={n.useWhen}>
              <Field label="Lời thoại từng bước">
                <NumberedSteps items={n.script} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Dùng ở đâu trong hệ thống">
                  <p className="text-slate-400">{n.appliedTo}</p>
                </Field>
                <Field label="Nguồn gốc">
                  <p className="text-slate-500">{n.origin}</p>
                </Field>
              </div>
              <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">
                  ⚠ Cảnh báo
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  {n.caution}
                </p>
              </div>
            </Accordion>
          ))}
        </div>
      </Block>

      <Block
        no="06"
        title="MÔI TRƯỜNG TỐI ƯU"
        lead="Bốn lớp môi trường. Học viên tự dựng được lớp vật lý và lớp số; học viện phải dựng hộ họ lớp xã hội và lớp thời gian — đó là hai lớp khó nhất và cũng là lý do người ta bỏ cuộc.">
        <div className="grid gap-3 md:grid-cols-2">
          {ENVIRONMENT_LAYERS.map((e) => (
            <Card key={e.id}>
              <h4 className="text-sm font-bold text-slate-100">{e.layer}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-sky-300/80">
                {e.goal}
              </p>
              <Field label="Cách dựng">
                <Bullets items={e.setup} marker="→" />
              </Field>
              <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">
                  ✕ Phản mẫu
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {e.antiPattern}
                </p>
              </div>
              <p className="mt-3 rounded-lg bg-slate-800/40 p-3 text-xs leading-relaxed text-emerald-200/90">
                <span className="font-semibold">Cách kiểm tra: </span>
                {e.check}
              </p>
            </Card>
          ))}
        </div>
      </Block>

      <Block
        no="07"
        title={ADVISOR_CREED.title}
        lead={ADVISOR_CREED.core}>
        <Card className="mb-5 border-sky-500/30 bg-sky-500/5">
          <p className="text-base font-semibold text-sky-200">
            {ADVISOR_CREED.ratio}
          </p>
        </Card>
        <div className="mb-6 overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-2.5 font-medium">✕ Người giảng</th>
                <th className="px-4 py-2.5 font-medium">✓ Cố vấn</th>
              </tr>
            </thead>
            <tbody>
              {ADVISOR_CREED.shifts.map((s, i) => (
                <tr key={i} className="border-t border-slate-800/70">
                  <td className="px-4 py-2.5 text-slate-500">{s.from}</td>
                  <td className="px-4 py-2.5 font-medium text-emerald-300">
                    {s.to}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Phác đồ xử lý sáu tình huống khó
        </h3>
        <div className="space-y-3">
          {ADVISOR_PROTOCOLS.map((a) => (
            <Card key={a.id}>
              <h4 className="text-sm font-bold text-slate-100">{a.situation}</h4>
              <div className="mt-3 grid gap-2.5 md:grid-cols-2">
                <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">
                    ✕ Đừng
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {a.doNot}
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    ✓ Thay vào đó
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {a.instead}
                  </p>
                </div>
              </div>
              <Field label="Câu hỏi dùng được ngay">
                <Bullets items={a.questions} marker="?" />
              </Field>
            </Card>
          ))}
        </div>
      </Block>
    </div>
  );
};
