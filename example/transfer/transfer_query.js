var mchtId = '201701010000000001';
var appId = 'app_1Gqj58ynP0mHeX1q';
var easypay = require('../../lib/easypay')(mchtId);
var path = require('path');

// 设置请求签名私钥路径
easypay.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/* 查询列表 */
easypay.transfers.list(
    {order_no: '1539224032766', app_id: appId},
    function (err, transfers) {
        if (err != null) {
            console.log('transfers.list failed: ', err);
        } else {
            console.log(transfers);
        }
        // YOUR CODE
    }
);
