export type CaseMode =
  | "none"
  | "default"
  | "first"
  | "word"
  | "title"
  | "upper"
  | "lower"
  | "sentence";

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
  carrier?: string;
  raw: string;
}

export interface TagNode {
  type: "tag";
  name: string;
  arg: string;
}

export interface BlockNode {
  type: "block";
  alternatives: Node[][];
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
