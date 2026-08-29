import { createContext, useContext } from 'react';
import type { Locale } from '../types.ts';
import { strings, type StringKey } from './strings.ts';

export type Translate = (key: StringKey, vars?: Record<string, string | number>) => string;

export const LocaleContext = createContext<Locale>('vi');

/** Interpolates `{name}` placeholders; falls back to the key if unmapped. */
export function translate(locale: Locale, key: StringKey, vars?: Record<string, string | number>): string {
  const table = strings[locale] ?? strings.vi;
  let text: string = (table as Record<string, string>)[key] ?? (strings.vi as Record<string, string>)[key] ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}

export function useT(): Translate {
  const locale = useContext(LocaleContext);
  return (key, vars) => translate(locale, key, vars);
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export { strings };
export type { StringKey };
