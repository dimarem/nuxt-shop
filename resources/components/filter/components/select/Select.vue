<template>
  <div
    ref="select"
    class="vue-select"
  >
    <SelectButton
      :title="title"
      :selected_option_content="selected_option_content"
      :disabled="disabled"
      @click.native="show_options"
    />
    <transition :name="transition_name">
      <SelectOptions
        v-if="options_required"
        :options="options"
        :options_styles="options_styles"
        :selected_option_index="selected_option_index"
        @option-selected="process_selection"
      />
    </transition>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/require-default-prop */
/* eslint-disable curly */

import SelectButton from './components/SelectButton.vue'
import SelectOptions from './components/SelectOptions.vue'

export default {
  components: {
    SelectButton,
    SelectOptions
  },
  model: {
    prop: 'value',
    event: 'select'
  },
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
     * Массив опций.
     *
     * Каждый элемент представляет объект,
     * обязательным атрибутом которого должно
     * быть "value" - значение возвращаемое опцией;
     * необязательным - "content", значение которого
     * будет использоваться для отображения пользователю;
     * если оно не указано, вместо него будет использовано
     * значение артибута "value" (предпологается, что значение
     * атрибута "value" будет уникальным).
     *
     * @example :options="[{value: "option value"}, {value: "option value"}]"
     * @example :options="[{value: "option value", content: "option content"}, {value: "option value", content: "option content"}]"
     */
    options: {
      type: Array,
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
    },
    /**
     * Текущее значение компонента.
     *
     * Используется для создания двусторонней привязки
     * с помощью директивы "v-model" и напрямую использоваться
     * не должно.
     *
     * Должно соответствовать значению атрибута "value"
     * одного из объектов массива "options".
     * Если в процессе создания компонента соответствия
     * не найдено, по-умолчанию, в качестве первоначального
     * значения будет выбрано значение первого элемента
     * массива "options".
     */
    value: {
      required: true
    }
  },
  data () {
    return {
      selected_option_content: null, // содержание выбранной пользователем опции
      selected_option_index: null, // порядковый номер выбранной пользователем опции
      options_styles: null, // стили меню опций
      transition_name: null, // наименование перехода появления меню опций
      options_required: false // индикатор необходимости отображения опций
    }
  },
  /**
   * В данном хуке устанавливается значение
   * кнопки вызова опций на основании значения
   * входного параметра "value".
   *
   * Если начальное значение не соответствует ни одному из
   * значений в массиве опций, будет выбраного значение
   * первого элемента из этого массива и
   * произведено событие "select".
   */
  created () {
    const value = this.value
    const options = this.options

    if (value) {
      for (let i = 0; i < options.length; i++) {
        const option = options[i]

        if (option.value === value) {
          this.selected_option_content = option.content ? option.content : value
          this.selected_option_index = i

          return
        }
      }
    }

    // начальное значение либо не установлено,
    // либо отсутствует в переданных опциях
    this.selected_option_content = options[0].content ? options[0].content : options[0].value
    this.selected_option_index = 0

    this.$emit('select', options[0].value)
  },
  methods: {
    /**
     * Выбирает опцию,
     * производит событие "select".
     *
     * @param {number} index - порядковый номер выбранной опции.
     */
    select_option (index) {
      const option = this.options[index]

      this.selected_option_content = option.content ? option.content : option.value
      this.selected_option_index = index

      this.$emit('select', option.value)
    },
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
    hide_options () {
      this.options_required = false

      document.documentElement.removeEventListener('click', this.hide_options)
    },
    /**
     * Позиционирует меню опций.
     */
    position_options () {
      const docHeight = document.documentElement.clientHeight
      const { bottom } = this.$refs.select.getBoundingClientRect()
      const underSpace = docHeight - bottom
      const ratio = underSpace / docHeight

      if (ratio > 0.33) {
        this.options_styles = {
          maxHeight: `${underSpace * 0.9}px`,
          top: '110%'
        }

        this.transition_name = 'vue-select-options-bottom'
      } else {
        this.options_styles = {
          maxHeight: '50vh',
          bottom: '110%'
        }

        this.transition_name = 'vue-select-options-top'
      }
    },
    /**
     * Обрабатывает выбор опции пользователем.
     *
     * @param {string} index - порядковый номер выбранной пользователем опции.
     * @param {object} e - объект события click.
     */
    process_selection (index, e) {
      e.stopPropagation()

      this.select_option(index)
      this.hide_options()
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-select {
  position: relative;
  min-width: 150px;
  margin: 3px 0;

  &:not(:last-of-type) {
    margin-right: 1rem;
  }
}

.vue-select-options-bottom-enter,
.vue-select-options-bottom-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.vue-select-options-top-enter,
.vue-select-options-top-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.vue-select-options-bottom-enter-active,
.vue-select-options-bottom-leave-active,
.vue-select-options-top-enter-active,
.vue-select-options-top-leave-active {
  transition: .2s ease;
}
</style>
