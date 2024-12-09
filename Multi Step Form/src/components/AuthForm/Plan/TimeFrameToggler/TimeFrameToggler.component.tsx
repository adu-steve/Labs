import { TimeFrameType } from "../../../../types";
import "./timeframe.toggle.styles.css"

const TimeFrameToogler = ({timeFrame, updateForm}: TimeFrameType) => {
    return (
        <div className="toggle">
            <p>Monthly</p>
            <label htmlFor="timeframe__toggle" className={"timeframe__toggle"}>
                <input type="checkbox" id={"timeframe__toggle"} checked={timeFrame === "yearly"}
                       onChange={() => updateForm(timeFrame === "yearly" ? "monthly" : "yearly")}/>
                <span className={"timeframe__toggle-slider"}></span>
            </label>
            <p>Yearly</p>
        </div>
    )
}

export default TimeFrameToogler;