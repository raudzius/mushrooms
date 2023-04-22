import React, { useState } from 'react';
import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Container, Paper, Avatar, Typography, Box, TextField, Grid, Link, Alert, AlertTitle, List, ListItem, ListItemText,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import agent from '../../app/api/agent';

const Register: React.FC = () => {
  const [validationErrors, setValidationErrors] = useState([]);
  const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: 'onTouched',
  });

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => agent.Account.register(data)
          .catch((error) => setValidationErrors(error)))}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          autoFocus
          error={!!errors.username}
          helperText={errors?.username?.message as string}
          {...register('username', { required: 'Username is required' })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          error={!!errors.email}
          helperText={errors?.email?.message as string}
          {...register('email', { required: 'Email is required' })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors?.password?.message as string}
          {...register('password', { required: 'Password is required' })}
        />
        {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {validationErrors.map((validationError) => (
                <ListItem key={validationError}>
                  <ListItemText>{validationError}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Alert>
        )}
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isSubmitting}
          disabled={!isValid}
        >
          Sign Up
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/login">
              Already have an account? Sign In
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Register;
