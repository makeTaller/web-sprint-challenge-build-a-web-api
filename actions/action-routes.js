const express = require("express")
const action = require("../data/helpers/actionModel")


const router = express.Router()


router.get("/", (req, res) => {
    action.get()
        .then(action => {
            res.status(200).json(action);
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
    action.get(id)
        .then(action => {
            res.status(200).json(action);
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

    action.insert(post)
            .then((action) => {
                res.status(200).json(action)})
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

    action.update(id,req.body)
           .then( (action) => {
               res.status(200).jsonaction()
           })
           .catch( (error) => {
               res.status(500).json({error:" Server error"})
           })
})

router.delete("/:id", (req,res) =>{
    action.remove(req.params.id)
    .then((action) => {
        res.status(200).jsonaction()
    })
    .catch((error) => {
        res.status(404).json({error:"Couldn't"})
    })
})

module.exports = router