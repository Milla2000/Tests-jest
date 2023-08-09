const {v4} = require('uuid')
const mssql = require ('mssql');
const { sqlConfig } = require('../Config/config');
// const express = require("express");
// const app = express();


// const projects = [];

class Project{
    constructor(id, project_name, project_location, description, startdate, enddate){
        this.id = id,
        this.project_name = project_name,
        this.project_location = project_location,
        this.description = description,
        this.startdate = startdate,
        this.enddate = enddate
    }
}

const createProject = async(req, res)=>{
    console.log("started");
    try {
        const id = v4()
        // console.log(req.body);

        const {project_name, description, project_location, startdate, enddate} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){

        const result = await pool.request()
        .input('id', mssql.VarChar, id)
        .input('project_name', mssql.VarChar, project_name)
        .input('description', mssql.VarChar, description)
        .input('project_location', mssql.VarChar, project_location)
        .input('startdate', mssql.Date, startdate)
        .input('enddate', mssql.Date, enddate)
        .execute('createProjectPROC')



        if(result.rowsAffected == 1){
        return res.json({
            message: "Project created Successfully",
        })  
        }else{
            return res.json({message: "Creation failed"})
        }   
    }
    } catch (error) {
        return res.json({error})
    }
}

const getProjects = async(req, res)=>{
    try {
        const pool = await (mssql.connect(sqlConfig))

        const allproject = (await pool.request().execute('getAllProjects')).recordset

        res.json({projects: allproject})
    } catch (error) {
        return res.json({error})
    }
}

const getOneProject = async(req, res)=>{
    try {
        const {id} = req.params

        const pool = await mssql.connect(sqlConfig)

        const project = (await pool.request().input('id', id).execute('getOneProject')).recordset

        return res.json({
            project: project
        })
    } catch (error) {
        return res.json({error})
    }
}

const updateProject = async(req, res)=>{
    try {
        const {id} = req.params

        const {project_name, description, project_location, startdate, enddate} = req.body

        const pool = await mssql.connect(sqlConfig)

        const result = (await pool.request()
        .input('id', mssql.VarChar, id)
        .input('project_name', mssql.VarChar, project_name)
        .input('description', mssql.VarChar, description)
        .input('project_location', mssql.VarChar, project_location)
        .input('startdate', mssql.Date, startdate)
        .input('enddate', mssql.Date, enddate)

        .execute('updateProject'));

        // console.log(result);

        if(result.rowsAffected == 1){
            res.json({
                message: 'project updated successfully'
            })
        }else{
            res.json({
                message: 'project not found'
            })
        }
    } catch (error) {
        return res.json({Error: error})
    }
}

const deleteProject = async (req, res)=>{
    try {
       const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('id', id)
        .execute('deleteProject')
      
        if(result.rowsAffected == 1){
            res.json({
                    message: 'Project deleted successfully'
            })
        }else{
            res.json({
                message: 'Project not found'
        })
        }
    } catch (error) {
        return res.json({Error: error})
    }
}

module.exports ={
    createProject,
    getProjects,
    getOneProject,
    updateProject,
    deleteProject
}