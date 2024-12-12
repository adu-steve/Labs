import Header from "../Header/Header.component";
import { PersonalInfoType } from "../../../types";
import FormGroup from "../FormGroup/FormGroup";
import { useAppSelector, useAppDispatch } from "../../../store";
import { setName, setEmail, setPhoneNumber } from "../../../features/formSlice";

import "./personal-info.styles.css";

const PersonalInfo = ({
  nameErr,
  emailErr,
  phoneNumberErr,
}: PersonalInfoType) => {
  const dispatch = useAppDispatch();
  const { name, email, phoneNumber } = useAppSelector((state) => state.form);
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
          updateForm={(value: string) => dispatch(setName(value))}
          errorMsg={nameErr}
        />
        <FormGroup
          inputType="email"
          label="Email address"
          placeholder="e.g. john.doe@example.com"
          value={email}
          updateForm={(value: string) => dispatch(setEmail(value))}
          errorMsg={emailErr}
        />
        <FormGroup
          inputType="tel"
          label="Phone number"
          placeholder="e.g. +1 234 567 890"
          value={phoneNumber}
          updateForm={(value: string) => dispatch(setPhoneNumber(value))}
          errorMsg={phoneNumberErr}
        />
      </form>
    </div>
  );
};

export default PersonalInfo;
