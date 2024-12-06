import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

const PersonalInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(() => {
    return JSON.parse(localStorage.getItem("personalInfo") || "{}");
  });

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("personalInfo", JSON.stringify(formData));
      navigate("/plan-selection");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="personal-info-page">
      <h1>Personal Information</h1>
      <InputField
        label="Name"
        id="name"
        type="text"
        value={formData.name || ""}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <InputField
        label="Email"
        id="email"
        type="email"
        value={formData.email || ""}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <InputField
        label="Phone"
        id="phone"
        type="text"
        value={formData.phone || ""}
        onChange={handleChange}
        error={errors.phone}
        required
      />
      <button onClick={handleNext} className="button-primary">
        Next
      </button>
    </div>
  );
};

export default PersonalInfoPage;
