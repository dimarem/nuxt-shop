'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.group(() => {
  Route.get('/meta', 'MetaController.index')
  Route.get('/watches', 'WatchController.index')
  Route.get('/description/:id', 'WatchController.show')
}).prefix('api')

Route.any('*', 'NuxtController.render')
