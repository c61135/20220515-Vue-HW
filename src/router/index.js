import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    // 如果沒有填入路徑，該元件將會是主頁
    path: '',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomePage.vue'),
  },
  {
    path: '/bookstore',
    name: 'Bookstore',
    component: () => import(/* webpackChunkName: "about" */ '../views/BookstorePage.vue'),
  },
  // 產品詳細頁面
  {
    path: '/bookstore/:productId',
    component: () => import('../components/BookstorePage/BookstoreProduct.vue'),
  },
  {
    path: '/qa',
    name: 'QuestionAnswer',
    component: () => import(/* webpackChunkName: "about" */ '../views/QusetionAnswer.vue'),
  },
  {
    path: '/drawlots',
    name: 'DrawLots',
    component: () => import(/* webpackChunkName: "about" */ '../views/DrawLots.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue'),
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/CartPage.vue'),
  },
  {
    path: '/order',
    component: () => import('../components/CartPage/CartOrder.vue'),
  },
  {
    path: '/checkout/:orderId',
    component: () => import('../components/CartPage/CartCheckOut.vue'),
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardPage.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/DashboardPage/ProductList.vue'),
      },
      {
        path: '/coupons',
        component: () => import('../components/DashboardPage/CouponList.vue'),
      },
      {
        path: '/orders',
        component: () => import('../components/DashboardPage/OrderList.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
