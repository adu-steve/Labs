import { Data } from "../../../types.ts";

import IconComponent from "../Icon/Icon.component.tsx";
import MessageComponent from "../Message/Message.component.tsx";

import getQuiz from "../../utils/getQuiz.ts";

import "./homepage.styles.css";
import { Topics } from "../../constants.ts";

const HomepageComponent = ({ setQuiz }: { setQuiz: (value: Data) => void }) => {
  return (
    <div className="homepage">
      <MessageComponent
        title={"Welcome to the"}
        subtitle={"Frontend Quiz!"}
        message={"Pick a subject to get started."}
      />
      <div className="options">
        {Topics.map((topic) => (
          <button
            key={topic.label}
            className={`options__item`}
            onClick={() => getQuiz({ value: topic.label, callback: setQuiz })}
          >
            <IconComponent icon={topic.icon} customClassName={topic.label} />{" "}
            <h4>{topic.label}</h4>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomepageComponent;
