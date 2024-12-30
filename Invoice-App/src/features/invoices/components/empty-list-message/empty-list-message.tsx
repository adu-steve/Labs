import { ReactComponent as EmptyMessage } from "@/assets/icons/illustration-empty.svg";
import styles from "./empty-list-message.module.scss";

export const EmptyListMessage = () => {
  return (
    <div className={styles.empty_list_message}>
      <EmptyMessage />
      <h1 className={styles.title}>There is nothing here</h1>
      <p className={styles.message}>
        Create a new invoice by clicking the <span>New Invoice</span> button and
        get started
      </p>
    </div>
  );
};
