import { pageStockDisplayItemRelation, createStockDisplayItemRelation, removeStockDisplayItemRelation } from "@/api/system/other/stock";
import Select from "../select/index.vue";
import { ITEM_URL } from "@/utils/system-constant";
export default {
  "name": "OtherSettingsProductSetUp",
  "components": {
    Select
  },
  data() {
    return {
      "toolBar": {
        "productCode": "",
        "customerName": "",
        "spec": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableLoading": false,
      "multipleSelection": [],
      "maxxisAddProductVisible": false,
      // 导入导出api地址
      "importUrl": ITEM_URL + "/admin/stockDisplay/import",
      "exportUrl": ITEM_URL + "/admin/stockDisplay/export"
    };
  },
  "computed": {
    ruleNo() {
      return this.$store.state.systemOtherStock.ruleNo;
    },
    // 导出入参
    exportGetData() {
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "ruleNo": this.ruleNo
      };
      if (this.toolBar.productCode) {
        params.productCode = this.toolBar.productCode;
      }
      if (this.toolBar.customerName) {
        params.customerName = this.toolBar.customerName;
      }
      if (this.toolBar.spec) {
        params.specDetail = this.toolBar.spec;
      }
      return {
        ...params
      };
    }
  },
  mounted() {
    if (this.ruleNo) {
      this.listRelationItemByPage();
    }
  },
  "methods": {
    /**
     * 搜索按钮方法
     */
    searchRelationItemListByPage() {
      this.pagination.current = 1;
      this.listRelationItemByPage();
    },
    /**
     * 分页查询
     */
    listRelationItemByPage() {
      this.tableLoading = true;
      let params = "?page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&ruleNo=" + this.ruleNo;
      if (this.toolBar.productCode) {
        params += "&productCode=" + this.toolBar.productCode;
      }
      if (this.toolBar.customerName) {
        params += "&customerName=" + this.toolBar.customerName;
      }
      if (this.toolBar.spec) {
        params += "&specDetail=" + this.toolBar.spec;
      }
      pageStockDisplayItemRelation(params).then(res => {
        if (res.code === 200) {
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
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listRelationItemByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listRelationItemByPage();
    },

    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 删除商品
     */
    deleteItemRelated() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.info("请选择要删除的商品");
        return;
      }
      this.$confirm("是否确定要删除所选择商品", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        const param = {
          "ids": multipleSelection.map(x => x.id)
        };
        removeStockDisplayItemRelation(param).then(res => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.listRelationItemByPage();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
          this.$message.error(error.msg);
        });
      }).catch(() => {});
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
     * 添加经销商
     */
    addDealer() {
      this.maxxisAddProductVisible = true;
    },

    /**
     * 删除一条商品
     * @param row
     */
    deleteOneProduct(row) {
      this.$confirm("是否确定要删除所商品?", "删除商品", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "ids": [ row.id ]
        };
        removeStockDisplayItemRelation(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.listRelationItemByPage();
          } else {
            this.$message.error(res.msg);
          }
        });
      }).catch(() => {});
    },
    /**
     * 获取选中的产品
     * @param list
     */
    getProduct(list) {
      const productInfoList = list.map(x => {
        return {
          "brandCode": x.brandCode,
          "brandName": x.brandName,
          "customerNo": x.customerNo,
          "customerName": x.customerName,
          "productCode": x.productCode,
          "productNo": x.productNo,
          "ruleNo": this.ruleNo,
          "similarTread": x.similarTread,
          "size": x.size,
          "spec": x.spec,
          "specDetail": x.specDetail,
          "tread": x.tread
        };
      });
      const params = {
        productInfoList
      };
      createStockDisplayItemRelation(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.maxxisAddProductVisible = false;
          this.listRelationItemByPage();
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};