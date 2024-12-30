import { InvoiceStatus } from "../../types";
import { InvoiceFormSchema } from "./invoice-form.types";
import { dateToString, stringToDate } from "../../utils/date";

const checkIfInvalid = (n: number) => (isFinite(n) ? n : 0);

const addDays = (date: string, days: number) => {
  const castedDate = stringToDate(date);

  castedDate.setDate(castedDate.getDate() + days);

  return dateToString(castedDate);
};

const calculateTotal = (items: InvoiceFormSchema["items"]) => {
  const itemsWithTotal = items.map((item) => ({
    ...item,
    quantity: checkIfInvalid(item.quantity),
    price: checkIfInvalid(item.price),
    total: checkIfInvalid(item.quantity) * checkIfInvalid(item.price),
  }));

  return {
    items: itemsWithTotal,
    total: itemsWithTotal.reduce((acc, item) => acc + item.total, 0),
  };
};

export const composeForm = (form: InvoiceFormSchema, status: InvoiceStatus) => {
  const itemsWithTotal = calculateTotal(form.items);

  return {
    ...form,
    ...itemsWithTotal,
    status,
    paymentDue:
      form.createdAt && form.paymentTerms
        ? addDays(form.createdAt, form.paymentTerms)
        : "",
  };
};
