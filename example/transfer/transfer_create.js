var mchtId = '201701010000000001';
var appId = 'app_1Gqj58ynP0mHeX1q';
var easypay = require('../../lib/easypay')(mchtId);
var path = require('path');

// 设置请求签名私钥路径
easypay.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

var extra = {
    payee_name: '张三'
};

var order_no = new Date().getTime().toString();

var params = {
    order_no: order_no,
    app: {id: appId},
    channel: 'ebank_trans',
    amount: 100, // 订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
    currency: 'cny',
    type: 'b2c', // 付款类型，转账到个人用户为 b2c，转账到企业用户为 b2b
    recipient: '6222022010001988764',
    description: 'Your Description',
    extra: extra
};

easypay.transfers.create(params, function (err, transfer) {
    if (err != null) {
        console.log('transfers.create failed: ', err);
    } else {
        console.log(transfer);
    }
    // YOUR CODE
});
