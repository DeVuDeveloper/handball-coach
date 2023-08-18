import React from 'react';
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './common/Sidebar';
import Rightbar from './common/Rightbar';
import Hamburger from './common/Hamburger';
import Home from './pages/Home';
import NotFound from './pages/404';
import HandballCourt from './components/HandballCourt';
import Manual from './pages/Manual';
import { useState } from 'react';
import './App.css';

function App() {
  const [mode, setMode] = useState('light');
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={'background.default'} color={'text.primary'} height={'100vh'}>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
          <Router>
            <Sidebar mode={mode} setMode={setMode} />
            <Hamburger />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/manual' element={<Manual />} />
              <Route path='/handball' element={<HandballCourt />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <RightbarConditionally />
          </Router>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

function RightbarConditionally() {
  const location = useLocation();

 
  if (location.pathname === '/' || location.pathname === '/manual') {
    return <Rightbar />;
  }
  return null;
}

export default App;



