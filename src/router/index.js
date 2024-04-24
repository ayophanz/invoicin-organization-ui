
import { createRouter, createWebHistory } from 'vue-router';
import middleware from './middleware';
import Main from '../views/Main.vue';
import Profile from '../views/Profile.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/organization',
        name: 'Main',
        component: Main,
      },
      {
        path: '/organization/profile',
        name: 'Profile',
        component: Profile,
      },
    ],
  });
  
router.beforeEach(middleware.beforeEach);
  
export default router;