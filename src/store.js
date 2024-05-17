import { createStore } from "vuex";
import api from "./services/apiClient";

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
    editUserModalOpen: false,
    selectedUser: null,
  },
  mutations: {
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setUser(state, user) {
      state.user = user;
    },
    setEditUserModalOpen(state, isOpen) {
      state.editUserModalOpen = isOpen;
    },
    setSelectedUser(state, user) {
      state.selectedUser = user;
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
    async openEditModal({ commit }, IDNumber) {
      try {
        const response = await api.get("/users/get-user", {
          params: {
            "id-number": IDNumber,
          },
        });
        const user = response.data;
        commit("setSelectedUser", user);
        commit("setEditUserModalOpen", true);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
  },
});
