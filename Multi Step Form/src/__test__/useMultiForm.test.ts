import {
  goToStep,
  isFirstStep,
  isLastStep,
  nextStep,
  prevStep,
} from "../utils/useMultiForm";

describe("Step Functions", () => {
  describe("prevStep", () => {
    it("should return the correct previous step", () => {
      const result = prevStep(2);
      expect(result).toBe(1);
    });

    it("should return the same step when at step 0", () => {
      const result = prevStep(0);
      expect(result).toBe(0);
    });
  });

  describe("nextStep", () => {
    it("should return the next step", () => {
      const result = nextStep(1, 3);
      expect(result).toBe(2);
    });

    it("should not increment beyond the last step", () => {
      const result = nextStep(2, 3);
      expect(result).toBe(2);
    });
  });

  describe("goToStep", () => {
    it("should return the correct step", () => {
      const result = goToStep(3);
      expect(result).toBe(2);
    });
  });

  describe("isFirstStep", () => {
    it("should return true for the first step", () => {
      const result = isFirstStep(0);
      expect(result).toBe(true);
    });

    it("should return false for other steps", () => {
      const result = isFirstStep(1);
      expect(result).toBe(false);
    });
  });

  describe("isLastStep", () => {
    it("should return true for the last step", () => {
      const result = isLastStep(2, 3);
      expect(result).toBe(true);
    });

    it("should return false for other steps", () => {
      const result = isLastStep(1, 3);
      expect(result).toBe(false);
    });
  });
});
