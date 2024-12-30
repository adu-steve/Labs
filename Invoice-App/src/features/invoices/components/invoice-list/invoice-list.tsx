import { Virtuoso } from "react-virtuoso";
import { InvoiceListItem } from "@/features/invoices";
import { type InvoiceListProps } from "./invoice-list.types";
import styles from "./invoice-list.module.scss";

export const InvoiceList = (props: InvoiceListProps) => {
  const { invoices, onSelectInvoice } = props;

  return (
    <Virtuoso
      className={styles.invoice_list}
      data={invoices}
      itemContent={(_, invoice) => (
        <InvoiceListItem
          key={invoice.id}
          invoice={invoice}
          onClick={onSelectInvoice}
        />
      )}
    />
  );
};
