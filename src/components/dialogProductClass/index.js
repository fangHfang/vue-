import { listItemCategoryPage } from "@/api/product/base/class";
const clipboardy = require("clipboardy");
export default {
  "name": "dialogProductClass",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {
      "searchData": {
        "pageNum": 1,
        "pageSize": 10,
        // categoryType：1-前端分组；2-后端分类 ）
        "categoryType": 2,
        // 1启用 0禁用
        "status": 1,
        "categoryName": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      }
    };
  },
  "watch": {
    "dialogVisible": {
      "handler": function(val) {
        if (val) {
          // 打开时查询分页
          this.listProductClassByPage();
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
      this.listProductClassByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageNum = val;
      this.listProductClassByPage();
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },

    /**
     * 查询
     */
    search() {
      this.searchData.pageNum = 1;
      this.listProductClassByPage();
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
     * 查询
     * categoryType：1-前端分组；2-后端分类 ）
     */
    listProductClassByPage() {
      const that = this;
      const payload = this.$jsonFormat(this.searchData);
      // 请求参数
      listItemCategoryPage(payload).then(res => {
        if (res.code === 200) {
          res.data.records.forEach((element) => {
            element.created = that.formatTime(element.created);
          });
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 行双击事件
     */
    rowDblclick(row, column, event) {
      this.getSelectInfo(row);
    },

    /**
     * 复制链接
     */
    getSelectInfo(row) {
      const { categoryNo, categoryName } = row;
      const text = "/pages/products/product-search/product-search?anyCategoryNo=" + categoryNo + "&categoryType=2&categoryName=" + categoryName;
      const data = {
        "url": text,
        "no": categoryNo,
        "name": categoryName
      };
      this.$emit("setSelectInfo", data);
      this.handleClose();
    },

    /**
     * 复制链接
     */
    copyLink(categoryNo) {
      const clipboard = new this.$clipboard(".border-content", {
        "text": function() {
          return "/pages/products/product-search/product-search?categoryType=2&anyCategoryNo=" + categoryNo;
        }
      });
      clipboard.on("success", e => {
        this.$message.success("链接已复制！");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$message.error("复制失败！");
        clipboard.destroy();
      });
    }

  }
};
