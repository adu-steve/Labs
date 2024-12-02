import ThemeToggler from "../ThemeToggler/ThemeToggler.component.tsx";
import SelectedQuiz from "../Selected Quiz/SelectedQuiz.component.tsx";

import "./header.styles.css";

interface HeaderProps {
  title?: string;
  icon?: string;
}

const HeaderComponent = ({ title, icon }: HeaderProps) => {
  return (
    <header className={"header"}>
      {title && icon && <SelectedQuiz title={title} icon={icon} />}
      <ThemeToggler />
    </header>
  );
};

export default HeaderComponent;
