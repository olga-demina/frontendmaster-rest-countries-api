import { useEffect, useState } from "react";

const useThemeSwitch = () => {
  let baseTheme = "light";
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    baseTheme = "dark";
  } else {
    baseTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light";
  }

  const [theme, setTheme] = useState(baseTheme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // Save theme to local Storage
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [theme, setTheme];
};

export default useThemeSwitch;
