import axios from 'axios';

let token;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}
const BASEURL = '/api/blogs';
const getBlogs = async () => {
  const response = await axios.get(BASEURL);
  return response.data;
}
const addBlog = async (newBlog) => {
  const params = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(BASEURL, newBlog, params);
  return response.data;
}

const blogService = { setToken, getBlogs, addBlog };

export default blogService;