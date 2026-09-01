export type CaseMode =
  | "none"
  | "default"
  | "first"
  | "word"
  | "title"
  | "upper"
  | "lower"
  | "sentence";

export type CarrierKind = "match" | "unique" | "rhyme";

export type Node =
  | TextNode
  | QueryNode
  | TagNode
  | BlockNode
  | EscapeNode;

export interface TextNode {
  type: "text";
  value: string;
}

export interface QueryNode {
  type: "query";
  table: string;
  args: string[];
  exclude: string[];
  carrier?: string;
  carrierKind?: CarrierKind;
  raw: string;
}

export interface TagNode {
  type: "tag";
  name: string;
  arg: string;
  args: Node[][];
}

export interface BlockAlt {
  weight: Node[] | null;
  nodes: Node[];
}

export interface BlockNode {
  type: "block";
  alternatives: BlockAlt[];
}

export interface EscapeNode {
  type: "escape";
  code: string;
}

export type Token =
  | { kind: "text"; value: string }
  | { kind: "query"; value: string }
  | { kind: "tag"; value: string }
  | { kind: "lbrace" }
  | { kind: "rbrace" }
  | { kind: "pipe" }
  | { kind: "escape"; code: string }
  | { kind: "eof" };
