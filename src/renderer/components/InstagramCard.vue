<template>
  <div class="card">
    <div class="thumbnail">
      <img :src="media.display_src" alt="media.caption">
    </div>
    <div class="card-footer">
      <div class="likes"><icon name="heart" color="#fb3958"></icon> {{media.likes.count}}</div>
      <div class="comments"><icon name="comment-o"></icon> {{media.comments.count}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'instagram-card',
    props: ['media']
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
