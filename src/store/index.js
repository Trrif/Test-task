import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production"
});

const initModule = ({ name, module }) => {
  if (!store.state[name]) {
    store.registerModule(name, module);
  }
};

export { initModule };
export default store;
