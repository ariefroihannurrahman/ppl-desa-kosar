import client from '../helpers/client.api';

const updateProfile = (token, body) => client(token).put('/profile', body, { headers: { 'Content-Type': 'multipart/form-data' } });
const getProfile = (token) => client(token).get('/profile');

export default { getProfile, updateProfile };
