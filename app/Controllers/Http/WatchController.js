/* eslint-disable camelcase */
'use strict'

const Watch = use('App/Models/Watch')

class WatchController {
  /**
   * Формирует массив данных с кратким описанием товаров.
   *
   * @returns {object}
   */
  async index ({ request }) {
    const page = request.input('page')

    try {
      // массив
      const page_data = await Watch.query().select('id', 'title', 'brand', 'price', 'currency', 'image').orderBy('price').paginate(page, 18)

      return { success: true, page_data }
    } catch (error) {
      return { success: false, error }
    }
  }

  /**
   * Формирует описание часов.
   *
   * @returns {object}
   */
  async show ({ params }) {
    const id = params.id

    try {
      // массив
      const page_data = await Watch.query().where('id', id).fetch()

      return { success: true, page_data }
    } catch (error) {
      return { success: false, error }
    }
  }
}

module.exports = WatchController
