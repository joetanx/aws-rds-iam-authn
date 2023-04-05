## 1. EC2 instance connection to RDS using IAM authentication

<details><summary><h3>1.1. Create EC2 instance</h3></summary>

![image](https://user-images.githubusercontent.com/90442032/226159252-c55c852d-4623-4fe9-9ffd-cd255872e6ea.png)

![image](https://user-images.githubusercontent.com/90442032/226159265-c1c184e8-4483-4824-ad9b-19ac13206c22.png)

![image](https://user-images.githubusercontent.com/90442032/226159279-556629f1-935e-414c-8ff6-a47515eb2477.png)

![image](https://user-images.githubusercontent.com/90442032/226159289-243f29ae-3382-4fc0-a636-225ef32d2b99.png)

![image](https://user-images.githubusercontent.com/90442032/226159397-e57e6c67-83a0-441d-97b6-70cabcdec363.png)

![image](https://user-images.githubusercontent.com/90442032/226159412-36f5de4e-c20b-4fee-8b59-f290ec36a130.png)

</details>

### 1.2. Setup EC2 instance profile

#### 1.2.1. Create IAM role

![image](https://user-images.githubusercontent.com/90442032/226161350-cafd392b-a052-4843-ac1d-41586087e35c.png)

![image](https://user-images.githubusercontent.com/90442032/226161354-fab72b06-2792-41ee-8098-202e2e3c41a3.png)

![image](https://user-images.githubusercontent.com/90442032/229332909-0aaa9f87-2c3a-4f0a-8e2d-85617c8ce4b0.png)

#### 1.2.2. Attach IAM role to EC2 instance profile

Right-click instance → Security → Modify IAM Role

![image](https://user-images.githubusercontent.com/90442032/229332182-81cb5dfc-d403-4bdd-9fc7-c65c1bd2e597.png)


### 1.3. Test connection using AWS CLI + MySQL client

Setup AWS CLI and MySQL client:

```console
yum -y install mysql unzip
curl -O https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip
unzip awscli-exe-linux-x86_64.zip
./aws/install && rm -rf aws*
```

Generate IAM token and connect to RDS:

```console
RDSHOST="jtan-rds.cluster-cusiivm6n9hm.ap-southeast-1.rds.amazonaws.com"
TOKEN="$(aws rds generate-db-auth-token --hostname $RDSHOST --port 3306 --region ap-southeast-1 --username cityapp)"
mysql --host=$RDSHOST --port=3306 --user=cityapp --enable-cleartext-plugin --password=$TOKEN
```

☝️ Notice that no access key is needed for the `aws rds generate-db-auth-token` command; it automatically assumes the IAM role in the instance profile
