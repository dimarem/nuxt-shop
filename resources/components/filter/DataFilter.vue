<template>
  <div
    v-if="filter_settings"
    class="data-filter"
  >
    <Select
      v-if="sex_options.length"
      v-model="sex"
      title="Пол"
      :options="sex_options"
    />
    <Select
      v-if="mechanism_options.length"
      v-model="mechanism"
      title="Тип механизма"
      :options="mechanism_options"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable curly */
/* eslint-disable vue/prop-name-casing */

import { mapState, mapMutations } from 'vuex'
import Select from './components/select/Select.vue'

export default {
  components: {
    Select
  },
  props: {
    /**
     * Объект содержащий начальное
     * состояние фильтра.
     */
    filter_state: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    /**
     * Базовый url, по которму будет
     * совершен переход при выборе опции фильтра.
     *
     * @example base="/example"
     */
    base: {
      type: String,
      required: true
    }
  },
  data () {
    const { sex, mechanism } = this.filter_state

    return {
      sex: sex || 'все',
      mechanism: mechanism || 'все'
    }
  },
  computed: {
    ...mapState(['filter_settings']),
    /**
     * Формирует массив опций для
     * выбора пола.
     *
     * @returns {array}
     */
    sex_options () {
      const sex_options = []

      if (this.filter_settings.sex && this.filter_settings.sex.length) {
        sex_options.push({ value: 'все' })

        this.filter_settings.sex.forEach((item) => {
          sex_options.push({ value: item.sex })
        })
      }

      return sex_options
    },
    /**
     * Формирует массив опций для
     * выбора типа механизма часов.
     *
     * @returns {array}
     */
    mechanism_options () {
      const mechanism_options = []

      if (this.filter_settings.mechanisms && this.filter_settings.mechanisms.length) {
        mechanism_options.push({ value: 'все' })

        this.filter_settings.mechanisms.forEach((item) => {
          mechanism_options.push({ value: item.mechanism })
        })
      }

      return mechanism_options
    }
  },
  watch: {
    sex () {
      const search_params_object = this.create_search_params_object()

      this.$router.push({ path: this.base, query: search_params_object })
    },
    mechanism () {
      const search_params_object = this.create_search_params_object()

      this.$router.push({ path: this.base, query: search_params_object })
    }
  },
  methods: {
    ...mapMutations(['save_filter_state', 'save_search_params']),
    /**
     * Создает объект с поисковыми аргументами.
     * Сохраняет данные состояния этого компонента
     * и объект с поисковыми параметрами в хранилище.
     *
     * @returns {object}
     * @example {foo: 1, bar: 2}
     */
    create_search_params_object () {
      const search_params_object = {}

      if (this.sex !== 'все') {
        search_params_object.sex = this.sex
      }

      if (this.mechanism !== 'все') {
        search_params_object.mechanism = this.mechanism
      }

      // сохраним данные в хранилище
      this.save_filter_state({ sex: this.sex, mechanism: this.mechanism })
      this.save_search_params(search_params_object)

      return search_params_object
    }
  }
}
</script>

<style lang="scss">
.data-filter {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  max-width: 1000px;
  margin: auto;
  padding: 2rem 0;
}
</style>
