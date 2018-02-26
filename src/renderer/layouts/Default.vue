<template>
  <div>
    <top-bar/>
    <div class="main">
      <left-menu/>
      <div class="container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import LeftMenu from '../components/LeftMenu.vue'
  import TopBar from '../components/TopBar.vue'

  export default {
    name: 'default-layout',
    components: {
      LeftMenu,
      TopBar
    },
    data () {
      return {
        menuCollapsed: false
      }
    },
    methods: {
      toggleMenu () {
        this.menuCollapsed = !this.menuCollapsed
      }
    }
  }
</script>
<style lang="scss">

  /*------------------------------------*\
      $NORMALIZE
  \*------------------------------------*/

  /* ==========================================================================
     VIEWPORT
     ========================================================================== */

  @-webkit-viewport {
    width : device-width;
  }

  @-moz-viewport {
    width : device-width;
  }

  @-ms-viewport {
    width : device-width;
  }

  @-o-viewport {
    width : device-width;
  }

  @viewport {
    width : device-width;
  }

  /* ==========================================================================
     HTML5 display definitions
     ========================================================================== */
  html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,figure,footer,header,hgroup,menu,nav,section,time,mark,audio,video
  {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    vertical-align:baseline;
    background:transparent;
  }

  *{
    &,
    &::before,
    &::after{
      -webkit-box-sizing:border-box;
      -moz-box-sizing:border-box;
      -ms-box-sizing:border-box;
      -o-box-sizing:border-box;
      box-sizing:border-box;
    }
  }

  /**
   * Correct `block` display not defined in IE 8/9.
   */

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  nav,
  section,
  summary,
  audio,
  canvas,
  video {
    display: block;
  }

  /**
   * Prevent modern browsers from displaying `audio` without controls.
   * Remove excess height in iOS 5 devices.
   */

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  /**
   * Address `[hidden]` styling not present in IE 8/9.
   * Hide the `template` element in IE, Safari, and Firefox < 22.
   */

  [hidden],
  template {
    display: none;
  }

  /* ==========================================================================
     Base
     ========================================================================== */

  /**
   * 1. Set default font family to sans-serif.
   * 2. Prevent iOS text size adjust after orientation change, without disabling
   *    user zoom.
   */

  html {
    font-family: sans-serif; /* 1 */
    -ms-text-size-adjust: 100%; /* 2 */
    -webkit-text-size-adjust: 100%; /* 2 */
    -webkit-tap-highlight-color : transparent;
  }

  /**
   * Remove default margin.
   */

  body {
    -webkit-overflow-scrolling : touch;
  }

  /* ==========================================================================
     Links
     ========================================================================== */

  /**
   * Remove the gray background color from active links in IE 10.
   */

  a {
    color: inherit;
    text-decoration: none;
  }

  /**
   * Improve readability when focused and also mouse hovered in all browsers.
   */

  a:active,
  a:hover,
  a:focus {
    outline: 0;
    color: inherit;
  }

  /* ==========================================================================
     Typography
     ========================================================================== */

  // HEADINGS ====================================================

  h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
    margin : 0;
    font-size: 100%;
    font-weight : normal;
    text-rendering : optimizelegibility;
    a {
      text-decoration: none;
    }
  }

  /* ==========================================================================
    Lists
  ========================================================================== */

  /*
   * Addresses margins set differently in IE6/7.
   */

  dl,
  dd,
  menu,
  ol,
  ul {
    list-style: none;
    list-style-image: none;
  }


  /* ==========================================================================
    Embedded content
  ========================================================================== */

  /**
   * Remove border when inside `a` element in IE 8/9.
   */

  img {
    max-width: 100%;
    height: auto;
    -ms-interpolation-mode : bicubic;
  }

  /**
   * Correct overflow displayed oddly in IE 9.
   */

  svg:not(:root) {
    overflow: hidden;
  }

  /* ==========================================================================
     Forms
     ========================================================================== */

  /**
   * Define consistent border, margin, and padding.
   */

  fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
  }

  /**
   * 1. Correct font family not being inherited in all browsers.
   * 2. Correct font size not being inherited in all browsers.
   */

  button,
  input,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 2 */
  }

  /**
   * Address Firefox 4+ setting `line-height` on `input` using `!important` in
   * the UA stylesheet.
   */

  button,
  input {
    line-height: normal;
  }

  /**
   * Address inconsistent `text-transform` inheritance for `button` and `select`.
   * All other form control elements do not inherit `text-transform` values.
   * Correct `button` style inheritance in Chrome, Safari 5+, and IE 8+.
   * Correct `select` style inheritance in Firefox 4+ and Opera.
   */

  button,
  select {
    text-transform: none;
  }

  /**
   * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`
   *    and `video` controls.
   * 3. Improve usability and consistency of cursor style between image-type
   *    `input` and others.
   */

  button,
  html input[type="button"], /* 1 */
  input[type="reset"],
  input[type="submit"],
  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    cursor: pointer; /* 2 */
    box-shadow: none;
  }

  /**
   * Re-set default cursor for disabled elements.
   */

  button[disabled],
  html input[disabled] {
    cursor: default;
  }

  /**
   * Remove inner padding and search cancel button in Safari 5 and Chrome
   * on OS X.
   */

  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration,
  input[type="search"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  /**
   * Remove inner padding and border in Firefox 4+.
   */

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  /**
   * 1. Remove default vertical scrollbar in IE 8/9.
   * 2. Improve readability and alignment  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }in all browsers.
   */

  textarea {

    overflow: auto; /* 1 */
    vertical-align: middle; /* 2 */
  }

  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #app {
    overflow: hidden;
  }

  .main {
    width: 100vw;
    height: calc( 100vh - 70px );
    display: flex;
  }

  .container {
    overflow: auto;
    flex-grow: 1;
    border-color: rgb(230, 230, 230);
  }
</style>
