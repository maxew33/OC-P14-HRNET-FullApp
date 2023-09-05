const express = require('express')

const router = express.Router()

const staffCtrl = require('../controllers/employees')

router.post('/', staffCtrl.createEmployee)

router.get('/', staffCtrl.viewEmployees)

module.exports = router