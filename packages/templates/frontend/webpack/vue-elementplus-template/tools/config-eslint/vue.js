import { createConfig } from "./factory.js";

// STATUS: placeholder, NOT yet exercised by a real Vue project or run against a
// single .vue file. Before pointing a real app at this file:
//   - confirm whether `vueVersion: 3` (or similar) needs to be passed explicitly
//   - run `pnpm exec eslint --inspect-config` inside that app and read the
//     resolved rule set, since antfu's option shape can change between versions
// See docs/adr/0002-eslint-antfu.md for context.
export default createConfig({
  vue: true,
});
