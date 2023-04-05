## 1. Summary

||RDS-MySQL|Aurora-MySQL|
|---|---|---|
|Hard-coded|139.4ms|236.7ms|
|IAM Authentication|366.1ms|415.4ms|
|Secrets Manager|427.1ms|431.9ms|

## 2. RDS-MySQL

### 2.1. RDS-MySQL : EC2 : Python : Hard-coded Credentials

```console
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Changzhi', 'China', 'Shanxi', 317144)

real    0m0.153s
user    0m0.085s
sys     0m0.007s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Ise-Ekiti', 'Nigeria', 'Ondo & Ekiti', 103400)

real    0m0.103s
user    0m0.080s
sys     0m0.008s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Quy Nhon', 'Vietnam', 'Binh Dinh', 163385)

real    0m0.127s
user    0m0.080s
sys     0m0.011s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Aix-en-Provence', 'France', 'Provence-Alpes-Côte', 134222)

real    0m0.103s
user    0m0.080s
sys     0m0.009s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Garanhuns', 'Brazil', 'Pernambuco', 114603)

real    0m0.118s
user    0m0.079s
sys     0m0.012s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Carúpano', 'Venezuela', 'Sucre', 119639)

real    0m0.122s
user    0m0.084s
sys     0m0.008s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Santander', 'Spain', 'Cantabria', 184165)

real    0m0.120s
user    0m0.085s
sys     0m0.009s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Hafar al-Batin', 'Saudi Arabia', 'al-Sharqiya', 137800)

real    0m0.258s
user    0m0.071s
sys     0m0.010s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Taitung', 'Taiwan', 'Taitung', 111039)

real    0m0.126s
user    0m0.082s
sys     0m0.013s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Taiping', 'Taiwan', '', 165524)

real    0m0.164s
user    0m0.077s
sys     0m0.013s
```

### 2.2. RDS-MySQL : EC2 : Python : IAM Authentication

```console
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Binjai', 'Indonesia', 'Sumatera Utara', 127222)

real    0m0.328s
user    0m0.247s
sys     0m0.036s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Pingxiang', 'China', 'Jiangxi', 425579)

real    0m0.403s
user    0m0.247s
sys     0m0.040s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Ongole', 'India', 'Andhra Pradesh', 100836)

real    0m0.355s
user    0m0.238s
sys     0m0.042s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Brovary', 'Ukraine', 'Kiova', 89000)

real    0m0.367s
user    0m0.250s
sys     0m0.037s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Jacksonville', 'United States', 'Florida', 735167)

real    0m0.417s
user    0m0.251s
sys     0m0.038s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Tšernigiv', 'Ukraine', 'Tšernigiv', 313000)

real    0m0.391s
user    0m0.236s
sys     0m0.042s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Stavropol', 'Russian Federation', 'Stavropol', 343300)

real    0m0.339s
user    0m0.254s
sys     0m0.028s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Welkom', 'South Africa', 'Free State', 203296)

real    0m0.329s
user    0m0.235s
sys     0m0.044s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Macuspana', 'Mexico', 'Tabasco', 133795)

real    0m0.324s
user    0m0.250s
sys     0m0.026s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Emmen', 'Netherlands', 'Drenthe', 105853)

real    0m0.408s
user    0m0.255s
sys     0m0.032s
```

### 2.3.RDS-MySQL : EC2 : Python : Secrets Manager

```console
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Amadora', 'Portugal', 'Lisboa', 122106)

real    0m0.392s
user    0m0.291s
sys     0m0.041s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Ibaraki', 'Japan', 'Osaka', 261020)

real    0m0.433s
user    0m0.294s
sys     0m0.029s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Gera', 'Germany', 'Thüringen', 114718)

real    0m0.514s
user    0m0.300s
sys     0m0.044s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Sasaram', 'India', 'Bihar', 98220)

real    0m0.372s
user    0m0.299s
sys     0m0.027s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Komaki', 'Japan', 'Aichi', 139827)

real    0m0.411s
user    0m0.310s
sys     0m0.027s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Mandasor', 'India', 'Madhya Pradesh', 95758)

real    0m0.398s
user    0m0.291s
sys     0m0.037s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Birmingham', 'United States', 'Alabama', 242820)

real    0m0.407s
user    0m0.293s
sys     0m0.039s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Sangli', 'India', 'Maharashtra', 193197)

real    0m0.504s
user    0m0.307s
sys     0m0.038s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Zhoukou', 'China', 'Henan', 146288)

real    0m0.437s
user    0m0.313s
sys     0m0.027s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Nha Trang', 'Vietnam', 'Khanh Hoa', 221331)

real    0m0.403s
user    0m0.293s
sys     0m0.037s
```

