import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from './CheckoutPage';
import { useAppDispatch } from '../../app/store/configureStore';
import agent from '../../app/api/agent';
import { setBasket } from '../basket/basketSlice';
import LoadingComponent from '../../app/layout/LoadingComponent';

const stripePromise = loadStripe('pk_test_51K80mMDaCJKT60BEvA0bvrGH1sfobCf2pFvqxUsP87DXpvSdnHUzrSTfo6JHmsns2XOCXUp1SHbePZNXwbk0kwCf002IGIp4jK');

const CheckoutWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <LoadingComponent message="Loading checkout..." />;

  return (
    <Elements stripe={stripePromise}><CheckoutPage /></Elements>
  );
};

export default CheckoutWrapper;
