const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./orders.db'); 
const app = express();

// The code for creating the database
/*
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        orderNumber INTEGER PRIMARY KEY AUTOINCREMENT,
        bookID INTEGER,
        price INTEGER
    )`);
*/

// Function to insert new order
async function insertOrder(bookID, price) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO orders (bookID, price) VALUES (?, ?)', [bookID, price], function(err) {
            if (err) {
                reject(new Error('Failed to store the purchase record')); 
            } else {
                resolve(true);
            }
        });
    });
}



app.post('/purchase/:id', async (req, res) => {

    let isValidPurchase = false;
    let book;
    let responseMsg;

    // code to check availability
    try {
        
        const id = req.params.id;
        book = await axios.get('http://catalog:4000/info/'+id);
        
        if(book.data) {
            if(book.data.stock > 0) {
                isValidPurchase = true;

                // Send query to decrement stock of the book
                await axios.patch('http://catalog:4000/info/'+id, {stock: -1});


            }else {
                responseMsg = "The book is not available anymore, Out of stock.";
            }
        }else{
            responseMsg = "The given book id is invalid";
        }
    }catch {
        res.status(500).send("Failed to purchase, please try again");
    }
    

    if(isValidPurchase) {
        let inserted = await insertOrder(req.params.id, book.data.cost);
        if(inserted) {
            res.status(200).send('Book has been purchased succesfully');
        }
    }else {
        res.status(500).send(responseMsg);
    }

});


// Liseining for requests
app.listen('2000', () => {
    console.log("Order Server is up.");
});


