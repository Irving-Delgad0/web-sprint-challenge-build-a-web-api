// add middlewares here related to projects
const Projects = require('./projects-model')

function validateProject(req, res, next) {
    if(!req.body.name || !req.body.description){
        res.status(400).end()
        return
    }
    next()
}

function validateProjectId(req,res,next) {
    Projects.get(req.params.id)
    .then(project => {
        if(project){
            req.project = project
            next()
        } else {
            res.status(404).json({message: "Project not found"})
            return
        }
    })
}

module.exports = {
    validateProject,
    validateProjectId
}