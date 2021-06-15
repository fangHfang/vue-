// /views/system/area/region/detail/index
import { queryCityDictByRegion, getRegionDictByRegionNo } from "@/api/system/area/area";

export default {
  "name": "AreaRegionDetail",
  "components": {
  },
  data() {
    return {
      "form": {
        "name": "",
        "description": ""
      },
      "toolBar": {
        "name": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableDetailShow": true,
      "tableLoading": false,
      "dialogVisible": false
    };
  },
  "computed": {
    regionNo() {
      return this.$store.state.systemAreaRegion.regionNo;
    }
  },
  mounted() {
    this.getRegionDictDetail();
    // this.listRegionDictByPage();
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listRegionDictByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listRegionDictByPage();
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
    },

    /**
     * 控制表格显示
     */
    tableFontClick() {
      this.tableDetailShow = !this.tableDetailShow;
    },

    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },

    /**
     * 查询区域详情
     */
    getRegionDictDetail() {
      const params = {
        "regionNo": this.regionNo
      };
      getRegionDictByRegionNo(params).then(res => {
        if (res.code === 200) {
          this.form.name = res.data.name;
          this.form.description = res.data.description;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 分页查询分类列表
     */
    listRegionDictByPage() {
      this.tableLoading = true;
      // 请求参数
      const params = {
        "regionNo": this.regionNo,
        "name": this.toolBar.name
      };
      queryCityDictByRegion(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data;
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 搜索按钮
     */
    searchRegionDict() {
      this.pagination.current = 1;
      this.listRegionDictByPage();
    }
  }
};