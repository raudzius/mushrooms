import {
  Container, Divider, Paper, Typography,
} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

const ServerError: React.FC = () => {
  const { state } = useLocation();

  const stateError = (
    <>
      <Typography gutterBottom variant="h3" color="secondary">{state.error.title}</Typography>
      <Divider />
      <Typography variant="body1">{state.error.detail || 'Internal server error'}</Typography>
    </>
  );

  const defaultError = <Typography gutterBottom variant="h5">Server Error</Typography>;

  const errorMessage = state?.error ? stateError : defaultError;

  return (
    <Container component={Paper}>
      {errorMessage}
    </Container>
  );
};

export default ServerError;
