import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Catalog from '../../features/catalog/Catalog';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((productsData) => {
        setProducts(productsData);
      });
  }, []);

  return (
    <>
      <Typography variant="h1">Mushroom-Store</Typography>
      <Catalog products={products} />
    </>
  );
};

export default App;
