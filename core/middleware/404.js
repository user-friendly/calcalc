/**
 * @file
 * Not found middleware
 */

'use strict'

// Render engine setup.
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing')

let loader = new TwingLoaderFilesystem(__dirname + '/../../templates')
let twing = new TwingEnvironment(loader)

const render = (req, res, next) => {
    twing
        .render('404.twig', res.locals.templateContext)
        .then((output) => {
            res
                .status(404)
                .end(output)
        })
}

module.exports = (router) => {
    router.use(render)
}
