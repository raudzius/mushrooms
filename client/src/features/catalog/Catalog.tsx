import React from 'react';
import ProductList from './ProductList';

type CatalogProps = {
  products: Product[];
};

const Catalog: React.FC<CatalogProps> = ({ products }) => (
  <ProductList products={products} />
);

export default Catalog;
