import { FormGroupType } from "../../../../types";

const FormInput = ({
  label,
  inputType,
  placeholder,
  value,
  errorMsg,
  onChange,
}: FormGroupType) => {
  return (
    <div className="form-group">
      <div className="form-group__label">
        <label htmlFor={label.split(" ").join("")}>{label}</label>
        {errorMsg && <p className="error__message">{errorMsg}</p>}
      </div>
      <input
        className={errorMsg ? "error" : ""}
        id={label.split(" ").join("")}
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
