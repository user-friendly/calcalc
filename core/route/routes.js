/**
 * @file
 * Application routes.
 */

'use strict'

// Homepage router.
const index = require('./index')

const notfound = require('./404')
const error = require('../middleware/error')

module.exports = (app) => {
    app.use(index)
    
    // 404 page router is second to last.
    app.use(notfound)
    // Error handlers are always last.
    error(app)
}
