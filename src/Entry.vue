<template>
  <div>
    <button @click="toggle = !toggle">toggle</button>
    <keep-alive>
      <App v-if="toggle" />
    </keep-alive>
  </div>
</template>

<script>
  import App from './App'

  export default {
    name: 'Entry',
    components: {App},
    data () {
      return {
        toggle: true
      }
    }
  }
</script>

<style scoped>

</style>
