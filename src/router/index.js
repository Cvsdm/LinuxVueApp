import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Exercise from '../views/Exercise.vue'
import store from '../store/index'
import Modules from '../views/Modules.vue'
import Module from '../views/Module.vue'
import StudentView from '../views/StudentView.vue'

Vue.use(VueRouter)

async function beforeEnter (_to, _from, next) {
  if (!store.getters['user/isAuthenticated']) {
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

// the function continues in the second panel, not enough space here
const routes = [
  /* {
    path: '/',
    name: 'home',
    component: Home
    // beforeEnter // notice this new property
  }, */
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/exercise',
    name: 'exercise',
    component: Exercise,
    beforeEnter
  },
  {
    path: '/',
    name: 'modules',
    component: Modules,
    beforeEnter
  },
  {
    path: '/module/:id',
    name: 'module',
    component: Module,
    beforeEnter
  },
  {
    path: '/module/:mId/session/:sId/exercice/:eId',
    name: 'StudentExercise',
    component: StudentView,
    beforeEnter
  }

]

export default new VueRouter({
  routes
})
