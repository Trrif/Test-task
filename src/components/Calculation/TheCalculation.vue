<template>
	<div class="calculation">
		<div class="calculation__parts">
			<template v-for="item in calculation">
				<fraction
					v-if="item.type === 'fraction'"
					class="calculation__part"
					:key="item.index"
					:last="item.index === calculation.length - 1"
					:fraction="item"
				/>
				<sign class="calculation__part" :key="item.index" :calculation-part="item" v-else />
			</template>
			<result :result="result" />
		</div>
		<div class="calculation__buttons">
			<button class="calculation__btn" @click="addCalculationPart">Add fraction</button>
			<button class="calculation__btn" @click="refresh">Refresh</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Fraction from "./Fraction";
import Sign from "./Sign";
import Result from "./Result";

export default {
  name: "TheCalculation",
  components: {
    Fraction,
    Sign,
    Result
  },
  computed: mapState("calculation", ["result", "calculation"]),
  methods: mapActions("calculation", ["addCalculationPart", "refresh"])
};
</script>

<style lang="scss">
@import "../../scss/mixins/common/layout.scss";
@import "../../scss/mixins/common/buttons.scss";

.calculation {
  &__parts {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &__part {
    margin: 4px 15px;
  }

  &__buttons {
    display: flex;
    width: 100%;
    margin-top: 10px;
  }

  &__btn {
    @include btn-secondary;
    margin: 0 4px;
  }
}
</style>
