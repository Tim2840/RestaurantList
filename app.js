const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'))
//靜態路由
app.get('/', (req, res) => {
  res.redirect('/restaurants');
});

//動態路由
app.get('/restaurants', (req, res) => {
  res.send('Listing Restaurants');
});

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  res.send(`Restaurant id : ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});