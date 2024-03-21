

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
app.set('views', './views');

//trang home
// app.get("/", (req, res) => {
//   res.render('home.ejs', { products: productList });
// })
// app.get("/", (req, res) => {
//   let sql = `SELECT * FROM products`;
//   db.query(sql, function (err, data) {
//     if (err) {
//       throw err;
//     }
//     res.render('home.ejs', { products: data , cate:data});
//   })
// })
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

// trang sp
app.get("/shop", (req, res) => {
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

//trang sp theo tung loai
app.get("/shop/:cateId", (req, res) => {
  let cateId = req.params.cateId;
  let sqlProducts = `SELECT * FROM products WHERE category_id='${cateId}'`;
  let sqlCatalog = `SELECT * FROM categories`;

  db.query(sqlProducts, (errProducts, productsData) => {
      if (errProducts) throw errProducts;

      db.query(sqlCatalog, (errCatalog, catalogData) => {
          if (errCatalog) throw errCatalog;

          res.render('shop.ejs', { catalogs: catalogData, products: productsData });
      });
  });
});


//trang themsp
app.get("/addpr", (req, res) => {
  let sqlProducts = `SELECT * FROM products`;
  let sqlCatalog = `SELECT * FROM categories`;

  db.query(sqlProducts, (errProducts, productsData) => {
    if (errProducts) throw errProducts;

    db.query(sqlCatalog, (errCatalog, catalogData) => {
      if (errCatalog) throw errCatalog;

      res.render('themsp.ejs', { catalogs: catalogData, products: productsData });
    });
  });
})

//qli sp
app.get("/listsp", (req, res) => {
  let sql = `SELECT * FROM products`;
  db.query(sql, function (err, data) {
    if (err) {
      throw err;
    }
    res.render('listsp.ejs', { products: data });
  })
})


//trang contact
app.get("/contact", (req, res) => {
  res.render('contact.ejs');
})


//add pr
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images') // noi luu anh
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const uploads = multer({ storage: storage })

app.post('/addpr', uploads.single('image'), (req, res) => {
  //lấy dữ liệu từ form sau khi upload ảnh
  const file = req.file;
  const { name, price, sale_price, describe, category_id } = req.body;
  const image = file.filename;

  // Thực hiện truy vấn SQL để chèn dữ liệu vào cơ sở dữ liệu
  const sql = `INSERT INTO products (name, price, sale_price, \`describe\`, image, category_id) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, price, sale_price, describe, image, category_id], (err, result) => {
    if (err) throw err;
    console.log("Sản phẩm đã được thêm vào cơ sở dữ liệu!");
    //chuyển về trang sản phẩm
    res.redirect('/shop');
  });
});




app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
})
