import { describe, expect, it } from "vitest";
import { greet, sum } from "./index.js";

describe("greet", () => {
  it("greets by name", () => {
    expect(greet("Ada")).toBe("Hello, Ada!");
  });
});

describe("sum", () => {
  it("adds numbers", () => {
    expect(sum([1, 2, 3])).toBe(6);
  });

  it("returns 0 for an empty list", () => {
    expect(sum([])).toBe(0);
  });
});
