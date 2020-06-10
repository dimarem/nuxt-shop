import axios from 'axios'

export const state = () => ({
  /**
   * В дальнейшем массив содержащий,
   * метаинформацию по страницам (ключевые слова,
   * описание и пр.)
   */
  meta: null
})

export const mutations = {
  /**
   * Сохраняет общие метаданные сайта.
   */
  set_meta (state, meta) {
    state.meta = meta
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
