import Vue from 'vue'
import VueRouter from 'vue-router'
import Pokedex from '../components/Pokedex.vue'
import InfoPokemon from '../components/InfoPokemon.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pokedex',
    component: Pokedex
  },
  {
    path: '/info/:pokeName',
    name: 'InfoPokemon',
    component: InfoPokemon
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
