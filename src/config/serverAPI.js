
import axios from 'axios'


const serverAPI =  axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
  
  });

  serverAPI.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['x-access-token'] = token; 
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  serverAPI.interceptors.response.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['x-access-token'] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  
export default serverAPI;