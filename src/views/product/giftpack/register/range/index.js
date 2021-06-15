
import {
  listRegPkgDealer,
  removeRegPkgDealer,
  createRegPkgDealer,
  listRegPkgRegion,
  removeRegPkgRegion,
  createRegPkgRegion,
  listRegPkgVisibility,
  cancelRegPkgVisibility,
  setRegPkgVisibility
} from "@/api/product/giftpack";
export default {
  "name": "giftpackRegisterRange",
  "components": {
  },
  data() {
    return {
      "regPkgNo": this.$route.params.id || 0,
      "dealer": {
        "checked": false,
        "multipleSelection": [],
        "tableData": [],
        "tableLoading": false,
        "pagination": {
          "sizes": [ 5, 10, 20, 50 ],
          "current": 1,
          "size": 5,
          "total": 0
        }
      },
      "region": {
        "multipleSelection": [],
        "tableData": [],
        "tableLoading": false,
        "pagination": {
          "sizes": [ 5, 10, 20, 50 ],
          "current": 1,
          "size": 5,
          "total": 0
        }
      },
      "dialogDealerVisible": false,
      "dialogRegionVisible": false
    };
  },
  mounted() {
    this.listVisibilityPage();
    this.getRemoteDealerTableData();
    this.getRemoteRegionTableData();
  },
  "methods": {
    /**
     * 查询是否全部可见
     */
    listVisibilityPage() {
      const params = {
        "regPkgNo": this.regPkgNo,
        // 关联类型（1：经销商；2：区域）
        "relationType": 1
      };
      listRegPkgVisibility(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.dealer.checked = res.data.visibility === 1;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(() => {});
    },
    /**
     * 可见性设置-全部可见
     */
    visibleChangeAll() {
      const params = {
        "regPkgNo": this.regPkgNo
      };
      if (!this.dealer.checked) {
        setRegPkgVisibility(params).then(res => {
          if (res.code === 200) {
            this.$message.success("配置全部可见成功");
            this.listVisibilityPage();
          }
        });
      } else {
        cancelRegPkgVisibility(params).then(res => {
          if (res.code === 200) {
            this.$message.success("取消全部可见成功");
            this.listVisibilityPage();
            this.getRemoteDealerTableData();
          }
        });
      }
    },
    /**
     * 获取经销商列表
     */
    getRemoteDealerTableData() {
      const params = {
        "page.pageNum": this.dealer.pagination.current,
        "page.pageSize": this.dealer.pagination.size,
        "regPkgNo": this.regPkgNo
      };
      this.dealer.tableLoading = true;
      listRegPkgDealer(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.dealer.tableData = res.data.records;
          this.dealer.pagination.total = res.data.total;
          this.dealer.tableLoading = false;
        } else {
          this.$message.error(res.msg);
          this.dealer.tableLoading = false;
        }
      }).catch(() => {
        this.dealer.tableLoading = false;
      });
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleDealerSizeChange(val) {
      this.dealer.pagination.size = val;
      this.getRemoteDealerTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleDealerCurrentChange(val) {
      this.dealer.pagination.current = val;
      this.getRemoteDealerTableData();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleDealerSelectionChange(val) {
      this.dealer.multipleSelection = val;
    },
    /**
     * 添加经销商
     */
    addDealer() {
      this.dialogDealerVisible = true;
    },
    /**
     * 删除经销商
     */
    delDealer() {
      if (this.dealer.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      this.$confirm("是否确定要删除所选经销商?", "删除经销商", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.dealer.multipleSelection.forEach((x, index) => {
          const params = {
            "relationNo": x.relationNo,
            "regPkgNo": this.regPkgNo
          };
          removeRegPkgDealer(params).then((res) => {
            if (res.code === 200) {
              if (index === this.dealer.multipleSelection.length - 1) {
                this.$message.success("删除成功");
                this.getRemoteDealerTableData();
              }
            } else {
              this.$message.error("删除失败");
            }
          });
        });
      }).catch(() => {});
    },
    /**
     * 删除一条经销商
     * @param row
     */
    deleteOneDealer(row) {
      this.$confirm("是否确定要删除所选经销商?", "删除经销商", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "relationNo": row.relationNo,
          "regPkgNo": this.regPkgNo
        };
        removeRegPkgDealer(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getRemoteDealerTableData();
          } else {
            this.$message.error("删除失败");
          }
        });
      }).catch(() => {});
    },
    /**
     * 获取选中的经销商
     * @param list
     */
    getSelectDealer(list) {
      list.forEach((x, index) => {
        const params = {
          // "relationNo": x.customerNo,
          "relationNo": x.dealerNo,
          "regPkgNo": this.regPkgNo
        };
        createRegPkgDealer(params).then((res) => {
          if (res.code === 200) {
            if (index === list.length - 1) {
              this.$message.success("保存成功");
              this.dialogDealerVisible = false;
              this.getRemoteDealerTableData();
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },

    /**
     * 获取区域列表
     */
    getRemoteRegionTableData() {
      const params = {
        "page.pageNum": this.region.pagination.current,
        "page.pageSize": this.region.pagination.size,
        "regPkgNo": this.regPkgNo
      };
      this.region.tableLoading = true;
      listRegPkgRegion(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.region.tableData = res.data.records;
          this.region.pagination.total = res.data.total;
          this.region.tableLoading = false;
        } else {
          this.$message.error(res.msg);
          this.region.tableLoading = false;
        }
      }).catch(() => {
        this.region.tableLoading = false;
      });
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleRegionSizeChange(val) {
      this.region.pagination.size = val;
      this.getRemoteRegionTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleRegionCurrentChange(val) {
      this.region.pagination.current = val;
      this.getRemoteRegionTableData();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleRegionSelectionChange(val) {
      this.region.multipleSelection = val;
    },
    /**
     * 添加区域
     */
    addRegion() {
      this.dialogRegionVisible = true;
    },
    /**
     * 删除区域
     */
    delRegion() {
      if (this.region.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      this.$confirm("是否确定要删除所选区域?", "删除区域", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.region.multipleSelection.forEach((x, index) => {
          const params = {
            "relationNo": x.relationNo,
            "regPkgNo": this.regPkgNo
          };
          removeRegPkgRegion(params).then((res) => {
            if (res.code === 200) {
              if (index === this.region.multipleSelection.length - 1) {
                this.$message.success("删除成功");
                this.getRemoteRegionTableData();
              }
            } else {
              this.$message.error("删除失败");
            }
          });
        });
      }).catch(() => {});
    },
    /**
     * 获取选中的区域
     * @param list
     */
    getSelectRegion(list) {
      list.forEach((x, index) => {
        const params = {
          // "relationNo": x.customerNo,
          "relationNo": x.regionNo,
          "regPkgNo": this.regPkgNo
        };
        createRegPkgRegion(params).then((res) => {
          if (res.code === 200) {
            if (index === list.length - 1) {
              this.$message.success("保存成功");
              this.dialogRegionVisible = false;
              this.getRemoteRegionTableData();
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    }
  }
};