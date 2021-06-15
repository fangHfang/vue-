import dialogAdjust from "../adjust/index.vue";
import { queryItemStock, adjustItemStock } from "@/api/product/manage";
export default {
  "name": "dialogStockProduct",
  "components": {
    dialogAdjust
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "itemNo": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "multipleSelection": [],
      "tableLoading": false,
      "toolBar": {
        "redio": "1",
        "addNum": "",
        "reduceNum": "",
        "stockNo": "",
        "dealerNo": "",
        "dealerName": ""
      },
      "tableData": [ {
        "dealerName": "",
        "dealerNo": "",
        "stockNo": ""
      } ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "adjustVisible": false,
      "stockNo": "",
      "stockNoList": []
    };
  },
  created() {
  },
  mounted() {
  },
  "watch": {
    "dialogVisible": {
      "handler": function(val) {
        if (val) {
          this.toolBar.dealerNo = "";
          this.toolBar.addNum = "";
          this.toolBar.reduceNum = "";
          // 打开时查询分页
          this.listTableData();
        }
      },
      "immediate": true
    }
  },
  "methods": {
    searchData() {
      this.pagination.current = 1;
      this.listTableData();
    },
    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listTableData();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      if (!this.isMultiSelect &&
        val.length > 1) {
        const lastRow = val.pop();
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(lastRow);
        this.multipleSelection = [ lastRow ];
        return this.$message.warning("仅支持选择单个商品!");
      }
      this.multipleSelection = val;
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },
    /**
     * 分页查询数据
     */
    listTableData() {
      const params = {
        "dealerNo": this.toolBar.dealerNo || "",
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "productNo": this.itemNo
      };
      this.tableLoading = true;
      queryItemStock(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
          this.tableLoading = false;
          this.stockNoList = [];
          this.tableData.map((item, index) => {
            this.stockNoList.push(item.stockNo);
          });
        } else {
          this.$message.error(res.msg);
          this.tableLoading = false;
        }
      }).catch(() => {
        this.tableLoading = false;
        this.tableData = [];
      });
    },
    /**
       * 查询经销商
       * @param val
       */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    },
    adjust(row) {
      this.stockNo = row.stockNo;
      this.adjustVisible = true;
    },
    /**
       * 库存统一调整生效
       */
    save() {
      const params = {
        "amount": this.toolBar.redio === "1" ? this.toolBar.addNum : this.toolBar.redio === "0" ? this.toolBar.reduceNum : "",
        "flag": this.toolBar.redio,
        "stockNos": this.stockNoList
      };
      adjustItemStock(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.searchData();
        } else {
          this.$message.error(res.msg);
        }
      }).catch(() => {});
    },
    /**
       * 单个调整库存数量生效后刷新数据
       * @param val
       */
    saveStockNo(val) {
      this.searchData();
    }
  }
};