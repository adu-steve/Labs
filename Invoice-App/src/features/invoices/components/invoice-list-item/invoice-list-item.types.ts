export type InvoiceListItemProps = {
  onClick: (id: string) => void;

  invoice: {
    id: string;
    paymentDue: string;
    clientName: string;
    status: string;
    total: number;
  };
};
