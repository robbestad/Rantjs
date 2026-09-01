const ONES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function belowThousand(n: number): string {
  if (n < 20) return ONES[n] ?? String(n);
  if (n < 100) {
    const t = TENS[Math.floor(n / 10)]!;
    const o = n % 10;
    return o ? `${t}-${ONES[o]}` : t;
  }
  const h = Math.floor(n / 100);
  const rest = n % 100;
  return rest ? `${ONES[h]} hundred ${belowThousand(rest)}` : `${ONES[h]} hundred`;
}

export function verbalize(n: number): string {
  const sign = n < 0 ? "minus " : "";
  let x = Math.trunc(Math.abs(n));
  if (x === 0) return "zero";
  if (x > 999_999_999) return String(n);
  const parts: string[] = [];
  const billions = Math.floor(x / 1_000_000_000);
  x %= 1_000_000_000;
  const millions = Math.floor(x / 1_000_000);
  x %= 1_000_000;
  const thousands = Math.floor(x / 1000);
  const rest = x % 1000;
  if (billions) parts.push(`${belowThousand(billions)} billion`);
  if (millions) parts.push(`${belowThousand(millions)} million`);
  if (thousands) parts.push(`${belowThousand(thousands)} thousand`);
  if (rest) parts.push(belowThousand(rest));
  return sign + parts.join(" ");
}

export function toRoman(n: number, lower = false): string {
  const x = Math.trunc(Math.abs(n));
  if (x <= 0 || x >= 4000) return String(n);
  const map: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let left = x;
  let out = "";
  for (const [v, s] of map) {
    while (left >= v) {
      out += s;
      left -= v;
    }
  }
  return lower ? out.toLowerCase() : out;
}

export function formatNumber(n: number, mode: string): string {
  switch (mode) {
    case "verbal":
      return verbalize(n);
    case "roman":
    case "roman-upper":
      return toRoman(n, false);
    case "roman-lower":
      return toRoman(n, true);
    case "hex":
    case "hex-upper":
      return Math.trunc(n).toString(16).toUpperCase();
    case "hex-lower":
      return Math.trunc(n).toString(16);
    case "binary":
      return Math.trunc(n).toString(2);
    default:
      return String(n);
  }
}
