<template>
  <div
    ref="combobox"
    class="vue-combobox"
  >
    <div
      v-if="title"
      class="vue-combobox-caption"
    >
      {{ title }}
    </div>
    <ComboboxButton
      :combobox_button_content="combobox_button_content"
      :disabled="disabled"
      @click.native="show_options"
    />
    <transition :name="transition_name">
      <OptionsBlock
        v-if="options_required"
        :options_styles="options_styles"
        @click.native.stop
      >
        <slot />
      </OptionsBlock>
    </transition>
  </div>
</template>

<script>
/* eslint-disable vue/prop-name-casing */
/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/require-default-prop */
/* eslint-disable curly */

import ComboboxButton from './components/ComboboxButton.vue'
import OptionsBlock from './components/OptionsBlock.vue'

export default {
  components: {
    ComboboxButton,
    OptionsBlock
  },
  props: {
    /**
     * Заголовок комбобокса.
     *
     * @example title="some title"
     */
    title: {
      type: String,
      required: false
    },
    /**
     * Содержимое кнопки комбобокса.
     *
     * @example combobox_button_content="some content"
     */
    combobox_button_content: {
      type: String,
      required: true
    },
    /**
     * Индикатор активности компонента.
     *
     * @example :disabled="false"
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      transition_name: null, // наименование перехода появления меню опций
      options_required: false // индикатор необходимости отображения опций
    }
  },
  methods: {
    /**
     * Отображает опции.
     */
    show_options () {
      if (this.disabled || this.options_required) return

      this.position_options()

      this.options_required = true

      setTimeout(() => {
        document.documentElement.addEventListener('click', this.hide_options)
      }, 0)
    },
    /**
     * Скрывает опции.
     */
    hide_options (e) {
      this.options_required = false

      document.documentElement.removeEventListener('click', this.hide_options)
    },
    /**
     * Позиционирует меню опций.
     */
    position_options () {
      const docHeight = document.documentElement.clientHeight
      const { bottom } = this.$refs.combobox.getBoundingClientRect()
      const underSpace = docHeight - bottom
      const ratio = underSpace / docHeight

      if (ratio > 0.33) {
        this.options_styles = {
          maxHeight: `${underSpace * 0.9}px`,
          top: '110%'
        }

        this.transition_name = 'vue-combobox-bottom'
      } else {
        this.options_styles = {
          maxHeight: '50vh',
          bottom: '110%'
        }

        this.transition_name = 'vue-combobox-top'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-combobox {
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: .5rem;
  }
}

.vue-combobox-caption {
  margin-bottom: .5rem;
  padding: 0 .5rem;
  font-size: .8rem;
  color: rgb(150, 150, 150);
}

.vue-combobox-bottom-enter,
.vue-combobox-bottom-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.vue-combobox-top-enter,
.vue-combobox-top-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.vue-combobox-bottom-enter-active,
.vue-combobox-bottom-leave-active,
.vue-combobox-top-enter-active,
.vue-combobox-top-leave-active {
  transition: .2s ease;
}
</style>
