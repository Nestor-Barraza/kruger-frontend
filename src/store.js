import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    login({ commit }) {
      commit("setAuthentication", true);
    },
    logout({ commit }) {
      commit("setAuthentication", false);
    },
    checkAuthentication({ commit }) {
      const token = localStorage.getItem("vue-auth-token");
      if (token) {
        commit("setAuthentication", true);
      } else {
        commit("setAuthentication", false);
      }
    },
  },
});
