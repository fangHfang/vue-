import { customerStockDetail, modeStockWarning, getAverage } from "@/api/business/distributor/stock";
import { listItemCategorySelectShow, listItemBrand, listSpecTemplate, listItemLabel } from "@/api/product/manage";
import { ITEM_URL } from "@/utils/system-constant";
export default {
  "name": "businessDistributorStockDetail",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "specDetail": {
          "value": "",
          "options": []
        },
        "brandNo": {
          "value": "",
          "options": []
        },
        "categoryNo": {
          "value": "",
          "options": []
        },
        "tag": {
          "value": "",
          "options": []
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialog": {
        "dialogVisible": false,
        "selectOptions": [
          { "label": "月度出库量平均值", "value": "MONTHLY" },
          { "label": "季度出库量平均值", "value": "QUARTER" },
          { "label": "年度出库量平均值", "value": "ANNUAL" }
        ],
        "dialogForm": {
          "firstSelect": "",
          "firstValue": 0,
          "secondSelect": "",
          "secondValue": 0,
          "diyValue": "",
          "radio": "1"
        },
        "averageValue": 0,
        "stockNo": ""
      },
      "customerNo": this.$route.params.id,
      "btnLoading": false,
      "importUrl": ITEM_URL + "/admin/stockInfo/import",
      "exportUrl": ITEM_URL + "/admin/stockInfo/export"
    };
  },
  mounted() {
    this.customerStockDetail();
    this.initPageOptions();
  },
  "computed": {
    diyValue() {
      this.changeInput();
      if (this.dialog.dialogForm.radio === "1") {
        const total = Number(this.dialog.averageValue) + Number(this.dialog.dialogForm.firstValue);
        return total;
      } else if (this.dialog.dialogForm.radio === "2") {
        const total = Number(this.dialog.averageValue) - Number(this.dialog.dialogForm.secondValue);

        return total;
      }
    },
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportPostData() {
      const params = {
        "customerNo": this.customerNo
      };
      return {
        ...params
      };
    }
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.customerStockDetail();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.customerStockDetail();
    },
    /**
     * 设置预警值
     */
    openDialogWarning(stockNo) {
      this.stockNo = stockNo;
      this.dialog.dialogVisible = true;
      this.btnLoading = false;
    },
    /**
     * 初始化所有下拉框
     * @returns {Promise<void>}
     */
    async initPageOptions() {
      await this.getItemCategoryOptions();
      await this.getItemBrandOptions();
      await this.getSpecTemplateOptions();
      await this.getItemLabelOptions();
    },

    /**
     * 获取商品分类下拉狂选项
     * @returns {Promise<void>}
     */
    async getItemCategoryOptions() {
      const result = await listItemCategorySelectShow(this.$jsonFormat({
        "categoryType": 2
      }));
      if (result.code === 200) {
        this.toolBar.categoryNo.options = result.data.map(element => {
          return { "label": element.wholeCategoryName, "value": element.wholeCategoryNo };
        });
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
        this.toolBar.brandNo.options = result.data.map(element => {
          return { "label": element.brandName, "value": element.brandNo };
        });
      } else {
        this.$message.error(result.msg);
      }
    },

    /**
     * 获取商品规格下拉框选项
     * @returns {Promise<void>}
     */
    async getSpecTemplateOptions() {
      const result = await listSpecTemplate();
      if (result.code === 200) {
        this.toolBar.specDetail.options = result.data.map(element => {
          return { "label": element.specName, "value": element.specNo };
        });
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 获取商品标签下拉框选项
     * @returns {Promise<void>}
     */
    async getItemLabelOptions() {
      const result = await listItemLabel({ "request": { "pageNum": 1, "pageSize": -1 } });
      if (result.code === 200) {
        this.toolBar.tag.options = result.data.records.map(element => {
          return { "label": element.labelName, "value": element.labelNo };
        });
      } else {
        this.$message.error(result.msg);
      }
    },

    /**
     * 经销商库存明细
     */
    customerStockDetail() {
      const params = {
        "name": this.toolBar.name,
        "customerNo": this.customerNo,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "specDetail": this.toolBar.specDetail.value,
        "brandNo": this.toolBar.brandNo.value,
        "categoryNo": this.toolBar.categoryNo.value,
        "tag": this.toolBar.tag.value
      };
      customerStockDetail(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 修改库存预警
     */
    clearData() {
      this.dialog.dialogForm.firstSelect = "";
      this.dialog.dialogForm.firstValue = "";
      this.dialog.dialogForm.secondSelect = "";
      this.dialog.dialogForm.secondValue = "";
      this.dialog.dialogForm.diyValue = "";
      this.dialog.averageValue = "";
    },

    /**
     * 查询平均值接口
     */
    averageValue() {
      const params = {
        "stockNo": this.stockNo
      };
      if (this.dialog.dialogForm.radio === "1") {
        params.type = this.dialog.dialogForm.firstSelect;
      } else if (this.dialog.dialogForm.radio === "2") {
        params.type = this.dialog.dialogForm.secondSelect;
      }
      getAverage(params).then(res => {
        if (res.code === 200) {
          this.dialog.averageValue = res.data;
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    changeInput() {
      const pattern = /^[1-9][0-9]*$/;
      if (!pattern.test(this.dialog.dialogForm.firstValue) && this.dialog.dialogForm.firstValue !== "") {
        this.dialog.dialogForm.firstValue = "";
      } else if (!pattern.test(this.dialog.dialogForm.secondValue) && this.dialog.dialogForm.secondValue !== "") {
        this.dialog.dialogForm.secondValue = "";
      } else if (!pattern.test(this.dialog.dialogForm.diyValue) && this.dialog.dialogForm.diyValue !== "") {
        this.dialog.dialogForm.diyValue = "";
      }
    },

    /**
     * 保存
     */
    modStockWarning() {
      this.btnLoading = true;
      const params = {
        "stockNo": this.stockNo
      };
      if (this.dialog.dialogForm.radio === "3") {
        params.warning = this.dialog.dialogForm.diyValue;
      } else {
        params.warning = this.diyValue;
      }
      modeStockWarning(params).then(res => {
        if (res.code === 200) {
          this.clearData();
          this.customerStockDetail();
          this.dialog.dialogVisible = false;
        } else {
          this.$message.error(res.msg);
          this.btnLoading = false;
        }
      }).catch((error) => {
        console.info(error);
        this.btnLoading = false;
      });
    }

  }
};