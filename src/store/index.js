import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useDataStore from './modules/data';
import useStarStore from './modules/star';
import useTabBarStore from './modules/tab-bar';

const pinia = createPinia();

export {
  useAppStore,
  useUserStore,
  useTabBarStore,
  useDataStore,
  useStarStore,
};

export default pinia;
