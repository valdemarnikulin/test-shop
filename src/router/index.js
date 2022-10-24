import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'products',
    component: () => import('../views/AllProducts.vue'),
  },
  {
    path: '/addItem',
    name: 'addItem',
    component: () => import('../views/AddItem.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
