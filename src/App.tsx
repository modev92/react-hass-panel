import React from 'react';
import { ThemeProvider } from 'styled-components';
import Dashboard from './Dashboard';
import { HassContext } from './hass/HassContext';

//TODO: on Production we need other font url
import './style/fontDev.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const App = (props: any) => {
  return (
    <ThemeProvider theme={{}}>
      <HassContext.Provider value={props.hass}>
        <Dashboard />
      </HassContext.Provider>
    </ThemeProvider>
  );
};

export default App;
