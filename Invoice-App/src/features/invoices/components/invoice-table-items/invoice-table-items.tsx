import { currencyFormatter } from "@/lib";
import { type InvoiceTableItemsProps } from "./invoice-table-items.types";
import styles from "./invoice-table-items.module.scss";

export const InvoiceTableItems = (props: InvoiceTableItemsProps) => {
  const { items, total } = props;

  return (
    <div className={styles.table}>
      <div className={styles.table_header}>
        <div className={styles.table_row}>
          <p className={styles.header_name}>Item Name</p>
          <p className={styles.header_qty}>QTY</p>
          <p className={styles.header_price}>Price</p>
          <p className={styles.header_total}>Total</p>
        </div>
      </div>
      <div className={styles.table_body}>
        {items.map((item) => (
          <div key={item.id} className={styles.table_row}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.qty}>{item.quantity}</p>
            <p className={styles.price}>
              {currencyFormatter.format(item.price)}
            </p>
            <p className={styles.total}>
              {currencyFormatter.format(item.total)}
            </p>
            <p className={styles.qty_price}>
              {item.quantity} x {currencyFormatter.format(item.price)}
            </p>
          </div>
        ))}
      </div>
      <div className={styles.table_footer}>
        <p>Amount Due</p>
        <p>{currencyFormatter.format(total)}</p>
      </div>
    </div>
  );
};
