/**
 * 验证工具类
 * return bool
 */
export default {
  // 验证手机号
  "phone": (str) => {
    const reg = /^1[34578]\d{9}$/;
    return reg.test(str);
  },

  // 验证URL
  "url": (str) => {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return reg.test(str);
  },

  // 验证邮箱
  "email": (str) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  },

  // 验证是否为小写字符
  "lowerCase": (str) => {
    const reg = /^[a-z]+$/;
    return reg.test(str);
  },

  // 验证是否为大写字母
  "upperCase": (str) => {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
  },

  // 验证是否为字母
  "alphabets": (str) => {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
  }
};
