const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

// Connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/mean', {useNewUrlParser: true}, (err, client) => {
    if (err) return console.log(err)

    let db = client.db('mean')
    closure(db)
  })
}

// Error
const sendError = (err, res) => {
  response.status = 501
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response)
}

// Response handling
let response = {
  status: 200,
  data: [],
  massage: null
}

// Get User
router.get('/users', (req, res) => {
  connection((db) => {
    db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        response.data = users
        res.json(response)
      })
      .catch((err) => {
        sendError(err, res)
      })
  })
})

module.exports = router