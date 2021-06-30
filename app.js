/**
 * @file
 * Application entry point.
 */

'use strict';

const fs = require('fs')
const express = require('express')
const https = require('https')
const http = require('http')
const appHttp = express()
const app = express()
const port = 80
const portSsl = 443
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
const ListParser = require('./core/ListParser')

let loader = new TwingLoaderFilesystem('./templates');
let twing = new TwingEnvironment(loader);

let httpsOptions = {
  key: fs.readFileSync('./sslcert/calcalc.key'),
  cert: fs.readFileSync('./sslcert/calcalc.crt')
}

app.use('/css', express.static('public/css'))
app.use('/images', express.static('public/images'))

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    twing.render('index.twig', {'form_text': ""}).then((output) => {
        res.end(output);
    })
})

app.post('/', (req, res) => {
    let context = {
        form_text:  req.body.text,
        records:    [],
        total:      0
    };
    
    let listParser = new ListParser()
    let tmpRecord = null
    let totalEnergy = 0
    
    for(let record of listParser.parse(req.body.text)) {
        tmpRecord = {
            label:    (record.label.length > 64)
                          ? record.label.substring(0, 61) + '...'
                          : record.label,
            energy:   record.energy,
            quantity: record.quantity
        }
        totalEnergy += tmpRecord.energy * tmpRecord.quantity
        context.records.push(tmpRecord)
    }
    context.total = totalEnergy
    
    twing.render('index.twig', context).then((output) => {
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
https.createServer(httpsOptions, app).listen(portSsl, () => {
    console.log(`HTTPS server listening on https://localhost:${portSsl}`)
})
