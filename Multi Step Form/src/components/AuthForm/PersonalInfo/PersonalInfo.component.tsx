import Header from "../Header/Header.component";
import { PersonalInfoType, StepTypes } from "../../../types";
import FormGroup from "./FormGroup/FormGroup.component";

import "./personal-info.styles.css";

const PersonalInfo = ({
  name,
  email,
  phoneNumber,
  updateForm,
  nameErr,
  emailErr,
  phoneNumberErr,
}: PersonalInfoType) => {
  return (
    <div className="personal-info wrapper">
      <Header
        title="Personal Info"
        description="Please provide your name, email address, and phone number."
      />

      <form>
        <FormGroup
          inputType="text"
          label="Name"
          placeholder="e.g. Stephen King"
          value={name}
          updateForm={(value: string) => updateForm({ name: value }, "name")}
          errorMsg={nameErr}
        />
        <FormGroup
          inputType="email"
          label="Email address"
          placeholder="e.g. john.doe@example.com"
          value={email}
          updateForm={(value) => updateForm({ email: value }, "email")}
          errorMsg={emailErr}
        />
        <FormGroup
          inputType="tel"
          label="Phone number"
          placeholder="e.g. +1 234 567 890"
          value={phoneNumber}
          updateForm={(value) =>
            updateForm({ phoneNumber: value }, "phoneNumber")
          }
          errorMsg={phoneNumberErr}
        />
      </form>
    </div>
  );
};

export default PersonalInfo;
