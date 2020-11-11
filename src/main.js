import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { auth } from "./firebase";
import Toasted from "vue-toasted";
import UserDataService from "./services/UserDataService";

Vue.config.productionTip = false;
Vue.use(Toasted, { duration: 1000 });
let app;
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
  if (user) {
    UserDataService.fetchUserProfile(user);
  }
});
