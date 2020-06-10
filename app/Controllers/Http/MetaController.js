'use strict'

const Meta = use('App/Models/Meta')

class MetaController {
  /**
   * Возвращает общую метаинформацию страниц
   * (заголовок страницы, описание и пр.)
   *
   * @returns {array}
   */
  async index () {
    try {
      const meta = await Meta.all()

      return meta
    } catch (e) {
      return []
    }
  }
}

module.exports = MetaController
