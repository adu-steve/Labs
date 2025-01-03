import { expect, test, describe } from "vitest";
import calculatePaymentDue from "./calculatePaymentDue.ts";

describe("calculate payment due function", () => {
  test("should calculate the correct payment due date", () => {
    const paymentDue = calculatePaymentDue("2022-01-31", 30);
    expect(paymentDue).toBe("2022-03-02");
  });
});
