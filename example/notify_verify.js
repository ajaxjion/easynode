'use strict';
var crypto = require("crypto"),
    fs = require("fs");

// 验证通知签名
var verify_signature = function (raw_data, signature, pub_key_path) {
    var verifier = crypto.createVerify('RSA-SHA256').update(raw_data, "utf8");
    var pub_key = fs.readFileSync(pub_key_path, "utf8");
    return verifier.verify(pub_key, signature, 'base64');
}

// POST 原始请求数据是待验签数据，请根据实际情况获取
var raw_data = '1234';
// 签名在头部信息的 request-signature 字段，
var signature = 'V9IG+uJRzQZV/5BmwxJ+O9pJo/cNZYIOokmg1YZB5/maISVbiWH5tigilLPkxP95Fa8nnjVpUyfaJ4EFdYF+WeL+Gprcv/K3l4plyqHLk+HbcJ60LLWpTmPNAqUnA8krzK4OOS/KGS054nRT3Tj7ROzvhgnO5HJRkG9YXg+fB7tK2rccA+qABBAn1ZQUx8RjvH/P300JdkEOVSPUFt2nPLPCBmO+Ju7R8w1tBHRoZOZuat9ROQ873HBzDI811A1rm/DCdOwkXi+XJEiIathxqeSzrg2RZ/TuFonLz+EsBXt7q/a4oGEoE3OboxJ2OQySNrMmYyPUjko3PBGS8r4t4Q==';
// easypay公钥
var pub_key_path = __dirname + "/easypay_rsa_public_key.pem";

if (verify_signature(raw_data, signature, pub_key_path)) {
    console.log('verification succeeded');
} else {
    console.log('verification failed');
}
