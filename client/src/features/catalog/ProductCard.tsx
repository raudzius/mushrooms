import {
  Button, Card, CardHeader, Avatar, CardActions, CardContent, CardMedia, Typography,
} from '@mui/material';
import { Restaurant, LocalPharmacy } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    pictureUrl, name, price, category,
  } = product;

  const handleAddItem = (productId: number) => {
    setLoading(true);

    agent.Basket.addItem(productId)
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

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
        <Typography gutterBottom color="secondary" variant="h5">{`€${(price / 100).toFixed(2)}`}</Typography>
        <Typography variant="body2" color="text.secondary">{product.type}</Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} size="small" onClick={() => handleAddItem(product.id)}>Add to cart</LoadingButton>
        <Button component={RouterLink} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
