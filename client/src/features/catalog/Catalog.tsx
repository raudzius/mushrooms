import React from 'react';

type CatalogProps = {
  products: Product[];
};

const Catalog: React.FC<CatalogProps> = ({ products }) => (
  <ul>
    {products.map(({ id, name, price }) => (
      <li key={id}>{`${name}-${price}`}</li>
    ))}
  </ul>
);

export default Catalog;
