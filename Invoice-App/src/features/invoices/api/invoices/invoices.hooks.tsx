import { useMutation, useQuery, useQueryClient } from "react-query";
import { FilterOptions, IInvoice } from "../../types";
import {
  addInvoice,
  deleteInvoiceById,
  getInvoiceById,
  getInvoices,
  updateInvoice,
} from "./invoices";

export const useGetInvoices = (filters: FilterOptions) => {
  const { data, ...rest } = useQuery(["FilteredInvoices", filters], () =>
    getInvoices(filters)
  );

  return {
    invoices: data ?? [],
    ...rest,
  };
};

export const useGetInvoiceById = (id: string) => {
  const { data, ...rest } = useQuery(
    ["invoices", id],
    () => getInvoiceById(id),
    {
      suspense: true,
    }
  );

  return {
    invoice: data ?? ({} as IInvoice),
    ...rest,
  };
};

export const useSaveInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation(addInvoice, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("FilteredInvoices");
    },
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation(updateInvoice, {
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries("FilteredInvoices");
      await queryClient.invalidateQueries({
        queryKey: ["invoices", id],
      });
    },
  });
};

export const useDeleteInvoiceById = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteInvoiceById, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("FilteredInvoices");
    },
  });
};
