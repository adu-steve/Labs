import { FormGroupType } from "../../../../types";

const FormGroup = ({
  label,
  inputType,
  placeholder,
  value,
  errorMsg,
  updateForm,
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
        onChange={(e) => updateForm(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormGroup;
