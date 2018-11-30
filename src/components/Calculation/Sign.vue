<template>
	<input
		@input="
			event =>
				onSignChange({
					event: event,
					prop: 'sign',
					index: calculationPart.index
				})
		"
		:value="calculationPart.sign"
		class="sign"
		:class="{ sign_invalid: invalid }"
		type="text"
	/>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Sign",
  props: {
    calculationPart: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState("calculation", ["errors"]),
    ...{
      invalid() {
        return (
          this.errors.sign.findIndex(
            error => error === this.calculationPart.index
          ) !== -1
        );
      }
    }
  },
  methods: mapActions("calculation", ["onSignChange"])
};
</script>

<style lang="scss">
@import "../../scss/mixins/calculation";

.sign {
  @include input-calculation;
}
</style>
