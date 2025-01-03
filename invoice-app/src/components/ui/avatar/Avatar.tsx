import Button from "../button/button.tsx";
import Icon from "../icon/Icon.tsx";
import { HTMLAttributes, useState } from "react";
import styles from "./avatar.module.css";
import Text from "../typography/text/Text.tsx";
import Headline from "../typography/headline/Headline.tsx";

interface AvatarProps extends HTMLAttributes<HTMLButtonElement> {
  image: string;
  radius?:
    | "rounded"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-full";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const Avatar = ({
  image,
  radius = "rounded",
  size = "md",
  className,
}: AvatarProps) => {
  const combinedClassName = `${styles.avatar} ${className ?? ""}`.trim();

  const [showProfile, setShowProfile] = useState<boolean>(false);

  const handleToggleProfile = () => setShowProfile((prev) => !prev);

  return (
    <div className={`${styles.avatar__container}`}>
      {showProfile && (
        <>
          <div className={styles.overlay} onClick={handleToggleProfile} />
          <div className={styles.profile}>
            <Headline variant={"h3"}>Mahamudu Halic</Headline>
            <Text>halic.mahamudu@amalitech.com</Text>
            <Button variant={"danger"} radius={"rounded-md"}>
              logout
            </Button>
          </div>
        </>
      )}
      <Button
        radius={radius}
        className={combinedClassName}
        onClick={handleToggleProfile}
      >
        <Icon
          icon={image}
          description={"profile"}
          radius={radius}
          size={size}
        />
      </Button>
    </div>
  );
};

export default Avatar;
