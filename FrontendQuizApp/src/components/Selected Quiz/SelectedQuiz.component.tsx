import IconComponent from "../Icon/Icon.component.tsx";

import "./selected-quiz.styles.css";

const SelectedQuiz = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <div className={"selected__icon-container"}>
      <IconComponent icon={icon} customClassName={title} />
      <h4 className={"selected__icon-title"}>{title}</h4>
    </div>
  );
};

export default SelectedQuiz;
