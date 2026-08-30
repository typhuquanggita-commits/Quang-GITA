/**
 * The shell: routing, permissions, and the navigation itself.
 *
 * These exist because of what an audit found rather than what a design
 * anticipated. Each one pins a defect that had already happened.
 *
 * Navigation bloat is the interesting one. Seventeen items had accumulated in
 * a single flat group, one harmless addition at a time, and nothing objected
 * because nothing was watching. A learner cannot find anything in a list that
 * long, which quietly defeats every surface in it — a resource that cannot be
 * reached at the moment of need is a resource nobody has.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

import { ROUTE_PERMISSION, hashToRoute, routeToHash, type Route } from '../src/features/shell/routes.ts';
import { ALL_PERMISSIONS } from '../src/auth/roles.ts';
import { strings } from '../src/i18n/strings.ts';

const shell = readFileSync('src/features/shell/AppShell.tsx', 'utf8');

/* ---------------- Navigation ---------------- */

test('no navigation group grows past what a person can scan', () => {
  // Group boundaries are the `label: t('nav.…')` lines; items are the routes
  // between them. Counting from the source keeps this honest without
  // rendering React in a test runner that cannot load .tsx.
  const region = shell.slice(
    shell.indexOf('const groups: Array<{ label: string; items: NavItem[] }>'),
    shell.indexOf('const visibleGroups = groups'),
  );

  const groups: number[] = [];
  for (const line of region.split('\n')) {
    if (/label: t\('nav\.(daily|library|pathway|assess|system)'\)/.test(line)) groups.push(0);
    else if (/route: \{ name: '[a-z-]+' \}/.test(line) && groups.length > 0) {
      groups[groups.length - 1] += 1;
    }
  }

  assert.ok(groups.length >= 4, `only ${groups.length} navigation groups`);
  for (const size of groups) {
    assert.ok(size >= 2, 'a group with fewer than two items is not a group');
    assert.ok(size <= 7, `a group holds ${size} items — past what a person scans without reading`);
  }
});

test('every navigation label comes from the string table, not from an inline ternary', () => {
  const region = shell.slice(
    shell.indexOf('const groups: Array<{ label: string; items: NavItem[] }>'),
    shell.indexOf('const visibleGroups = groups'),
  );
  // Inline bilingual is the convention inside a feature; the shell chrome is
  // translated, and mixing the two is how half the sidebar stops switching
  // language.
  assert.ok(
    !region.includes("locale === 'vi' ?"),
    'a navigation label is written inline instead of going through t()',
  );
});

test('every navigation label resolves in both languages', () => {
  for (const match of shell.matchAll(/label: t\('([a-zA-Z.]+)'\)/g)) {
    const key = match[1] as keyof typeof strings.vi;
    assert.ok(key in strings.vi, `${key} is missing from the Vietnamese table`);
    assert.ok(key in strings.en, `${key} is missing from the English table`);
  }
});

/* ---------------- Permissions ---------------- */

test('every route naming a permission names one that exists', () => {
  const known = new Set<string>(ALL_PERMISSIONS);
  for (const [route, permission] of Object.entries(ROUTE_PERMISSION)) {
    assert.ok(known.has(permission), `${route} requires "${permission}", which is not a permission`);
  }
});

test('every route built from a learner’s own attempt requires a permission', () => {
  // `result` shipped without one. Harmless while every role holds review.own,
  // and a hole the moment a guardian role is added without it.
  for (const route of ['result', 'attempt-review', 'attempt-analysis', 'exam', 'dossier'] as const) {
    assert.ok(
      route in ROUTE_PERMISSION,
      `${route} renders a learner's own attempt data and carries no permission`,
    );
  }
});

test('the routes left unpermissioned are only the ones everyone may see', () => {
  const open = ['dashboard', 'brand', 'settings', 'shortcuts'];
  for (const route of open) {
    assert.ok(!(route in ROUTE_PERMISSION), `${route} is expected to be open to every signed-in user`);
  }
});

/* ---------------- Hash routing ---------------- */

test('every route round-trips through its hash', () => {
  const routes: Route[] = [
    { name: 'today' }, { name: 'dashboard' }, { name: 'practice' }, { name: 'vocab' },
    { name: 'lessons' }, { name: 'topics' }, { name: 'curriculum' }, { name: 'programmes' },
    { name: 'tactics' }, { name: 'expert-solutions' }, { name: 'must-know' }, { name: 'papers' },
    { name: 'plan' }, { name: 'test-dates' }, { name: 'roadmap' }, { name: 'gita' },
    { name: 'tests' }, { name: 'review' }, { name: 'analytics' }, { name: 'dossier' },
    { name: 'certificate' }, { name: 'guardian-report' }, { name: 'console' },
    { name: 'calibration' }, { name: 'metrics' }, { name: 'brand' }, { name: 'settings' },
    { name: 'shortcuts' },
    { name: 'lesson', skill: 'transitions' },
    { name: 'packet', skill: 'boundaries' },
    { name: 'paper', paperId: 'sat365-p1' },
    { name: 'exam', attemptId: 'a1' },
    { name: 'result', attemptId: 'a1' },
    { name: 'attempt-review', attemptId: 'a1' },
    { name: 'attempt-analysis', attemptId: 'a1' },
    { name: 'student', accountId: 'acc1' },
    { name: 'practice-session', sessionId: 's1' },
  ];

  for (const route of routes) {
    assert.deepEqual(hashToRoute(routeToHash(route)), route, `${route.name} does not round-trip`);
  }
});

test('a hostile hash cannot reach the prototype chain', () => {
  // Route names arrive from the address bar.
  for (const hostile of ['#/constructor', '#/__proto__', '#/toString', '#/valueOf']) {
    const route = hashToRoute(hostile);
    assert.equal(typeof route.name, 'string');
    assert.ok(!(route as unknown as { name: unknown }).name?.toString().includes('function'));
  }
});

test('an unknown hash lands somewhere real rather than a blank page', () => {
  assert.equal(hashToRoute('#/does-not-exist').name, 'dashboard');
  assert.equal(hashToRoute('').name, 'dashboard');
});

/* ---------------- The rule that shipped once ---------------- */

test('no component is defined inside another component’s body', () => {
  // A nested component gets a new identity on every parent render, so React
  // unmounts and remounts the whole subtree. With a store-wide reducer that
  // means every dispatch destroys whatever is on screen. This is the one bug
  // this codebase forbids by name, and an audit found two live instances.
  const files = execSync('find src -name "*.tsx"', { encoding: 'utf8' }).trim().split('\n');

  const offenders: string[] = [];
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    let insideComponent = false;
    source.split('\n').forEach((line, i) => {
      if (/^(export )?function [A-Z]/.test(line)) insideComponent = true;
      else if (/^\}/.test(line)) insideComponent = false;
      else if (insideComponent && /^ {2}function [A-Z]\w*\s*\(/.test(line)) {
        offenders.push(`${file}:${i + 1} ${line.trim()}`);
      }
    });
  }

  assert.deepEqual(offenders, [], `components declared inside another component:\n${offenders.join('\n')}`);
});
