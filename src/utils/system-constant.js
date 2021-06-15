// 系统常量
// 打包生产环境使用下面的配置，不走api转发
export const BASE_URL = "https://test.mall.maxxis.com.cn/api"; // 测试环境
// export const BASE_URL = "https://mall.maxxis.com.cn/api"; //生产环境
// 用户模块
export const USER_URL = BASE_URL + "/user";
// item模块
export const ITEM_URL = BASE_URL + "/item";
// 基础模块
export const BASIC_URL = BASE_URL + "/basic";
// bbs模块
export const BBS_URL = BASE_URL + "/bbs";
// 贸易模块
export const TRADE_URL = BASE_URL + "/trade";
// 市场模块
export const MARKET_URL = BASE_URL + "/market";

// 特殊：文件上传 接口路径
export const UPLOAD_URL = BASIC_URL + "/admin/oss/upload";

// 订单状态
export const ORDER_STATUS_OPTIONS = [
  { "value": 0, "label": "待付款" },
  { "value": 1, "label": "待收货" },
  { "value": 2, "label": "部分收货" },
  { "value": 3, "label": "已完成" },
  { "value": 4, "label": "强制收货" },
  { "value": 5, "label": "已退款" },
  { "value": 6, "label": "已关闭" }
];

// 支付渠道
export const PAY_CHANNEL_OPTIONS = [
  { "value": 1, "label": "微信支付" }, // 勿删，已做处理
  { "value": 2, "label": "微信支付" },
  { "value": 3, "label": "支付宝支付" },
  { "value": 4, "label": "银联支付" },
  { "value": 5, "label": "大额支付" },
  { "value": 6, "label": "线下支付" },
  { "value": 7, "label": "积分支付" },
  { "value": 8, "label": "兑换点支付" },
  { "value": 9, "label": "信用支付" }
];

// 支付状态
export const PAY_STATUS_OPTIONS = [
  { "value": 0, "label": "待支付" },
  { "value": 1, "label": "已支付" },
  { "value": 2, "label": "已退款" }
];

// 入库状态
export const IN_STORAGE_STATUS_OPTIONS = [
  { "value": 0, "label": "不需要扫码" },
  { "value": 1, "label": "未扫码" },
  { "value": 2, "label": "部分扫码" },
  { "value": 3, "label": "扫码完成" }
];

// 退货状态
export const RETURN_GOODS_STATUS_OPTIONS = [
  { "value": 0, "label": "未退货" },
  { "value": 1, "label": "部分退货" },
  { "value": 2, "label": "已退货" }
];

// 提现状态
export const ORDER_WITHDRAW_STATUS_OPTIONS = [
  { "label": "无法提现", "value": 0 },
  { "label": "待提现", "value": 1 },
  { "label": "提现中", "value": 2 },
  { "label": "提现驳回", "value": 3 },
  { "label": "提现汇款中", "value": 4 },
  { "label": "提现完成", "value": 5 },
  { "label": "提现冻结", "value": 6 }
];