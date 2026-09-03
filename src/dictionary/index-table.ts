import type { Entry } from "./types.ts";

export function buildTableIndex(entries: Entry[]): {
  byClass: Record<string, number[]>;
  hasNsfw: boolean;
} {
  const byClass: Record<string, number[]> = {};
  let hasNsfw = false;

  const add = (cls: string, i: number) => {
    const bucket = (byClass[cls] ??= []);
    if (bucket[bucket.length - 1] !== i) bucket.push(i);
  };

  for (let i = 0; i < entries.length; i++) {
    const classes = entries[i]!.classes;
    let maleQ = false;
    let femaleQ = false;
    for (const c of classes) {
      add(c, i);
      if (c === "male?") {
        add("male", i);
        maleQ = true;
      } else if (c === "female?") {
        add("female", i);
        femaleQ = true;
      } else if (c === "nsfw") {
        hasNsfw = true;
      }
    }
    if (maleQ && femaleQ) add("neutral", i);
  }

  return { byClass, hasNsfw };
}
