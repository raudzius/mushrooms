import React, { useEffect, useState } from 'react';

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
      <ul>
        {products.map(({ id, name, price }) => (
          <li key={id}>{`${name}-${price}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
