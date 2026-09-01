export interface Rng {
  next(): number;
  int(max: number): number;
  pick<T>(items: readonly T[]): T;
}

function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function seedFrom(seed?: number | string): number {
  if (typeof seed === "number" && Number.isFinite(seed)) {
    return seed >>> 0;
  }
  if (typeof seed === "string") {
    return hashString(seed);
  }
  return (Math.random() * 0x1_0000_0000) >>> 0;
}

/** Mulberry32 — small, fast, deterministic 32-bit PRNG. */
export function createRng(seed?: number | string): Rng {
  let a = seedFrom(seed);
  const next = (): number => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    int(max: number): number {
      if (max <= 0) return 0;
      return Math.floor(next() * max);
    },
    pick<T>(items: readonly T[]): T {
      if (items.length === 0) {
        throw new Error("Cannot pick from an empty list");
      }
      return items[this.int(items.length)] as T;
    },
  };
}
