import Text from "../../ui/typography/text/Text.tsx";
import Badge from "../../ui/badge/Badge.tsx";
import CardWrapper from "../../ui/card/CardWrapper.tsx";

import InvoiceNoticeButtons from "./InvoiceNoticeButtons.tsx";
import DeleteModal from "../delete-modal/DeleteModal.tsx";

interface InvoiceNoticeProps {
  status: string;
  error: string | null;
  id: string;
  toggleForm: () => void;
  showDeleteModal: boolean;
  toggleDeleteModal: () => void;
}

const InvoiceNotice = ({
  showDeleteModal,
  toggleDeleteModal,
  toggleForm,
  id,
  status,
}: InvoiceNoticeProps) => {
  return (
    <CardWrapper className={"invoice__notice-wrapper"}>
      <div className={"invoice__status-wrapper"}>
        <Text className={"status"}>Status</Text>
        <Badge status={status} />
      </div>
      {showDeleteModal && (
        <DeleteModal onClose={toggleDeleteModal} id={id ?? ""} />
      )}
      <InvoiceNoticeButtons
        toggleForm={toggleForm}
        toggleDeleteModal={toggleDeleteModal}
      />
    </CardWrapper>
  );
};

export default InvoiceNotice;
