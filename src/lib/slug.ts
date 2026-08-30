/** Chuyển tiếng Việt có dấu thành slug thân thiện với công cụ tìm kiếm. */
export function slugify(input: string, maxWords = 9): string {
  const base = input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const words = base.split('-').filter(Boolean);
  return words.slice(0, maxWords).join('-');
}

/** Sinh slug duy nhất trong một tập hợp, nối hậu tố khi trùng. */
export function uniqueSlugs<T>(items: T[], name: (t: T) => string, key: (t: T) => string) {
  const used = new Map<string, number>();
  const map = new Map<string, string>();
  const back = new Map<string, string>();
  for (const it of items) {
    let s = slugify(name(it));
    if (!s) s = slugify(key(it));
    const n = used.get(s) ?? 0;
    used.set(s, n + 1);
    const finalSlug = n === 0 ? s : `${s}-${n + 1}`;
    map.set(key(it), finalSlug);
    back.set(finalSlug, key(it));
  }
  return { toSlug: map, toId: back };
}
