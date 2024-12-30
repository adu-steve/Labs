import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon, Link } from "@/components";
import { InvoiceForm, useGetInvoiceById } from "@/features/invoices";
import { useViewport } from "@/hooks";
import { VIEWPORT_WIDTH } from "@/config";
import styles from "./edit-invoice.module.scss";

const EditInvoice = () => {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const { invoice } = useGetInvoiceById(invoiceId!);
  const { vw } = useViewport();

  useEffect(() => {
    if (vw >= VIEWPORT_WIDTH.TABLET) navigate("/invoices");
  }, [vw, navigate]);

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className="container">
          <Link
            to=""
            icon={<Icon name="arrow-left" />}
            onClick={() => navigate(-1)}
          >
            Go back
          </Link>
        </div>

        <InvoiceForm
          defaultValues={invoice}
          onSave={() => navigate(-1)}
          onCancel={() => navigate(-1)}
        />
      </div>
    </main>
  );
};

export default EditInvoice;
