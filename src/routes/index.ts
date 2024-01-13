
import { createRouter, createWebHistory } from 'vue-router';


import HomePageVue from '../pages/HomePage.vue';
import SettingPageVue from '../pages/SettingPage.vue';
import StatusPageVue from '../pages/StatusPage.vue';

const router = createRouter({
    history: createWebHistory(),
  routes: [
    {
      path: '/',
      component:HomePageVue,
    },
    {
      path: '/settings',
      component:SettingPageVue,
    },
    {
      path:'/status',
      component:StatusPageVue,
    }
   
  ],
});
export default router;
