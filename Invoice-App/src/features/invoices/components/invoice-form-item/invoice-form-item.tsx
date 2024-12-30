import { useWatch } from "react-hook-form";
import { Icon, IconButton, TextField } from "@/components";
import { currencyFormatter } from "@/lib";
import { type InvoiceFormItemProps } from "./invoice-form-item.types";
import styles from "./invoice-form-item.module.scss";

export const InvoiceFormItem = (props: InvoiceFormItemProps) => {
  const { index, control, errors, register, remove } = props;

  const items = useWatch({
    control,
    name: "items",
  });

  const total = items[index].quantity * items[index].price || 0;

  return (
    <div className={styles.form_list_item}>
      <TextField
        label="Item Name"
        errorMessage={errors?.items?.[index]?.name?.message}
        {...register(`items.${index}.name`)}
      />
      <TextField
        label="Qty"
        errorMessage={errors?.items?.[index]?.quantity?.message}
        {...register(`items.${index}.quantity`, { valueAsNumber: true })}
      />
      <TextField
        label="Price"
        errorMessage={errors?.items?.[index]?.price?.message}
        {...register(`items.${index}.price`, { valueAsNumber: true })}
      />
      <div className={styles.total_container}>
        <p className={styles.total}>Total</p>
        <span>{currencyFormatter.format(total)}</span>
      </div>

      <IconButton
        aria-label="Delete"
        icon={<Icon name="delete" />}
        onClick={() => remove(index)}
      />
    </div>
  );
};
