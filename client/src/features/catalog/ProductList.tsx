import {
  Grid,
} from '@mui/material';
import React from 'react';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <Grid container spacing={4}>
    {products.map((product) => (
      <Grid item xs={3} key={product.id}>
        <ProductCard product={product} />
      </Grid>
    ))}
  </Grid>
);

export default ProductList;
