import Vue from "vue";
import VueAMap, { lazyAMapApiLoaderInstance } from "vue-amap";
import { regionData } from "element-china-area-data";
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
  "name": "AppPageAddLocation",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {
      "options": regionData,
      "selectedOptions": [],
      "mapLocation": {
        "address": undefined,
        "longAddress": "",
        "coordinate": undefined,
        "range": ""
      },
      // 地图相关
      "mapVue": null,
      "mapLoading": false,
      "marker": null,
      "district": null,
      "cdCode": 100000,
      "scaleOptions": [
        {
          "label": 10,
          "value": 20
        },
        {
          "label": 20,
          "value": 19
        },
        {
          "label": 50,
          "value": 18
        },
        {
          "label": 100,
          "value": 17
        },
        {
          "label": 200,
          "value": 16
        },
        {
          "label": 500,
          "value": 14
        },
        {
          "label": 1000,
          "value": 13
        }
      ]
    };
  },
  "computed": {},
  mounted() {
  },
  "watch": {
    dialogVisible(val) {
      if (val && !this.mapVue) {
        setTimeout(() => {
          this.initAMap();
        }, 500);
      }
    }
  },
  "methods": {
    /**
     * 选择省市区
     */
    handleChange(arr) {
      this.cdCode = arr[2];
      this.getDistrictData(this.cdCode);
    },
    /**
     * 初始化地图
     */
    initAMap() {
      const that = this;
      that.mapLoading = true;
      lazyAMapApiLoaderInstance.load().then(() => {
        that.mapVue = new AMap.Map("aMapId", {
          "center": [ 121.46, 31.20 ],
          "zoom": 11,
          "defaultCursor": "pointer",
          "viewMode": "2D",
          "resizeEnable": true
        });
        that.mapLoading = false;
        that.mapVue.on("complete", function() {
          that.marker = new AMap.Marker({
            "map": that.mapVue,
            "position": [ 121.46, 31.20 ]
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
     * 定位到输入的行政区域
     * @param adCode 行政代码
     */
    getDistrictData(adCode) {
      const that = this;
      that.district = new AMap.DistrictSearch({
        "showbiz": false,
        "subdistrict": 0
      });
      that.district.search(adCode, function(status, result) {
        if (status === "complete") {
          const center = result.districtList[0].center;
          that.marker.setPosition(center);
          that.mapVue.setCenter(center);
          that.mapVue.setZoom(12);
        }
      });
    },
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
     * 输入详细地址
     * @param {*} item 详细地址
     */
    handleSelect(item) {
      const center = item.location;
      this.marker.setPosition(center);
      this.mapVue.setCenter(center);
      this.mapVue.setZoom(14);
      this.mapLocation.longAddress = item.district + item.name;
      this.mapLocation.coordinate = item.location;
    },
    /**
     * 比例尺范围选择
     * @param val
     */
    scaleChange(val) {
      const find = this.scaleOptions.find(x => x.label === val);
      if (find) {
        this.mapVue.setZoom(find.value);
      }
    },
    save() {
      this.$emit("selectLocation", this.mapLocation);
      this.close();
    },
    close() {
      this.$emit("update:dialogVisible", false);
    }
  }
};