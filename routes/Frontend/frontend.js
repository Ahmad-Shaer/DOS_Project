const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const {catalog} = require('../backend/catalog.js')
const {order}= require('../backend/order.js')
router.use('/catalog', catalog);
router.use('/order', order);

router.get("/search/:itemName", async (req, res) => {
    try {
        let itemName = req.params.itemName ;

        const bookSearch = await fetch('http://localhost:8000/catalog/search/'+itemName, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({'itemName': itemName})
            });

        if(bookSearch.ok){
            res.status(200).json(bookSearch);
        }else{
            res.status(404).json("book your looking for is not available");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/info/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const bookSearch = await fetch('http://localhost:8000/catalog/info/'+id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({'itemName': itemName})
            });

        if(bookSearch.ok){
            res.status(200).json(bookSearch);
        }else{
            res.status(404).json("book your looking for is not available");
        }
       
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/purchase/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const bookPurchase = await fetch('http://localhost:8000/order/purchase/'+id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({'itemName': itemName})
        });
        if(bookPurchase.ok){
            res.status(200).send("purchase was successfull");
        }else{
            res.status(404).send("book not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;