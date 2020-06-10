'use strict'

/*
|--------------------------------------------------------------------------
| MetaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class MetaSeeder {
  async run () {
    await Factory.model('App/Models/Meta').create()
  }
}

module.exports = MetaSeeder
