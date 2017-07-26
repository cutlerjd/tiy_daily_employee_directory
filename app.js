const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const data = require('./data.js')

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))

app.get("/", function (req, res, next) {
  res.render("index", { appType: "Express" })
})
app.get("/directory/", function (req, res, next) {
  res.render("directory", data)
})

app.get("/user/:username", function (req, res, next) {
  const user = data.users.filter(function (person) {
    return person.username == req.params.username
  })[0]
  res.render("user", user)
})

app.listen(3000, function () {
  console.log("App running on port 3000")
})
console.log(data.users[0])