import client from '../helpers/client.api';

const login = (body) => client().post('/auth/login', body);
const register = (body) => client().post('/auth/register', body);
const resetPassword = (body) => client().post('/auth/reset-password', body);
const forgotPassword = (body) => client().post('/auth/forgot-password', body);

export default {
  login, register, forgotPassword, resetPassword,
};
