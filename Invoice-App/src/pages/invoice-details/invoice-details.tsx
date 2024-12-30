import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { Button, Drawer, Icon, Link, LoadingView, Modal } from "@/components";
import {
  InvoiceForm,
  Status,
  useGetInvoiceById,
  InvoiceTableItems,
  stringToDate,
  useDeleteInvoiceById,
  useUpdateInvoice,
} from "@/features/invoices";
import { getViewportSize } from "@/utils";
import { VIEWPORT_WIDTH } from "@/config";
import { dateFormatter } from "@/lib";
import styles from "./invoice-details.module.scss";

const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const { invoice, isFetching } = useGetInvoiceById(invoiceId!);
  const { mutate: updateInvoice, isLoading: isUpdatingInvoice } =
    useUpdateInvoice();
  const { mutate: deleteInvoiceById, isLoading: isDeletingInvoice } =
    useDeleteInvoiceById();

  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClickDelete = () => {
    deleteInvoiceById(invoice.id, {
      onSuccess: async () => {
        navigate("/invoices");
      },
    });
  };

  const handleClickMarkAsPaid = () => {
    invoice.status = "paid";
    updateInvoice(invoice);
  };

  const handleClickEdit = () => {
    const { vw } = getViewportSize();

    if (vw >= VIEWPORT_WIDTH.TABLET) {
      setShowDrawer(true);
    } else {
      navigate(`/invoices/${invoice.id}/edit`);
    }
  };

  return (
    <>
      {isFetching && <LoadingView text="Loading..." />}
      {!isFetching && (
        <main className={clsx("container", styles.main)}>
          <Link
            to="/invoices"
            icon={<Icon name="arrow-left" />}
            className={styles.back_link}
          >
            Go back
          </Link>

          <div className={styles.status_container}>
            <p className={styles.status_label}>Status</p>
            <Status name={invoice.status} />

            <div className={styles.actions_container}>
              <Button variant="secondary" onClick={handleClickEdit}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => setShowModal(true)}>
                Delete
              </Button>
              <Button
                loading={isUpdatingInvoice}
                disabled={
                  isUpdatingInvoice ||
                  invoice.status === "paid" ||
                  invoice.status === "draft"
                }
                onClick={handleClickMarkAsPaid}
              >
                Mark as Paid
              </Button>
            </div>
          </div>

          <div className={styles.invoice_container}>
            <div className={styles.invoice_header}>
              <div className={styles.id_description_container}>
                <p className={styles.id}>{invoice.id}</p>
                <p className={styles.title}>{invoice.description}</p>
              </div>

              <div className={styles.bill_from_container}>
                <p className={styles.content}>{invoice.senderAddress.street}</p>
                <p className={styles.content}>{invoice.senderAddress.city}</p>
                <p className={styles.content}>
                  {invoice.senderAddress.postCode}
                </p>
                <p className={styles.content}>
                  {invoice.senderAddress.country}
                </p>
              </div>
            </div>

            <div className={styles.invoice_body}>
              <div className={styles.invoice_date_container}>
                <p className={styles.title}>Invoice Date</p>
                <p className={styles.highlight}>
                  {invoice.createdAt
                    ? dateFormatter.format(stringToDate(invoice.createdAt))
                    : "TBD"}
                </p>
              </div>

              <div className={styles.payment_due_container}>
                <p className={styles.title}>Payment Due</p>
                <p className={styles.highlight}>
                  {invoice.paymentDue
                    ? dateFormatter.format(stringToDate(invoice.paymentDue))
                    : "TBD"}
                </p>
              </div>

              <div className={styles.bill_to_container}>
                <p className={styles.title}>Bill To</p>
                <p className={styles.highlight}>{invoice.clientName}</p>
                <div>
                  <p className={styles.content}>
                    {invoice.clientAddress.street}
                  </p>
                  <p className={styles.content}>{invoice.clientAddress.city}</p>
                  <p className={styles.content}>
                    {invoice.clientAddress.postCode}
                  </p>
                  <p className={styles.content}>
                    {invoice.clientAddress.country}
                  </p>
                </div>
              </div>

              <div className={styles.sent_to_container}>
                <p className={styles.title}>Sent to</p>
                <p className={styles.highlight}>{invoice.clientEmail}</p>
              </div>
            </div>

            {!!invoice.items.length && (
              <InvoiceTableItems items={invoice.items} total={invoice.total} />
            )}
          </div>
        </main>
      )}
      <Modal open={showModal} onClickOutside={() => setShowModal(false)}>
        <div className={styles.modal_container}>
          <h1 className={styles.modal_title}>Confirm Deletion</h1>
          <p>
            Are you sure you want to delete invoice #{invoice.id}? This action
            cannot be undone.
          </p>

          <div className={styles.modal_actions}>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              loading={isDeletingInvoice}
              disabled={isDeletingInvoice}
              onClick={handleClickDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <Drawer open={showDrawer} onOutsideClick={() => setShowDrawer(false)}>
        <InvoiceForm
          defaultValues={invoice}
          onSave={() => setShowDrawer(false)}
          onCancel={() => setShowDrawer(false)}
        />
      </Drawer>
    </>
  );
};

export default InvoiceDetails;
