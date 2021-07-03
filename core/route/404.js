/**
 * @file
 * Not found router.
 */

'use strict';

const express = require('express')
const router = express.Router()

// Render engine setup.
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing')

let loader = new TwingLoaderFilesystem(__dirname + '/../../templates')
let twing = new TwingEnvironment(loader)

const render = (req, res, next) => {
    if (!res.locals.templateContext) {
        res.locals.templateContext = {}
    }
    
    if (process.env.NODE_ENV === 'development') {
        res.locals.templateContext.debug = true
    }
    
    twing
        .render('404.twig', res.locals.templateContext)
        .then((output) => {
            res
                .status(404)
                .end(output)
        })
}

router.use(render)

module.exports = router