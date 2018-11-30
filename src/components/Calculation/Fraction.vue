<template>
	<div class="fraction">
		<div
			class="fraction__brace fraction__brace_left"
			:class="{
				fraction__brace_active: fraction.brace === 'left',
				fraction__brace_invisible: fraction.brace === 'right',
				fraction__brace_invalid: invalid.brace
			}"
			v-if="!last"
			@click="toggleBrace({ index: fraction.index, value: 'left' })"
		>
			(
		</div>
		<div class="fraction__numbers">
			<input
				class="fraction__input"
				:class="{ fraction__input_invalid: invalid.numerator }"
				:value="fraction.numerator"
				@input="
					event =>
						onNumberChange({
							event: event,
							prop: 'numerator',
							index: fraction.index
						})
				"
				type="text"
			/>
			<div class="fraction__divider"></div>
			<input
				class="fraction__input"
				:class="{ fraction__input_invalid: invalid.denominator }"
				:value="fraction.denominator"
				@input="
					event =>
						onNumberChange({
							event: event,
							prop: 'denominator',
							index: fraction.index
						})
				"
				type="text"
			/>
		</div>
		<div
			class="fraction__brace fraction__brace_right"
			:class="{
				fraction__brace_active: fraction.brace === 'right',
				fraction__brace_invisible: fraction.brace === 'left',
				fraction__brace_invalid: invalid.brace
			}"
			v-if="fraction.index !== 0"
			@click="toggleBrace({ index: fraction.index, value: 'right' })"
		>
			)
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Fraction",
  props: {
    fraction: {
      type: Object,
      required: true
    },
    last: {
      type: Boolean
    }
  },
  computed: {
    ...mapState("calculation", ["errors"]),
    ...{
      invalid() {
        let invalid = {};
        Object.keys(this.errors).forEach(key => {
          let isInvalid =
            this.errors[key].findIndex(
              error => error === this.fraction.index
            ) !== -1;
          invalid[key] = isInvalid;
        });
        return invalid;
      }
    }
  },
  methods: mapActions("calculation", ["onNumberChange", "toggleBrace"])
};
</script>

<style lang="scss">
@import "../../scss/mixins/calculation";
@import "../../scss/variables/colors";

.fraction {
  display: flex;
  align-items: center;
  position: relative;

  &__input {
    @include input-calculation;
  }

  &__brace {
    position: absolute;
    cursor: pointer;
    font-size: 40px;
    opacity: 0.3;
    width: 15px;
    transition-property: opacity, color;
    transition-duration: 0.3s;

    &_left {
      left: -22px;
    }

    &_right {
      right: -22px;
    }

    &_active {
      opacity: 1;
    }

    &_invalid {
      color: $error;
    }

    &_invisible {
      opacity: 0.1;
      color: $primary-color;

      &:hover {
        opacity: 0.3;
      }
    }
  }

  &__divider {
    @include divider-calculation;
  }
}
</style>
