import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (profile.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/customers',
    name: 'Customers',
    meta: {
      requiresAuth: true,
      requiresPermission: 'View customers'
    },
    component: () => import('../views/Customers/Index.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    meta: {
      requiresAuth: true,
      requiresPermission: 'View orders'
    },
    component: () => import('../views/Orders/Index.vue')
  },
  {
    path: '/orders/:id/change-status',
    name: 'ChangeOrderStatus',
    meta: {
      requiresAuth: true,
      requiresPermission: 'Change order status'
    },
    component: () => import('../views/Orders/ChangeOrderStatus.vue')
  },
  {
    path: '/orders/:id/add-note',
    name: 'AddNote',
    meta: {
      requiresAuth: true,
      requiresPermission: 'Add notes to order'
    },
    component: () => import('../views/Orders/AddNote.vue')
  },
  {
    path: '/orders/:id/edit',
    name: 'Edit',
    meta: {
      requiresAuth: true,
      requiresPermission: 'Edit orders'
    },
    component: () => import('../views/Orders/Edit.vue')
  },
  {
    path: '/products',
    name: 'Products',
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/Products/Index.vue')
  },
  {
    path: '/products/create',
    name: 'CreateProduct',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Products/Create.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    meta: {
      requiresAuth: true,
      requiresPermission: 'Submit order'
    },
    component: () => import('../views/Checkout.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (from == to) return;
  const loggedIn = await store.getters['auth/isLoggedIn'];
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  const permitted = to.matched.some(record => {
    if (record.meta.requiresPermission) {
      return store.getters['auth/hasPermissionTo'](record.meta.requiresPermission);
    } else {
      return true;
    }
  });
  if (requiresAuth && !loggedIn) {
    next('/login');
    return;
  } else if ((to.path == '/login' && !!loggedIn) || !permitted) {
    next('/');
    return;
  }
  next();
});

export default router;
