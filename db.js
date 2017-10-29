const mongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId;

mongoClient.connect("mongodb://localhost/crud-node", (err, conn) =>{
  if (err) console.log(err);
  global.db = conn;
})

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

module.exports = { saveCustomer, findCustomers, findCustomer, updateCustomer, deleteCustomer }