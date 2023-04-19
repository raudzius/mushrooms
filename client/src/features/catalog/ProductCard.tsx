import {
  Button, Card, CardHeader, Avatar, CardActions, CardContent, CardMedia, Typography,
} from '@mui/material';
import { Restaurant, LocalPharmacy } from '@mui/icons-material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { currencyFormat } from '../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync } from '../basket/basketSlice';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const {
    pictureUrl, name, price, category,
  } = product;

  const cardHeaderIcon = category === 'Edible' ? <Restaurant /> : <LocalPharmacy />;

  return (
    <Card>
      <CardHeader avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{cardHeaderIcon}</Avatar>} title={name} titleTypographyProps={{ sx: { fontWeight: 'bold', color: 'primary.main' } }} />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain' }}
        image={pictureUrl}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">{currencyFormat(price)}</Typography>
        <Typography variant="body2" color="text.secondary">{product.type}</Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={status.includes(`pendingAddItem${product.id}`)} size="small" onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}>Add to cart</LoadingButton>
        <Button component={RouterLink} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
