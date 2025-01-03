import { expect, test, describe } from "vitest";
import generateRandomId from "./generateRandomId.ts";

describe("generate random id function", () => {
  test("should generate a random 6-character alphanumeric string", () => {
    const randomId = generateRandomId();
    expect(randomId).toHaveLength(6);
    expect(randomId).toMatch(/^[a-zA-Z0-9]+$/);
  });

  test("should not generate the same id twice in a row", () => {
    const firstId = generateRandomId();
    const secondId = generateRandomId();
    expect(firstId).not.toEqual(secondId);
  });
});
