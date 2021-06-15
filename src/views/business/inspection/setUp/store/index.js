import { pageSearchRegionList } from "@/api/system/area/area";
import { searchStoreLevelList } from "@/api/downstream/store/info";
import {
  inspectQueryWhiteList,
  inspectCreateWhiteList,
  inspectDeleteWhiteList,
  inspectQueryVisibility,
  inspectCreateVisibility,
  inspectDeleteVisibility
} from "@/api/business/inspection/inspection";
export default {
  "name": "activityStoreSet",
  "components": {
  },
  data() {
    return {
      "id": this.$route.params.id || "",
      "mark": this.$route.query.mark || "",
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
    this.getRemoteStoreTableData();
    this.listItemVisibilityPage();
  },
  "methods": {
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
        "visibilityNo": this.id,
        "visibilityList": [],
        "visibleFlag": val ? 1 : 0
      };
      inspectCreateVisibility(params).then((res) => {
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
    async getRemoteStoreTableData() {
      const params = {
        "dealerCustomerNo": this.toolBar.dealerCustomerNo,
        "storeCustomerNo": this.toolBar.storeCustomerNo,
        "page.pageNum": this.whitelist.pagination.current,
        "page.pageSize": this.whitelist.pagination.size,
        "visibleNo": this.id
      };
      this.whitelist.tableLoading = true;
      const res = await inspectQueryWhiteList(this.$jsonFormat(params));
      if (res.code === 200) {
        this.whitelist.tableData = res.data.records;
        this.whitelist.pagination.total = res.data.total;
        this.whitelist.tableLoading = false;
      } else {
        this.$message.error(res.msg);
        this.whitelist.tableLoading = false;
      }
    },
    /**
     * 获取商品可见性列表
     */
    listItemVisibilityPage() {
      const params = {
        "visibilityNo": this.id
      };
      inspectQueryVisibility(params).then(res => {
        if (res.code === 200) {
          this.visibility.tableData = res.data.visibilityList || [];
          this.visibility.checked = parseInt(res.data.visibleFlag) === 1;
          this.showWhiteListContent = !this.visibility.checked;
        } else {
          this.$message.error(res.mag);
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
          "visibilityNo": this.id
        };
        inspectDeleteVisibility(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.listItemVisibilityPage();
          } else {
            this.$message.error(res.msg);
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
        const params = {
          "relationNos": this.whitelist.multipleSelection.map(x => {
            return {
              "dealerCustomerNo": x.dealerCustomerNo,
              "storeCustomerNo": x.storeCustomerNo
            };
          }),
          "visibleNo": this.id
        };
        inspectDeleteWhiteList(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getRemoteStoreTableData();
          } else {
            this.$message.error(res.msg);
          }
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
          "areaNo": x.value,
          "storeLevels": this.selectNature.map(x => x.value)
        };
      });
      const params = {
        "visibilityNo": this.id,
        "visibilityList": list,
        "visibleFlag": 0
      };
      inspectCreateVisibility(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.handleSettingClose();
          this.listItemVisibilityPage();
        } else {
          this.$message.error(res.msg);
        }
        this.setVisibilityLoading = false;
      }).catch(() => {
        this.setVisibilityLoading = false;
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
      const params = {
        "visibleNo": this.id,
        "relationNos": list.map(x => {
          return {
            "dealerCustomerNo": x.dealerNo,
            "storeCustomerNo": x.storeNo
          };
        })
      };
      inspectCreateWhiteList(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.dialogStoreVisible = false;
          this.getRemoteStoreTableData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    dealerChange(val) {
      this.toolBar.dealerCustomerNo = val;
    },

    storeChange(val) {
      this.toolBar.storeCustomerNo = val;
    }

  }
};