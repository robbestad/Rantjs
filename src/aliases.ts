export const TABLE_ALIASES: Record<string, string> = {
  name: "firstname",
  pro: "pron",
  with: "preposition",
};

export const ARG_ALIASES: Record<string, string> = {
  pl: "plural",
  dposs: "poss",
};

export function resolveTableName(name: string): string {
  const lower = name.toLowerCase();
  return TABLE_ALIASES[lower] ?? lower;
}

export function resolveArgName(name: string): string {
  const lower = name.toLowerCase();
  return ARG_ALIASES[lower] ?? lower;
}
