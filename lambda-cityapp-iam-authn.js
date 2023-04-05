const {Signer} = require('@aws-sdk/rds-signer')
const fs = require('fs')
const mysql = require('mysql2/promise')

const signer = new Signer({
  hostname: process.env.rdsHost,
  port: process.env.rdsPort,
  username: process.env.rdsUser,
  region: process.env.rdsRegion
})

const serverCert = [fs.readFileSync('ap-southeast-1-bundle.pem','utf8')]

const query = 'SELECT city.Name as City,country.name as Country,city.District,city.Population FROM city,country WHERE city.CountryCode = country.Code ORDER BY RAND() LIMIT 0,1'

const connectionConfig = {
  host     : process.env.rdsHost,
  user     : process.env.rdsUser,
  database : process.env.rdsDatabase,
  ssl: { ca: serverCert },
  authPlugins: { mysql_clear_password: () => () => signer.getAuthToken() }
}
exports.handler = async () => {
  const connection = await mysql.createConnection(connectionConfig)
  const [rows,fields] = await connection.execute(query)
  connection.end()
  return rows[0]
}
