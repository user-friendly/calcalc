/**
 * @file
 * Index middleware
 */

'use strict'

const IndexController = require('../controller/index')

// Render engine setup.
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing')
const ListParser = require('../ListParser')

let loader = new TwingLoaderFilesystem(__dirname + '/../../templates')
let twing = new TwingEnvironment(loader)

const render = (req, res, next) => {
    if (!['GET', 'POST'].includes(req.method)) {
        res.status(400).send('Bad Request')
    }
    else {
        twing
            .render('index.twig', res.locals.templateContext)
            .then((output) => {
                res.end(output)
            })
    }
}

var index = new IndexController()

module.exports = (router) => {
    router.get('/', index.get)
    router.post('/', index.post)
    router.all('/', render)
}
