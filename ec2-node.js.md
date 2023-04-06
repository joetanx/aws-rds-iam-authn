## 1. Node.js on EC2: connection to RDS using IAM authentication

### 1.1. Prepare NPM packages and RDS certificate authority

Install NPM packages:

```console
npm install mysql2 @aws-sdk/rds-signer
```

Get the RDS SSL certificate authority for your RDS region: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html

e.g. for `Asia Pacific (Singapore)` region:
```console
curl -LO https://truststore.pki.rds.amazonaws.com/ap-southeast-1/ap-southeast-1-bundle.pem
```

### 1.2. RDS connection parameters

https://github.com/joetanx/aws-rds-iam-authn/blob/cedf6e18d81a22a9aebc12385d3501a7d937b901/ec2-cityapp-console.js#L1-L28

The following options can be included in the `connectionConfig` block for troubleshooting:

- `debug: true`: shows more detail when the mysql connection fails
- `ssl: { rejectUnauthorized: false }` ignores SSL errors (Ref: SSL connection options https://mariadb.com/kb/en/nodejs-connection-options/)

### 1.3. Retrieve and print output to console

[Code example](/ec2-cityapp-console.js)

Run and print code segment:

https://github.com/joetanx/aws-rds-iam-authn/blob/cedf6e18d81a22a9aebc12385d3501a7d937b901/ec2-cityapp-console.js#L30-L40

Output:

```console
[root@ip-192-168-94-94 ~]# node cityapp.js
{
  City: 'Safi',
  Country: 'Morocco',
  District: 'Doukkala-Abda',
  Population: 262300
}
```

### 1.4. Using express web framework listener

Express listener code segment:

https://github.com/joetanx/aws-rds-iam-authn/blob/3baca1b1727694974606ae3e083f54d4c3e2118f/ec2-cityapp-express.js#L30-L36

#### 1.4.1. Using connection

[Code example](/ec2-cityapp-express.js)

Connection code segment:

https://github.com/joetanx/aws-rds-iam-authn/blob/3baca1b1727694974606ae3e083f54d4c3e2118f/ec2-cityapp-express.js#L38-L51

#### 1.4.2. Using connection pool

[Code example](/ec2-cityapp-express-pool.js)

Change `connection` object and `getCity` function from above to the code below:

Connection pool code segment:

https://github.com/joetanx/aws-rds-iam-authn/blob/8c13741679c4920aa21ad6d8af52d933052e883b/ec2-cityapp-express-pool.js#L38-L56

#### 1.4.3. Running the listener

To run listener in background: `node cityapp.js > /dev/null 2>&1 &`
- `> /dev/null 2>&1` sends all `stdout` and `stderr` to `/dev/null`
- `&` runs the task in background
- Background jobs controls:
  - `jobs`: lists the background jobs
  - `fg`: brings the background job to foreground
  - `Ctrl+Z`: sends the foreground to background in paused state
  - `bg`: gets the background job to continue running in background

Output:

```console
[root@ip-192-168-94-94 ~]# node cityapp.js > /dev/null 2>&1 &
[1] 3877
[root@ip-192-168-94-94 ~]# jobs
[1]+  Running                 node cityapp.js > /dev/null 2>&1 &
[root@ip-192-168-94-94 ~]# fg
node cityapp.js > /dev/null 2>&1
^Z
[1]+  Stopped                 node cityapp.js > /dev/null 2>&1
[root@ip-192-168-94-94 ~]# bg
[1]+ node cityapp.js > /dev/null 2>&1 &
[root@ip-192-168-94-94 ~]# jobs
[1]+  Running                 node cityapp.js > /dev/null 2>&1 &
```

#### 1.4.4. Example listener query output

```powershell
PS C:\Users\Administrator> Invoke-RestMethod -Method Get -Uri 'http://<ec2-ip-address>:8080' -ContentType application/json
City   Country     District        Population
----   -------     --------        ----------
Iloilo Philippines Western Visayas     365820
```
