<template>
  <div>
    <PaginationButton
      :class="{ 'pagination-button-hidden': unfolded }"
      @click.native="unfolded = true"
    />
    <transition name="blur-layer">
      <BlurLayer
        v-if="unfolded"
        @click.native="unfolded = false"
      />
    </transition>
    <Pagination
      :current_page="current_page"
      :number_of_pages="number_of_pages"
      :max_links="max_links"
      :base="base"
      :class="{ 'pagination-hidden': !unfolded }"
    />
  </div>
</template>

<script>
/* eslint-disable vue/prop-name-casing */
/* eslint-disable vue/require-default-prop */

import Pagination from './components/pagination/Pagination.vue'
import BlurLayer from './components/BlurLayer.vue'
import PaginationButton from './components/PaginationButton.vue'

export default {
  components: {
    Pagination,
    BlurLayer,
    PaginationButton
  },
  props: {
    /**
     * Порядковый номер текущей страницы.
     *
     * @example :current_page="1"
     */
    current_page: {
      type: [Number, String],
      required: false,
      default: 1
    },
    /**
     * Общее количество страниц.
     *
     * @example :number_of_pages="25"
     */
    number_of_pages: {
      type: Number,
      required: true
    },
    /**
     * Базовый url.
     *
     * @example base="/example"
     */
    base: {
      type: String,
      required: true
    },
    /**
     * Объект содержащий поисковые параметры.
     *
     * @example :search="{ param_1: value, param_2: value }"
     */
    search: {
      type: Object,
      required: false
    },
    /**
     * Максимальное количество
     * отображаемых ссылок.
     *
     * @example :max_links="5"
     */
    max_links: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data () {
    return {
      unfolded: false
    }
  }
}
</script>

<style lang="scss">
.pagination-hidden {
  transform: translateY(100%);
}

.pagination-button-hidden {
  transform: translate(-50%, 200%) !important;
}

.blur-layer-enter, .blur-layer-leave-to {
  opacity: 0;
}

.blur-layer-enter-active, .blur-layer-leave-active {
  transition: .3s;
}
</style>
