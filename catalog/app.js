const express = require('express');
const app = express();
const { connectDatabase } = require('./dbconnection');
app.use(express.json());


app.get("/search/:topic", async (req, res) => {
    try {
        let topic = req.params.topic;
        const db = await connectDatabase();
        // Read the books that has topic *topic*
        const rows = await db.all("SELECT * FROM books WHERE topic LIKE ?", ['%' + topic + '%']); 

        // if there are data in the result
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).send("No items found matching the search criteria");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/info/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const db = await connectDatabase();

        // get data of specific id
        const row = await db.get("SELECT * FROM books WHERE id = ?", id);
        if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).send("Item not found");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.patch("/info/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let cost = req.body.cost;
        let stock = req.body.stock; // can be +1 -1
        const db = await connectDatabase();


        // first we need to ensure that the book is already exist
        const existingItem = await db.get("SELECT * FROM books WHERE id = ?", id);
        if (!existingItem) {
            res.status(404).send("Item not found");
            return;
        }

        // initialize update query
        let updateQuery = "UPDATE books SET ";
        let params = [];

        // if the cost provided with body
        if (cost !== undefined) {
            updateQuery += "cost = ?, ";
            params.push(cost);
        }

        // if the stock provided with body
        if (stock !== undefined) {
            updateQuery += "stock = stock + ?, ";
            params.push(stock);
        }
        updateQuery = updateQuery.slice(0, -2); // elimnate the ", " at the end of update query
        updateQuery += " WHERE id = ?"; 
        params.push(id);

        await db.run(updateQuery, params); // instead of db.run(updateQuery, stock, cost, id) because cost and stock not always provided

        const updatedItem = await db.get("SELECT * FROM books WHERE id = ?", id); // now we get info of updated book

        res.status(200).json(updatedItem); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



// Liseining for requests
app.listen('4000', () => {
    console.log("Catalog Server is up.");
});