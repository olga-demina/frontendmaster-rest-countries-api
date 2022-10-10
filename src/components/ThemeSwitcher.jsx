import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as farMoon } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";
import useThemeSwitch from "../hooks/useThemeSwitch";

const ThemeSwitcher = () => {
  const [colorTheme, setTheme] = useThemeSwitch();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? false : true
  );

  const toggleDarkMode = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setDarkSide(isChecked);
  };

  return (
    <div>
      <FontAwesomeIcon className="mr-2" icon={darkSide ? faMoon : farMoon} />
      <input
        className="hidden"
        type="checkbox"
        id="theme-switch"
        checked={darkSide}
        onChange={toggleDarkMode}
      />
      <label htmlFor="theme-switch" className="cursor-pointer">
        Dark Mode
      </label>
    </div>
  );
};

export default ThemeSwitcher;
