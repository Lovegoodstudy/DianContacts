# Dian Contacts

本模块的作用是提供Dian团队联系人管理页面的CRUD接口
**以下接口`Content Type`均为`application/json`**

## Add Contact

### HTTP Method

```
[POST]
```

### Path

```
/contacts
```

### Request

Request Body参数 示例

```JSON
{
    "phone": "18827054816",
    "name": "郭宇",
    "email": "test@gmail.com"
}
```

字段说明
|字段|类型|说明|样例|是否必需|
|:---:|:---:|:---:|:---:|:---:|
|phone|string|中国大陆11位手机号|18827046729|是|
|name|string|人名，1-10个字符|abc|是|
|email|string|邮件地址|test@gmail.com|是|

### Response

样例
```JSON
{
  "result": {
    "phone": "18827054813",
    "name": "dian",
    "email": "email@email.com",
    "contact_id": "5a2fa038874a0e1afc9a65f1"
  }
}
```
字段说明
|字段|类型|说明|样例|是否必需|
|:---:|:---:|:---:|:---:|:---:|
|contact_id|string|联系人ID|5a2f9d59a0c1b022d89277f2|是|
|phone|string|中国大陆11位手机号|18827046729|是|
|name|string|人名，1-10个字符|abc|是|
|email|string|邮件地址|test@gmail.com|是|

### 错误码
|错误码|说明|
|:---:|:---:|
|600|请求参数无效|

## Get Contact

### HTTP Method

```
[GET]
```

### Path

```
/contacts
```

### Request

无参数

### Response

样例
```JSON
{
  "result": [
    {
      "phone": "18827054813",
      "name": "dian",
      "email": "email@email.com",
      "contact_id": "5a2fa038874a0e1afc9a65f1"
    },
    {
      "phone": "18827054813",
      "name": "dian_another",
      "email": "email@email.com",
      "contact_id": "5a2fa038874a0e1afc9a65f2"
    }
  ]
}
```
字段说明
|字段|类型|说明|样例|是否必需|
|:---:|:---:|:---:|:---:|:---:|
|contact_id|string|联系人ID|5a2f9d59a0c1b022d89277f2|是|
|phone|string|中国大陆11位手机号|18827046729|是|
|name|string|人名，1-10个字符|abc|是|
|email|string|邮件地址|test@gmail.com|是|

### 错误码
|错误码|说明|
|:---:|:---:|
|600|请求参数无效|

## Delete Contact

### HTTP Method

```
[DELETE]
```

### Path

```
/contacts/:id
```

### Request

参数说明
|参数|类型|说明|样例|是否必需|
|:---:|:---:|:---:|:---:|:---:|
|id|string|要删除通讯录的contact_id|5a2f9d59a0c1b022d89277f2|是|


### Response

样例
```JSON
{
  "result": {
    "n": 1,
    "ok": 1
  }
}
```
字段说明
|字段|类型|说明|样例|是否必需|
|:---:|:---:|:---:|:---:|:---:|
|n|number|删除记录的个数|1|是|

### 错误码
|错误码|说明|
|:---:|:---:|
|600|请求参数无效|

## Update Contact

### HTTP Method

```
[PUT]
```

### Path

```
/contacts/:id
```

### Request

参数说明
|参数|类型|说明|样例|是否必需|
|:---:|:---:|:---:|:---:|:---:|
|id|string|要删除通讯录的contact_id|5a2f9d59a0c1b022d89277f2|是|

Request Body参数 示例

```JSON
{
    "phone": "18827054816",
    "name": "郭宇",
    "email": "test@gmail.com"
}
```

字段说明
|字段|类型|说明|样例|是否必需|
|:---:|:---:|:---:|:---:|:---:|
|phone|string|中国大陆11位手机号|18827046729|是|
|name|string|人名，1-10个字符|abc|是|
|email|string|邮件地址|test@gmail.com|是|

### Response

样例
```JSON
{
  "result": {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
}
```
字段说明
|字段|类型|说明|样例|是否必需|
|:---:|:---:|:---:|:---:|:---:|
|n|number|操作记录的个数|1|是|
|nModified|number|改变记录的个数|1|是|

### 错误码
|错误码|说明|
|:---:|:---:|
|600|请求参数无效|
