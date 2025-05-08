import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';

const routes = [
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true }
  },
  { path: '/register', component: Register },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }
  next();
});

export default router;
