<template>
  <v-layout>
    <div class="cards" v-if="$store.state.instagram.profile.raw">
      <instagram-card  :media="media" v-for="(media, index) in $store.state.instagram.profile.raw.media.nodes" :key="index"></instagram-card>
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
  import InstagramCard from '../../components/InstagramCard.vue'

  export default {
    /**
     * The name of the page.
     */
    name: 'home-index',

    /**
     * The components that the page can use.
     */
    components: {
      VLayout,
      InstagramCard
    }

  }
</script>
<style scoped lang="scss">
  .cards {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: auto;
    flex-wrap: wrap;
    background-color: #fafafa;
  }
</style>
