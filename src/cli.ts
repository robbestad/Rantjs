import { main } from "./cli-main.ts";

const code = main();
if (code !== 0) process.exit(code);
