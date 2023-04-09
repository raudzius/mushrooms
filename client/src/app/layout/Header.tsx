import {
  AppBar, Toolbar, Typography, Switch,
} from '@mui/material';
import React from 'react';

type HeaderProps = {
  darkMode: boolean,
  toggleDarkMode: () => void;
};

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => (
  <AppBar position="static" sx={{ mb: 4 }}>
    <Toolbar>
      <Switch checked={darkMode} onChange={toggleDarkMode} />
      <Typography variant="h6">Mushrooms</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
