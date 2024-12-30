import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { Icon, Button, LoadingView, Drawer } from "@/components";
import {
  Filter,
  InvoiceForm,
  InvoiceList,
  useGetInvoices,
  EmptyListMessage,
} from "@/features/invoices";
import { VIEWPORT_WIDTH } from "@/config";
import { getViewportSize } from "@/utils";
import { extractQueryStringValues } from "./invoices.utils";
import { useViewport } from "@/hooks";
import styles from "./invoices.module.scss";

const Invoices = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { vw } = useViewport();
  const filters = extractQueryStringValues(searchParams);
  const [openFilter, setOpenFilter] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { invoices, isFetching } = useGetInvoices(filters);

  useEffect(() => {
    if (vw < VIEWPORT_WIDTH.TABLET) {
      setOpenDrawer(false);
    }
  }, [vw]);

  const handleBtnClick = () => {
    const { vw } = getViewportSize();

    if (vw >= VIEWPORT_WIDTH.TABLET) {
      setOpenDrawer(true);
    } else {
      navigate("/invoices/new");
    }
  };

  const handleFilterChanges = (name: string, value: boolean) => {
    const updatedFilters = { ...filters, [name]: value };
    const { draft, paid, pending } = updatedFilters;

    navigate(`/invoices?draft=${draft}&pending=${pending}&paid=${paid}`);
  };

  return (
    <main className={clsx("container", styles.main)}>
      <Drawer open={openDrawer} onOutsideClick={() => setOpenDrawer(false)}>
        <InvoiceForm onSave={() => setOpenDrawer(false)} />
      </Drawer>
      <div className={styles.toolbar}>
        <div>
          <h1 className={styles.title}>Invoices</h1>
          <p>{invoices.length} total invoices</p>
        </div>

        <Filter
          options={filters}
          open={openFilter}
          onClick={setOpenFilter}
          onChange={handleFilterChanges}
        />

        <Button
          aria-label="New Invoice"
          onClick={handleBtnClick}
          icon={
            <div className={styles.circle}>
              <Icon name="plus" />
            </div>
          }
        >
          <span className={styles.button_text}></span>
        </Button>
      </div>

      {!invoices.length && !isFetching && <EmptyListMessage />}
      {isFetching && <LoadingView text="Loading..." />}
      {!isFetching && !!invoices.length && (
        <InvoiceList
          invoices={invoices}
          onSelectInvoice={(id) => navigate(`/invoices/${id}`)}
        />
      )}
    </main>
  );
};

export default Invoices;
