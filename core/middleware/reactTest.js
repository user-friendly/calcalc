/**
 * @file
 * React Tic-Tac-Toe middleware
 */

'use strict'

// Render engine setup.
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing')

let loader = new TwingLoaderFilesystem(__dirname + '/../../templates')
let twing = new TwingEnvironment(loader)

const render = (req, res, next) => {
    if (!['GET', 'POST'].includes(req.method)) {
        res.status(400).send('Bad Request')
    }
    else {
        if (!res.locals.templateContext) {
            res.locals.templateContext = {}
        }
        if (process.env.NODE_ENV === 'development') {
            res.locals.templateContext.debug = true
        }
        
        twing
            .render('react-test.twig', res.locals.templateContext)
            .then((output) => {
                res.end(output)
            })
    }
}

module.exports = (router) => {
    router.get('/react/test', render)
}
