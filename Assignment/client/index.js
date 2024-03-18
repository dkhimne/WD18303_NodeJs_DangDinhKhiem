const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3001
// var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({extends:true}));

app.use(express.static("public"));
app.use(express.static("public2"));

app.set('view engine', 'ejs');
app.set('views', './views');

//trang home
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
app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
  })