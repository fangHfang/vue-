import { listScanCodeByPage } from "@/api/report/scan/code";
import { TRADE_URL } from "@/utils/system-constant";
export default {
  "name": "reportScanCodeList",
  "components": {

  },
  data() {
    return {
      "toolBar": {
        "date": "",
        "itemBarCode": "",
        "dealerNo": "",
        "storeNo": "",
        "scanCodeNature": {
          "value": "",
          "options": [
            { "label": "是", "value": "0" },
            { "label": "否", "value": "1" }
          ]
        },
        "scanCodeType": {
          "value": "",
          "options": [
            { "label": "扫码入库", "value": "0" },
            { "label": "扫码出库", "value": "1" }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "tableLoading": false,
      "dialogVisible": false,
      "importUrl": "",
      "exportUrl": TRADE_URL + "/admin/scan/code/export"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportGetData() {
      const { itemBarCode, scanCodeNature, scanCodeType, storeNo, dealerNo, date = "" } = this.toolBar;
      const params = {
        "pageReq": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        },
        "scanCodeNature": scanCodeNature.value,
        "scanCodeType": scanCodeType.value,
        itemBarCode,
        storeNo,
        dealerNo
      };
      if (date) {
        params.startDate = this.$moment(date[0]).format("yyyy-MM-DD HH:mm:ss");
        params.endDate = this.$moment(date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      console.log(params);
      return {
        ...params
      };
    }
  },
  mounted() {
    this.getRemoteTableData();
  },
  "methods": {

    /**
         * 分页查询分类列表
         */
    getRemoteTableData() {
      this.tableLoading = true;
      const { itemBarCode, scanCodeNature, scanCodeType, storeNo, dealerNo, date = "" } = this.toolBar;
      const params = {
        "pageReq": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        },
        "scanCodeNature": scanCodeNature.value,
        "scanCodeType": scanCodeType.value,
        itemBarCode,
        storeNo,
        dealerNo
      };
      if (date) {
        params.startDate = this.$moment(date[0]).format("yyyy-MM-DD HH:mm:ss");
        params.endDate = this.$moment(date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      listScanCodeByPage(params).then((res) => {
        if (res.code === 200) {
          this.tableData = (res.data && res.data.records) || [];
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
      }).catch((err) => {
        console.log(err, "err");
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
      this.toolBar.date = "";
      this.toolBar.itemBarCode = "";
      this.toolBar.scanCodeNature.value = "";
      this.toolBar.scanCodeType.value = "";
      this.toolBar.dealerNo = "";
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.$refs.store && this.$refs.store.cleanStore();
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
         * 选择经销商
         */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    },

    /**
         * 选择门店
         */
    storeChange(val) {
      this.toolBar.storeNo = val;
    }
  }
};