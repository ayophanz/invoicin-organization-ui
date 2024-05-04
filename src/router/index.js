
import { createRouter, createWebHistory } from 'vue-router';
import middleware from './middleware';
import Main from '../views/Main.vue';
import Profile from '../views/Profile.vue';
import Address from '../views/Address.vue';
import user from '../views/user/Index.vue';
import userCreate from '../views/user/Create.vue';

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
      {
        path: '/organization/address',
        name: 'Address',
        component: Address,
      },
      {
        path: '/organization/users',
        name: 'User',
        children: [
          {
            path: '',
            component: user,
          },
          {
            path: 'new',
            component: userCreate,
          }
        ]
      }
    ],
  });
  
router.beforeEach(middleware.beforeEach);
  
export default router;