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
