// src/views/downstream/store/info/list/index
import { pageSearchStoreList, enableStore, disableStore, searchStoreLevelList } from "@/api/downstream/store/info";
import { pageSearchRegionList } from "@/api/system/area/area";
export default {
  "name": "storeInfoList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "dealerNo": "",
        "storeNo": "",
        "dealerName": "",
        "name": "",
        // 所属区域
        "regionNo": "",
        "status": {
          "value": "",
          "options": [
            { "label": "禁用", "value": "1" },
            { "label": "启用", "value": "0" }
          ]
        },
        // 所属区域
        "region": {
          "value": "",
          "options": []
        },
        // 门店等级
        "levels": {
          "value": "",
          "options": []
        }
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
    this.listStoreByPage();
    this.initSearchRegionList();
    this.initSearchStoreLevelList();
  },
  activated() {
    this.listStoreByPage();
    this.initSearchRegionList();
    this.initSearchStoreLevelList();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchStoreListByPage() {
      this.pagination.current = 1;
      this.listStoreByPage();
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
      this.listStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listStoreByPage();
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
     * 跳转新增
     */
    toAdd() {
      this.$store.commit("storeInfo/storeInfoListSet", {
        "modify": false
      });
      this.$router.push({ "path": "/downstream/store/info/add" });
    },
    /**
     * 分页查询所属区域列表
     */
    pageSearchRegionList(query) {
      const params = {
        "name": query,
        "status": 1,
        "request": {
          "pageNum": 1,
          "pageSize": 10
        }
      };
      pageSearchRegionList(params).then(res => {
        if (res.code === 200) {
          this.toolBar.region.options = res.data.records.map(element => {
            return { "label": element.name, "value": element.regionNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      }).catch((error) => {
        console.error(error.msg);
      });
    },
    /**
     * 初始化查询所属区域列表
     */
    initSearchRegionList() {
      const params = {
        "status": 1,
        "request": {
          "pageNum": 1,
          "pageSize": 20
        }
      };
      pageSearchRegionList(params).then(res => {
        if (res.code === 200) {
          this.toolBar.region.options = res.data.records.map(element => {
            return { "label": element.name, "value": element.regionNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      }).catch((error) => {
        console.error(error.msg);
      });
    },

    /**
    * 打开修改
    */
    toEdit(customerNo, tenantNo) {
      // const multipleSelection = this.multipleSelection;
      // if (multipleSelection.length !== 1) {
      //   this.$message.error("请选中一条数据进行修改操作");
      //   return;
      // }
      this.$confirm("请重新编辑门店?", "编辑门店", {
        "confirmButtonText": "编辑",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        // 确认编辑-跳转到编辑页面
        this.$store.commit("storeInfo/storeInfoListSet", {
          "modify": true,
          "customerNo": customerNo,
          "tenantNo": tenantNo,
          "isDetail": false
        });
        this.$router.push({ "path": "/downstream/store/info/add" });
      }).catch(() => {});
    },

    editStore(customerNo, tenantNo) {
      // 确认编辑-跳转到编辑页面
      this.$store.commit("storeInfo/storeInfoListSet", {
        "modify": true,
        "customerNo": customerNo,
        "tenantNo": tenantNo,
        "isDetail": true
      });
      this.$router.push({ "path": "/downstream/store/info/add" });
    },

    /**
     * 分页查询门店数据
     */
    listStoreByPage() {
      const that = this;
      this.tableLoading = true;
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      if (this.toolBar.name) {
        params += "&name=" + this.toolBar.name;
      }
      if (this.toolBar.storeNo) {
        params += "&storeNo=" + this.toolBar.storeNo;
      }
      if (this.toolBar.status.value !== "") {
        params += "&status=" + this.toolBar.status.value;
      }
      if (this.toolBar.dealerName) {
        params += "&dealerName=" + this.toolBar.dealerName;
      }
      if (this.toolBar.dealerNo) {
        params += "&dealerNo=" + this.toolBar.dealerNo;
      }
      if (this.toolBar.region.value) {
        params += "&regionNo=" + this.toolBar.region.value;
      }
      if (this.toolBar.levels.value) {
        params += "&level=" + this.toolBar.levels.value;
      }
      pageSearchStoreList(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.created = that.formatTime(element.created);
          });
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },

    /**
     * 启用门店
     */
    enableStoreFunc(customerNo, storeNo) {
      this.tableLoading = true;
      const params = {
        "customerNo": customerNo,
        "storeNo": storeNo
      };
      enableStore(params).then(res => {
        this.listStoreByPage();
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
        this.tableLoading = false;
      });
    },

    /**
     * 禁用门店
     */
    disableStoreFunc(customerNo, storeNo) {
      this.tableLoading = true;
      const params = {
        "customerNo": customerNo,
        "storeNo": storeNo
      };
      disableStore(params).then(res => {
        this.listStoreByPage();
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
        this.tableLoading = false;
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
    },

    /**
     * 查询门店等级
     */
    initSearchStoreLevelList() {
      searchStoreLevelList("").then(res => {
        if (res.code === 200) {
          this.toolBar.levels.options = res.data.map(element => {
            return { "label": element.dictName, "value": element.dictCode };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.toolBar.levels.options = [];
      });
    },

    /**
     * 跳转门店性质变更记录
     */
    navToChange(row) {
      const { name, storeNo, customerNo, dealerName, dealerNo, level } = row;
      this.$store.commit("storeInfoChange/storeInfoChangeSet", {
        "storeName": name,
        "storeNo": storeNo,
        "customerNo": customerNo,
        "dealerName": dealerName,
        "dealerNo": dealerNo,
        "level": level
      });
      this.$router.push({ "path": "/downstream/store/info/change" });
    }

  }
};
