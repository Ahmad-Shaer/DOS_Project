const express = require('express');
const router = express.Router();
const {catalog} = require('../backend/catalog.js')
router.use('/catalog', catalog);
const orderfile = require('./Data/orders.txt');
router.get("/info/:id", async (req, res) => {
    try {
        let id = req.params.id ;
        
        // read the file and search for the item if found decrease the number of stocks in file and return true otherwise return false  
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/info/:id", async (req, res) => {
    try {
        let id = req.params.id ;

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