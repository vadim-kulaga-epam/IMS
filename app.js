var express = require('express')

// Config
var DEV_PORT = 3000
var PROD_PORT = 80

var app = express()

// Actually, it should be a build directory, e.g. .tmp
app.use('/', express.static(__dirname + '/public'))

// Environment-dependent configuration
var env = process.env.NODE_ENV || 'development'
if (env == 'production') {
  var PORT = PROD_PORT
} else {
  var PORT = DEV_PORT
}

// Run server
app.listen(PORT, function() {
  console.info('Server is listening on port ' + PORT)
})

