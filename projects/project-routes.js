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

module.exports = router