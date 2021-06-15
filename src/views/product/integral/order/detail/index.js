import { searchList, modifyIntegral, modifyAddress } from "@/api/product/integral/order";
import { regionData, CodeToText } from "element-china-area-data";
import Vue from "vue";
import VueAMap from "vue-amap";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  "key": "41e8c897fa5a817562592a79fe35a682",
  "plugin": [
    "AMap.Geocoder",
    "AMap.DistrictSearch",
    "AMap.Autocomplete",
    "AMap.Scale"
  ],
  "v": "1.4.4"
});
export default {
  "name": "ProductIntegralOrderDetail",
  "components": {
  },
  data() {
    return {
      "options": regionData,
      "detail": {
        "state": 0,
        "orderNo": "玛吉斯大同路门店",
        "applicant": "用户2201",
        "orderTime": "2016-09-21 08:50:08",
        "productNumber": "15346453153453453",
        "commoditySubletting": "门店标签",
        "backClassification": "-12",
        "productName": "54654645378",
        "productSpec": "M123456",
        "productBrand": "玛吉斯大运河路门店",
        "receiveName": "",
        "receiveAddress": "",
        "orderReceiveStatus": "",
        "payChannel": "",
        "orderTotalQuantity": "",
        "orderDetailList": [],
        "courierNo": ""
      },
      "toolBar": {
        "state": 0,
        "name": "",
        "dealer": "",
        "brand": ""
      },
      "orderNo": this.$route.query.orderNo,
      "isModifyAddress": false,
      "isModifyOrder": false,
      "selectedOptions": [],
      "province": "",
      "city": "",
      "area": ""
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.searchList();
  },
  "methods": {
    /**
     * 选择省市区
     */
    handleChange(arr) {
      this.province = CodeToText[arr[0]];
      this.city = CodeToText[arr[1]] !== "市辖区" ? CodeToText[arr[1]] : "";
      this.area = CodeToText[arr[2]];
    },
    /**
     * 详细地址模糊查询
     * @param queryString
     * @param cb
     */
    querySearch(queryString, cb) {
      const that = this;
      const autoOptions = {
        "city": that.cdCode
      };
      if (queryString) {
        const autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(queryString, (status, result) => {
          if (status === "complete") {
            const data = result.tips.filter(v => v.id).map(x => { return { ...x, "value": x.name }; });
            cb(data);
          }
        });
      } else {
        cb(null);
      }
    },
    /**
     * 查询详情
     */
    searchList() {
      const params = {
        "orderNo": this.orderNo
      };
      searchList(params).then((res) => {
        if (res.code === 200) {
          this.detail = res.data;
        }
      }).catch(() => {

      });
    },
    /**
     * 修改地址或单号
     * @param text -- 'address'地址 -- 'order'单号
     */
    modify(text) {
      if (text === "address") {
        this.isModifyAddress = true;
        this.detail.receiveAddress = "";
      } else {
        this.isModifyOrder = true;
      }
    },
    /**
     * 取消修改地址或单号
     * @param text -- 'address'地址 -- 'order'单号
     */
    close(text) {
      if (text === "address") {
        this.isModifyAddress = false;
      } else {
        this.isModifyOrder = false;
      }
      this.searchList();
    },
    /**
     * 保存修改地址或单号
     * @param text -- 'address'地址 -- 'order'单号
     */
    save(text) {
      if (text === "address") {
        const params = {
          "orderNo": this.orderNo,
          "province": this.province,
          "city": this.city,
          "area": this.area,
          "address": this.detail.receiveAddress
        };
        modifyAddress(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("修改成功!");
            this.isModifyAddress = false;
            this.searchList();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      } else {
        const orderNoList = [];
        orderNoList.push(this.orderNo);
        const params = {
          "courierNo": this.detail.courierNo,
          "flag": false,
          "orderNoList": orderNoList
        };
        modifyIntegral(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("修改成功!");
            this.isModifyOrder = false;
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      }
    },
    /**
     * 发货
     */
    submitDeliver() {
      if (this.detail.courierNo === "" || this.detail.courierNo === null) {
        return this.$message.info("快递单号不能为空");
      }
      const orderNoList = [];
      orderNoList.push(this.orderNo);
      const params = {
        "courierNo": this.detail.courierNo,
        "flag": false,
        "orderNoList": orderNoList
      };
      modifyIntegral(params).then(res => {
        if (res.code === 200) {
          this.$message.success("发货成功!");
          this.$router.back();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    }

  }
};