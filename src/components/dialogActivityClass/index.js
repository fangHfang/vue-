import { pageSearchPromotionCategory } from "@/api/product/activity/class";
export default {
  "name": "dialogActivityClass",
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
        "page.pageNum": 1,
        "page.pageSize": 10,
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
          this.listActivityClassByPage();
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
      this.searchData["page.pageSize"] = val;
      this.listActivityClassByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData["page.pageNum"] = val;
      this.listActivityClassByPage();
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
     */
    search() {
      this.searchData["page.pageNum"] = 1;
      this.listActivityClassByPage();
    },

    /**
     * 查询
     */
    listActivityClassByPage() {
      const that = this;
      // 请求参数
      let param = "page.pageNum=" + this.searchData["page.pageNum"] + "&page.pageSize=" + this.searchData["page.pageSize"];
      if (this.searchData.categoryName) {
        param = param + "&categoryName=" + this.searchData.categoryName;
      }
      pageSearchPromotionCategory(param).then(res => {
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
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
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
      const { categoryNo, categoryName, categoryType } = row;
      const text = "/pages/deadline/seckill/list/seckill-list?categoryNo=" + categoryNo + "&categoryName=" + categoryName;
      const data = {
        "url": text,
        "no": categoryNo,
        "name": categoryName,
        "type": categoryType
      };
      this.$emit("setSelectInfo", data);
      this.handleClose();
    }
  }
};