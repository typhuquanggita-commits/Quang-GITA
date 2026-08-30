/**
 * What the exam does not give you.
 *
 * The page opens with the asymmetry rather than with a list, because the
 * asymmetry is the point: the reference sheet supplies six geometry formulas
 * and forty-four other things must already be in the candidate's head.
 * Learners routinely believe the number is far larger, and a resource that
 * answers "how much must I memorise" with a list of every formula in
 * secondary mathematics is why.
 *
 * Facts are ordered by payback — cost per occurrence times how often it
 * recurs — rather than by topic. Studying this list from the top is the
 * fastest available conversion of memorisation into seconds, and seconds are
 * what the last two hundred points are made of.
 *
 * The drill is the point of the page, not an extra. A fact a learner has read
 * is not a fact a learner has; the only evidence is recall with the page
 * turned away, which is why the answer is hidden by default and why the
 * self-marking is deliberately unrecorded — a score here would tempt a learner
 * to optimise it rather than to be honest with themselves.
 */

import React, { useMemo, useState } from 'react';
import {
  MUST_KNOW,
  byPayback,
  mustKnowStats,
  type KnowledgeArea,
  type MustKnowFact,
} from '../../data/mustKnow.ts';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card, Segmented } from '../../components/ui/primitives.tsx';
import { IconAlert, IconCheck, IconClock, IconSparkle } from '../../components/ui/icons.tsx';

type View = 'payback' | 'area' | 'drill';

const AREA_LABEL: Record<KnowledgeArea, { en: string; vi: string }> = {
  algebra: { en: 'Algebra', vi: 'Đại số' },
  functions: { en: 'Functions', vi: 'Hàm số' },
  geometry: { en: 'Geometry', vi: 'Hình học' },
  trigonometry: { en: 'Trigonometry', vi: 'Lượng giác' },
  data: { en: 'Data and statistics', vi: 'Dữ liệu và thống kê' },
  punctuation: { en: 'Punctuation', vi: 'Dấu câu' },
  grammar: { en: 'Grammar', vi: 'Ngữ pháp' },
};

const FREQ_LABEL = {
  'every-module': { en: 'every module', vi: 'mọi module' },
  'most-modules': { en: 'most modules', vi: 'hầu hết module' },
  occasional: { en: 'occasional', vi: 'thỉnh thoảng' },
};

function FactRow({ fact, vi }: { fact: MustKnowFact; vi: boolean }): React.ReactElement {
  return (
    <li className="mk-fact" data-given={fact.given || undefined}>
      <div className="mk-fact-head">
        <p className="mk-statement">{vi ? fact.factVi : fact.fact}</p>
        <span className="row gap-2 wrap">
          {fact.given ? (
            <Badge tone="info">{vi ? 'Có trên tờ công thức' : 'On the sheet'}</Badge>
          ) : (
            <Badge tone="warning">{vi ? 'Phải thuộc' : 'You must know'}</Badge>
          )}
          <Badge>
            <IconClock size={12} /> {fact.cost}s
          </Badge>
          <Badge>{vi ? FREQ_LABEL[fact.frequency].vi : FREQ_LABEL[fact.frequency].en}</Badge>
        </span>
      </div>
      <p className="mk-why">{vi ? fact.whyVi : fact.why}</p>
    </li>
  );
}

function DrillCard({ fact, vi }: { fact: MustKnowFact; vi: boolean }): React.ReactElement {
  const [shown, setShown] = useState(false);

  return (
    <div className="mk-drill">
      <p className="semibold">{vi ? fact.drill.promptVi : fact.drill.prompt}</p>
      {shown ? (
        <div className="stack gap-2">
          <p className="mk-answer">
            <IconCheck size={14} /> {fact.drill.answer}
          </p>
          <p className="text-sm muted">{vi ? fact.factVi : fact.fact}</p>
        </div>
      ) : (
        <Button size="sm" onClick={() => setShown(true)}>
          {vi ? 'Xem đáp án' : 'Show the answer'}
        </Button>
      )}
    </div>
  );
}

