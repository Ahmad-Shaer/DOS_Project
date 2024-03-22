const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const {catalog} = require('../backend/catalog.js')
router.use('/catalog', catalog);
const fs = require('fs').promises; 
const orderfile = require('./Data/orders.txt');

let nOrders = 2 ;

router.get("/info/:id", async (req, res) => {
    try {
        let id = req.params.id ;
        const bookSearch = await fetch('http://localhost:8000/catalog/info/'+id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({'itemName': itemName})
            });
        if(bookSearch){
                res.status(200).json(bookSearch);
        }else{
                res.status(200).json("book your looking for is not available");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



router.post("/purchase/:id", async (req, res) => {
    try {
        let id = req.params.id ;
        const bookUpdate = await fetch('http://localhost:8000/catalog/info/'+id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({'itemName': itemName})
            });
            if (bookUpdate.ok) {
                const bookData = await bookUpdate.json();
    
                const order = {
                    orderNumber: nOrders++,
                    bookName: bookData.Name,
                    price: bookData.cost,
                };
    

                await fs.appendFile('./Data/orders.txt', JSON.stringify(order) + '\n');
    
                res.status(200).json("Purchase successful");
            } else {
                res.status(404).json("Book not found");
            }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;