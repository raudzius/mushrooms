import { Add, Remove, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography,
} from '@mui/material';
import React from 'react';
import Image from 'mui-image';
import { useAppSelector, useAppDispatch } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';

type BasketTableProps = {
  items: BasketItem[];
  isBasket?: boolean;
};

const BasketTable: React.FC<BasketTableProps> = ({ items, isBasket = true }) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {isBasket && <TableCell align="right" />}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((basketItem) => (
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
                    style={{ marginRight: 20 }}
                  />
                  <Typography component="span">{basketItem.name}</Typography>
                </Box>
              </TableCell>
              <TableCell align="right">{`€${(basketItem.price / 100).toFixed(2)}`}</TableCell>
              <TableCell align="center">
                {isBasket && (
                  <LoadingButton
                    color="success"
                    loading={status === `pendingAddItem${basketItem.productId}`}
                    onClick={() => dispatch(addBasketItemAsync(
                      { productId: basketItem.productId },
                    ))}
                  >
                    <Add />
                  </LoadingButton>
                )}
                {basketItem.quantity}
                {isBasket && (
                  <LoadingButton
                    color="error"
                    loading={status === `pendingRemoveItem${basketItem.productId}remove`}
                    onClick={() => dispatch(removeBasketItemAsync(
                      { productId: basketItem.productId, quantity: 1, name: 'remove' },
                    ))}
                  >
                    <Remove />
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align="right">
                €
                {((basketItem.price / 100) * basketItem.quantity).toFixed(2)}
              </TableCell>
              {isBasket && (
                <TableCell align="right">
                  <LoadingButton
                    loading={status === `pendingRemoveItem${basketItem.productId}delete`}
                    onClick={() => dispatch(removeBasketItemAsync({
                      productId: basketItem.productId, quantity: basketItem.quantity, name: 'delete',
                    }))}
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketTable;
