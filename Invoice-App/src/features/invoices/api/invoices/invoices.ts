import {
  filterInvoices,
  generateID,
  getInvoicesFromStorage,
  updateInvoicesInStorage,
} from "./invoices.utils";
import { FilterOptions, IInvoice } from "../../types";

const delay = 200;

export const getInvoices = async (filters: FilterOptions) => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  const invoices = getInvoicesFromStorage();

  return filterInvoices(invoices, filters);
};

export const getInvoiceById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  const invoices = getInvoicesFromStorage();

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) throw new Error("Invalid ID");

  return invoice;
};

export const addInvoice = async (invoice: Omit<IInvoice, "id">) => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  const invoices = getInvoicesFromStorage();
  const invoiceWithId = {
    ...invoice,
    id: generateID(),
  };

  updateInvoicesInStorage([...invoices, invoiceWithId]);

  return invoiceWithId;
};

export const updateInvoice = async (invoice: IInvoice) => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  const invoices = getInvoicesFromStorage();

  const updatedInvoices = invoices.map((inv) =>
    inv.id === invoice.id ? invoice : inv
  );

  updateInvoicesInStorage(updatedInvoices);
};

export const deleteInvoiceById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  const invoices = getInvoicesFromStorage();

  const filteredInvoices = invoices.filter((invoice) => invoice.id !== id);

  updateInvoicesInStorage(filteredInvoices);
};
