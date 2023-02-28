import NProgress from 'nprogress'; // progress bar

import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';

export default function setupUserLoginInfoGuard(router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    console.log(
      '%c [ userStore ]-10',
      'font-size:13px; background:pink; color:#bf2c9f;',
      userStore
    );
    if (isLogin()) {
      if (userStore.login) {
        next();
      } else {
        try {
          await userStore.info();
          next();
        } catch (error) {
          next({
            name: 'init',
            query: {
              redirect: to.name,
              ...to.query,
            },
          });
        }
      }
    } else {
      if (to.name === 'init') {
        next();
        return;
      }
      next({
        name: 'init',
        query: {
          redirect: to.name,
          ...to.query,
        },
      });
    }
  });
}
