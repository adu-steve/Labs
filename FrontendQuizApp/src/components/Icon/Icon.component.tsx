import "./icon.styles.css";

interface IconComponentProps {
  icon: string;
  customClassName: string;
}

const IconComponent = ({ icon, customClassName }: IconComponentProps) => {
  return (
    <div className={`icon ${customClassName}`}>
      <img src={icon} alt={"icon"} />
    </div>
  );
};

export default IconComponent;
