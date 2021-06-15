import { pageSearchCityList } from "@/api/system/area/city";
export default {
  "name": "AreaRegionConfig",
  data() {
    return {
      "toolBar": {
        "provinceName": "",
        "cityName": "",
        "districtName": "",
        "class": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" }
          ]
        },
        "brand": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false
    };
  },
  "computed": {},
  mounted() {
    // 分页查询所有区域列表
    this.listSearchCityByPage();
  },
  "methods": {
    /**
     * 搜索按钮查询
     */
    searchCityListByPage() {
      this.pagination.current = 1;
      this.listSearchCityByPage();
    },

    /**
     * 分页查询所有省市区列表
     */
    listSearchCityByPage() {
      this.tableLoading = true;
      const params = {
        "provinceName": this.toolBar.provinceName,
        "cityName": this.toolBar.cityName,
        "districtName": this.toolBar.districtName,
        "request": {
          "field": "",
          "order": "",
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        }
      };
      pageSearchCityList(params).then(res => {
        this.tableData = res.data.records;
        this.pagination.total = res.data.total;
        this.tableLoading = false;
      }).catch(() => {});
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listSearchCityByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listSearchCityByPage();
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};