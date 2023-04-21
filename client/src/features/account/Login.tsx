import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar, Box, Container, Grid, Link, Paper, TextField, Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: 'onTouched',
  });

  const submitForm = async (data: FieldValues) => {
    try {
      await agent.Account.login(data);
    } catch (error) {
      console.log(error);
    }
  };

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
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
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
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors?.password?.message as string}
          {...register('password', { required: 'Password is required' })}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isSubmitting}
          disabled={!isValid}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="register">
              Don&apos;t have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
