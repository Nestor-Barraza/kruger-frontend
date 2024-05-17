import { createStore } from "vuex";

function decodeJWT(token) {
  if (!token) {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));

  return {
    header: header,
    payload: payload,
  };
}

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, token) {
      localStorage.setItem("vue-auth-token", token);
      const decodedToken = decodeJWT(token);
      if (decodedToken) {
        const user = decodedToken.payload.user;

        commit("setUser", user);
        commit("setAuthentication", true);
      }
    },
    logout({ commit }) {
      localStorage.removeItem("vue-auth-token");
      commit("setUser", null);
      commit("setAuthentication", false);
    },
    checkAuthentication({ commit }) {
      const token = localStorage.getItem("vue-auth-token");
      if (token) {
        const decodedToken = decodeJWT(token);
        if (decodedToken) {
          const user = decodedToken.payload.user;
          commit("setUser", user);
          commit("setAuthentication", true);
        } else {
          commit("setUser", null);
          commit("setAuthentication", false);
        }
      } else {
        commit("setUser", null);
        commit("setAuthentication", false);
      }
    },
  },
});
