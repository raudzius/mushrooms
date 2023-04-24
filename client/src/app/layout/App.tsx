import React, { useCallback, useEffect, useState } from 'react';
import {
  Container, CssBaseline, createTheme, ThemeProvider,
} from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync } from '../../features/basket/basketSlice';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import HomePage from '../../features/home/HomePage';

const App: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const palletteType = darkMode ? 'dark' : 'light';

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: { mode: palletteType, background: { default: palletteType === 'light' ? '#eaeaea' : '#121212' } },
  });

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {loading ? <LoadingComponent message="Initializing app..." />
        : location.pathname === '/' ? <HomePage />
          : (
            <Container sx={{ mt: 4 }}>
              <Outlet />
            </Container>
          )}
    </ThemeProvider>
  );
};

export default App;
