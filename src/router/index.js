import Vue from 'vue';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';

Vue.use(VueMeta);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Korea',
    component: () => import('@/views/Korea.vue'),
  },
  {
    path: '/global',
    name: 'Global',
    component: () => import('@/views/Global.vue'),
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('@/views/PageNotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
