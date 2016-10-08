var http = require('http');  
var qs = require('querystring');  

const crypto = require('crypto');
const sign = crypto.createSign('RSA-SHA1');

var rsaKeysModel = require('./db/models/RSAKeysModel');
var db = require('./db/db');

rsaKeysModel.rsaKeysModel.find().populate({
        path:'userinfo',
        match:{name:'james'}
    }).exec(function(err,doc){
        //console.log(doc[0]);
        // 私钥
        var privkey = doc[0].privkey;

        // 签名
        var sign_str = 'api_name=apply&api_code=001';
        sign.update(sign_str);
        // 合法验证
        var signature = sign.sign(privkey,'hex');
        // 修改密码进行非法验证测试
        // var signature = sign.sign(privkey.replace('a','b'),'hex');
        console.log('签名：'+signature);
        var post_data = {  
            api_name:'apply',
            api_code:'001',
            signature:signature
        };//这是需要提交的数据

        var content = qs.stringify(post_data);  
  
        var options = {
            hostname: '127.0.0.1',  
            port: 3100,  
            path: '/api',  
            method: 'post' ,
            headers: {  
                "Content-Type": 'application/x-www-form-urlencoded',  
                "Content-Length": content.length  
            }
        };

        var chunkData = '';
        var req = http.request(options, function (res) {
            res.on('data', function (chunk) {
                    chunkData += chunk.toString();
            })
            .on('end',function(){
                // 返回数据
                var allData = JSON.parse(chunkData);
                console.log(allData);
            });
            if(res.statusCode == 200){

            }
            else{
                res.send(500, "error");
            }
        });  
          
        req.on('error', function (e) {  
            console.log('problem with request: ' + e.message);  
        });  
          
        // write data to request body  
        req.write(content);  
        req.end();
    });

 
  
  
