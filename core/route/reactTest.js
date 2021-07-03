/**
 * @file
 * React router.
 */

'use strict';

const express = require('express')
const router = express.Router()
const reactTest = require('../middleware/reactTest')

reactTest(router)

module.exports = router
