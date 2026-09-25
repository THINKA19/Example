/* eslint-disable no-console */
const colors = {
  green: (s: string) => `\x1B[32m${s}\x1B[0m`,
  yellow: (s: string) => `\x1B[33m${s}\x1B[0m`,
  cyan: (s: string) => `\x1B[36m${s}\x1B[0m`,
  red: (s: string) => `\x1B[31m${s}\x1B[0m`,
}

export const logger = {
  step: (msg: string) => console.log(colors.cyan(`\n${msg}`)),
  success: (msg: string) => console.log(colors.green(`✔ ${msg}`)),
  warn: (msg: string) => console.warn(colors.yellow(`⚠ ${msg}`)),
  error: (msg: string) => console.error(colors.red(`✖ ${msg}`)),
}
