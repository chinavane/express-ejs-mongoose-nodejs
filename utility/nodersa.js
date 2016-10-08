const NodeRSA = require('node-rsa');
const fs = require('fs');


exports.RSAGenKeys = function(){
  var key = new NodeRSA({b: 512, e: 5});

  key.setOptions({
      encryptionScheme: {
        scheme: 'pkcs1',
        label: 'Optimization-Service'
      },
      signingScheme: {
        saltLength: 25
      }
  });

  return {
    privkey : key.exportKey('pkcs1-private-pem'),
    pubkey : key.exportKey('pkcs8-public-pem')
  };
}
// fs.writeFileSync('priv.txt',key.exportKey('pkcs1-private-pem'));
// fs.writeFileSync('pub.txt',key.exportKey('pkcs8-public-pem'));
// console.log(key.exportKey('pkcs1-private-pem'));
// console.log(key.exportKey('pkcs8-public-pem'));
