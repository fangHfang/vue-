import { getAllCityData } from "@/api/report/city";
import Vue from "vue";
import VueAMap, { lazyAMapApiLoaderInstance } from "vue-amap";
import { regionData, CodeToText } from "element-china-area-data";
import { handleLabelsData, districts } from "./data";
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
  "name": "reportMapList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "dealerNo": "",
        "dataRange": [],
        "storeNo": "",
        "area": "",
        "selectArea": []
      },
      "areaOptions": regionData,
      // 地图相关
      "mapVue": null,
      "mapLoading": false,
      "disCountry": null,
      "disProvince": null,
      "infoWindow": null,
      "allCityData": null,
      "layer": null
    };
  },
  "computed": {
  },
  created() {
    this.getAllCity();
  },
  mounted() {
  },
  "methods": {
    /**
     * 搜索
     */
    searchData() {

    },
    storeChange(val) {
      this.toolBar.storeNo = val;
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    },
    /**
     * 初始化全国行政地图
     */
    initAMap() {
      const that = this;
      that.mapLoading = true;
      lazyAMapApiLoaderInstance.load().then(() => {
        that.disCountry = new AMap.DistrictLayer.Country({
          "zIndex": 10,
          "SOC": "CHN",
          "depth": 1,
          "styles": {
            "nation-stroke": "#fff",
            "coastline-stroke": "#fff",
            "province-stroke": "#fff",
            "fill": "#908D8E"
          }
        });

        that.mapVue = new AMap.Map("aMapId", {
          "zooms": [ 4, 15 ],
          "center": [ 106.122082, 33.719192 ],
          "zoom": 4,
          "doubleClickZoom": false,
          "isHotspot": false,
          "defaultCursor": "pointer",
          "viewMode": "2D",
          "layers": [
            that.disCountry
          ],
          "resizeEnable": true
        });
        that.mapLoading = false;
        that.mapVue.on("complete", function() {
          that.layer = new AMap.LabelsLayer({
            "collision": false,
            "animation": true
          });
          const labelsData = handleLabelsData(districts);
          for (let i = 0;i < labelsData.length;i++) {
            const labelsMarker = new AMap.LabelMarker(labelsData[i]);
            that.layer.add(labelsMarker);
          }
          that.mapVue.add(that.layer);
          that.mapLoading = false;
          that.addMapEvent();
        });
      }).catch(() => {
        console.log("加载地图失败");
      });
    },
    /**
     * 添加地图事件
     */
    addMapEvent() {
      this.mapVue.on("click", this.handleMapClick);
      this.mapVue.on("contextmenu", this.handleMapContextMenu);
    },
    /**
     * 地图右击事件
     * @param e
     */
    handleMapContextMenu(e) {
      const currentProps = this.disCountry.getDistrictByContainerPos(e.pixel);
      const currentPropsCity = this.disProvince && this.disProvince.getDistrictByContainerPos(e.pixel);
      if (currentProps) {
        // 重置行政区样式
        this.disCountry.setStyles({
          "nation-stroke": "#fff",
          "coastline-stroke": "#fff",
          "province-stroke": "#fff",
          "fill": function(props) {
            return props.adcode === currentProps.adcode ? "#ED6D00" : "#908D8E";
          }
        });
        this.regeoCode(e.lnglat, "province");
      } else if (currentPropsCity) {
        // 重置行政区样式
        this.disProvince.setStyles({
          "nation-stroke": "#fff",
          "coastline-stroke": "#fff",
          "province-stroke": "#fff",
          "fill": function(props) {
            return props.adcode === currentPropsCity.adcode ? "#ED6D00" : "#908D8E";
          }
        });
        this.regeoCode(e.lnglat, currentPropsCity.level);
      }
    },
    /**
     * 地图单击事件
     * @param e
     */
    handleMapClick(e) {
      const lnglat = [ e.lnglat.lng, e.lnglat.lat ];
      const currentProps = this.disCountry.getDistrictByContainerPos(e.pixel);
      const currentPropsCity = this.disProvince && this.disProvince.getDistrictByContainerPos(e.pixel);
      if (!currentProps && !currentPropsCity) return;
      // 到区级不需要再去往下执行了
      if (currentPropsCity && currentPropsCity.level === "district") return;
      this.infoWindow && this.infoWindow.close();
      this.mapVue.remove(this.layer);
      this.disCountry && this.disCountry.setMap(null);
      this.disProvince && this.disProvince.setMap(null);
      if (currentProps) {
        this.disProvince = new AMap.DistrictLayer.Province({
          "zIndex": 12,
          "adcode": [ currentProps.adcode ],
          "depth": 1,
          "styles": {
            "fill": "#908D8E",
            "province-stroke": "#fff",
            "city-stroke": "#fff",
            "county-stroke": "rgba(255,255,255,0)"
          }
        });
        this.disProvince.setMap(this.mapVue);
        this.mapVue.setZoom(6);
        this.mapVue.setCenter(lnglat);
        this.layer = new AMap.LabelsLayer({
          "collision": false,
          "animation": true
        });
        const labelsData = handleLabelsData(this.allCityData.filter(x => parseInt(x.adcode) === currentProps.adcode)[0].districts);
        for (let i = 0;i < labelsData.length;i++) {
          const labelsMarker = new AMap.LabelMarker(labelsData[i]);
          this.layer.add(labelsMarker);
        }
        this.mapVue.add(this.layer);
      } else if (currentPropsCity) {
        this.disProvince = new AMap.DistrictLayer.Province({
          "zIndex": 12,
          "adcode": [ currentPropsCity.adcode ],
          "depth": 2,
          "styles": {
            "fill": "#908D8E",
            "province-stroke": "#fff",
            "city-stroke": "#fff",
            "county-stroke": "#fff"
          }
        });
        this.disProvince.setMap(this.mapVue);
        this.mapVue.setZoom(9);
        this.mapVue.setCenter(lnglat);
        this.layer = new AMap.LabelsLayer({
          "collision": false,
          "animation": true
        });
        const cityList = this.allCityData.filter(x => parseInt(x.adcode) === currentPropsCity.adcode_pro)[0].districts;
        if (!cityList) return;
        const labelsData = handleLabelsData(cityList.filter(x => parseInt(x.adcode) === currentPropsCity.adcode)[0].districts);
        for (let i = 0;i < labelsData.length;i++) {
          const labelsMarker = new AMap.LabelMarker(labelsData[i]);
          this.layer.add(labelsMarker);
        }
        this.mapVue.add(this.layer);
      }
    },
    /**
     * 地址逆解析
     * @lnglat 经纬度
     * @level 显示级别
     */
    regeoCode(lnglat, level) {
      const geocoder = new AMap.Geocoder({
        "city": "全国",
        "radius": 500
      });
      let location = [ 125, 27 ];
      if (level === "city") {
        location = [ lnglat.lng + 5, lnglat.lat ];
      } else if (level === "district") {
        location = [ lnglat.lng + 2, lnglat.lat ];
      }
      geocoder.getAddress(lnglat, (status, result) => {
        if (status === "complete" && result.regeocode) {
          const addressComponent = result.regeocode.addressComponent;
          const info = {
            ...addressComponent,
            "storeNum": 1111,
            "saleNum": 253586.00,
            location
          };
          this.openInfo(info, level);
        } else {
          console.error("根据经纬度查询地址失败");
        }
      });
    },
    /**
     * 地图信息窗体
     */
    openInfo(info, level) {
      const infoString = `
        <div class="content-window-card">
          <p class="info-p">省：${info.province || "/"}</p>
          <p class="info-p">市：${level !== "province" ? (info.city || "/") : "/"}</p>
          <p class="info-p">区：${level === "district" ? (info.district || "/") : "/"}</p>
          <p class="info-p">门店数量：${info.storeNum || "/"}</p>
          <p class="info-p">分布销量：<a id="toDetail">${info.saleNum || "/"}</a></p>
        </div>
      `;
      this.infoWindow = new AMap.InfoWindow({
        "anchor": "middle-left",
        "content": infoString
      });
      this.infoWindow.open(this.mapVue, info.location);
      setTimeout(() => {
        this.toDetail();
      }, 100);
    },
    /**
     * 选择省市区
     * @param arr
     */
    handleAreaChange(arr) {
      const addressArr = [];
      arr.forEach(x => {
        addressArr.push(CodeToText[x]);
      });
      console.log(addressArr);
    },
    /**
     * 打开详情
     */
    toDetail() {
      document.getElementById("toDetail").onclick = () => {
        const id = 1;
        this.$router.push({ "path": "/report/map/detail/" + id });
      };
    },
    /**
     * 重置
     */
    reset() {
      this.$router.replace({
        "path": this.$route.path,
        "query": { "r": this.$getRandomValue() }
      });
    },
    /**
     * 获取全国行政区域数据
     */
    getAllCity() {
      const params = "keywords=&subdistrict=3&extensions=base&key=27e6df55e8d74e8149d5d135ffd0e82a";
      getAllCityData(params).then((res) => {
        this.allCityData = this.getTreeData(res.data.districts[0].districts);
        this.initAMap();
      }).catch(() => {
        console.log("加载全国行政数据失败");
      });
    },
    /**
     * 递归处理末尾项districts为0的空项
     * @param data
     * @returns {*}
     */
    getTreeData(data) {
      for (let i = 0;i < data.length;i++) {
        if (data[i].districts.length < 1) {
          data[i].districts = undefined;
        } else {
          this.getTreeData(data[i].districts);
        }
      }
      return data;
    }
  }
};