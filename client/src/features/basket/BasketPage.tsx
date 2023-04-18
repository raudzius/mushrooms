import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import Image from 'mui-image';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';
import agent from '../../app/api/agent';
import BasketSummary from './BasketSummary';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { removeItem, setBasket } from './basketSlice';

const BasketPage: React.FC = () => {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState({ loading: false, name: '' });

  const handleAddItem = (productId: number, name: string) => {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basketData) => dispatch(setBasket(basketData)))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }));
  };

  const handleRemoveItem = (productId: number, name: string, quantity = 1) => {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => dispatch(removeItem({ productId, quantity })))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }));
  };

  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((basketItem) => (
              <TableRow
                key={basketItem.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <Image
                      src={basketItem.pictureUrl}
                      alt={basketItem.name}
                      duration={0}
                      height={50}
                      width={70}
                      style={{ marginRight: 90 }}
                    />
                    <Typography component="span">{basketItem.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{`€${(basketItem.price / 100).toFixed(2)}`}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    color="success"
                    loading={status.loading && status.name === `add${basketItem.productId}`}
                    onClick={() => handleAddItem(basketItem.productId, `add${basketItem.productId}`)}
                  >
                    <Add />
                  </LoadingButton>
                  {basketItem.quantity}
                  <LoadingButton
                    color="error"
                    loading={status.loading && status.name === `remove${basketItem.productId}`}
                    onClick={() => handleRemoveItem(basketItem.productId, `remove${basketItem.productId}`)}
                  >
                    <Remove />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {`€${((basketItem.price / 100) * basketItem.quantity).toFixed(2)}`}
                  <LoadingButton
                    color="error"
                    loading={status.loading && status.name === `delete${basketItem.productId}`}
                    onClick={() => handleRemoveItem(basketItem.productId, `delete${basketItem.productId}`, basketItem.quantity)}
                  >
                    <Delete />

                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
