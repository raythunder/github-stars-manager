import NProgress from 'nprogress'; // progress bar

import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';

export default function setupUserLoginInfoGuard(router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    console.log(
      '%c [ isLogin() ]-11',
      'font-size:13px; background:pink; color:#bf2c9f;',
      isLogin()
    );
    if (isLogin()) {
      if (userStore.role) {
        next();
      } else {
        try {
          await userStore.info();
          next();
        } catch (error) {
          await userStore.logout();
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
