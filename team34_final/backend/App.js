var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
var mongodb = require('mongodb');
const uri =
"mongodb+srv://philipk:7EwTM0DwxWI1xNAd@coms363.c2vkqro.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = client.db("coms319");

app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

async function main() {

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);

  } catch (e) {
    console.error(e);
  } finally {
    //wait client.close();
  }
}

main().catch(console.error);
async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

app.get("/getUsers", async(req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const results = await db
  .collection("users").find({}).toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});
app.post("/checkPass", async(req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const userName = values[0];
  const results = await db.collection("users").find({'userName' : userName}).toArray();
  res.status(200);
  res.send(results);
});

app.post("/addUser",async(req,res)=>{
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const userName = values[0];
  const password = values[1];
  const newUser = {
    "userName" : userName,
    "password" : password
  }
  const results = await db.collection("users").insertOne(newUser);
  res.status(200);
  res.send(results);

});

app.post("/createProject",async(req,res)=>{
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const name = values[0];
  const notes = values[1];
  const userName = values[2];

  const newProject = {
    "name" : name,
    "notes" : notes,
    "userName" : userName
  }
  const results = await db.collection("projects").insertOne(newProject);
  res.status(200);
  res.send(results);

});
app.post("/getProjects", async(req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const name = values[0];
  const results = await db.collection("projects").find({'userName' : name}).toArray();
  //console.log(results);
  res.status(200);
  res.send(results);
});

app.delete("/deleteProject", async (req, res) => {
  await client.connect();
  // const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = values[0]; // id
  console.log("project to delete :","new ObjectId('" + id + "')");
  const query =  { _id : new mongodb.ObjectId(id) };
  let results = await db.collection("projects").find(query).toArray();
console.log(results);
   results = await db.collection("projects").deleteOne(query);
  res.status(200);
  res.send(results);
  });




