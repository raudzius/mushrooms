import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  return (
    <div>
      <h1>Mushroom-Store</h1>
      <ul>
        {products.map(({ id, name, price }) => (
          <li key={id}>
            {name} - {price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
