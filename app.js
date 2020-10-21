const express = require('express')
const http = require('http')


var app = express()

app.listen(80)


//app.use(express.static('public'))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.sendFile('index.html')
})