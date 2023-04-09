import React, { useState } from 'react';
import {
  Container, CssBaseline, createTheme, ThemeProvider,
} from '@mui/material';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const palletteType = darkMode ? 'dark' : 'light';

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: { mode: palletteType, background: { default: palletteType === 'light' ? '#eaeaea' : '#121212' } },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
};

export default App;
