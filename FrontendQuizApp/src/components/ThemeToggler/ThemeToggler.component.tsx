import {useEffect, useState} from "react";

import sunLightSvg from "/assets/images/icon-sun-light.svg";
import sunDarkSvg from "/assets/images/icon-sun-dark.svg";
import moonLightSvg from "/assets/images/icon-moon-light.svg";
import moonDarkSvg from "/assets/images/icon-moon-dark.svg";

import "./theme-toggler.styles.css"

/**
 * A toggle button to switch the page's theme between light and dark mode.
 *
 * This component reads and writes to the user's session storage to persist the theme preference.
 * The theme preference is stored in the key 'theme' with a value of either 'light' or 'dark'.
 *
 * The component renders three elements:
 * 1. An image of a sun () to represent light mode.
 * 2. A toggle button to switch the theme.
 * 3. An image of a moon () to represent dark mode.
 *
 * The sun and moon images are swapped depending on the current theme.
 *
 * @returns A JSX element containing the theme toggle button and its accompanying sun and moon images.
 */
function ThemeToggler() {
    const [theme, setTheme] = useState(() => sessionStorage.getItem("theme") || "light");

    useEffect(() => {
        document.body.className = theme;
        sessionStorage.setItem("theme", theme);
    }, [theme])

    /**
     * Toggles the theme preference between light and dark mode.
     *
     * This function is invoked when the theme toggle button is clicked.
     * It switches the theme preference by negating the current theme value.
     * The theme preference is then used to update the page's theme.
     */
    function toggleTheme() {
        setTheme(prev => prev === "light" ? "dark" : "light");  // Switch between light and dark themes on button click.
    }

    return (
        <div className="theme">
            <img className="theme__icon" src={theme === "dark" ? sunLightSvg : sunDarkSvg} alt="Toggle theme"/>
            <label htmlFor="theme__toggle" className={"theme__toggle"}>
                <input type="checkbox" id={"theme__toggle"} checked={theme === "dark"} onChange={toggleTheme}/>
                <span className={"theme__toggle-slider"}></span>
            </label>
            <img className="theme__icon" src={theme === "dark" ? moonLightSvg : moonDarkSvg} alt="Toggle theme"/>
        </div>
    )
}

export default ThemeToggler;