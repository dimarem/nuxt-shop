<template>
  <div
    :style="options_styles"
    :class="{'webkit-scrollbar': !is_mobile}"
    class="vue-combobox-options"
  >
    <slot />
  </div>
</template>

<script>
/* eslint-disable vue/prop-name-casing */

export default {
  props: {
    /**
     * Стили меню опций.
     *
     * @example :options-styles="{maxHeight: "300px", top: "100%"}"
     */
    options_styles: {
      type: Object,
      required: true
    }
  },
  computed: {
    /**
     * Если мобильная среда, возвращает true,
     * иначе - false.
     *
     * @returns {boolean}
     */
    is_mobile () {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-combobox-options {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  z-index: 1;
  width: 100%;
  padding: 1.5rem 1rem;
  border-radius: 3px;
  background-color: white;
  box-shadow: 0 2px 6px rgba($color: #000, $alpha: .35);
  overflow: auto;
}

.webkit-scrollbar {
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(220, 220, 220);

    &:hover {
      background-color: rgb(200, 200, 200);
    }
  }
}
</style>
