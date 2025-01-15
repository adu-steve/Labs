import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, Invoice } from "../../types/invoice.types";
import { RootState } from "../../store";
import { toast } from "sonner";
import fetchConfig from "../../fetchConfig";

const initialState: InitialState = {
  invoices: [],
  currentInvoice: { loading: "idle", error: null, invoice: undefined },
  statusFilter: [],
  loading: "idle",
  error: null,
};

export const fetchInvoices = createAsyncThunk<Invoice[]>(
  "invoices/fetch",
  async () => {
    const data = await fetchConfig.get("/invoices");
    console.log(data);
    
    return data;
  }
);

export const getInvoiceById = createAsyncThunk(
  "invoice/get",
  async (id: string) => {
    const data = await fetchConfig.get(`/invoices/${id}`);
    return data;
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoices/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await fetchConfig.delete(`/invoices/${id}`);
      return id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateInvoiceStatus = createAsyncThunk(
  "invoices/updateInvoiceStatus",
  async (id: string, { rejectWithValue }) => {
    try {
      await fetchConfig.put(`/invoices/${id}`, { status: "paid" });
      return id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const addInvoice = createAsyncThunk(
  "invoices/addInvoice",
  async (invoice: Invoice, { rejectWithValue }) => {
    try {
      const data = await fetchConfig.post("/invoices", invoice);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    filterInvoices: (state, action: PayloadAction<string>) => {
      state.statusFilter = state.statusFilter.includes(action.payload)
        ? state.statusFilter.filter((status) => status !== action.payload)
        : [...state.statusFilter, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchInvoices
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch invoices";
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
      })

      // getInvoiceById
      .addCase(getInvoiceById.rejected, (state, action) => {
        state.currentInvoice = {
          invoice: undefined,
          loading: "idle",
          error: action.error.message ?? "Invoice not found",
        };
      })
      .addCase(getInvoiceById.fulfilled, (state, action) => {
        state.currentInvoice = {
          loading: "idle",
          error: null,
          invoice: action.payload,
        };
      })

      // deleteInvoice
      .addCase(deleteInvoice.pending, (state) => {
        state.currentInvoice.loading = "loading";
        state.currentInvoice.error = null;
      })
      .addCase(
        deleteInvoice.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.invoices = state.invoices.filter(
            (invoice) => invoice.id !== action.payload
          );
          state.currentInvoice.loading = "success";
          toast.success("Invoice deleted successfully");
        }
      )
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload as string;
        toast.error(
          (action.payload as string) ??
            "An error occurred while deleting the invoice"
        );
      })

      // updateInvoiceStatus
      .addCase(updateInvoiceStatus.pending, (state) => {
        state.currentInvoice.loading = "loading";
        state.currentInvoice.error = null;
      })
      .addCase(
        updateInvoiceStatus.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.invoices.findIndex(
            (invoice) => invoice.id === action.payload
          );

          if (index >= 0) {
            state.invoices[index].status = "paid";
            state.currentInvoice.invoice = state.invoices[index];
            state.currentInvoice.loading = "success";
            toast.success("Status updated successfully");
          }
        }
      )
      .addCase(updateInvoiceStatus.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      // addInvoice
      .addCase(addInvoice.pending, (state) => {
        state.loading = "loading";
        state.error = null;
        toast.loading("Adding invoice...");
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        toast.dismiss();

        state.invoices = [action.payload, ...state.invoices];
        toast.success("Invoice added successfully");

        state.loading = "success";
        state.error = null;
      })
      .addCase(addInvoice.rejected, (state, action) => {
        toast.dismiss();
        state.loading = "idle";
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { filterInvoices } = invoiceSlice.actions;

export const selectInvoice = (state: RootState) => state.invoice.currentInvoice;
export const selectInvoices = (state: RootState) => state.invoice.invoices;
export const selectStatusFilter = (state: RootState) =>
  state.invoice.statusFilter;
export const selectLoading = (state: RootState) => state.invoice.loading;
export const selectError = (state: RootState) => state.invoice.error;
export default invoiceSlice.reducer;
