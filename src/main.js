import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import store from "./store";

loadFonts();
store.dispatch("checkAuthentication");
const app = createApp(App).use(store).use(router).use(vuetify);

app.mount("#app");
