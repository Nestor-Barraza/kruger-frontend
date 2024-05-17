<template>
  <v-app-bar app fixed color="white" elevate-on-scroll>
    <v-container>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
        <a href="#" class="brand">Brand</a>
      </v-toolbar-title>
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn text href="#">Home</v-btn>
        <v-btn text @click="signOut">Sign Out</v-btn>
      </v-toolbar-items>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    signOut() {
      localStorage.removeItem('vue-auth-token');
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
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