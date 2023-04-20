import React, { useEffect } from 'react';
import {
  Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio,
  RadioGroup, Typography,
} from '@mui/material';
import ProductList from './ProductList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchFiltersAsync, fetchProductsAsync, productSelectors } from './catalogSlice';
import ProductSearch from './ProductSearch';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to High' },
];

const Catalog: React.FC = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded, status, filtersLoaded, categories, types,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [filtersLoaded, dispatch]);

  if (status.includes('pending')) return <LoadingComponent message="Loading products..." />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <RadioGroup>
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {types.map((type) => (
              <FormControlLabel key={type} control={<Checkbox />} label={type} />
            ))}
          </FormGroup>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel key={category} control={<Checkbox />} label={category} />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Displaying 1-6 of items</Typography>
          <Pagination color="secondary" size="large" count={10} page={2} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Catalog;
