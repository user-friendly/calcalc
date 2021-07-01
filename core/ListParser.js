/**
 * @file
 * List parser.
 */

'use strict';

const Record = require('./model/Record')

module.exports = class ListParser {
    // Regular Expression parser.
    #record = /(?<energy>\d+)\s*(?:x\s*(?<quantity>\d+)\s*)?(?<unit>cal|kj)(?:\s*(?:-|:)?\s*)(?<name>[^,;\n]+)/gi
    // Comments eraser
    #comment = /\/\/.*|\/\*[^*]*\*\//gi
    
    constructor() {
        console.log('ListParser created.')
    }
    
    parse(text) {
        text = text.replace(this.#comment, '')
        var data = []
        for (let entry of text.matchAll(this.#record)) {
            data.push(new Record(
                entry.groups.name,
                entry.groups.energy,
                entry.groups.unit,
                entry.groups.quantity))
        }
        return data;
    }
}
