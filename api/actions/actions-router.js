// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req,res) => {
    res.send("Actions")
})

module.exports = router