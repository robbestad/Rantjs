import { create } from "svenjs";
import { explain } from "rantjs";
import svenjsMark from "./svenjs-mark.svg";

const EXAMPLES = [
  "<firstname male> likes to <verb-transitive> <noun.plural> with <pron poss male> pet <noun-animal> on <timenoun dayofweek plural>.",
  "[case:title][sep:\\n][rep:3]{I like <noun animal plural> but not <noun animal plural>}",
  "{heads|tails} — the coin says {heads|tails}.",
  "<firstname male :: hero> walked into the <place> with <pron poss male> <noun-animal>. <::hero> did not knock.",
  "[a] <adj> <noun-animal> <verb.ed> [a] <noun>.",
  "{(80)Usually|(20)Rarely}, [n:2;9] <noun-animal plural> appear in the <place>.",
  "A random string: [rep:8]{\\C}",
];

type DemoState = {
  pattern: string;
  seed: string;
  output: string;
  picks: string;
  status: string;
};

function parseSeed(value: string): number | string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function evaluate(
  pattern: string,
  seed: string,
): Pick<DemoState, "output" | "picks" | "status"> {
  if (!pattern.trim()) {
    return { output: "", picks: "", status: "Write a pattern first." };
  }
  try {
    const { text, picks } = explain(pattern, { seed: parseSeed(seed) });
    const summary = picks
      .map((p) => (p.carrier ? `${p.table} (${p.carrier})=${p.value}` : `${p.table}=${p.value}`))
      .join(" · ");
    return { output: text, picks: summary, status: "" };
  } catch (err) {
    return {
      output: "",
      picks: "",
      status: err instanceof Error ? err.message : String(err),
    };
  }
}

export const App = create<Record<string, never>, DemoState>({
  initialState() {
    const pattern = EXAMPLES[0] ?? "";
    return { pattern, seed: "", ...evaluate(pattern, "") };
  },
  run() {
    this.setState({
      ...this.state,
      ...evaluate(this.state.pattern, this.state.seed),
    });
  },
  loadExample(pattern: string) {
    this.setState({
      ...this.state,
      pattern,
      ...evaluate(pattern, this.state.seed),
    });
  },
  reseed() {
    const seed = String(Math.floor(Math.random() * 1_000_000_000));
    this.setState({
      ...this.state,
      seed,
      ...evaluate(this.state.pattern, seed),
    });
  },
  async copy() {
    const text = this.state.output;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      this.setState((s: DemoState) => ({ ...s, status: "Copied." }));
    } catch {
      const el = this._output as HTMLTextAreaElement | undefined;
      el?.select();
      this.setState((s: DemoState) => ({
        ...s,
        status: "Select the output and copy it.",
      }));
    }
  },
  render() {
    const { pattern, seed, output, picks, status } = this.state;

    return (
      <div className="page">
        <header className="mast">
          <div>
            <p className="eyebrow">Procedural text for JavaScript</p>
            <h1>
              Rant<em>js</em>
            </h1>
          </div>
          <nav>
            <a href="https://github.com/robbestad/Rantjs">GitHub</a>
            <a href="https://www.npmjs.com/package/rantjs">npm</a>
          </nav>
        </header>

        <section className="stage">
          <label htmlFor="pattern">Pattern</label>
          <textarea
            id="pattern"
            spellcheck={false}
            value={pattern}
            onInput={(e: InputEvent) =>
              this.setState({
                ...this.state,
                pattern: (e.target as HTMLTextAreaElement).value,
              })
            }
            onKeyDown={(e: KeyboardEvent) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                this.run();
              }
            }}
          />
          <div className="toolbar">
            <button type="button" onClick={() => this.run()}>
              Run pattern
            </button>
            <label className="seed">
              Seed
              <input
                id="seed"
                type="text"
                inputMode="numeric"
                placeholder="optional"
                value={seed}
                onInput={(e: InputEvent) =>
                  this.setState({
                    ...this.state,
                    seed: (e.target as HTMLInputElement).value,
                  })
                }
                onKeyDown={(e: KeyboardEvent) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.run();
                  }
                }}
              />
            </label>
            <button type="button" className="ghost" onClick={() => this.reseed()}>
              New seed
            </button>
            <button type="button" className="ghost" onClick={() => this.copy()}>
              Copy output
            </button>
          </div>
          <p className="hint">⌘/Ctrl + Enter runs the pattern.</p>
          <label htmlFor="output">Output</label>
          <textarea
            id="output"
            readOnly
            spellcheck={false}
            value={output}
            ref={(el: HTMLTextAreaElement | null) => {
              this._output = el;
            }}
          />
          {picks ? <p className="picks">{picks}</p> : null}
          {status ? (
            <p className="status" role="status" aria-live="polite">
              {status}
            </p>
          ) : null}
        </section>

        <section>
          <h2>Examples</h2>
          <div className="chips">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                className={example === pattern ? "active" : ""}
                onClick={() => this.loadExample(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </section>

        <section className="grid">
          <article>
            <h2>Queries</h2>
            <p>
              Angle brackets pull a random word from the dictionary. Filters and
              inflections can be written with a space, dash, or dot.
            </p>
            <pre>{`<firstname male>
<noun-animal plural>
<verb.ed>
<pron poss male>`}</pre>
          </article>
          <article>
            <h2>Blocks</h2>
            <p>
              Curly braces choose an alternative. Repeaters and separators apply
              to the next block. A block with no repeater runs once.
            </p>
            <pre>{`{heads|tails}
[rep:3][sep:\\s]{click|clack}
{(80)common|(20)rare}`}</pre>
          </article>
          <article>
            <h2>Carriers &amp; articles</h2>
            <p>
              Name a result so you can reuse it. <code>[a]</code> inserts{" "}
              <em>a</em> or <em>an</em> in front of the next word.
            </p>
            <pre>{`<firstname male :: hero> saw <::hero>
[a] <noun animal>`}</pre>
          </article>
        </section>

        <footer>
          <p>
            Rantjs 3.0 — inspired by{" "}
            <a href="https://github.com/TheBerkin/rant3">Rant</a>. Dictionary
            compiled from Rantionary.
          </p>
          <a
            className="svenjs-credit"
            href="https://svenjs.xyz/"
            rel="noopener noreferrer"
          >
            <img
              className="svenjs-mark"
              src={svenjsMark}
              width="36"
              height="36"
              alt=""
            />
            <span className="svenjs-credit-copy">
              <span className="svenjs-credit-kicker">UI built with</span>
              <span className="svenjs-credit-name">SvenJS 3.2.1</span>
            </span>
          </a>
        </footer>
      </div>
    );
  },
});
