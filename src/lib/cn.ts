/** Ghep class co dieu kien. Bo qua gia tri falsy de JSX goi gon. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
