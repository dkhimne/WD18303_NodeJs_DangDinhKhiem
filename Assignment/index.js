const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3021
app.use(bodyParser.urlencoded({ extends: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', ['./views/client', './views/admin']);


const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');
app.use('/admin', adminRoutes);
app.use('/', clientRoutes);

//---------------admin--------------------
app.get("/home", (req, res) => {
  res.render('home.ejs');
})



//-----------------client----------------

app.get("/", (req, res) => {
  res.render('index.ejs');
})


//------------------------------
app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
})