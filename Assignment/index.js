const express = require('express');
const multer = require('multer');
const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'nodejs_dangdinhkhiem',
})

const bodyParser = require('body-parser');
const app = express()
const port = 3019
// var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({ extends: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', ['./views/client', './views/admin']);



//---------------admin--------------------
app.get("/home", (req, res) => {
  res.render('home.ejs');
})


app.get("/listSp", (req, res) => {
  let sqlProducts = `SELECT * FROM products`;
  let sqlCatalog = `SELECT * FROM categories`;

  db.query(sqlProducts, (errProducts, productsData) => {
    if (errProducts) throw errProducts;

    db.query(sqlCatalog, (errCatalog, catalogData) => {
      if (errCatalog) throw errCatalog;

      res.render('listsp.ejs', { categories: catalogData, products: productsData });
    });
  });
});


app.get("/listCate", (req, res) => {
  let sqlProducts = `SELECT * FROM products`;
  let sqlCatalog = `SELECT * FROM categories`;

  db.query(sqlProducts, (errProducts, productsData) => {
    if (errProducts) throw errProducts;

    db.query(sqlCatalog, (errCatalog, catalogData) => {
      if (errCatalog) throw errCatalog;

      res.render('listcate.ejs', { categories: catalogData, products: productsData });
    });
  });
});


app.get("/listKh", (req, res) => {
  let sqlUsers = `SELECT * FROM users`;

  db.query(sqlUsers, (errUsers, usersData) => {
    if (errUsers) throw errUsers;
      res.render('listkh.ejs', { users : usersData  });
    });
});


app.get("/addsp", (req, res) => {
  res.render('addsp.ejs');
})


app.get("/addcate", (req, res) => {
  res.render('addcate.ejs');
})
//-----------------client----------------

app.get("/", (req, res) => {
  res.render('index.ejs');
})


app.get("/shop", (req, res) => {
  res.render('shop.ejs');
});


app.get("/about", (req, res) => {
  res.render('about.ejs');
})


app.get("/cart", (req, res) => {
  res.render('cart.ejs');
})


app.get("/checkout", (req, res) => {
  res.render('checkout.ejs');
})


app.get("/contact", (req, res) => {
  res.render('contact.ejs');
})


app.get("/single", (req, res) => {
  res.render('single-product.ejs');
})


app.get("/thanks", (req, res) => {
  res.render('thank.ejs');
})


//------------------------------
app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
})