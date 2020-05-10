export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      config.headers['APIKey'] = process.env.VUE_APP_API_KEY;
      config.headers['Access-Control-Allow-Origin'] = '*';
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      response.headers['Access-Control-Allow-Methods'] = 'GET';
      response.headers['Access-Control-Allow-Origin'] = '*';
      return response;
    },
    function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );

  return instance;
}
