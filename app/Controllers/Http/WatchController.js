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
      const watches = await Watch.query().select('id', 'title', 'brand', 'price', 'currency', 'image').fetch()

      return { success: true, watches }
    } catch (error) {
      return { success: false, error }
    }
  }
}

module.exports = WatchController
