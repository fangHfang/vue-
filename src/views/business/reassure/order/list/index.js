import { pageOrderWarehouseOut, detailOrderWarehouseOut } from "@/api/business/reassure/order";
export default {
  "name": "reassureOrderList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "searchOrder": "",
        "orderState": {
          "value": "",
          "options": [
            { "label": "已激活", "value": 1 },
            { "label": "待审批", "value": 2 },
            { "label": "已拒绝", "value": 3 }
          ]
        },
        "rebateState": {
          "value": "",
          "options": [
            { "label": "不需要", "value": 0 },
            { "label": "未获得", "value": 1 },
            { "label": "已获得", "value": 2 }
          ]
        },
        "createTime": [],
        "storeNo": "",
        "ownerPhone": "",
        "licensePlate": "",
        "dealerNo": "",
        "vehicleCode": ""
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
      "multipleSelection": [],
      "searchDetailShow": true
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
    // 下拉箭头是否显示
    getRowClass(row, rowIndex) {
      const data = row.row;
      const res = [];
      if (data.list && data.list.length > 0) {
        res.push("row-expand-has");
        return res;
      }
      res.push("row-expand-unhas");
      return res;
    },
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
        "orderState": {
          "value": "",
          "options": [
            { "label": "已激活", "value": 1 },
            { "label": "待审批", "value": 2 },
            { "label": "已拒绝", "value": 3 }
          ]
        },
        "rebateState": {
          "value": "",
          "options": [
            { "label": "不需要", "value": 0 },
            { "label": "未获得", "value": 1 },
            { "label": "已获得", "value": 2 }
          ]
        },
        "createTime": [],
        "storeNo": "",
        "ownerPhone": "",
        "licensePlate": "",
        "dealerNo": "",
        "vehicleCode": ""
      };
      this.$refs.store && this.$refs.store.cleanStore();
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.listRemoteDataByPage();
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
        "carNumber": this.toolBar.licensePlate,
        "dealerNo": this.toolBar.dealerNo,
        "mobile": this.toolBar.ownerPhone,
        "pageReq": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        },
        "rebateType": this.toolBar.rebateState.value,
        "status": this.toolBar.orderState.value,
        "storeNo": this.toolBar.storeNo,
        "warehouseOutNo": this.toolBar.searchOrder
      };

      if (this.toolBar.createTime && this.toolBar.createTime.length > 0) {
        params.startTime = this.toolBar.createTime[0];
        params.endTime = this.toolBar.createTime[1];
      }
      this.tableLoading = true;
      pageOrderWarehouseOut(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records.map(x => {
            return {
              ...x,
              "loading": false
            };
          });
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
       * 控制表格显示
       */
    tableFontClick() {
      this.searchDetailShow = !this.searchDetailShow;
    },
    toogleExpand(row) {
      const $table = this.$refs.table;
      if (!row.tableData) {
        this.getTableDetail(row).then(res => {
          row.tableData = res;
          row.loading = false;
          $table.toggleRowExpansion(row);
        });
      } else {
        $table.toggleRowExpansion(row);
      }
    },
    /**
     * 获取表格详情
     */
    async getTableDetail(row) {
      // row.loading = true;
      const params = {
        "pageReq": {
          "pageNum": 0,
          "pageSize": 100
        },
        "warehouseOutNo": row.warehouseOutNo
      };
      const res = await detailOrderWarehouseOut(params);
      if (res.code === 200) {
        return res.data.records;
      }
      this.$message.error(res.msg);
    },
    /**
     * 查询门店
     * @param val
     */
    storeChange(val) {
      this.toolBar.storeNo = val;
    },
    /**
     * 查询经销商
     * @param val
     */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    }
  }
};