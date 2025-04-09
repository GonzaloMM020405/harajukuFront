import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state: {
      user: null,
      token: localStorage.getItem('token') || null,
      email: localStorage.getItem('email') || null,
      role: localStorage.getItem('role') || null,
    },
    getters: {
      getUser: (state) => {
        return state.user;
      },
      getToken: (state) => {
        return state.token;
      },
      getUserEmail: (state) => {
        return state.user && state.user.correo && state.user.correo.value ? state.user.correo.value : '';
      },
      getUserRole: (state) => {
        return state.role;
      },
    },
    actions: {
      async initializeStore({ commit }) {
        const token = localStorage.getItem('token');
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const role = localStorage.getItem('role');
        if (token && usuario && role) {
          commit('SET_USER', usuario);
          commit('SET_TOKEN', token);
          commit('SET_ROLE', role);
        } else {
          commit('SET_USER', null);
          commit('SET_TOKEN', null);
          commit('SET_ROLE', null);
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          localStorage.removeItem('role');
        }
      },
      setUser({ commit }, { user, token, role }) {
        commit('SET_USER', user);
        commit('SET_TOKEN', token);
        commit('SET_ROLE', role);
        localStorage.setItem('token', token); 
        localStorage.setItem('usuario', JSON.stringify(user)); 
        localStorage.setItem('role', role); 
      },
      setEmail({ commit }, email) {
        commit('SET_EMAIL', email);
        localStorage.setItem('email', email);
      },
      logout({ commit }) {
        commit('SET_USER', null);
        commit('SET_TOKEN', null);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
      },
    },
    mutations: {
      SET_USER(state, user) {
        state.user = user;
      },
      SET_TOKEN(state, token) {
        state.token = token;
      },
      SET_EMAIL(state, email) {
        state.email = email;
      },
      SET_ROLE(state, role) {
        state.role = role;
      }
    }
  });

export default store;