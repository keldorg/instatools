import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/pages/Login/Index').default
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/pages/Home/Index').default
    },
    {
      path: '/likes',
      name: 'likes',
      component: require('@/pages/LikeUserListFirstPost/Index').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
