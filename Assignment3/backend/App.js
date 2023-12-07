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

main().catch(console.error)
;
async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

app.post("/addProduct", async(req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const id = values[0];
  const title = values[1];
  const price = values[2];
  const description = values[3];
  const category = values[4];
  const image = values[5];
  const rating = values[6];

  const newProduct = {
  "id" : id,
  "title" :title,
  "price" : price,
  "description":description,
  "category" : category,
  "image" : image,
  "rating": rating
  }
  console.log(newProduct);
  const results = await db.collection("products").insertOne(newProduct);
  res.status(200);
  res.send(results);
});

app.get("/getProducts", async(req, res) => {
  await client.connect();
  console.log("getting all");
  const results = await db
  .collection("products").find({}).toArray();
  res.status(200);
  res.send(results);
});


app.get("/getProducts/:id", async(req, res) => {
  const productID = Number(req.params.id);
  await client.connect();
  console.log("getting by id: " + productID);

  const results = await db
  .collection("products").find({"id": productID}).toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.delete("/deleteProduct/:id", async (req, res) => {
  await client.connect();
  const productId = Number(req.params.id);
  var query = {"id": productId};
  console.log(productId);

  let results = await db
  .collection("products").find({"id": productId}).toArray();
  console.log(results);

   results = await db.collection("products").deleteOne(query);
  console.log(results);

  res.status(200);
  res.send(results);
  });



  app.put("/updateProduct/:id/:price", async(req, res) => {
    await client.connect();
    const productId = Number(req.params.id);
    const newPrice = Number(req.params.price)

    var query = {"id":productId};
    var newvalues = { $set: {"price":newPrice} };
    const results = await db.collection("products").updateOne(query, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });   
    res.status(200);
    res.send(results);
  });