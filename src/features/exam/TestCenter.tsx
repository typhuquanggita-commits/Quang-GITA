/**
 * Test centre — chooses a delivery, assembles the form, and starts an attempt.
 */

import React, { useState } from 'react';
import type { SectionId } from '../../types.ts';
import { BANK } from '../../data/bank.ts';
import { FULL_TEST_SECONDS, SECTION_SPEC, sectionLabel } from '../../data/blueprint.ts';
import { assembleForm } from '../../engine/adaptive.ts';
import { makeAttempt, selectInProgressAttempt, selectScoredAttempts, useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Modal } from '../../components/ui/primitives.tsx';
import { IconClock, IconPlay, IconClipboard, IconAlert } from '../../components/ui/icons.tsx';
import { formatDuration, formatDate, isoDate } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

type Delivery = { kind: 'full' } | { kind: 'section'; section: SectionId } | { kind: 'diagnostic' };

export function TestCenter({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch } = useStore();
  const inProgress = selectInProgressAttempt(state);
  const history = selectScoredAttempts(state).filter((a) => a.mode !== 'practice');
  const [resumePrompt, setResumePrompt] = useState(Boolean(inProgress));

  function begin(delivery: Delivery) {
    const scope = delivery.kind === 'section' ? delivery.section : 'full';
    const diagnostic = delivery.kind === 'diagnostic';
    const label =
      delivery.kind === 'full'
        ? t('exam.fullTest')
        : delivery.kind === 'diagnostic'
          ? t('exam.diagnostic')
          : `${t('exam.sectionTest')} · ${sectionLabel(delivery.section, locale)}`;

    const form = assembleForm({ scope, bank: BANK, label, diagnostic });
    const firstModule = form.modules.find((m) => m.stage === 1);
    if (!firstModule) return;

    const attempt = makeAttempt({
      mode: delivery.kind === 'full' ? 'full-test' : delivery.kind === 'diagnostic' ? 'diagnostic' : 'section-test',
      form,
      label,
      moduleIds: [firstModule.id],
      timeMultiplier: state.preferences.timeMultiplier,
    });

    dispatch({ type: 'form/add', form });
    dispatch({ type: 'attempt/start', attempt });
    navigate({ name: 'exam', attemptId: attempt.id });
  }

  const fullMinutes = Math.round((FULL_TEST_SECONDS * state.preferences.timeMultiplier) / 60);
  const sectionMinutes = (section: SectionId) =>
    Math.round((SECTION_SPEC[section].moduleSeconds * 2 * state.preferences.timeMultiplier) / 60);

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">{t('exam.chooseTest')}</h1>
        <p className="page-sub">
          {locale === 'vi'
            ? 'Mỗi đề được lắp ráp tại thời điểm thi từ ngân hàng đã hiệu chuẩn, theo đúng blueprint và cơ chế thích ứng của Digital SAT.'
            : 'Every form is assembled at delivery time from the calibrated bank, following the Digital SAT blueprint and adaptive design.'}
        </p>
      </header>

      {state.preferences.timeMultiplier !== 1 && (
        <Card>
          <div className="row gap-3">
            <IconClock size={18} />
            <span className="text-sm">
              {locale === 'vi'
                ? `Thời gian mở rộng đang bật (×${state.preferences.timeMultiplier}). Điểm vẫn quy đổi theo thang chuẩn.`
                : `Extended time is active (×${state.preferences.timeMultiplier}). Scores still use the standard scale.`}
            </span>
          </div>
        </Card>
      )}

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <Card
          title={t('exam.fullTest')}
          subtitle={t('exam.fullTestDesc')}
          action={<Badge tone="primary">{formatDuration(fullMinutes * 60, locale)}</Badge>}
        >
          <div className="stack gap-4">
            <ul className="stack gap-2 text-sm secondary" style={{ paddingLeft: '1.1rem', listStyle: 'disc' }}>
              <li>{locale === 'vi' ? '2 module Đọc–Viết · 27 câu · 32 phút mỗi module' : '2 Reading and Writing modules · 27 questions · 32 minutes each'}</li>
              <li>{locale === 'vi' ? '2 module Toán · 22 câu · 35 phút mỗi module' : '2 Math modules · 22 questions · 35 minutes each'}</li>
              <li>{locale === 'vi' ? 'Nghỉ 10 phút giữa hai phần' : '10-minute break between sections'}</li>
              <li>{locale === 'vi' ? 'Module 2 được định tuyến theo kết quả module 1' : 'Module 2 routes on module 1 performance'}</li>
            </ul>
            <Button variant="primary" onClick={() => begin({ kind: 'full' })}>
              <IconPlay size={16} />
              {t('exam.beginTest')}
            </Button>
          </div>
        </Card>

        <Card title={t('exam.sectionTest')} subtitle={t('exam.sectionTestDesc')}>
          <div className="stack gap-3">
            {(['rw', 'math'] as SectionId[]).map((section) => (
              <div key={section} className="between">
                <div>
                  <div className="semibold">{sectionLabel(section, locale)}</div>
                  <div className="text-xs muted">
                    {SECTION_SPEC[section].questionsPerModule * 2} {t('common.questions')} ·{' '}
                    {sectionMinutes(section)} {t('common.minutes')}
                  </div>
                </div>
                <Button size="sm" onClick={() => begin({ kind: 'section', section })}>
                  {t('common.start')}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title={t('exam.diagnostic')}
          subtitle={t('exam.diagnosticDesc')}
          action={<Badge tone="info">~34 {t('common.minutes')}</Badge>}
        >
          <div className="stack gap-4">
            <p className="text-sm secondary">
              {locale === 'vi'
                ? 'Bài rút gọn để xác lập điểm nền nhanh. Kết quả dùng để khởi tạo engine thích ứng và kế hoạch học.'
                : 'A short form that establishes a baseline quickly. The result seeds the adaptive engine and your study plan.'}
            </p>
            <Button onClick={() => begin({ kind: 'diagnostic' })}>{t('common.start')}</Button>
          </div>
        </Card>
      </div>

      <Card title={locale === 'vi' ? 'Lịch sử thi thử' : 'Test history'}>
        {history.length === 0 ? (
          <Empty icon={<IconClipboard size={28} />} title={t('dash.noTests')} />
        ) : (
          <div className="scroll-x">
            <table className="table">
              <thead>
                <tr>
                  <th>{locale === 'vi' ? 'Bài thi' : 'Test'}</th>
                  <th>{locale === 'vi' ? 'Ngày' : 'Date'}</th>
                  <th>{t('result.total')}</th>
                  <th>{sectionLabel('rw', locale)}</th>
                  <th>{sectionLabel('math', locale)}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {history.map((attempt) => (
                  <tr key={attempt.id}>
                    <td className="semibold">{attempt.label}</td>
                    <td>{formatDate(isoDate(new Date(attempt.submittedAt ?? attempt.startedAt)), locale)}</td>
                    <td className="semibold">{attempt.score?.total ?? '—'}</td>
                    <td>{attempt.score?.sections.find((s) => s.section === 'rw')?.scaled ?? '—'}</td>
                    <td>{attempt.score?.sections.find((s) => s.section === 'math')?.scaled ?? '—'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <Button size="sm" variant="ghost" onClick={() => navigate({ name: 'result', attemptId: attempt.id })}>
                        {t('result.title')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={resumePrompt && Boolean(inProgress)}
        onClose={() => setResumePrompt(false)}
        title={t('exam.resumeAttempt')}
        footer={
          <>
            <Button
              variant="danger"
              onClick={() => {
                if (inProgress) {
                  dispatch({ type: 'attempt/patch', id: inProgress.id, patch: { status: 'abandoned' } });
                }
                setResumePrompt(false);
              }}
            >
              {t('exam.discard')}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setResumePrompt(false);
                if (inProgress) navigate({ name: 'exam', attemptId: inProgress.id });
              }}
            >
              {t('common.continue')}
            </Button>
          </>
        }
      >
        <div className="row gap-3">
          <IconAlert size={20} />
          <p>{t('exam.resumeBody')}</p>
        </div>
        {inProgress && (
          <p className="text-sm muted" style={{ marginTop: 'var(--space-3)' }}>
            {inProgress.label} · {formatDate(isoDate(new Date(inProgress.startedAt)), locale)}
          </p>
        )}
      </Modal>
    </div>
  );
}
