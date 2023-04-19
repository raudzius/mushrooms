import React from 'react';
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
import BasketSummary from './BasketSummary';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';

const BasketPage: React.FC = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

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
                    loading={status === `pendingAddItem${basketItem.productId}`}
                    onClick={() => dispatch(addBasketItemAsync(
                      { productId: basketItem.productId },
                    ))}
                  >
                    <Add />
                  </LoadingButton>
                  {basketItem.quantity}
                  <LoadingButton
                    color="error"
                    loading={status === `pendingRemoveItem${basketItem.productId}remove`}
                    onClick={() => dispatch(removeBasketItemAsync(
                      { productId: basketItem.productId, quantity: 1, name: 'remove' },
                    ))}
                  >
                    <Remove />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {`€${((basketItem.price / 100) * basketItem.quantity).toFixed(2)}`}
                  <LoadingButton
                    color="error"
                    loading={status === `pendingRemoveItem${basketItem.productId}delete`}
                    onClick={() => dispatch(removeBasketItemAsync(
                      { productId: basketItem.productId, quantity: basketItem.quantity, name: 'delete' },
                    ))}
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
