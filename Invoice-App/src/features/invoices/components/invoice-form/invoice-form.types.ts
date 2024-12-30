import { z } from "zod";
import { IInvoice } from "../..";
import { schema } from "./invoice-form.schema";

export type InvoiceFormProps = {
  defaultValues?: IInvoice;
  onSave: () => void;
  onCancel?: () => void;
};

export type InvoiceFormSchema = z.infer<typeof schema>;
