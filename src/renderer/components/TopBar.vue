<template>
  <div class="top-bar">
    <router-link
        class="navbar-brand"
        :to="{ name: 'home' }"
    >
      Instatools
    </router-link>
    <span class="instagram-avatar">
      <a href="#">
       <img style="max-width: 40px;" :src="$store.state.instagram.profile.profileUrl" alt="">
      </a>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'top-bar'
  }
</script>

<style lang="scss" scoped>
  .top-bar {
    width: 100vw;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fafafa;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(230, 230, 230);
  }

  .navbar-brand {
    color: #2c3e50;
    font-size: 28px;
    font-weight: bold;
    margin-left: 20px;
    text-align: center;
  }

  .instagram-avatar {
    margin-right: 20px;
  }
</style>
