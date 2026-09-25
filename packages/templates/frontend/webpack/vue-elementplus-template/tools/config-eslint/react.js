import { createConfig } from "./factory.js";

// STATUS: placeholder, NOT yet exercised by a real React project.
// Before pointing a real app at this file, verify against real .tsx files
// whether react-hooks rules need to be enabled explicitly, and whether the
// `react: true` option shape has changed in the installed antfu version.
// See docs/adr/0002-eslint-antfu.md for context.
export default createConfig({
  react: true,
});
