import { RegisterOptions, useFormContext } from "react-hook-form";
import "./textfield.styles.css";
interface TextFieldProps {
  type?: string;
  name: string;
  id: string;
  className?: string;
  validationRules?: RegisterOptions;
}
const TextField = ({
  type = "text",
  className,
  id,
  name,
  validationRules,
}: TextFieldProps) => {
  const { register } = useFormContext();
  return (
    <input
      className={`text-field ${className ?? ""}`}
      type={type}
      id={id}
      {...register(name, validationRules)}
    />
  );
};

export default TextField;
