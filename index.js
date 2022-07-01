const cors = require('cors');
const express = require('express');
require('dotenv').config
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://todojobmy:xYzx3YhaAXWN4GC8@todoapp1.ftflh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const run = async () => {
    await client.connect();
    try {
      const taskCollection = client.db("ToDoListJob").collection("task");
      const completeCollection = client.db("ToDoListJob").collection("completeTask");
  
      // add task in database
      app.post("/addTask", async (req, res) => {
        const task = req.body;
        const result = await taskCollection.insertOne(task);
        res.send(result);
      });
      // get all task
      app.get("/allTask", async (req, res) => {
        const email = req.query.email;
        const complete = req.query.complete;
        console.log(complete);
        const query = { email: email, complete: false };
        const result = await taskCollection.find(query).toArray();
        res.send(result);
      });
      // update and task
      app.put("/task/:id", async (req, res) => {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updateTask = req.body;
        const updateDoc = {
          $set: updateTask,
        };
        const result = await taskCollection.updateOne(filter, updateDoc, options);
        res.send(result);
      });
  
      // load single task for update
      app.get("/task/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await taskCollection.findOne(query);
        res.send(result);
      });
  
      // complete task method
      app.post("/completeTask", async (req, res) => {
        const completeTask = req.body;
        const result = await completeCollection.insertOne(completeTask);
        res.send(result);
      });
  
      // delete a complete task
      app.put("/task/:_id", async (req, res) => {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updateTask = req.body;
        const updateDoc = {
          $set: updateTask,
        };
        const result = await taskCollection.updateOne(filter, updateDoc, options);
        res.send(result);
      });
  

      // get completed task
      app.get("/completedTask/:id", async (req, res) => {
        const email = req.params.id;
        const query = { email: email, complete: true };
        const result = await taskCollection.find(query).toArray();
        res.send(result);
      });
  
       // delete a complete task
       app.delete("/completedTask/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await taskCollection.deleteOne(query);
        res.send(result);
      });
     
    } finally {
      
    }
  };
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Running To Do List Server');
});

app.listen(port, () => {
    console.log('Listening to port', port);
})