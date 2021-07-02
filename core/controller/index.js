/**
 * @file
 * Index controller.
 */

'use strict'

const ListParser = require('../ListParser')

let listParser = new ListParser()

// FIXME Remove example.
//class ControllerError extends Error {}

class IndexController {
    constructor() {
        console.log("IndexController created.")
    }
    
    get(req, res, next) {
        // FIXME Remove example.
        // throw new ControllerError('Index controller hic-up!')
        
        res.locals.templateContext = {'form_text': ""}
        next()
    }
    
    post(req, res, next) {
        let context = {
            form_text:  req.body.text,
            records:    [],
            total:      0
        };
        
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
        
        res.locals.templateContext = context
        next()
    }
}

module.exports = IndexController;
