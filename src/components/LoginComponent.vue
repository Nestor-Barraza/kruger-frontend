<template>
  <div class="login-wrap">
    <div class="login">
      <h2 class="login-title">Login</h2>
      <v-text-field
        v-model="email"
        label="Email"
        placeholder="Email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :type="'password'"
        label="Password"
        placeholder="Password"
        required
      >
        <template v-slot:append>
        </template>
      </v-text-field>
      <v-btn color="primary" block large @click="handleLogin">Log in</v-btn>
    </div>
  </div>
</template>

<script>
import api from '../services/apiClient';


export default {
  data() {
    return {
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await api.post('/auth/login', {
          email: this.email,
          password: this.password,
        });
         this.$store.dispatch('login', response.data.token);
         this.$router.push('/');
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600,300);

.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login {
  width: 300px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.v-btn {
  margin-top: 20px;
}
</style>