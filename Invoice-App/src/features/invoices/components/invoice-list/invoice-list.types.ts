import { IInvoice } from "../../types";

export type InvoiceListProps = {
  invoices: IInvoice[];
  onSelectInvoice: (id: string) => void;
};
