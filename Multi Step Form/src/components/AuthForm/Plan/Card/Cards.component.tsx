import {ServiceType, PlanCardType} from "../../../../types.ts";

import "./card.styles.css"

const cardItems = [
    {
        icon: "./assets/images/icon-arcade.svg",
        title: "arcade",
        price: 9,
    },
    {
        icon: "./assets/images/icon-advanced.svg",
        title: "advanced",
        price: 12,
    },
    {
        icon: "./assets/images/icon-pro.svg",
        title: "pro",
        price: 15,
    },
]

const Cards = ({plan, handlePlan, timeFrame}: {
    plan: ServiceType;
    timeFrame: string;
    handlePlan: ({title, price}: ServiceType) => void
}) => {

    const cards = cardItems.map((item: PlanCardType) => (
        <div
            key={item.title}
            className={`card ${plan.title === item.title ? "active" : ""}`}
            onClick={() => handlePlan({
                title: item.title,
                price: timeFrame === "monthly" ? item.price : item.price * 10
            })}
        >
            <img src={item.icon} alt="Plan icon"/>
            <div className="card__plan">
                <h2 className="card__plan-name">{item.title}</h2>
                <p className="card__plan-price">${timeFrame === "monthly" ? item.price + "/mo" : (item.price * 10) + "/yr"}</p>
                {timeFrame === "yearly" && <p className="card__plan-free-trial">2 months free</p>}
            </div>
        </div>
    ));

    return (
        <div className="cards">
            {cards}
        </div>
    );
};

export default Cards;
