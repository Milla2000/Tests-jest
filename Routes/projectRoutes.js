const {Router} = require('express');
const { createProject, getProjects, getOneProject, updateProject, deleteProject } = require('../Controllers/projectsController');
const { verifyToken } = require('../Middleware/verifyToken');

const projectrouter = Router();

projectrouter.post('/',verifyToken, createProject);
projectrouter.get('/', getProjects);
projectrouter.get('/:id', getOneProject);
projectrouter.put('/:id',verifyToken, updateProject);
projectrouter.delete('/:id', deleteProject);

module.exports = {
    projectrouter
}