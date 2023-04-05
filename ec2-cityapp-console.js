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

const connection = mysql.createConnection(connectionConfig)
connection.connect(function(err){
  if (err) throw err
  connection.query(query, function(err,results,fields){
    if (err) throw err
    for(row of results){
      console.log(row)
    }
  })
  connection.end()
})
