import mysql.connector
import boto3
import os

ENDPOINT="jtan-rds.cluster-cusiivm6n9hm.ap-southeast-1.rds.amazonaws.com"
PORT=3306
USER="cityapp"
REGION="ap-southeast-1"
DBNAME="world"
os.environ['LIBMYSQL_ENABLE_CLEARTEXT_PLUGIN'] = '1'

session = boto3.Session()
client = session.client('rds',region_name=REGION)
token = client.generate_db_auth_token(DBHostname=ENDPOINT, Port=PORT, DBUsername=USER, Region=REGION)

db = mysql.connector.connect(
  host=ENDPOINT,
  user=USER,
  password=token,
  database=DBNAME
)

cursor = db.cursor()

cursor.execute("SELECT city.Name as City,country.name as Country,city.District,city.Population FROM city,country WHERE city.CountryCode = country.Code ORDER BY RAND() LIMIT 0,1")

result = cursor.fetchall()

for row in result:
  print(row)
