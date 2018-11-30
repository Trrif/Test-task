<template>
	<div class="chain">
		<template v-for="item in responseData">
			<div :key="item.index" class="chain__wrapper">
				<div class="chain__item">{{ item.index }} {{ item.response }}</div>
			</div>
		</template>
		<button
			class="chain__wrapper chain__btn"
			@click="sendData(data, websocketHandler, timeout)"
			:disabled="!connected"
		>
			Send Data to websockets
		</button>
		<button class="chain__wrapper chain__btn" @click="sendData(data, randomHandler, timeout)">
			Send Data to random handler
		</button>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TheChain",
  props: {
    timeout: {
      type: Number,
      default: 1000
    }
  },
  mounted() {
    if (!this.websocket) this.initWebsocket("wss://echo.websocket.org");
  },
  computed: mapState("chain", [
    "data",
    "responseData",
    "connected",
    "websocket"
  ]),
  methods: {
    ...mapActions("chain", [
      "setData",
      "loadData",
      "refresh",
      "initWebsocket",
      "websocketHandler"
    ]),
    ...{
      sendData(data, handler, timeout) {
        this.refresh();
        data.forEach((item, i) => {
          this.setData({
            index: item.index,
            payload: {
              status: "pending",
              timeoutId: setTimeout(() => {
                this.setData({
                  index: item.index,
                  payload: { status: "failed", response: "failed" }
                });
                this.loadData({ index: item.index, response: "failed" + i });
              }, timeout)
            }
          });

          handler(item);
        });
      },

      randomHandler(item) {
        setTimeout(() => {
          this.setData({
            index: item.index,
            payload: { status: "success", response: "random" + item.index }
          });
          this.loadData({ index: item.index, response: "random" + item.index });
        }, Math.random() * 1000);
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/mixins/common/layout";
@import "../../scss/mixins/common/buttons";

.chain {
  &__wrapper {
    @include wrap(8px);
  }

  &__item {
    font-weight: 600;
    font-size: 24px;
  }

  &__btn {
    @include btn-secondary;
  }
}
</style>
