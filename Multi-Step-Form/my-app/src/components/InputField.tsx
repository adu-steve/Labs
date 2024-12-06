import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id: string;
  required: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  error,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={error ? "err" : ""}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default InputField;
