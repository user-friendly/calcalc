/**
 * @file
 * Application routes.
 */

'use strict'

let index = require('./index')

module.exports = (app) => {
    // Index page router.
    app.use(index)
}
