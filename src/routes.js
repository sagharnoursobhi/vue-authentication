/*eslint-disable*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import Home from './components/Pages/home.vue'
import SignUp from './components/User/signup.vue'
import SignIn from './components/User/signin.vue'
import Dashboard from './components/User/dashboard.vue';

Vue.use(VueRouter)
const preventRouts = {
    beforeEnter(to , from , next) {
        if (store.state.idTokenInState){
            next()
        }else
          next('/')
    }
}
const routes = [
    { path:'/',component:Home },
    { path:'/signin', component: SignIn },
    { path:'/signup', component: SignUp },
    { path:'/dashboard', component: Dashboard, ...preventRouts
      /* beforeEnter(to , from , next) {
          if (store.state.idTokenInState){
              next()
          }else
            next('/')//if user is authenticated he will have access to dashboard otherwise by directing to dashboard
                    //just see the home// The point is that if we don't use this logic although dashboard is hidden when
                    //the user has not logged in yet but by using the /dashboard he will see dashboard page
      } */
    },
]

export default new VueRouter({mode: 'history', routes})