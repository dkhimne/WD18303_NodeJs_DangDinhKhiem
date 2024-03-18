// const http = require('http');

// const server = http.createServer((req, res)=>{
//     console.log("HIHI");
// });
// server.listen(3300);

const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = 3016
// var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded());

app.set('view engine', 'ejs');
app.set('views','./views');

app.get("/", (req, res) => {
  res.render('home.ejs');
})

app.get('/product', (req, res) => {
  res.send('Day la trang product!')
})
//add product
// app.get('/add-product', (req, res) => {
//   res.send(`
//   <h1>Day la trang add-product!<h1>
//   <form action="/product" method="POST" enctype="application/x-www-form-urlencoded">
//         <input type="text" placeholder="Product" name="ProductName">
//         <button type="submit">Add product</button>
//     </form>
//   `)
// })

// app.post('/product',jsonParser,function(req, res) {
//   console.log(req.body.ProductName);
//   productList.unshift(req.body.ProductName);
//   res.send(req.body);
// });

//add product
const productList = [
  { id: 1, name: 'Sp1', price: 10000, describe: 'hihihahaahiihaa', img: 'img1.png' }
];
const comments = [];
app.get('/add-product', (req, res) => {
  res.send(`
  <h1>Thêm Sản Phẩm</h1>
  <form action="/product" method="POST">
  <input type="text" name="name" placeholder="Name"> 
  <input type="text" name="price" placeholder="Price"><br>
  <input type="text" name="describe" placeholder="Describe">
  <input type="file" name="img"placeholder="img"><br>
  <button type="submit">Add Product</button>
  </form>`);
});
app.post('/product', (req, res) => {
  let newProduct = req.body;
  newProduct.id = productList.length + 1;
  productList.push(newProduct);
  res.redirect('/products');
});

//ds product
app.get('/products', (req, res) => {
  let list = '<h2 style="color:cadetblue">Danh sách sản phẩm  <ul>';
  productList.forEach(e => {
    list += `<li><a style="text-decoration:none;color:indianred;" href="/product/${e.id}">${e.name} </a></li>`;
  });
  list += '</ul></h2>';
  res.send(list);
});
//chi tiet sp
app.get('/product/:id', (req, res) => {
  let id = req.params.id;
  product = productList.find(e => e.id == id);
  const productComments = comments[id] || [];
  info = `<h2>Thông tin chi tiết Sản Phẩm </h2>  
          <div class="card" style="width: 18rem;">
  <img src="" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <h5 class="card-title">${product.price}</h5>
    <p class="card-text">${product.describe}</p>
  </div>
</div>
          <h2>Bình luận và đánh giá</h2>
          <form action="/product/${product.id}/comment" method="post">
            <input type="hidden" name="productId" value="${product.id}">
            <label for="comment">Bình luận của bạn:</label><br>
            <textarea id="comment" name="comment" rows="5" cols="50"></textarea><br>
            <label for="rating">Đánh giá của bạn (1-5 sao):</label>
            <select id="rating" name="rating">
              <option value="1">1 sao</option>
              <option value="2">2 sao</option>
              <option value="3">3 sao</option>
              <option value="4">4 sao</option>
              <option value="5">5 sao</option>
            </select><br><br>
            <button type="submit">Gửi bình luận</button>
          </form>`;
          res.send(info + renderComments(productComments));
});

app.post('/product/:id/comment', (req, res) => {
  const productId = req.params.id;
  const comment = req.body.comment;
  const rating = req.body.rating;
  
  // Lưu thông tin bình luận vào mảng tương ứng với sản phẩm
  if (!comments[productId]) {
    comments[productId] = [];
  }
  comments[productId].push({ comment, rating });
  
  // Chuyển hướng người dùng về trang chi tiết sản phẩm
  res.redirect(`/product/${productId}`);
});

// Hàm renderComments để hiển thị các bình luận
function renderComments(comments) {
  if (!comments || comments.length === 0) {
    return '<p>Chưa có bình luận nào.</p>';
  }
  
  const renderedComments = comments.map(comment => {
    return `<p><strong>Bình luận:</strong> ${comment.comment} - <strong>Đánh giá:</strong> ${comment.rating}  sao</p>`;
  });
  
  return renderedComments.join('');
}


//ds nha khoa hoc
const inventors = [
  { id: 1, first: 'Dinh', last: 'Khiem', year: 2004, passed: 3000 },
  { id: 2, first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { id: 3, first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { id: 4, first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { id: 5, first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { id: 6, first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 }
];
app.get('/inventors', (req, res) => {
  let list = '<h2 style="color:cadetblue">Danh sách nhà khoa học <ul>';
  inventors.forEach(e => {
    list += `<li><a style="text-decoration:none;color:indianred;" href="/inventor/${e.id}">${e.last}</a></li>`;
  });
  list += '</ul></h2>';
  res.send(list);
});
//chi tiet nha khoa hoc
app.get('/inventor/:id', (req, res) => {
  let id = req.params.id;
  inventor = inventors.find(e => e.id == id);
  info = `<h2>Thông tin chi tiết nhà khoa học:Full name: ${inventor.first} ${inventor.last}, Year: ${inventor.year},
      Passed: ${inventor.passed}</h2>`;
  res.send(info);
});

//them nha khoa hoc
app.get('/add-inventor', (req, res) => {
  res.send(`
  <h1>Thêm Nhà Khoa Học</h1>
  <form action="/inventor" method="POST">
  <input type="text" name="first" placeholder="First name"> 
  <input type="text" name="last" placeholder="Last name"><br>
  <input type="number" name="year" placeholder="Year">
  <input type="number" name="passed"placeholder="Passed"><br>
  <button type="submit">Add Product</button>
  </form>`);
});
app.post('/inventor', (req, res) => {
  let newInventor = req.body;
  newInventor.id = inventors.length + 1;
  inventors.push(newInventor);
  res.redirect('/inventors');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
})
