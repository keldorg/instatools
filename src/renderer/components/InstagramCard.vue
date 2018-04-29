<template>
  <div class="card">
    <div class="thumbnail">
      <img :src="media._params.images[0].url" alt="media.caption">
    </div>
    <div class="card-footer">
      <div class="likes"><icon name="heart" color="#fb3958"></icon> {{media._params.likeCount}}</div>
      <div class="comments"><icon name="comment-o"></icon> {{media._params.commentCount}}</div>
      <div class="comments" @click="likers(media._params.id)"><icon name="refresh"></icon></div>
      <div class="comments"><icon name="comment-o"></icon> {{media.likers.data.length}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'instagram-card',
    props: ['media'],
    methods: {
      likers (id) {
        this.$electron.ipcRenderer.send('getLikers', id)
      }
    }
  }
</script>

<style scoped lang="scss">
  .card {
    margin: 10px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(230, 230, 230);
  }

  .thumbnail {
    width: 100%;
  }
  .card-footer {
    display: block;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
