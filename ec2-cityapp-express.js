const rdsRegion = 'ap-southeast-1'
const rdsHost = 'jtan-rds.cluster-cusiivm6n9hm.ap-southeast-1.rds.amazonaws.com'
const rdsPort = 3306
const rdsUser = 'cityapp'
const rdsDatabase = 'world'

const {Signer} = require('@aws-sdk/rds-signer')
const fs = require('fs')
const mysql = require('mysql2')

const signer = new Signer({
  hostname: rdsHost,
  port: rdsPort,
  username: rdsUser,
  region: rdsRegion
})

const serverCert = [fs.readFileSync('ap-southeast-1-bundle.pem','utf8')]

const query = 'SELECT city.Name as City,country.name as Country,city.District,city.Population FROM city,country WHERE city.CountryCode = country.Code ORDER BY RAND() LIMIT 0,1'

const connectionConfig = {
  host: rdsHost,
  user: rdsUser,
  database: rdsDatabase,
  ssl: { ca: serverCert },
  authPlugins: { mysql_clear_password: () => () => signer.getAuthToken() }
}

const express = require('express')
const app = express()
app.get('/',function(request,response){-
  response.setHeader('Access-Control-Allow-Origin', '*')
  getCity(request,response)
})
app.listen(8080)

const connection = mysql.createConnection(connectionConfig)
function getCity(request,response) {
  connection.connect(function(err){
    if (err) {
      response.json({'code' : 300, 'status' : 'Database connection errror', 'error' : err.message})
      return
    }
    connection.query(query, function(err,results,fields){
      if(!err) {
        response.json(results[0])
      }
    })
  })
}
