<template>
  <v-app-bar app fixed color="white" elevate-on-scroll>
    <v-container>
      <v-toolbar-title>
        <a href="#" class="brand">Brand</a>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn text href="#">Home</v-btn>
        <v-btn text href="#">Page A</v-btn>
        <v-btn text href="#">Page B</v-btn>
        <v-btn text href="#">Page C</v-btn>
        <v-btn text href="#">Page D</v-btn>
      </v-toolbar-items>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list>
      <v-list-item href="#">
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item href="#">
        <v-list-item-title>Page A</v-list-item-title>
      </v-list-item>
      <v-list-item href="#">
        <v-list-item-title>Page B</v-list-item-title>
      </v-list-item>
      <v-list-item href="#">
        <v-list-item-title>Page C</v-list-item-title>
      </v-list-item>
      <v-list-item href="#">
        <v-list-item-title>Page D</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped>
.brand {
  text-transform: uppercase;
  font-weight: 800;
  font-size: 20px;
  color: #333;
  text-decoration: none;
}
</style>