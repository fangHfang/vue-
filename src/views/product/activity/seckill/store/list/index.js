import { pageSearchRegionList } from "@/api/system/area/area";
import { searchStoreLevelList } from "@/api/downstream/store/info";
import {
  listPromotionDealerRelation,
  delPromotionDealerRelation,
  createPromotionDealerRelation,
  listItemWhiteList,
  addItemWhiteList,
  setItemWhiteList,
  delItemWhiteList,
  listItemVisibility,
  setItemVisibility,
  delItemVisibility
} from "@/api/product/activity/promotion";
export default {
  "name": "activityStoreSet",
  "components": {
  },
  data() {
    return {
      "promotionNo": this.$route.params.id,
      "dealer": {
        "multipleSelection": [],
        "tableData": [],
        "tableLoading": false,
        "pagination": {
          "sizes": [ 5, 10, 20, 50 ],
          "current": 1,
          "size": 5,
          "total": 40
        }
      },
      "visibility": {
        "checked": false,
        "tableData": []
      },
      "whitelist": {
        "multipleSelection": [],
        "tableData": [],
        "tableLoading": false,
        "pagination": {
          "sizes": [ 5, 10, 20, 50 ],
          "current": 1,
          "size": 5,
          "total": 40
        }
      },
      "toolBar": {
        "name": "",
        "dealerCustomerNo": "",
        "storeCustomerNo": ""
      },
      "dialogDealerVisible": false,
      "dialogStoreVisible": false,
      "dialogSettingVisible": false,
      "selectArea": [],
      "areaAllList": [],
      "selectNature": [],
      "natureAllList": [],
      "setVisibilityLoading": false,
      "showWhiteListContent": true
    };
  },
  "computed": {},
  mounted() {
    this.initSearchAreaList();
    this.initSearchStoreLevelList();
    this.getRemoteDealerTableData();
    this.getRemoteStoreTableData();
    this.listItemVisibilityPage();
  },
  "methods": {
    /**
     * 获取经销商列表
     */
    getRemoteDealerTableData() {
      const params = {
        "page.pageNum": this.dealer.pagination.current,
        "page.pageSize": this.dealer.pagination.size,
        "promotionNo": this.promotionNo
      };
      this.dealer.tableLoading = true;
      listPromotionDealerRelation(this.$jsonFormat(params)).then(res => {
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
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },
    /**
     * 可见性设置-全部可见
     */
    visibleChangeAll(val) {
      const params = {
        "relationNo": this.promotionNo,
        "relationType": 2,
        "itemVisibilityDtos": [],
        "visibleFlag": val ? 1 : 2
      };
      setItemVisibility(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("设置成功");
        } else {
          this.$message.error(res.msg);
        }
      }).finally(() => {
        this.listItemVisibilityPage();
      });
    },
    /**
     * 获取门店白名单列表
     */
    getRemoteStoreTableData() {
      const params = {
        "dealerCustomerNo": this.toolBar.dealerCustomerNo,
        "storeCustomerNo": this.toolBar.storeCustomerNo,
        "pageReq.pageNum": this.whitelist.pagination.current,
        "pageReq.pageSize": this.whitelist.pagination.size,
        "relationNo": this.promotionNo,
        "relationType": 2
      };
      this.whitelist.tableLoading = true;
      listItemWhiteList(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.whitelist.tableData = res.data.records;
          this.whitelist.pagination.total = res.data.total;
          this.whitelist.tableLoading = false;
        } else {
          this.$message.error(res.msg);
          this.whitelist.tableLoading = false;
        }
      }).catch(() => {
        this.whitelist.tableLoading = false;
      });
    },
    /**
     * 获取商品可见性列表
     */
    listItemVisibilityPage() {
      const params = {
        "relationNo": this.promotionNo,
        "relationType": 2
      };
      listItemVisibility(params).then(res => {
        if (res.code === 200) {
          this.visibility.tableData = res.data.itemVisibilityDtos || [];
          this.visibility.checked = res.data.visibleFlag === 1;
          this.showWhiteListContent = !this.visibility.checked;
        } else {
          this.$message.error("查询可见性配置失败");
        }
      }).catch(() => {});
    },
    /**
     * 删除可见性
     */
    delVisibility(row) {
      this.$confirm("是否确定要删除所选可见性?", "删除可见性", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "ids": row.ids,
          "relationNo": this.promotionNo,
          "relationType": 2
        };
        delItemVisibility(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.listItemVisibilityPage();
          } else {
            this.$message.error("删除失败");
          }
        });
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
     * 分页器每页数量变化处理
     * @param val
     */
    handleWhitelistSizeChange(val) {
      this.whitelist.pagination.size = val;
      this.getRemoteStoreTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleWhitelistCurrentChange(val) {
      this.whitelist.pagination.current = val;
      this.getRemoteStoreTableData();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleWhitelistSelectionChange(val) {
      this.whitelist.multipleSelection = val;
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
            "customerNo": x.customerNo,
            "id": x.id,
            "promotionNo": this.promotionNo
          };
          delPromotionDealerRelation(params).then((res) => {
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
          "customerNo": row.customerNo,
          "id": row.id,
          "promotionNo": this.promotionNo
        };
        delPromotionDealerRelation(params).then((res) => {
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
     * 添加门店
     */
    addStore() {
      this.dialogStoreVisible = true;
    },
    /**
     * 删除门店
     */
    delStore() {
      if (this.whitelist.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      this.$confirm("是否确定要删除所选门店?", "删除门店", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.whitelist.multipleSelection.forEach((x, index) => {
          const params = {
            "storeDealerInfos": x.storeCustomerNo,
            "relationType": 2,
            "relationNo": this.promotionNo
          };
          delItemWhiteList(this.$jsonFormat(params)).then((res) => {
            if (index === this.whitelist.multipleSelection.length - 1) {
              if (res.code === 200) {
                this.$message.success("删除成功");
                this.getRemoteStoreTableData();
              } else {
                this.$message.error("删除失败");
              }
            }
          });
        });
      }).catch(() => {});
    },
    /**
     * 设置可见性
     */
    setVisibility() {
      this.dialogSettingVisible = true;
    },
    /**
     * 移除门店性质/区域
     * @param tag
     * @param i
     * @param arr
     */
    handleTagClose(tag, i, arr) {
      arr.splice(i, 1);
    },
    /**
     * 门店可见性设置
     */
    handleSettingSave() {
      this.setVisibilityLoading = true;
      const list = this.selectArea.map((x, index) => {
        return {
          "areaName": x.label,
          "areaNo": x.value,
          "storeLevel": this.selectNature.map(x => x.value)
        };
      });
      const params = {
        "relationNo": this.promotionNo,
        "relationType": 2,
        "itemVisibilityDtos": list,
        "visibleFlag": 2
      };
      setItemVisibility(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.handleSettingClose();
          this.listItemVisibilityPage();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleSettingClose() {
      this.dialogSettingVisible = false;
      setTimeout(() => {
        this.setVisibilityLoading = false;
        this.selectArea = this.selectNature = [];
      }, 500);
    },
    /**
     * 分页查询所有区域列表
     */
    initSearchAreaList() {
      const params = {
        "request": {
          "pageNum": 1,
          "pageSize": 200
        }
      };
      pageSearchRegionList(params).then(res => {
        if (res.code === 200) {
          this.areaAllList = res.data.records.map(x => {
            return {
              "label": x.name,
              "value": x.regionNo
            };
          });
        } else {
          this.$message.error("查询地区失败");
        }
      }).catch(() => {});
    },
    /**
     * 查询门店等级
     */
    initSearchStoreLevelList() {
      searchStoreLevelList("").then(res => {
        if (res.code === 200) {
          this.natureAllList = res.data.map(element => {
            return { "label": element.dictName, "value": element.dictCode };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.form.levels.options = [];
      });
    },
    /**
     * 获取选中的经销商
     * @param list
     */
    getSelectDealer(list) {
      list.forEach((x, index) => {
        const params = {
          "customerNo": x.customerNo,
          "promotionNo": this.promotionNo
        };
        createPromotionDealerRelation(params).then((res) => {
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
     * 获取选中的门店
     * @param list
     */
    getSelectStore(list) {
      list.forEach((x, index) => {
        const x1 = encodeURIComponent("whiteStoreDealerInfos[0].dealerCustomerNo");
        const x2 = encodeURIComponent("whiteStoreDealerInfos[0].storeCustomerNo");
        const params = {
          "relationNo": this.promotionNo,
          "relationType": 2,
          [x1]: x.dealerNo,
          [x2]: x.storeNo
        };
        // setItemWhiteList
        addItemWhiteList(this.$jsonFormat(params)).then((res) => {
          if (index === list.length - 1) {
            if (res.code === 200) {
              this.$message.success("添加成功");
              this.dialogStoreVisible = false;
              this.getRemoteStoreTableData();
            } else {
              this.$message.error(res.msg);
            }
          }
        });
      });
    },
    storeChange(val) {
      this.toolBar.storeCustomerNo = val;
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerCustomerNo = val;
    }
  }
};