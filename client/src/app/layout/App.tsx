import React, { useEffect, useState } from 'react';
import {
  Container, CssBaseline, createTheme, ThemeProvider,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { getCookie } from '../util/util';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../features/basket/basketSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const palletteType = darkMode ? 'dark' : 'light';

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: { mode: palletteType, background: { default: palletteType === 'light' ? '#eaeaea' : '#121212' } },
  });

  useEffect(() => {
    const buyerId = getCookie('buyerId');

    if (buyerId) {
      agent.Basket.get()
        .then((basketData) => dispatch(setBasket(basketData)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) return <LoadingComponent message="Initializing app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default App;
