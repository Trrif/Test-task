const websocket = {
  state: {
    websocket: null,
    connected: false
  },

  mutations: {
    setConnected(state) {
      state.connected = true;
    },
    initWebsocket(state, { url, onmessage, onopen }) {
      state.websocket = new WebSocket(url);
      state.websocket.onopen = onopen;
      state.websocket.onmessage = onmessage;
    },
    sendWebsocket(state, data) {
      state.websocket.send(data);
    }
  }
};

export { websocket };
