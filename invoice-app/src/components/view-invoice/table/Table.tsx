import Text from "../../ui/typography/text/Text.tsx";
import "./table.styles.css";
import { useAppSelector } from "../../../hooks/useRedux.ts";
import { mobileSelector } from "../../../features/mobile/mobile.slice.tsx";
interface TableProps {
  data: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
}
const Table = ({ data }: TableProps) => {
  const tableHeadings = [
    { title: "Item Name", className: "table__title-name" },
    { title: "QTY.", className: "table__title-quantity" },
    { title: "Price", className: "table__title-price" },
    { title: "Total", className: "table__title-total" },
  ];
  const { isMobile } = useAppSelector(mobileSelector);
  return isMobile ? (
    <div className={"mobile-table"}>
      {data.map((item) => (
        <div key={item.name} className={"table-item"}>
          <div className={"table-item__details"}>
            <Text bold>{item?.name ?? ""}</Text>
            <Text bold className={"qty-price"}>
              {item?.quantity ?? 0} x £{item?.price ?? 0}
            </Text>
          </div>
          <Text bold>{item?.total ?? 0}</Text>
        </div>
      ))}
    </div>
  ) : (
    <table className={"table"}>
      <thead>
        <tr>
          {tableHeadings.map((heading) => (
            <th key={heading.title} className={heading.className}>
              <Text size={"sm"}>{heading.title}</Text>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ name, quantity, price, total }, index) => (
          <tr key={index}>
            <td>
              <Text bold={true}>{name}</Text>
            </td>
            <td className={"table__quantity"}>
              <Text bold={true}>{quantity}</Text>
            </td>
            <td className={"table__price"}>
              <Text bold={true}>£{price}</Text>
            </td>
            <td className={"table__total"}>
              <Text bold={true}>£{total}</Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
