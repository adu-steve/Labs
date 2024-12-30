import { currencyFormatter } from "@/lib/intl-number";
import { stringToDate } from "../../utils/date";
import { dateFormatter } from "@/lib/intl-date";

export const toCurrency = (num: number) => currencyFormatter.format(num);

export const toPaymentDate = (date: string) =>
  dateFormatter.format(stringToDate(date));
