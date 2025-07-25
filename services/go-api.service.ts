import axios from 'axios';

const goApi = axios.create({
   baseURL: process.env.NEXT_PUBLIC_GO_API_URL,
});

goApi.interceptors.request.use(
   (config) => {
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

goApi.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      if (error.response) {
         switch (error.response.status) {
            case 401:
               error.message = 'Unauthorized. Please check your credentials.';
               break;
            case 403:
               error.message = 'Forbidden. You do not have permission to access this resource.';
               break;
            case 404:
               error.message = 'Resource not found.';
               break;
            case 500:
            case 502:
            case 503:
            case 504:
               error.message = 'Server error. Please try again later.';
               break;
            default:
               error.message = `An error occurred: ${error.response.statusText || 'Unknown server error'}`;
         }
      } else if (error.request) {
         error.message = 'No response received from the server. Please check your network connection.';
      } else {
         error.message = 'Error setting up the request: ' + error.message;
      }
      return Promise.reject(error);
   },
);

export default goApi;
