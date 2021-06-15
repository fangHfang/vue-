import { listItemInfoByPage, listItemCategory, listItemBrand } from "@/api/product/manage";
import { relationStockDisplayItem } from "@/api/system/other/stock";
export default {
  "name": "OtherSettingsProductSelect",
  "components": {
  },
  "props": {
    "needSave": {
      "type": Boolean,
      "default": false
    },
    "ruleNo": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "toolBar": {
        "itemName": "",
        "categoryNo": {
          "value": "",
          "options": []
        },
        "brandNo": {
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
  "watch": {
    "needSave": {
      "handler": function(newVal, oldVal) {
        if (newVal) {
          this.saveRelationItemForm();
        }
      }
    }
  },
  mounted() {
    this.pageSearchItemInfoList();
    this.getItemCategoryOptions();
    this.getItemBrandOptions();
  },
  "methods": {
    /**
     * 保存关联关系
     */
    saveRelationItemForm() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.warning("请至少选择一条数据");
        return;
      }
      const param = {
        "itemNos": multipleSelection.map(element => { return element.itemNo; }),
        "ruleNo": this.ruleNo
      };
      relationStockDisplayItem(param).then(res => {
        this.$emit("afterSave", res.msg);
        this.toolBar.itemKeyword = "";
        this.toolBar.categoryNo.value = "";
        this.toolBar.brandNo.value = "";
        this.$refs.itemTable.clearSelection();
      }).catch((error) => {
        this.$message.error(error.msg);
      });
    },
    resetData() {
      this.toolBar.itemName = "";
      this.toolBar.categoryNo.value = "";
      this.toolBar.brandNo.value = "";
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.pageSearchItemInfoList();
    },
    /**
       * 分页器每页数量变化处理
       * @param val
       */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.pageSearchItemInfoList();
    },

    /**
       * 分页器当前页码变化处理
       * @param val
       */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.pageSearchItemInfoList();
    },

    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 搜索按钮方法
     */
    searchItemInfoListByPage() {
      this.pagination.current = 1;
      this.pageSearchItemInfoList();
    },

    /**
     * 分页查询数据
     */
    pageSearchItemInfoList() {
      this.tableLoading = true;
      const params = {
        "pageSize": this.pagination.size,
        "pageNum": this.pagination.current,
        "itemName": this.toolBar.itemName,
        "categoryNo": this.toolBar.categoryNo.value,
        "brandNo": this.toolBar.brandNo.value,
        // 出售中
        "status": 2,
        // 玛吉斯
        "itemType": 1
      };
      const searchData = this.$jsonFormat(params);
      listItemInfoByPage(searchData).then((result) => {
        if (result.code === 200) {
          this.tableData = result.data.records;
          this.pagination.total = result.data.total;
          this.pagination.size = result.data.size;
          this.pagination.current = result.data.pages;
        } else {
          this.$message.error(result.msg);
        }
      }).finally(() => { this.tableLoading = false; });
    },
    /**
     * 获取商品分类下拉狂选项
     * @returns {Promise<void>}
     */
    async getItemCategoryOptions() {
      const result = await listItemCategory(this.$jsonFormat({
        "categoryType": "2",
        "keyword": ""
      }));
      if (result.code === 200) {
        this.toolBar.categoryNo.options = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 获取商品品牌下拉框选项
     * @returns {Promise<void>}
     */
    async getItemBrandOptions() {
      const result = await listItemBrand();
      if (result.code === 200) {
        this.toolBar.brandNo.options = result.data;
      } else {
        this.$message.error(result.msg);
      }
    }
  }
};