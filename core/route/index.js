/**
 * @file
 * Index router.
 */

'use strict';

const express = require('express')
const router = express.Router()
const index = require('../middleware/index')

index(router)

module.exports = router
