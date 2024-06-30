const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bookswap:tSUAAp9crFUwHsVH@cluster0.0fn8ke9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {

    const bookCollection = client.db('bookswap').collection('allbooks');
    const usersCollection = client.db('bookswap').collection('users'); 


    app.post("/books",  async(req, res) => {
        const book = req.body; 
        const result = await bookCollection.insertOne(book)
        res.send(result)
    })

    app.post("/users",  async(req, res) => {
        const user = req.body; 
        const result = await usersCollection.insertOne(user)
        res.send(result)
    })

    app.get("/books", async(req, res)=> {
        const result = await bookCollection.find().toArray();
        res.send(result);
    })

    app.get("/users", async(req, res)=> {
        const result = await usersCollection.find().toArray();
        res.send(result);
    })

    app.get("/", (req, res) => {
        res.send("hello world")
    })
    try {
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);





app.listen(port, () => {
    console.log(`This server is running on port ${port}`)
})