import React from 'react'

// Routing
import { Route, Redirect } from 'react-router-dom'

// Auth
import auth from './auth'

export const OpenRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={(props) => ( <Component { ...props } /> )} />
)

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={(props) => (
    auth.isAuthenticated() || auth.isExpired()
      ? <Component { ...props } />
      : <Redirect to={{
          pathname: '/'
        }} />
  )} />
)