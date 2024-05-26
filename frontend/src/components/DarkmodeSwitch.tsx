import { useEffect, useState } from 'react';
import { Switch } from '@mui/material';

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);
  

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("colormode", newDarkMode ? "dark": "light")
  };


  useEffect(() => {
    const mode = localStorage.getItem("colormode");
    if (mode == null) {
      return;
    }
    setDarkMode(mode == "dark");
    document.documentElement.setAttribute("data-theme", mode);
  }, [darkMode]);

  return (
    <Switch checked={darkMode} onChange={toggleDarkMode} />
  );
};

export default DarkModeSwitch;