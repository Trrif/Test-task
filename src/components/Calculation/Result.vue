<template>
	<div class="result">
		<div class="result__number">{{ result.numerator }}</div>
		<div class="result__divider"></div>
		<div class="result__number">{{ result.denominator }}</div>
	</div>
</template>
<script>
export default {
  name: "Result",
  props: {
    result: {
      type: Object
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/mixins/calculation";
@import "../../scss/variables/colors";

.result {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 8px;
  margin-left: 35px;
  margin-right: 0;
  color: $primary-color;

  &::before {
    position: absolute;
    content: "=";
    font-size: 36px;
    left: -30px;
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__number {
    font-weight: 600;
    font-size: 24px;
  }

  &__divider {
    @include divider-calculation;
  }
}
</style>
