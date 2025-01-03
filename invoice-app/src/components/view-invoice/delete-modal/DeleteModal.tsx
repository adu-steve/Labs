import Text from "../../ui/typography/text/Text.tsx";
import Button from "../../ui/button/button.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux.ts";
import {
  deleteInvoice,
  selectInvoice,
} from "../../../features/invoice/invoice.slice.ts";
import Headline from "../../ui/typography/headline/Headline.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Dialog, DialogContainer } from "../../ui/dialog/Dialog.tsx";

import "./deletemodal.styles.css";

interface DeleteModalProps {
  onClose: () => void;
  id: string;
}

const DeleteModal = ({ onClose, id }: DeleteModalProps) => {
  const dispatch = useAppDispatch();
  const currentInvoice = useAppSelector(selectInvoice);
  const loading = currentInvoice?.loading;
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === "success") {
      onClose();
      navigate("/");
    }
  }, [loading]);

  return (
    <DialogContainer center={true}>
      <Dialog variant={"secondary"} className={"delete-modal"}>
        <Headline variant={"h2"}>Confirm Deletion</Headline>
        <Text size={"sm"}>
          Are you sure you want to delete invoice #{id}? This action cannot be
          undone.
        </Text>
        <div className={"delete-modal__actions"}>
          <Button
            variant={"tertiary"}
            onClick={onClose}
            className={"delete-modal__cancel"}
            disabled={loading === "loading"}
            radius={"rounded-full"}
          >
            Cancel
          </Button>
          <Button
            variant={"danger"}
            onClick={() => dispatch(deleteInvoice(id))}
            className={"delete-modal__delete"}
            disabled={loading === "loading"}
            radius={"rounded-full"}
          >
            {loading === "loading" ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Dialog>
    </DialogContainer>
  );
};

export default DeleteModal;
