import axios from 'axios';

const client = (token) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers,
  });
};

export default client;
