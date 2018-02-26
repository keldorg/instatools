<template>
  <div id="wrapper">
    <main>
      <div class="login-box">
        <div class="title">
          <span>
            Instatools
          </span>
        </div>
        <div><input type="text" v-model="username" placeholder="Introduce tu cuenta de instagram"></div>
        <div><input type="password" v-model="password" placeholder="Introduce tu contraseña"></div>
        <div><button v-on:click="login">Login</button></div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'login-page',
    data () {
      return { username: '', password: '' }
    },
    methods: {
      login () {
        this.$electron.ipcRenderer.send('login', { username: this.username, password: this.password })
      }
    },
    mounted () {
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background-color: #fafafa;
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  .login-box {
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 90%;
    min-height: 500px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 1px;
    margin: 0 0 10px;
    padding: 10px 0;
  }

  .login-box div {
    margin: 0 40px 6px;
  }

  .login-box span {
    width: 100%;
  }

  .login-box input {
    width: 100%;
    -webkit-box-flex: 1;
    -webkit-flex: 1 0 0;
    -ms-flex: 1 0 0;
    flex: 1 0 0;
    margin: 0;
    outline: none;
    overflow: hidden;
    padding: 9px 0 7px 8px;
    text-overflow: ellipsis;
    background: #fafafa;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    font: 400 13.3333px Arial;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(230, 230, 230);
    border-image: initial;
  }

  .login-box button {
    margin-top: 40px;
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

  main {
    display: flex;
    justify-content: center;
  }

  .title {
    color: #2c3e50;
    font-size: 38px;
    font-weight: bold;
    margin: 30px 40px 30px;
    text-align: center;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

</style>
