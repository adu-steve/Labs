import Text from "../ui/typography/text/Text.tsx";

interface InvoiceTitleProps {
  title: string;
}

const InvoiceTitle = (props: InvoiceTitleProps) => {
  return <Text className={"invoice-title"}>{props.title}</Text>;
};

export default InvoiceTitle;
