import Dropdown from "../ui/dropdown/Dropdown.tsx";
import Button from "../ui/button/button.tsx";

const Options = [
  {
    value: 1,
    description: "Net 1 Day",
  },
  {
    value: 7,
    description: "Net 7 Days",
  },
  {
    value: 14,
    description: "Net 14 Days",
  },
  {
    value: 30,
    description: "Net 30 Days",
  },
];

interface CustomSelectProps {
  handleSelectOption: (value: number) => void;
  selectedOption: number;
}
const CustomSelect = (props: CustomSelectProps) => {
  return (
    <Dropdown className={"custom-select"}>
      {Options.map((option) => (
        <Button
          type={"button"}
          key={option.description}
          onClick={() => props.handleSelectOption(option.value)}
          className={`${option.value ===props.selectedOption ? "active" : ""}`}
        >
          {option.description}
        </Button>
      ))}
    </Dropdown>
  );
};

export default CustomSelect;
