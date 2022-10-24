import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const baseURL = 'https://jsonplaceholder.typicode.com/users';
export default new Vuex.Store({
  state: {
    item: null,
  },
  getters: {},
  mutations: {
    CURRENT_ITEM(state, payload) {
      state.item = payload;
    },
  },
  actions: {
    async getCurrentTask({ commit }, payload) {
      console.log('🚀 ~ file: index.js ~ line 19 ~ getCurrentTask ~ payload', payload);
      //   state.item = null;
      await axios
        .get(`${baseURL}/${payload.id}`)
        .then((res) => {
          commit('CURRENT_ITEM', res.data);

          console.log('SUCCESS from get current task!!');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
