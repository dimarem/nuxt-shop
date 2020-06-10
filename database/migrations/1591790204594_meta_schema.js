'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MetaSchema extends Schema {
  up () {
    this.create('metas', (table) => {
      table.increments()
      table.string('page')
      table.string('page_title')
      table.string('page_keywords')
      table.string('page_description')
      table.timestamps()
    })
  }

  down () {
    this.drop('metas')
  }
}

module.exports = MetaSchema
