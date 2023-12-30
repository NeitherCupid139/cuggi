
import { createRouter, createWebHistory } from 'vue-router';

import aboutPageVue from '../components/aboutPage.vue';
import HelloWorldVue from '../components/HelloWorld.vue';

const router = createRouter({
    history: createWebHistory(),
  routes: [
    {
      path: '/',
      component:HelloWorldVue,
    },
    {
      path: '/about',
      component: aboutPageVue,
    },
  ],
});
export default router;
