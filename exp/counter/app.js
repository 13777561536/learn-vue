import 'babel-polyfill'
import Vue from 'vue'
import Counter from './Counter.vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }
}

const modules = {
  namespaced: true,
  state: {
    nums: 10
  },
  mutations: {
    plus (state) {
      state.nums = state.nums * 2
    }
  }
}

const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    children: modules
  },
})

new Vue({
  el: '#app',
  store,
  render: h => h(Counter)
})
