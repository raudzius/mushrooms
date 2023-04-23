import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from './CheckoutPage';

const stripePromise = loadStripe('pk_live_51K80mMDaCJKT60BESsXd4zst0JrviseyhVC7bABOPMKGc3eAEYkssQjFLGBMBrXMuqZrchXT6u7QUJZpdD8V1Z5E00dP9YQoud');

const CheckoutWrapper: React.FC = () => (
  <Elements stripe={stripePromise}><CheckoutPage /></Elements>
);

export default CheckoutWrapper;
