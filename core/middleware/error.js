/**
 * @file
 * Applcation error handler.
 */

'use strict'

module.exports = (app) => {
    app.use((err, req, res, next) => {
        if (res.headersSent) {
            return next(err)
        }
        
        if (err.stack) {
            console.error(err.stack)
        } else {
            console.error(err)
        }
        
        res.status(500)
        res.end(`Error 500: Internal server error`)
    })
}
