
// 导入状态管理
import store from '../store/index';

// 引入网络请求工具 axios
let axios = require('axios');

/**
 * 定义网络请求的base地址
 * @type {string}
 */
axios.defaults.baseURL = 'http://rest.apizza.net/mock/8a8bde11ef98167c719ec7652d754f2f/';
// 全局地址（部分地方需要单独使用根地址）
let BASEURL = 'http://rest.apizza.net/mock/8a8bde11ef98167c719ec7652d754f2f/';
/**
 * 发起网络请求，请求接口
 * @param method 请求的方式[get/post]
 * @param url 接口url
 * @param params 请求的参数
 * @param success 成功回调函数
 * @param failure 失败回调函数
 * @param responseType 响应返回数据类型（用于设置下载excel，数据类型需要传为 blob）
 */
const networkAxios = (method, url, params, success, failure, responseType) => {
    // 获取token
    let token = store.state.token;

    // 1.将参数处理为 formdata
    let formdata = new FormData();
    if (params) {
        for (let key in params) {
            formdata.append(key, params[key]);
        }
        // 重新给params赋值
        params = formdata;
    }
    // 2.处理带有请求头参数
    axios({
        method: method,
        url: url,
        // get 请求使用params 而post 请求使用data
        data: method === 'POST' ? params : null,
        params: method === 'GET' ? params : null,
        headers: {'token': token},
        withCredentials: false,
        // responseType: responseType || 'json',
        timeout: 30000
    }).then((res) => {
        if (res.data.success === true) {
            // 如果有成功回调执行成功回调
            if (success) {
                success(res.data.data, res.data.message);
            }
        } else {
            // 对Modal.confirm()方法调用的确认模态框请求进行统一错误处理
            if (failure) {
                failure(res.data);
            }
        }
    }).catch((err) => {
        // 如果有失败参数调用失败参数
        if (failure) {
            console.log(err.response);
            failure(err.response);
        }
    });
};

const getFileBlob = (url, success, failure) => {
    axios({
        method: 'GET',
        url: url,
        withCredentials: false,
        responseType: 'blob',
        headers: {
            'Cache-control': 'no-cache',
            'Expires': 0
        },
        timeout: 30000
    }).then((res) => {
        // console.log(res);
        // if (res.data.success === true) {
        success(res);
        // }
    }).catch((err) => {
        // 如果有失败参数调用失败参数
        if (failure) {
            console.log(err.response);
        }
    });
};

// 对请求结果进行统一处理
axios.interceptors.response.use((data) => {
    if (data.status && data.status === 200 && data.data.status === 'error') {
        return;
    }
    return data;
}, (err) => {
    console.log(err);
    if (err.response.status === 504 || err.response.status === 404) {
    } else {
    }

    // 将错误信息返回到那一个回调操作
    // return Promise.resolve(err);
    return Promise.reject(err);
});

/**
 * 返回在vue模版中调用
 */
export default {
    get: function (url, params, success, failure) {
        return networkAxios('GET'.url, params, success, failure);
    },
    post: function (url, params, success, failure) {
        return networkAxios('POST', url, params, success, failure);
    },
    getFileBlob,

    // 抛出地址（上传文件等地方需要使用）
    BASEURL: BASEURL,
    // 抛出all方法
    all: function (list) {
        return axios.all(list);
    }
};
