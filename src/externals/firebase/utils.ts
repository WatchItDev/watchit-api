export function stripNulls<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v != null),
  ) as { [K in keyof T]?: NonNullable<T[K]> };
}

export function buildKeywords(
  obj: Record<string, unknown>,
  prefixFields: string[],
  wholeFields: string[],
  minLen = 1,
): string[] {
  const set = new Set<string>();

  const normalize = (txt: string) =>
    txt
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .trim();

  wholeFields.forEach((f) => {
    const raw = obj[f] as string | undefined;
    if (raw) set.add(raw.toLowerCase());
  });

  prefixFields.forEach((f) => {
    const raw = obj[f] as string | undefined;
    if (!raw) return;

    normalize(raw)
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => {
        for (let len = word.length; len >= minLen; len--) {
          set.add(word.slice(0, len));
        }
      });
  });

  return [...set];
}
