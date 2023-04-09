import {
  Avatar, List, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material';
import React from 'react';

type CatalogProps = {
  products: Product[];
};

const Catalog: React.FC<CatalogProps> = ({ products }) => (
  <List>
    {products.map(({
      id, name, price, pictureUrl,
    }) => (
      <ListItem key={id}>
        <ListItemAvatar><Avatar src={pictureUrl} /></ListItemAvatar>
        <ListItemText>{`${name} - ${price}`}</ListItemText>
      </ListItem>
    ))}
  </List>
);

export default Catalog;
