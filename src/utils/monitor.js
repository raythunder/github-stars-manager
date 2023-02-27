import axios from 'axios';

export default function handleError(Vue, baseUrl) {
  if (!baseUrl) {
    return;
  }
  Vue.config.errorHandler = (err, instance, info) => {
    // send error info
    axios.post(`${baseUrl}/report-error`, {
      err,
      instance,
      info,
      // location: window.location.href,
      // message: err.message,
      // stack: err.stack,
      // browserInfo: getBrowserInfo(),
      // user info
      // dom info
      // url info
      // ...
    });
  };
}
