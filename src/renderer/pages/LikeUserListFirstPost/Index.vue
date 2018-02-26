<template>
  <v-layout>
    <div class="likes-page">
      <div class="left-side">
        <textarea name="usernames" v-model="usernames" placeholder="add usernames"></textarea>
      </div>
      <div class="middle-side">
        <div class="button-middle">
          <button @click="likes">Empezar</button>
        </div>
      </div>
      <div class="right-side">
        <div class="logs">
          <p v-for="log in $store.state.instagram.logs">
            {{log}}
          </p>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
  /* ============
   * Home Index Page
   * ============
   *
   * The home index page.
   */

  import VLayout from '../../layouts/Default'

  export default {
    name: 'like-users-first-post',
    components: {
      VLayout
    },
    data () {
      return { usernames: '' }
    },
    methods: {
      likes () {
        // clean username list and convert to array
        const usernameArray = this.usernames.replace(/(\r\n|\n|\r)/gm, ' ').split(/\b\s+(?!$)/)
        if (usernameArray.length > 0) {
          this.$electron.ipcRenderer.send('likeUserListFirstPost', usernameArray)
        }
      }
    },
    mounted () {
      this.$store.commit('instagram/RESET_LOG')
    }
  }
</script>
<style scoped lang="scss">
  .likes-page {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .left-side {
    //flex-grow: 1;
    padding: 5%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 100px;

    textarea {
      width: 100%;
      height: 100%;
    }
  }

  .middle-side {
    min-width: 150px;
    width: 150px;
    height: 100%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    .button-middle {
      width: 100%;
      height: 50px;
    }
  }

  .right-side {
    //flex-grow: 1;
    padding: 5%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 100px;

    .logs {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }

  button {
    height: 100%;
    background: #3897f0;
    border-color: #3897f0;
    color: #fff;
    -webkit-appearance: none;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    font-size: 14px;
    font-weight: 600;
    line-height: 26px;
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    cursor: pointer;
  }
</style>
