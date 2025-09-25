// store/index.js
import { createStore } from 'vuex'; // Import createStore from Vuex

export default createStore({
  state: {
    websocketData: null,
    loading: false, // Add loading state
  },
  mutations: {
    setWebsocketData(state, data) {
      state.websocketData = data;
    },
    setLoading(state, loading) {
      state.loading = loading; // Mutation to set loading state
    },
  },
  actions: {
    updateWebsocketData({ commit }, data) {
      commit('setWebsocketData', data);
    },
    setLoading({ commit }, loading) {
      commit('setLoading', loading); // Action to set loading state
    },
  },
});
