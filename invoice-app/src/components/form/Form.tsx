import {
  Errors,
  FormValues,
  initialItems,
  ItemType,
} from "../../types/form.types.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import {
  addInvoice,
  selectLoading,
} from "../../features/invoice/invoice.slice.ts";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import generateRandomId from "../../utils/generateRandomId/generateRandomId.ts";
import calculatePaymentDue from "../../utils/calculatePaymentDue/calculatePaymentDue.ts";
import { Dialog, DialogContainer } from "../ui/dialog/Dialog.tsx";
import Button from "../ui/button/button.tsx";
import Icon from "../ui/icon/Icon.tsx";
import arrowLeftIcon from "../../assets/images/icon-arrow-left.svg";
import Text from "../ui/typography/text/Text.tsx";
import Headline from "../ui/typography/headline/Headline.tsx";
import FormAddress from "./address/FormAddress.tsx";
import BillTo from "./bill/Bill.tsx";
import DateTerms from "./date-and-terms/DateTerms.tsx";
import Items from "./items/Items.tsx";
import "./form.styles.css";
import TextField from "../ui/text-field/TextField.tsx";

interface FormProps {
  type: "newInvoice" | "edit";
  initialValues?: FormValues;
  toggleForm: () => void;
}

const Form = (props: FormProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const form = useForm<FormValues>({
    defaultValues: props.initialValues ?? {
      id: generateRandomId(),
      clientName: "",
      clientEmail: "",
      createdAt: `${new Date().toISOString().split("T")[0]}`,
      paymentDue: "",
      description: "",
      paymentTerms: 1,
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [
        {
          ...initialItems,
        },
      ],
      status: "",
      total: 0,
    },
    mode: "onTouched",
  });
  const {
    control,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: { errors, isValid, isDirty },
  } = form;
  const { fields, append, remove } = useFieldArray<FormValues>({
    name: "items",
    control,
  });

  const calculateItemsTotal = (items: ItemType[]) => {
    return items.map((item: ItemType) => ({
      ...item,
      total: Number((item?.price * item?.quantity).toFixed(2)),
    }));
  };

  const calculateTotal = (items: ItemType[]) => {
    return items.reduce((total, item: ItemType) => total + item.total, 0);
  };

  const onSubmit = async (data: FormValues) => {
    if (!data.items.length) {
      setError("items", {
        type: "manual",
        message: "At least one item is required.",
      });
      return;
    }

    data.status = "pending";
    data.items = calculateItemsTotal(data.items);
    data.total = calculateTotal(data.items);
    data.paymentDue = calculatePaymentDue(data.createdAt, data.paymentTerms);

    dispatch(addInvoice(data)).then(() => props.toggleForm());
  };

  const onSaveDraft = () => {
    const data: FormValues = getValues();
    data.status = "draft";
    data.items = calculateItemsTotal(data.items);
    data.total = calculateTotal(data.items);
    data.paymentDue =
      data.createdAt && data.paymentTerms
        ? calculatePaymentDue(data.createdAt, data.paymentTerms)
        : "";

    dispatch(addInvoice(data)).then(() =>props.toggleForm());
  };

  const onDiscard = () => {
    reset();
    props.toggleForm();
  };

  const { description } = (errors as Errors) ?? {};

  return (
    <DialogContainer>
      <Dialog
        className={`${"form-dialog"}`}
        variant={"primary"}
        radius={"rounded-lg"}
        size={"md"}
      >
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-info">
              <Button className="go-back" type={"button"} onClick={props.toggleForm}>
                <Icon
                  icon={arrowLeftIcon}
                  description={"arrow left"}
                  size={"xs"}
                />
                <Text bold={true}>Go back</Text>
              </Button>
              {props.type === "newInvoice" ? (
                <Headline variant={"h2"}>New Invoice</Headline>
              ) : (
                <Headline variant={"h2"}>
                  Edit <span>#</span>
                  {props.initialValues?.id}
                </Headline>
              )}

              <div className={"bill-from"}>
                <Text bold={true}>Bill From</Text>
                <FormAddress field={"senderAddress"} />
              </div>

              <BillTo />

              <DateTerms />

              <div>
                <label htmlFor="description" className={description && "error"}>
                  Project Description{" "}
                  <Text size={"sm"}>{description?.message}</Text>{" "}
                </label>

                <TextField
                  name={"description"}
                  id={"description"}
                  className={description && "error"}
                  validationRules={{
                    required: "can't be empty",
                  }}
                />
              </div>

              <Items fields={fields} append={append} remove={remove} />

              <div>
                {!!Object.keys(errors).length && (
                  <Text size={"sm"} className={"error"}>
                    -All fields must be added
                  </Text>
                )}
                {!getValues("items").length && (
                  <Text size={"sm"} className={"error"}>
                    -An item must be added
                  </Text>
                )}
              </div>
            </div>

            <div className={`form__buttons`}>
              {props.type === "newInvoice" ? (
                <>
                  <Button
                    type={"button"}
                    radius={"rounded-full"}
                    variant={"tertiary"}
                    className={"discard__button"}
                    onClick={onDiscard}
                    disabled={loading === "loading"}
                  >
                    Discard
                  </Button>
                  <Button
                    type={"button"}
                    radius={"rounded-full"}
                    variant={"secondary"}
                    onClick={onSaveDraft}
                    disabled={loading === "loading"}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    radius={"rounded-full"}
                    variant={"primary"}
                    disabled={
                      !isValid ||
                      !isDirty ||
                      !getValues("items").length ||
                      !getValues("createdAt") ||
                      loading === "loading"
                    }
                  >
                    Save & Send
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type={"button"}
                    radius={"rounded-full"}
                    variant={"secondary"}
                    onClick={onDiscard}
                    disabled={loading === "loading"}
                  >
                    Cancel
                  </Button>
                  <Button
                    radius={"rounded-full"}
                    variant={"primary"}
                    disabled={
                      !isValid ||
                      !getValues("items").length ||
                      !getValues("createdAt") ||
                      loading === "loading"
                    }
                  >
                    Save changes
                  </Button>
                </>
              )}
            </div>
          </form>
        </FormProvider>
      </Dialog>
    </DialogContainer>
  );
};

export default Form;
