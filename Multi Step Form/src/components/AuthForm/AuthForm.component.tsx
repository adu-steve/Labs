import { useEffect, useState } from "react";
import PersonalInfo from "./PersonalInfo/PersonalInfo.component";
import { FormItems } from "../../types";
import Plan from "./Plan/Plan.component";
import AddOns from "./Add-ons/AddOns.component.tsx";
import Summary from "./Summary/Summary.component.tsx";
import StepContainer from "./PersonalInfo/Step/StepContainer.component.tsx";
import formFieldValidation from "../../utils/form.field.validation.ts";
import ThankYou from "./ThankYou/ThankYou.component.tsx";

import "./authform.styles.css";
import {
  goToStep,
  isFirstStep,
  isLastStep,
  nextStep,
  prevStep,
  reset,
} from "../../utils/useMultiForm.ts";

const initialValues: FormItems = {
  name: "",
  email: "",
  phoneNumber: "",
  timeFrame: "monthly",
  plan: { price: 9, title: "arcade" },
  addons: [],
};

const initialErrorValues = {
  nameErr: "",
  emailErr: "",
  phoneNumberErr: "",
  addonsErr: "",
};

const totalSteps: number = 4;

function AuthForm() {
  const [formData, setFormData] = useState<FormItems>(() =>
    JSON.parse(
      localStorage.getItem("formData") || JSON.stringify(initialValues)
    )
  );

  const [errors, setErrors] = useState(initialErrorValues);

  const [summaryErr, setSummaryErr] = useState("");
  const [isComplete, setIsComplete] = useState(() =>
    JSON.parse(localStorage.getItem("isComplete") || "false")
  );

  const [currentStep, setCurrentStep] = useState(
    Number(localStorage.getItem("currentStep")) || 0
  );

  const updateForm = (
    fieldToUpdate: Partial<FormItems>,
    field?: keyof FormItems
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...fieldToUpdate,
    }));

    if (field) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`${field}Err`]: formFieldValidation(
          field,
          fieldToUpdate[field] as string
        ),
      }));
    }

    setSummaryErr("");
    setErrors((prevErrs) => ({
      ...prevErrs,
      addonsErr: "",
    }));
  };

  const handleGoToStep = (step: number) => {
    setCurrentStep(() => goToStep(step));
  };
  const handleStepValidation = () => {
    let formIsValid = true;
    setSummaryErr("");

    if (currentStep === 0) {
      const newErrors = {
        nameErr: formFieldValidation("name", formData.name),
        emailErr: formFieldValidation("email", formData.email),
        phoneNumberErr: formFieldValidation(
          "phoneNumber",
          formData.phoneNumber
        ),
      };

      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

      if (newErrors.emailErr || newErrors.nameErr || newErrors.phoneNumberErr)
        formIsValid = false;
    }

    if (currentStep === 3) {
      const newErrors = {
        nameErr: formFieldValidation("name", formData.name),
        emailErr: formFieldValidation("email", formData.email),
        phoneNumberErr: formFieldValidation(
          "phoneNumber",
          formData.phoneNumber
        ),
      };
      if (Object.values(newErrors).every((error) => error === "")) {
        localStorage.setItem("isComplete", "true");
        setIsComplete(true);
        // reset();
        return;
      } else {
        setSummaryErr("please complete the form before submitting");
        return;
      }
    }

    if (formIsValid) {
      setCurrentStep(() => nextStep(currentStep, totalSteps));
    }
  };

  useEffect(() => {
    localStorage.setItem("currentStep", String(currentStep));
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("inProgress", JSON.stringify("true"));
  }, []);

  return (
    <div className="auth__form">
      <StepContainer
        currentStep={currentStep}
        navigateTo={handleGoToStep}
        complete={isComplete}
      />

      <div className="auth__form-container">
        {!isComplete && (
          <>
            {currentStep === 0 && (
              <PersonalInfo {...formData} updateForm={updateForm} {...errors} />
            )}
            {currentStep === 1 && (
              <Plan {...formData} updateForm={updateForm} />
            )}
            {currentStep === 2 && (
              <AddOns {...formData} updateForm={updateForm} {...errors} />
            )}
            {currentStep === 3 && (
              <Summary
                {...formData}
                updateForm={updateForm}
                navigateTo={handleGoToStep}
                error={summaryErr}
              />
            )}
          </>
        )}

        {isComplete && <ThankYou reset={reset} />}

        {!isComplete && (
          <div className="auth__form-button-container">
            {!isFirstStep(currentStep) && (
              <button
                onClick={() => setCurrentStep(() => prevStep(currentStep))}
                className="auth__form-prev-button"
              >
                go back
              </button>
            )}
            <button
              onClick={handleStepValidation}
              className={`auth__form-button ${
                isLastStep(currentStep, totalSteps) ? "confirm" : ""
              }`}
            >
              {isLastStep(currentStep, totalSteps) ? "Confirm" : "Next Step"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
