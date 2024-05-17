<template>
  <v-app-bar app fixed color="white" elevate-on-scroll>
    <v-container class="d-flex align-center">
      <v-toolbar-title>
        <a href="#" class="brand">Kruger</a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-sm-flex align-center">
        <v-btn color="primary" v-if="isAuthenticated">
          {{ user.firstName }} {{ user.lastName }} ({{ user.role }})
            <v-icon right>mdi-chevron-down</v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item @click="signOut">
                <v-list-item-title>Sign Out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
        <v-btn text href="/login" v-else>Login</v-btn>
      </div>
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = !drawer"></v-app-bar-nav-icon>
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
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    user() {
      return this.$store.state.user;
    },
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