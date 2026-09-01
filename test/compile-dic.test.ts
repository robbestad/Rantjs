import { describe, expect, it } from "vitest";
import { compileDic } from "../src/dictionary/compile-dic.ts";

const sample = `#version 2
#name name
#subs default abbr

#class add female
  > Alice
  > Betty
#class remove female

#class add male
  > Abbot
  > Sean/S
#class remove male

#class add male?
  #class add female?
    > Jordan
  #class remove female?
#class remove male?

#nsfw
> forbidden
#sfw
`;

describe("compileDic", () => {
  it("aliases #name name to firstname", () => {
    const table = compileDic(sample);
    expect(table.name).toBe("firstname");
    expect(table.subs).toEqual(["default", "abbr"]);
  });

  it("tracks nested classes", () => {
    const table = compileDic(sample);
    const jordan = table.entries.find((e) => e.forms[0] === "Jordan");
    expect(jordan?.classes).toEqual(["male?", "female?"]);
    const alice = table.entries.find((e) => e.forms[0] === "Alice");
    expect(alice?.classes).toEqual(["female"]);
  });

  it("splits forms on slash", () => {
    const table = compileDic(sample);
    const sean = table.entries.find((e) => e.forms[0] === "Sean");
    expect(sean?.forms).toEqual(["Sean", "S"]);
  });

  it("marks nsfw context entries", () => {
    const table = compileDic(sample);
    const nsfw = table.entries.find((e) => e.forms[0] === "forbidden");
    expect(nsfw?.classes).toContain("nsfw");
  });

  it("attaches extra | class metadata", () => {
    const table = compileDic(`#name noun
#subs singular plural
> golf ball/golf balls
  | class round
`);
    expect(table.entries[0]?.classes).toContain("round");
  });
});
