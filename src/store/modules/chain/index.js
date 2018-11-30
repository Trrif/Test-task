import { websocket } from "../mixins";

const state = {
  ...websocket.state,
  data: [
    { index: 0, data: "aaa", status: "stored", timeoutId: null },
    { index: 1, data: "aaa", status: "stored", timeoutId: null },
    { index: 2, data: "aaa", status: "stored", timeoutId: null },
    { index: 3, data: "aaa", status: "stored", timeoutId: null },
    { index: 4, data: "aaa", status: "stored", timeoutId: null }
  ],
  responseData: [],
  nextIndex: 0
};

const actions = {
  initWebsocket({ commit, dispatch }, url) {
    commit("initWebsocket", {
      url,
      onopen: () => {
        commit("setConnected");
      },
      onmessage: evt => {
        let { index, data } = JSON.parse(evt.data);
        dispatch("setData", {
          index,
          payload: { status: "success", response: data }
        });
        dispatch("loadData", { index, response: data });
      }
    });
  },
  websocketHandler({ commit }, data) {
    commit("sendWebsocket", JSON.stringify(data));
  },
  setData({ commit }, { index, payload }) {
    commit("setData", { index, payload });
  },
  refresh({ commit }) {
    commit("refresh");
  },
  loadData({ commit, state }, { index, response }) {
    let nextIndex = state.nextIndex;

    if (nextIndex == index && state.data[nextIndex].status !== "complete") {
      commit("pushResponseData", { index, response });
      commit("setData", { index, payload: { status: "complete" } });

      nextIndex = state.nextIndex;
      while (
        state.data[nextIndex] &&
        state.data[nextIndex].status === "success"
      ) {
        commit("pushResponseData", {
          index: nextIndex,
          response: state.data[nextIndex].response
        });
        commit("setData", {
          index: nextIndex,
          payload: { status: "complete" }
        });
        nextIndex = state.nextIndex;
      }
    }
  }
};
const mutations = {
  ...websocket.mutations,
  pushResponseData(state, { index, response }) {
    state.responseData.push({ index, response });
    state.nextIndex += 1;
  },
  setData(state, { index, payload }) {
    if (payload.status === "success") clearTimeout(state.data[index].timeoutId);
    state.data[index] = {
      ...state.data[index],
      ...payload
    };
  },
  refresh(state) {
    state.responseData = [];
    state.data = [
      { index: 0, data: "aaa", status: "stored", timeoutId: null },
      { index: 1, data: "aaa", status: "stored", timeoutId: null },
      { index: 2, data: "aaa", status: "stored", timeoutId: null },
      { index: 3, data: "aaa", status: "stored", timeoutId: null },
      { index: 4, data: "aaa", status: "stored", timeoutId: null }
    ];
    state.nextIndex = 0;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
