import { useFormContext } from "react-hook-form";
import Text from "../../ui/typography/text/Text.tsx";
import FormAddress from "../address/FormAddress.tsx";
import { Errors } from "../../../types/form.types.ts";
import TextField from "../../ui/text-field/TextField.tsx";

const BillTo = () => {
  const {
    formState: { errors },
  } = useFormContext();

  const { clientName, clientEmail } = (errors as Errors) ?? {};
  return (
    <div className={"bill-to"}>
      <Text bold={true}>Bill to</Text>
      <div>
        <label htmlFor={"clientName"} className={clientName ? "error" : ""}>
          Client's Name{" "}
          {clientName && (
            <Text size={"sm"} type={"span"}>
              {clientName?.message ?? ""}
            </Text>
          )}
        </label>
        <TextField
          className={clientName && "error"}
          id="clientName"
          name="clientName"
          validationRules={{
            required: "can't be empty",
            pattern: {
              value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
              message: "can't contain numbers or symbols",
            },
          }}
        />
      </div>
      <div>
        <label htmlFor={"clientEmail"} className={clientEmail ? "error" : ""}>
          Client's Email{" "}
          {clientEmail && (
            <Text size={"sm"} type={"span"}>
              {clientEmail?.message ?? ""}
            </Text>
          )}
        </label>
        <TextField
          className={clientEmail && "error"}
          id={"clientEmail"}
          type="email"
          name="clientEmail"
          validationRules={{
            required: "can't be empty",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "invalid email address",
            },
          }}
        />
      </div>
      <FormAddress field="clientAddress" />
    </div>
  );
};

export default BillTo;
