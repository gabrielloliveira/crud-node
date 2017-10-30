const mongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId;
const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/crud-node', {
  useMongoClient: true,
});

mongoClient.connect("mongodb://localhost/crud-node", (err, conn) =>{
  if (err) console.log(err);
  global.db = conn;
})

const customerSchema = new mongoose.Schema({
    nome: String,
    email: String,
    idade: Number
}, { collection: 'customers' }
);

function saveCustomer(nome, email, idade, callback) {
  global.db.collection("customers").insert(
    {
      "nome": nome,
      "email": email,
      "idade": idade
    }, (err, result) =>{
      if (err) console.log(err);
      callback();
    })
}

function findCustomers(callback) {
  global.db.collection("customers").find().toArray((err, docs) =>{
    if (err) console.log(err);
    callback(docs);
  })
}

function findCustomer(id, callback){  
  global.db.collection("customers").find(new ObjectId(id)).toArray(callback)
}

function updateCustomer(id, nome, email, idade, callback){
  global.db.collection("customers").updateOne(
    {_id:new ObjectId(id)}, 
    { nome, email, idade}, 
    callback);
}
  
function deleteCustomer(id, callback){
  global.db.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { saveCustomer, 
  findCustomers, 
  findCustomer, 
  updateCustomer, 
  deleteCustomer,
  Mongoose: mongoose, 
  CustomerSchema: customerSchema }