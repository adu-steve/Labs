import Button from "../../ui/button/button.tsx";
import {
  selectInvoice,
  updateInvoiceStatus,
} from "../../../features/invoice/invoice.slice.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux.ts";

const InvoiceNoticeButtons = ({
  toggleDeleteModal,
  toggleForm,
}: {
  toggleDeleteModal: () => void;
  toggleForm: () => void;
}) => {
  const dispatch = useAppDispatch();
  const currentInvoice = useAppSelector(selectInvoice);
  const invoice = currentInvoice?.invoice;
  const loading = currentInvoice?.loading;
  return (
    <div className={"invoice__button-wrapper"}>
      <Button
        variant={"tertiary"}
        radius={"rounded-full"}
        disabled={loading === "loading"}
        onClick={toggleForm}
      >
        Edit
      </Button>
      <Button
        variant={"danger"}
        radius={"rounded-full"}
        onClick={toggleDeleteModal}
        disabled={loading === "loading"}
      >
        Delete
      </Button>
      {invoice?.status !== "paid" && (
        <Button
          variant={"primary"}
          radius={"rounded-full"}
          disabled={invoice?.status === "draft" || loading === "loading"}
          onClick={() => dispatch(updateInvoiceStatus(invoice?.id ?? ""))}
        >
          Mark as Paid
        </Button>
      )}
    </div>
  );
};

export default InvoiceNoticeButtons;
