import {create} from 'apisauce';

const api = create({
  // baseURL: 'https://api.moderncare.org/',
  baseURL: 'https://host.ucheed.com/wordpress_testing/wp-json/jwt-auth/v1',
});

export default api;
