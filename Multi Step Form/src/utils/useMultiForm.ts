import { FormItems } from "../types";

const initialValues: FormItems = {
  name: "",
  email: "",
  phoneNumber: "",
  timeFrame: "monthly",
  plan: { price: 9, title: "arcade" },
  addons: [],
};

export const prevStep = (currentStep: number) => {
  if (currentStep === 0) return currentStep;
  return currentStep - 1;
};

export const nextStep = (currentStep: number, totalSteps: number) => {
  if (currentStep === totalSteps - 1) return currentStep;
  return currentStep + 1;
};

export const goToStep = (step: number) => {
  return step - 1;
};

export const isFirstStep = (step: number): boolean => step === 0;

export const isLastStep = (step: number, totalSteps: number): boolean =>
  step === totalSteps - 1;

export const reset = () => {
  localStorage.removeItem("isComplete");
  localStorage.removeItem("inProgress");
  localStorage.removeItem("formData");
  localStorage.removeItem("currentStep");
};
