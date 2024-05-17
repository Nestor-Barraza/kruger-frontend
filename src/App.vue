<template>
  <v-app>
    <v-main>
      <div class="div-blur">
        <TopBar v-if="isAuthenticated"/>
        <router-view></router-view>
        <StarAnimation/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import StarAnimation from './components/StarAnimation.vue';
import TopBar from './components/TopBar.vue';
import { mapState } from 'vuex';
export default {
  name: 'App',
  components: {
    StarAnimation,
    TopBar
  },
  computed: {
      ...mapState(['isAuthenticated'])
  }
}
</script>

<style>
.v-main {
  background: url('https://r4.wallpaperflare.com/wallpaper/561/315/641/blueprint-kerbal-program-rocket-wallpaper-8866bc0a3fdc97d9ced069e252998ba0.jpg');
  background-size: cover;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.div-blur {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background: #34495eba;
  padding-top: 7em;
}
</style>