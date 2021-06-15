import { pageSearchRegionList } from "@/api/system/area/area";
import { searchStoreLevelList } from "@/api/downstream/store/info";
import {
  listItemWhiteList,
  addItemWhiteList,
  delItemWhiteList,
  listItemVisibility,
  setItemVisibility,
  delItemVisibility
} from "@/api/product/activity/promotion";
export default {
  "name": "productIntegralUpShelf",
  "components": {
  },
  data() {
    return {
      "itemNo": this.$route.query.itemNo || "",
      "price": "",
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
        "storeCustomerNo": "",
        "storeName": "",
        "dealerName": ""
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
    this.getRemoteStoreTableData();
    this.listItemVisibilityPage();
    if (this.$route.query.editInfo) {
      const editInfo = this.$route.query.editInfo;
      this.price = editInfo.price;
    }
  },
  "methods": {
    /**
     * 可见性设置-全部可见
     */
    visibleChangeAll(val) {
      if (this.detail) return;
      const params = {
        "relationNo": this.itemNo,
        "relationType": 3,
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
        "dealerCustomerNo": this.toolBar.dealerName,
        "storeCustomerNo": this.toolBar.storeName,
        "pageReq.pageNum": this.whitelist.pagination.current,
        "pageReq.pageSize": this.whitelist.pagination.size,
        "relationNo": this.itemNo,
        "relationType": 3
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
        "relationNo": this.itemNo,
        "relationType": 3
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
          "relationNo": this.itemNo,
          "relationType": 3
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
            "relationType": 3,
            "relationNo": this.itemNo
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
        "relationNo": this.itemNo,
        "relationType": 3,
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
     * 获取选中的门店
     * @param list
     */
    getSelectStore(list) {
      if (list.length > 100) {
        return this.$message.error("你已达到设置门店上限，请调整门店数量");
      }
      list.forEach((x, index) => {
        const x1 = encodeURIComponent("whiteStoreDealerInfos[0].dealerCustomerNo");
        const x2 = encodeURIComponent("whiteStoreDealerInfos[0].storeCustomerNo");
        const params = {
          "relationNo": this.itemNo,
          "relationType": 3,
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
    /**
     * 返回
     */
    back() {
      this.$router.push({ "path": "/product/integral/goods/edit/" + this.itemNo });
    },
    /**
     * 申请上架
     */
    applyUpShelf() {
      this.$router.push({ "path": "/product/integral/goods/upShelfTwo", "query": { "itemNo": this.itemNo, "price": this.price } });
    },
    /**
     * 查询门店
     * @param val
     */
    storeChange(val) {
      this.toolBar.storeName = val;
    },
    /**
     * 查询经销商
     * @param val
     */
    dealerChange(val) {
      this.toolBar.dealerName = val;
    }

  }
};