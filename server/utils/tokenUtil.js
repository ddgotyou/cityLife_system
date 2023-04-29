var jwt = require('jsonwebtoken');

//密钥
const SECRET_KEY = 'citysysdaiyihan5211111';


function setToken(userId, role, expire) {
    const token = jwt.sign({
        //exp 的值是一个时间戳，这里表示 1h 后 token 失效
        userId: userId,
        role: role
    }, SECRET_KEY, {
        expiresIn: expire
    })
    return token;
}

function verifyToken(token) {
    const { userId, role, iat, exp } = jwt.verify(token, SECRET_KEY)
    if (Number(exp) >= Date.now()) {//有效
        return userId;
    }//可以续签
    else return -1;
}




module.exports = {
    setToken,
    verifyToken
};