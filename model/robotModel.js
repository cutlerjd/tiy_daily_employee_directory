let MongoDB = require('mongodb')

let MongoClient = MongoDB.MongoClient

let url = "mongodb://localhost:27017/Robots4LinkedIn"

function fetchRobots() {
    MongoClient.connect(url, function (error, db) {
        if (error) {
            console.log("there was an error", error)
        } else {
            let robots = []
            console.log("Connection Capital, Captain")
            let collection = db.collection('robots')

            collection.find({}).toArray(function (err, result) {
                if (err) {
                    console.log("Error")
                } else if (result.length) {
                    console.log(result)
                    robots.push(result)
                } else {
                    console.log("No documents found")
                }
            })
            db.close()
            return robots
        }
    })
}

module.exports = {
    fetchRobots : fetchRobots
}