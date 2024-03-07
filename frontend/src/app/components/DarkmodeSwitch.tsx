import { useState } from 'react';
import { Switch } from '@mui/material';

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.style.backgroundColor = newDarkMode ? '#000' : '#fff';
    document.documentElement.style.color = newDarkMode ? '#fff' : '#000';
  };

  return (
    <Switch checked={darkMode} onChange={toggleDarkMode} />
  );
};

export default DarkModeSwitch;