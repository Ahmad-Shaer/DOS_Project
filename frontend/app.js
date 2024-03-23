const express = require('express');
const app = express();
const axios = require('axios');

app.get("/search/:topic", async (req, res) => {
    try {
        let topic = req.params.topic;
       
        const books = await axios.get("http://catalog:4000/search/" + encodeURIComponent(topic));

        if(books.data){
            res.status(200).json(books.data);
        }else{
            res.status(400).json("There is no books associated with this topic.");
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get("/info/:id", async (req, res) => {
    try {
     

        let id = req.params.id;
        const book = await axios.get("http://catalog:4000/info/" + id);


        if(book.data){
            res.status(200).json(book.data);
        }else{
            res.status(400).json("The provided ID is invalid.");
        }
       
    } catch (error) {
        res.status(500).send(error.response.data);
    }
});

app.post("/purchase/:id", async (req, res) => {
    try {
        
        let id = req.params.id;
        const response = await axios.post("http://order:2000/purchase/" + id);

        if(response.data){
            res.status(200).json(response.data);
        }else{
            res.status(400).json("Failed to purchase, please make sure of the given book ID");
        }
       
    } catch (error) {
    
        res.status(500).send(error.response.data);
    }
});



// Liseining for requests
app.listen('8000', () => {
    console.log("Frontend Server is up.");
});
