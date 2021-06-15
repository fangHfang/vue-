import request from "./request";
import validate from "./validate";
import format from "./format";
import {
  UPLOAD_URL
} from "./system-constant";

/**
 * 获取随机数或者随机字母
 * @param type  随机数：true   随机字母：false
 * @returns {String}字符串格式的数字
 */
function getRandomValue(type = true) {
  const random = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return type ? (random + "") : random.toString(36).replace(/[^a-zA-Z]/g, "");
}
/**
 * 转换json
 * @param
 * @returns
 */
function jsonFormat(json) {
  let str = "?";
  for (const k in json) {
    str += k + "=" + encodeURIComponent(json[k] + "") + "&";
  }
  return str.substring(0, str.length - 1);
}
/**
 * 去除空格
 * @param mark 0-去除全部空格 1-去除两头空格 2-去左空格 3-去右空格
 * @returns
 */
function strTrim(val, mark = 0) {
  if (mark === 0) {
    return (val + "").replace(/\s+/g, "");
  } else if (mark === 1) {
    return (val + "").replace(/^\s+|\s+$/g, "");
  } else if (mark === 2) {
    return (val + "").replace(/^\s*/g, "");
  } else if (mark === 3) {
    return (val + "").replace(/(\s*$)/g, "");
  }
}

/**
 * 限制输入特殊字符
 * @params format specChar-禁用特殊字符 number-仅能输入数字 price-仅能输入价格（小数点）
 * @returns
 */
function validForbid(value, format = "specChar") {
  let str = value + "";
  if (format === "specChar") {
    str = str.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g, "");
  } else if (format === "number") {
    str = str.replace(/[^0-9]/g, "");
  } else if (format === "price") {
    str = str.replace(/[^\d^\.]+/g, "").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  }
  return str;
}

/*
 * 参数说明：
 * number：要格式化的数字
 * decimals：保留几位小数
 * isThousandsSep：是否需要千分位
 * roundtag:舍入参数，默认 "round" 四舍五入 ,"ceil" 向上取,"floor"向下取,
 * */
function amountFormat(number, decimals, isThousandsSep, roundtag) {
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  roundtag = roundtag || "round";
  const n = !isFinite(+number) ? 0 : +number;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = ",";
  const dec = ".";
  let s = "";
  const toFixedFix = function(n, prec) {
    const k = Math.pow(10, prec);
    console.log();

    return "" + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
  };
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (isThousandsSep) {
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}
//  节流throttle代码（时间戳+定时器）
const throttle = (func, delay = 1000) => {
  let timer = null;
  let startTime = Date.now();
  const curTime = Date.now();
  const remaining = delay - (curTime - startTime);
  const context = this;
  const args = arguments;
  clearTimeout(timer);
  if (remaining <= 0) {
    func.apply(context, args);
    startTime = Date.now();
  } else {
    timer = setTimeout(func, remaining);
  }
};
export default {
  request,
  validate,
  format,
  throttle,
  // 获取随机数或者随机字母
  getRandomValue,
  jsonFormat,
  strTrim,
  validForbid,
  amountFormat,
  "uploadUrl": UPLOAD_URL

};