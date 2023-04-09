import React, { useEffect, useState } from 'react';
import Catalog from '../../features/catalog/Catalog';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((productsData) => {
        setProducts(productsData);
      });
  }, []);

  return (
    <div>
      <h1>Mushroom-Store</h1>
      <Catalog products={products} />
    </div>
  );
};

export default App;
