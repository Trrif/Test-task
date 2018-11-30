import { websocket } from "../mixins";

const state = {
  ...websocket.state,
  messages: [
    {
      text: "Тестовый коммент 1",
      id: 0,
      status: "passive"
    },
    {
      text: "Это шедевр",
      id: 4,
      status: "passive"
    },
    {
      text: "Это прекрасно",
      id: 6,
      status: "passive"
    },
    {
      text: "Лучшее, что я видел",
      id: 5,
      status: "passive"
    },
    {
      text: "Два чая этому автору",
      id: 8,
      status: "passive"
    }
  ]
};

const getters = {
  findIndexById: state => id => {
    return state.messages.findIndex(message => message.id == id);
  }
};

const actions = {
  initWebsocket({ commit, dispatch }, url) {
    commit("initWebsocket", {
      url,
      onopen: () => {
        commit("setConnected");
      },
      onmessage: evt => {
        let id = evt.data;

        dispatch("delete", id);
      }
    });
  },
  websocketHandler({ commit, getters }, id) {
    let index = getters.findIndexById(id);

    commit("setStatus", { index, status: "pending" });
    commit("sendWebsocket", id);
  },
  delete({ commit, getters }, id) {
    let index = getters.findIndexById(id);
    commit("setStatus", { index, status: "deleted" });
    setTimeout(() => {
      commit("deleteMessage", index);
    }, 200);
  },
  refresh({ commit }) {
    commit("refresh");
  }
};

const mutations = {
  ...websocket.mutations,
  deleteMessage(state, index) {
    state.messages.splice(index, 1);
  },
  setStatus(state, { index, status }) {
    state.messages[index].status = status;
  },
  refresh(state) {
    state.messages = [
      {
        text: "Тестовый коммент 1",
        id: 0,
        status: "passive"
      },
      {
        text: "Это шедевр",
        id: 4,
        status: "passive"
      },
      {
        text: "Это прекрасно",
        id: 6,
        status: "passive"
      },
      {
        text: "Лучшее, что я видел",
        id: 5,
        status: "passive"
      },
      {
        text: "Два чая этому автору",
        id: 8,
        status: "passive"
      }
    ];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
