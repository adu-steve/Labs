import Header from "../Header/Header.component.tsx";
import {ServiceType} from "../../../types.ts";

import "./summary.styles.css"

const Summary = ({navigateTo}: { navigateTo: (value: number) => void }) => {
    const plan = JSON.parse(localStorage.getItem("plan") || `null`);
    const addOns = JSON.parse(localStorage.getItem("addOns") || `[]`);
    const timeFrame = localStorage.getItem("timeframe") || "monthly";
    const period = timeFrame === "monthly" ? "mo" : "yr"
    const totalPrice = plan && addOns.reduce((total: number, addOn: ServiceType) => total + addOn.price, 0) + plan.price;

    const summaryAddon = addOns.map((addon: ServiceType) => (
        <div key={addon.title} className={"summary__addon"}>
            <p className={"summary__addon-title"}>{addon.title}</p>
            <p className={"summary__addon-price"}>+${addon.price}/{period}</p>
        </div>
    ));

    return (
        <div className={"summary wrapper"}>
            <Header title={"Finishing up"} description={"Double-check everything looks OK before confirming"}/>

            <div className="summary__container">
                {plan && <div className={"summary__plan"}>
                    <div>
                        <h3>{plan.title} ({timeFrame})</h3>
                        <button onClick={() => navigateTo(2)}>Change</button>
                    </div>

                    <p>${plan.price}/{period}</p>
                </div>
                }

                <hr/>

                <div className={"summary__addons"}>
                    {summaryAddon}
                </div>

            </div>
            <div className={"summary__total-container"}>
                <p className={"summary__total-period"}>Total (per {period === "mo" ? "month" : "year"})</p>
                <h3 className={"summary__total"}>+${totalPrice}/{period}</h3>
            </div>
        </div>
    )
}

export default Summary;