
import axios from 'axios'


const serverAPI =  axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
  
  });

  serverAPI.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['x-access-token'] = token;
        // config.headers['File-Type'] = 'image/jpeg, image/png, application/pdf';
        // config.headers['File-Type'] = 'bmp, dib, gif, tif, tiff, jfif, jpe, jpg, jpeg, pbm, pgm, ppm, pnm, png, apng, blp, bufr, cur, pcx, dcx, dds, ps, eps, fit, fits, fli, flc, fpx, ftc, ftu, gbr, grib, h5, hdf, jp2, j2k, jpc, jpf, jpx, j2c, icns, ico, im, iim, mic, mpg, mpeg, mpo, msp, palm, pcd, pdf, pxr, psd, bw, rgb, rgba, sgi, ras, tga, icb, vda, vst, webp, wmf, emf, xbm, xpm.';
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