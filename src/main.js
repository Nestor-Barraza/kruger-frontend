import { createApp } from "vue";
import App from "./App.vue";
import VueAuth from "@websanova/vue-auth";
import axios from "axios";

const app = createApp(App);

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

app.use(VueAuth, {
  auth: {
    request: function (req, token) {
      this.options.http._setHeaders.call(this, req, {
        Authorization: "Bearer " + token,
      });
    },
    response: function (res) {
      return res.data.token;
    },
  },
  http: axios,
  tokenDefaultKey: "token",
  tokenStore: ["localStorage"],
  loginData: { url: "auth/login", method: "POST", redirect: "/" },
  logoutData: {
    url: "auth/logout",
    method: "POST",
    redirect: "/login",
    makeRequest: true,
  },
  fetchData: { url: "auth/user", method: "GET", enabled: true },
});

app.mount("#app");
