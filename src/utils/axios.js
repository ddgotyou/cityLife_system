//二次封装axios
import axios from 'axios';
import QS from 'qs';
import { message } from 'antd';

// //保存环境变量
// const isPrd =process.env.NODE_ENV=='production';


//服务端的url
const baseUrl = 'http://localhost:9000';

//设置axios的基础路径
const service = axios.create({
    baseURL: baseUrl
})

//请求拦截器
service.interceptors.request.use(config => {
    //本地获取token
    const token = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');
    //每次请求中添加token
    //请求参数的data中，深拷贝，注入token
    config.data = Object.assign({}, config.data, {
        token: token,
    })

    //设置请求头
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }

    //序列化原来的请求参数
    config.data = QS.stringify(config.data);
    return config;
}, err => {
    return err;
})


//响应拦截器
service.interceptors.response.use(res => {
    //服务端不会throw，而是返回状态码
    //根据状态码处理
    if (res.data) {
        let code = Number(res.data.code);
        switch (code) {
            case 200:
                break;
            default:
                message.error(res.data.message);
                break;
        }
    }
    return res;
})

export default {
    service,
    baseUrl
}