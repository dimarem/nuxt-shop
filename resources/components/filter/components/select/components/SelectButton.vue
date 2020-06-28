<template>
  <button
    :class="{disabled}"
    class="vue-select-button"
  >
    <span class="vue-select-title">{{ title }}:</span>
    <transition name="vue-select-button-content" mode="out-in">
      <span
        :key="selected_option_content"
        class="vue-select-button-content"
      >{{ selected_option_content }}</span>
    </transition>
  </button>
</template>

<script>
/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/prop-name-casing */

export default {
  props: {
    /**
     * Заголовок select.
     *
     * @example title="some title"
     */
    title: {
      type: String,
      required: true
    },
    /**
     * Содержание выбранной пользователем опции.
     */
    selected_option_content: {
      type: String,
      required: false
    },
    /**
     * Индикатор активности компонента.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-select-button {
  cursor: pointer;
  position: relative;
  width: 100%;
  padding-right: 1.5rem !important;
  padding-left: .5rem;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: .875rem;
  text-align: left;
  background-color: transparent;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: .5rem;
    border-top: 6px solid rgb(150, 150, 150);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    transform: translateY(-50%);
    transition: .3s;
  }

  &:hover::after {
    border-top-color: black;
    }
  }

.vue-select-title, .vue-select-button-content {
  display: inline-block;
  text-transform: uppercase;
}

.vue-select-title {
  margin-right: 5px;
  font-family: $bold;
}

.vue-select-button-content {
  color: rgb(200, 200, 200);
  transition: .3s;
}

.vue-select-button-content-enter {
  transform: translateY(-100%);
}

.vue-select-button-content-leave-to {
  transform: translateY(100%);
}

.vue-select-button-content-enter-active,
.vue-select-button-content-leave-active {
  transition: .2s;
}

.disabled::after {
  border-top-color: rgb(200, 200, 200);
}

.disabled:hover::after {
  border-top-color: rgb(200, 200, 200) !important;
}

.disabled .vue-select-button-content {
  color: rgb(200, 200, 200);
}
</style>
