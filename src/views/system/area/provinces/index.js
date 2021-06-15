import { pageSearchCityList } from "@/api/system/area/city";
import { BASIC_URL } from "@/utils/system-constant";
export default {
  "name": "County",
  data() {
    return {
      "toolBar": {
        "provinceName": "",
        "cityName": "",
        "districtName": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableLoading": false,
      // 导入导出api地址
      "importUrl": BASIC_URL + "/admin/cityDict/import",
      "exportUrl": BASIC_URL + "/admin/cityDict/export"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    // 分页查询所有区域列表
    this.listSearchCityByPage();
  },
  "methods": {
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
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
        } else {
          this.$message.error("查询失败");
        }
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
      });
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
    }
  }
};