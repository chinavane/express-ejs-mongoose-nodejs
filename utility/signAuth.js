const crypto = require('crypto');
const sign = crypto.createSign('RSA-SHA1');
const verify = crypto.createVerify('RSA-SHA1');
const fs = require('fs');

// var priv_key = fs.readFileSync('./priv.txt','utf8').toString();
// var pub_key = fs.readFileSync('./pub.txt','utf8').toString();

var priv_key = '-----BEGIN RSA PRIVATE KEY-----\n'+
'MIIBNwIBAAJBAKxqKp4dmnOMj1VG1i42QzAO6GL/tEL6gMjHGqfh9pgCBPVo5al9\n'+
'dHbwWM6/Vi7bxx2jFf1bWYX6bfsZ1v6BSvECAQUCQCJ7oh+fhUpPT93a96LXpwmc\n'+
'lOCZinPLs1tbBVTGyuszRnTCZoVUPP9BaLUaxsO+YlXg6FUwp3/N/BnPwESpXLEC\n'+
'IQDcjhXqQnIZRJmsIMbmfgU/2CfscEvycAP9j9pwgFsIqwIhAMgfhvrMZio2D6Ek\n'+
'co3eHpuYFp/jHCGW8IPqMKUm13LTAiBYONWQ52DW6D14DRxcMmh/8A/4LOstxmf/\n'+
'BldgM1edEQIgUAycZFHCd0jTDUHHa/JypKM8P/RxpwktAZDgQg+JYSECIBlAdFkc\n'+
'PRpKeF7LQo7tyu0lKfRw+B7eopeZz8kMss5B\n'+
'-----END RSA PRIVATE KEY-----';

var pub_key = '-----BEGIN PUBLIC KEY-----\n'+
'MFowDQYJKoZIhvcNAQEBBQADSQAwRgJBAKxqKp4dmnOMj1VG1i42QzAO6GL/tEL6\n'+
'gMjHGqfh9pgCBPVo5al9dHbwWM6/Vi7bxx2jFf1bWYX6bfsZ1v6BSvECAQU=\n'+
'-----END PUBLIC KEY-----';

console.log('----------Priv Key---------');
console.log(priv_key);
console.log('----------Pub Key---------');
console.log(pub_key);

// 签名
console.log('----------------签名------------');

sign.update('some data to sign');
var signature = sign.sign(priv_key,'hex');

console.log(signature);

// 验证签名
console.log('----------------验证------------');

verify.update('some data to sign');

var verifyResult =  verify.verify(pub_key,signature,'hex');

console.log("验证结果: " +verifyResult);
