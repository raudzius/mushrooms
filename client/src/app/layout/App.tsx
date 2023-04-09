import React, { useEffect, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';

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
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products} />
      </Container>
    </>
  );
};

export default App;
