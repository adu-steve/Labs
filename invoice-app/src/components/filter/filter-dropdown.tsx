import Text from "../ui/typography/text/Text.tsx";
import {
  filterInvoices,
  selectStatusFilter,
} from "../../features/invoice/invoice.slice.ts";
import Dropdown from "../ui/dropdown/Dropdown.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";

interface FilterDropdownProps {
  options: string[];
}

const FilterDropdown = (props: FilterDropdownProps) => {
  const statusFilter = useAppSelector(selectStatusFilter);
  const dispatch = useAppDispatch();

  return (
    <Dropdown className={"filter__dropdown"}>
      {props.options.map((option) => (
        <Text
          type={"label"}
          bold={true}
          key={option}
          className={`dropdown-item`}
          htmlFor={option}
        >
          <input
            type="checkbox"
            name="dropdown"
            id={option}
            checked={statusFilter.includes(option)}
            onChange={() => dispatch(filterInvoices(option))}
          />
          <span className={`custom__checkbox`}></span>
          {option}
        </Text>
      ))}
    </Dropdown>
  );
};

export default FilterDropdown;
