const express = require('express');
const router = express.Router();
const {catalog} = require('../backend/catalog.js')

router.get("/search/:itemName", async (req, res) => {
    try {
        let itemName = req.params.itemName ;

        // read the file and search for the item if found decrease the number of stocks in file and return true otherwise return false  
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



router.post("/purchase/:id", async (req, res) => {
    try {
        // add the purchase info the file 
        
        res.status(200).send("Data updated");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;