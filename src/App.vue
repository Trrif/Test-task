<template>
	<div id="app" class="app">
		<div class="app__wrapper">
			<div class="navigation">
				<router-link
					tag="button"
					active-class="navigation__link_active"
					class="navigation__link"
					to="/"
					exact
					>Calculation</router-link
				>
				<router-link
					tag="button"
					active-class="navigation__link_active"
					class="navigation__link"
					to="/chain"
					exact
					>Chain</router-link
				>
				<router-link
					tag="button"
					active-class="navigation__link_active"
					class="navigation__link"
					to="/messages"
					exact
					>Messages</router-link
				>
			</div>
		</div>
		<div class="app__wrapper">
			<div class="view"><router-view> </router-view></div>
		</div>
	</div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "scss/mixins/common/layout";
@import "scss/mixins/common/buttons";
@import "scss/variables/colors";

.app {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  color: $font-color-black;

  &__wrapper {
    max-width: 480px;
    width: 100%;

    &:not(:first-child) {
      margin-top: 8px;
    }
  }
}
.view {
  border: 2px solid $primary-color;
  border-radius: 4px;
  height: 100%;
  padding: 16px;
}

.navigation {
  display: flex;

  &__link {
    @include btn-primary;
    margin: 0 4px;
    width: 100%;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
