/**
 * @file
 * Application entry point.
 */

const fs = require('fs')
const express = require('express')
const https = require('https')
const http = require('http')
const appHttp = express()
const app = express()
const port = 80
const portSsl = 443

const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');

let loader = new TwingLoaderFilesystem('./templates');
let twing = new TwingEnvironment(loader);

app.get('/', (req, res) => {
    twing.render('index.twig', {'name': 'World'}).then((output) => {
        res.end(output);
    })
})

// Redirect all non-secure traffic to HTTPS.
appHttp.all('*', (req, res) => {
    res.redirect(300, `https://localhost:${portSsl}`)
})
http.createServer(appHttp).listen(port, () => {
    console.log(`HTTP server listening on http://localhost:${port}`)
})

// Actual app server is secure.
https.createServer({
  key: fs.readFileSync('./sslcert/calcalc.key'),
  cert: fs.readFileSync('./sslcert/calcalc.crt')
}, app).listen(portSsl, () => {
    console.log(`HTTPS server listening on https://localhost:${portSsl}`)
})
