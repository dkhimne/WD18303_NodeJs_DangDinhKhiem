const express = require('express');
// const multer = require('multer');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const app = express()
const port = 3019
// var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({ extends: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', './views');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'nodejs_dangdinhkhiem',
})


const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);




//home
app.get("/", (req, res) => {
  let sqlProducts = `SELECT * FROM products`;
  let sqlCatalog = `SELECT * FROM categories`;

  db.query(sqlProducts, (errProducts, productsData) => {
    if (errProducts) throw errProducts;

    db.query(sqlCatalog, (errCatalog, catalogData) => {
      if (errCatalog) throw errCatalog;

      res.render('home.ejs', { catalogs: catalogData, products: productsData });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
})
