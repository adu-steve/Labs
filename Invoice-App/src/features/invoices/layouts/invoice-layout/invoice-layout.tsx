import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/features/invoices";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingView, ErrorView } from "@/components";
import styles from "./invoice-layout.module.scss";

export const InvoiceLayout = () => {
  return (
    <div className={styles.wrapper}>
      <ErrorBoundary
        FallbackComponent={(props) => <ErrorView fullscreen {...props} />}
      >
        <Suspense fallback={<LoadingView text="Loading..." fullscreen />}>
          <Header />
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
