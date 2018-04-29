<template>
  <div class="left-bar">
    <div>
      <ul class="navbar-nav">
        <router-link
            :to="{ name: 'home' }"
            active-class="active"
            class="nav-item"
            tag="li"
        >
          <a class="nav-link">
            Home
          </a>
        </router-link>
        <router-link
            :to="{ name: 'likes' }"
            active-class="active"
            class="nav-item"
            tag="li"
        >
          <a class="nav-link">
            Likes
          </a>
        </router-link>
        <router-link
            :to="{ name: 'followers' }"
            active-class="active"
            class="nav-item"
            tag="li"
        >
          <a class="nav-link">
            Followers
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'left-menu'
  }
</script>

<style lang="scss" scoped>
  .left-bar {
    width: 150px;
    min-width: 150px;
    background-color: #fafafa;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(230, 230, 230);

    li {
      height: 50px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      border-width: 0 0 1px 0;
      border-style: solid;
      border-color: rgb(230, 230, 230);
      color: #2c3e50;
      font-size: 18px;
    }

    .active {
      font-weight: bold;
    }
  }
</style>
