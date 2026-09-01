import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { rant } from "./rant.ts";

function printHelp(): void {
  process.stdout.write(`Usage: rantjs [options] <pattern>
       rantjs [options] -f <file>

Generate procedural text from a Rantjs pattern.

Options:
  -s, --seed <value>   Seed the generator for repeatable output
  -f, --file <path>    Read the pattern from a file
      --nsfw           Include NSFW dictionary entries
  -h, --help           Show this help
  -v, --version        Show version
`);
}

function parseArgs(argv: string[]): {
  seed?: string;
  file?: string;
  nsfw: boolean;
  help: boolean;
  version: boolean;
  pattern?: string;
} {
  const out: ReturnType<typeof parseArgs> = { nsfw: false, help: false, version: false };
  const rest: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg === "-h" || arg === "--help") out.help = true;
    else if (arg === "-v" || arg === "--version") out.version = true;
    else if (arg === "--nsfw") out.nsfw = true;
    else if (arg === "-s" || arg === "--seed") out.seed = argv[++i];
    else if (arg === "-f" || arg === "--file") out.file = argv[++i];
    else if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    } else rest.push(arg);
  }
  if (rest.length) out.pattern = rest.join(" ");
  return out;
}

export function main(argv = process.argv.slice(2)): number {
  try {
    const args = parseArgs(argv);
    if (args.help) {
      printHelp();
      return 0;
    }
    if (args.version) {
      process.stdout.write("2.0.0\n");
      return 0;
    }
    let pattern = args.pattern;
    if (args.file) pattern = readFileSync(args.file, "utf8");
    if (!pattern) {
      printHelp();
      return 1;
    }
    const seed =
      args.seed !== undefined && /^\d+$/.test(args.seed)
        ? Number(args.seed)
        : args.seed;
    const result = rant(pattern, { seed, nsfw: args.nsfw });
    process.stdout.write(result.endsWith("\n") ? result : `${result}\n`);
    return 0;
  } catch (err) {
    process.stderr.write(`${err instanceof Error ? err.message : err}\n`);
    return 1;
  }
}

const invoked =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invoked) {
  process.exit(main());
}
