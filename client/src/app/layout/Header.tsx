import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar, Toolbar, Typography, Switch, List, ListItem, Badge, IconButton, Box,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': { color: 'grey.500' },
  '&.active': { color: 'text.secondary' },
};

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
];
const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
];

type HeaderProps = {
  darkMode: boolean,
  toggleDarkMode: () => void;
};

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => (
  <AppBar position="static" sx={{ mb: 4 }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={navStyles}
        >
          Mushrooms

        </Typography>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </Box>

      <List sx={{ display: 'flex' }}>
        {midLinks.map(({ title, path }) => (
          <ListItem
            key={title}
            component={NavLink}
            to={path}
            sx={navStyles}
          >
            {title.toUpperCase()}
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton component={RouterLink} to="/basket" size="large" edge="end" color="inherit" sx={{ mr: 2 }}>
          <Badge badgeContent="4" color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <List sx={{ display: 'flex' }}>
          {rightLinks.map(({ title, path }) => (
            <ListItem
              key={title}
              component={NavLink}
              to={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
      </Box>

    </Toolbar>
  </AppBar>
);

export default Header;
