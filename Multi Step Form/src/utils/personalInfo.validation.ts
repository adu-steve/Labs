const personalInfoValidation = (
  userName: string,
  email: string,
  phoneNumber: string
) => {
  let isValid = true;
  let userError = "";
  let emailError = "";
  let phoneError = "";

  if (!userName.trim()) {
    userError = "This field is required";
    isValid = false;
  } else {
    userError = "";
  }

  if (!email.trim()) {
    emailError = "This field is required";
    isValid = false;
  } else {
    emailError = "";
  }

  // Validate phoneNumber
  if (!phoneNumber.trim()) {
    phoneError = "This field is required";
    isValid = false;
  } else {
    phoneError = "";
  }

  return { isValid, userError, emailError, phoneError };
};

export default personalInfoValidation;
