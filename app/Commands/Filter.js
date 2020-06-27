/* eslint-disable camelcase */
'use strict'

const Watch = use('App/Models/Watch')
const Database = use('Database')
const Helpers = use('Helpers')
const { Command } = require('@adonisjs/ace')

class Filter extends Command {
  static get signature () {
    return 'make:filter'
  }

  static get description () {
    return 'This command creates filter settings'
  }

  async handle (args, options) {
    try {
      const contries = await Watch.query().distinct('country').fetch()
      const sex = await Watch.query().distinct('sex').fetch()
      const mechanisms = await Watch.query().distinct('mechanism').fetch()
      const carcasses = await Watch.query().distinct('carcass').fetch()
      const armlets = await Watch.query().distinct('armlet').fetch()

      const result = JSON.stringify({ contries, sex, mechanisms, carcasses, armlets })

      const filter_path = Helpers.resourcesPath('static/filter/filter.json')

      await this.writeFile(filter_path, result)

      this.completed('create', filter_path)
    } catch (e) {
      this.error(`Error: ${e.message}`)
    } finally {
      Database.close()
    }
  }
}

module.exports = Filter
