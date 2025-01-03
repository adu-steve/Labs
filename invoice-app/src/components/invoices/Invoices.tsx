import Wrapper from "../ui/wrapper/Wrapper.tsx";
import "./invoices.styles.css";
import Header from "../header/Header.tsx";
import InvoiceCard from "../ui/card/invoiceCard/Invoice.Card.tsx";
import { useAppSelector } from "../../hooks/useRedux.ts";
import {
  selectInvoices,
  selectStatusFilter,
} from "../../features/invoice/invoice.slice.ts";
import NotFound from "../not-found/NotFound.tsx";
import Headline from "../ui/typography/headline/Headline.tsx";
import Text from "../ui/typography/text/Text.tsx";
import Form from "../form/Form.tsx";
import { useState } from "react";
import { Invoice } from "../../types/invoice.types.ts";

const Invoices = () => {
  const invoices = useAppSelector(selectInvoices);
  const statusFilter = useAppSelector(selectStatusFilter);

  const [showForm, setShowForm] = useState<boolean>(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const filteredInvoices = statusFilter.length
    ? invoices.filter((invoice: Invoice) =>
        statusFilter.includes(invoice.status),
      )
    : [...invoices];

  return (
    <>
      {showForm && <Form type={"newInvoice"} toggleForm={toggleForm} />}
      <Wrapper className={"invoices"}>
        <Header total={filteredInvoices.length} toggleForm={toggleForm} />
        <div className="invoices__card-list">
          {filteredInvoices.map((invoice: Invoice) => (
            <InvoiceCard key={invoice.id} {...invoice} />
          ))}

          {filteredInvoices.length === 0 && (
            <NotFound>
              <Headline variant={"h2"}>There is nothing here</Headline>
              <Text>
                Create an invoice by clicking the{" "}
                <Text type={"span"} bold={true}>
                  New Invoice
                </Text>{" "}
                button and get started
              </Text>
            </NotFound>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Invoices;
