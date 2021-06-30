/**
 * @file
 * User model.
 */

'use strict';

module.export = class User {
    #username
    #email
    // User creation date (Unix timestamp)
    #created
    // User modified date (Unix timestamp)
    #modified
    // The last time the user was active/logged in
    #lastLogin
    
    constructor() {
        throw "TODO Implement"
    }
}
