/* eslint-disable camelcase */
'use strict'

const Watch = use('App/Models/Watch')

class WatchController {
  /**
   * Формирует массив данных с кратким описанием товаров.
   *
   * @returns {object}
   */
  async index () {
    try {
      // массив
      const page_data = await Watch.query().select('id', 'title', 'brand', 'price', 'currency', 'image').paginate(1, 24)

      return { success: true, page_data }
    } catch (error) {
      return { success: false, error }
    }
  }
}

module.exports = WatchController
