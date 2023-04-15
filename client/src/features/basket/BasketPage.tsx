import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';

const BasketPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    setLoading(true);

    agent.Basket.get()
      .then((basketData) => setBasket(basketData))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading basket..." />;

  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <h1>{`Buyer Id = ${basket.buyerId}`}</h1>
  );
};

export default BasketPage;
