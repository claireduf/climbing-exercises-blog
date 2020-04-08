import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Home from './views/Home.vue'
import Exercise from './views/Exercise.vue'
import Article from './views/Article.vue'
import About from './views/About.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/exercises/:uid',
      name: 'exercise',
      component: Exercise
    },
    {
      path: '/articles/:uid',
      name: 'article',
      component: Article
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '*',
      redirect: { name: 'not-found' }
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
