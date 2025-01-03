import { useFormContext } from "react-hook-form";
import "./formaddress.styles.css";
import Text from "../../ui/typography/text/Text.tsx";
import { Errors } from "../../../types/form.types.ts";
import TextField from "../../ui/text-field/TextField.tsx";

interface FormAddressProps {
  field: string;
}

const FormAddress = ({ field }: FormAddressProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const { street, postCode, city, country } = (errors[field] as Errors) ?? {};

  return (
    <div className={"form-address"}>
      <div>
        <label
          htmlFor={field + "streetAddress"}
          className={street ? "error" : ""}
        >
          Street Address
          {street && (
            <Text size={"sm"} type={"span"}>
              {street?.message}
            </Text>
          )}
        </label>
        <TextField
          className={street ? "error" : ""}
          id={field + "streetAddress"}
          name={`${field}.street`}
          validationRules={{
            required: "can't be empty",
          }}
        />
      </div>
      <div className={"form-address__info"}>
        <div className={"form-address__info-left"}>
          <div>
            <label htmlFor={field + "city"} className={city ? "error" : ""}>
              City
            </label>
            <TextField
              className={city ? "error" : ""}
              id={field + "city"}
              name={`${field}.city`}
              validationRules={{
                required: "can't be empty",
              }}
            />
          </div>
          <div>
            <label
              htmlFor={field + "postalCode"}
              className={postCode ? "error" : ""}
            >
              Postal Code
            </label>
            <TextField
              className={postCode ? "error" : ""}
              id={field + "postalCode"}
              name={`${field}.postCode`}
              validationRules={{
                required: "can't be empty",
              }}
            />
          </div>
        </div>
        <div className={"form-address__info-country"}>
          <label htmlFor={field + "country"} className={country ? "error" : ""}>
            Country
          </label>
          <TextField
            className={country ? "error" : ""}
            id={field + "country"}
            name={`${field}.country`}
            validationRules={{
              required: "can't be empty",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormAddress;
