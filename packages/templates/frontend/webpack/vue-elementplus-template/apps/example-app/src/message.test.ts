import { describe, expect, it } from "vitest";
import { buildMessage } from "./message.js";

describe("buildMessage", () => {
  it("combines greeting and sum from example-lib", () => {
    expect(buildMessage("Ada", [1, 2, 3])).toBe("Hello, Ada! Sum: 6");
  });
});
