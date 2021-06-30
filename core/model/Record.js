/**
 * @file
 * Record model.
 */

'use strict';

module.exports = class Record {
    // Full name
    #name
    // Display name
    #label
    // Energy, mesured in KiloJoule (1 kj = 1000 j)
    #energy
    // NOTE Only useful for historical/logging purposes.
    // Original measurement unit (cal, kj or j).
    #unitOriginal
    // Number of items
    #quantity
    // Record's entry date
    #date
    
    constructor(name, energy, unit = 'cal', quantity = 1, label = name, date = new Date()) {
        this.#name = name
        this.#label = label
        this.#energy = Number(energy)
        this.#unitOriginal = unit
        this.#quantity = Number(quantity)
        this.#date = date
        
        // TODO Validate unit and do conversion to non-joule energy to joule
        //      energy.
    }
    
    get name() {
        return this.#name
    }
    
    get label() {
        return this.#label
    }
    
    get quantity() {
        return this.#quantity
    }
    
    get energy() {
        return this.#energy
    }
    
    get unitAsEntered() {
        return this.#unitOriginal
    }
    
    get date() {
        return this.#date
    }
    
    toString() {
        return `Record {
    name:     ${this.#name},
    label:    ${this.#label},
    energy:   ${this.#energy},
    unit:     ${this.#unitOriginal},
    quantity: ${this.#quantity},
    date:     ${this.#date}
}`
    }
}
