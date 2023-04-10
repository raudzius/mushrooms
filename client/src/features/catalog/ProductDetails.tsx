import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string; }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  if (!product) {
    return <Typography variant="h3">Product not found</Typography>;
  }

  return (
    <Typography variant="h2">{product.name}</Typography>
  );
};

export default ProductDetails;
