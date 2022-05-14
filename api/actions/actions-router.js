// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')
const {validateActionId, validateAction} = require('./actions-middlware')

const router = express.Router()

router.get('/', (req,res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
})

router.put('/:id', validateActionId, validateAction, (req, res) => {
    if(req.body.completed == null){
        res.status(400).json({message:"missing required content"})
    } else {
        Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
    }
})

router.delete('/:id', validateActionId, (req,res) => {
    Actions.remove(req.params.id)
    .then(response => {
        res.status(200).json({message: "Action has been deleted"})
    })
})


module.exports = router