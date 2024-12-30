import { invoices } from "../../data";
import { FilterOptions, IInvoice } from "../../types";

const key = "invoices";

export const getInvoicesFromStorage = (): IInvoice[] =>
  JSON.parse(localStorage.getItem(key) || "null") || invoices;

export const updateInvoicesInStorage = (invoices: IInvoice[]) =>
  localStorage.setItem(key, JSON.stringify(invoices));

export const filterInvoices = (
  invoices: IInvoice[],
  options: FilterOptions
) => {
  const { draft, paid, pending } = options;

  //return the entire array when the user doesn't select a filter option
  if (!draft && !paid && !pending) return invoices;

  return invoices.filter((invoice) => options[invoice.status]);
};

const generateNumber = (start: number, end: number) => {
  return Math.floor(Math.random() * (end + 1 - start)) + start;
};

export const generateID = () => {
  const randomNumbers = Math.floor(Math.random() * 10000);
  const n = String(randomNumbers).padStart(4, "0");
  const firstLetter = String.fromCharCode(generateNumber(65, 90));
  const secondLetter = String.fromCharCode(generateNumber(65, 90));

  return firstLetter + secondLetter + n;
};
