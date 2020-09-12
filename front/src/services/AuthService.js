import axios from 'axios'
const url = 'http://localhost:3000/api/'
export default {
  Login (credentials) {
    return axios
      .post(url + 'Login/', credentials)
      .then(response => response.data)
  },
  Register (credentials) {
    return axios
      .post(url + 'Register/', credentials)
      .then(response => response.data)
  },
  getSecretContent () {
    return axios.get(url + 'secret-route/').then(response => response.data)
  }
}