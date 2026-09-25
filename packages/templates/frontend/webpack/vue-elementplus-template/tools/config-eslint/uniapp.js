import { createConfig } from "./factory.js";

// STATUS: placeholder, NOT yet exercised by a real uniapp project.
//
// uniapp is Vue3-based, so this starts from the same { vue: true } option as
// vue.js. The known unresolved problem is conditional-compilation comments
// (e.g. `// #ifdef APP-PLUS ... // #endif`): ESLint has no built-in concept of
// them, and they can be flagged as dead code or cause parse errors depending
// on what sits inside the block.
//
// TODO: when the first uniapp project lands, capture the real failure cases
// here before writing a fix — do not guess at ignore patterns in advance.
export default createConfig({
  vue: true,
});
