/**
 * @file
 * Arango Driver.
 */

'use strict';

const { Database, aql } = require("arangojs");

const db = new Database();
const Pokemons = db.collection("my-pokemons");

module.exports = class Arango {
    #dbName = 'calcalc'
    
    #db = null
    
    constructor(dbName = '') {
        if (!dbName) {
            this.#dbName = dbName
        }
        
        this.#db = new Database();
    }
}
