import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar, Toolbar, Typography, Switch, List, ListItem, Badge, IconButton,
} from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

type HeaderProps = {
  darkMode: boolean,
  toggleDarkMode: () => void;
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

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => (
  <AppBar position="static" sx={{ mb: 4 }}>
    <Toolbar>
      <Typography variant="h6" component={NavLink} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>Mushrooms</Typography>
      <Switch checked={darkMode} onChange={toggleDarkMode} />
      <List sx={{ display: 'flex' }}>
        {midLinks.map(({ title, path }) => (
          <ListItem key={title} component={NavLink} to={path} sx={{ color: 'inherit' }}>{title.toUpperCase()}</ListItem>))}
      </List>
      <IconButton size="large" edge="end" color="inherit" sx={{ mr: 2 }}>
        <Badge badgeContent="4" color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <List sx={{ display: 'flex' }}>
        {rightLinks.map(({ title, path }) => (
          <ListItem key={title} component={NavLink} to={path} sx={{ color: 'inherit' }}>{title.toUpperCase()}</ListItem>))}
      </List>
    </Toolbar>
  </AppBar>
);

export default Header;
