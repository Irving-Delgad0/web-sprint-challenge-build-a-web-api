// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')

const {validateProject, validateProjectId} = require('./projects-middleware')

const router = express.Router();

router.get('/', (req,res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "error retrieving projects"})
    })
})

router.get('/:id', validateProjectId, (req,res) => {
    res.json(req.project)
})

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(200).json(project)
    })
})

router.put('/:id', validateProjectId, validateProject, (req,res) =>{
    if(req.body.completed == null){
        res.status(400).json({message: "Missing required content"})
    } else {
        Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
    }
})


router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(response => {
        res.status(200).json({message: "Project has been deleted"})
    })
})

router.get('/:id/actions', validateProjectId, (req,res) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
})

module.exports = router
