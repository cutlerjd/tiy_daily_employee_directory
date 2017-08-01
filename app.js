const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const data = require('./data.js')
const fetchRobots = require('./model/robotModel.js')

const mongodb = require('mongodb')


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))

app.get("/", function (req, res, next) {
  res.render("index", { appType: "Express" })
})
app.get("/directory/", function (req, res, next) {
  console.log(data)
  res.render("directory", data)
})

app.get("/user/:username", function (req, res, next) {
  const user = data.users.filter(function (person) {
    return person.username == req.params.username
  })[0]
  res.render("user", user)
})

app.get("/db",function (req,res,next){
  let users = fetchRobots.fetchRobots()
  console.log({"users": users})
  res.render("directory", {"users": users})
})

// app.get("/db",function (req,res,next){
//   let MongoClient = mongodb.MongoClient

//   let url = 'mongodb://localhost:27017/Robots4LinkedIn'
//   MongoClient.connect(url, function(err, db){
//     if(err){
//       console.log("Unable to connect to the server")
//     } else{
//       console.log("Connection established")

//       let collection = db.collection('robots')

//       collection.find({}).toArray(function(err,result){
//         if(err){
//           console.log("Error")
//         }else if(result.length){
//           console.log(result)
//         }else{
//           console.log("No documents found")
//         }
//         db.close()
//       })
//     }
//   })
// })
app.listen(3000, function () {
  console.log("App running on port 3000")
})
console.log(data.users[0])