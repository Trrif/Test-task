<template>
	<ul class="messages">
		<template v-for="message in messages">
			<div
				:key="message.id"
				class="messages__wrapper"
				:class="{ messages__wrapper_deleted: message.status === 'deleted' }"
			>
				<li>
					<div class="messages__item">
						<div class="messages__text">{{ message.text }}</div>
						<button
							@click="websocketHandler(message.id)"
							class="messages__btn"
							:disabled="message.status === 'pending' || !connected"
							:class="{
								messages__btn_pending: message.status === 'pending',
								messages__btn_deleted: message.status === 'deleted'
							}"
						>
							Удалить
						</button>
					</div>
				</li>
			</div>
		</template>
		<div class="messages__wrapper"><div class="messages__btn" @click="refresh">Refresh</div></div>
	</ul>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TheMessages",
  mounted() {
    if (!this.websocket) this.initWebsocket("wss://echo.websocket.org");
  },
  computed: mapState("messages", ["messages", "connected", "websocket"]),
  methods: mapActions("messages", [
    "initWebsocket",
    "websocketHandler",
    "refresh"
  ])
};
</script>

<style lang="scss">
@import "../../scss/mixins/common/layout";
@import "../../scss/mixins/common/buttons";
@import "../../scss/variables/colors";

.messages {
  margin: 0;
  padding-left: 18px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__wrapper {
    @include wrap(4px) padding: 4px;
    transition-property: background, color;
    transition-duration: 0.3s;

    &:not(:first-child) {
      border-top: 2px $primary-color;
    }

    &_deleted {
      color: $font-color-white;
      background-color: $primary-color-dark;
      border-radius: 4px;
    }
  }

  &__btn {
    @include btn-secondary;

    &_pending {
      visibility: hidden;

      &:after {
        @include loader(16px);
        cursor: auto;
        visibility: visible;
        content: " ";
        position: absolute;
        top: -5px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }

    &_deleted {
      visibility: hidden;
    }
  }
}
</style>
