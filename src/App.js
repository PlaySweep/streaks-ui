import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import OnboardContainer from './OnboardContainer'
import WelcomeContainer from './WelcomeContainer'
import DashboardContainer from './DashboardContainer'

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={DashboardContainer} />
          <Route exact path="/welcome" component={WelcomeContainer} />
          <Route exact path="/" component={OnboardContainer} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
