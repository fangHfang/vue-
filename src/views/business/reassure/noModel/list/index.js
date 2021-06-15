import { updateApprovalOrderWarehouseOut, updateModelOrderWarehouseOut, approvalOrderWarehouseOut } from "@/api/business/reassure/order";
import supplementVehicle from "../supplement/index.vue";
export default {
  "name": "reassureNoModelList",
  "components": {
    supplementVehicle
  },
  data() {
    return {
      "toolBar": {
        "searchOrder": "",
        "examineState": {
          "value": "",
          "options": [
            { "label": "未审批", "value": 1 },
            { "label": "审批通过", "value": 2 },
            { "label": "审批拒绝", "value": 3 }
          ]
        },
        "createTime": [],
        "storeNo": "",
        "ownerPhone": "",
        "licensePlate": "",
        "storeNo": "",
        "dealerNo": ""
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
      "currentRow": {},
      "dialogTitle": ""
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "watch": {
    dialogVisible(val) {
      if (!val) {
        setTimeout(() => {
          this.currentRow = {};
        }, 500);
      }
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
        "examineState": {
          "value": "",
          "options": [
            { "label": "未审批", "value": 1 },
            { "label": "审批通过", "value": 2 },
            { "label": "审批拒绝", "value": 3 }
          ]
        },
        "createTime": [],
        "storeNo": "",
        "ownerPhone": "",
        "licensePlate": ""
      };
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.$refs.store && this.$refs.store.cleanStore();
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
        "mobile": this.toolBar.ownerPhone,
        "carNumber": this.toolBar.licensePlate,
        "pageReq": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        },
        "storeNo": this.toolBar.storeNo,
        "dealerNo": this.toolBar.dealerNo,
        "warehouseOutNo": this.toolBar.searchOrder,
        "approvalStatus": this.toolBar.examineState.value
      };

      if (this.toolBar.createTime && this.toolBar.createTime.length > 0) {
        params.startTime = this.toolBar.createTime[0];
        params.endTime = this.toolBar.createTime[1];
      }
      this.tableLoading = true;
      approvalOrderWarehouseOut(params).then(res => {
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
    agreement(row) {
      this.$confirm("是否确定同意？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.changeApprovalStatus(row, 2);
      }).catch(() => {});
    },
    refuse(row) {
      this.$confirm("是否确定拒绝？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.changeApprovalStatus(row, 3);
      }).catch(() => {});
    },
    /**
     * 撤销
     * @param row
     */
    reback(row) {
      this.$confirm("是否确定撤销？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.changeApprovalStatus(row, 4);
      }).catch(() => {});
    },
    /**
     * 改变审核状态
     */
    changeApprovalStatus(row, status) {
      const params = {
        "warehouseOutNo": row.warehouseOutNo,
        "approvalStatus": status
      };
      updateApprovalOrderWarehouseOut(params).then(res => {
        if (res.code === 200) {
          this.$message.success("审批成功");
        } else {
          this.$message.error(res.msg);
        }
      }).catch((err) => {
        this.$message.error(err.msg);
      });
    },
    /**
       * 打开弹出层
       */
    openSupplement(row, mark) {
      this.currentRow = row;
      if (mark === "edit") {
        this.dialogTitle = "修补车型";
      } else {
        this.dialogTitle = "补录车型";
      }
      this.dialogVisible = true;
    },
    /**
       * 保存后方法
       */
    saveData() {
      this.$refs.supplementVehicleRef.saveForm();
    },
    validateFailed(payload) {
      if (!payload.vinCode) {
        return this.$message.warning("VIN码不能为空");
      }
      if (!payload.brand) {
        return this.$message.warning("品牌不能为空");
      }
      if (!payload.model) {
        return this.$message.warning("车型不能为空");
      }
      const params = {
        "warehouseOutNo": this.currentRow.warehouseOutNo,
        "carBrand": payload.brand,
        "carFrameImageUrl": payload.iconUrl,
        "carFrameNumber": payload.vinCode,
        "carModel": payload.model
      };
      updateModelOrderWarehouseOut(params).then(res => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.searchData();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.msg || "保存失败");
        }
      }).catch((err) => {
        this.$message.error(err.msg || "保存失败");
      });
    },
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