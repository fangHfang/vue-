import dialogAdd from "../add/index.vue";
import dialogProductNum from "../productNum/index.vue";
import { deleteItemPurchaseLimit, pageItemPurchaseLimit, createItemPurchaseLimit } from "@/api/product/manage.js";
import { searchStoreLevelList } from "@/api/downstream/store/info";
import { ITEM_URL } from "@/utils/system-constant";
export default {
  "name": "restrictionsList",
  "components": {
    dialogAdd,
    dialogProductNum
  },
  data() {
    return {
      "loading": false,
      "toolBar": {
        "productCode": "",
        "productSpec": "",
        "productBrand": "",
        "productSize": "",
        "productPattern": "",
        "storeName": "",
        "storeNo": "",
        "storeNature": {
          "value": "",
          "options": [
            { "label": "性质一", "value": "1" },
            { "label": "性质二", "value": "2" },
            { "label": "性质三", "value": "3" }
          ]
        }
      },
      "tableData": [],
      "searchData": {
        "pageReq": {
          "pageNum": 1,
          "pageSize": 10
        },
        "total": 0
      },
      "dialogVisible": false,
      "dialogVisibleAdd": false,
      "productData": {},
      "activeName": "batch",
      "addTitle": "",
      "multipleSelection": [],
      "exportUrl": ITEM_URL + "/admin/itemPurchaseLimit/export"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportGetData() {
      const params = {
        "brandName": this.toolBar.productBrand,
        "page.pageNum": this.searchData.pageReq.pageNum,
        "page.pageSize": this.searchData.pageReq.pageSize,
        "productCode": this.toolBar.productCode,
        "size": this.toolBar.productSize,
        "spec": this.toolBar.productSpec,
        "tread": this.toolBar.productPattern
      };
      if (this.activeName === "batch") {
        params.relationType = 2;
        params.relationField = this.toolBar.storeNature.value;
      } else if (this.activeName === "special") {
        params.relationType = 1;
        params.relationField = this.toolBar.storeNo;
      }
      return this.$jsonFormat(params);
    }
  },
  mounted() {
    this.getTableData();
    this.initSearchStoreLevelList();
  },
  "watch": {
    activeName(val) {
      console.log(val);
      this.cleanSearch();
    }
  },
  "methods": {
    searchTableData() {
      this.searchData.pageReq.pageNum = 1;
      this.getTableData();
    },
    getTableData() {
      const params = {
        "brandName": this.toolBar.productBrand,
        "page": {
          "pageNum": this.searchData.pageReq.pageNum,
          "pageSize": this.searchData.pageReq.pageSize
        },
        "productCode": this.toolBar.productCode,
        "size": this.toolBar.productSize,
        "spec": this.toolBar.productSpec,
        "tread": this.toolBar.productPattern
      };
      if (this.activeName === "batch") {
        params.relationType = 2;
        params.relationField = this.toolBar.storeNature.value;
      } else if (this.activeName === "special") {
        params.relationType = 1;
        params.relationField = this.toolBar.storeNo;
      }
      this.loading = true;
      pageItemPurchaseLimit(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.searchData.total = res.data.total;
        } else {
          this.$message.error("查询失败,请稍后重试");
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 查询门店等级
     */
    initSearchStoreLevelList() {
      searchStoreLevelList("").then(res => {
        if (res.code === 200) {
          this.toolBar.storeNature.options = res.data.map(element => {
            return { "label": element.dictName, "value": element.dictCode };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.toolBar.storeNature.options = [];
      });
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.searchData.pageReq.pageSize = val;
      this.getTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageReq.pageNum = val;
      this.getTableData();
    },
    /**
     * 打开订单详情
     */
    setNum(data) {
      this.dialogVisible = true;
      this.productData = { ...data };
    },
    /**
       * 限购数量返回值
       * @param val
       */
    getSelectProducts(val) {
      // 处理显示数据

      // const payload = {
      //   "blackWhiteLine": val.blackWhiteLine,
      //   "brandCode": val.brandCode,
      //   "brandName": val.brandName,
      //   "carryingCapacity": val.carryingCapacity,
      //   "limitCount": val.limitCount,
      //   "productCode": val.productCode,
      //   "productNo": val.productNo,
      //   "similarTread": val.similarTread,
      //   "size": val.size,
      //   "spec": val.spec,
      //   "specDetail": val.specDetail,
      //   "tread": val.tread,
      //   "relationType": val.relationType,
      //   "relationField": val.relationField,
      //   "storeName": val.storeName
      // };
      // 处理真实数据
      const data = {
        "purchaseLimitReqs": [ {
          ...val
        } ]
      };
      createItemPurchaseLimit(data).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.dialogVisible = false;
          this.tableData.forEach(element => {
            if (element.id === val.id) {
              element.limitCount = val.limitCount;
            }
          });
          // this.getTableData();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    /**
       * 重置
       */
    cleanSearch() {
      this.toolBar.productCode = "";
      this.toolBar.productSpec = "";
      this.toolBar.productBrand = "";
      this.toolBar.productSize = "";
      this.toolBar.productPattern = "";
      this.toolBar.storeNature.value = "";
      this.searchData.pageReq.pageNum = 1;
      this.searchData.pageReq.pageSize = 10;
      this.$refs.store && this.$refs.store.cleanStore();
      this.getTableData();
    },
    /**
       * 添加
       * @param activeName tab选项卡名称
       */
    addProduct(activeName) {
      if (activeName === "batch") {
        this.addTitle = "设置限购商品";
      } else {
        this.addTitle = "选择特殊门店限购";
      }
      this.dialogVisibleAdd = true;
    },
    /**
     * 删除
     */
    delProduct() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.info("请至少选中一条数据!");
        return;
      }
      this.$confirm("是否确定删除？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const arrStr = multipleSelection.map(x => x.id).join("&ids=");
        const params = "?ids=" + arrStr;
        deleteItemPurchaseLimit(params).then(res => {
          this.$message.success("删除成功");
          this.getTableData();
        }).catch(error => {
          this.$message.error(error);
        });
      }).catch(() => {});
    },
    /**
       * 添加的返回值
       * @param list
       */
    getSelectAdd(list) {
      const supply = {};
      if (this.activeName === "batch") {
        supply.relationType = 2;
        supply.relationField = this.toolBar.storeNature.value;
      } else if (this.activeName === "special") {
        supply.relationType = 1;
        supply.relationField = this.toolBar.storeNo;
      }
      const purchaseLimitReqs = list.map((item) => {
        const temp = {
          "blackWhiteLine": item.blackWhiteLine,
          "brandCode": item.brandCode,
          "brandName": item.brandName,
          "carryingCapacity": item.carryingCapacity,
          "limitCount": item.rebateValue,
          "productCode": item.productCode,
          "productNo": item.productNo,
          "similarTread": item.similarTread,
          "size": item.size,
          "spec": item.spec,
          "specDetail": item.specDetail,
          "tread": item.tread
        };
        if (this.activeName === "batch") {
          temp.relationType = 2;
          temp.relationField = item.storeLevelNo;
        } else if (this.activeName === "special") {
          temp.relationType = 1;
          temp.relationField = item.storeNo;
          temp.storeName = item.storeName;
        }
        return temp;
      });
      const payload = {
        purchaseLimitReqs
      };
      createItemPurchaseLimit(payload).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.dialogVisibleAdd = false;
          this.getTableData();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    storeChange(val) {
      this.toolBar.storeNo = val;
    }

  }
};
