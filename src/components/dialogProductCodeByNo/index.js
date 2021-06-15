import { listQueryProductByProductNo } from "@/api/system/base/product";
export default {
  "name": "dialogProductCodeByNo",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "productNo": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      // 初始化查询条件
      "searchData": {
        "page.pageNum": 1,
        "page.pageSize": 10,
        "productNo": ""
      },
      "total": 0
    };
  },
  "watch": {
    "productNo": {
      "handler": function(val) {
        if (val) {
          // 打开时查询分页
          this.searchData.productNo = val;
          this.listProductByProductNo();
        }
      },
      "immediate": true
    }
  },
  mounted() {
  },
  "methods": {
    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.searchData.pageSize = val;
      this.listProductByProductNo();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageNum = val;
      this.listProductByProductNo();
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:productNo", "");
      this.$emit("update:dialogVisible", false);
    },
    /**
     * 分页查询列表
     */
    listProductByProductNo() {
      listQueryProductByProductNo(this.$jsonFormat(this.searchData)).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error("查询失败,请稍后重试");
        }
      }).catch(() => {});
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            "rowspan": this.tableData.length,
            "colspan": 1
          };
        }
        return {
          "rowspan": 0,
          "colspan": 0
        };
      }
    }
  }
};