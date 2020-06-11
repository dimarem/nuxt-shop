/* eslint-disable arrow-parens */

import axios from 'axios'

export const state = () => ({
  /**
   * Массив содержащий метаинформацию по страницам.
   *
   * @example [{id: 1, page: 'watches', title: '...', keywords: '...', content: '...'}]
   */
  meta: [],
  /**
   * В данном массиве содержиться информация
   * ранее посещенных страниц (до 50).
   *
   * @example [{url: '/some/url', page_data: '{...}'}]
   */
  cache: []
})

export const getters = {
  /**
   * Проверяет наличие ранее сохраненной
   * информации в кеше.
   *
   * @param {string} url - url проверяемой страницы.
   * @returns {object}
   */
  in_cache: state => url => {
    const index = state.cache.findIndex(item => item.url === url)

    return {
      cached: index !== -1,
      index
    }
  },
  /**
   * Извлекает данные из кеша.
   *
   * @param {number} index - порядковый номер элемента в кеше.
   */
  get_from_cache: state => index => {
    return state.cache[index]
  }
}

export const mutations = {
  /**
   * Сохраняет общие метаданные сайта.
   */
  set_meta (state, meta) {
    state.meta = meta
  },
  /**
   * Сохраняет данные в кеше,
   * сокращая размер массива до 50 элементов
   * при необходимости.
   *
   * @param {object} data - данные для сохранения ({url: '...', data: page_data})
   */
  save_in_cache (state, data) {
    const cache = state.cache

    if (cache.length >= 50) {
      cache.shift()
    }

    state.cache.push(data)
  }
}

export const actions = {
  /**
   * Запрашивает и возвращает метаданные сайта
   * до рендеринга страниц.
   */
  async nuxtServerInit ({ commit }) {
    try {
      const meta = await axios.get(`${process.env.baseUrl}/api/meta`).then(({ data }) => data)

      commit('set_meta', meta)
    } catch (e) {
      commit('set_meta', [])
    }
  }
}
