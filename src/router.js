import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Preview from './views/Preview.vue'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import About from './views/About.vue'
import Exercise from './views/Exercise.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/blog',
      name: 'home',
      component: Home
    },
    {
      path: '/:uid',
      name: 'article',
      component: Article
    },
    {
      path: 'exercices/:uid',
      name: 'exercise',
      component: Exercise
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
      path: '/preview',
      name: 'preview',
      component: Preview
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
