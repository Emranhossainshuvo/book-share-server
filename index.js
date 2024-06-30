const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


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
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("hello world")
})


app.listen(port, () => {
    console.log(`This server is running on port ${port}`)
})