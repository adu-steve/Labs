import Header from "../Header/Header.component.tsx";
import { ServiceType, SummaryType } from "../../../types.ts";

import "./summary.styles.css";

const Summary = ({
  navigateTo,
  plan,
  addons,
  timeFrame,
  error,
}: SummaryType) => {
  const period = timeFrame === "monthly" ? "mo" : "yr";

  // Helper function to calculate prices
  const calculatePrice = (price: number) =>
    timeFrame === "monthly" ? price : price * 10;

  const planPrice = plan ? calculatePrice(plan.price) : 0;
  const totalAddons = addons
    ? addons.reduce(
        (total: number, addon: ServiceType) =>
          total + calculatePrice(addon.price),
        0
      )
    : 0;

  const totalPrice = planPrice + totalAddons;

  const summaryAddon =
    addons &&
    addons.map((addon: ServiceType) => (
      <div key={addon.title} className="summary__addon">
        <p className="summary__addon-title">{addon.title}</p>
        <p className="summary__addon-price">
          +${calculatePrice(addon.price)}/{period}
        </p>
      </div>
    ));
  return (
    <div className={"summary wrapper"}>
      <Header
        title={"Finishing up"}
        description={"Double-check everything looks OK before confirming"}
      />

      <div className="summary__container">
        {plan && (
          <div className={"summary__plan"}>
            <div>
              <h3>
                {plan.title} ({timeFrame})
              </h3>
              <button onClick={() => navigateTo(2)}>Change</button>
            </div>

            <p>
              ${planPrice}/{period}
            </p>
          </div>
        )}

        <hr />

        <div className={"summary__addons"}>{summaryAddon}</div>
      </div>
      <div className={"summary__total-container"}>
        <p className={"summary__total-period"}>
          Total (per {period === "mo" ? "month" : "year"})
        </p>
        <h3 className={"summary__total"}>
          +${totalPrice}/{period}
        </h3>
      </div>

      {error && <p className={"summary__error error"}>{error}</p>}
    </div>
  );
};

export default Summary;
