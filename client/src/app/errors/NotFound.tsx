import {
  Button,
  Container, Divider, Link, Paper, Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => (
  <Container component={Paper} sx={{ height: 400 }}>
    <Typography gutterBottom variant="h3">
      Oops - we could not find what you are looking for
    </Typography>
    <Divider />
    <Button fullWidth component={RouterLink} to="/catalog">Go back to shop</Button>
  </Container>
);

export default NotFound;
