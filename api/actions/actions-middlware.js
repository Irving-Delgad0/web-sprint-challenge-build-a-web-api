// add middlewares here related to actions
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

function validateActionId(req, res, next) {
    Actions.get(req.params.id)
    .then(action => {
        if(action) {
            req.action = action
            next()
        } else {
            res.status(404).json({message: "Actions not found"})
        }
    })
}

function validateAction(req, res, next) {
    Projects.get(req.body.project_id)
    .then(project => {
        if(!project){
            res.status(400).json({message: "Missing required content"})
            return
        }
    })

    if(!req.body.notes || !req.body.description || !req.body.project_id){
        res.status(400).end()
        return
    }
    next()
}

module.exports = {
    validateActionId,
    validateAction
}
