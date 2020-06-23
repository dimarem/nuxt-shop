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
    country: faker.pickone(['Швейцария', 'Россия', 'Китай', 'Америка', 'Франция', 'Англия']),
    sex: faker.pickone(['мужские', 'женские']),
    mechanism: faker.pickone(['кварцевый', 'механика', 'автоматический', 'механика с автоподзаводом']),
    carcass: faker.pickone(['гипоаллергенная сталь', 'алюминий', 'сталь', 'серебро', 'золото', 'бронза']),
    armlet: faker.pickone(['золото', 'атлас', 'кожа', 'каучук', 'сталь']),
    image: '/images/watches/1.png',
    images: JSON.stringify(['/images/watches/1.png', '/images/watches/2.png'])
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
