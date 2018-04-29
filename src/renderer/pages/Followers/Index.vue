<template>
  <v-layout>
    <div class="followers-page">
     <ul>
       <li v-for="follower in $store.state.instagram.followers">
         <img style="max-width: 60px;" :src="follower.picture" alt="">
         {{follower.username}}
       </li>
     </ul>
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
    name: 'followers',
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
      console.log('hola')
      console.log(this.$store.state.instagram.profile.id)
      this.$electron.ipcRenderer.send('getFollowers', this.$store.state.instagram.profile.id)
    }
  }
</script>
<style scoped lang="scss">
  .followers-page {
    height: 100%;
    width: 100%;
    display: flex;
  }
</style>
