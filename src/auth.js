// Data fetching
import axios from 'axios'

import jwt_decode from "jwt-decode";
import moment from 'moment';

// Store
const store = require('store');

class Auth {
  constructor() {
    this.sweepApi = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      timeout: 2500
    })
  }

  authenticate(email, password) {
    return this.sweepApi.post(`authenticate`, { email: email, password: password }).then((response) => {
      let auth_token = response.data.auth_token
      store.set('auth_token', auth_token)
      return auth_token
    })
  }

  logout(cb) {
    store.set('auth_token', null)
    setTimeout(cb, 250)
  }

  isAuthenticated() {
    if (store.get('auth_token')) {
      return true
    }
    return false
  }

  isExpired() {
    let authToken = store.get('auth_token')
    if (authToken) {
      if (jwt_decode(authToken).exp < moment().unix()) {
        return true
      } else {
        return false
      }
    }
  }
}

export default new Auth()