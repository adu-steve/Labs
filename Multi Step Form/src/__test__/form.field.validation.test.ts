import formFieldValidation from "../utils/form.field.validation";

describe("formFieldValidation", () => {
  const fieldRequiredMessage: string = "This field is required.";
  const nameErrorMessage: string = "Name can only contain letters and spaces.";
  const invalidEmailMessage: string = "Invalid email address.";
  const invalidPhoneNumberMessage: string = "Invalid phone number format.";
  const addonsErrorMessage: string = "Please select at least one add-on.";

  describe("name field validation", () => {
    it('should return "This field is required." if name is empty', () => {
      const result = formFieldValidation("name", "");
      expect(result).toBe(fieldRequiredMessage);
    });

    it('should return "Name can only contain letters and spaces." for invalid characters', () => {
      const result = formFieldValidation("name", "John123");
      expect(result).toBe(nameErrorMessage);
    });

    it("should return an empty string if name is valid", () => {
      const result = formFieldValidation("name", "John Doe");
      expect(result).toBe("");
    });
  });

  describe("email field validation", () => {
    it('should return "This field is required." if email is empty', () => {
      const result = formFieldValidation("email", "");
      expect(result).toBe(fieldRequiredMessage);
    });

    it('should return "Invalid email address." for an invalid email', () => {
      const result = formFieldValidation("email", "invalidemail");
      expect(result).toBe(invalidEmailMessage);
    });

    it("should return an empty string if email is valid", () => {
      const result = formFieldValidation("email", "test@example.com");
      expect(result).toBe("");
    });
  });

  describe("phoneNumber field validation", () => {
    it('should return "This field is required." if phone number is empty', () => {
      const result = formFieldValidation("phoneNumber", "");
      expect(result).toBe(fieldRequiredMessage);
    });

    it('should return "Invalid phone number format." for an invalid phone number', () => {
      const result = formFieldValidation("phoneNumber", "12345");
      expect(result).toBe(invalidPhoneNumberMessage);
    });

    it("should return an empty string if phone number is valid", () => {
      const result = formFieldValidation("phoneNumber", "+123 456 789 101");
      expect(result).toBe("");
    });
  });

  describe("addons field validation", () => {
    it('should return "Please select at least one add-on." if no add-ons are selected', () => {
      const result = formFieldValidation("addons", "");
      expect(result).toBe(addonsErrorMessage);
    });

    it("should return an empty string if at least one add-on is selected", () => {
      const result = formFieldValidation("addons", "addon1");
      expect(result).toBe("");
    });
  });
});
