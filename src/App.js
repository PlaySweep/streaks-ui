import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import ScrollToTop from './ScrollToTop'
import OnboardContainer from './OnboardContainer'
import WelcomeContainer from './WelcomeContainer'
import DashboardContainer from './DashboardContainer'
import PrizeContainer from './PrizeContainer'

import { OpenRoute, ProtectedRoute } from './routes'

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Switch>
          <ProtectedRoute exact path='/prizing' component={() => 
            <PrizeContainer /> } 
          />
          <ProtectedRoute exact path='/dashboard' component={() => 
            <DashboardContainer /> } 
          />
          <ProtectedRoute exact path='/welcome' component={() => 
            <WelcomeContainer /> } 
          />
          <Route exact path="/" component={OnboardContainer} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
