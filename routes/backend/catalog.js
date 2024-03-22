const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const fs = require('fs').promises; 
const catalogfile = require('./Data/books.txt');

router.get("/search/:itemName", async (req, res) => {
    try {
        let itemName = req.params.itemName; 
        const items = catalogfile.items;
        let foundItem = null;
        for (const item of Object.values(items)) {
            if (item.Name.toLowerCase() === itemName.toLowerCase()) {
                foundItem = item;
                break;
            }
        }

        if (foundItem) {
            res.status(200).json(foundItem);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/info/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const items = catalogfile.items;
        const foundItem = items[id];

        if (foundItem) {
            res.status(200).json(foundItem);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.patch("/info/:id", async (req, res) => {
    try {
        let id = req.params.id ;
        const items = catalogfile.items;
        const foundItem = items[id];

        if (foundItem) {
            foundItem.stock--;
            await fs.writeFile('./Data/books.txt', JSON.stringify(catalogfile, null, 2));
            
            res.status(200).json(foundItem);
        
        } else {
            res.status(404).send("not found");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router;