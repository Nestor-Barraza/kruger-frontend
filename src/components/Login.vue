<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import api from '../services/apiClient';

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await api.post('/auth/login', {
          email: this.email,
          password: this.password
        });
        
        localStorage.setItem('token', response.data.token);
        
        this.$router.push('/');
      } catch (error) {
        alert('Credenciales inválidas');
      }
    }
  }
}
</script>