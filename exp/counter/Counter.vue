<template>
  <div id="app">
    Clicked: {{ count }} times, count is {{ evenOrOdd }}
    <br/>
    自定义映射变量结合了getters和state：{{backType}}
    <br/>
    子模块的state：{{ nums }}
    <br/>
    <button @click="increment">点击触发根模块的actions</button>
    <button @click="decrement">点击触发根模块的mutations</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
    <button @click="plus">点击触发子模块的mutations</button>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState([
      'count'
    ]),
    ...mapState('children', [
      'nums'
    ]),
    ...mapState({
      backType (state, getters) {
        return `${getters.evenOrOdd} + ${state.count}`
      }
    }),
    evenOrOdd () {
      return this.$store.getters.evenOrOdd
    }
  },
  methods: {
    increment () {
      this.$store.dispatch('increment')
    },
    decrement () {
      this.$store.commit({
        type: 'decrement'
      })
    },
    ...mapActions([
      'incrementIfOdd',
      'incrementAsync'
    ]),
    ...mapMutations('children', [
      'plus'
    ])
  }
}
</script>
