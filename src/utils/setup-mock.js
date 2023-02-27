import debug from './env';

export default ({ mock, setup }) => {
  if (mock !== false && debug) setup();
};

export const successResponseWrap = (data) => {
  return {
    data,
    status: 'ok',
    msg: '请求成功',
    code: 20000,
  };
};

export const failResponseWrap = (data, msg, code = 50000) => {
  return {
    data,
    status: 'fail',
    msg,
    code,
  };
};
