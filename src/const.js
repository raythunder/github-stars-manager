const isDev = import.meta.env.DEV;
export const GIST_INFO = {
  name: 'my-github-stars.json',
  description: `My Github Stars data and backup ${isDev ? 'dev' : 'prod'}`,
};
