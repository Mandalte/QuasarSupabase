
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '',name:'loginDefault', component: () => import('pages/LoginPage.vue') },
      { path: 'login',name:'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register',name:'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'email-confirmation',name:'email-confirmation', component: () => import('pages/EmailConfirmationPage.vue') },
      { path: 'fogoutpassword',name:'fogoutpassword', component: () => import('pages/FogoutPasswordPage.vue') },
      { path: 'reset-password',name:'reset-password', component: () => import('pages/ResetPasswordPage.vue') }

    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me',name:'me', component: () => import('pages/MePage.vue') },
      { path: 'list-category',name:'list-category', component: () => import('pages/category/ListCategoryPage.vue') },
      { path: 'register-category/:id?',name:'register-category', component: () => import('pages/category/RegisterCategoriaPage.vue') }
    ]
    // ,
    // meta: {
    //   requiresAuth: true
    // }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
