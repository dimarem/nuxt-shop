'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/Watch', (faker) => {
  return {
    title: faker.pickone(['Heritage 1969', 'Rose Gold', 'Dark Silver', 'White Silver', 'Dark 2014', 'Opaque Fog', 'Navy Blue', 'Titan']),
    brand: faker.pickone(['Ambassador', 'Armin Strom', 'Arnold & Son', 'Blancpain', 'Bell & Ross', 'Bovet', 'Boucheron', 'Cecil purnell']),
    price: faker.floating({ min: 500, max: 2000 }),
    currency: 'USD',
    image: '/images/watch.png'
  }
})

Factory.blueprint('App/Models/Meta', (faker) => {
  return {
    page: 'watches',
    page_title: 'Купить наручные часы недорого',
    page_keywords: 'часы наручные, купить часы наручные недорого',
    page_description: 'У нас вы можете купить недорого наручные часы на любой вкус'
  }
})
