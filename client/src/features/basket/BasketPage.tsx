import React from 'react';
import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BasketSummary from './BasketSummary';
import { useAppSelector } from '../../app/store/configureStore';
import BasketTable from './BasketTable';

const BasketPage: React.FC = () => {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <BasketTable items={basket.items} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={RouterLink}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
