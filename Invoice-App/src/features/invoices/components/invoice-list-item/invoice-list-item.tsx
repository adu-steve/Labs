import { Icon } from "@/components";
import { Status } from "@/features/invoices";
import { toCurrency, toPaymentDate } from "./invoice-list-item.utils";
import { type InvoiceListItemProps } from "./invoice-list-item.types";
import styles from "./invoice-list-item.module.scss";

export const InvoiceListItem = (props: InvoiceListItemProps) => {
  const { invoice, onClick } = props;
  const { id, paymentDue, clientName, status, total } = invoice;

  return (
    <div
      tabIndex={0}
      className={styles.invoice_list_item}
      onClick={() => onClick(id)}
    >
      <h2 className={styles.id}>{id}</h2>
      <p className={styles.payment_due}>
        {paymentDue ? `Due ${toPaymentDate(paymentDue)}` : "TBD..."}
      </p>
      <p className={styles.client_name}>{clientName || "TBD..."}</p>
      <p className={styles.total}>{toCurrency(total)}</p>
      <Status
        className={styles.status}
        name={status as "paid" | "pending" | "draft"}
      />
      <Icon name="arrow-right" className={styles.arrow_right_icon} />
    </div>
  );
};
