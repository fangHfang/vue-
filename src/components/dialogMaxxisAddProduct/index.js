import { listQueryNewestProductByPage } from "@/api/system/base/product";
import { pageSearchDealerList } from "@/api/downstream/dealer/info";
export default {
  "name": "dialogMaxxisAddProduct",
  "components": {},
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "isMultiSelect": {
      "type": Boolean,
      "default": false
    },
    "mark": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "class": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        "spec": {
          "value": "",
          "options": [
            { "label": "规格1", "value": "1" },
            { "label": "规格2", "value": "2" },
            { "label": "规格3", "value": "3" }
          ]
        },
        "brand": "",
        "tag": {
          "value": "",
          "options": [
            { "label": "标签1", "value": "1" },
            { "label": "标签2", "value": "2" },
            { "label": "标签3", "value": "3" }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 10
      },
      // 初始化查询条件
      "searchData": {
        // 产品代号
        "productCode": "",
        // 轮胎尺寸
        "size": "",
        // 规格
        "spec": "",
        // 搜索字段
        "searchField": "",
        // 同类花纹
        "similarTread": "",
        // 胎侧标志
        "blackWhiteLine": "",
        "brandName": "",
        "carryingCapacity": "",
        "pageNum": 1,
        "pageSize": 10
      },
      "total": 0,
      // 选中数据
      "multipleSelection": "",
      "tableLoading": false,
      "dealerOptions": [],
      "dealerNo": "",
      "btnLoading": false
    };
  },
  mounted() {
    // 初始化分查询
    this.tableProductList();
    if (this.mark === "stockSetProduct") {
      this.listDealerData();
    }
  },
  "watch": {
    "dialogVisible": {
      "handler"(val) {
        if (val) {
          this.btnLoading = false;
          this.multipleSelection = [];
        }
      },
      "immediate": true
    }
  },
  "methods": {
    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.searchData.pageSize = val;
      this.tableProductList();
    },
    searchTableData() {
      this.searchData.pageNum = 1;
      this.tableProductList();
    },
    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageNum = val;
      this.tableProductList();
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },
    /**
     * 分页查询列表
     */
    tableProductList() {
      const postData = { ...this.searchData };
      for (const [ k, v ] of Object.entries(postData)) {
        if (!v) {
          delete postData[k];
        }
      }
      this.tableLoading = true;
      listQueryNewestProductByPage(this.$jsonFormat(postData)).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error("查询失败,请稍后重试");
        }
      }).catch(() => {
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    /**
     * 获取选中数据
     */
    selectData() {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请选择数据");
      }
      if (!this.isMultiSelect) {
        if (this.multipleSelection.length > 1) {
          return this.$message.info("最多只能选择一条数据");
        }
        // 默认取第一条数据的productCode
        this.$emit("productCode", this.multipleSelection);
        this.$emit("update:dialogVisible", false);
      } else {
        if (this.mark === "stockSetProduct") {
          if (!this.dealerNo) {
            return this.$message.warning("请选择经销商");
          }
          const dealer = this.dealerOptions.find(x => Object.is(x.dealerNo, this.dealerNo));
          this.multipleSelection = this.multipleSelection.map(x => {
            return {
              ...x,
              "customerNo": this.dealerNo,
              "customerName": dealer && dealer.name
            };
          });
          this.btnLoading = true;
        }
        this.$emit("productCode", this.multipleSelection);
      }
    },
    /**
     * 多选数据事件
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 查询经销商数据
     */
    listDealerData() {
      let postData = {
        "page.pageNum": 1,
        "page.pageSize": 200
      };
      postData = this.$jsonFormat(postData).substring(1);
      pageSearchDealerList(postData).then((res) => {
        if (res.code === 200) {
          this.dealerOptions = res.data.records;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    }

  }
};