<template>
  <div id="app">
  <div class="site__header">
    <div class="site__header-wrapper">
      <SearchBar></SearchBar>
    </div>
  </div>

  <router-view></router-view>

  <Player></Player>

  <SVGSprites></SVGSprites>
</div>
</template>

<script>
import Player from "./components/Player.vue";
import SearchBar from "./components/SearchBar.vue";
import SVGSprites from "./components/SVGSprites.vue";

import router from "./router";

export default {
  name: "app",
  router,
  components: {
    Player,
    SVGSprites,
    SearchBar
  }
};
</script>

<style lang="scss">
@import "variables.scss";

body {
  margin: 0;
  background-color: $white;
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Open Sans, Ubuntu, Fira Sans, Helvetica Neue, sans-serif;
  color: $black;
  -webkit-font-smoothing: antialiased;
}

p {
  margin-top: 0;
}

button {
  font-family: inherit;
}

.screen-reader-text {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  width: 1px;
  word-wrap: normal !important;
}

.site__header {
  background-color: $black;
  padding: 1rem;
  color: $white;
  box-shadow: 0 -5px 10px 0 rgba(42, 45, 66, 0.5);
}

.site__header-wrapper {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.page--wrap {
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  padding: 2rem;
}

.svg {
  display: block;
  color: $white;
}
</style>
