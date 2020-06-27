<template>
  <button
    :class="{disabled}"
    class="vue-combobox-button"
  >
    {{ combobox_button_content }}
  </button>
</template>

<script>
/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/prop-name-casing */

export default {
  props: {
    /**
     * Содержание кнопки комбобокса.
     *
     * @example :combobox_button_content="some content"
     */
    combobox_button_content: {
      type: String,
      required: false
    },
    /**
     * Индикатор активности компонента.
     *
     * @example :disabled="true"
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
.vue-combobox-button {
  cursor: pointer;
  position: relative;
  width: 100%;
  padding-right: 1.5rem !important;
  padding-left: .5rem;
  border: none;
  outline: none;
  font-family: inherit;
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

.disabled::after {
  border-top-color: rgb(200, 200, 200);
}

.disabled:hover::after {
  border-top-color: rgb(200, 200, 200) !important;
}

.disabled {
  color: rgb(200, 200, 200);
}
</style>
