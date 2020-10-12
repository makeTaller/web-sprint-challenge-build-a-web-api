const express = require("express")
const project = require("../data/helpers/projectModel")
const router = express.Router()

router.get("/", (req, res) => {
    project.get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving the database",
            });
        })
});

router.get("/:id", (req, res) => {
    const id = req.params.id 
    project.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving the database",
            });
        })
});

router.post("/", (req, res) =>{
    const post = req.body
    if( !req.body.name || !req.body.description) {
        return res.status(400).json({ 
            error: " Missing name or description"
        })
    }

    project.insert(post)
            .then((project) => {
                res.status(201).json(project)})
            .catch((error) =>{
                res.status(500).json({
                    error: " Could not connect with database"
                })
            })
})

router.put("/:id", (req,res) =>{

    const id = req.params.id
    if( !req.body.name || !req.body.description) {
        return res.status(400).json({ 
            error: " Missing name or description"
        })
    }

    project.update(id,req.body)
           .then( (project) => {
               res.status(201).json(project)
           })
           .catch( (error) => {
               res.status(500).json({error:" Server error"})
           })
})


module.exports = router