import {
  Control,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { InvoiceFormSchema } from "../invoice-form/invoice-form.types";

export type InvoiceFormItemProps = {
  index: number;
  control: Control<InvoiceFormSchema>;
  errors: FieldErrors<InvoiceFormSchema>;
  register: UseFormRegister<InvoiceFormSchema>;
  remove: UseFieldArrayRemove;
};
