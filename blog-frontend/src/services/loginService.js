import axios from 'axios';

const BASEURL = '/api/login';
let token;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
} 

const login = async (credentials) => {
  const params = {
    headers: {
      Authorization: token,
    }
  }
  const response = await axios.post(BASEURL, credentials, params);
  return response.data;
}
const loginService = { setToken, login };

export default loginService;