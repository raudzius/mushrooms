import {
  Button, Card, CardHeader, Avatar, CardActions, CardContent, CardMedia, Typography,
} from '@mui/material';
import { Restaurant, LocalPharmacy } from '@mui/icons-material';
import React from 'react';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
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
        <Typography gutterBottom color="secondary" variant="h5">{`€${(price / 100).toFixed(2)}`}</Typography>
        <Typography variant="body2" color="text.secondary">{product.type}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
