// Data fetching
import axios from 'axios'

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
}

export default new Auth()