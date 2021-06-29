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
        form_text: req.body.text,
        data: [],
    };
    
    let parser = /(?<quantity>\d+)\s*(?:x\s*(?<multiplier>\d+)\s*)?(?<unit>cal|kj)(?:\s*(?:-|:)\s*)(?<item>[^,;\n]+)/gi
    
    let data = []
    
    var entry = null;
    for (let record of req.body.text.matchAll(parser)) {
        entry = {
            label:          record.groups.item,
            displayLabel:   record.groups.item,
            quantity:       Number(record.groups.quantity),
            multiplier:     Number(record.groups.multiplier ?? 1),
            unit:           record.groups.unit
        }
        
        if (entry.displayLabel.length > 64) {
            entry.displayLabel = entry.displayLabel.substring(0, 61)
            entry.displayLabel += '...'
        }
        
        data.push(entry)
    }
    
    context.data = data
    
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
https.createServer({
  key: fs.readFileSync('./sslcert/calcalc.key'),
  cert: fs.readFileSync('./sslcert/calcalc.crt')
}, app).listen(portSsl, () => {
    console.log(`HTTPS server listening on https://localhost:${portSsl}`)
})
