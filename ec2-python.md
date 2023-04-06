## 1. Python + boto3 on EC2: connection to RDS using IAM authentication

Ref: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.Connecting.Python.html

### 1.1. Prepare python packages:

```console
yum -y install python3-pip
pip install mysql-connector-python boto3
```

### 1.2. Sample python script

- The AWS boto3 SDK [credentials can be configured in multiple ways](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html), when the session is called with empty arguments `session = boto3.Session()`, it uses the instance metadata service
- With the session created, we can then [setup a client](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/rds.html) and [generate database authentication token](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/rds/client/generate_db_auth_token.html)
- The remaining code uses the token to connect to the database and retrieve a random row

https://github.com/joetanx/aws-rds-iam-authn/blob/f5871af03802d5f465829edb1090a3c74706c94a/ec2-cityapp.py#L1-L30

### 1.3. Sample output:

```console
[root@ip-192-168-94-94 ~]# python cityapp.py
('Yantai', 'China', 'Shandong', 452127)
```
