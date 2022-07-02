const express = require('express');
const cors = require('cors');
require('dotenv').config
const port = process.env.PORT || 5000

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// todojobmy
// xYzx3YhaAXWN4GC8


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://todojobmy:xYzx3YhaAXWN4GC8@todoapp1.ftflh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
//   console.log(collection)
  client.close();
});

app.get('/', (req, res) => {
    res.send('Running To Do List Server');
});

app.listen(port, () => {
    console.log('Listening to port', port);
})