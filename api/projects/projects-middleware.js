// add middlewares here related to projects
const Projects = require('./projects-model')

function validateProject(req, res, next) {
    if(!req.body.name || !req.body.description){
        res.status(404).end()
        return
    }
    next()
}

module.exports = {
    validateProject
}