import {create} from 'apisauce';

const api1 = create({
  // baseURL: 'https://api.moderncare.org/',
  baseURL: 'https://host.ucheed.com/wordpress_testing/wp-json/ucheed-json/v1',
  timeout: 10000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaG9zdC51Y2hlZWQuY29tXC93b3JkcHJlc3NfdGVzdGluZyIsImlhdCI6MTY0MTU1MjU1NCwibmJmIjoxNjQxNTUyNTU0LCJleHAiOjE2NDIxNTczNTQsImRhdGEiOnsidXNlciI6eyJpZCI6NCwiZGV2aWNlIjoiIiwicGFzcyI6ImRjZTdkOTk0MjlmNTdkNDRkODNmOWM2YTFhZmYwNTMxIn19fQ.rhYcIt8cy7JbuMafjsUO3HEQkLs_x4Htxxby7E_T-3M',
  },
});
// const api1 = create({
//   // baseURL: 'https://api.moderncare.org/',
//   baseURL: 'https://host.ucheed.com/matc/api/',
// });
export default api1;
