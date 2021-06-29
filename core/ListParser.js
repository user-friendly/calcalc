/**
 * @file
 * List parser.
 */

'use strict';

module.exports = class ListParser {
    // Regular Expression parser.
    #parser = /(?<quantity>\d+)\s*(?:x\s*(?<multiplier>\d+)\s*)?(?<unit>cal|kj)(?:\s*(?:-|:)\s*)(?<item>[^,;\n]+)/gi
    
    parse(text) {
        var data = []
        var entry = null;
        for (let record of text.matchAll(this.#parser)) {
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
        return data;
    }
}
