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

module.exports = router;
