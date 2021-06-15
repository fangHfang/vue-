import { regionData, CodeToText } from "element-china-area-data";
export default {
  "name": "reportMapDetail",
  "components": {
  },
  data() {
    return {
      "areaOptions": regionData,
      "openAdvancedSearch": false,
      "toolBar": {
        "distributor": "",
        "dataRange": [],
        "store": "",
        "selectArea": [],
        "type": {
          "value": "",
          "options": [
            { "label": "分类1", "value": "1" },
            { "label": "分类2", "value": "2" },
            { "label": "分类3", "value": "3" }
          ]
        },
        "brand": {
          "value": "",
          "options": [
            { "label": "品牌1", "value": "1" },
            { "label": "品牌2", "value": "2" },
            { "label": "品牌3", "value": "3" }
          ]
        },
        "tag": {
          "value": "",
          "options": [
            { "label": "标签1", "value": "1" },
            { "label": "标签2", "value": "2" },
            { "label": "标签3", "value": "3" }
          ]
        },
        "name": "",
        "pattern": {
          "value": "",
          "options": [
            { "label": "花纹1", "value": "1" },
            { "label": "花纹2", "value": "2" },
            { "label": "花纹3", "value": "3" }
          ]
        },
        "size": {
          "value": "",
          "options": [
            { "label": "尺寸1", "value": "1" },
            { "label": "尺寸2", "value": "2" },
            { "label": "尺寸3", "value": "3" }
          ]
        },
        "code": ""
      },
      "tableData": [
        {
          "distributorCode": "3584665465646",
          "distributorName": "xxxxx经销商",
          "storeName": "xxxxx公司",
          "storeCode": "123456125",
          "address": "上海市杨浦区大学路1232号",
          "area": "杨浦区",
          "remark": "这是备注这是备注这是备注这是备注这是备注这是备注",
          "createdTime": "2021-01-12 13:25:58",
          "contact": "张三",
          "tel": "13913471258",
          "state": 0,
          "sale": 100
        },
        {
          "distributorCode": "3584665465646",
          "distributorName": "xxxxx经销商",
          "storeName": "xxxxx公司",
          "storeCode": "123456125",
          "address": "上海市杨浦区大学路1232号",
          "area": "杨浦区",
          "remark": "这是备注这是备注这是备注这是备注这是备注这是备注",
          "createdTime": "2021-01-12 13:25:58",
          "contact": "张三",
          "tel": "13913471258",
          "state": 0,
          "sale": 100
        },
        {
          "distributorCode": "3584665465646",
          "distributorName": "xxxxx经销商",
          "storeName": "xxxxx公司",
          "storeCode": "123456125",
          "address": "上海市杨浦区大学路1232号",
          "area": "杨浦区",
          "remark": "这是备注这是备注这是备注这是备注这是备注这是备注",
          "createdTime": "2021-01-12 13:25:58",
          "contact": "张三",
          "tel": "13913471258",
          "state": 1,
          "sale": 100
        },
        {
          "distributorCode": "3584665465646",
          "distributorName": "xxxxx经销商",
          "storeName": "xxxxx公司",
          "storeCode": "123456125",
          "address": "上海市杨浦区大学路1232号",
          "area": "杨浦区",
          "remark": "这是备注这是备注这是备注这是备注这是备注这是备注",
          "createdTime": "2021-01-12 13:25:58",
          "contact": "张三",
          "tel": "13913471258",
          "state": 1,
          "sale": 100
        },
        {
          "distributorCode": "3584665465646",
          "distributorName": "xxxxx经销商",
          "storeName": "xxxxx公司",
          "storeCode": "123456125",
          "address": "上海市杨浦区大学路1232号",
          "area": "杨浦区",
          "remark": "这是备注这是备注这是备注这是备注这是备注这是备注",
          "createdTime": "2021-01-12 13:25:58",
          "contact": "张三",
          "tel": "13913471258",
          "state": 1,
          "sale": 100
        },
        {
          "distributorCode": "3584665465646",
          "distributorName": "xxxxx经销商",
          "storeName": "xxxxx公司",
          "storeCode": "123456125",
          "address": "上海市杨浦区大学路1232号",
          "area": "杨浦区",
          "remark": "这是备注这是备注这是备注这是备注这是备注这是备注",
          "createdTime": "2021-01-12 13:25:58",
          "contact": "张三",
          "tel": "13913471258",
          "state": 0,
          "sale": 100
        },
        {
          "distributorCode": "3584665465646",
          "distributorName": "xxxxx经销商",
          "storeName": "xxxxx公司",
          "storeCode": "123456125",
          "address": "上海市杨浦区大学路1232号",
          "area": "杨浦区",
          "remark": "这是备注这是备注这是备注这是备注这是备注这是备注",
          "createdTime": "2021-01-12 13:25:58",
          "contact": "张三",
          "tel": "13913471258",
          "state": 0,
          "sale": 100
        },
        {
          "distributorCode": "3584665465646",
          "distributorName": "xxxxx经销商",
          "storeName": "xxxxx公司",
          "storeCode": "123456125",
          "address": "上海市杨浦区大学路1232号",
          "area": "杨浦区",
          "remark": "这是备注这是备注这是备注这是备注这是备注这是备注",
          "createdTime": "2021-01-12 13:25:58",
          "contact": "张三",
          "tel": "13913471258",
          "state": 0,
          "sale": 100
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      }
    };
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    /**
     * 选择省市区
     * @param arr
     */
    handleAreaChange(arr) {
      console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
    },
    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    }
  }
};