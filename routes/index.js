var express = require('express');
var router = express.Router();
const db = require("../db")

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Cadastro', link: 1 });
});

router.get('/listar/', (req, res, next) => {
  db.findCustomers((docs) => {
    res.render('listar', { title: 'Listar', link: 2,  customers: docs });
  })
});

router.get('/pesquisar/', (req, res, next) => {
  if (req.query.nome){
    const regex = new RegExp(escapeRegExp(req.query.nome), 'gi');
    const Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.find({ nome: { $in: regex } }, function (e, docs) {
      res.render('pesquisar', { title: 'Resultado', link: 3, results: true, search: req.query.nome, customers: docs });
    });
  }else{
    res.render('pesquisar', { title: 'Pesquisar', link: 3, results: false});
  }
});

router.get('/editar/:id', (req, res, next) => {
  const id = req.params.id
  db.findCustomer(id, (err, docs) => {
    if (err) console.log(err);
    res.render('editar', { title: 'Editar', link: 3,  customer: docs[0] });
  })
});

router.post('/atualizar/:id', (req, res, next) => {
  const id = req.params.id
  const nome = req.body.nome
  const email = req.body.email
  const idade = parseInt(req.body.idade)
  db.updateCustomer(id, nome, email, idade, (err, result) =>{
    if (err) console.log(err);
    res.redirect("/listar/")
  })
});

router.post('/excluir/:id', (req, res, next) => {
  const id = req.params.id
  db.deleteCustomer(id, (err, result) =>{
    if (err) console.log(err);
    res.redirect("/listar/")
  })
});

router.post('/cadastrar/', (req, res) => {
  const nome = req.body.nome
  const email = req.body.email
  const idade = parseInt(req.body.idade)
  db.saveCustomer(nome, email, idade, () =>{
    res.redirect("/listar/")
  })
});

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = router;
