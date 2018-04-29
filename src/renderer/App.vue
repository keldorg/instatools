<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'insta-electron',
    mounted () {
      console.log('Checkeando si hay session guardada')
      this.$electron.ipcRenderer.send('checkSession')
    }
  }
</script>

<style>
  /* CSS */
</style>
