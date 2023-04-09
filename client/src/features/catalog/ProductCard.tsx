import {
  Avatar, ListItem, ListItemAvatar, ListItemText, Typography,
} from '@mui/material';
import React from 'react';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const {
    id, pictureUrl, name, price,
  } = product;

  return (
    <ListItem key={id}>
      <ListItemAvatar><Avatar src={pictureUrl} /></ListItemAvatar>
      <ListItemText>{`${name} - ${price}`}</ListItemText>
    </ListItem>
  );
};

export default ProductCard;
