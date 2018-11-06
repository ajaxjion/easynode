var mchtId = '201701010000000001';
var appId = 'app_1Gqj58ynP0mHeX1q';
var easypay = require('../../lib/easypay')(mchtId);
var path = require('path');

// 设置请求签名私钥路径
easypay.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

var channel = 'alipay_qr';
var extra = {
    notify_url: 'http:www.baidu.com'
};

var order_no = new Date().getTime().toString().substr(0, 10);

easypay.charges.create({
    order_no: order_no,
    app: {id: appId},
    channel: channel,
    amount: 100, //订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
    client_ip: '127.0.0.1', // 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
    currency: 'cny',
    subject: 'Your Subject',
    body: 'Your Body',
    extra: extra
}, function (err, charge) {
    if (err != null) {
        console.log('charges.create failed: ', err);
    } else {
        console.log(charge);
    }
    // YOUR CODE
});
