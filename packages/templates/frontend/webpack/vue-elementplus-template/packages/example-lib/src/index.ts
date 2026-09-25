/** Returns a greeting for the given name. */
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

/** Returns the sum of a list of numbers. */
export function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}
