export function humanFriendlyNumber(n: number): string {
  if (n < 1000) return `${n}`;
  if (n < 1e6 && n >= 1e3) return `${Math.round(n / 100) / 10}K`;
  if (n < 1e9 && n >= 1e6) return `${Math.round(n / 1e5) / 10}M`;
  return `${n}`;
}

export function integerWithCommas(n: number): string {
  return n.toLocaleString('en-US');
}
