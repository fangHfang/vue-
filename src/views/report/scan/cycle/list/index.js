import { pageBarcodeInfoPeriod } from "@/api/report/scan/code.js";
import detail from "./components/detail";
export default {
  "name": "reportScanCycleList",
  "components": {
    detail
  },
  data() {
    return {
      "toolBar": {
        "productCode": "",
        "barCode": "",
        "specDetail": "",
        "startTime": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableLoading": false,
      "dialogVisible": false,
      "currentBarCode": ""
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.toolBar.startTime = this.$moment().format("yyyy") + "-" + (parseInt(this.$moment().format("MM")) - 0);
    this.searchTableData();
  },
  "methods": {

    /**
     * 分页查询分类列表
     */
    getRemoteTableData() {
      if (!this.toolBar.startTime) {
        return this.$message.info("请选择月份");
      }
      const params = {
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size,
        "barCode": this.toolBar.barCode,
        "specDetail": this.toolBar.specDetail,
        "productCode": this.toolBar.productCode,
        "startTime": this.toolBar.startTime || ""
      };
      this.tableLoading = true;
      pageBarcodeInfoPeriod(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.warning(res.msg);
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    /**
     * 搜索按钮
     */
    searchTableData() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
     * 重置按钮
     */
    resetTableData() {
      this.toolBar.barCode = "";
      this.toolBar.specDetail = "";
      this.toolBar.productCode = "";
      this.toolBar.startTime = this.$moment().format("yyyy") + "-" + (parseInt(this.$moment().format("MM")) - 0);
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.getRemoteTableData();
    },

    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getRemoteTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getRemoteTableData();
    },

    /**
     * 跳转至查看商品
     */
    toDetail(row) {
      this.dialogVisible = true;
      this.currentBarCode = row.barcode;
    }
  }
};