## 3. Aurora-MySQL

### 3.1. Aurora-MySQL : EC2 : Python : Hard-coded Credentials

```console
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Shreveport', 'United States', 'Louisiana', 200145)

real    0m0.132s
user    0m0.078s
sys     0m0.013s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Yulin', 'China', 'Guangxi', 144467)

real    0m0.311s
user    0m0.077s
sys     0m0.012s
[root@ip-192-168-94-94 ~]# time python cityapp.py
^[[A('Kaifeng', 'China', 'Henan', 510000)

real    0m0.379s
user    0m0.068s
sys     0m0.009s
[root@ip-192-168-94-94 ~]# time python cityapp.py
^[[A('Hsinchuang', 'Taiwan', 'Taipei', 365048)

real    0m0.372s
user    0m0.081s
sys     0m0.012s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Cariacica', 'Brazil', 'Espírito Santo', 319033)

real    0m0.292s
user    0m0.059s
sys     0m0.008s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('South Bend', 'United States', 'Indiana', 107789)

real    0m0.227s
user    0m0.031s
sys     0m0.006s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Inanda', 'South Africa', 'KwaZulu-Natal', 634065)

real    0m0.107s
user    0m0.081s
sys     0m0.007s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Kaluga', 'Russian Federation', 'Kaluga', 339300)

real    0m0.115s
user    0m0.081s
sys     0m0.008s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('San Juan', 'Argentina', 'San Juan', 119152)

real    0m0.194s
user    0m0.086s
sys     0m0.009s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Taoyuan', 'Taiwan', 'Taoyuan', 316438)

real    0m0.238s
user    0m0.072s
sys     0m0.020s
```

### 3.2. Aurora-MySQL : EC2 : Python : IAM Authentication

```console
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Jiangyou', 'China', 'Sichuan', 175753)

real    0m0.418s
user    0m0.244s
sys     0m0.040s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Nogales', 'Mexico', 'Sonora', 159103)

real    0m0.329s
user    0m0.242s
sys     0m0.042s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Oslo', 'Norway', 'Oslo', 508726)

real    0m0.524s
user    0m0.227s
sys     0m0.041s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Qaraghandy', 'Kazakstan', 'Qaraghandy', 436900)

real    0m0.525s
user    0m0.243s
sys     0m0.040s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Potsdam', 'Germany', 'Brandenburg', 128983)

real    0m0.519s
user    0m0.260s
sys     0m0.025s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Tete', 'Mozambique', 'Tete', 101984)

real    0m0.320s
user    0m0.240s
sys     0m0.038s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Pali', 'India', 'Rajasthan', 136842)

real    0m0.377s
user    0m0.243s
sys     0m0.036s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Zabrze', 'Poland', 'Slaskie', 200177)

real    0m0.318s
user    0m0.237s
sys     0m0.041s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Mabalacat', 'Philippines', 'Central Luzon', 171045)

real    0m0.456s
user    0m0.249s
sys     0m0.040s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Norrköping', 'Sweden', 'East Götanmaan län', 122199)

real    0m0.368s
user    0m0.257s
sys     0m0.033s
```

### 3.3. Aurora-MySQL : EC2 : Python : Secrets Manager

```console
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Sambalpur', 'India', 'Orissa', 131138)

real    0m0.402s
user    0m0.296s
sys     0m0.032s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Vinh', 'Vietnam', 'Nghe An', 112455)

real    0m0.408s
user    0m0.289s
sys     0m0.040s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Hugli-Chinsurah', 'India', 'West Bengali', 151806)

real    0m0.407s
user    0m0.307s
sys     0m0.032s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Borisov', 'Belarus', 'Minsk', 151000)

real    0m0.447s
user    0m0.289s
sys     0m0.039s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Kabwe', 'Zambia', 'Central', 154300)

real    0m0.388s
user    0m0.299s
sys     0m0.033s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Salatiga', 'Indonesia', 'Central Java', 103000)

real    0m0.645s
user    0m0.299s
sys     0m0.033s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Daska', 'Pakistan', 'Punjab', 101500)

real    0m0.393s
user    0m0.304s
sys     0m0.034s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Santa Monica', 'United States', 'California', 91084)

real    0m0.447s
user    0m0.295s
sys     0m0.037s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Dalap-Uliga-Darrit', 'Marshall Islands', 'Majuro', 28000)

real    0m0.403s
user    0m0.302s
sys     0m0.036s
[root@ip-192-168-94-94 ~]# time python cityapp.py
('Huntington Beach', 'United States', 'California', 189594)

real    0m0.379s
user    0m0.291s
sys     0m0.033s
```
