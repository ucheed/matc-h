import api from './client';

const login = info => api.post('/token', info);
const register = info => api.post('/user/signup', info);

export default {
  login,
  register,
};
