import {
  List,
} from '@mui/material';
import React from 'react';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <List>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </List>
);

export default ProductList;
