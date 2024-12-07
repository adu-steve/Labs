import "./addons.styles.css";
import Header from "../Header/Header.component.tsx";
import { AddOnsListType, ServiceType } from "../../../types.ts";

const addonsList: AddOnsListType[] = [
  {
    key: "online-service",
    title: "Online service",
    description: "Access to multiple games",
    price: 1,
  },
  {
    key: "large-storage",
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: 2,
  },
  {
    key: "customizable-profile",
    title: "Customizable profile",
    description: "Custom theme on your profile",
    price: 2,
  },
];
const AddOns = ({
  addons,
  handleAddons,
}: {
  addons: ServiceType[];
  handleAddons: ({ title, price }: ServiceType) => void;
}) => {
  const timeFrame = localStorage.getItem("timeframe");

  const addon = addonsList.map((item: AddOnsListType) => (
    <div key={item.key} className="add-on__item">
      <input
        type="checkbox"
        name=""
        id={item.title}
        onChange={() => handleAddons(item)}
        checked={
          !!addons.find((addOn: ServiceType) => addOn.title === item.title)
        }
      />
      <label htmlFor={item.title}>
        <span className={"add-on__item-custom-check"}></span>
        <div className="add-on__item-content">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
        <p className="add-on__item-price">
          +$
          {timeFrame === "yearly"
            ? item.price * 10 + `/yr`
            : item.price + `/mo`}
        </p>
      </label>
    </div>
  ));

  return (
    <div className={"add-ons wrapper"}>
      <Header
        title={"Pick add-ons"}
        description={"Add-ons help enhance your gaming experience"}
      />

      <div className="add-ons__container">{addon}</div>
    </div>
  );
};

export default AddOns;
