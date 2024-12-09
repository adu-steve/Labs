const formFieldValidation = (field: string, value: string) => {
  let errorMessage = "";

  switch (field) {
    case "name":
      errorMessage = !value.trim()
        ? "This field is required."
        : !/^[a-zA-Z\s]+$/.test(value.trim())
        ? "Name can only contain letters and spaces."
        : "";
      break;

    case "email":
      errorMessage = !value.trim()
        ? "This field is required."
        : !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())
        ? "Invalid email address."
        : "";
      break;

    case "phoneNumber":
      errorMessage = !value.trim()
        ? "This field is required."
        : !/^\+\d{1,3}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{3,}$/.test(value.trim())
        ? "Invalid phone number format."
        : "";
      break;

    case "addons":
        errorMessage = !value.trim() ? "Please select at least one add-on." : "";
      break;

    default:
      break;
  }

  return errorMessage;
};

export default formFieldValidation;
