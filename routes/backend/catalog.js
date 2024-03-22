const express = require('express');
const router = express.Router();


router.get("/search/:itemName", async (req, res) => {
    try {
        let itemName = req.params.itemName; 

        
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/info/:id", async (req, res) => {
    try {
        let id = req.params.id;

       
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router;