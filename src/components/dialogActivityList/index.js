import { pageSearchPromotion } from "@/api/product/activity/promotion";
export default {
  "name": "dialogActivityList",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "categoryNo": {
      "type": String,
      "default": ""
    }
  },
  "watch": {
    "dialogVisible": {
      "handler": function(val) {
        if (val) {
          // 打开时查询分页
          this.searchDataPage();
        }
      },
      "immediate": true
    }
  },
  data() {
    return {
      "toolBar": {
        "code": "",
        "name": "",
        "status": {
          "value": "",
          "options": [
            { "label": "未开始", "value": 0 },
            { "label": "进行中", "value": 1 },
            { "label": "已结束", "value": 2 }
          ]
        }
      },
      "tableLoading": false,
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "multipleSelection": []
    };
  },

  mounted() {
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
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
     * 分页查询分类列表
     */
    getRemoteTableData() {
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "categoryNo": this.categoryNo
      };
      if (this.toolBar.name) {
        params.promotionName = this.toolBar.name;
      }
      if (this.toolBar.code) {
        params.promotionNo = this.toolBar.code;
      }
      if (this.toolBar.status.value || this.toolBar.status.value === 0) {
        params.promotionStatus = this.toolBar.status.value;
      }
      const postData = this.$jsonFormat(params);
      this.tableLoading = true;
      pageSearchPromotion(postData).then(res => {
        if (res.code === 200) {
          this.tableData = (res.data && res.data.records) || [];
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    /**
     * 重置按钮
     */
    resetTableData() {
      this.toolBar.code = "";
      this.toolBar.name = "";
      this.toolBar.status.value = "";
      this.pagination.current = 1;
      this.getRemoteTableData();
    },

    /**
     * 获取勾选的行
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
      this.getRemoteTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getRemoteTableData();
    }
  }
};