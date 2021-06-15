// src/views/downstream/store/location/detail/index
import { detailStoreLocation, passeStoreLocation, rejectStoreLocation } from "@/api/downstream/store/location";
import Vue from "vue";
import VueAMap, { lazyAMapApiLoaderInstance } from "vue-amap";

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  "key": "41e8c897fa5a817562592a79fe35a682",
  "plugin": [
    "AMap.DistrictSearch",
    "AMap.DistrictLayer",
    "AMap.LabelsLayer",
    "AMap.Geocoder",
    "AMap.InfoWindow"
  ],
  "v": "1.4.4"
});
export default {
  "name": "approval",
  "components": {},
  data() {
    return {
      "form": {
        "address": "",
        "approveUser": "",
        "areaCode": "",
        "cityCode": "",
        "created": "",
        "customerNo": "",
        "dealerNo": "",
        "districtName": "",
        "latitude": 0,
        "longitude": 0,
        "name": "",
        "provinceCode": "",
        "remarks": "",
        "storeList": [
          {
            "storeDistance": 0,
            "storeNo": ""
          }
        ],
        "storeLocationNo": "",
        "storeName": "",
        "storeNo": "",
        "tenantNo": "",
        "title": "",
        "approveStatus": ""
      },
      "tableData": [],
      "searchData": {
        "pageReq": {
          "pageNum": 1,
          "pageSize": 10
        }
      },
      "total": 0,
      "loading": false,
      // 地图相关
      "mapVue": null,
      "mapLoading": false,
      "marker": null,
      "refuseDialog": false,
      "remarks": ""
    };
  },
  "computed": {
    customerNo() {
      return this.$store.state.storeLocationApproval.customerNo;
    },
    storeLocationNo() {
      return this.$store.state.storeLocationApproval.storeLocationNo;
    },
    approveStatus() {
      return this.$store.state.storeLocationApproval.approveStatus;
    }
  },
  created() {
    // this.initAMap();
  },
  mounted() {
    this.getStoreLocationDetail();
  },
  "methods": {
    /**
     * 初始化地图
     */
    initAMap() {
      const that = this;
      let { latitude, longitude } = this.form;
      latitude = latitude && latitude !== 0 ? latitude : 121.46;
      longitude = longitude && longitude !== 0 ? longitude : 31.20;
      that.mapLoading = true;
      lazyAMapApiLoaderInstance.load().then(() => {
        that.mapVue = new AMap.Map("aMapId", {
          "center": [ longitude, latitude ],
          "zoom": 11,
          "defaultCursor": "pointer",
          "viewMode": "2D",
          "resizeEnable": true
        });
        that.mapLoading = false;
        that.mapVue.on("complete", function() {
          that.marker = new AMap.Marker({
            "map": that.mapVue,
            "position": [ longitude, latitude ]
          });
          that.mapVue.plugin([ "AMap.Scale" ], function() {
            const scale = new AMap.Scale({
              "visible": true
            });
            that.mapVue.addControl(scale);
          });
          that.mapLoading = false;
        });
      }).catch(() => {
        console.log("加载地图失败");
      });
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.searchData.pageSize = val;
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageIndex = val;
    },
    /**
     * 获取门店定位详情
     */
    getStoreLocationDetail() {
      const params = "customerNo=" + this.customerNo + "&storeLocationNo=" + this.storeLocationNo;
      detailStoreLocation(params).then(res => {
        if (res.code === 200) {
          this.form = res.data;
          this.form.addressDetail = (res.data.districtName || "").split("/").join("") + res.data.address;
          this.tableData = res.data.storeList;
          this.initAMap();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 审核通过
     */
    approveSuccess() {
      const params = {
        "approveStatus": 1,
        "customerNo": this.customerNo,
        "storeLocationNo": this.storeLocationNo
      };
      passeStoreLocation(params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.close();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 审核驳回
     */
    approveFailed() {
      if (!this.remarks) {
        return this.$message.info("请输入驳回原因!!!");
      }
      const params = {
        "approveStatus": 1,
        "customerNo": this.customerNo,
        "storeLocationNo": this.storeLocationNo,
        "remarks": this.remarks
      };
      rejectStoreLocation(params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.refuseDialog = false;
          this.close();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    /**
     * 返回列表页
     */
    close() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.push({ "path": "/downstream/store/approval/list", "query": { "r": this.$getRandomValue() } });
      }).catch(() => { });
    },
    /**
     * 驳回
     */
    closedDialog() {
      this.refuseDialog = false;
    }
  }
};
