import Vue from 'vue'
import VueRouter from 'vue-router'
// import axios from 'axios'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ExercisePage from '../views/Exercise.vue'

Vue.use(VueRouter)

function createRouter (state) {
  /* async function beforeEnter (to, from, next) {
    try {
      const { data: user } = await axios.get('/api/me')
      state.user = user
      next()
    } catch (err) {
      console.log('err', err)
      next('/login') // redirect to login if user is not authenticated
    }
  } */
  // the function continues in the second panel, not enough space here
  const routes = [
    {
      path: '/home',
      name: 'home',
      component: Home
      // beforeEnter // notice this new property
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/exercise',
      name: 'Exercise',
      component: ExercisePage
      // beforeEnter
    }
  ]

  return new VueRouter({
    routes
  })
}

export default createRouter
