import { rebateOrderWarehouseOut } from "@/api/business/reassure/order";
export default {
  "name": "reassureRebateList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "searchOrder": "",
        "createTime": [],
        "storeNo": "",
        "dealerNo": "",
        "vehicleCode": "",
        "barCode": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": []
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listRemoteDataByPage();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.listRemoteDataByPage();
    },
    /**
     * 重置
     */
    resetTableData() {
      this.toolBar = {
        "searchOrder": "",
        "createTime": [],
        "storeNo": "",
        "dealerNo": "",
        "vehicleCode": "",
        "barCode": ""
      };
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.$refs.store && this.$refs.store.cleanStore();
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.listRemoteDataByPage();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
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
      this.listRemoteDataByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listRemoteDataByPage();
    },

    /**
     * 分页查询列表数据
     */
    listRemoteDataByPage() {
      const params = {
        "carFrameNumber": this.toolBar.vehicleCode,
        "itemBarCode": this.toolBar.barCode,
        "pageReq": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        },
        "storeNo": this.toolBar.storeNo,
        "dealerNo": this.toolBar.dealerNo,
        "warehouseOutNo": this.toolBar.searchOrder
      };

      if (this.toolBar.createTime && this.toolBar.createTime.length > 0) {
        params.startTime = this.toolBar.createTime[0];
        params.endTime = this.toolBar.createTime[1];
      }
      this.tableLoading = true;
      rebateOrderWarehouseOut(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
      });
    },
    /**
     * 查询门店
     * @param val
     */
    storeChange(val) {
      this.toolBar.storeNo = val;
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    }
  }
};