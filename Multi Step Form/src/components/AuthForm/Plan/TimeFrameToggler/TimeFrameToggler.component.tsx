import "./timeframe.toggle.styles.css";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { setTimeFrame } from "../../../../features/planSlice";

const TimeFrameToggler = () => {
  const dispatch = useAppDispatch();
  const { timeFrame } = useAppSelector((state) => state.plan);
  return (
    <div className="toggle">
      <p>Monthly</p>
      <label htmlFor="timeframe__toggle" className={"timeframe__toggle"}>
        <input
          type="checkbox"
          id={"timeframe__toggle"}
          checked={timeFrame === "yearly"}
          onChange={() =>
            dispatch(
              setTimeFrame(timeFrame === "yearly" ? "monthly" : "yearly")
            )
          }
        />
        <span className={"timeframe__toggle-slider"}></span>
      </label>
      <p>Yearly</p>
    </div>
  );
};

export default TimeFrameToggler;
