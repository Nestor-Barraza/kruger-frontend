import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import VueAuth from "vue-auth";
import api from "./services/apiClient";

loadFonts();

const app = createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueAuth, {
    auth: {
      request(req, token) {
        req.headers.Authorization = `Bearer ${token}`;
        return req;
      },
      response(res) {
        return res.data.token;
      },
    },
    http: api,
    router: router,
    tokenStore: ["localStorage"],
  });

app.mount("#app");
