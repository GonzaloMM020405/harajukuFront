import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state: {
      user: null,
      token: localStorage.getItem('token') || null,
      email: localStorage.getItem('email') || null,
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
    },
    actions: {
      async initializeStore({ commit }) {
        const token = localStorage.getItem('token');
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (token && usuario) {
          // Si el token y usuario existen en localStorage, actualiza el store
          commit('SET_USER', usuario);
          commit('SET_TOKEN', token);          
        } else {
          // Si no hay token o usuario, limpia el store
          commit('SET_USER', null);
          commit('SET_TOKEN', null);
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
        }
      },
      setUser({ commit }, { user, token }) {
        commit('SET_USER', user);
        commit('SET_TOKEN', token);
        localStorage.setItem('token', token); 
        localStorage.setItem('usuario', JSON.stringify(user)); 
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
    }
  });

export default store;