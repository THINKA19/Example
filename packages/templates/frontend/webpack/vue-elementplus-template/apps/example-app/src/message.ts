import { greet, sum } from "@acme/example-lib";

export function buildMessage(name: string, values: readonly number[]): string {
  return `${greet(name)} Sum: ${sum(values)}`;
}
