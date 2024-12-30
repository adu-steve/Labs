import { useEffect, useState } from "react";
import { Icon, IconButton } from "@/components";

const currentTheme = (localStorage.getItem("theme") || "light") as
  | "light"
  | "dark";

export const ToggleSwitch = () => {
  const [theme, setTheme] = useState<"light" | "dark">(currentTheme);

  const handleToggle = (theme: "light" | "dark") => {
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {theme === "dark" ? (
        <IconButton
          aria-label="Switch to light mode"
          icon={<Icon name="sun" />}
          onClick={() => handleToggle("light")}
        />
      ) : (
        <IconButton
          aria-label="Switch to dark mode"
          icon={<Icon name="moon" />}
          onClick={() => handleToggle("dark")}
        />
      )}
    </>
  );
};
