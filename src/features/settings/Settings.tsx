/**
 * Settings — profile, appearance, accessibility, testing conditions, role, data.
 */

import React, { useRef, useState } from 'react';
import type { Locale, ThemeMode } from '../../types.ts';
import { bankStats } from '../../data/bank.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import {
  permissionsFor,
  permissionLabel,
  rankLabel,
  roleLabel,
  ROLE_ORDER,
  ROLE_PURPOSE,
  TEACHER_RANK_ORDER,
  type Permission,
  type RoleId,
  type TeacherRank,
} from '../../auth/roles.ts';
import { accountById } from '../../auth/model.ts';
import { Badge, Button, Card, Field, Modal, Segmented, Switch } from '../../components/ui/primitives.tsx';
import { IconAlert, IconDownload, IconTrash, IconUpload } from '../../components/ui/icons.tsx';
import { download } from '../../lib/util.ts';

export function Settings(): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch, exportState, importState, resetAll, principal, audit } = useStore();
  const prefs = state.preferences;
  const me = accountById(state.org, state.org.currentAccountId);

  const [confirmReset, setConfirmReset] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const stats = bankStats();

  const held = permissionsFor(principal);

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">{t('settings.title')}</h1>
      </header>

      {/* ---- Profile ---- */}
      <Card title={t('settings.profile')}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
          <Field label={t('settings.name')}>
            {(id) => (
              <input
                id={id}
                className="input"
                value={state.profile.name}
                onChange={(e) => {
                  dispatch({ type: 'profile/update', patch: { name: e.target.value } });
                  if (me) {
                    dispatch({ type: 'org/upsertAccount', account: { ...me, name: e.target.value } });
                  }
                }}
              />
            )}
          </Field>
          <Field label={t('settings.email')}>
            {(id) => (
              <input
                id={id}
                className="input"
                type="email"
                value={state.profile.email}
                onChange={(e) => {
                  dispatch({ type: 'profile/update', patch: { email: e.target.value } });
                  if (me) {
                    dispatch({ type: 'org/upsertAccount', account: { ...me, email: e.target.value } });
                  }
                }}
              />
            )}
          </Field>
          <Field label={t('plan.targetScore')}>
            {(id) => (
              <input
                id={id}
                className="input"
                type="number"
                min={400}
                max={1600}
                step={10}
                value={state.profile.targetScore}
                onChange={(e) => dispatch({ type: 'profile/update', patch: { targetScore: Number(e.target.value) } })}
              />
            )}
          </Field>
          <Field label={t('plan.testDate')}>
            {(id) => (
              <input
                id={id}
                className="input"
                type="date"
                value={state.profile.testDate ?? ''}
                onChange={(e) => dispatch({ type: 'profile/update', patch: { testDate: e.target.value || null } })}
              />
            )}
          </Field>
        </div>
      </Card>

      {/* ---- Role ---- */}
      <Card
        title={locale === 'vi' ? 'Vai trò và quyền hạn' : 'Role and permissions'}
        subtitle={
          locale === 'vi'
            ? 'Vai trò quyết định bạn được làm gì với dữ liệu của người khác. Cấp độ học tập thì không — nó chỉ mở khoá nội dung.'
            : 'A role decides what you may do with other people’s data. A study level does not — it only unlocks material.'
        }
        action={
          <div className="row gap-2">
            <Badge tone="primary">{me ? roleLabel(me.role, locale) : '—'}</Badge>
            {me?.rank && <Badge tone="info">{rankLabel(me.rank, locale)}</Badge>}
          </div>
        }
      >
        <div className="stack gap-5">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <Field
              label={locale === 'vi' ? 'Vai trò của tài khoản này' : 'This account’s role'}
              hint={
                locale === 'vi'
                  ? 'Trên bản chạy cục bộ, người sở hữu thiết bị tự đặt vai trò. Bản triển khai có máy chủ phải cấp vai trò từ phía máy chủ.'
                  : 'On a local install the device owner sets this. A hosted deployment must issue roles server-side.'
              }
            >
              {(id) => (
                <select
                  id={id}
                  className="select"
                  value={me?.role ?? 'student'}
                  onChange={(e) => {
                    const role = e.target.value as RoleId;
                    if (!me) return;
                    dispatch({ type: 'org/setRole', accountId: me.id, role });
                    audit({ action: 'role.switched', targetId: me.id, detail: `${me.role} → ${role}` });
                  }}
                >
                  {ROLE_ORDER.map((role) => (
                    <option key={role} value={role}>
                      {roleLabel(role, locale)}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            {me && (
              <div className="stack gap-2">
                <span className="text-xs muted semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {locale === 'vi' ? 'Vai trò này dùng để làm gì' : 'What this role is for'}
                </span>
                <p className="text-sm">
                  {locale === 'vi' ? ROLE_PURPOSE[me.role].vi : ROLE_PURPOSE[me.role].en}
                </p>
              </div>
            )}

            {me?.role === 'teacher' && (
              <Field label={locale === 'vi' ? 'Cấp giáo viên' : 'Teacher rank'}>
                {(id) => (
                  <select
                    id={id}
                    className="select"
                    value={me.rank ?? 'assistant'}
                    onChange={(e) => {
                      const rank = e.target.value as TeacherRank;
                      dispatch({ type: 'org/setRank', accountId: me.id, rank });
                      audit({ action: 'teacher.rank.changed', targetId: me.id, detail: `→ ${rank}` });
                    }}
                  >
                    {TEACHER_RANK_ORDER.map((rank) => (
                      <option key={rank} value={rank}>{rankLabel(rank, locale)}</option>
                    ))}
                  </select>
                )}
              </Field>
            )}
          </div>

          <div>
            <span className="label">{locale === 'vi' ? 'Quyền đang có' : 'Permissions held'}</span>
            <div className="row gap-2 wrap" style={{ marginTop: 'var(--space-2)' }}>
              {[...held]
                .filter((p) => !p.startsWith('practice') && !p.endsWith('.own') && p !== 'test.take')
                .map((permission) => (
                  <Badge key={permission} tone="success">
                    {permissionLabel(permission as Permission, locale)}
                  </Badge>
                ))}
              {held.size <= 6 && (
                <span className="muted text-sm">
                  {locale === 'vi' ? 'Chỉ có quyền học tập cơ bản.' : 'Learner permissions only.'}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* ---- Appearance ---- */}
      <Card title={t('settings.appearance')}>
        <div className="stack gap-5">
          <Field label={t('settings.theme')}>
            {() => (
              <Segmented
                ariaLabel={t('settings.theme')}
                value={prefs.theme}
                onChange={(theme: ThemeMode) => dispatch({ type: 'prefs/update', patch: { theme } })}
                options={[
                  { value: 'light', label: t('settings.theme.light') },
                  { value: 'dark', label: t('settings.theme.dark') },
                  { value: 'system', label: t('settings.theme.system') },
                  { value: 'high-contrast', label: t('settings.theme.contrast') },
                ]}
              />
            )}
          </Field>

          <Field label={t('settings.language')}>
            {() => (
              <Segmented
                ariaLabel={t('settings.language')}
                value={prefs.locale}
                onChange={(next: Locale) => dispatch({ type: 'prefs/update', patch: { locale: next } })}
                options={[
                  { value: 'vi', label: 'Tiếng Việt' },
                  { value: 'en', label: 'English' },
                ]}
              />
            )}
          </Field>

          <Field label={`${t('settings.fontSize')} — ${Math.round(prefs.fontScale * 100)}%`}>
            {(id) => (
              <input
                id={id}
                type="range"
                min={0.85}
                max={1.4}
                step={0.05}
                value={prefs.fontScale}
                onChange={(e) => dispatch({ type: 'prefs/update', patch: { fontScale: Number(e.target.value) } })}
                style={{ width: '100%', maxWidth: 320 }}
              />
            )}
          </Field>
        </div>
      </Card>

      {/* ---- Accessibility ---- */}
      <Card title={t('settings.accessibility')}>
        <div className="stack gap-4">
          <Switch
            checked={prefs.dyslexicFont}
            onChange={(dyslexicFont) => dispatch({ type: 'prefs/update', patch: { dyslexicFont } })}
            label={t('settings.dyslexic')}
          />
          <Switch
            checked={prefs.reduceMotion}
            onChange={(reduceMotion) => dispatch({ type: 'prefs/update', patch: { reduceMotion } })}
            label={t('settings.reduceMotion')}
          />
        </div>
      </Card>

      {/* ---- Testing conditions ---- */}
      <Card title={t('settings.testing')}>
        <div className="stack gap-5">
          <Field label={t('settings.timeMultiplier')} hint={t('settings.timeMultiplier.hint')}>
            {() => (
              <Segmented
                ariaLabel={t('settings.timeMultiplier')}
                value={String(prefs.timeMultiplier)}
                onChange={(next) => dispatch({ type: 'prefs/update', patch: { timeMultiplier: Number(next) } })}
                options={[
                  { value: '1', label: t('settings.standard') },
                  { value: '1.5', label: t('settings.extended50') },
                  { value: '2', label: t('settings.extended100') },
                ]}
              />
            )}
          </Field>

          <Field label={t('settings.proctoring')} hint={t('settings.proctoring.hint')}>
            {() => (
              <Segmented
                ariaLabel={t('settings.proctoring')}
                value={prefs.proctoring}
                onChange={(proctoring) => dispatch({ type: 'prefs/update', patch: { proctoring } })}
                options={[
                  { value: 'off', label: t('settings.proctoring.off') },
                  { value: 'monitor', label: t('settings.proctoring.monitor') },
                  { value: 'strict', label: t('settings.proctoring.strict') },
                ]}
              />
            )}
          </Field>

          <Switch
            checked={prefs.showTimerByDefault}
            onChange={(showTimerByDefault) => dispatch({ type: 'prefs/update', patch: { showTimerByDefault } })}
            label={t('settings.showTimer')}
          />
        </div>
      </Card>

      {/* ---- Data ---- */}
      <Card title={t('settings.data')} subtitle={t('settings.dataHint')}>
        <div className="stack gap-4">
          <div className="row gap-3 wrap">
            <Button onClick={() => download('sat365-backup.json', exportState())}>
              <IconDownload size={15} />
              {t('settings.exportData')}
            </Button>
            <Button onClick={() => fileRef.current?.click()}>
              <IconUpload size={15} />
              {t('settings.importData')}
            </Button>
            <Button variant="danger" onClick={() => setConfirmReset(true)}>
              <IconTrash size={15} />
              {t('settings.resetData')}
            </Button>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="sr-only"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const text = await file.text();
              const result = importState(text);
              setImportError(result.ok ? null : result.error);
              event.target.value = '';
            }}
          />

          {importError && (
            <p className="row gap-2 text-sm" style={{ color: 'var(--danger)' }}>
              <IconAlert size={15} />
              {importError}
            </p>
          )}
        </div>
      </Card>

      {/* ---- About ---- */}
      <Card title={t('settings.about')}>
        <div className="stack gap-3 text-sm secondary">
          <p>
            {locale === 'vi'
              ? 'SAT365 dựng theo đặc tả Digital SAT: cấu trúc phần thi, trọng số lĩnh vực, cơ chế thích ứng hai giai đoạn và thang điểm 400–1600 dựa trên IRT.'
              : 'SAT365 is built to the Digital SAT specification: section structure, domain weights, two-stage adaptive delivery, and an IRT-based 400–1600 scale.'}
          </p>
          <div className="row gap-4 wrap">
            <Badge>{stats.total} {t('common.questions')}</Badge>
            <Badge tone="rw">{stats.bySection.rw} R&amp;W</Badge>
            <Badge tone="math">{stats.bySection.math} Math</Badge>
            <Badge tone="info">{stats.sprCount} SPR</Badge>
          </div>
          <p className="muted">
            {locale === 'vi'
              ? 'Mọi dữ liệu học tập nằm trên thiết bị này. Tham số IRT trong bản này là giá trị tạm do người soạn gán; ngân hàng vận hành thực tế phải được hiệu chuẩn trên dữ liệu thí sinh thật — xem docs/PSYCHOMETRICS.md.'
              : 'All study data stays on this device. IRT parameters here are author-assigned provisional values; a production bank must be calibrated on real response data — see docs/PSYCHOMETRICS.md.'}
          </p>
        </div>
      </Card>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title={t('settings.resetData')}
        footer={
          <>
            <Button onClick={() => setConfirmReset(false)}>{t('common.cancel')}</Button>
            <Button
              variant="danger"
              onClick={() => {
                resetAll();
                setConfirmReset(false);
              }}
            >
              {t('common.delete')}
            </Button>
          </>
        }
      >
        <p>{t('settings.resetConfirm')}</p>
      </Modal>
    </div>
  );
}
