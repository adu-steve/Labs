import "./timeframe.toggle.styles.css";

const TimeFrameToogler = ({
  timeFrame,
  handleTimeFrame,
}: {
  timeFrame: string;
  handleTimeFrame: () => void;
}) => {
  return (
    <div className="toggle">
      <p>Monthly</p>
      <label htmlFor="timeframe__toggle" className={"timeframe__toggle"}>
        <input
          type="checkbox"
          id={"timeframe__toggle"}
          checked={timeFrame === "yearly"}
          onChange={handleTimeFrame}
        />
        <span className={"timeframe__toggle-slider"}></span>
      </label>
      <p>Yearly</p>
    </div>
  );
};

export default TimeFrameToogler;
