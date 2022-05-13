// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')

const middleware = require('./projects-middleware')

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

module.exports = router;
