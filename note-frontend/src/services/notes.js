import axios from 'axios';

const baseUrl = '/api/notes';
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}
const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then((response) => response.data);
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.then((response) => response.data);
}
const noteService = { setToken, getAll, create, update, }
export default noteService;