export function MustKnow(): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const [view, setView] = useState<View>('payback');

  const stats = useMemo(() => mustKnowStats(), []);
  const ordered = useMemo(() => byPayback(), []);
  const areas = useMemo(
    () => (Object.keys(AREA_LABEL) as KnowledgeArea[]).map((area) => ({
      area,
      facts: MUST_KNOW.filter((f) => f.area === area),
    })),
    [],
  );

  return (
    <div className="page stack gap-5">
      <header className="page-head">
        <h1 className="page-title">{vi ? 'Những gì đề thi KHÔNG phát cho bạn' : 'What the exam does not give you'}</h1>
        <p className="page-sub">
          {vi
            ? 'Digital SAT phát cho mọi thí sinh một tờ công thức có sáu công thức hình học. Toàn bộ phần còn lại phải nằm sẵn trong đầu — và chênh lệch giữa 1400 với 1550 rất hiếm khi là biết thêm kiến thức, mà là không mất hai mươi giây dựng lại công thức hệ số góc.'
            : 'The Digital SAT hands every candidate six geometry formulas. Everything else must already be in your head — and the difference between 1400 and 1550 is very rarely knowing more mathematics, but not spending twenty seconds reconstructing the slope formula.'}
        </p>
      </header>

      <Card>
        <div className="row gap-4 wrap vocab-stats">
          <div className="vocab-stat">
            <strong>{stats.given}</strong>
            <span>{vi ? 'công thức đề phát cho bạn' : 'formulas the exam gives you'}</span>
          </div>
          <div className="vocab-stat">
            <strong>{stats.mustCarry}</strong>
            <span>
              {vi
                ? 'điều bạn phải tự mang theo. Đây là câu trả lời trung thực cho "phải học thuộc bao nhiêu" — ít hơn hẳn con số hầu hết học viên tưởng.'
                : 'things you must carry yourself. This is the honest answer to "how much must I memorise" — far less than most learners assume.'}
            </span>
          </div>
          <div className="vocab-stat">
            <strong>{stats.costIfDerived}s</strong>
            <span>
              {vi
                ? 'mất mỗi module nếu phải suy lại thay vì nhớ sẵn — chỉ tính riêng những điều gặp ở MỌI module.'
                : 'lost per module by deriving instead of recalling — counting only what recurs every module.'}
            </span>
          </div>
        </div>
        <div className="escalation" data-severity="info" style={{ marginTop: 'var(--space-4)' }}>
          <IconAlert size={18} />
          <div>
            <strong>{vi ? 'Vì sao "suy ra được" vẫn chưa đủ' : 'Why "derivable" is not enough'}</strong>
            <p>
              {vi
                ? 'Tổng các nghiệm của một tam thức bậc hai thì dễ suy ra — nhưng suy-ra-trong-bốn-mươi-giây thì cũng như không biết, khi mỗi câu chỉ có bảy mươi giây. Cái quyết định một sự kiện có đáng thuộc hay không là CÁI GIÁ TÍNH BẰNG GIÂY, không phải độ khó của nó.'
                : 'The sum of the roots of a quadratic is easy to derive — but derivable-in-forty-seconds is the same as not known when a module gives seventy seconds an item. What earns a fact a place here is its cost in seconds, not its difficulty.'}
            </p>
          </div>
        </div>
      </Card>

      <div className="no-print">
        <Segmented
          value={view}
          onChange={(next: View) => setView(next)}
          ariaLabel={vi ? 'Cách xem' : 'View'}
          options={[
            { value: 'payback', label: vi ? 'Theo mức đáng học nhất' : 'By payback' },
            { value: 'area', label: vi ? 'Theo mảng kiến thức' : 'By area' },
            { value: 'drill', label: vi ? 'Tự kiểm tra' : 'Self-test' },
          ]}
        />
      </div>

      {view === 'payback' && (
        <Card
          title={vi ? 'Học từ trên xuống' : 'Study from the top'}
          subtitle={
            vi
              ? 'Xếp theo giá phải trả nhân với tần suất gặp. Đây là cách đổi việc học thuộc thành GIÂY nhanh nhất, mà giây chính là chất liệu của hai trăm điểm cuối.'
              : 'Ordered by cost times frequency. This is the fastest available conversion of memorisation into seconds, and seconds are what the last two hundred points are made of.'
          }
        >
          <ul className="mk-list">
            {ordered.map((fact) => (
              <FactRow key={fact.id} fact={fact} vi={vi} />
            ))}
          </ul>
        </Card>
      )}

      {view === 'area' &&
        areas.map(({ area, facts }) => (
          <Card key={area} title={vi ? AREA_LABEL[area].vi : AREA_LABEL[area].en} subtitle={`${facts.length}`}>
            <ul className="mk-list">
              {facts.map((fact) => (
                <FactRow key={fact.id} fact={fact} vi={vi} />
              ))}
            </ul>
          </Card>
        ))}

      {view === 'drill' && (
        <Card
          title={vi ? 'Tự kiểm tra' : 'Self-test'}
          subtitle={
            vi
              ? 'Một sự kiện đã ĐỌC không phải là một sự kiện đã CÓ. Bằng chứng duy nhất là nhớ lại được khi không nhìn trang này — nên hãy trả lời trong đầu trước khi bấm. Kết quả không được ghi lại: có điểm số ở đây thì bạn sẽ tối ưu điểm thay vì thành thật với chính mình.'
              : 'A fact you have read is not a fact you have. The only evidence is recall with the page turned away, so answer in your head before pressing. Nothing is recorded: a score here would tempt you to optimise it rather than be honest with yourself.'
          }
        >
          <div className="mk-drills">
            {ordered.map((fact) => (
              <DrillCard key={fact.id} fact={fact} vi={vi} />
            ))}
          </div>
        </Card>
      )}

      <Card level={2} title={vi ? 'Đề thi phát cho bạn đúng những thứ này' : 'This is everything the exam gives you'}>
        <p className="secondary">
          {vi
            ? 'Diện tích và chu vi đường tròn, diện tích hình chữ nhật, định lý Pythagoras, hai tam giác đặc biệt, thể tích hình hộp và hình nón, cùng ba dữ kiện: tam giác có tổng ba góc 180°, đường tròn có 360° và 2π radian. Hết. Mọi thứ khác trong danh sách trên là của bạn.'
            : 'Circle area and circumference, rectangle area, Pythagoras, the two special triangles, box and cone volume, and three facts: a triangle sums to 180°, a circle has 360° and 2π radians. That is all. Everything else in the list above is yours to carry.'}
        </p>
        <p className="secondary" style={{ marginTop: 'var(--space-3)' }}>
          <IconSparkle size={14} />{' '}
          {vi
            ? 'Hai mục trong danh sách trên có mặt trên tờ công thức và vẫn được đưa vào đây: với tay lấy tờ đó mất mười giây cộng với cái giá mất mạch làm bài — người phải tra công thức đã mất nhiều hơn giá trị của chính công thức đó.'
            : 'Two entries above are on the sheet and are included anyway: reaching for it costs ten seconds and a lost place, and a candidate who looks a formula up has already lost more than the formula is worth.'}
        </p>
      </Card>
    </div>
  );
}
