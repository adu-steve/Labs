import "./datepicker.styles.css";
import arrowLeftIcon from "../../../assets/images/icon-arrow-left.svg";
import arrowRightIcon from "../../../assets/images/icon-arrow-right.svg";
import Icon from "../icon/Icon.tsx";
import Text from "../typography/text/Text.tsx";
import Button from "../button/button.tsx";
import { useState } from "react";
import Dropdown from "../dropdown/Dropdown.tsx";

interface DatePickerProps {
  selectedDate: string;
  handleSelection: (value: string, field: string) => void;
}

const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DatePicker = ({ selectedDate, handleSelection }: DatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const generateWeeks = (year: number, month: number) => {
    const weeks = [];
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Add days from the previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth.getDay() - 1; i >= 0; i--) {
      const day = new Date(year, month - 1, prevMonthLastDay - i)
        .toISOString()
        .split("T")[0];
      days.push({ date: day, isCurrentMonth: false });
    }

    // Add all days in the current month
    for (let date = 1; date <= lastDayOfMonth.getDate(); date++) {
      const day = new Date(year, month, date).toISOString().split("T")[0];
      days.push({ date: day, isCurrentMonth: true });
    }

    // Add days from the next month
    const remainingSlots = 7 - (days.length % 7);
    if (remainingSlots < 7) {
      for (let i = 1; i <= remainingSlots; i++) {
        const day = new Date(year, month + 1, i).toISOString().split("T")[0];
        days.push({ date: day, isCurrentMonth: false });
      }
    }

    // Group days into weeks
    for (let i = 0; i < days.length; i += 7) {
      const week = days.slice(i, i + 7);
      weeks.push({ weekNumber: weeks.length + 1, days: week });
    }

    return weeks;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const weeks = generateWeeks(year, month);

  return (
    <Dropdown className={"date-picker"}>
      <div className={"month-year__slider"}>
        <Button type={"button"} onClick={handlePrevMonth}>
          <Icon icon={arrowLeftIcon} description={"left arrow icon"} />
        </Button>
        <Text bold>{months[month] + year}</Text>
        <Button type={"button"} onClick={handleNextMonth}>
          <Icon icon={arrowRightIcon} description={"right arrow icon"} />
        </Button>
      </div>

      <div className={"weeks"}>
        {weeks.map((week) => (
          <div key={week.weekNumber} className={`week`}>
            {week.days.map((day, i) => (
              <Button
                type={"button"}
                key={i}
                className={`day ${day.date === selectedDate ? "active" : ""}`}
                disabled={!day.isCurrentMonth}
                onClick={() => handleSelection(day.date, "datepicker")}
              >
                {Number(day.date.split("-")[2])}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default DatePicker;
