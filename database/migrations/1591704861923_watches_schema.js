'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WatchesSchema extends Schema {
  up () {
    this.create('watches', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('brand').notNullable()
      table.integer('price').notNullable()
      table.string('currency').notNullable()
      table.string('country').notNullable()
      table.string('sex').notNullable()
      table.string('mechanism').notNullable()
      table.string('carcass').notNullable()
      table.string('armlet').notNullable()
      table.string('image')
      table.json('images')
      table.timestamps()
    })
  }

  down () {
    this.drop('watches')
  }
}

module.exports = WatchesSchema
