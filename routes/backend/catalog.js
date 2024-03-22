const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const fs = require('fs').promises; 
const catalogfile = require('./Data/books.txt');

router.get("/search/:topic", async (req, res) => {
    try {
        let topic = req.params.topic; 
        const items = catalogfile.items;
        let foundItems = [];

        for (const item of Object.values(items)) {
            if (item.topic.toLowerCase().includes(topic.toLowerCase())) {
                foundItems.push(item);
            }
        }

        if (foundItems.length > 0) {
            res.status(200).json(foundItems);
        } else {
            res.status(404).send("No items found matching the search criteria");
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
        let id = req.params.id;
        let cost = req.body.cost;
        let stock = req.body.stock;
        const items = catalogfile.items;
        const foundItem = items[id];

        if (foundItem) {
            if (stock == 1) foundItem.stock++;
            else if (stock == 2) foundItem.stock--;
            if (cost > 0) foundItem.cost = cost;
            await fs.writeFile('./Data/books.txt', JSON.stringify(catalogfile, null, 2));

            res.status(200).json(foundItem);
        } else {
            res.status(404).send("Item not found");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});




module.exports = router;