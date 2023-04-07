## AWS RDS + IAM Authentication usage example with:

- AJAX client
- API Gateway
- Lambda (Node.js)

![image](https://user-images.githubusercontent.com/90442032/230517854-729d6029-1b97-4661-a9ad-6a14c7df2d22.png)

**PLUS:** Examples for using RDS + Secrets Manager with EC2

## 1. Setup AWS RDS instance

Read: <https://github.com/joetanx/aws-rds-iam-authn/blob/main/prepare-rds.md>

## 2. Setup Node.js lambda connection to RDS using IAM authentication

### 2.1. Create Lambda function

<details><summary><h4> 2.1.1. Create IAM role</h4></summary>

Create an IAM role for Lambda with the RDS access policy created earlier and the `AWSLambdaVPCAccessExecutionRole` permission

![image](https://user-images.githubusercontent.com/90442032/229332927-8ae183f2-9fd4-40d9-a295-d4d7f9bbec26.png)

![image](https://user-images.githubusercontent.com/90442032/229332946-8d6afb40-0f6e-4c3d-9b31-5dd487d0b8a0.png)

![image](https://user-images.githubusercontent.com/90442032/229334309-00061055-b755-4fd6-abcb-e59836e60470.png)

![image](https://user-images.githubusercontent.com/90442032/229334348-e53ef651-e118-4692-aed7-07236a528698.png)

☝️ The RDS access policy is required for IAM authentication, otherwise the Lambda function will hit the error below:

![image](https://user-images.githubusercontent.com/90442032/229339620-1d640a32-b437-41dd-ad72-37ab8e51a499.png)

</details>

#### 2.1.2. Create Lambda function and specify the IAM role created as execution role

![image](https://user-images.githubusercontent.com/90442032/229334149-ca67a7af-cf65-4c81-9f8d-a85dcbf04046.png)

![image](https://user-images.githubusercontent.com/90442032/229336000-5b87cd79-01ec-441a-a5cc-a7bb98949ae7.png)

### 2.2. Prepare node.js files

Use a separate node.js machine to prepare the files to be uploaded

```console
[root@localhost ~]# yum -y install nodejs zip
⋮
Installed:
  nodejs-1:16.17.1-1.el9_0.x86_64     nodejs-docs-1:16.17.1-1.el9_0.noarch     nodejs-full-i18n-1:16.17.1-1.el9_0.x86_64     nodejs-libs-1:16.17.1-1.el9_0.x86_64     npm-1:8.15.0-1.16.17.1.1.el9_0.x86_64
  unzip-6.0-56.el9.x86_64             zip-3.0-33.el9.x86_64

Complete!
[root@localhost ~]# mkdir cityapp && cd $_
[root@localhost cityapp]# curl -LOs https://truststore.pki.rds.amazonaws.com/ap-southeast-1/ap-southeast-1-bundle.pem
[root@localhost cityapp]# npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (cityapp)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /root/cityapp/package.json:

{
  "name": "cityapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) yes
[root@localhost cityapp]# npm --save install mysql2 @aws-sdk/rds-signer

added 88 packages, and audited 89 packages in 20s
⋮
[root@localhost cityapp]# touch index.js
[root@localhost cityapp]# zip -r cityapp.zip .
  adding: ap-southeast-1-bundle.pem (deflated 43%)
  adding: package.json (deflated 35%)
  adding: node_modules/ (stored 0%)
  ⋮
  adding: index.js (stored 0%)
```

#### 2.2.1. Upload the .zip file

![image](https://user-images.githubusercontent.com/90442032/229333243-c01682a6-97e6-4889-aa63-46e6c44caea6.png)

![image](https://user-images.githubusercontent.com/90442032/229333288-9a9ba655-0b2d-41f5-bfde-32d4ebc42ca8.png)

The code source will be populated with the uploaded prepared archive

![image](https://user-images.githubusercontent.com/90442032/229333386-27021c9d-63fd-4577-81e8-31cf259e6741.png)

### 2.3. Test RDS access with hardcoded credentials

#### 2.3.1. Populated the environment variables

Go to Configuration → Environment variables → Edit 

![image](https://user-images.githubusercontent.com/90442032/229333540-84d0a50e-dea0-4fa3-8477-9b789665131f.png)

Add the following entries:

```json
{
  "rdsHost": "jtan-rds.cluster-cusiivm6n9hm.ap-southeast-1.rds.amazonaws.com",
  "rdsUser": "admin",
  "rdsPassword": "<redacted>",
  "rdsPort": "3306",
  "rdsDatabase": "world"
}
```

![image](https://user-images.githubusercontent.com/90442032/229334604-21d4d805-2705-4347-9da2-90824ba698a1.png)

#### 2.3.2. Update index.js

[Example lambda function: cityapp using lambda environment variables](/lambda-cityapp-hardcode.js)

https://github.com/joetanx/aws-rds-iam-authn/blob/e96c4f9569f43415488dcf9240871dd08dd5a2f7/lambda-cityapp-hardcode.js#L1-L15

Update `index.js` with the example code and select `Deploy`

![image](https://user-images.githubusercontent.com/90442032/229333760-510eb001-b18a-4bc0-9743-990f748e944b.png)

#### 2.3.3. Run test

Go to `Test` and click `Test`

(The template doesn't matter since the code doesn't require input)

![image](https://user-images.githubusercontent.com/90442032/229337109-de97c89d-2c72-4555-b8ff-eab7767429ac.png)

Notice that the duration took **45ms**:

![image](https://user-images.githubusercontent.com/90442032/229336876-759c7dd5-2a6a-4b9a-93a7-aa5f569f120f.png)

### 2.4. Test RDS access with IAM authentication

#### 2.4.1. Populated the environment variables

Update the environment variables to:

```json
{
  "rdsHost": "jtan-rds.cluster-cusiivm6n9hm.ap-southeast-1.rds.amazonaws.com",
  "rdsUser": "cityapp",
  "rdsPort": "3306",
  "rdsDatabase": "world",
  "rdsRegion": "ap-southeast-1"
}
```

![image](https://user-images.githubusercontent.com/90442032/229336597-7e5504c7-5754-47b6-9394-240ae331c618.png)

#### 2.4.2. Update index.js

[Example lambda function: cityapp using IAM authentication](/lambda-cityapp-iam-authn.js)

https://github.com/joetanx/aws-rds-iam-authn/blob/e96c4f9569f43415488dcf9240871dd08dd5a2f7/lambda-cityapp-iam-authn.js#L1-L28

Update `index.js` with the example code and select `Deploy`

![image](https://user-images.githubusercontent.com/90442032/229337201-66aee43d-1a81-4ca9-97d2-159b0f1d49c3.png)

#### 2.4.3. Run test

Go to `Test` and click `Test`

(The template doesn't matter since the code doesn't require input)

![image](https://user-images.githubusercontent.com/90442032/229337109-de97c89d-2c72-4555-b8ff-eab7767429ac.png)

The output is exactly the same, but notice that the duration took **130ms** comprared to **45ms** because the IAM authentication takes some time to get the signer token

![image](https://user-images.githubusercontent.com/90442032/229336992-e885cd60-156b-4d6d-9b57-ecbaa696cf73.png)

## 3. API Gateway

### 3.1. Create REST API:

![image](https://user-images.githubusercontent.com/90442032/229339233-84ea0f6a-aa69-4fbd-9ca7-df489f815ded.png)

#### 3.1.1. Create method:

![image](https://user-images.githubusercontent.com/90442032/229341473-f5a6a9be-b7e1-4e9d-a2f5-37703239835f.png)

#### 3.1.2. Configure GET method to integrate with the Lambda function:

![image](https://user-images.githubusercontent.com/90442032/229341565-949b2a20-78c5-4516-972e-2978babf3252.png)

![image](https://user-images.githubusercontent.com/90442032/229339271-af9ddad2-e18a-4601-a346-2eb537eebf61.png)

#### 3.1.3. Verify method and test:

![image](https://user-images.githubusercontent.com/90442032/229341725-8313b6d6-3098-4801-882e-97db014261b4.png)

![image](https://user-images.githubusercontent.com/90442032/229341789-7d168cd9-3a9a-4376-96a8-373e910edcfa.png)

#### 3.1.4. Enable CORS:

☝️ In a production environment, do not set `Access-Control-Allow-Origin` to `*`, set it to allowed sources

![image](https://user-images.githubusercontent.com/90442032/229341889-4116e69f-656b-40db-b45e-45591cf96ea1.png)

![image](https://user-images.githubusercontent.com/90442032/229341918-5106e1f8-4372-4be8-9b2d-b219131fdaa8.png)

![image](https://user-images.githubusercontent.com/90442032/229341963-8cfa3aaf-c528-4580-94cc-742da99ceed9.png)

![image](https://user-images.githubusercontent.com/90442032/229341996-4c86f9e9-6943-414f-bd2b-b92886fc827e.png)

#### 3.1.5. Deploy the API:

![image](https://user-images.githubusercontent.com/90442032/229342039-9216c460-4588-46b2-b241-de855a7e74d9.png)

![image](https://user-images.githubusercontent.com/90442032/229339311-77c93f0b-dcdb-417e-b160-b5ccb483652a.png)

##### The API URL is displayed after deployment:

![image](https://user-images.githubusercontent.com/90442032/229342113-c03e5d0b-1b5b-409d-a715-06cea6f00ac3.png)

##### Test API access:

```powershell
PS C:\Users\Administrator> Invoke-RestMethod -Method Get -Uri 'https://oun0bu8mwf.execute-api.ap-southeast-1.amazonaws.com/dev' -ContentType application/json

City         Country  District Population
----         -------  -------- ----------
Buenaventura Colombia Valle        224336
```

### 3.2. Test client end javascript access to API gateway

[Example javascript client page](https://github.com/joetanx/aws-rds-iam-authn/blob/main/cityapp-client.html)

AJAX code segment:

https://github.com/joetanx/aws-rds-iam-authn/blob/06798f946ca61482973bb6608c02b174d8ddfe2d/cityapp-client.html#L24-L47

Example output:

![image](https://user-images.githubusercontent.com/90442032/230388730-4033ddf6-e37c-45df-9897-3d320774fc84.png)

## 4. Examples for using RDS + Secrets Manager with EC2

### 4.1. Setup EC2 instance profile for Secrets Manager access

<https://github.com/joetanx/aws-rds-iam-authn/blob/main/prepare-ec2.md>

### 4.2. Example: Python on EC2

<https://github.com/joetanx/aws-rds-iam-authn/blob/main/ec2-python.md>

### 4.3. Example: Node.js on EC2

<https://github.com/joetanx/aws-rds-iam-authn/blob/main/ec2-node.js.md>
