import _ from "lodash";
import axios from "axios";
import { Message } from "element-ui";
import store from "../store";
import router from "@/router";

/**
 * 浮层消息停留时间  5 sec
 */
const TOAST_DURATION = 5 * 1000;

/**
 * 请求超时  600 secs
 */
const REQUEST_TIMEOUT = 1800 * 1000;

/**
 * HTTP 状态码
 */
// const HTTP_STATUS = {
//   /**
//    * HTTP 401 Unauthorized
//    */
//   "UNAUTHORIZED": 401,
//   /**
//    * HTTP 403 Forbidden
//    */
//   "FORBIDDEN": 403
// };
let baseURL = "/";
if (process.env.NODE_ENV === "development") {
  baseURL = "/api";
} else if (process.env.NODE_ENV === "production") {
  baseURL = "/";
}
// 创建axios实例
const service = axios.create({
  // api 的 base_url
  "baseURL": baseURL,
  //  请求超时时间
  "timeout": REQUEST_TIMEOUT
});
service.defaults.timeout = REQUEST_TIMEOUT;
// console.log(process.env);
// 处理页面中未被捕获的 Promise rejection
window.addEventListener && window.addEventListener("unhandledrejection", event => {
  const { "reason": error } = event;
  if (_.has(error, "response") && error.message) {
    // 仅在 HTTP 响应异常时触发错误提示
    Message({
      "message": error.message,
      "type": "error",
      "duration": TOAST_DURATION
    });
  }
});

// request拦截器
service.interceptors.request.use(
  config => {
    const { headers } = config;
    if (config && store.state.token) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers.Authorization = "bearer " + store.state.token;
    }
    headers["Content-Type"] = getContentType(config);
    return config;
  },
  error => {
    // Do something with request error
    console.debug(error);
    // eslint-disable-next-line promise/catch-or-return
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response && response.data;
    /*
         * 不做对code的判断，部分接口不规范的会走 reject
         * if (Object.is(res && res.code, 0)) {
         *   return Promise.resolve(res)
         * } else {
         *   return Promise.reject(res)
         * }
         */
    return Promise.resolve(res);
  },
  error => Promise.reject(error)
);

/**
 * 发起get请求
 * @param {接口地址} url
 * @param {请求数据} data
 */
export const get = function({ url, data }) {
  return _request(url, "GET", data);
};

/**
 * 发起post请求
 * @param {接口地址} url
 * @param {请求数据} data
 */
export const post = function({ url, data }) {
  return _request(url, "POST", data);
};

/**
 * 发起post请求
 * @param {接口地址} url
 * @param {请求数据} data
 */
export const put = function({ url, data }) {
  return _request(url, "PUT", data);
};

/**
 * 发起delete请求
 * @param {接口地址} url
 * @param {请求数据} data
 */
export const del = function({ url, data }) {
  return _request(url, "DELETE", data);
};

/**
 * 发起upload请求
 * @param {接口地址} url
 * @param {请求数据} data
 */
export const upload = function({ url, data }) {
  return _request(url, "UPLOAD", data);
};

/**
 * 发起download请求
 * @param {接口地址} url
 * @param {请求数据} data
 */
export const download = function({ url, data }) {
  return _request(url, "DOWNLOAD", data);
};
/**
 * 发起download请求
 * @param {接口地址} url
 * @param {请求数据} data
 */
export const downloadPlus = function({ url, data }) {
  return _request(url, "GETDOWNLOAD", data);
};

/**
 * 发起ajax请求
 * @param {接口地址} url
 * @param {方法类型} method
 * @param {请求数据} data
 */
const _request = function(url, method, data) {
  const config = { url, method };
  const methodName = method.toUpperCase();
  if (methodName === "GET") {
    config.params = data;
  }
  if (methodName === "POST" || methodName === "PUT" || methodName === "DELETE") {
    config.data = _convertFormDataToJson(data);
  }

  // 上传formData
  if (methodName === "UPLOAD") {
    config.method = "POST";
    const formData = new FormData();
    formData.append("file", data);
    // for (const key in data) {
    //   formData.append(key, data[key]);
    // }
    config.data = formData;
  }

  if (methodName === "DOWNLOAD") {
    config.responseType = "blob";
    config.method = "POST";
    if (data && Object.keys(data).length > 0) {
      config.data = _convertFormDataToJson(data);
    }
  }
  if (methodName === "GETDOWNLOAD") {
    config.responseType = "blob";
    config.method = "GET";
    config.params = data;
  }

  return new Promise((resolve, reject) => {
    service(config).then(function(res) {
      const { msg, code } = res;
      // const status = res.status.replace(/_/g, '').toUpperCase()
      switch (code) {
      case 200:
        return resolve(res);
      case 400:
        Message({
          "type": "warning",
          "message": msg || "参数检验失败",
          "showClose": true,
          "customClass": "custom-message-index"
        });
        return reject(msg);
      case 401:
        Message({
          "type": "error",
          "message": msg || "认证用户访问无权限资源",
          "showClose": true
        });
        return reject(msg);
      case 403:
        // 跳转到登陆页面
        _needLogin(status);
        return reject(msg);
      case 500:
        Message({
          "type": "error",
          "message": msg || "服务器内部错误",
          "showClose": true
        });
        return reject(msg);
      case 9998:
      case 9999:
        Message({
          "type": "error",
          "message": msg,
          "showClose": true,
          "customClass": "custom-message-index"
        });
        return reject(msg);
      case 6800:
      case 6801:
      case 6802:
      case 6803:
      case 6804:
      case 6805:
      case 9111:
        Message({
          "type": "error",
          "message": msg,
          "showClose": true
        });
        return reject(msg);
      default:
        return resolve(res);
      }
    }).catch(function(error) {
      Message({
        "type": "error",
        "message": error.message || error.msg,
        "showClose": true
      });
      console.log(error);
      reject(error);
    });
  });
};

/**
 * 需要登陆
 * @param {*} key
 */
const _needLogin = function(key) {
  if (store.state.token) {
    store.commit("set", { "token": "" });
    Message({
      "type": "error",
      "message": "尚未登陆,请登录",
      "showClose": true
    });
  }

  // 清除缓存
  store.dispatch("storeReset").then(function() {
    // 跳转到登陆界面
    router.replace({
      "name": "login",
      "query": {
        "redirect": router.currentRoute.fullPath || ""
      }
    });
  });
};

const _convertFormDataToJson = (data) => {
  if (data) {
    if (data instanceof Array) {
      return data;
    }
    const jsonData = {};
    Object.keys(data).forEach((key) => {
      if (key.includes(".")) {
        const kv = key.split(".");
        if (!jsonData[kv[0]]) {
          jsonData[kv[0]] = {};
        }
        jsonData[kv[0]][kv[1]] = data[key];
      } else {
        jsonData[key] = data[key];
      }
    });

    return jsonData;
  }
};

function getContentType(config) {
  if (config.data && config.data.formData) {
    return "multipart/form-data";
  }
  return "application/json; charset=UTF-8";
}