const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require("./public/jsons/restaurant.json").results;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

//靜態路由
app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

//動態路由
app.get("/restaurants", (req, res) => {
  const keyword = req.query.search;
  const matchedItems = keyword
    ? restaurants.filter((r) =>
        Object.values(r).some((property) => {
          const lowercaseKeyword = keyword.toLowerCase()
          if (typeof property === "string" && !property.includes("http")) {
            return property.toLowerCase().includes(lowercaseKeyword);
          }
          return false;
        })
      )
    : restaurants;
  res.render("index", { restaurants: matchedItems, keyword });
});

app.get("/restaurant/:id", (req, res) => {
  const id = Number(req.params.id);
  const restaurant = restaurants.find((restaurant) => restaurant.id === id);
  if (!restaurant) {
    res.status(400).render("400", { message: "無效的餐廳id" });
  }
  res.render("detail", { restaurant });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
