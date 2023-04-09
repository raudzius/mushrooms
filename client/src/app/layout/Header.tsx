import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Header: React.FC = () => (
  <AppBar position="static" sx={{ mb: 4 }}>
    <Toolbar>
      <Typography variant="h6">Mushrooms</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
