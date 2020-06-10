'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MetaSchema extends Schema {
  up () {
    this.create('metas', (table) => {
      table.increments()
      table.string('page')
      table.string('keywords')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('metas')
  }
}

module.exports = MetaSchema
