import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';

const BasketPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    setLoading(true);

    agent.Basket.get()
      .then((basketData) => setBasket(basketData))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading basket..." />;

  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
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
                {basketItem.name}
              </TableCell>
              <TableCell align="right">{`€${(basketItem.price / 100).toFixed(2)}`}</TableCell>
              <TableCell align="right">{basketItem.quantity}</TableCell>
              <TableCell align="right">
                {`€${((basketItem.price / 100) * basketItem.quantity).toFixed(2)}`}
                <IconButton color="error"><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketPage;
