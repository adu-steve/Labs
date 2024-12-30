import { ReactComponent as Logo } from "@/assets/logo/logo.svg";
import { ToggleSwitch } from "@/features/invoices";
import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.company_logo_container}>
        <Logo className={styles.logo} />
      </div>

      <ToggleSwitch />

      <hr className={styles.divider} />

      <img
        className={styles.avatar}
        width={32}
        height={32}
        src="/img/avatar.jpg"
        alt="avatar"
      />
    </header>
  );
};
