/**
 * @file
 * Not found router.
 */

'use strict';

const express = require('express')
const router = express.Router()
const notfound = require('../middleware/404')

notfound(router)

module.exports = router