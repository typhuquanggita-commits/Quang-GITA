/**
 * Analytics.
 *
 * Deliberately refuses to draw a chart it does not have the evidence for:
 * an accuracy figure from four responses looks authoritative and is not, so
 * thin sections say so instead of rendering noise.
 */

import React, { useMemo, useState } from 'react';
import type { SectionId } from '../../types.ts';
import { QUESTION_BY_ID } from '../../data/bank.ts';
import { domainLabel, sectionLabel, skillLabel } from '../../data/blueprint.ts';
import {
  collectResponses,
  domainCoverage,
  errorMix,
  pacingByBand,
  skillStats,
  thetaTrend,
  type ResponseRecord,
} from '../../engine/analytics.ts';
import { thetaToScaled } from '../../engine/scoring.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Card, Empty, Segmented, Tabs } from '../../components/ui/primitives.tsx';
import { BarChart, Donut, LineChart, MasteryBars, PacingChart } from '../../components/charts/charts.tsx';
import { IconChart } from '../../components/ui/icons.tsx';
import { formatClock, formatDate, isoDate, pct } from '../../lib/util.ts';

type Tab = 'overview' | 'skills' | 'pacing' | 'errors';

const MIN_RESPONSES = 12;

export function Analytics(): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state } = useStore();
  const [tab, setTab] = useState<Tab>('overview');
  const [section, setSection] = useState<SectionId | 'both'>('both');

  const allRecords = useMemo(
    () => collectResponses(state.attempts, QUESTION_BY_ID),
    [state.attempts],
  );
  const records = useMemo(
    () => (section === 'both' ? allRecords : allRecords.filter((r) => r.question.section === section)),
    [allRecords, section],
  );

  if (allRecords.length < MIN_RESPONSES) {
    return (
      <div className="page">
        <header className="page-head">
          <h1 className="page-title">{t('analytics.title')}</h1>
          <p className="page-sub">{t('analytics.subtitle')}</p>
        </header>
        <Empty
          icon={<IconChart size={32} />}
          title={t('analytics.needsData')}
          body={
            locale === 'vi'
              ? `Cần ít nhất ${MIN_RESPONSES} câu trả lời để các ước lượng có ý nghĩa. Bạn đang có ${allRecords.length}.`
              : `At least ${MIN_RESPONSES} responses are needed before these estimates mean anything. You have ${allRecords.length}.`
          }
        />
      </div>
    );
  }

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{t('analytics.title')}</h1>
            <p className="page-sub">{t('analytics.subtitle')}</p>
          </div>
          <Segmented<SectionId | 'both'>
            ariaLabel={t('practice.scope')}
            value={section}
            onChange={setSection}
            options={[
              { value: 'both', label: t('common.all') },
              { value: 'rw', label: t('section.rw.short') },
              { value: 'math', label: t('section.math.short') },
            ]}
          />
        </div>
      </header>

      <Tabs<Tab>
        value={tab}
        onChange={setTab}
        ariaLabel="Analytics views"
        tabs={[
          { id: 'overview', label: t('analytics.overview') },
          { id: 'skills', label: t('analytics.skills') },
          { id: 'pacing', label: t('analytics.pacing') },
          { id: 'errors', label: t('analytics.errors') },
        ]}
      />

      {tab === 'overview' && <Overview section={section} records={records} allRecords={allRecords} />}
      {tab === 'skills' && <Skills records={records} />}
      {tab === 'pacing' && <Pacing records={records} />}
      {tab === 'errors' && <Errors records={records} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Views                                                               */
/*                                                                     */
/* Module-scope components taking their inputs as props: defined inside */
/* `Analytics` they would be re-created on every render, remounting the */
/* whole panel each time a filter changed.                             */
/* ------------------------------------------------------------------ */

interface ViewProps {
  section: SectionId | 'both';
  records: ResponseRecord[];
  allRecords: ResponseRecord[];
}

function Overview({ section, records, allRecords }: ViewProps): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state } = useStore();
  const sections: SectionId[] = section === 'both' ? ['rw', 'math'] : [section];

  const series = sections
    .map((s) => ({
      name: sectionLabel(s, locale),
      points: thetaTrend(allRecords, s).map((p) => [p.at, p.theta] as [number, number]),
    }))
    .filter((s) => s.points.length >= 2);

  return (
    <div className="stack gap-5">
      <div className="kpi-grid">
        {sections.map((s) => {
          const ability = state.sectionAbility[s];
          return (
            <div className="kpi" key={s}>
              <div className="kpi-label">{sectionLabel(s, locale)}</div>
              <div className="kpi-value">{thetaToScaled(ability.theta)}</div>
              <div className="kpi-foot">
                θ = {ability.theta.toFixed(2)} · SE {ability.se.toFixed(2)} · n = {ability.n}
              </div>
            </div>
          );
        })}
        <div className="kpi">
          <div className="kpi-label">{t('common.accuracy')}</div>
          <div className="kpi-value">
            {pct(records.filter((r) => r.response.correct).length / Math.max(1, records.length))}
          </div>
          <div className="kpi-foot">{records.length} {t('common.questions')}</div>
        </div>
      </div>

      <Card
        title={t('analytics.thetaTrend')}
        subtitle={locale === 'vi' ? 'Cửa sổ trượt 25 câu gần nhất' : 'Rolling 25-response window'}
      >
        {series.length === 0 ? (
          <p className="muted text-sm">{t('analytics.needsData')}</p>
        ) : (
          <LineChart
            description={t('a11y.chart', { desc: t('analytics.thetaTrend') })}
            series={series}
            yMin={-2.5}
            yMax={2.5}
            formatY={(v) => v.toFixed(1)}
            formatX={(v) => formatDate(isoDate(new Date(v)), locale)}
          />
        )}
      </Card>

      <Card title={t('analytics.domainCoverage')}>
        <div className="stack gap-5">
          {sections.map((s) => {
            const coverage = domainCoverage(allRecords, s);
            if (coverage.length === 0) return null;
            return (
              <div key={s}>
                <h4 className="text-sm semibold muted" style={{ marginBottom: 'var(--space-3)' }}>
                  {sectionLabel(s, locale)}
                </h4>
                <BarChart
                  description={`${t('analytics.domainCoverage')} — ${sectionLabel(s, locale)}`}
                  data={coverage.map((c) => ({
                    label: domainLabel(c.domain, locale).slice(0, 12),
                    value: c.count,
                  }))}
                />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function Skills({ records }: { records: ResponseRecord[] }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const stats = useMemo(() => skillStats(records), [records]);
  const sufficient = stats.filter((s) => s.attempted >= 3);

  if (sufficient.length === 0) return <Empty title={t('analytics.needsData')} />;

  return (
    <Card
      title={t('analytics.mastery')}
      subtitle={
        locale === 'vi'
          ? 'Mức thành thạo = xác suất làm đúng một câu độ khó trung bình, ước lượng bằng IRT. Chỉ hiện kỹ năng có từ 3 câu trở lên.'
          : 'Mastery is the modelled probability of answering a medium item correctly. Only skills with three or more responses are shown.'
      }
    >
      <MasteryBars
        rows={sufficient.map((skill) => ({
          label: skillLabel(skill.skill, locale),
          value: skill.mastery,
          meta: `${skill.correct}/${skill.attempted} · ${formatClock(skill.meanSeconds)} ${
            locale === 'vi' ? 'mỗi câu' : 'per question'
          }${skill.trend !== 0 ? ` · ${skill.trend > 0 ? '↑' : '↓'} ${Math.abs(Math.round(skill.trend * 100))}%` : ''}`,
        }))}
      />
    </Card>
  );
}

function Pacing({ records }: { records: ResponseRecord[] }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const pacing = useMemo(() => pacingByBand(records), [records]);
  const usable = pacing.filter((p) => p.count >= 3);

  if (usable.length === 0) return <Empty title={t('analytics.needsData')} />;

  return (
    <div className="stack gap-5">
      <Card
        title={t('analytics.timePerQuestion')}
        subtitle={
          locale === 'vi'
            ? 'So sánh thời gian trung vị với mốc mục tiêu theo độ khó'
            : 'Median time against the target, by difficulty'
        }
      >
        <PacingChart
          description={t('a11y.chart', { desc: t('analytics.timePerQuestion') })}
          rows={usable.map((p) => ({ label: p.band, actual: p.medianSeconds, target: p.targetSeconds }))}
        />
      </Card>

      <Card title={t('analytics.accuracyByDifficulty')}>
        <BarChart
          description={t('a11y.chart', { desc: t('analytics.accuracyByDifficulty') })}
          data={usable.map((p) => ({ label: p.band, value: Math.round(p.accuracy * 100) }))}
          max={100}
          formatValue={(v) => `${Math.round(v)}%`}
          colorAt={(index) => ['var(--success)', 'var(--primary)', 'var(--accent)'][index] ?? 'var(--primary)'}
        />
      </Card>
    </div>
  );
}

function Errors({ records }: { records: ResponseRecord[] }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const errors = useMemo(() => errorMix(records), [records]);
  const total = Object.values(errors).reduce((a, b) => a + b, 0);

  if (total === 0) {
    return <Empty title={locale === 'vi' ? 'Chưa có câu sai nào để phân loại' : 'No errors to classify yet'} />;
  }

  return (
    <div className="stack gap-5">
      <Card
        title={t('analytics.errorTaxonomy')}
        subtitle={
          locale === 'vi'
            ? 'Hổng kiến thức và bất cẩn cần cách khắc phục hoàn toàn khác nhau, nên chúng được tách riêng thay vì gộp thành "sai".'
            : 'A concept gap and a careless slip need different remedies, so they are separated rather than lumped together as "wrong".'
        }
      >
        <Donut
          description={t('a11y.chart', { desc: t('analytics.errorTaxonomy') })}
          centerLabel={
            <div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{total}</div>
              <div className="text-xs muted">{locale === 'vi' ? 'lỗi' : 'errors'}</div>
            </div>
          }
          slices={[
            { label: t('analytics.error.concept'), value: errors.concept, color: 'var(--danger)' },
            { label: t('analytics.error.careless'), value: errors.careless, color: 'var(--warning)' },
            { label: t('analytics.error.timeout'), value: errors.timeout, color: 'var(--accent)' },
            { label: t('analytics.error.omitted'), value: errors.omitted, color: 'var(--text-muted)' },
          ]}
        />
      </Card>

      <Card title={locale === 'vi' ? 'Nên làm gì tiếp' : 'What to do next'}>
        <ul className="stack gap-3 text-sm" style={{ paddingLeft: '1.1rem', listStyle: 'disc' }}>
          {errors.concept > total * 0.4 && (
            <li>
              <Badge tone="danger">{t('analytics.error.concept')}</Badge>{' '}
              {locale === 'vi'
                ? 'Phần lớn lỗi đến từ kiến thức chưa vững — hãy luyện theo kỹ năng yếu thay vì làm đề tổng hợp.'
                : 'Most errors are knowledge gaps — drill weak skills rather than taking more full sets.'}
            </li>
          )}
          {errors.careless > total * 0.25 && (
            <li>
              <Badge tone="warning">{t('analytics.error.careless')}</Badge>{' '}
              {locale === 'vi'
                ? 'Bạn mất điểm ở câu mình biết làm. Đọc lại đề trước khi chọn, và dùng công cụ loại phương án.'
                : 'You are losing points on items you know. Re-read the prompt before choosing, and use the answer eliminator.'}
            </li>
          )}
          {errors.timeout > total * 0.2 && (
            <li>
              <Badge>{t('analytics.error.timeout')}</Badge>{' '}
              {locale === 'vi'
                ? 'Nhịp độ đang là vấn đề. Luyện có bấm giờ và bỏ qua sớm những câu quá khó.'
                : 'Pacing is the constraint. Practise timed, and move on early from items that resist you.'}
            </li>
          )}
          {errors.omitted > total * 0.15 && (
            <li>
              <Badge>{t('analytics.error.omitted')}</Badge>{' '}
              {locale === 'vi'
                ? 'SAT không trừ điểm câu sai — luôn chọn một đáp án, kể cả khi phải đoán.'
                : 'The SAT has no wrong-answer penalty — always answer, even when guessing.'}
            </li>
          )}
        </ul>
      </Card>
    </div>
  );
}
